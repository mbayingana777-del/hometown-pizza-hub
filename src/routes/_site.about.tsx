import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import oven from "@/assets/storefront-police.jpg";
import heroPizza from "@/assets/hero-pizza-new.jpg";

export const Route = createFileRoute("/_site/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Police Station Pizza" },
      { name: "description", content: "From a converted police station to Ambridge's square-cut legend. The story of Police Station Pizza." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="relative h-[60vh] overflow-hidden bg-charcoal text-cream">
        <img src={oven} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-transparent" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-12 md:px-8 md:pb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-ember">Est. 2016 · Ambridge, PA</span>
          <h1 className="mt-3 font-display text-5xl font-black leading-[0.9] tracking-tight md:text-8xl">
            The hometown<br />legend.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 md:py-28">
        <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
          <p className="font-display text-2xl font-bold leading-snug text-foreground">
            In 2016, Tony and Marisa Carbone bought the old Ambridge police station on Merchant Street. Three months later, they were pulling square-cut pies out of a brick oven where the holding cells used to be.
          </p>
          <p>
            The recipe came from Tony's grandfather — a Beaver Valley steelworker who learned to bake pizza in Naples during the war and never stopped. Hand-stretched dough, San Marzano sauce, aged mozzarella, cup-and-char pepperoni. Square cut, because that's how his family did it. Ten years later, that's still how we do it.
          </p>
          <p>
            We're not a chain. We're not trying to be. We're the place you grew up driving past, the place your kids beg for on Friday nights, the place that knows your order before you walk in.
          </p>
        </div>
      </section>

      <section className="bg-secondary py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-2 md:items-center md:px-8">
          <div className="aspect-square overflow-hidden rounded-3xl shadow-deep">
            <img src={heroPizza} alt="" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">What we believe</span>
            <h2 className="mt-2 font-display text-4xl font-black md:text-5xl">Fast doesn't mean fake.</h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Every pie is made to order. Every roll is shaped by hand. The oven runs at 650°F and the corners come out caramelized. That's the whole secret.
            </p>
            <Link to="/menu" className="mt-7 inline-block">
              <Button size="lg" className="rounded-full shadow-glow">Taste it for yourself</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
