import { styled } from "@mui/material/styles";
import { Container as MuiContainer, Box } from "@mui/material";

export const Container = styled(MuiContainer)`
  height: 100vh;
  display: grid;
  place-items: center;
`;

export const FormWrapper = styled(Box)`
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.5rem;
  min-width: 400px;

  @media (max-width: 430px) {
    min-width: auto;
    width: 95%;
    padding: 1.6rem;
    gap: 0;
  }

  .input-wrapper {
    display: grid;
    gap: 2rem;
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }
  .button-wrapper {
    width: 100%;
    flex: 1;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  }
`;
