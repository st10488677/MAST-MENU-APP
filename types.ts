export type Screen = "home" | "chef" | "filter";
export type Course = "Starters" | "Main Course" | "Desserts";

export type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Course;
  image: any;
};
