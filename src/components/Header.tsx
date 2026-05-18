import { Link } from "@tanstack/react-router";
import { ShoppingBag, Menu, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { useCart, cart, cartTotals } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

export function Header() {
  const c = useCart();
  const { count } = cartTotals(c.lines);
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/menu", label: "Menu" },
    { to: "/rewards", label: "Rewards" },
    { to: "/catering", label: "Catering" },
    { to: "/about", label: "Our Story" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo} alt="Police Station Pizza" className="h-10 w-10 md:h-12 md:w-12" />
          <div className="hidden flex-col leading-none sm:flex">
            <span className="font-display text-base font-black tracking-tight">Police Station</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Pizza · Ambridge PA</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-semibold text-foreground/80 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="tel:+17242661234"
            className="hidden items-center gap-2 rounded-full border border-border px-3 py-2 text-sm font-semibold hover:bg-secondary md:flex"
          >
            <Phone className="h-4 w-4" /> (724) 266-1234
          </a>
          <Button
            onClick={() => cart.open()}
            className="relative h-11 rounded-full px-4 font-semibold"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="ml-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-ember px-1.5 text-xs font-bold text-charcoal">
                {count}
              </span>
            )}
          </Button>
          <button
            onClick={() => setOpen(!open)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border lg:hidden"
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-semibold hover:bg-secondary"
              >
                {l.label}
              </Link>
            ))}
            <a href="tel:+17242661234" className="flex items-center gap-2 rounded-lg px-3 py-3 text-base font-semibold">
              <Phone className="h-4 w-4" /> (724) 266-1234
            </a>
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" /> 600 Merchant St, Ambridge PA
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
