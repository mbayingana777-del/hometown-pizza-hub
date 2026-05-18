import cheeseSquare from "@/assets/cheese-square.jpg";
import cheese32 from "@/assets/cheese-32.jpg";
import pepperoni24 from "@/assets/pepperoni-24.jpg";
import pepperoniRolls from "@/assets/pepperoni-rolls.jpg";
import drinks from "@/assets/drinks.jpg";
import merchTee from "@/assets/merch-tee.jpg";
import heroPizza from "@/assets/hero-pizza.jpg";

export type MenuCategory = "Pizzas" | "Take & Bake" | "Rolls" | "Slices" | "Drinks" | "Merch";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: MenuCategory;
  badge?: string;
  bestseller?: boolean;
}

// Prices per the hometown chalkboard:
// Baked: 12-cut $16.00 · 24-cut $31.00
// Unbaked (take & bake): 12-cut $15.50 · 24-cut $30.00
// Toppings (pepperoni, bacon, sausage, mushrooms, olives, anchovies,
// sweet/banana/roasted red peppers, extra cheese): +$0.40 each
// Pepperoni Roll $6.50 · By the slice $1.40 · T-shirt $15
export const menu: MenuItem[] = [
  {
    id: "cheese-12",
    name: "Square Cheese — 12 Cut",
    description: "Our hometown classic. Hand-stretched dough, house sauce, aged mozzarella, baked until the corners caramelize.",
    price: 16.0,
    image: cheeseSquare,
    category: "Pizzas",
    badge: "Hometown Classic",
    bestseller: true,
  },
  {
    id: "cheese-24",
    name: "Square Cheese — 24 Cut",
    description: "Feed the whole crew. 24 perfect squares of golden, bubbly cheese with our signature corner crunch.",
    price: 31.0,
    image: cheese32,
    category: "Pizzas",
    bestseller: true,
  },
  {
    id: "pep-12",
    name: "Pepperoni — 12 Cut",
    description: "Cup-and-char pepperoni stacked edge to edge. Crispy curls, smoky oil, golden cheese underneath. (Cheese pie + pepperoni topping.)",
    price: 16.4,
    image: pepperoni24,
    category: "Pizzas",
    badge: "Fan Favorite",
    bestseller: true,
  },
  {
    id: "pep-24",
    name: "Pepperoni — 24 Cut",
    description: "Party-size square pie loaded with cup-and-char pepperoni in every single square.",
    price: 31.4,
    image: heroPizza,
    category: "Pizzas",
  },
  {
    id: "tnb-cheese-12",
    name: "Take & Bake Cheese — 12 Cut",
    description: "Unbaked pie. Take it home, bake it fresh in your oven. Same dough, same sauce, same cheese.",
    price: 15.5,
    image: cheeseSquare,
    category: "Take & Bake",
  },
  {
    id: "tnb-cheese-24",
    name: "Take & Bake Cheese — 24 Cut",
    description: "Unbaked 24-cut pie ready for your oven. Perfect for parties on your timeline.",
    price: 30.0,
    image: cheese32,
    category: "Take & Bake",
  },
  {
    id: "pep-roll",
    name: "Pepperoni Roll",
    description: "Pizza dough wrapped around pepperoni and melty cheese. Marinara on the side.",
    price: 6.5,
    image: pepperoniRolls,
    category: "Rolls",
    bestseller: true,
  },
  {
    id: "slice-cheese",
    name: "Cheese Slice",
    description: "A single square of the classic. Perfect for a quick lunch.",
    price: 1.4,
    image: cheeseSquare,
    category: "Slices",
    badge: "$1.40",
  },
  {
    id: "slice-pep",
    name: "Pepperoni Slice",
    description: "Same square, more pepperoni. Always.",
    price: 1.8,
    image: pepperoni24,
    category: "Slices",
  },
  {
    id: "soda",
    name: "Italian Soda",
    description: "Ice-cold glass bottle. Pick your flavor at checkout.",
    price: 2.5,
    image: drinks,
    category: "Drinks",
  },
  {
    id: "water",
    name: "Bottled Water",
    description: "Spring water, ice cold.",
    price: 1.5,
    image: drinks,
    category: "Drinks",
  },
  {
    id: "tee",
    name: "Station Badge Tee",
    description: "Black cotton tee with our vintage badge. Wear the legend.",
    price: 15.0,
    image: merchTee,
    category: "Merch",
  },
];

export const combos = [
  {
    id: "combo-family",
    name: "The Family Detail",
    description: "24-cut pepperoni + 3 pepperoni rolls + 4 sodas",
    price: 54.99,
    savings: 6,
    image: heroPizza,
  },
  {
    id: "combo-date",
    name: "The Off-Duty",
    description: "12-cut cheese + 2 pepperoni rolls + 2 sodas",
    price: 32.99,
    savings: 4,
    image: cheeseSquare,
  },
  {
    id: "combo-game",
    name: "The Backup Squad",
    description: "Two 24-cut pizzas (any combo) + 6 sodas",
    price: 74.99,
    savings: 10,
    image: pepperoni24,
  },
];

export const categories: MenuCategory[] = ["Pizzas", "Take & Bake", "Rolls", "Slices", "Drinks", "Merch"];
