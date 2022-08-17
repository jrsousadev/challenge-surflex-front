import { styled } from "@mui/material/styles";

export const Container = styled("div")``;

export const Content = styled("div")`
  > * + * {
    margin-top: 1.1rem;
  }

  h4 {
    text-align: center;
    padding-top: 3rem;
  }

  padding-bottom: 1rem;
`;

export const ContainerCards = styled("div")`
  padding-top: 2rem;
  display: grid;
  justify-content: center;
  place-items: center;
  grid-template-columns: repeat(3, 350px);
  grid-gap: 10px;
`;

export const ContainerFilterCharacter = styled("div")`
  padding-top: 2rem;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;

  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  place-items: center;
`;
