"use client";

import { FormEvent } from "react";

export function NewsletterForm() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className="newsletter-form">
      <input
        type="email"
        placeholder="Enter your email"
        className="newsletter-input"
        required
      />
      <button type="submit" className="newsletter-btn">
        Join
      </button>
    </form>
  );
}
