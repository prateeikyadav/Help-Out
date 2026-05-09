import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    
    // Store in localStorage for demonstration
    localStorage.setItem('lastContactMessage', JSON.stringify({
      ...data,
      timestamp: new Date().toISOString()
    }));
    
    setStatus('success');
    e.target.reset();
    
    setTimeout(() => setStatus(null), 5000);
  };

  return (
    <div className="max-w-[900px] mx-auto px-6 py-20">
      <Link to="/" className="inline-flex items-center text-[13px] font-medium text-accent hover:underline mb-8">
        ← Back to HelpOut
      </Link>
      
      <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-light tracking-[-0.5px] text-ink mb-4">Contact Us</h1>
      <p className="text-[16px] text-muted mb-12">Have questions or feedback? We'd love to hear from you!</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white border border-rule rounded-xl p-8 shadow-sm">
          <h2 className="font-heading text-[18px] font-bold text-ink mb-3">📧 Email</h2>
          <p className="text-[14px] text-muted leading-[1.8] mb-3">For inquiries and support, reach out to us at:</p>
          <a href="mailto:prateeikyadav11@gmail.com" className="text-[14px] font-semibold text-accent hover:underline">
            prateeikyadav11@gmail.com
          </a>
        </div>
        <div className="bg-white border border-rule rounded-xl p-8 shadow-sm">
          <h2 className="font-heading text-[18px] font-bold text-ink mb-3">🔐 Privacy</h2>
          <p className="text-[14px] text-muted leading-[1.8] mb-3">Learn about how we protect your data:</p>
          <Link to="/privacy-policy" className="text-[14px] font-semibold text-accent hover:underline">
            Read our Privacy Policy
          </Link>
        </div>
      </div>

      <div className="bg-white border border-rule rounded-xl p-8 shadow-sm mb-8">
        <h2 className="font-heading text-[22px] font-bold text-ink mb-6">Send us a Message</h2>
        
        {status === 'success' && (
          <div className="bg-[#D1F4E0] border border-[#34C759] text-[#00A854] p-4 rounded-lg mb-6 text-[14px] font-medium">
            ✓ Thank you for your message! We'll get back to you soon.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-[14px] font-semibold text-ink mb-2">Name *</label>
            <input type="text" id="name" name="name" required placeholder="Your name" className="w-full p-3 border border-rule rounded-lg bg-cream font-sans text-[14px] text-ink outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20" />
          </div>
          <div>
            <label htmlFor="email" className="block text-[14px] font-semibold text-ink mb-2">Email *</label>
            <input type="email" id="email" name="email" required placeholder="your@email.com" className="w-full p-3 border border-rule rounded-lg bg-cream font-sans text-[14px] text-ink outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20" />
          </div>
          <div>
            <label htmlFor="subject" className="block text-[14px] font-semibold text-ink mb-2">Subject *</label>
            <input type="text" id="subject" name="subject" required placeholder="What is this about?" className="w-full p-3 border border-rule rounded-lg bg-cream font-sans text-[14px] text-ink outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20" />
          </div>
          <div>
            <label htmlFor="message" className="block text-[14px] font-semibold text-ink mb-2">Message *</label>
            <textarea id="message" name="message" required placeholder="Your message..." rows="5" className="w-full p-3 border border-rule rounded-lg bg-cream font-sans text-[14px] text-ink outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20 resize-y"></textarea>
          </div>
          <button type="submit" className="bg-accent text-white font-sans font-medium text-[14px] px-6 py-3 rounded-lg hover:brightness-110 transition-all active:scale-95">
            Send Message
          </button>
        </form>
      </div>

      <div className="bg-white p-6 border-l-4 border-accent rounded-r-xl border-y border-r border-rule">
        <h3 className="font-heading text-[16px] font-bold text-ink mb-2">Response Time</h3>
        <p className="text-[14px] text-muted">We typically respond to inquiries within 24-48 hours. Thank you for your patience!</p>
      </div>
    </div>
  );
}
