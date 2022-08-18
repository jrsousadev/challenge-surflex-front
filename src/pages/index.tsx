import * as yup from "yup";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
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
import { ModalCharacter } from "../components/ModalCharacter";
import Head from "next/head";
import useDisclosure from "../hooks/useDiscloure";
import {
  createCharacter,
  getAllCharacter,
} from "../services/characterApi/character";

type IFilterData = {
  name: string;
  specie: string;
};

interface IListCharactersProps {
  listCharacters: Character[];
  listMyCharFavorites: Character[];
}

const filterSchema = yup
  .object({
    name: yup.string(),
    specie: yup.string(),
  })
  .required();

export default function ListCharacters({
  listCharacters,
  listMyCharFavorites,
}: IListCharactersProps) {
  const [listCharactersMain, setListCharactersMain] =
    useState<Character[]>(listCharacters);

  const [characterSelected, setCharacterSelected] = useState<
    Character | undefined
  >();

  const { isOpen, handleClose, handleOpen } = useDisclosure();

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

  const handleOpenModalAndSelectCharacter = (character: Character) => {
    setCharacterSelected(character);
    handleOpen();
  };

  const handleFavoriteCharacter = async (character: Character) => {
    try {
      const created = await createCharacter(character);
    } catch (err) {}
  };

  return (
    <>
      <Head>
        <title>Lista de personagens</title>
      </Head>

      <ModalCharacter
        character={characterSelected}
        closeModal={handleClose}
        modalIsOpen={isOpen}
      />

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
            {listCharactersMain.map((character: Character) => {
              const existCharFavorite = listMyCharFavorites.find(
                (char: Character) => char.id === character.id
              );

              let isFavorite: boolean;
              if (
                existCharFavorite &&
                typeof existCharFavorite !== "undefined"
              ) {
                isFavorite = true;
              } else {
                isFavorite = false;
              }

              return (
                <CardCharacter
                  isFavorite={isFavorite}
                  key={character.id}
                  character={character}
                  onHandleAddedFavorite={() =>
                    handleFavoriteCharacter(character)
                  }
                  onHandleSelectCharacter={() =>
                    handleOpenModalAndSelectCharacter(character)
                  }
                />
              );
            })}
          </ContainerCards>
        </Content>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { results: listCharacters } = await getCharactersProd();
  const listMyCharFavorites = await getAllCharacter({ ctx });

  return {
    props: {
      listCharacters: listCharacters ?? [],
      listMyCharFavorites: listMyCharFavorites ?? [],
    },
  };
};
