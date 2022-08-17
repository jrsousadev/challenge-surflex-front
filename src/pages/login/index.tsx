import * as yup from "yup";
import useAuth from "../../hooks/useAuth";

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
import { toast } from "react-toastify";
import { withSSRAuthLogged } from "../../utils/auth/withSSRAuthLogged";
import { GetServerSideProps } from "next";

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
  const { signIn } = useAuth();

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
      await signIn(data);
    } catch (err) {
      toast.error("Email ou senha incorreta");
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

export const getServerSideProps: GetServerSideProps = withSSRAuthLogged(
  async (ctx) => {
    return {
      props: {},
    };
  }
);
