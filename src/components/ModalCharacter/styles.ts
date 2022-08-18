import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";

type ModalProps = {
  isOpen: boolean;
};

export const Modal = styled("div")<ModalProps>`
  display: ${(props) => (props.isOpen ? "grid" : "none")};
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 9;
  justify-content: center;
  place-items: center;
`;

type ContainerModalProps = {
  isOpen: boolean;
};

export const ContainerModal = styled("div")<ContainerModalProps>`
  position: fixed;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  width: 500px;
  height: 540px;
  background-color: #ffffff;
  border-radius: 5px;
`;

export const InfosContainer = styled("div")`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px;
`;

export const CardComponent = styled("div")`
  width: 365px;
  width: 100%;
`;

type CardMedia = {
  img: string;
};

export const CardMediaComponent = styled("div")<CardMedia>`
  width: 100%;
  height: 400px;
  background-image: url(${(props) => props.img});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const CardArea = styled("div")`
  position: relative;
`;

export const StarIconPosition = styled("div")`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
`;
