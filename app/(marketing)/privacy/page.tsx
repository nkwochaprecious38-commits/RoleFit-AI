import React from "react";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — RoleFit AI",
  description: "RoleFit AI Privacy Policy. How we collect, use and protect your personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-navy pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="secondary" className="mb-4 bg-white/10 text-white border-white/20 text-xs uppercase tracking-widest">
            Legal
          </Badge>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-white/60 text-sm">Last updated: 14 November 2026</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate max-w-none prose-headings:font-heading prose-headings:text-navy prose-h2:text-2xl prose-h2:mt-10 prose-h3:text-lg prose-h3:mt-6 prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-charcoal">

            <p>RoleFit AI (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is committed to protecting your personal data. This Privacy Policy explains what information we collect when you use our platform, how we use it, and your rights in relation to it.</p>
            <p>This policy applies to users of the RoleFit AI platform at <strong>role-fit-ai-six.vercel.app</strong> and any related services.</p>

            <h2>1. Who We Are</h2>
            <p>RoleFit AI is a talent intelligence platform. For the purposes of data protection law, we are the data controller of personal data you provide to us directly. Where we process candidate data on behalf of our organizational customers, we act as a data processor.</p>
            <p>If you have questions about this policy or your data, contact us at: <strong>privacy@rolefitai.com</strong></p>

            <h2>2. What Data We Collect</h2>
            <h3>Account and registration data</h3>
            <p>When you create an account, we collect your name, email address, and the organization you belong to. We may also collect your job title and role within your organization.</p>

            <h3>Usage data</h3>
            <p>We automatically collect information about how you use the platform: pages visited, features used, search queries within the product, and session duration. This is collected via server logs and first-party analytics.</p>

            <h3>Candidate data (processed on behalf of our customers)</h3>
            <p>Organizational customers upload candidate information — CVs, application materials, assessment responses — to the platform for the purpose of talent matching and evaluation. We process this data on behalf of our customers and in accordance with their instructions. Customers are responsible for obtaining appropriate consent from candidates and for their own compliance obligations under applicable data protection laws.</p>

            <h3>Workforce data (processed on behalf of our customers)</h3>
            <p>Customers may upload employee skills profiles, performance data, and other workforce information for use in intelligence and growth features. The same processor relationship applies.</p>

            <h3>Payment data</h3>
            <p>Payment information is processed by our third-party payment provider (Stripe). We do not store full card details. We retain billing address and transaction records for legal and accounting purposes.</p>

            <h2>3. How We Use Your Data</h2>
            <p>We use the data we collect for the following purposes:</p>
            <ul>
              <li><strong>Providing the service:</strong> Operating your account, processing requests, and delivering platform features.</li>
              <li><strong>Communication:</strong> Sending service-related notifications (account confirmations, security alerts, billing notifications). We will only send marketing communications if you have opted in.</li>
              <li><strong>Product improvement:</strong> Analysing usage patterns to improve and develop platform features. We use aggregated, anonymised data for this purpose and do not use identifiable personal data or customer data to train AI models without explicit consent.</li>
              <li><strong>Security:</strong> Detecting, investigating, and preventing fraudulent or unauthorized activity.</li>
              <li><strong>Legal obligations:</strong> Complying with applicable laws, regulations, and legal processes.</li>
            </ul>

            <h2>4. Legal Basis for Processing (UK/EU Users)</h2>
            <p>We process personal data on the following legal bases:</p>
            <ul>
              <li><strong>Contract:</strong> Processing necessary to perform our contract with you (providing the platform service).</li>
              <li><strong>Legitimate interests:</strong> Improving the platform, maintaining security, and conducting business analytics — where these interests do not override your rights.</li>
              <li><strong>Legal obligation:</strong> Where we are required to process data to comply with the law.</li>
              <li><strong>Consent:</strong> Where we have asked for and received your explicit consent (e.g., marketing communications).</li>
            </ul>

            <h2>5. Data Sharing</h2>
            <p>We do not sell your personal data. We may share it in the following circumstances:</p>
            <ul>
              <li><strong>Service providers:</strong> We use third-party services to operate the platform, including cloud infrastructure (AWS), authentication (Supabase), and payments (Stripe). These providers are contractually bound to handle data securely and only for the purposes we specify.</li>
              <li><strong>Legal requirements:</strong> Where required by law, regulation, or valid legal process (e.g., court orders).</li>
              <li><strong>Business transfers:</strong> In the event of a merger, acquisition, or sale of assets, personal data may be transferred as part of that transaction. We will notify users before data is transferred and becomes subject to a different privacy policy.</li>
            </ul>

            <h2>6. Data Retention</h2>
            <p>We retain account data for as long as your account is active, plus a reasonable period after closure to meet legal obligations. Usage logs are retained for a maximum of 12 months. Candidate and workforce data uploaded by customers is retained according to the customer&apos;s configured retention policy, subject to a maximum retention period.</p>
            <p>When data is deleted, it is removed from live systems within 30 days and from backup systems within 90 days.</p>

            <h2>7. Data Security</h2>
            <p>We implement industry-standard security measures to protect your data:</p>
            <ul>
              <li>All data is encrypted in transit using TLS 1.2+.</li>
              <li>Data at rest is encrypted using AES-256.</li>
              <li>Access to production data is restricted to authorised personnel and logged.</li>
              <li>We use row-level security at the database layer to enforce organizational data isolation.</li>
              <li>We conduct periodic security reviews and penetration testing.</li>
            </ul>
            <p>No method of transmission or storage is 100% secure. If you become aware of any security vulnerability, please contact us at <strong>security@rolefitai.com</strong>.</p>

            <h2>8. International Data Transfers</h2>
            <p>Our infrastructure is primarily hosted in the EU/EEA. Where data is transferred to countries outside the UK/EEA (for example, via third-party service providers), we ensure appropriate safeguards are in place, including Standard Contractual Clauses approved by the relevant authority.</p>

            <h2>9. Your Rights</h2>
            <p>Depending on your location, you may have the following rights in relation to your personal data:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong>Rectification:</strong> Request correction of inaccurate or incomplete data.</li>
              <li><strong>Erasure:</strong> Request deletion of your personal data, subject to legal retention requirements.</li>
              <li><strong>Restriction:</strong> Request that we restrict processing of your data in certain circumstances.</li>
              <li><strong>Portability:</strong> Receive your data in a structured, machine-readable format.</li>
              <li><strong>Objection:</strong> Object to processing based on legitimate interests.</li>
              <li><strong>Withdraw consent:</strong> Where processing is based on consent, withdraw it at any time.</li>
            </ul>
            <p>To exercise any of these rights, email <strong>privacy@rolefitai.com</strong>. We will respond within 30 days. If you are unhappy with our response, you have the right to complain to your national data protection authority (in the UK, the ICO; in the EU, your relevant supervisory authority).</p>

            <h2>10. Cookies</h2>
            <p>We use strictly necessary cookies to maintain your session and authentication state. We do not use advertising or cross-site tracking cookies. We may use first-party analytics cookies to understand how the platform is used. You can configure your browser to block cookies, though this may affect platform functionality.</p>

            <h2>11. Children&apos;s Privacy</h2>
            <p>RoleFit AI is a B2B platform intended for use by organisations and their employees. We do not knowingly collect data from individuals under the age of 16. If you believe we have inadvertently collected such data, please contact us immediately.</p>

            <h2>12. Changes to This Policy</h2>
            <p>We may update this policy from time to time. When we make material changes, we will notify users via email and update the &ldquo;Last updated&rdquo; date at the top of this page. Continued use of the platform after such changes constitutes acceptance of the updated policy.</p>

            <h2>13. Contact Us</h2>
            <p>For any questions about this Privacy Policy or how we handle your data:</p>
            <ul>
              <li>Email: <strong>privacy@rolefitai.com</strong></li>
              <li>Post: RoleFit AI, Privacy Team</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
