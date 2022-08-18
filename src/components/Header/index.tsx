import { AccountCircle } from "@mui/icons-material";
import { useState } from "react";
import {
  ContainerDiv,
  ContainerLogout,
  IconHamburg,
  ToolbarMenu,
} from "./styles";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  AppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import Link from "next/link";
import useAuth from "../../hooks/useAuth";
import { HeaderMobile } from "../HeaderMobile";
import useDisclosure from "../../hooks/useDiscloure";
import { AppBarMenu } from "../HeaderMobile/styles";

export function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, isAuthenticated, signOut } = useAuth();

  const { isOpen, handleToggle } = useDisclosure(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <HeaderMobile isOpen={isOpen} />

      <AppBarMenu>
        <ToolbarMenu>
          <IconHamburg onClick={handleToggle}>
            <GiHamburgerMenu size={23} />
          </IconHamburg>
          <ContainerDiv>
            <Link href="/" passHref>
              <Typography
                variant="h6"
                component="div"
                sx={{ cursor: "pointer" }}
              >
                Challenge Surflex
              </Typography>
            </Link>

            {isAuthenticated && (
              <Link href="/listFavorites" passHref>
                <Button
                  variant="outlined"
                  style={{ background: "#ffffff", color: "#000" }}
                >
                  Minha lista de favoritos
                </Button>
              </Link>
            )}
          </ContainerDiv>

          <ContainerLogout>
            {!isAuthenticated && (
              <Link href="/login" passHref>
                <Button
                  variant="contained"
                  sx={{
                    background: "#FFFFFF",
                    color: "#000",
                    fontWeight: "bold",
                  }}
                >
                  Fazer login
                </Button>
              </Link>
            )}
            {isAuthenticated && (
              <>
                {user?.name}
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={signOut}>Sair</MenuItem>
                </Menu>
              </>
            )}
          </ContainerLogout>
        </ToolbarMenu>
      </AppBarMenu>
    </>
  );
}
