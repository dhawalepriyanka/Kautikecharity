"use client";

import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { DonationReceipt } from "../components/DonationReceipt";

export default function ReceiptPreviewPage() {
  return (
    <main style={{ backgroundColor: "#F1F5F9", minHeight: "100vh" }}>
      <Header />
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "40px 16px 80px" }}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#134B36", margin: "0 0 8px" }}>
            Official 80G Donation Receipt Preview
          </h1>
          <p style={{ color: "#64748B", fontSize: "14px", margin: 0 }}>
            Sample verified 80G tax exemption receipt for Kautike Charitable Foundation
          </p>
        </div>

        <DonationReceipt
          donorName="Nilesh Kute"
          email="nileshkute@gmail.com"
          phone="+91 98765 43210"
          address="123, Ganesh Nagar, Junnar, Pune, Maharashtra - 410502"
          pan="ABCDE1234F"
          amount={5000}
          date="26 May 2026"
          receiptNumber="KCF/2026/00001"
          paymentId="UPI/426812345678"
          purpose="General Donation"
        />
      </div>
      <Footer />
    </main>
  );
}
