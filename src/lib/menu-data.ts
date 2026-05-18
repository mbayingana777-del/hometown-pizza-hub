import cheeseSquare from "@/assets/cheese-square.jpg";
import cheese32 from "@/assets/cheese-32.jpg";
import pepperoni24 from "@/assets/pepperoni-24.jpg";
import pepperoniRolls from "@/assets/pepperoni-rolls.jpg";
import drinks from "@/assets/drinks.jpg";
import merchTee from "@/assets/merch-tee.jpg";
import heroPizza from "@/assets/hero-pizza.jpg";

export type MenuCategory = "Pizzas" | "Rolls" | "Slices" | "Drinks" | "Merch";

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

export const menu: MenuItem[] = [
  {
    id: "cheese-24",
    name: "Square Cheese — 24 Cut",
    description: "Our hometown classic. Hand-stretched dough, San Marzano sauce, aged mozzarella, baked until the corners caramelize.",
    price: 18.99,
    image: cheeseSquare,
    category: "Pizzas",
    badge: "Hometown Classic",
    bestseller: true,
  },
  {
    id: "cheese-32",
    name: "Square Cheese — 32 Cut",
    description: "Feed the whole crew. 32 perfect squares of golden, bubbly cheese with our signature corner crunch.",
    price: 24.99,
    image: cheese32,
    category: "Pizzas",
    bestseller: true,
  },
  {
    id: "pep-24",
    name: "Pepperoni — 24 Cut",
    description: "Cup-and-char pepperoni stacked edge to edge. Crispy curls, smoky oil, golden cheese underneath.",
    price: 22.99,
    image: pepperoni24,
    category: "Pizzas",
    badge: "Fan Favorite",
    bestseller: true,
  },
  {
    id: "pep-32",
    name: "Pepperoni — 32 Cut",
    description: "Party-size square pie loaded with cup-and-char pepperoni in every single square.",
    price: 28.99,
    image: heroPizza,
    category: "Pizzas",
  },
  {
    id: "pep-roll",
    name: "Pepperoni Roll",
    description: "Pizza dough wrapped around pepperoni and a blend of three cheeses. Sesame top, marinara on the side.",
    price: 6.99,
    image: pepperoniRolls,
    category: "Rolls",
    bestseller: true,
  },
  {
    id: "pep-roll-3pk",
    name: "Pepperoni Roll 3-Pack",
    description: "Three of our famous rolls, hot from the oven, with a side of house marinara.",
    price: 18.99,
    image: pepperoniRolls,
    category: "Rolls",
    badge: "Save $2",
  },
  {
    id: "slice-cheese",
    name: "Cheese Slice",
    description: "A single square of the classic. Perfect for a quick lunch.",
    price: 3.5,
    image: cheeseSquare,
    category: "Slices",
  },
  {
    id: "slice-pep",
    name: "Pepperoni Slice",
    description: "Same square, more pepperoni. Always.",
    price: 4.25,
    image: pepperoni24,
    category: "Slices",
  },
  {
    id: "soda",
    name: "Italian Soda",
    description: "Ice-cold glass bottle. Pick your flavor at checkout.",
    price: 3.5,
    image: drinks,
    category: "Drinks",
  },
  {
    id: "water",
    name: "Bottled Water",
    description: "Spring water, ice cold.",
    price: 2.0,
    image: drinks,
    category: "Drinks",
  },
  {
    id: "tee",
    name: "Station Badge Tee",
    description: "Black cotton tee with our vintage badge. Wear the legend.",
    price: 28.0,
    image: merchTee,
    category: "Merch",
  },
];

export const combos = [
  {
    id: "combo-family",
    name: "The Family Detail",
    description: "32-cut pepperoni + 3 pepperoni rolls + 4 sodas",
    price: 44.99,
    savings: 9,
    image: heroPizza,
  },
  {
    id: "combo-date",
    name: "The Off-Duty",
    description: "24-cut cheese + 2 pepperoni rolls + 2 sodas",
    price: 29.99,
    savings: 6,
    image: cheeseSquare,
  },
  {
    id: "combo-game",
    name: "The Backup Squad",
    description: "Two 32-cut pizzas (any combo) + 6 sodas",
    price: 58.99,
    savings: 12,
    image: pepperoni24,
  },
];

export const categories: MenuCategory[] = ["Pizzas", "Rolls", "Slices", "Drinks", "Merch"];
