import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Legal notice",
  description: "Publisher, host and contact details for the BXP website.",
  alternates: { canonical: "/legal-notice/" },
};

export default function Page() {
  return (
    <LegalPage title="Legal notice" updated="[TO COMPLETE]">
      <h2>Publisher</h2>
      <p>
        {SITE.fullName}. Legal form: [TO COMPLETE]. Registered office: [TO COMPLETE]. Company number: [TO COMPLETE]. VAT number: [TO COMPLETE]. Share capital: [TO COMPLETE].
      </p>
      <p>Publication director: [TO COMPLETE]. Contact: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
      <h2>Hosting</h2>
      <p>Host: [TO COMPLETE: company name, address, phone].</p>
      <h2>Intellectual property</h2>
      <p>
        The BXP name, logo, texts, images and videos belong to BXP or are used with the rights holders&rsquo; permission. Any reproduction without prior written consent is prohibited.
      </p>
      <h2>Liability</h2>
      <p>
        Programs, dates and inclusions are confirmed in the official BXP application. BXP does not guarantee contracts, trials, selection or progression in football.
      </p>
    </LegalPage>
  );
}
