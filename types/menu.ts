export interface MenuItem {
  _id: string;
  food_name: string;
  price: number;
  ingredients: string;
  related_image: string;
  created_at: Date;
  updated_at: Date;
}

export interface MenuItemInput {
  food_name: string;
  price: number;
  ingredients: string;
  related_image: string;
} 