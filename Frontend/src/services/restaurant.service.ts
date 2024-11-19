import axios from "axios";
import { createAuthorizationHeader } from "./token.service";

export const getAllRestaurants = () =>
  axios.get(
    `${process.env.REACT_APP_FOODIE_API_BASE_URL}/restaurants`,
    createAuthorizationHeader()
  );
