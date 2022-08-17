import { GetServerSidePropsContext } from "next";
import { setupAPIClient as ApiSSR } from "../services/api";
import { api as ApiClient } from "../services/apiClient";

export const GetCorrectApi = (
  ctx?: GetServerSidePropsContext | null | undefined
) => {
  if (!ctx) return ApiClient;

  return ApiSSR(ctx);
};
