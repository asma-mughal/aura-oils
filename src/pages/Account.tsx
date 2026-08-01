import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User, Package, LogOut, Mail, Lock, Loader2, Save, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useOrders } from "@/hooks/useOrders";
import { supabase } from "@/integrations/supabase/client";

const Account = () => {
  const { toast } = useToast();
  const { user, profile, isLoading: authLoading, signIn, signUp, signOut, refreshProfile } = useAuth();
  const { data: orders, isLoading: ordersLoading } = useOrders();

  const [isAuthSubmitting, setIsAuthSubmitting] = useState(false);
  const [isProfileSubmitting, setIsProfileSubmitting] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [profileForm, setProfileForm] = useState({
    full_name: "",
    phone: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    if (profile) {
      setProfileForm({
        full_name: profile.full_name || "",
        phone: profile.phone || "",
        address: profile.address || "",
        city: profile.city || "",
      });
    }
  }, [profile]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthSubmitting(true);

    const { error } = await signIn(loginData.email.trim(), loginData.password);

    if (error) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
      setLoginData({ email: "", password: "" });
    }
    setIsAuthSubmitting(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();

  if (registerData.password !== registerData.confirmPassword) {
    toast({
      title: "Passwords don't match",
      description: "Please make sure your passwords match.",
      variant: "destructive",
    });
    return;
  }

  setIsAuthSubmitting(true);

  const { error } = await signUp(
    registerData.email.trim(),
    registerData.password,
    registerData.name.trim()
  );

  if (error) {
    toast({
      title: "Registration failed",
      description: error.message,
      variant: "destructive",
    });
  } else {
    await signIn(
      registerData.email.trim(),
      registerData.password
    );

    toast({
      title: "Welcome!",
      description: "Account created successfully.",
    });

    setRegisterData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  }

  setIsAuthSubmitting(false);
};

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsProfileSubmitting(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: profileForm.full_name.trim(),
          phone: profileForm.phone.trim(),
          address: profileForm.address.trim(),
          city: profileForm.city.trim(),
        })
        .eq("id", user.id);

      if (error) throw error;

      await refreshProfile();
      toast({
        title: "Profile updated",
        description: "Your account information has been saved.",
      });
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProfileSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully.",
    });
  };

  const formatPrice = (price: number) => `Rs. ${price.toLocaleString()}`;
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-PK", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (authLoading) {
    return (
      <Layout>
        <div className="container py-16 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (user) {
    return (
      <Layout>
        <div className="container py-12 md:py-16">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="font-serif text-3xl font-semibold">My Account</h1>
                <p className="mt-1 text-muted-foreground">
                  Welcome back, {profile?.full_name || user.email}
                </p>
              </div>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              <div className="rounded-xl border bg-card p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Profile</h3>
                    <p className="text-sm text-muted-foreground break-all">{user.email}</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <p className="flex gap-2"><User className="h-4 w-4 text-primary" /> {profile?.full_name || "Name not set"}</p>
                  <p className="flex gap-2"><Phone className="h-4 w-4 text-primary" /> {profile?.phone || "Phone not set"}</p>
                  <p className="flex gap-2"><MapPin className="h-4 w-4 text-primary" /> {profile?.city || "City not set"}</p>
                </div>
              </div>

              <div className="lg:col-span-2 rounded-xl border bg-card p-6">
                <h2 className="font-serif text-xl font-medium mb-4">Edit Profile</h2>
                <form onSubmit={handleProfileUpdate} className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      value={profileForm.full_name}
                      onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })}
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      placeholder="+92 3XX XXX XXXX"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={profileForm.address}
                      onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                      placeholder="House #, Street, Area"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={profileForm.city}
                      onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                      placeholder="City"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button type="submit" variant="hero" className="w-full" disabled={isProfileSubmitting}>
                      {isProfileSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4" />
                          Save Profile
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            <div className="mt-8 rounded-xl border bg-card p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-medium">Order History</h2>
                  <p className="text-sm text-muted-foreground">{orders?.length || 0} total orders</p>
                </div>
              </div>

              {ordersLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : orders && orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="rounded-xl border p-5">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="font-medium">{order.order_number}</p>
                          <p className="text-sm text-muted-foreground">{formatDate(order.created_at)}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {order.customer_name} • {order.shipping_city}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-primary">{formatPrice(order.total)}</p>
                          <span
                            className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${order.status === "delivered"
                              ? "bg-green-100 text-green-700"
                              : order.status === "cancelled"
                                ? "bg-red-100 text-red-700"
                                : "bg-amber-100 text-amber-700"
                              }`}
                          >
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 rounded-xl border bg-muted/30">
                  <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No orders yet</p>
                  <Button variant="hero" className="mt-4" asChild>
                    <Link to="/">Start Shopping</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <div className="mx-auto max-w-md">
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <User className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-serif text-3xl font-semibold">Account</h1>
            <p className="mt-2 text-muted-foreground">
              Sign in or create an account to manage your orders
            </p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <div className="rounded-xl border bg-card p-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="your@email.com"
                        className="pl-10"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" variant="hero" className="w-full" disabled={isAuthSubmitting}>
                    {isAuthSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              </div>
            </TabsContent>

            <TabsContent value="register">
              <div className="rounded-xl border bg-card p-6">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Your name"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="your@email.com"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" variant="hero" className="w-full" disabled={isAuthSubmitting}>
                    {isAuthSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
