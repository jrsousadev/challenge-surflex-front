import * as yup from "yup";

import { Container, FormWrapper } from "../../styles/pages/login";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type LoginData = {
  name: string;
  password: string;
};

const loginSchema = yup
  .object({
    name: yup.string().required("Campo obrigatório"),
    password: yup.string().required("Campo obrigatório"),
  })
  .required();

export default function Login() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(loginSchema),
  });

  async function handleLogin(data: LoginData) {
    setLoading(true);

    try {
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Container>
        <FormWrapper as="form" onSubmit={handleSubmit(handleLogin)}>
          <Typography variant="h3">Challenge Surflex</Typography>

          <Typography variant="subtitle1" style={{ marginTop: "1rem" }}>
            Por favor, faça o login para continuar.
          </Typography>

          <Box className="input-wrapper">
            <TextField
              label="Nome"
              variant="outlined"
              error={!!errors?.name}
              {...register("name")}
              helperText={errors?.name?.message}
            />

            <TextField
              label="Senha"
              type="password"
              variant="outlined"
              error={!!errors?.password}
              {...register("password")}
              helperText={errors?.password?.message}
            />
          </Box>

          <Box className="button-wrapper">
            <Button type="submit" variant="contained" fullWidth>
              {loading ? (
                <CircularProgress color="inherit" size={25} />
              ) : (
                "Login"
              )}
            </Button>
          </Box>
        </FormWrapper>
      </Container>
    </>
  );
}
