import { CardContent, Typography } from "@mui/material";
import { Character } from "../../domain/Character";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { toast } from "react-toastify";
import { createCharacter } from "../../services/characterApi/character";
import { useEffect, useState } from "react";
import {
  Modal,
  ContainerModal,
  CardMediaComponent,
  CardComponent,
  InfosContainer,
  CardArea,
  StarIconPosition,
} from "./styles";

import moment from "moment";
interface ModalCharacterProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  character: Character | undefined;
}

export function ModalCharacter({
  closeModal,
  modalIsOpen,
  character,
}: ModalCharacterProps) {
  if (!character) {
    return null;
  }

  const getStatus = () => {
    if (character.status === "Alive") {
      return "Vivo";
    }

    return "Morto";
  };

  const getSpecie = () => {
    if (character.status === "Human") {
      return "Humano";
    }

    return "Alien";
  };

  return (
    <>
      <Modal onClick={closeModal} isOpen={modalIsOpen}></Modal>
      <ContainerModal isOpen={modalIsOpen}>
        <CardComponent>
          <CardArea>
            <CardMediaComponent img={character.image} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Personagem: <strong>{character.name}</strong>
              </Typography>
              <InfosContainer>
                <Typography variant="subtitle2">
                  Nome: {character.name}
                </Typography>
                <Typography variant="subtitle2">
                  Status: {getStatus()}
                </Typography>
                <Typography variant="subtitle2">
                  Espécie: {getSpecie()}
                </Typography>
                <Typography variant="subtitle2">
                  Quantidade de episódios: {character.episode.length}
                </Typography>
                <Typography variant="subtitle2">
                  Data de criação:
                  {moment(character.created).format("DD/MM/YYYY")}
                </Typography>
              </InfosContainer>
            </CardContent>
          </CardArea>
        </CardComponent>
      </ContainerModal>
    </>
  );
}
