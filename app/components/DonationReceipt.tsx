"use client";

type ReceiptProps = {
  donorName: string;
  email: string;
  phone: string;
  address: string;
  pan: string;
  amount: number;
  date: string;
  receiptNumber: string;
  paymentId: string;
  purpose: string;
  isPreview?: boolean;
  onClose?: () => void;
};

const formatAmount = (amount: number) => `₹${amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;

const belowTwenty = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
const wordsBelowThousand = (value: number): string => {
  if (value < 20) return belowTwenty[value];
  if (value < 100) return `${tens[Math.floor(value / 10)]}${value % 10 ? ` ${belowTwenty[value % 10]}` : ""}`;
  return `${belowTwenty[Math.floor(value / 100)]} Hundred${value % 100 ? ` ${wordsBelowThousand(value % 100)}` : ""}`;
};
const amountInWords = (amount: number) => {
  let value = Math.max(0, Math.round(amount));
  if (!value) return "Rupees Zero Only";
  const parts: string[] = [];
  const crore = Math.floor(value / 10000000); value %= 10000000;
  const lakh = Math.floor(value / 100000); value %= 100000;
  const thousand = Math.floor(value / 1000); value %= 1000;
  if (crore) parts.push(`${wordsBelowThousand(crore)} Crore`);
  if (lakh) parts.push(`${wordsBelowThousand(lakh)} Lakh`);
  if (thousand) parts.push(`${wordsBelowThousand(thousand)} Thousand`);
  if (value) parts.push(wordsBelowThousand(value));
  return `Rupees ${parts.join(" ")} Only`;
};

export function DonationReceipt({
  donorName,
  email,
  phone,
  address,
  pan,
  amount,
  date,
  receiptNumber,
  paymentId,
  purpose,
  isPreview = false,
  onClose,
}: ReceiptProps) {
  const printReceipt = () => window.print();

  return (
    <section className="donation-receipt" aria-label="Donation receipt">
      <div className="donation-receipt-actions no-print">
        {onClose && <button type="button" onClick={onClose}>← Back to donation</button>}
        <button type="button" className="donation-receipt-print" onClick={printReceipt}>🖨 Print / Save as PDF</button>
      </div>

      <article className="donation-receipt-template" id="donation-receipt-print-area">
        {isPreview && <div className="donation-receipt-preview-label no-print">SAMPLE RECEIPT — NOT A PAYMENT CONFIRMATION</div>}
        <img className="donation-receipt-template-image" src="/images/receipt.jpeg" alt="Kautike donation receipt" />
        <div className="donation-receipt-template-values" aria-label="Verified donation information">
          <span className="receipt-template-field receipt-template-number">{receiptNumber}</span>
          <span className="receipt-template-field receipt-template-date">{date}</span>
          <span className="receipt-template-field receipt-template-name">{donorName || "Generous Donor"}</span>
          <span className="receipt-template-field receipt-template-pan">{pan ? pan.toUpperCase() : "—"}</span>
          <span className="receipt-template-field receipt-template-address">{address || "—"}</span>
          <span className="receipt-template-field receipt-template-email">{email || "—"}</span>
          <span className="receipt-template-field receipt-template-phone">{phone || "—"}</span>
          <span className="receipt-template-field receipt-template-amount">{formatAmount(amount)}</span>
          <span className="receipt-template-field receipt-template-mode">Online (Razorpay)</span>
          <span className="receipt-template-field receipt-template-payment">{paymentId}</span>
          <span className="receipt-template-field receipt-template-purpose">{purpose}</span>
          <span className="receipt-template-field receipt-template-words">{amountInWords(amount)}</span>
        </div>
      </article>
    </section>
  );
}
