import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const Terms = () => {
  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-serif text-3xl font-semibold md:text-4xl mb-8">
            Terms of Service
          </h1>

          <div className="prose prose-gray max-w-none space-y-6 text-muted-foreground">
            <p>Last updated: December 2024</p>

            <section>
              <h2 className="font-serif text-xl font-medium text-foreground">
                Acceptance of Terms
              </h2>
              <p>
                By accessing and using the PureOils website, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-foreground">
                Products and Pricing
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>All prices are in Pakistani Rupees (PKR)</li>
                <li>Prices are subject to change without notice</li>
                <li>We reserve the right to limit quantities</li>
                <li>Product images are for illustration purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-foreground">
                Orders and Payment
              </h2>
              <p>
                By placing an order, you agree to provide accurate information. We reserve the right to cancel any order for any reason. Cash on Delivery is our primary payment method.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-foreground">
                Returns and Refunds
              </h2>
              <p>
                Please refer to our Returns page for detailed information about our return and refund policy.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-foreground">
                Limitation of Liability
              </h2>
              <p>
                PureOils shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-foreground">
                Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these terms at any time. Continued use of the website constitutes acceptance of updated terms.
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

export default Terms;
