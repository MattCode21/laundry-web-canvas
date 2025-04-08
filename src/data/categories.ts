
// Types for category data
export type Category = {
  id: string;
  name: string;
  icon?: string; // Making icon optional
};

// Laundry item categories
export const CATEGORIES: Category[] = [{
  id: "washing-dry-cleaning",
  name: "Washing and Dry Cleaning"
}, {
  id: "household",
  name: "Household"
}, {
  id: "shoes",
  name: "Shoes"
}, {
  id: "others",
  name: "Others"
}];
