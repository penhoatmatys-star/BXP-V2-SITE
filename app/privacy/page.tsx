import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy and cookies",
  description: "How the BXP website handles personal data and cookies.",
  alternates: { canonical: "/privacy/" },
};

export default function Page() {
  return (
    <LegalPage title="Privacy and cookies" updated="[TO COMPLETE]">
      <h2>Who is responsible</h2>
      <p>The data controller is {SITE.fullName}, [TO COMPLETE: address]. Contact: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
      <h2>What this website collects</h2>
      <p>
        This marketing website has no form and no account. It does not collect personal data itself. If you write to us by email, we use your message and address only to answer you.
      </p>
      <p>
        Applications, accounts and payments take place on the BXP application at <a href="https://bxpsport.com/app">bxpsport.com/app</a>, which has its own terms and data processing. [TO COMPLETE: link to the application&rsquo;s terms and privacy policy.]
      </p>
      <h2>Cookies and storage</h2>
      <p>
        The site sets no analytics or advertising cookie at present. The only item stored in your browser is your cookie choice (key <code>bxp-consent</code>), which stays on your device.
      </p>
      <p>
        If audience measurement is added, it will load only after you accept, and you can change your choice at any time with &ldquo;Cookie settings&rdquo; in the footer. [TO COMPLETE: name of the tool, purpose, retention.]
      </p>
      <h2>Your rights</h2>
      <ul>
        <li>access, correct or delete your data;</li>
        <li>object to or limit its use, and ask for portability;</li>
        <li>withdraw consent at any time;</li>
        <li>complain to your data protection authority.</li>
      </ul>
      <p>To use these rights, write to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
    </LegalPage>
  );
}
