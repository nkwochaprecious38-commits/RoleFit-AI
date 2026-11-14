import React from "react";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — RoleFit AI",
  description: "RoleFit AI Terms of Service. The terms that govern your use of the RoleFit AI platform.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-navy pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="secondary" className="mb-4 bg-white/10 text-white border-white/20 text-xs uppercase tracking-widest">
            Legal
          </Badge>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-white/60 text-sm">Last updated: 14 November 2026</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate max-w-none prose-headings:font-heading prose-headings:text-navy prose-h2:text-2xl prose-h2:mt-10 prose-h3:text-lg prose-h3:mt-6 prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-charcoal">

            <p>These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the RoleFit AI platform (&ldquo;Platform&rdquo;), operated by RoleFit AI (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;). By registering for an account or using the Platform, you agree to be bound by these Terms.</p>
            <p>If you are using the Platform on behalf of an organisation, you represent that you have authority to bind that organisation to these Terms.</p>

            <h2>1. Definitions</h2>
            <ul>
              <li><strong>&ldquo;Customer&rdquo;</strong> means the organisation that has registered for an account on the Platform.</li>
              <li><strong>&ldquo;User&rdquo;</strong> means any individual authorised by the Customer to access the Platform.</li>
              <li><strong>&ldquo;Customer Data&rdquo;</strong> means any data uploaded to or processed through the Platform by the Customer, including candidate data and workforce data.</li>
              <li><strong>&ldquo;Services&rdquo;</strong> means all features, tools, and functionalities provided through the Platform.</li>
              <li><strong>&ldquo;Subscription&rdquo;</strong> means a paid plan granting access to the Services for a defined period.</li>
            </ul>

            <h2>2. Account Registration and Access</h2>
            <p>To access the Platform you must register for an account. You agree to provide accurate, current, and complete information during registration and to keep your account information updated.</p>
            <p>You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account. You must notify us immediately at <strong>security@rolefitai.com</strong> if you suspect unauthorised access to your account.</p>
            <p>We reserve the right to suspend or terminate accounts that we reasonably believe are being used fraudulently or in violation of these Terms.</p>

            <h2>3. Licence to Use the Platform</h2>
            <p>Subject to these Terms and payment of applicable fees, we grant you a limited, non-exclusive, non-transferable, revocable licence to access and use the Platform for your internal business purposes during your Subscription period.</p>
            <p>You may not:</p>
            <ul>
              <li>Sublicense, resell, or make the Platform available to third parties outside your organisation without our written consent;</li>
              <li>Copy, modify, or create derivative works based on the Platform;</li>
              <li>Reverse engineer, decompile, or attempt to extract source code from the Platform;</li>
              <li>Use the Platform to build a competing product or service;</li>
              <li>Use automated tools to scrape, extract, or systematically download data from the Platform;</li>
              <li>Use the Platform in any unlawful manner or in violation of these Terms.</li>
            </ul>

            <h2>4. Customer Data</h2>
            <p>You retain all ownership and intellectual property rights in your Customer Data. By uploading Customer Data to the Platform, you grant us a limited licence to process, store, and use that data solely for the purpose of providing the Services to you.</p>
            <p>You are solely responsible for:</p>
            <ul>
              <li>Ensuring you have the right to upload and process the Customer Data on the Platform;</li>
              <li>Obtaining any necessary consents from candidates and employees whose data you upload;</li>
              <li>Complying with all applicable data protection laws in relation to Customer Data;</li>
              <li>The accuracy and legality of the Customer Data you provide.</li>
            </ul>
            <p>We will not use Customer Data to train AI models for use outside your organisation, nor share Customer Data with other customers. See our Privacy Policy for full details of how we handle data.</p>

            <h2>5. Acceptable Use</h2>
            <p>You agree to use the Platform only for lawful purposes and in accordance with these Terms. You must not:</p>
            <ul>
              <li>Use the Platform in a way that discriminates unlawfully on the basis of race, sex, age, disability, religion, nationality, or any other protected characteristic;</li>
              <li>Upload data that infringes the intellectual property rights of any third party;</li>
              <li>Transmit viruses, malware, or any harmful code;</li>
              <li>Attempt to gain unauthorised access to our systems or other customers&apos; data;</li>
              <li>Interfere with or disrupt the integrity or performance of the Platform;</li>
              <li>Use the Platform to harass, abuse, or harm any individual.</li>
            </ul>

            <h2>6. AI and Automated Outputs</h2>
            <p>The Platform uses artificial intelligence to generate recommendations, scores, and analytics. You acknowledge and agree that:</p>
            <ul>
              <li>AI outputs are recommendations to inform human decision-making, not autonomous decisions;</li>
              <li>You remain solely responsible for all employment, hiring, and talent decisions made using the Platform;</li>
              <li>You will not make final hiring or employment decisions based solely on AI-generated outputs without human review;</li>
              <li>AI outputs may contain errors or inaccuracies, and you should exercise appropriate professional judgement when relying on them;</li>
              <li>You will comply with all applicable laws and regulations governing the use of AI in employment decisions in your jurisdiction.</li>
            </ul>

            <h2>7. Subscriptions and Payment</h2>
            <p>Access to the Platform requires a valid Subscription. Subscriptions are billed in advance on a monthly or annual basis as selected at checkout.</p>
            <p>All fees are exclusive of applicable taxes. You are responsible for all taxes arising from your use of the Platform, except for taxes on our net income.</p>
            <p>Subscriptions renew automatically unless cancelled before the renewal date. You may cancel at any time through your account settings. Cancellation takes effect at the end of the current billing period; we do not provide refunds for unused periods of a Subscription, except where required by law.</p>
            <p>We may change pricing with 30 days&apos; notice. Continued use of the Platform after a price change takes effect constitutes acceptance of the new pricing.</p>

            <h2>8. Intellectual Property</h2>
            <p>The Platform, including all software, algorithms, designs, trademarks, and content (excluding Customer Data), is owned by or licenced to us and protected by applicable intellectual property laws. Nothing in these Terms transfers any intellectual property rights to you.</p>
            <p>If you provide feedback, suggestions, or ideas about the Platform, you grant us a perpetual, royalty-free licence to use and incorporate that feedback without restriction or compensation.</p>

            <h2>9. Confidentiality</h2>
            <p>Each party may disclose confidential information to the other in connection with the Services. The receiving party agrees to: keep confidential information secret; use it only for the purpose of these Terms; and disclose it only to employees and contractors who need to know it and are bound by equivalent confidentiality obligations.</p>
            <p>Confidentiality obligations do not apply to information that is publicly available, was independently developed, or must be disclosed by law.</p>

            <h2>10. Warranties and Disclaimers</h2>
            <p>We warrant that we will provide the Services with reasonable skill and care and in substantial accordance with the documentation.</p>
            <p>To the fullest extent permitted by law, we disclaim all other warranties, express or implied, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Platform will be error-free, uninterrupted, or meet your specific requirements.</p>
            <p>The Platform is provided as a tool to support — not replace — human judgement in talent decisions. We make no representation that use of the Platform will result in improved hiring outcomes or any other specific business result.</p>

            <h2>11. Limitation of Liability</h2>
            <p>To the maximum extent permitted by applicable law:</p>
            <ul>
              <li>Neither party will be liable for indirect, incidental, consequential, special, or punitive damages, or for loss of profits, revenue, data, or goodwill, even if advised of the possibility of such damages;</li>
              <li>Our total cumulative liability to you for all claims arising under or in connection with these Terms will not exceed the total fees you paid to us in the 12 months preceding the claim.</li>
            </ul>
            <p>Nothing in these Terms limits liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be limited by law.</p>

            <h2>12. Indemnification</h2>
            <p>You will indemnify, defend, and hold us harmless from and against any claims, damages, losses, and expenses (including reasonable legal fees) arising from: (a) your use of the Platform in violation of these Terms; (b) your Customer Data and your processing of it; (c) your violation of any applicable law; or (d) your employment or talent decisions.</p>

            <h2>13. Term and Termination</h2>
            <p>These Terms begin when you first access the Platform and continue until your Subscription expires or is terminated.</p>
            <p>Either party may terminate these Terms immediately if the other party: materially breaches these Terms and fails to cure within 30 days of notice; becomes insolvent; or ceases to operate.</p>
            <p>On termination, your licence to use the Platform ends immediately. We will make your Customer Data available for export for 30 days after termination, after which we will delete it in accordance with our data retention policy.</p>

            <h2>14. Changes to These Terms</h2>
            <p>We may update these Terms from time to time. When we make material changes, we will notify you by email and update the &ldquo;Last updated&rdquo; date. Continued use of the Platform after changes take effect constitutes acceptance of the updated Terms.</p>
            <p>If you do not accept updated Terms, you must stop using the Platform and cancel your Subscription before they take effect.</p>

            <h2>15. General</h2>
            <p><strong>Governing law:</strong> These Terms are governed by the laws of England and Wales. Any disputes will be resolved in the courts of England and Wales, subject to any mandatory local law provisions that apply in your jurisdiction.</p>
            <p><strong>Entire agreement:</strong> These Terms, together with our Privacy Policy, constitute the entire agreement between you and us regarding the Platform and supersede all prior agreements.</p>
            <p><strong>Severability:</strong> If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue in full force.</p>
            <p><strong>Waiver:</strong> Failure to enforce any provision of these Terms is not a waiver of our right to enforce it later.</p>
            <p><strong>Assignment:</strong> You may not assign these Terms or your rights under them without our written consent. We may assign these Terms in connection with a merger, acquisition, or sale of all or substantially all of our assets.</p>

            <h2>16. Contact</h2>
            <p>For questions about these Terms:</p>
            <ul>
              <li>Email: <strong>legal@rolefitai.com</strong></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
