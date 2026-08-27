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
  onClose?: () => void;
};

const formatAmount = (amount: number) => `₹${amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;

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
  onClose,
}: ReceiptProps) {
  const printReceipt = () => window.print();

  return (
    <section className="donation-receipt" aria-label="Donation receipt">
      <div className="donation-receipt-actions no-print">
        {onClose && <button type="button" onClick={onClose}>← Back to donation</button>}
        <button type="button" className="donation-receipt-print" onClick={printReceipt}>🖨 Print / Save as PDF</button>
      </div>

      <article className="donation-receipt-sheet" id="donation-receipt-print-area">
        <header className="donation-receipt-header">
          <div className="donation-receipt-brand">
            <img src="/kautike-logo.png" alt="Kautike Charitable Foundation" />
            <div>
              <strong>KAUTIKE</strong>
              <span>CHARITABLE FOUNDATION</span>
              <em>Every Help — A New Hope</em>
            </div>
          </div>
          <div className="donation-receipt-meta">
            <span>Receipt No.</span>
            <strong>{receiptNumber}</strong>
            <span>Date</span>
            <b>{date}</b>
          </div>
        </header>

        <div className="donation-receipt-title">
          <h2>Donation Receipt</h2>
          <p>Thank you for your generous support!</p>
        </div>

        <div className="donation-receipt-grid">
          <div>
            <p><b>Donor name</b><span>{donorName || "Generous Donor"}</span></p>
            {pan && <p><b>PAN</b><span>{pan.toUpperCase()}</span></p>}
            {address && <p><b>Address</b><span>{address}</span></p>}
            <p><b>Email</b><span>{email}</span></p>
            <p><b>Mobile</b><span>{phone}</span></p>
          </div>
          <div>
            <p><b>Donation amount</b><span>{formatAmount(amount)}</span></p>
            <p><b>Payment mode</b><span>Online payment (Razorpay)</span></p>
            <p><b>Transaction ID</b><span className="receipt-payment-id">{paymentId}</span></p>
            <p><b>Donation purpose</b><span>{purpose}</span></p>
          </div>
        </div>

        <div className="donation-receipt-amount">
          <b>Amount received</b>
          <strong>{formatAmount(amount)}</strong>
        </div>

        <div className="donation-receipt-note">
          We gratefully acknowledge receipt of the donation above. Your contribution helps support education, health, protection, community relief, and environmental initiatives.
        </div>

        <footer className="donation-receipt-footer">
          <span>Kautike Charitable Foundation</span>
          <span>kautikefoundation.org</span>
        </footer>
      </article>
    </section>
  );
}
