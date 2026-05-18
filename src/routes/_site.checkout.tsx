import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCart, cart, cartTotals } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Truck, Store, Apple, CreditCard, Check, ArrowLeft, Award } from "lucide-react";

export const Route = createFileRoute("/_site/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Police Station Pizza" },
      { name: "description", content: "Fast, secure checkout. Apple Pay, card, or pay at pickup." },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const c = useCart();
  const navigate = useNavigate();
  const { subtotal, tax, deliveryFee } = cartTotals(c.lines);
  const [tip, setTip] = useState(15);
  const [step, setStep] = useState<"order" | "confirmed">("order");

  const tipAmount = (subtotal * tip) / 100;
  const total = subtotal + tax + (c.mode === "delivery" ? deliveryFee : 0) + tipAmount;

  if (c.lines.length === 0 && step === "order") {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-32 text-center">
        <h1 className="font-display text-4xl font-black">Your cart is empty.</h1>
        <p className="mt-3 text-muted-foreground">Add a square before checking out.</p>
        <Link to="/menu" className="mt-6">
          <Button size="lg" className="rounded-full">Browse the menu</Button>
        </Link>
      </div>
    );
  }

  if (step === "confirmed") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 md:py-24">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-italian text-accent-foreground shadow-glow">
            <Check className="h-10 w-10" strokeWidth={3} />
          </div>
          <h1 className="mt-6 font-display text-5xl font-black">Order in the oven.</h1>
          <p className="mt-3 text-lg text-muted-foreground">Order #PSP-{Math.floor(Math.random() * 9000 + 1000)} · Ready in ~15 min</p>
          <div className="mt-8 w-full rounded-3xl border border-border bg-card p-6 shadow-card">
            <div className="flex justify-between text-sm font-semibold"><span>Status</span><span className="text-italian">● Confirmed</span></div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-bold">
              {["Received", "Baking", c.mode === "delivery" ? "On the way" : "Ready"].map((s, i) => (
                <div key={s}>
                  <div className={`h-2 rounded-full ${i === 0 ? "bg-italian" : "bg-secondary"}`} />
                  <span className={`mt-2 block ${i === 0 ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3 rounded-2xl bg-ember/10 p-4">
              <Award className="h-6 w-6 text-primary" />
              <div className="text-sm">
                <strong>You earned {Math.floor(subtotal)} points!</strong>
                <span className="block text-muted-foreground">{100 - Math.floor(subtotal) % 100} away from a free pizza.</span>
              </div>
            </div>
          </div>
          <Link to="/" className="mt-8">
            <Button variant="outline" size="lg" className="rounded-full">Back to home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">
      <button onClick={() => navigate({ to: "/menu" })} className="mb-6 flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Keep ordering
      </button>
      <h1 className="font-display text-4xl font-black md:text-5xl">Checkout</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-6">
          {/* Mode */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <h2 className="font-display text-xl font-bold">How do you want it?</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                onClick={() => cart.setMode("pickup")}
                className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-5 transition-all ${c.mode === "pickup" ? "border-primary bg-primary/5" : "border-border"}`}
              >
                <Store className="h-7 w-7" />
                <span className="font-bold">Pickup</span>
                <span className="text-xs text-muted-foreground">Ready in 15 min</span>
              </button>
              <button
                onClick={() => cart.setMode("delivery")}
                className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-5 transition-all ${c.mode === "delivery" ? "border-primary bg-primary/5" : "border-border"}`}
              >
                <Truck className="h-7 w-7" />
                <span className="font-bold">Delivery</span>
                <span className="text-xs text-muted-foreground">25–35 min · $2.99</span>
              </button>
            </div>
          </div>

          {/* Contact */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <h2 className="font-display text-xl font-bold">Contact</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Joey C." className="mt-1.5 h-12 rounded-xl" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="(724) 555-0100" className="mt-1.5 h-12 rounded-xl" />
              </div>
            </div>
          </div>

          {/* Address */}
          {c.mode === "delivery" && (
            <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
              <h2 className="font-display text-xl font-bold">Delivery address</h2>
              <div className="mt-4 space-y-3">
                <Input placeholder="Start typing your address…" className="h-12 rounded-xl" />
                <div className="grid grid-cols-3 gap-3">
                  <Input placeholder="City" className="h-12 rounded-xl" />
                  <Input placeholder="State" className="h-12 rounded-xl" />
                  <Input placeholder="ZIP" className="h-12 rounded-xl" />
                </div>
              </div>
            </div>
          )}

          {/* Tip */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <h2 className="font-display text-xl font-bold">Add a tip</h2>
            <p className="mt-1 text-sm text-muted-foreground">100% goes to our crew.</p>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {[10, 15, 20, 25].map((t) => (
                <button
                  key={t}
                  onClick={() => setTip(t)}
                  className={`rounded-2xl py-4 font-bold transition-all ${tip === t ? "bg-primary text-primary-foreground shadow" : "bg-secondary"}`}
                >
                  {t}%
                </button>
              ))}
            </div>
          </div>

          {/* Payment */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <h2 className="font-display text-xl font-bold">Payment</h2>
            <div className="mt-4 space-y-3">
              <button className="flex w-full items-center justify-center gap-3 rounded-2xl bg-charcoal py-4 font-bold text-cream">
                <Apple className="h-5 w-5" /> Pay with Apple Pay
              </button>
              <button className="flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-border py-4 font-bold">
                <CreditCard className="h-5 w-5" /> Credit / Debit Card
              </button>
            </div>
          </div>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <h2 className="font-display text-xl font-bold">Order summary</h2>
            <div className="mt-4 space-y-3">
              {c.lines.map((l) => {
                const unit = l.item.price + l.toppings.length * 0.4;
                return (
                  <div key={l.lineId} className="flex justify-between gap-3 text-sm">
                    <span className="flex-1">
                      <strong>{l.qty}×</strong> {l.item.name}
                      {l.toppings.length > 0 && (
                        <span className="block text-xs text-muted-foreground">+ {l.toppings.join(", ")}</span>
                      )}
                    </span>
                    <span className="font-semibold">${(unit * l.qty).toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 space-y-1 border-t border-border pt-4 text-sm">
              <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              {c.mode === "delivery" && <div className="flex justify-between text-muted-foreground"><span>Delivery</span><span>${deliveryFee.toFixed(2)}</span></div>}
              <div className="flex justify-between text-muted-foreground"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Tip ({tip}%)</span><span>${tipAmount.toFixed(2)}</span></div>
              <div className="flex justify-between border-t border-border pt-3 font-display text-2xl font-black">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-2xl bg-ember/10 p-3 text-sm">
              <Award className="h-5 w-5 text-primary" />
              <span><strong>+{Math.floor(subtotal)} pts</strong> for this order</span>
            </div>
            <Button
              size="lg"
              onClick={() => { setStep("confirmed"); cart.clear(); }}
              className="mt-5 h-14 w-full rounded-2xl text-base font-bold shadow-glow"
            >
              Place order · ${total.toFixed(2)}
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">Secured · Tap to confirm</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
