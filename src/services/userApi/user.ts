import { GetServerSidePropsContext } from "next";
import { GetCorrectApi } from "../../utils/GetCorrectApi";
import { AUTH_USER, CREATE_USER, GET_USER } from "./userRoutesApi";
import { api as ApiClient } from "../apiClient";

interface ICreateAuthenticateUser {
  name: string;
  password: string;
}

export const createAuthenticationUser = async ({
  name,
  password,
}: ICreateAuthenticateUser) => {
  const data = { name, password };
  try {
    const response = await ApiClient.post(AUTH_USER, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

interface IGetUser {
  ctx?: GetServerSidePropsContext | undefined;
  id: string;
}

export const getUser = async ({ ctx, id }: IGetUser) => {
  const api = GetCorrectApi(ctx);

  try {
    const response = await api.get(GET_USER(id));
    return response.data;
  } catch (err) {
    throw err;
  }
};

interface ICreateUser {
  name: string;
  password: string;
}

export const createUser = async ({ name, password }: ICreateUser) => {
  const data = { name, password };
  try {
    const response = await ApiClient.post(CREATE_USER, data);
    return response.data;
  } catch (err) {
    throw err;
  }
};
