import axios from "axios";
import { createAuthorizationHeader } from "./token.service";

export const loginUser = async (email: string, password: string) =>
  await axios.post(`${process.env.REACT_APP_FOODIE_API_BASE_URL}/user/login`, {
    email,
    password,
  });

export const createUser = async (payload: any) =>
  await axios.post(`${process.env.REACT_APP_FOODIE_API_BASE_URL}/user/create`, {
    ...payload,
  });

export const getUserInfoById = async (userId: string) =>
  await axios.get(
    `${process.env.REACT_APP_FOODIE_API_BASE_URL}/user/${userId}`,
    createAuthorizationHeader()
  );

export const updateUserInfoById = async (userId: string, payload: any) =>
  await axios.patch(
    `${process.env.REACT_APP_FOODIE_API_BASE_URL}/user/update/${userId}`,
    {
      ...payload,
    },
    createAuthorizationHeader()
  );
    
    