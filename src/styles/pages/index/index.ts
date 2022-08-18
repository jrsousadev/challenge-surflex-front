import { styled } from "@mui/material/styles";

export const Container = styled("div")``;

export const Content = styled("div")`
  > * + * {
    margin-top: 1.1rem;
  }

  h5 {
    text-align: center;
    padding-top: 3rem;
  }

  padding-bottom: 1rem;

  @media (max-width: 768px) {
    padding-top: 3rem;
  }
`;

export const ContainerCards = styled("div")`
  padding-top: 2rem;
  display: grid;
  justify-content: center;
  place-items: center;
  grid-template-columns: repeat(3, 350px);
  grid-gap: 10px;

  @media (max-width: 1120px) {
    grid-template-columns: repeat(2, 350px);
  }

  @media (max-width: 768px) {
    grid-template-columns: 350px;
  }
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

  @media (max-width: 850px) {
    grid-template-columns: 300px;
    grid-gap: 10px;
  }
`;
