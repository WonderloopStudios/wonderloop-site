import { useState, type FormEvent } from "react";

export default function ContactSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    const subject = encodeURIComponent("Hello from " + trimmed);
    const body = encodeURIComponent("You can reach me at: " + trimmed);
    window.location.href = `mailto:contact@wonderloop.studio?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact">
      <div className="section-inner">
        <img
          className="contact-banner"
          data-parallax="0.35"
          src="/assets/banner.png"
          alt="Rabbit leaping down the rabbit hole"
        />

        <div className="section-head reveal">
          <h2>Contact Us</h2>
          <div className="rule"></div>
          <p>Drop your email and we'll open a message to you.</p>
        </div>

        <form className="contact-form reveal" onSubmit={handleSubmit}>
          <label htmlFor="contactEmail" className="sr-only">Your email address</label>
          <input
            type="email"
            id="contactEmail"
            name="email"
            placeholder="you@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
        <p className="contact-note">
          This opens your email client to reach us at contact@wonderloop.studio.
        </p>
      </div>
    </section>
  );
}
