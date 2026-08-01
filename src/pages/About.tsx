import { Link } from "react-router-dom";
import { Leaf, Heart, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import MainImage from '../assets/WhatsApp Image 2026-06-19 at 5.28.58 PM.jpeg'
const values = [
  {
    icon: Leaf,
    title: "100% Natural",
    description:
      "We source only the purest organic ingredients, ensuring every drop of our oil is free from harmful chemicals.",
  },
  {
    icon: Heart,
    title: "Made with Love",
    description:
      "Each product is carefully crafted with attention to detail and passion for creating the best for your skin and hair.",
  },
  {
    icon: Award,
    title: "Quality First",
    description:
      "Every batch undergoes rigorous testing to ensure the highest quality and effectiveness.",
  },
  {
    icon: Users,
    title: "Customer Focus",
    description:
      "Your satisfaction is our priority. We listen to your needs and continuously improve our products.",
  },
];

const About = () => {
  return (
    <Layout>
     <section className="relative bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl font-semibold md:text-5xl lg:text-6xl">
              About Organics By Shahida
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              A passion-driven brand dedicated to natural, safe, and effective
              personal care products inspired by nature and traditional wellness.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6">
              <h2 className="font-serif text-3xl font-semibold md:text-4xl">
                Our Journey
              </h2>
               <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Organics By Shahida started with a simple goal — to provide
                  safe, natural, and effective products that people can trust
                  for their daily self-care.
                </p>

                <p>
                  We saw a growing need for clean and chemical-free personal
                  care products in Pakistan, which inspired us to build a brand
                  rooted in purity and transparency.
                </p>

                <p>
                  Today, we proudly serve customers across the country,
                  offering thoughtfully crafted products made with natural
                  ingredients and honest practices.
                </p>
              </div>
              <Button variant="hero" asChild>
                <Link to="/">Explore Our Products</Link>
              </Button>
            </div>
            <div className="relative">
              <img
                src={MainImage}
                alt="Natural oils and botanicals"
                className="rounded-2xl shadow-medium"
              />
              <div className="absolute -bottom-6 -left-6 rounded-xl bg-primary p-6 text-primary-foreground shadow-lg hidden md:block">
                <p className="font-serif text-3xl font-semibold">60,000+</p>
                <p className="text-sm opacity-90">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-semibold md:text-4xl">
              Our Values
            </h2>
            <p className="mt-2 text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div
                key={index}
                className="rounded-xl border bg-card p-6 text-center shadow-card"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-medium">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-2xl bg-primary p-8 text-center md:p-12">
            <h2 className="font-serif text-2xl font-semibold text-primary-foreground md:text-3xl">
              Ready to Experience the Difference?
            </h2>
            <p className="mt-4 text-primary-foreground/80">
              Join thousands of happy customers who have transformed their hair
              and skin with our premium organic oils.
            </p>
            <Button variant="secondary" size="lg" className="mt-6" asChild>
              <Link to="/">Shop Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
