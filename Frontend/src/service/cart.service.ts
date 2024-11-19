import { toast } from "react-toastify";
import interceptorInstance from "./interceptor";

export const addProduct = (payload: any) => {
  try {
    return interceptorInstance.post("cart/addProduct", {
      ...payload,
    });
  } catch (error) {
    console.error(error);
    toast.error("Oops something went wrong! That's on us.", {
      hideProgressBar: false,
    });
  }
};

export const getCart = (user_id: String) => {
  try {
    return interceptorInstance.get(`cart?user_id=${user_id}`);
  } catch (error) {
    console.error(error);
    toast.error("Oops something went wrong! That's on us.", {
      hideProgressBar: false,
    });
  }
};

export const removeProduct = (payload: any) => {
  try {
    return interceptorInstance.post("cart/removeProduct", {
      ...payload,
    });
  } catch (error) {
    console.error(error);
    toast.error("Oops something went wrong! That's on us.", {
      hideProgressBar: false,
    });
  }
};

export const clearCart = (payload: any) => {
  try {
    return interceptorInstance.put("cart/clear", {
      ...payload,
    });
  } catch (error) {
    console.error(error);
    toast.error("Oops something went wrong! That's on us.", {
      hideProgressBar: false,
    });
  }
};
