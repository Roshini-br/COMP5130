import axios from "axios";
import { createAuthorizationHeader } from "./token.service";

export const createPayment = async (amountPayable: number) =>
  await axios.post(
    `${process.env.REACT_APP_FOODIE_API_BASE_URL}/payment`,
    {
      amount: amountPayable,
    },
    createAuthorizationHeader()
  );
