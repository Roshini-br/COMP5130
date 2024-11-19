import axios from "axios";
import { CreateOrderPayload } from "../models/Orders";
import { createAuthorizationHeader } from "./token.service";

export const getOrdersForUser = async (userId: string) =>
  await axios.get(
    `${process.env.REACT_APP_FOODIE_API_BASE_URL}/orders/user/${userId}`,
    createAuthorizationHeader()
  );

export const createNewOrder = async (payload: CreateOrderPayload) =>
  await axios.post(
    `${process.env.REACT_APP_FOODIE_API_BASE_URL}/orders/create/`,
    { ...payload },
    createAuthorizationHeader()
  );
