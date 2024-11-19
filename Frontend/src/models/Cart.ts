import MenuType from "./Menu";
import { Restaurant } from "./Restaurant";

export interface CartItems {
  user: string;
  items: CartItemAndQuantity[][];
  totalAmount: number;
}

export type CartItemAndQuantity = {
  restaurant: Restaurant;
  quantity: number;
};
