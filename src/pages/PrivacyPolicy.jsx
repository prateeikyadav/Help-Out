import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="flex-1 p-6 md:p-12 max-w-[1000px] mx-auto w-full font-sans text-ink leading-relaxed">
      <h1 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] font-light tracking-[-1px] text-ink mb-8">Privacy Policy</h1>
      
      <div className="bg-[#fbf9f6] border-l-4 border-accent p-4 rounded-r-lg border-y border-r border-[#e8e4db] mb-10 text-[14px] text-muted shadow-sm">
        <strong>Last Updated:</strong> May 12, 2026
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#e8e4db] p-8 md:p-12 space-y-10 text-[15px] text-muted">
        <section>
          <h2 className="font-heading text-[22px] font-bold text-ink mb-4 pb-2 border-b border-[#e8e4db]">1. The "Zero-Tracking" Promise</h2>
          <p>Welcome to HelpOut. We built this platform with a singular privacy philosophy: <strong>Your data is none of our business.</strong> We do not require accounts, we do not track your keystrokes, and we do not monitor the contents of the tools you use. This policy outlines exactly how we achieve a privacy-first ecosystem.</p>
        </section>

        <section>
          <h2 className="font-heading text-[22px] font-bold text-ink mb-4 pb-2 border-b border-[#e8e4db]">2. How We Handle Your Data (We Don't)</h2>
          <p className="mb-3">Unlike traditional SaaS platforms that hoover up your project data, HelpOut operates entirely on the client side (in your browser). Here is what that means:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>No Cloud Storage:</strong> When you type a project name, log a risk, or generate a charter, that data never touches our servers. It is processed directly on your machine.</li>
            <li><strong>Local Persistence:</strong> To ensure you don't lose your work when you close a tab, we utilize your browser's native `localStorage`. The data lives on your hard drive, not ours.</li>
            <li><strong>No Accounts:</strong> We do not collect names, emails, or passwords because HelpOut requires zero authentication to use.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-[22px] font-bold text-ink mb-4 pb-2 border-b border-[#e8e4db]">3. Analytics & Telemetry</h2>
          <p>We believe in building great tools without invasive tracking. We collect absolute bare-minimum, anonymized, and aggregated analytics (such as total page views) simply to understand which tools are popular and ensure the platform is functioning correctly. We do not use cross-site tracking cookies, fingerprinting, or session recording.</p>
        </section>

        <section>
          <h2 className="font-heading text-[22px] font-bold text-ink mb-4 pb-2 border-b border-[#e8e4db]">4. Third-Party Integrations</h2>
          <p className="mb-3">To provide advanced features like PDF and Excel exports, we utilize industry-standard, open-source libraries (e.g., jsPDF, XLSX). These libraries are executed entirely within your browser environment. They do not phone home, and they do not send your generated reports to third-party servers.</p>
        </section>

        <section>
          <h2 className="font-heading text-[22px] font-bold text-ink mb-4 pb-2 border-b border-[#e8e4db]">5. Securing Your Data</h2>
          <p>Because HelpOut stores your work exclusively on your device via `localStorage`, the security of your data relies entirely on the security of your physical device and your web browser. We recommend using modern, updated browsers and securing your operating system to protect your offline data.</p>
        </section>

        <section>
          <h2 className="font-heading text-[22px] font-bold text-ink mb-4 pb-2 border-b border-[#e8e4db]">6. Data Deletion & Your Rights</h2>
          <p>Because we don't have your data, we cannot delete it for you. You maintain 100% control over your information. To permanently delete all HelpOut data, simply clear your browser's cache and local storage data for this website. It will be instantly and irretrievably erased from your machine.</p>
        </section>

        <section>
          <h2 className="font-heading text-[22px] font-bold text-ink mb-4 pb-2 border-b border-[#e8e4db]">7. Changes to This Policy</h2>
          <p>If we ever fundamentally change our architecture (for instance, by introducing optional cloud-syncing accounts), we will transparently update this policy and prominently notify users on the dashboard. Until then, our local-only promise stands.</p>
        </section>

        <section>
          <h2 className="font-heading text-[22px] font-bold text-ink mb-4 pb-2 border-b border-[#e8e4db]">8. Contact</h2>
          <p>If you have questions about our privacy architecture or security practices, we are fully transparent. Please reach out to us via our <Link to="/contact" className="text-accent font-medium hover:underline">Contact Page</Link>.</p>
        </section>
      </div>
    </div>
  );
}
