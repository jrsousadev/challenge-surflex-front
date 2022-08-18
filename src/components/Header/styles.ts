import { styled } from "@mui/material";

export const ToolbarMenu = styled("div")`
  display: grid;
  grid-template-columns: 500px 200px;
  place-items: center;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  @media (max-width: 768px) {
    justify-content: left;
    grid-template-columns: 100px;
  }
`;

export const ContainerDiv = styled("div")`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  place-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const ContainerLogout = styled("div")`
  @media (max-width: 768px) {
    display: none;
  }
`;

export const IconHamburg = styled("div")`
  display: none;
  padding: 17px;
  margin-bottom: -5px;

  @media (max-width: 768px) {
    display: block;
  }
`;
