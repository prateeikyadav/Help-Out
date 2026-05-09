import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-[900px] mx-auto px-6 py-20 font-sans text-ink leading-relaxed">
      <Link to="/" className="inline-flex items-center text-[13px] font-medium text-accent hover:underline mb-8">
        ← Back to HelpOut
      </Link>
      
      <h1 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] font-light tracking-[-1px] text-ink mb-8">Privacy Policy</h1>
      
      <div className="bg-white border-l-4 border-accent p-4 rounded-r-lg border-y border-r border-rule mb-10 text-[14px] text-muted">
        <strong>Last Updated:</strong> May 10, 2026
      </div>

      <div className="space-y-8 text-[15px] text-muted">
        <section>
          <h2 className="font-heading text-[22px] font-bold text-ink mb-4 pb-2 border-b border-rule">1. Introduction</h2>
          <p>Welcome to HelpOut ("we," "us," "our," or "Company"). We are committed to protecting your privacy and ensuring you have a positive experience on our website. This Privacy Policy outlines our practices regarding the collection, use, and protection of your personal information.</p>
        </section>

        <section>
          <h2 className="font-heading text-[22px] font-bold text-ink mb-4 pb-2 border-b border-rule">2. Information We Collect</h2>
          <p className="mb-3">We may collect information from you in the following ways:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Voluntarily Provided Information:</strong> Information you provide when using our tools, such as project names, dates, and other data entered into our applications.</li>
            <li><strong>Automatically Collected Information:</strong> Browser type, IP address, pages visited, and time spent on our site.</li>
            <li><strong>Cookies and Tracking:</strong> We use localStorage to save your tool data locally on your device for convenience.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-[22px] font-bold text-ink mb-4 pb-2 border-b border-rule">3. How We Use Your Information</h2>
          <p className="mb-3">We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide, maintain, and improve our tools and services</li>
            <li>Enhance user experience and functionality</li>
            <li>Analyze usage patterns and trends</li>
            <li>Respond to your inquiries and support requests</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-[22px] font-bold text-ink mb-4 pb-2 border-b border-rule">4. Data Storage and Local Storage</h2>
          <p>All tool data you enter is stored locally in your browser using localStorage. This means your project information, forms, and preferences are stored on YOUR device only. We do not transmit or store this data on our servers.</p>
        </section>

        <section>
          <h2 className="font-heading text-[22px] font-bold text-ink mb-4 pb-2 border-b border-rule">5. Third-Party Services</h2>
          <p className="mb-3">Our tools use the following third-party libraries for PDF and Excel export functionality:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>jsPDF:</strong> For generating PDF documents (loaded from CDN)</li>
            <li><strong>XLSX:</strong> For creating Excel files (loaded from CDN)</li>
          </ul>
          <p className="mt-3">These libraries process your data only within your browser and do not send data to external servers.</p>
        </section>

        <section>
          <h2 className="font-heading text-[22px] font-bold text-ink mb-4 pb-2 border-b border-rule">6. Information Sharing</h2>
          <p>We do not share, sell, or distribute your personal information to third parties. Your data remains under your control and is stored only on your device.</p>
        </section>

        <section>
          <h2 className="font-heading text-[22px] font-bold text-ink mb-4 pb-2 border-b border-rule">7. Security</h2>
          <p>We implement industry-standard security measures to protect your information. Since your data is stored locally on your device, its security depends on your device's security practices.</p>
        </section>

        <section>
          <h2 className="font-heading text-[22px] font-bold text-ink mb-4 pb-2 border-b border-rule">8. Your Rights</h2>
          <p className="mb-3">You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access your information stored in localStorage</li>
            <li>Delete your data by clearing browser cache/localStorage</li>
            <li>Request information about our data practices</li>
            <li>Opt out of non-essential tracking</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-[22px] font-bold text-ink mb-4 pb-2 border-b border-rule">9. Cookies</h2>
          <p>We use localStorage (not traditional cookies) to enhance your experience. You can clear your localStorage at any time through your browser settings, which will remove all saved tool data.</p>
        </section>

        <section>
          <h2 className="font-heading text-[22px] font-bold text-ink mb-4 pb-2 border-b border-rule">10. Children's Privacy</h2>
          <p>Our website is not intended for children under 13. We do not knowingly collect information from children under 13. If we become aware of such collection, we will take appropriate steps to delete the information.</p>
        </section>

        <section>
          <h2 className="font-heading text-[22px] font-bold text-ink mb-4 pb-2 border-b border-rule">11. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date. Your continued use of our services constitutes acceptance of these changes.</p>
        </section>

        <section>
          <h2 className="font-heading text-[22px] font-bold text-ink mb-4 pb-2 border-b border-rule">12. Contact Us</h2>
          <p>If you have questions about this Privacy Policy or our privacy practices, please contact us at our <Link to="/contact" className="text-accent font-medium hover:underline">Contact Page</Link>.</p>
        </section>
      </div>

      <div className="mt-16 pt-6 border-t border-rule text-[13px] text-muted text-center">
        © 2026 HelpOut. All rights reserved.
      </div>
    </div>
  );
}
