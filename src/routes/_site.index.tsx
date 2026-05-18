import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { MenuItemCard } from "@/components/MenuItemCard";
import { menu, combos } from "@/lib/menu-data";
import { cart } from "@/lib/cart-store";
import { ArrowRight, Clock, MapPin, Star, Flame, Truck, Award, Zap } from "lucide-react";
import heroPizza from "@/assets/real-pepperoni.jpg";
import oven from "@/assets/oven.jpg";

export const Route = createFileRoute("/_site/")({
  head: () => ({
    meta: [
      { title: "Police Station Pizza — Ambridge's Square-Cut Legend" },
      { name: "description", content: "Hometown square-cut pizza, pepperoni rolls and fast pickup or delivery in Ambridge, PA. Order online in under 30 seconds." },
      { property: "og:title", content: "Police Station Pizza — Ambridge's Square-Cut Legend" },
      { property: "og:description", content: "Hand-stretched square pies, cup-and-char pepperoni, hot from our brick oven. Order online." },
    ],
  }),
  component: Home,
});

function Home() {
  const bestsellers = menu.filter((m) => m.bestseller);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-charcoal text-cream">
        <div className="absolute inset-0">
          <img src={heroPizza} alt="" className="h-full w-full object-cover opacity-50" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-end px-4 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-ember/40 bg-ember/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-ember backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-italian" /> Open Now · Closes 10pm
            </span>
            <h1 className="mt-6 font-display text-5xl font-black leading-[0.95] tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-8xl">
              The square-cut<br />
              <span className="text-ember">legend</span> of Ambridge.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-cream/80 md:text-xl">
              Hand-stretched dough, San Marzano sauce, cup-and-char pepperoni — baked in our brick oven and out the door in 15 minutes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/menu">
                <Button size="lg" className="h-14 rounded-full px-7 text-base font-bold shadow-glow animate-pulse-glow">
                  Order Now <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="h-14 rounded-full border-cream/30 bg-white/5 px-7 text-base font-bold text-cream backdrop-blur hover:bg-white/10 hover:text-cream"
                onClick={() => cart.setMode("delivery")}
              >
                <Truck className="h-5 w-5" /> Get it delivered
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-cream/70">
              <div className="flex items-center gap-2"><Star className="h-4 w-4 fill-ember text-ember" /> 4.9 · 2,300+ reviews</div>
              <div className="flex items-center gap-2"><Zap className="h-4 w-4 text-ember" /> 15-min average</div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-ember" /> Ambridge · Baden · Sewickley</div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="border-y border-border bg-charcoal py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6 font-display text-2xl font-black text-cream/40">
              <span>SQUARE CUT SINCE 2016</span><Flame className="h-5 w-5 text-ember" />
              <span>HOMETOWN PIZZA CULTURE</span><Flame className="h-5 w-5 text-ember" />
              <span>BRICK OVEN BAKED</span><Flame className="h-5 w-5 text-ember" />
              <span>AMBRIDGE, PA</span><Flame className="h-5 w-5 text-ember" />
              <span>OPEN LATE FRI & SAT</span><Flame className="h-5 w-5 text-ember" />
            </div>
          ))}
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Best Sellers</span>
            <h2 className="mt-2 font-display text-4xl font-black leading-none tracking-tight md:text-5xl">The hometown hits.</h2>
          </div>
          <Link to="/menu" className="hidden items-center gap-1 text-sm font-bold text-primary md:flex">
            Full menu <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {bestsellers.map((m) => <MenuItemCard key={m.id} item={m} />)}
        </div>
      </section>

      {/* COMBOS */}
      <section className="bg-secondary py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Combo Deals</span>
          <h2 className="mt-2 font-display text-4xl font-black leading-none tracking-tight md:text-5xl">Built to feed the crew.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {combos.map((c) => (
              <div key={c.id} className="group overflow-hidden rounded-3xl bg-charcoal text-cream shadow-deep">
                <div className="relative aspect-[5/3] overflow-hidden">
                  <img src={c.image} alt="" loading="lazy" className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
                  <span className="absolute right-3 top-3 rounded-full bg-italian px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-foreground">
                    Save ${c.savings}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl font-black">{c.name}</h3>
                  <p className="mt-1 text-sm text-cream/70">{c.description}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="font-display text-3xl font-black text-ember">${c.price}</span>
                    <Link to="/menu">
                      <Button className="h-11 rounded-full px-5 font-bold">Add to order</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REWARDS BANNER */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={oven} alt="" loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-charcoal/80" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-2 md:items-center md:px-8 md:py-28">
          <div className="text-cream">
            <Award className="h-10 w-10 text-ember" />
            <h2 className="mt-4 font-display text-4xl font-black leading-tight md:text-6xl">
              Join the <span className="text-ember">Backup Squad</span>.
            </h2>
            <p className="mt-4 max-w-md text-lg text-cream/80">
              Free slice on signup. Earn a point per dollar. Free pizza at 100. Birthday rolls on us.
            </p>
            <Link to="/rewards">
              <Button size="lg" className="mt-6 h-14 rounded-full px-8 text-base font-bold shadow-glow">
                Join Rewards — It's Free <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { n: "100k+", l: "Pizzas served" },
              { n: "4.9★", l: "On every platform" },
              { n: "15 min", l: "Average pickup" },
              { n: "2016", l: "Ambridge OG" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="font-display text-4xl font-black text-ember md:text-5xl">{s.n}</p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-cream/60">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Word on Merchant Street</span>
        <h2 className="mt-2 font-display text-4xl font-black leading-none tracking-tight md:text-5xl">Ambridge speaks.</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { q: "Grew up on this pizza. Moved to Pittsburgh and still drive 25 minutes for the corners.", n: "Joey C.", t: "Local since '99" },
            { q: "Pepperoni rolls are illegal they're so good. Order them. Trust me.", n: "Marisa T.", t: "Rewards member" },
            { q: "Fastest pickup in the Valley. Square cut is the only cut.", n: "Anthony D.", t: "Friday regular" },
          ].map((r) => (
            <div key={r.n} className="rounded-3xl border border-border bg-card p-7 shadow-card">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-ember text-ember" />)}
              </div>
              <p className="mt-4 font-display text-xl font-bold leading-snug text-balance">"{r.q}"</p>
              <div className="mt-5 border-t border-border pt-4">
                <p className="text-sm font-bold">{r.n}</p>
                <p className="text-xs text-muted-foreground">{r.t}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LOCAL PRIDE */}
      <section className="bg-charcoal py-20 text-cream md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-2 md:items-center md:px-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-ember">Ambridge Pizza Culture</span>
            <h2 className="mt-2 font-display text-4xl font-black leading-tight md:text-6xl">Built in the Beaver Valley.</h2>
            <p className="mt-5 text-lg text-cream/80">
              We started in a converted police station on Merchant Street. We still bake every pie to order in the same brick oven. The badge isn't a gimmick — it's where we're from.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-3"><Clock className="h-5 w-5 shrink-0 text-ember" /><div><strong>10 years</strong><br /><span className="text-cream/60">Same recipe</span></div></div>
              <div className="flex items-start gap-3"><MapPin className="h-5 w-5 shrink-0 text-ember" /><div><strong>10 mi radius</strong><br /><span className="text-cream/60">Hot delivery</span></div></div>
            </div>
          </div>
          <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-deep">
            <img src={oven} alt="Our brick oven in Ambridge" loading="lazy" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>
    </>
  );
}
