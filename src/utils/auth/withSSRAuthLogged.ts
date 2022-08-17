import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { parseCookies } from "nookies";
import { AuthTokenError } from "../../services/errors/AuthTokenError";
import { destroyAllCookies } from "../destroyAllCookies";

export const withSSRAuthLogged = <P extends { [key: string]: any }>(
  fn: GetServerSideProps<P>
): GetServerSideProps => {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P> | any> => {
    const { ["physioSystem.token"]: token } = parseCookies(context);

    if (token) {
      return {
        redirect: {
          destination: "/dashboard",
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
            destination: "/login",
            permanent: false,
          },
        };
      }
    }
  };
};
