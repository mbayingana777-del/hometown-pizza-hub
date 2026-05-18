import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Flame, Plus, Minus } from "lucide-react";
import { TOPPINGS, TOPPING_PRICE, type MenuItem } from "@/lib/menu-data";
import { cart } from "@/lib/cart-store";

interface Props {
  item: MenuItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ToppingsModal({ item, open, onOpenChange }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (open) {
      setSelected([]);
      setQty(1);
    }
  }, [open, item?.id]);

  if (!item) return null;

  const toggle = (t: string) =>
    setSelected((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));

  const unitPrice = item.price + selected.length * TOPPING_PRICE;
  const total = unitPrice * qty;

  const handleAdd = () => {
    cart.add(item, qty, selected);
    onOpenChange(false);
    cart.open();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] gap-0 overflow-hidden p-0 sm:max-w-lg">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-secondary">
          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-5 pb-4 pt-12 text-cream">
            <DialogHeader className="space-y-1 text-left">
              <DialogTitle className="font-display text-2xl font-black leading-tight">
                {item.name}
              </DialogTitle>
              <DialogDescription className="text-sm text-cream/80">
                Build your square. Toppings ${TOPPING_PRICE.toFixed(2)} each.
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        <div className="max-h-[40vh] overflow-y-auto px-5 py-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Toppings
            </p>
            <p className="text-xs font-semibold text-muted-foreground">
              {selected.length} selected
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {TOPPINGS.map((t) => {
              const on = selected.includes(t);
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggle(t)}
                  className={`group flex items-center justify-between gap-2 rounded-xl border-2 p-3 text-left text-sm font-semibold transition-all active:scale-[0.98] ${
                    on
                      ? "border-primary bg-primary/5 text-foreground shadow-glow"
                      : "border-border bg-card text-foreground/80 hover:border-primary/50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all ${
                        on ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/30"
                      }`}
                    >
                      {on && <Check className="h-3 w-3" />}
                    </span>
                    <span className="leading-tight">{t}</span>
                  </span>
                  <span className={`text-xs ${on ? "text-primary" : "text-muted-foreground"}`}>
                    +${TOPPING_PRICE.toFixed(2)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="border-t border-border bg-card px-5 py-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 rounded-full border border-border p-1">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-8 text-center font-display text-lg font-black">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Subtotal
              </p>
              <p className="font-display text-2xl font-black text-primary">
                ${total.toFixed(2)}
              </p>
            </div>
          </div>
          <Button
            size="lg"
            onClick={handleAdd}
            className="h-14 w-full rounded-2xl text-base font-bold shadow-glow"
          >
            <Flame className="mr-1 h-4 w-4" /> Add to order · ${total.toFixed(2)}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
