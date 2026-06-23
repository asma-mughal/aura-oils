import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const Shipping = () => {
  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-serif text-3xl font-semibold md:text-4xl mb-8">
            Shipping Policy
          </h1>

          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <h2 className="font-serif text-xl font-medium">Order Processing</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  All orders are processed within 1–2 business days after confirmation.
                </li>
                <li>
                  Orders placed on weekends or holidays will be processed on the next
                  working day.
                </li>
                <li>
                  Once your order is shipped, you’ll receive a confirmation email or
                  WhatsApp message with tracking details.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium">Delivery Time</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  Standard delivery time is 3–7 business days depending on your location.
                </li>
                <li>
                  Delays may occur due to weather, courier issues, or high demand periods.
                </li>
                <li>
                  We work with trusted courier partners to ensure fast and reliable
                  delivery.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium">Shipping Charges</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  Shipping charges are calculated at checkout based on your delivery
                  address and order weight.
                </li>
                <li>
                  Free shipping may be offered on promotional orders or above a specific
                  purchase amount, as mentioned on our website.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium">
                Incorrect Address or Missed Delivery
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  Please ensure your delivery address is correct at checkout.
                </li>
                <li>
                  If the address is incorrect or delivery is missed due to customer
                  unavailability, re-delivery charges may apply.
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

export default Shipping;
