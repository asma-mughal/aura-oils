import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Truck, CreditCard, Shield, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useCreateOrder } from "@/hooks/useOrders";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const createOrder = useCreateOrder();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: profile?.full_name?.split(" ")[0] || "",
    lastName: profile?.full_name?.split(" ").slice(1).join(" ") || "",
    email: user?.email || "",
    phone: profile?.phone || "",
    address: profile?.address || "",
    city: profile?.city || "",
    postalCode: "",
    notes: "",
  });

  const shippingCost = subtotal >= 5000 ? 0 : 250;
  const total = subtotal + shippingCost;

  const formatPrice = (price: number) => `Rs. ${price.toLocaleString()}`;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setIsSubmitting(true);

  try {
    const orderResult = await createOrder.mutateAsync({
      subtotal,
      shipping: shippingCost,
      total,
      payment_method: paymentMethod,
      customer_name: `${formData.firstName} ${formData.lastName}`,
      customer_email: formData.email,
      customer_phone: formData.phone,
      shipping_address: formData.address,
      shipping_city: formData.city,
      notes: formData.notes,
      items: items.map((item) => ({
        product_id: item.product.id,
        variant_id: item.variantId,
        product_name: item.product.name,
        variant_name: item.variantName,
        quantity: item.quantity,
        price: item.price,
      })),
    });
    await fetch(
      `https://zggakhdfiuzmsbjxbrqs.supabase.co/functions/v1/dynamic-endpoint`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpnZ2FraGRmaXV6bXNianhicnFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4MzU1NTAsImV4cCI6MjA5NzQxMTU1MH0.1dUMxIm8YZqVgRnOf61KZK-pWhuZVFWzYGlmCntmxSc`,
        },
        body: JSON.stringify({
          orderId: orderResult?.id, 
          email: formData.email,
        }),
      }
    );

    // 3. Clear cart
    clearCart();

    // 4. Success toast
    toast({
      title: "Order placed successfully!",
      description:
        "Thank you for your order. You will receive a confirmation email shortly.",
    });

    // 5. Redirect
    navigate("/");
  } catch (error: any) {
    toast({
      title: "Order failed",
      description: error.message || "Something went wrong. Please try again.",
      variant: "destructive",
    });
  } finally {
    setIsSubmitting(false);
  }
};

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="font-serif text-2xl font-semibold">Your cart is empty</h1>
          <p className="mt-2 text-muted-foreground">
            Add some products to your cart before checking out.
          </p>
          <Button variant="hero" className="mt-6" asChild>
            <Link to="/collections">Browse Products</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="mb-8">
          <Link
            to="/collections"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
          <h1 className="font-serif text-3xl font-semibold md:text-4xl">
            Checkout
          </h1>
          {!user && (
            <p className="mt-2 text-muted-foreground">
              <Link to="/account" className="text-primary hover:underline">Sign in</Link> to track your orders
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              <div className="rounded-xl border bg-card p-6">
                <h2 className="font-serif text-xl font-medium mb-4">
                  Contact Information
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+92 3XX XXX XXXX"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-xl border bg-card p-6">
                <h2 className="font-serif text-xl font-medium mb-4">
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="House #, Street, Area"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Order Notes (Optional)</Label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Any special instructions for delivery..."
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-xl border bg-card p-6">
                <h2 className="font-serif text-xl font-medium mb-4">
                  Payment Method
                </h2>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:border-primary transition-colors">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Truck className="h-5 w-5 text-primary" />
                        <span className="font-medium">Cash on Delivery (COD)</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Pay with cash when your order arrives
                      </p>
                    </Label>
                  </div>  
                </RadioGroup>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-xl border bg-card p-6 space-y-4">
                <h2 className="font-serif text-xl font-medium">Order Summary</h2>

                <div className="space-y-3 border-b pb-4">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.variantId}`}
                      className="flex gap-3"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {item.product.name}
                        </p>
                        {item.variantName && (
                          <p className="text-xs text-muted-foreground">
                            {item.variantName}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {shippingCost === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        formatPrice(shippingCost)
                      )}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4 flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span className="font-serif text-primary">
                    {formatPrice(total)}
                  </span>
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : `Place Order • ${formatPrice(total)}`}
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Checkout;
