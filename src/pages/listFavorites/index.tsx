import { GetServerSideProps } from "next";
import { withSSRAuth } from "../../utils/auth/withSSRAuth";

export default function ListFavorites() {
  return <>Página de favoritos</>;
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx) => {
    return {
      props: {},
    };
  }
);
