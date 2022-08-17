import * as yup from "yup";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  ContainerCards,
  ContainerFilterCharacter,
  Content,
} from "../styles/pages/index";
import { yupResolver } from "@hookform/resolvers/yup";
import { GetServerSideProps } from "next";
import { getCharactersFilterProd } from "../services/characterProdApi/getCharactersFilterProd";
import { Header } from "../components/Header";
import { Character } from "../domain/Character";
import { CardCharacter } from "../components/Card";
import { getCharactersProd } from "../services/characterProdApi/getCharactersProd";

type IFilterData = {
  name: string;
  specie: string;
};

interface IListCharactersProps {
  listCharacters: Character[];
}

const filterSchema = yup
  .object({
    name: yup.string(),
    specie: yup.string(),
  })
  .required();

export default function ListCharacters({
  listCharacters,
}: IListCharactersProps) {
  const [listCharactersMain, setListCharactersMain] =
    useState<Character[]>(listCharacters);

  const { register, getValues } = useForm<IFilterData>({
    resolver: yupResolver(filterSchema),
  });

  const filterCharacterByNameAndSpecie = async () => {
    const name = getValues("name");
    const specie = getValues("specie");

    const response = await getCharactersFilterProd({
      name,
      specie,
    });

    if (!response.results) {
      return setListCharactersMain([]);
    }

    setListCharactersMain(response.results);
  };

  return (
    <>
      <Container>
        <Header />

        <Content>
          <Typography gutterBottom variant="h4">
            Pesquisar personagem por:
          </Typography>
          <ContainerFilterCharacter>
            <TextField
              label="Nome"
              variant="outlined"
              {...register("name")}
              onKeyUp={filterCharacterByNameAndSpecie}
            />

            <FormControl fullWidth>
              <InputLabel>Espécie</InputLabel>
              <Select
                {...register("specie")}
                label="Espécies"
                onClick={filterCharacterByNameAndSpecie}
              >
                <MenuItem value={"Human"}>Humano</MenuItem>
                <MenuItem value={"Alien"}>Alien</MenuItem>
                <MenuItem value={""}>Todas as espécies</MenuItem>
              </Select>
            </FormControl>
          </ContainerFilterCharacter>

          <Typography gutterBottom variant="h4">
            Lista de Personagens
          </Typography>

          <ContainerCards>
            {listCharactersMain.map((character: Character) => (
              <CardCharacter key={character.id} character={character} />
            ))}
          </ContainerCards>
        </Content>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { results: listCharacters } = await getCharactersProd();

  if (!listCharacters) {
    return {
      props: { listCharacters: [] },
    };
  }

  return {
    props: {
      listCharacters,
    },
  };
};
