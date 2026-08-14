import { writeFile, readFile } from "node:fs/promises";
import { URL } from "node:url";

async function generateStaticHtml() {
  console.log("Generating static index.html for Vercel deployment...");
  
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("prerender", `${Date.now()}`);
  
  const { default: worker } = await import(workerUrl.href);
  
  const response = await worker.fetch(
    new Request("http://localhost/", {
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
  const outputPath = new URL("../dist/client/index.html", import.meta.url);
  
  await writeFile(outputPath, html, "utf8");
  console.log("✓ Pre-rendered dist/client/index.html successfully!");
}

generateStaticHtml().catch((err) => {
  console.error("Failed to generate static index.html:", err);
  process.exit(1);
});
