import { useSyncExternalStore } from "react";
import type { MenuItem } from "./menu-data";

export interface CartLine {
  item: MenuItem;
  qty: number;
}

interface CartState {
  lines: CartLine[];
  open: boolean;
  mode: "delivery" | "pickup";
}

const KEY = "psp-cart-v1";

const load = (): CartState => {
  if (typeof window === "undefined") return { lines: [], open: false, mode: "pickup" };
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...JSON.parse(raw), open: false };
  } catch {}
  return { lines: [], open: false, mode: "pickup" };
};

let state: CartState = load();
const listeners = new Set<() => void>();

const persist = () => {
  if (typeof window !== "undefined") {
    localStorage.setItem(KEY, JSON.stringify({ lines: state.lines, mode: state.mode }));
  }
};

const emit = () => {
  persist();
  listeners.forEach((l) => l());
};

export const cart = {
  subscribe: (l: () => void) => {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  get: () => state,
  add: (item: MenuItem, qty = 1) => {
    const existing = state.lines.find((l) => l.item.id === item.id);
    if (existing) {
      state = { ...state, lines: state.lines.map((l) => l.item.id === item.id ? { ...l, qty: l.qty + qty } : l) };
    } else {
      state = { ...state, lines: [...state.lines, { item, qty }] };
    }
    emit();
  },
  setQty: (id: string, qty: number) => {
    if (qty <= 0) {
      state = { ...state, lines: state.lines.filter((l) => l.item.id !== id) };
    } else {
      state = { ...state, lines: state.lines.map((l) => l.item.id === id ? { ...l, qty } : l) };
    }
    emit();
  },
  remove: (id: string) => {
    state = { ...state, lines: state.lines.filter((l) => l.item.id !== id) };
    emit();
  },
  clear: () => { state = { ...state, lines: [] }; emit(); },
  open: () => { state = { ...state, open: true }; emit(); },
  close: () => { state = { ...state, open: false }; emit(); },
  setMode: (mode: "delivery" | "pickup") => { state = { ...state, mode }; emit(); },
};

const serverSnap: CartState = { lines: [], open: false, mode: "pickup" };
export const useCart = () =>
  useSyncExternalStore(cart.subscribe, cart.get, () => serverSnap);

export const cartTotals = (lines: CartLine[]) => {
  const subtotal = lines.reduce((s, l) => s + l.item.price * l.qty, 0);
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const tax = subtotal * 0.07;
  const deliveryFee = subtotal > 0 ? 2.99 : 0;
  return { subtotal, count, tax, deliveryFee, total: subtotal + tax };
};
