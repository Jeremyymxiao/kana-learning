import ContactUsPageContent from './page-content';
import { generateStructuredData } from './metadata';

export { generateMetadata } from './metadata';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const structuredData = generateStructuredData({ params: { locale } });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ContactUsPageContent />
    </>
  );
}
