import * as yup from "yup";

import { Container, FormWrapper } from "../../styles/pages/register";
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
import { GetServerSideProps } from "next";
import { withSSRAuthLogged } from "../../utils/auth/withSSRAuthLogged";
import Head from "next/head";
import { toast } from "react-toastify";
import { createUser } from "../../services/userApi/user";
import Link from "next/link";

type RegisterData = {
  name: string;
  password: string;
};

const registerSchema = yup
  .object({
    name: yup.string().required("Campo obrigatório"),
    password: yup.string().required("Campo obrigatório"),
  })
  .required();

export default function Register() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: yupResolver(registerSchema),
  });

  async function handleRegister(data: RegisterData) {
    setLoading(true);

    try {
      await createUser(data);
    } catch (err) {
      toast.error("Nome de usuário ja existente");
    }
  }

  return (
    <>
      <Head>
        <title>Registrar</title>
      </Head>
      <Container>
        <FormWrapper as="form" onSubmit={handleSubmit(handleRegister)}>
          <Typography variant="h3">Challenge Surflex</Typography>

          <Typography variant="subtitle1" style={{ marginTop: "1rem" }}>
            Por favor, crie sua conta para continuar.
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
                "Registrar"
              )}
            </Button>

            <Link href="/login" passHref>
              <Button variant="outlined" fullWidth>
                Já tenho uma conta
              </Button>
            </Link>
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
