import axios from "axios";
import _ from "lodash";
import { CartItems } from "../models/Cart";
import { createAuthorizationHeader } from "./token.service";
import AddToCart from "../models/AddToCart";

function transformToCartItems(res: any): CartItems {
  if (res?.data) {
    const menuFilteredData =
      res?.data?.items?.map((item: any) => {
        const newItem = { ...item };
        const { restaurant } = newItem;
        if (restaurant) {
          const filteredMenu = _.filter(restaurant.menu, {
            name: newItem.name,
          });

          newItem.restaurant.menu = filteredMenu;
        }
        return newItem;
      }) ?? [];
    const cartGroupedByRestaurant = _.groupBy(
      menuFilteredData,
      (item) => item.restaurant?._id || "null"
    );

    const cartItems = Object.entries(cartGroupedByRestaurant)
      .filter(([key, value]) => !!key && key !== "null" && !!value)
      .map((item) => item[1]);

    return {
      totalAmount: res?.data?.totalAmount,
      items: cartItems,
      user: res?.data?.user,
    };
  }
  return {} as CartItems;
}

export const addToCart = (payload: AddToCart) =>
  axios.post(
    `${process.env.REACT_APP_FOODIE_API_BASE_URL}/cart/add`,
    {
      ...payload,
    },
    createAuthorizationHeader()
  );

export const getCart = async (userId: string): Promise<CartItems> => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_FOODIE_API_BASE_URL}/cart/${userId}`,
      createAuthorizationHeader()
    );
    return transformToCartItems(res);
  } catch (e) {
    console.log(e);
    return {} as CartItems;
  }
};

export const removeItemFromCart = (
  user: string,
  itemName: string,
  restaurantId: string
) =>
  axios.delete(
    `${process.env.REACT_APP_FOODIE_API_BASE_URL}/cart/remove/${user}/${itemName}/${restaurantId}`,
    createAuthorizationHeader()
  );

export const clearCartItems = (user: string) =>
  axios.delete(
    `${process.env.REACT_APP_FOODIE_API_BASE_URL}/cart/clear/${user}`,
    createAuthorizationHeader()
  );

export const updateItemQuantityInCart = (
  user: string,
  itemName: string,
  restaurantId: string,
  quantity: number
) =>
  axios.patch(
    `${process.env.REACT_APP_FOODIE_API_BASE_URL}/cart/update/${user}/${itemName}/${restaurantId}`,
    {
      quantity,
    },
    createAuthorizationHeader()
  );
  
    

  