import { toast } from "react-toastify";
import interceptorInstance from "./interceptor";

export const getProducts = () => {
  try {
    return interceptorInstance.get("product/all");
  } catch (error) {
    console.error(error);
    toast.error("Oops something went wrong! That's on us.", {
      hideProgressBar: false,
    });
  }
};
