import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Users, Calendar, Truck, Check } from "lucide-react";

export const Route = createFileRoute("/_site/catering")({
  head: () => ({
    meta: [
      { title: "Catering — Police Station Pizza" },
      { name: "description", content: "Feed the office, the team, the wedding. Square-cut catering for 10 to 500." },
    ],
  }),
  component: Catering,
});

const packages = [
  { n: "Squad Pack", p: 119, s: "Feeds 8–12", inc: ["3 × 24-cut cheese pizzas", "6 pepperoni rolls", "8 drinks"] },
  { n: "Office Detail", p: 229, s: "Feeds 20–30", inc: ["6 × 24-cut pizzas (mix it up)", "18 pepperoni rolls", "20 drinks", "Free setup"] },
  { n: "Big Op", p: 549, s: "Feeds 60–80", inc: ["15 × 24-cut pizzas", "Pepperoni roll tower (40)", "60 drinks", "Free delivery + setup", "Dedicated host"] },
];

function Catering() {
  return (
    <>
      <section className="bg-charcoal text-cream">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-ember">Catering</span>
          <h1 className="mt-2 font-display text-5xl font-black leading-[0.95] tracking-tight md:text-8xl">
            Feed the<br /><span className="text-ember">whole crew.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-cream/80">
            From 10-person office lunches to 500-person weddings — we'll bring the hometown to you. Hot out of the oven, on time, every time.
          </p>
          <div className="mt-8 grid max-w-2xl grid-cols-3 gap-4 text-sm">
            {[
              { i: Users, t: "10 to 500", d: "Any size" },
              { i: Calendar, t: "48 hrs notice", d: "Book ahead" },
              { i: Truck, t: "Free delivery", d: "$300+ orders" },
            ].map(({ i: Icon, t, d }) => (
              <div key={t} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <Icon className="h-5 w-5 text-ember" />
                <p className="mt-2 font-bold">{t}</p>
                <p className="text-xs text-cream/60">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <h2 className="font-display text-4xl font-black tracking-tight md:text-5xl">Pick a package.</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {packages.map((pkg, i) => (
            <div key={pkg.n} className={`relative overflow-hidden rounded-3xl border-2 p-7 shadow-card ${i === 1 ? "border-primary bg-primary/5" : "border-border bg-card"}`}>
              {i === 1 && <span className="absolute right-5 top-5 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">Most popular</span>}
              <h3 className="font-display text-3xl font-black">{pkg.n}</h3>
              <p className="mt-1 text-sm font-semibold text-muted-foreground">{pkg.s}</p>
              <p className="mt-4 font-display text-5xl font-black text-primary">${pkg.p}</p>
              <ul className="mt-6 space-y-2">
                {pkg.inc.map((line) => (
                  <li key={line} className="flex items-start gap-2 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-italian" /> {line}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <h2 className="font-display text-4xl font-black tracking-tight md:text-5xl">Tell us about it.</h2>
          <p className="mt-3 text-muted-foreground">We'll get back in under 2 hours during open hours.</p>
          <form className="mt-8 space-y-4 rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div><Label>Name</Label><Input className="mt-1.5 h-12 rounded-xl" /></div>
              <div><Label>Phone</Label><Input className="mt-1.5 h-12 rounded-xl" /></div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><Label>Date</Label><Input type="date" className="mt-1.5 h-12 rounded-xl" /></div>
              <div><Label>Headcount</Label><Input type="number" placeholder="25" className="mt-1.5 h-12 rounded-xl" /></div>
            </div>
            <div><Label>What's the occasion?</Label><Textarea className="mt-1.5 min-h-28 rounded-xl" placeholder="Office lunch, birthday party, etc." /></div>
            <Button size="lg" type="submit" className="h-14 w-full rounded-2xl text-base font-bold shadow-glow">Send catering request</Button>
          </form>
        </div>
      </section>
    </>
  );
}
