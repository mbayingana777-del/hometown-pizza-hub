import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { MenuItemCard } from "@/components/MenuItemCard";
import { menu, categories } from "@/lib/menu-data";

export const Route = createFileRoute("/_site/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Police Station Pizza" },
      { name: "description", content: "Square-cut pizzas, pepperoni rolls, slices, drinks and merch. Order online for pickup or delivery." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [active, setActive] = useState<string>(categories[0]);
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollTo = (c: string) => {
    setActive(c);
    refs.current[c]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.getAttribute("data-cat")!);
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: [0.1, 0.5] }
    );
    Object.values(refs.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <section className="bg-charcoal text-cream">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-ember">The Menu</span>
          <h1 className="mt-2 font-display text-5xl font-black tracking-tight md:text-7xl">Pick your square.</h1>
          <p className="mt-3 max-w-xl text-cream/70">Tap to add. Cart's always one tap away.</p>
        </div>
      </section>

      <div className="sticky top-16 z-30 border-b border-border bg-background/95 backdrop-blur-xl md:top-20">
        <div className="mx-auto max-w-7xl overflow-x-auto px-4 scrollbar-hide md:px-8">
          <div className="flex gap-2 py-3">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => scrollTo(c)}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition-all ${active === c ? "bg-primary text-primary-foreground shadow" : "bg-secondary text-foreground hover:bg-secondary/70"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
        {categories.map((c) => {
          const items = menu.filter((m) => m.category === c);
          if (items.length === 0) return null;
          return (
            <div
              key={c}
              data-cat={c}
              ref={(el) => { refs.current[c] = el; }}
              className="scroll-mt-32 pb-14"
            >
              <h2 className="mb-6 font-display text-3xl font-black tracking-tight md:text-4xl">{c}</h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((m) => <MenuItemCard key={m.id} item={m} />)}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
