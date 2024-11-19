import MenuType from "./Menu";

export interface Restaurant {
  _id: string;
  name: string;
  image: string;
  rating: number;
  cuisine: string;
  address: string;
  menu: MenuType[];
}
