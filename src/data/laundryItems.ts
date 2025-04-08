
// Types for laundry items
export type LaundryItem = {
  id: string;
  name: string;
  price: number;
  selected: boolean;
  quantity: number;
};

// Mock data for laundry items by category
export const LAUNDRY_ITEMS: Record<string, LaundryItem[]> = {
  "washing-dry-cleaning": [{
    id: "tshirt",
    name: "T-SHIRT",
    price: 15,
    selected: false,
    quantity: 0
  }, {
    id: "shirt",
    name: "SHIRT",
    price: 20,
    selected: false,
    quantity: 0
  }, {
    id: "pant",
    name: "PANT",
    price: 25,
    selected: false,
    quantity: 0
  }, {
    id: "jeans1",
    name: "JEANS",
    price: 30,
    selected: false,
    quantity: 0
  }, {
    id: "jacket",
    name: "JACKET",
    price: 40,
    selected: false,
    quantity: 0
  }, {
    id: "sweatshirt",
    name: "SWEATSHIRT",
    price: 35,
    selected: false,
    quantity: 0
  }, {
    id: "jeans2",
    name: "JEANS",
    price: 30,
    selected: false,
    quantity: 0
  }, {
    id: "shorts",
    name: "SHORTS",
    price: 20,
    selected: false,
    quantity: 0
  }, {
    id: "blankets",
    name: "BLANKETS",
    price: 50,
    selected: false,
    quantity: 0
  }],
  household: [{
    id: "bedsheet",
    name: "BEDSHEET",
    price: 40,
    selected: false,
    quantity: 0
  }, {
    id: "curtains",
    name: "CURTAINS",
    price: 60,
    selected: false,
    quantity: 0
  }, {
    id: "towels",
    name: "TOWELS",
    price: 25,
    selected: false,
    quantity: 0
  }],
  shoes: [{
    id: "sneakers",
    name: "SNEAKERS",
    price: 70,
    selected: false,
    quantity: 0
  }, {
    id: "formal",
    name: "FORMAL SHOES",
    price: 80,
    selected: false,
    quantity: 0
  }],
  others: [{
    id: "bag",
    name: "BAG",
    price: 90,
    selected: false,
    quantity: 0
  }, {
    id: "cap",
    name: "CAP",
    price: 15,
    selected: false,
    quantity: 0
  }]
};
