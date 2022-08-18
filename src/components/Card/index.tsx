import { CardActionArea, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { toast } from "react-toastify";
import { Character } from "../../domain/Character";
import {
  createCharacter,
  deleteCharacter,
} from "../../services/characterApi/character";
import {
  CardComponent,
  CardMediaComponent,
  StarIconPosition,
  ContainerCardMain,
} from "./styles";
interface CardCharacterProps {
  character: Character;
  onHandleSelectCharacter: () => void;
  onHandleAddedFavorite: () => void;
  isFavorite: boolean;
}

export function CardCharacter({
  character,
  isFavorite,
  onHandleSelectCharacter,
  onHandleAddedFavorite,
}: CardCharacterProps) {
  const [charIsFavorite, setCharIsFavorite] = useState(isFavorite);
  const [loading, setIsLoading] = useState(false);

  const handleAddedOrRemoveCharFavorite = async () => {
    if (!charIsFavorite) {
      onHandleAddedFavorite();
      setCharIsFavorite(!isFavorite);
    } else {
      await deleteCharacter({ id: Number(character.id) });
      setCharIsFavorite(!isFavorite);
    }
  };

  return (
    <ContainerCardMain>
      <StarIconPosition>
        <button
          onClick={handleAddedOrRemoveCharFavorite}
          disabled={loading}
          style={{ background: "transparent", border: "none" }}
        >
          {charIsFavorite && <AiFillStar size={30} />}
          {!charIsFavorite && <AiOutlineStar size={30} />}
        </button>
      </StarIconPosition>
      <CardComponent onClick={onHandleSelectCharacter}>
        <CardActionArea>
          <CardMediaComponent img={character.image} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {character.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </CardComponent>
    </ContainerCardMain>
  );
}
