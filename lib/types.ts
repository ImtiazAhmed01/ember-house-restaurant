export type Category =
  | "Starters"
  | "Mains"
  | "Tandoor & Grill"
  | "Rice & Biryani"
  | "Desserts"
  | "Drinks";

export type DietTag = "veg" | "vegan" | "gluten-free" | "spicy" | "contains-nuts";

export interface MenuItem {
  id: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  tags: DietTag[];
  spiceLevel: 0 | 1 | 2 | 3;
  popular?: boolean;
  chefPick?: boolean;
  available: boolean;
  /** Optional real photo URL. Falls back to generated `art` if absent or if it fails to load. */
  image?: string;
  art: {
    from: string;
    to: string;
    icon: "leaf" | "flame" | "fish" | "wheat" | "drumstick" | "soup" | "cake" | "cup";
  };
}

export interface CartLine {
  itemId: string;
  qty: number;
  note?: string;
}

export interface PlacedOrder {
  id: string;
  placedAt: string;
  lines: { itemId: string; name: string; price: number; qty: number }[];
  total: number;
  type: "delivery" | "pickup" | "dine-in";
  status: "received" | "preparing" | "ready" | "completed";
}

export interface TableSlot {
  time: string; // "18:30"
  capacity: number; // max party size for the slot bucket
  tablesLeft: number;
}

export interface Reservation {
  id: string;
  date: string; // ISO date
  time: string;
  partySize: number;
  name: string;
  phone: string;
  notes?: string;
  status: "confirmed" | "waitlisted";
  createdAt: string;
}

export interface WaitlistEntry {
  id: string;
  date: string;
  time: string;
  partySize: number;
  name: string;
  phone: string;
  createdAt: string;
}

export interface Profile {
  name: string;
  email: string;
  phone: string;
  avatarSeed: string;
}
