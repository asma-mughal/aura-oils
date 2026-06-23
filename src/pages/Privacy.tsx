import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const Privacy = () => {
  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-serif text-3xl font-semibold md:text-4xl mb-8">
            Privacy Policy
          </h1>

          <div className="prose prose-gray max-w-none space-y-6 text-muted-foreground">
            <section>
              <p>
                At Organics By Shahida, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and safeguard your data when you visit our website or purchase our products.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-foreground">
                Information We Collect
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Shipping and billing address</li>
                <li>Payment and order details</li>
                <li>
                  Information you provide through contact forms or customer support
                </li>
                <li>
                  Website usage data such as browser type, device information, and IP address
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-foreground">
                How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process and deliver your orders</li>
                <li>Provide customer support</li>
                <li>Communicate order updates and shipping information</li>
                <li>Improve our products and website experience</li>
                <li>
                  Send promotional offers or newsletters (only if you choose to receive them)
                </li>
                <li>Prevent fraud and maintain website security</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-foreground">
                Payment Security
              </h2>
              <p>
                Payments are processed through secure payment providers. We do not store your complete payment card details on our servers.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-foreground">
                Sharing Your Information
              </h2>
              <p>
                We do not sell or rent your personal information. We may share your data only with trusted third parties who help us operate our business, such as:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Shipping and delivery partners</li>
                <li>Payment processors</li>
                <li>Website hosting and technical service providers</li>
                <li>Legal authorities when required by applicable law</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-foreground">
                Data Protection
              </h2>
              <p>
                We implement reasonable administrative and technical measures to help protect your personal information from unauthorized access, disclosure, or misuse. While we strive to safeguard your data, no method of internet transmission or electronic storage is completely secure.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-foreground">
                Your Rights
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request corrections to inaccurate information</li>
                <li>Request deletion of your personal information where appropriate</li>
                <li>Opt out of marketing communications at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-foreground">
                Third-Party Links
              </h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those external sites.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-foreground">
                Children’s Privacy
              </h2>
              <p>
                Our website is not intended for children under the age of 13, and we do not knowingly collect personal information from children.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-foreground">
                Contact Us
              </h2>
              <p>
                Organics By Shahida
                <br />
                Phone: +92 309 4939574
                <br />
                Email: organicsbyshahida@gmail.com
                <br />
                Address: Multan, Pakistan, 66000
              </p>
            </section>
          </div>

          <div className="mt-8 pt-8 border-t">
            <Link to="/" className="text-primary hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Privacy;
