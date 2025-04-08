
// Types for category data
export type Category = {
  id: string;
  name: string;
  icon: string;
};

// Laundry item categories
export const CATEGORIES: Category[] = [{
  id: "washing-dry-cleaning",
  name: "Washing and Dry Cleaning",
  icon: "👕"
}, {
  id: "household",
  name: "Household",
  icon: "🏠"
}, {
  id: "shoes",
  name: "Shoes",
  icon: "👞"
}, {
  id: "others",
  name: "Others",
  icon: "📦"
}];
