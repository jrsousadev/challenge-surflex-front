import { AppBar, Button, styled } from "@mui/material";

type Props = {
  isOpen: boolean;
};

export const AppBarMenu = styled(AppBar)``;

export const ContainerHeaderMobile = styled("div")<Props>`
  @media (min-width: 768px) {
    display: none;
  }

  visibility: ${(props) => (props.isOpen ? "visibility" : "hidden")};
  height: ${(props) => (props.isOpen ? "100vh" : "0")};
  overflow-y: hidden;
  transition: all 0.5s;
  background-color: #397ef5;
  position: fixed;
  width: 100vw;
  z-index: 10;
  top: 75px;
`;

export const OptionsHeaderMobile = styled("div")`
  padding: 1rem;
  display: grid;
  place-items: center;
  grid-template-columns: 1fr;
  grid-gap: 10px;
`;

export const ButtonMenu = styled(Button)`
  width: 100%;
  padding: 1rem;
  border: 1px solid #ffffff;
  color: #ffffff;
`;
