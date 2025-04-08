
// Types for category data
export type Category = {
  id: string;
  name: string;
  icon?: string; // Making icon optional
};

// Laundry item categories
export const CATEGORIES: Category[] = [{
  id: "washing-drying",
  name: "Washing & Drying"
}, {
  id: "dry-cleaning",
  name: "Dry Cleaning"
}, {
  id: "stain-removal",
  name: "Stain Removal"
}, {
  id: "steam-press",
  name: "Steam Press"
}, {
  id: "blanket-cleaning",
  name: "Blanket Cleaning"
}, {
  id: "curtain-cleaning",
  name: "Curtain Cleaning"
}];
