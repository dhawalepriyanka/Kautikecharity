"use client";

import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingActions } from "../components/FloatingActions";

export default function VolunteerPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    interest: "education",
    availability: "weekends",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newMsg = {
      id: "vol-reg-" + Date.now(),
      name: form.fullName,
      email: form.email,
      phone: form.phone,
      message: `Volunteer Application:\nCity: ${form.city}\nArea of Interest: ${form.interest}\nAvailability: ${form.availability}\nBio/Motivation: ${form.message}`,
      created_at: new Date().toISOString(),
      status: "Unread",
    };

    try {
      const savedMsgs = localStorage.getItem("kautike_admin_messages");
      const current = savedMsgs ? JSON.parse(savedMsgs) : [];
      localStorage.setItem("kautike_admin_messages", JSON.stringify([newMsg, ...current]));
    } catch (_) {}

    try {
      await fetch("http://localhost:4000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.fullName,
          email: form.email,
          phone: form.phone,
          subject: `Volunteer Registration - ${form.interest}`,
          message: newMsg.message,
        }),
      });
    } catch (_) {}

    setSubmitted(true);
  };

  return (
    <main className="page-fade-in" id="top">
      <Header />

      {/* Hero */}
      <section className="subpage-hero">
        <div className="subpage-hero-inner">
          <span className="subpage-badge">JOIN THE MOVEMENT</span>
          <h1>Volunteer &amp; Intern for <span className="yellow-hand">lasting change</span></h1>
          <p>
            Lend your time, passion, and skills to empower children, lead grassroots environmental restoration, and build stronger communities across India.
          </p>
        </div>
      </section>

      {/* Volunteer Roles */}
      <section className="section-pad bg-white">
        <div className="about-container">
          <div className="text-center">
            <span className="mini-title">VOLUNTEER OPPORTUNITIES</span>
            <h2 className="section-heading">How You Can <span className="yellow-hand">Contribute</span></h2>
          </div>

          <div className="roles-grid-3">
            <div className="role-card">
              <div className="role-icon">📖</div>
              <h3>Teaching &amp; Mentorship</h3>
              <p>Conduct weekend remedial sessions in English, Mathematics, Science, and arts for children at our community learning centres.</p>
              <span className="role-badge">Weekends / 3-4 hrs</span>
            </div>

            <div className="role-card">
              <div className="role-icon">🌳</div>
              <h3>Tree Plantation Leader</h3>
              <p>Organize and lead ground planting drives, mobilize volunteers, coordinate sapling logistics, and track post-plantation tree health.</p>
              <span className="role-badge">Sundays / Flexible</span>
            </div>

            <div className="role-card">
              <div className="role-icon">💻</div>
              <h3>Digital &amp; Content Creator</h3>
              <p>Support our communications team through photography, video editing, social media storytelling, translation, and graphic design.</p>
              <span className="role-badge">Remote / Flexible</span>
            </div>

            <div className="role-card">
              <div className="role-icon">🏥</div>
              <h3>Health Camp Volunteer</h3>
              <p>Assist doctors and nurses during community nutrition screenings, eye-checkup camps, and maternal health awareness workshops.</p>
              <span className="role-badge">Monthly Camps</span>
            </div>

            <div className="role-card">
              <div className="role-icon">🎓</div>
              <h3>College Campus Ambassador</h3>
              <p>Represent Kautike Charitable Foundation at your university. Lead donation drives, webinars, and youth awareness events.</p>
              <span className="role-badge">Student Program</span>
            </div>

            <div className="role-card">
              <div className="role-icon">📊</div>
              <h3>Research &amp; Impact Intern</h3>
              <p>Collect field baseline data, conduct beneficiary interviews, document case studies, and assist in compiling annual impact reports.</p>
              <span className="role-badge">Internship / 2-3 Months</span>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="section-pad bg-cream" id="apply">
        <div className="form-container">
          <div className="text-center mb-8">
            <span className="mini-title">REGISTER AS A VOLUNTEER</span>
            <h2 className="section-heading">Fill Out Your <span className="yellow-hand">Application</span></h2>
            <p>Our volunteer coordination team will contact you within 48 hours with upcoming orientation schedules.</p>
          </div>

          {submitted ? (
            <div className="success-box text-center">
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>🎉</div>
              <h3>Thank You for Stepping Forward!</h3>
              <p>We have received your application. Our volunteer coordinator will reach out to you at <strong>{form.email}</strong> shortly.</p>
              <button onClick={() => setSubmitted(false)} className="cry-yellow-btn mt-4">Submit Another Response</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="styled-app-form">
              <div className="form-row-2">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>City / Location *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mumbai, Navi Mumbai, Pune"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Area of Interest *</label>
                  <select
                    value={form.interest}
                    onChange={(e) => setForm({ ...form, interest: e.target.value })}
                  >
                    <option value="education">Teaching &amp; Remedial Education</option>
                    <option value="plantation">Tree Plantation Drives</option>
                    <option value="health">Child Nutrition &amp; Health Camps</option>
                    <option value="digital">Digital, Media &amp; Storytelling</option>
                    <option value="campus">Campus Ambassador Program</option>
                    <option value="internship">Student Research Internship</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Availability *</label>
                  <select
                    value={form.availability}
                    onChange={(e) => setForm({ ...form, availability: e.target.value })}
                  >
                    <option value="weekends">Weekends Only</option>
                    <option value="weekdays">Weekdays (Part-time)</option>
                    <option value="fulltime">Full-time Internship</option>
                    <option value="events">Project / Event Basis</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Tell us about yourself &amp; why you want to volunteer</label>
                <textarea
                  rows={3}
                  placeholder="Share any relevant experience, skills, or motivations..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="cry-yellow-btn w-full">
                Submit Volunteer Application
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </main>
  );
}
