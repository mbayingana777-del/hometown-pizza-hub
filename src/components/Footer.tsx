import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, MapPin, Phone, Clock } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <img src={logo} alt="" className="h-16 w-16" />
            <p className="mt-4 font-display text-2xl font-black leading-tight">Police Station Pizza</p>
            <p className="mt-2 text-sm text-cream/60">Ambridge's square-cut legend since 2016.</p>
            <div className="mt-4 flex gap-3">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-primary">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-primary">
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-bold text-ember">Visit</h4>
            <ul className="mt-4 space-y-3 text-sm text-cream/80">
              <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-ember" /> 600 Merchant Street<br />Ambridge, PA 15003</li>
              <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-ember" /> (724) 266-1234</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-bold text-ember">Hours</h4>
            <ul className="mt-4 space-y-2 text-sm text-cream/80">
              <li className="flex items-start gap-2"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-ember" /><span><strong>Mon–Thu</strong><br />11am – 10pm</span></li>
              <li className="pl-6"><strong>Fri–Sat</strong> · 11am – 12am</li>
              <li className="pl-6"><strong>Sun</strong> · 12pm – 9pm</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-bold text-ember">Order</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/menu" className="text-cream/80 hover:text-ember">Full Menu</Link></li>
              <li><Link to="/rewards" className="text-cream/80 hover:text-ember">Rewards</Link></li>
              <li><Link to="/catering" className="text-cream/80 hover:text-ember">Catering</Link></li>
              <li><Link to="/about" className="text-cream/80 hover:text-ember">Our Story</Link></li>
              <li><Link to="/admin" className="text-cream/40 hover:text-ember">Owner Hub</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-cream/50 md:flex-row">
          <p>© 2026 Police Station Pizza. Made in Ambridge.</p>
          <p>The hometown legend, served fresh.</p>
        </div>
      </div>
    </footer>
  );
}
