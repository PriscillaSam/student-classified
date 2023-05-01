export type Ad = {
  id: string;
  title: string;
  description: string;
  priceRange: string;
  isActive: boolean;
  location: string;
  category: {
    id: string;
    name: string;
  };
};
