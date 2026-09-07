import { jsPDF } from "jspdf";

const belowTwenty = [
  "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
  "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
  "Seventeen", "Eighteen", "Nineteen",
];

const tens = [
  "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety",
];

function wordsBelowThousand(value: number): string {
  if (value < 20) return belowTwenty[value];
  if (value < 100) return `${tens[Math.floor(value / 10)]}${value % 10 ? ` ${belowTwenty[value % 10]}` : ""}`;
  return `${belowTwenty[Math.floor(value / 100)]} Hundred${value % 100 ? ` ${wordsBelowThousand(value % 100)}` : ""}`;
}

function amountInWords(amount: number): string {
  let value = Math.max(0, Math.round(amount));
  if (!value) return "Rupees Zero Only";
  const parts: string[] = [];
  const crore = Math.floor(value / 10000000);
  value %= 10000000;
  const lakh = Math.floor(value / 100000);
  value %= 100000;
  const thousand = Math.floor(value / 1000);
  value %= 1000;
  if (crore) parts.push(`${wordsBelowThousand(crore)} Crore`);
  if (lakh) parts.push(`${wordsBelowThousand(lakh)} Lakh`);
  if (thousand) parts.push(`${wordsBelowThousand(thousand)} Thousand`);
  if (value) parts.push(wordsBelowThousand(value));
  return `Rupees ${parts.join(" ")} Only`;
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number = 3
): string[] {
  if (!text) return [];
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (ctx.measureText(testLine).width <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
      if (lines.length === maxLines - 1) break;
    }
  }
  if (currentLine && lines.length < maxLines) {
    lines.push(currentLine);
  }
  return lines;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}

export interface DonationPdfData {
  donorName: string;
  email?: string;
  phone?: string;
  address?: string;
  pan?: string;
  amount: number;
  date?: string;
  receiptNumber?: string;
  paymentId?: string;
  paymentMode?: string;
  purpose?: string;
}

export async function generateReceiptPdfBase64(data: DonationPdfData): Promise<string> {
  const canvas = document.createElement("canvas");
  canvas.width = 1149;
  canvas.height = 1369;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not initialize canvas context");

  const img = await loadImage("/images/receipt-clean-template.png");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const safeReceiptNo = data.receiptNumber || `KCF/${new Date().getFullYear()}/00001`;
  const safeName = data.donorName?.trim() || "Generous Donor";
  const safePan = data.pan?.trim() ? data.pan.trim().toUpperCase() : "";
  const safeAddress = data.address?.trim() || "";
  const safeEmail = data.email?.trim() || "";
  const safePhone = data.phone?.trim() || "";
  const safeAmount = Number(data.amount) || 0;
  const safePaymentMode = data.paymentMode || "UPI / Online";
  const safePaymentId = data.paymentId || "";
  const safePurpose = data.purpose || "General Donation";

  // Receipt No
  ctx.font = '800 21px "Inter", "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = "#0F172A";
  ctx.fillText(safeReceiptNo, 760, 150);

  // Donor Name
  ctx.font = '800 17.5px "Inter", "Segoe UI", Arial, sans-serif';
  ctx.fillText(safeName, 312, 452);

  // PAN (Only if present)
  if (safePan) {
    ctx.font = '700 17px "Inter", "Segoe UI", Arial, sans-serif';
    ctx.fillText(safePan, 312, 502);
  }

  // Address
  if (safeAddress) {
    ctx.font = '500 14.5px "Inter", "Segoe UI", Arial, sans-serif';
    ctx.fillStyle = "#1E293B";
    const addressLines = wrapText(ctx, safeAddress, 240, 3);
    addressLines.forEach((line, idx) => {
      ctx.fillText(line, 312, 546 + idx * 20);
    });
  }

  // Email
  if (safeEmail) {
    ctx.font = '500 15.5px "Inter", "Segoe UI", Arial, sans-serif';
    ctx.fillStyle = "#1E293B";
    ctx.fillText(safeEmail, 312, 640);
  }

  // Mobile
  if (safePhone) {
    ctx.font = '600 16px "Inter", "Segoe UI", Arial, sans-serif';
    ctx.fillStyle = "#1E293B";
    ctx.fillText(safePhone, 312, 688);
  }

  // Donation Amount
  ctx.font = '800 18px "Inter", "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = "#0F172A";
  ctx.fillText(`₹ ${safeAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`, 878, 452);

  // Payment Mode
  ctx.font = '500 16.5px "Inter", "Segoe UI", Arial, sans-serif';
  ctx.fillText(safePaymentMode, 878, 502);

  // Transaction ID
  if (safePaymentId) {
    ctx.font = '500 15.5px "Inter", "Segoe UI", Arial, sans-serif';
    ctx.fillStyle = "#1E293B";
    ctx.fillText(safePaymentId, 878, 552);
  }

  // Donation Purpose
  ctx.font = '700 16px "Inter", "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = "#0F172A";
  ctx.fillText(safePurpose, 878, 622);

  ctx.font = '500 13px "Inter", "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = "#64748B";
  ctx.fillText("(Towards Charitable Activities)", 878, 644);

  // Amount in Words
  ctx.font = 'italic 700 20px "Caveat", Georgia, serif';
  ctx.fillStyle = "#134B36";
  ctx.fillText(amountInWords(safeAmount), 380, 755);

  const imgData = canvas.toDataURL("image/jpeg", 0.95);
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });
  const pdfWidth = 210;
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, Math.min(pdfHeight, 297), undefined, "FAST");
  return pdf.output("datauristring");
}

export async function generateCertificatePdfBase64(data: DonationPdfData): Promise<string> {
  const canvas = document.createElement("canvas");
  const img = await loadImage("/certificate-template.png");
  canvas.width = img.naturalWidth || 1024;
  canvas.height = img.naturalHeight || 723;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not initialize canvas context");

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const cleanName = (data.donorName?.trim() || "VALUED DONOR").toUpperCase();

  // Clear sample name area
  const clearX = 180;
  const clearY = 305;
  const clearW = canvas.width - clearX * 2;
  const clearH = 70;
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(clearX, clearY, clearW, clearH);

  // Draw donor name
  const centerX = canvas.width / 2;
  const centerY = 340;

  let fontSize = 36;
  if (cleanName.length > 30) fontSize = 22;
  else if (cleanName.length > 24) fontSize = 26;
  else if (cleanName.length > 18) fontSize = 30;

  ctx.font = `600 ${fontSize}px "Cinzel", "Cinzel Decorative", "Montserrat", "Trajan Pro", Georgia, serif`;
  ctx.fillStyle = "#C59428";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  try {
    (ctx as any).letterSpacing = cleanName.length > 22 ? "3px" : "6px";
  } catch (_) {}

  const spacedName = (ctx as any).letterSpacing
    ? cleanName
    : cleanName.split("").join(cleanName.length > 20 ? " " : "  ");

  ctx.fillText(spacedName, centerX, centerY);

  const imgData = canvas.toDataURL("image/jpeg", 0.95);
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });
  const pdfWidth = 297;
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, Math.min(pdfHeight, 210), undefined, "FAST");
  return pdf.output("datauristring");
}
