/* eslint-disable */
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { parseCookies } from "nookies";
import { AuthTokenError } from "../../services/errors/AuthTokenError";
import { destroyAllCookies } from "../destroyAllCookies";

export const withSSRAuth = <P extends { [key: string]: any }>(
  fn: GetServerSideProps<P>
): GetServerSideProps => {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P> | any> => {
    const { ["challengeSurflex.token"]: token } = parseCookies(context);

    if (!token) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    try {
      return await fn(context);
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyAllCookies({ ctx: context });

        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
    }
  };
};
