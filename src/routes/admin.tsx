import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { menu } from "@/lib/menu-data";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  LayoutDashboard, PizzaIcon, Calendar, Tag, ShoppingBag, Award, BarChart3, Settings, ArrowLeft,
  TrendingUp, DollarSign, Users
} from "lucide-react";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Owner Hub — Police Station Pizza" }] }),
  component: Admin,
});

const nav = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "menu", label: "Menu", icon: PizzaIcon },
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "deals", label: "Deals", icon: Tag },
  { id: "schedule", label: "Schedule", icon: Calendar },
  { id: "rewards", label: "Rewards", icon: Award },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

function Admin() {
  const [tab, setTab] = useState("overview");
  const [items, setItems] = useState(() => menu.map((m) => ({ ...m, available: true })));

  return (
    <div className="flex min-h-screen bg-secondary">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-border bg-card lg:flex">
        <div className="flex h-20 items-center gap-2.5 border-b border-border px-6">
          <img src={logo} alt="" className="h-10 w-10" />
          <div className="leading-none">
            <p className="font-display text-base font-black">Owner Hub</p>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Police Station Pizza</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {nav.map((n) => (
            <button
              key={n.id}
              onClick={() => setTab(n.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${tab === n.id ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
            >
              <n.icon className="h-4 w-4" /> {n.label}
            </button>
          ))}
        </nav>
        <Link to="/" className="m-3 flex items-center gap-2 rounded-xl border border-border px-3 py-2.5 text-sm font-semibold hover:bg-secondary">
          <ArrowLeft className="h-4 w-4" /> Back to site
        </Link>
      </aside>

      <div className="flex-1">
        {/* Top bar */}
        <header className="flex h-20 items-center justify-between border-b border-border bg-card px-6 md:px-10">
          <div>
            <h1 className="font-display text-2xl font-black capitalize">{tab}</h1>
            <p className="text-sm text-muted-foreground">Manage Police Station Pizza, Ambridge</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 rounded-full bg-italian/10 px-3 py-1.5 text-xs font-bold text-italian md:flex">
              <span className="h-2 w-2 rounded-full bg-italian" /> Store Open
            </span>
          </div>
        </header>

        <main className="p-6 md:p-10">
          {tab === "overview" && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-4">
                {[
                  { l: "Today's revenue", v: "$2,847", c: "+12%", i: DollarSign },
                  { l: "Orders today", v: "94", c: "+8%", i: ShoppingBag },
                  { l: "New rewards", v: "23", c: "+34%", i: Award },
                  { l: "Avg ticket", v: "$30.28", c: "+4%", i: TrendingUp },
                ].map((s) => (
                  <div key={s.l} className="rounded-2xl border border-border bg-card p-5 shadow-card">
                    <div className="flex items-center justify-between">
                      <s.i className="h-5 w-5 text-muted-foreground" />
                      <span className="text-xs font-bold text-italian">{s.c}</span>
                    </div>
                    <p className="mt-4 font-display text-3xl font-black">{s.v}</p>
                    <p className="text-sm text-muted-foreground">{s.l}</p>
                  </div>
                ))}
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-card lg:col-span-2">
                  <h3 className="font-display text-xl font-bold">Live orders</h3>
                  <div className="mt-4 space-y-2">
                    {[
                      { n: "#PSP-3847", c: "J. Carmine", t: "2 min ago", s: "Baking", a: "$32.50" },
                      { n: "#PSP-3846", c: "M. Torres", t: "5 min ago", s: "On the way", a: "$48.99" },
                      { n: "#PSP-3845", c: "A. DeLuca", t: "8 min ago", s: "Ready", a: "$22.50" },
                      { n: "#PSP-3844", c: "S. Pasquale", t: "12 min ago", s: "Picked up", a: "$67.20" },
                    ].map((o) => (
                      <div key={o.n} className="flex items-center justify-between rounded-xl bg-secondary px-4 py-3">
                        <div>
                          <p className="font-bold">{o.n} <span className="text-muted-foreground">· {o.c}</span></p>
                          <p className="text-xs text-muted-foreground">{o.t}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="rounded-full bg-ember/20 px-3 py-1 text-xs font-bold text-primary">{o.s}</span>
                          <span className="font-display text-lg font-black">{o.a}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                  <h3 className="font-display text-xl font-bold">Top sellers</h3>
                  <div className="mt-4 space-y-3">
                    {items.slice(0, 5).map((m, i) => (
                      <div key={m.id} className="flex items-center gap-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{i + 1}</span>
                        <img src={m.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                        <div className="flex-1 truncate">
                          <p className="truncate text-sm font-bold">{m.name}</p>
                          <p className="text-xs text-muted-foreground">{120 - i * 18} sold</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === "menu" && (
            <div className="rounded-2xl border border-border bg-card shadow-card">
              <div className="flex items-center justify-between border-b border-border p-5">
                <h3 className="font-display text-xl font-bold">Menu items</h3>
                <Button className="rounded-full">+ Add item</Button>
              </div>
              <div className="divide-y divide-border">
                {items.map((m) => (
                  <div key={m.id} className="flex items-center gap-4 p-4">
                    <img src={m.image} alt="" className="h-14 w-14 rounded-xl object-cover" />
                    <div className="flex-1">
                      <p className="font-bold">{m.name}</p>
                      <p className="text-sm text-muted-foreground">{m.category} · ${m.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold ${m.available ? "text-italian" : "text-muted-foreground"}`}>
                        {m.available ? "Available" : "Sold out"}
                      </span>
                      <Switch
                        checked={m.available}
                        onCheckedChange={(v) => setItems((prev) => prev.map((p) => p.id === m.id ? { ...p, available: v } : p))}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "orders" && (
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-display text-xl font-bold">All orders</h3>
              <p className="mt-2 text-muted-foreground">Real-time order management. Filter, refund, reprint — all in one place.</p>
              <div className="mt-6 grid gap-2">
                {[1,2,3,4,5,6,7].map((i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl border border-border p-4">
                    <div>
                      <p className="font-bold">#PSP-{3850 - i} · ${(20 + i * 7).toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">{i * 5} min ago · Pickup</p>
                    </div>
                    <Button size="sm" variant="outline" className="rounded-full">View</Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "deals" && (
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-display text-xl font-bold">Active deals</h3>
              <div className="mt-4 space-y-3">
                {[
                  { n: "Two-for-Tuesday", d: "Buy any 32-cut, get 2nd 50% off", on: true },
                  { n: "Lunch Slice + Soda", d: "$6 weekdays 11–2pm", on: true },
                  { n: "Friday Family Detail", d: "$10 off Family Detail combo", on: false },
                ].map((d) => (
                  <div key={d.n} className="flex items-center justify-between rounded-xl bg-secondary p-4">
                    <div>
                      <p className="font-bold">{d.n}</p>
                      <p className="text-sm text-muted-foreground">{d.d}</p>
                    </div>
                    <Switch defaultChecked={d.on} />
                  </div>
                ))}
              </div>
              <Button className="mt-5 rounded-full">+ Create new deal</Button>
            </div>
          )}

          {tab === "schedule" && (
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-display text-xl font-bold">Store hours</h3>
              <div className="mt-4 space-y-2">
                {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d) => (
                  <div key={d} className="flex items-center gap-4 rounded-xl border border-border p-3">
                    <span className="w-12 font-bold">{d}</span>
                    <Input className="h-10 max-w-32 rounded-lg" defaultValue="11:00" />
                    <span className="text-muted-foreground">to</span>
                    <Input className="h-10 max-w-32 rounded-lg" defaultValue={d === "Fri" || d === "Sat" ? "00:00" : "22:00"} />
                    <Switch defaultChecked />
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "rewards" && (
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { l: "Active members", v: "4,829" },
                { l: "Points redeemed (mo)", v: "127k" },
                { l: "Repeat order rate", v: "73%" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                  <p className="font-display text-4xl font-black">{s.v}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.l}</p>
                </div>
              ))}
            </div>
          )}

          {tab === "analytics" && (
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-display text-xl font-bold">This week</h3>
              <div className="mt-6 flex h-64 items-end justify-between gap-2">
                {[40, 55, 68, 50, 90, 95, 78].map((h, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-2">
                    <div className="w-full rounded-t-lg bg-gradient-ember" style={{ height: `${h}%` }} />
                    <span className="text-xs font-bold text-muted-foreground">{["M","T","W","T","F","S","S"][i]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "settings" && (
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-display text-xl font-bold">Store settings</h3>
              <div className="mt-4 space-y-4 max-w-lg">
                <div><label className="text-sm font-bold">Store name</label><Input className="mt-1.5 h-12 rounded-xl" defaultValue="Police Station Pizza" /></div>
                <div><label className="text-sm font-bold">Phone</label><Input className="mt-1.5 h-12 rounded-xl" defaultValue="(724) 266-1234" /></div>
                <div><label className="text-sm font-bold">Address</label><Input className="mt-1.5 h-12 rounded-xl" defaultValue="600 Merchant St, Ambridge PA" /></div>
                <Button className="rounded-full">Save changes</Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

void Users; // unused import guard
