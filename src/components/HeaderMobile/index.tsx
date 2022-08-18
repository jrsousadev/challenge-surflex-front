import { Typography } from "@mui/material";
import Link from "next/link";
import useAuth from "../../hooks/useAuth";
import {
  ButtonMenu,
  ContainerHeaderMobile,
  OptionsHeaderMobile,
} from "./styles";

interface IHeaderMobileProps {
  isOpen: boolean;
}

export function HeaderMobile({ isOpen }: IHeaderMobileProps) {
  const { isAuthenticated, signOut } = useAuth();

  return (
    <ContainerHeaderMobile isOpen={isOpen}>
      <OptionsHeaderMobile>
        <Link href="/" passHref>
          <ButtonMenu variant="outlined">
            <Typography variant="h6" component="div" sx={{ cursor: "pointer" }}>
              Challenge Surflex
            </Typography>
          </ButtonMenu>
        </Link>

        {!isAuthenticated && (
          <Link href="/login" passHref>
            <ButtonMenu variant="outlined">
              <Typography
                variant="h6"
                component="div"
                sx={{ cursor: "pointer" }}
              >
                Fazer login
              </Typography>
            </ButtonMenu>
          </Link>
        )}

        {isAuthenticated && (
          <>
            <Link href="/listFavorites" passHref>
              <ButtonMenu variant="outlined">
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ cursor: "pointer" }}
                >
                  Minha lista de favoritos
                </Typography>
              </ButtonMenu>
            </Link>

            <ButtonMenu variant="outlined" onClick={signOut}>
              <Typography
                variant="h6"
                component="div"
                sx={{ cursor: "pointer" }}
              >
                Deslogar
              </Typography>
            </ButtonMenu>
          </>
        )}
      </OptionsHeaderMobile>
    </ContainerHeaderMobile>
  );
}
