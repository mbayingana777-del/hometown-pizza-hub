import { useSyncExternalStore } from "react";
import type { MenuItem } from "./menu-data";
import { TOPPING_PRICE } from "./menu-data";

export interface CartLine {
  /** Unique per-line id so two of the same item with different toppings are separate lines. */
  lineId: string;
  item: MenuItem;
  qty: number;
  toppings: string[];
}

interface CartState {
  lines: CartLine[];
  open: boolean;
  mode: "delivery" | "pickup";
}

const KEY = "psp-cart-v2";

const load = (): CartState => {
  if (typeof window === "undefined") return { lines: [], open: false, mode: "pickup" };
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const lines: CartLine[] = (parsed.lines || []).map((l: CartLine) => ({
        ...l,
        toppings: l.toppings ?? [],
        lineId: l.lineId ?? `${l.item.id}-${Math.random().toString(36).slice(2, 8)}`,
      }));
      return { lines, open: false, mode: parsed.mode ?? "pickup" };
    }
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

const lineKey = (id: string, toppings: string[]) =>
  `${id}::${[...toppings].sort().join("|")}`;

const makeLineId = (id: string, toppings: string[]) =>
  `${id}-${[...toppings].sort().join("-") || "plain"}`;

export const lineUnitPrice = (line: CartLine) =>
  line.item.price + line.toppings.length * TOPPING_PRICE;

export const cart = {
  subscribe: (l: () => void) => {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  get: () => state,
  add: (item: MenuItem, qty = 1, toppings: string[] = []) => {
    const key = lineKey(item.id, toppings);
    const existing = state.lines.find((l) => lineKey(l.item.id, l.toppings) === key);
    if (existing) {
      state = {
        ...state,
        lines: state.lines.map((l) =>
          lineKey(l.item.id, l.toppings) === key ? { ...l, qty: l.qty + qty } : l,
        ),
      };
    } else {
      state = {
        ...state,
        lines: [
          ...state.lines,
          { lineId: makeLineId(item.id, toppings), item, qty, toppings },
        ],
      };
    }
    emit();
  },
  setQty: (lineId: string, qty: number) => {
    if (qty <= 0) {
      state = { ...state, lines: state.lines.filter((l) => l.lineId !== lineId) };
    } else {
      state = {
        ...state,
        lines: state.lines.map((l) => (l.lineId === lineId ? { ...l, qty } : l)),
      };
    }
    emit();
  },
  remove: (lineId: string) => {
    state = { ...state, lines: state.lines.filter((l) => l.lineId !== lineId) };
    emit();
  },
  clear: () => {
    state = { ...state, lines: [] };
    emit();
  },
  open: () => {
    state = { ...state, open: true };
    emit();
  },
  close: () => {
    state = { ...state, open: false };
    emit();
  },
  setMode: (mode: "delivery" | "pickup") => {
    state = { ...state, mode };
    emit();
  },
};

const serverSnap: CartState = { lines: [], open: false, mode: "pickup" };
export const useCart = () =>
  useSyncExternalStore(cart.subscribe, cart.get, () => serverSnap);

export const cartTotals = (lines: CartLine[]) => {
  const subtotal = lines.reduce((s, l) => s + lineUnitPrice(l) * l.qty, 0);
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const tax = subtotal * 0.07;
  const deliveryFee = subtotal > 0 ? 2.99 : 0;
  return { subtotal, count, tax, deliveryFee, total: subtotal + tax };
};
