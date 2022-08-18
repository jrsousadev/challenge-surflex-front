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
} from "../../styles/pages/listFavorites";
import { yupResolver } from "@hookform/resolvers/yup";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { toast } from "react-toastify";
import {
  createCharacter,
  deleteCharacter,
  getAllCharacter,
} from "../../services/characterApi/character";
import useDisclosure from "../../hooks/useDiscloure";
import { ModalCharacter } from "../../components/ModalCharacter";
import { Character } from "../../domain/Character";
import { Header } from "../../components/Header";
import { CardCharacter } from "../../components/Card";

type IFilterData = {
  name: string;
  specie: string;
};

interface IListFavoritesProps {
  listMyCharFavorites: Character[];
}

const filterSchema = yup
  .object({
    name: yup.string(),
    specie: yup.string(),
  })
  .required();

export default function ListFavorites({
  listMyCharFavorites,
}: IListFavoritesProps) {
  const [listFavorites, setListFavorites] =
    useState<Character[]>(listMyCharFavorites);

  const [characterSelected, setCharacterSelected] = useState<
    Character | undefined
  >();

  const { isOpen, handleClose, handleOpen } = useDisclosure();

  const { register, getValues } = useForm<IFilterData>({
    resolver: yupResolver(filterSchema),
  });

  const filterCharacterByNameAndSpecie = async () => {
    const name = getValues("name");
    const species = getValues("specie");

    const listResults = await getAllCharacter({
      name,
      species,
    });

    if (!listResults) {
      return setListFavorites([]);
    }

    setListFavorites(listResults);
  };

  const handleOpenModalAndSelectCharacter = (character: Character) => {
    setCharacterSelected(character);
    handleOpen();
  };

  const handleFavoriteCharacter = async (character: Character) => {
    try {
      await createCharacter(character);
    } catch (err) {
      toast.error("Houve um erro ao favoritar o personagem");
    }
  };

  const handleRemoveFavoriteCharacter = async (character: Character) => {
    try {
      await deleteCharacter({ id: Number(character.id) });

      const newListFavorites = await getAllCharacter({});
      setListFavorites(newListFavorites);
    } catch (err) {
      toast.error("Houve um erro ao desfavoritar o personagem");
    }
  };

  return (
    <>
      <Head>
        <title>Sua lista de personagens favoritos</title>
      </Head>

      <ModalCharacter
        character={characterSelected}
        closeModal={handleClose}
        modalIsOpen={isOpen}
      />

      <Container>
        <Header />

        <Content>
          <Typography gutterBottom variant="h5">
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

          <Typography gutterBottom variant="h5">
            Lista de seus personagens favoritos
          </Typography>

          {listFavorites.length <= 0 && (
            <p style={{ textAlign: "center" }}>
              Você não tem personagens favoritos
            </p>
          )}
          <ContainerCards>
            {listFavorites.map((character: Character) => {
              return (
                <CardCharacter
                  isFavorite={true}
                  key={character.id}
                  character={character}
                  onHandleAddedFavorite={() =>
                    handleFavoriteCharacter(character)
                  }
                  onHandleSelectCharacter={() =>
                    handleOpenModalAndSelectCharacter(character)
                  }
                  onHandleRemoveFavorite={() =>
                    handleRemoveFavoriteCharacter(character)
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
  const listMyCharFavorites = await getAllCharacter({ ctx });

  return {
    props: {
      listMyCharFavorites: listMyCharFavorites ?? [],
    },
  };
};
