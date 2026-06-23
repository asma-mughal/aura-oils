import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const Returns = () => {
  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-serif text-3xl font-semibold md:text-4xl mb-8">
            Returns & Refunds
          </h1>

          <div className="prose prose-gray max-w-none space-y-6 text-muted-foreground">
            
            <section>
              <p>
                At Organics by Shahida, we value your satisfaction and stand
                behind the quality of our products. If you’re not completely
                happy with your purchase, we’re here to help.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-foreground">
                Returns
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  You can request a return within 7 days of receiving your order.
                </li>
                <li>
                  The product must be unused, unopened, and in its original packaging.
                </li>
                <li>
                  Used or damaged items are not eligible for return.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-foreground">
                Refunds
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Once we receive and inspect your return, we’ll notify you by email or WhatsApp.
                </li>
                <li>
                  If approved, your refund will be processed within 5–10 business days to your original payment method.
                </li>
                <li>
                  Shipping and handling charges are non-refundable.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-foreground">
                Exchanges
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  We only replace items if they are defective or damaged.
                </li>
                <li>
                  To request an exchange, contact us within 3 days of receiving your order.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-foreground">
                Non-returnable items
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Personal care and hygiene products can’t be returned once opened.
                </li>
                <li>
                  Sale, discounted, or promotional items are non-refundable.
                </li>
              </ul>
            </section>
          </div>

          <div className="mt-8 pt-8 border-t">
            <Link to="/contact" className="text-primary hover:underline">
              ← Back to Contact
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Returns;
