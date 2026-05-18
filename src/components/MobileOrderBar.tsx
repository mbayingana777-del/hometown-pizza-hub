import { useCart, cart, cartTotals } from "@/lib/cart-store";
import { ShoppingBag } from "lucide-react";

export function MobileOrderBar() {
  const c = useCart();
  const { count, subtotal } = cartTotals(c.lines);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-xl shadow-deep lg:hidden">
      <button
        onClick={() => cart.open()}
        className="flex h-14 w-full items-center justify-between rounded-2xl bg-primary px-5 text-primary-foreground shadow-glow active:scale-[0.98] transition-transform"
      >
        <span className="flex items-center gap-2 font-bold">
          <ShoppingBag className="h-5 w-5" />
          {count > 0 ? `${count} in cart` : "Start Order"}
        </span>
        <span className="font-display text-lg font-black">
          {count > 0 ? `$${subtotal.toFixed(2)}` : "Order Now →"}
        </span>
      </button>
    </div>
  );
}
