import ToolPage from "../components/ToolPage";

export default function CookiesPage() {
  return (
    <ToolPage
      title="Cookie Policy"
      description="Learn how PDFRocket uses cookies."
    >
      <div className="mx-auto max-w-4xl space-y-8 text-zinc-300">

        <section>
          <h2 className="mb-3 text-2xl font-bold text-white">
            What Are Cookies?
          </h2>

          <p>
            Cookies are small text files stored on your device that help websites
            function correctly, improve user experience, and provide anonymous
            analytics.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold text-white">
            How We Use Cookies
          </h2>

          <ul className="list-disc space-y-2 pl-6">
            <li>Remember your preferences.</li>
            <li>Measure website performance.</li>
            <li>Understand how visitors use PDFRocket.</li>
            <li>Improve our services.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold text-white">
            Advertising Cookies
          </h2>

          <p>
            We may use Google AdSense and other advertising partners. These
            services may use cookies to display relevant advertisements and
            measure advertising performance.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold text-white">
            Analytics
          </h2>

          <p>
            PDFRocket uses Google Analytics and Microsoft Clarity to understand
            how visitors interact with the website. This information helps us
            improve the user experience.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold text-white">
            Managing Cookies
          </h2>

          <p>
            Most web browsers allow you to control or disable cookies through
            your browser settings. Disabling cookies may affect certain features
            of the website.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-bold text-white">
            Contact
          </h2>

          <p>
            If you have any questions regarding this Cookie Policy, please visit
            our Contact page.
          </p>
        </section>

      </div>
    </ToolPage>
  );
}