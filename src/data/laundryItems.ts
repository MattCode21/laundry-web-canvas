
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
  // Washing & Drying
  "washing-drying": [
    { id: "tshirt-wd", name: "T-SHIRT", price: 15, selected: false, quantity: 0 },
    { id: "shirt-wd", name: "SHIRT", price: 20, selected: false, quantity: 0 },
    { id: "pant-wd", name: "PANT", price: 30, selected: false, quantity: 0 },
    { id: "jacket-wd", name: "JACKET", price: 35, selected: false, quantity: 0 },
    { id: "sweatshirt-wd", name: "SWEATSHIRT", price: 25, selected: false, quantity: 0 },
    { id: "light-textiles-wd", name: "LIGHT TEXTILES", price: 15, selected: false, quantity: 0 },
    { id: "shorts-wd", name: "SHORTS", price: 25, selected: false, quantity: 0 },
    { id: "blankets-wd", name: "BLANKETS", price: 40, selected: false, quantity: 0 },
    { id: "pillow-case-wd", name: "PILLOW CASE", price: 8, selected: false, quantity: 0 }
  ],
  
  // Dry Cleaning
  "dry-cleaning": [
    { id: "tshirt-dc", name: "T-SHIRT", price: 32, selected: false, quantity: 0 },
    { id: "shirt-dc", name: "SHIRT", price: 40, selected: false, quantity: 0 },
    { id: "pant-dc", name: "PANT", price: 50, selected: false, quantity: 0 },
    { id: "jacket-dc", name: "JACKET", price: 55, selected: false, quantity: 0 },
    { id: "sweatshirt-dc", name: "SWEATSHIRT", price: 45, selected: false, quantity: 0 },
    { id: "light-textiles-dc", name: "LIGHT TEXTILES", price: 30, selected: false, quantity: 0 },
    { id: "shorts-dc", name: "SHORTS", price: 45, selected: false, quantity: 0 },
    { id: "blankets-dc", name: "BLANKETS", price: 60, selected: false, quantity: 0 },
    { id: "pillow-case-dc", name: "PILLOW CASE", price: 18, selected: false, quantity: 0 }
  ],
  
  // Stain Removal
  "stain-removal": [
    { id: "tshirt-sr", name: "T-SHIRT", price: 22, selected: false, quantity: 0 },
    { id: "shirt-sr", name: "SHIRT", price: 30, selected: false, quantity: 0 },
    { id: "pant-sr", name: "PANT", price: 40, selected: false, quantity: 0 },
    { id: "jacket-sr", name: "JACKET", price: 45, selected: false, quantity: 0 },
    { id: "sweatshirt-sr", name: "SWEATSHIRT", price: 35, selected: false, quantity: 0 },
    { id: "light-textiles-sr", name: "LIGHT TEXTILES", price: 20, selected: false, quantity: 0 },
    { id: "shorts-sr", name: "SHORTS", price: 35, selected: false, quantity: 0 },
    { id: "blankets-sr", name: "BLANKETS", price: 50, selected: false, quantity: 0 },
    { id: "pillow-case-sr", name: "PILLOW CASE", price: 12, selected: false, quantity: 0 }
  ],
  
  // Steam Press
  "steam-press": [
    { id: "tshirt-sp", name: "T-SHIRT", price: 10, selected: false, quantity: 0 },
    { id: "shirt-sp", name: "SHIRT", price: 15, selected: false, quantity: 0 },
    { id: "pant-sp", name: "PANT", price: 20, selected: false, quantity: 0 },
    { id: "jacket-sp", name: "JACKET", price: 25, selected: false, quantity: 0 },
    { id: "sweatshirt-sp", name: "SWEATSHIRT", price: 20, selected: false, quantity: 0 },
    { id: "light-textiles-sp", name: "LIGHT TEXTILES", price: 12, selected: false, quantity: 0 },
    { id: "shorts-sp", name: "SHORTS", price: 10, selected: false, quantity: 0 },
    { id: "blankets-sp", name: "BLANKETS", price: 40, selected: false, quantity: 0 },
    { id: "pillow-case-sp", name: "PILLOW CASE", price: 8, selected: false, quantity: 0 }
  ],
  
  // Blanket Cleaning
  "blanket-cleaning": [
    { id: "single-blanket", name: "SINGLE BLANKET", price: 45, selected: false, quantity: 0 },
    { id: "double-blanket", name: "DOUBLE BLANKET", price: 65, selected: false, quantity: 0 },
    { id: "queen-blanket", name: "QUEEN BLANKET", price: 80, selected: false, quantity: 0 },
    { id: "king-blanket", name: "KING BLANKET", price: 95, selected: false, quantity: 0 },
    { id: "duvet", name: "DUVET", price: 100, selected: false, quantity: 0 },
    { id: "quilt", name: "QUILT", price: 75, selected: false, quantity: 0 },
    { id: "comforter", name: "COMFORTER", price: 125, selected: false, quantity: 0 }
  ],
  
  // Curtain Cleaning
  "curtain-cleaning": [
    { id: "small-curtain", name: "SMALL CURTAIN", price: 60, selected: false, quantity: 0 },
    { id: "medium-curtain", name: "MEDIUM CURTAIN", price: 80, selected: false, quantity: 0 },
    { id: "large-curtain", name: "LARGE CURTAIN", price: 100, selected: false, quantity: 0 },
    { id: "blackout-curtain", name: "BLACKOUT CURTAIN", price: 105, selected: false, quantity: 0 },
    { id: "sheer-curtain", name: "SHEER CURTAIN", price: 90, selected: false, quantity: 0 },
    { id: "velvet-curtain", name: "VELVET CURTAIN", price: 120, selected: false, quantity: 0 }
  ]
};
