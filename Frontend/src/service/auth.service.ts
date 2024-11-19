import axios from "axios";
import { toast } from "react-toastify";

export const register = (payload: any) => {
  try {
    return axios.post(`${process.env.REACT_APP_SGDS_API_URL}/auth/register`, {
      ...payload,
    });
  } catch (error) {
    console.error(error);
    toast.error("Oops something went wrong! That's on us.", {
      hideProgressBar: false,
    });
  }
};

export const login = (payload: any) => {
  try {
    return axios.post(`${process.env.REACT_APP_SGDS_API_URL}/auth/login`, {
      ...payload,
    });
  } catch (error) {
    console.error(error);
    toast.error("Oops something went wrong! That's on us.", {
      hideProgressBar: false,
    });
  }
};
