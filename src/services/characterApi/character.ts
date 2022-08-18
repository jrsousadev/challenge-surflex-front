import {
  CREATE_CHARACTER,
  DELETE_CHARACTER,
  GET_ALL_CHARACTERS,
} from "./characterRoutesApi";
import { api as ApiClient } from "../apiClient";
import { GetServerSidePropsContext } from "next";
import { GetCorrectApi } from "../../utils/GetCorrectApi";

interface ICreateCharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  episode: string[];
  url: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
}

export const createCharacter = async (data: ICreateCharacter) => {
  try {
    const response = await ApiClient.post(CREATE_CHARACTER, data);
    console.log(response);
    return response.data;
  } catch (err) {
    throw err;
  }
};

interface IGetAllCharacter {
  ctx?: GetServerSidePropsContext | undefined;
  name?: string;
  species?: string;
}

export const getAllCharacter = async ({
  ctx,
  name = "",
  species = "",
}: IGetAllCharacter) => {
  const api = GetCorrectApi(ctx);

  try {
    const response = await api.get(GET_ALL_CHARACTERS(name, species));
    return response.data;
  } catch (err) {
    throw err;
  }
};

interface IDeleteCharacter {
  id: number;
}

export const deleteCharacter = async ({ id }: IDeleteCharacter) => {
  try {
    const response = await ApiClient.delete(DELETE_CHARACTER(id));
    return response.data;
  } catch (err) {
    throw err;
  }
};
