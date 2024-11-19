import { toast } from "react-toastify";
import interceptorInstance from "./interceptor";

export const createOrder = (payload: any) => {
  try {
    return interceptorInstance.post("order/create", {
      ...payload,
    });
  } catch (error) {
    console.error(error);
    toast.error("Oops something went wrong! That's on us.", {
      hideProgressBar: false,
    });
  }
};

export const getOrders = (user_id: String) => {
  try {
    return interceptorInstance.get(`order?user_id=${user_id}`);
  } catch (error) {
    console.error(error);
    toast.error("Oops something went wrong! That's on us.", {
      hideProgressBar: false,
    });
  }
};
