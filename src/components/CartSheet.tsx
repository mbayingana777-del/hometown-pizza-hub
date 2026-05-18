import { useNavigate } from "@tanstack/react-router";
import { useCart, cart, cartTotals } from "@/lib/cart-store";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag, Truck, Store } from "lucide-react";
import { menu } from "@/lib/menu-data";

export function CartSheet() {
  const c = useCart();
  const { subtotal, tax, deliveryFee, count } = cartTotals(c.lines);
  const navigate = useNavigate();

  // upsell — items not in cart
  const inCart = new Set(c.lines.map((l) => l.item.id));
  const upsell = menu.filter((m) => !inCart.has(m.id) && m.bestseller).slice(0, 3);

  return (
    <Sheet open={c.open} onOpenChange={(o) => (o ? cart.open() : cart.close())}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-6 py-5">
          <SheetTitle className="font-display text-2xl font-black">Your Order</SheetTitle>
          <div className="mt-2 grid grid-cols-2 gap-2 rounded-full bg-secondary p-1">
            <button
              onClick={() => cart.setMode("pickup")}
              className={`flex items-center justify-center gap-2 rounded-full py-2 text-sm font-semibold transition-all ${c.mode === "pickup" ? "bg-primary text-primary-foreground shadow" : "text-foreground/60"}`}
            >
              <Store className="h-4 w-4" /> Pickup
            </button>
            <button
              onClick={() => cart.setMode("delivery")}
              className={`flex items-center justify-center gap-2 rounded-full py-2 text-sm font-semibold transition-all ${c.mode === "delivery" ? "bg-primary text-primary-foreground shadow" : "text-foreground/60"}`}
            >
              <Truck className="h-4 w-4" /> Delivery
            </button>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {c.lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground/40" />
              <p className="mt-4 font-display text-xl font-bold">Cart's empty</p>
              <p className="mt-1 text-sm text-muted-foreground">Add a square. You won't regret it.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {c.lines.map((l) => (
                <div key={l.item.id} className="flex gap-3 rounded-2xl border border-border/60 bg-card p-3 shadow-card animate-float-up">
                  <img src={l.item.image} alt="" className="h-20 w-20 shrink-0 rounded-xl object-cover" />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-bold leading-tight">{l.item.name}</p>
                      <button onClick={() => cart.remove(l.item.id)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-auto text-sm font-bold text-primary">${(l.item.price * l.qty).toFixed(2)}</p>
                    <div className="mt-2 flex items-center gap-1 self-start rounded-full border border-border">
                      <button onClick={() => cart.setQty(l.item.id, l.qty - 1)} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="min-w-6 text-center text-sm font-bold">{l.qty}</span>
                      <button onClick={() => cart.setQty(l.item.id, l.qty + 1)} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {upsell.length > 0 && (
                <div className="pt-4">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">People also order</p>
                  <div className="space-y-2">
                    {upsell.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => cart.add(m)}
                        className="flex w-full items-center gap-3 rounded-xl border border-dashed border-border p-2 text-left transition-colors hover:border-primary hover:bg-secondary"
                      >
                        <img src={m.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                        <div className="flex-1">
                          <p className="text-sm font-semibold leading-tight">{m.name}</p>
                          <p className="text-xs text-muted-foreground">${m.price.toFixed(2)}</p>
                        </div>
                        <Plus className="h-4 w-4 text-primary" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {c.lines.length > 0 && (
          <div className="border-t border-border bg-card px-6 py-4">
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
              {c.mode === "delivery" && <div className="flex justify-between text-muted-foreground"><span>Delivery</span><span>${deliveryFee.toFixed(2)}</span></div>}
              <div className="flex justify-between pt-2 font-display text-lg font-black">
                <span>Total</span>
                <span>${(subtotal + tax + (c.mode === "delivery" ? deliveryFee : 0)).toFixed(2)}</span>
              </div>
            </div>
            <Button
              size="lg"
              onClick={() => { cart.close(); navigate({ to: "/checkout" }); }}
              className="mt-4 h-14 w-full rounded-2xl text-base font-bold shadow-glow"
            >
              Checkout · {count} {count === 1 ? "item" : "items"}
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
