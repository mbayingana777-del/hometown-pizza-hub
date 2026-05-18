import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Award, Gift, Cake, Crown, Sparkles, Check } from "lucide-react";

export const Route = createFileRoute("/_site/rewards")({
  head: () => ({
    meta: [
      { title: "Rewards — Police Station Pizza" },
      { name: "description", content: "Join the Backup Squad. Earn points on every order. Free slices, birthday rolls, VIP perks." },
    ],
  }),
  component: Rewards,
});

const tiers = [
  { name: "Rookie", min: 0, color: "bg-muted", perks: ["Free slice on signup", "1 pt per $1 spent"] },
  { name: "Detective", min: 250, color: "bg-ember", perks: ["Free pepperoni roll monthly", "Early access to specials"] },
  { name: "Chief", min: 1000, color: "bg-primary", perks: ["Free pizza every month", "Skip the line on Fridays", "Birthday rolls + slice"] },
  { name: "Legend", min: 5000, color: "bg-charcoal", perks: ["Lifetime free Friday slice", "VIP-only menu drops", "Owner Hub access"] },
];

function Rewards() {
  return (
    <>
      <section className="relative overflow-hidden bg-charcoal text-cream">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-2 md:items-center md:px-8 md:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-ember/40 bg-ember/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-ember">
              <Award className="h-3 w-3" /> Backup Squad Rewards
            </span>
            <h1 className="mt-5 font-display text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Pizza loyalty,<br /><span className="text-ember">but worth it.</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-cream/80">Free slice the day you sign up. Free pizza every 100 points. Birthday surprises. No catch.</p>
            <div className="mt-8 flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur sm:flex-row">
              <Input placeholder="Phone or email" className="h-12 flex-1 rounded-2xl border-0 bg-white/10 text-cream placeholder:text-cream/40" />
              <Button size="lg" className="h-12 rounded-2xl px-6 font-bold shadow-glow">Get my free slice</Button>
            </div>
            <p className="mt-2 text-xs text-cream/50">SMS rewards drop weekly. Reply STOP to opt out.</p>
          </div>

          <div className="relative">
            <div className="aspect-[3/4] rounded-3xl bg-gradient-ember p-1 shadow-deep">
              <div className="flex h-full flex-col rounded-[22px] bg-charcoal p-8 text-cream">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-ember">Backup Squad</p>
                    <p className="mt-1 font-display text-2xl font-black">VIP Card</p>
                  </div>
                  <Crown className="h-8 w-8 text-ember" />
                </div>
                <div className="my-auto">
                  <p className="font-display text-7xl font-black text-ember">340</p>
                  <p className="mt-1 font-semibold text-cream/70">points</p>
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[34%] bg-ember" />
                  </div>
                  <p className="mt-2 text-sm text-cream/60">660 to your next free pizza</p>
                </div>
                <div>
                  <p className="text-xs text-cream/50">MEMBER · J. CARMINE</p>
                  <p className="font-display text-lg font-bold">DETECTIVE TIER</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Climb the Ranks</span>
        <h2 className="mt-2 font-display text-4xl font-black tracking-tight md:text-5xl">Four tiers. All free.</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((t) => (
            <div key={t.name} className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
              <div className={`h-2 ${t.color}`} />
              <div className="p-6">
                <h3 className="font-display text-2xl font-black">{t.name}</h3>
                <p className="mt-1 text-sm font-semibold text-muted-foreground">{t.min}+ pts</p>
                <ul className="mt-4 space-y-2">
                  {t.perks.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-italian" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Perks */}
      <section className="bg-secondary py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { i: Gift, t: "Free slice on signup", d: "Hit join, hit the door. Slice on us." },
              { i: Cake, t: "Birthday bash", d: "Free pepperoni roll + slice on your day." },
              { i: Sparkles, t: "Weekly drops", d: "VIP-only specials texted Fridays." },
            ].map(({ i: Icon, t, d }) => (
              <div key={t} className="rounded-3xl bg-card p-7 shadow-card">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-ember text-cream">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-black">{t}</h3>
                <p className="mt-2 text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
