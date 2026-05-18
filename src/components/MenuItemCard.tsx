import { useState } from "react";
import type { MenuItem } from "@/lib/menu-data";
import { cart } from "@/lib/cart-store";
import { Plus, Check, Flame } from "lucide-react";

export function MenuItemCard({ item }: { item: MenuItem }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    cart.add(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card shadow-card transition-all hover:shadow-deep hover:-translate-y-0.5">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {item.badge && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-charcoal/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cream backdrop-blur">
            <Flame className="h-3 w-3 text-ember" /> {item.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg font-bold leading-tight">{item.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-xl font-black text-primary">${item.price.toFixed(2)}</span>
          <button
            onClick={handleAdd}
            className={`flex h-11 items-center gap-1.5 rounded-full px-4 text-sm font-bold transition-all active:scale-95 ${added ? "bg-italian text-accent-foreground" : "bg-primary text-primary-foreground hover:shadow-glow"}`}
          >
            {added ? <><Check className="h-4 w-4" /> Added</> : <><Plus className="h-4 w-4" /> Add</>}
          </button>
        </div>
      </div>
    </div>
  );
}
