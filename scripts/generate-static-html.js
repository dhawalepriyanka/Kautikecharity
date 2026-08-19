import { writeFile, readFile, mkdir } from "node:fs/promises";
import { URL } from "node:url";

const routes = [
  { path: "/", output: "../dist/client/index.html" },
  { path: "/admin", output: "../dist/client/admin/index.html" },
  { path: "/about", output: "../dist/client/about/index.html" },
  { path: "/why-children", output: "../dist/client/why-children/index.html" },
  { path: "/what-we-do", output: "../dist/client/what-we-do/index.html" },
  { path: "/approach", output: "../dist/client/approach/index.html" },
  { path: "/get-involved", output: "../dist/client/get-involved/index.html" },
  { path: "/volunteer", output: "../dist/client/volunteer/index.html" },
  { path: "/corporate-partnerships", output: "../dist/client/corporate-partnerships/index.html" },
  { path: "/impact", output: "../dist/client/impact/index.html" },
  { path: "/stories", output: "../dist/client/stories/index.html" },
  { path: "/faqs", output: "../dist/client/faqs/index.html" },
  { path: "/donate", output: "../dist/client/donate/index.html" },
  { path: "/contact", output: "../dist/client/contact/index.html" },
  { path: "/privacy", output: "../dist/client/privacy/index.html" },
  { path: "/terms", output: "../dist/client/terms/index.html" },
  { path: "/refund-policy", output: "../dist/client/refund-policy/index.html" },
  { path: "/shipping-policy", output: "../dist/client/shipping-policy/index.html" },
];

async function generateStaticHtml() {
  console.log("Generating static HTML pages for all routes for Vercel deployment...");
  
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("prerender", `${Date.now()}`);
  
  const { default: worker } = await import(workerUrl.href);

  for (const route of routes) {
    try {
      const response = await worker.fetch(
        new Request(`http://localhost${route.path}`, {
          headers: { accept: "text/html" },
        }),
        {
          ASSETS: {
            fetch: async (req) => {
              try {
                const url = new URL(req.url);
                const assetPath = new URL(`../dist/client${url.pathname}`, import.meta.url);
                const content = await readFile(assetPath);
                return new Response(content);
              } catch (e) {
                return new Response("Not found", { status: 404 });
              }
            },
          },
        },
        {
          waitUntil() {},
          passThroughOnException() {},
        }
      );

      const html = await response.text();
      const outputPath = new URL(route.output, import.meta.url);
      
      // Ensure parent directory exists
      const dirPath = new URL(route.output.substring(0, route.output.lastIndexOf("/")), import.meta.url);
      await mkdir(dirPath, { recursive: true });

      await writeFile(outputPath, html, "utf8");
      console.log(`✓ Pre-rendered ${route.path} -> ${route.output}`);
    } catch (err) {
      console.error(`Failed to pre-render route ${route.path}:`, err);
    }
  }

  console.log("All static HTML routes pre-rendered successfully!");
}

generateStaticHtml().catch((err) => {
  console.error("Static HTML pre-rendering failed:", err);
  process.exit(1);
});
