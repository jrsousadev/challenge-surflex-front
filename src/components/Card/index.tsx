import { CardActionArea, CardContent, Typography } from "@mui/material";
import { Character } from "../../domain/Character";
import { CardComponent, CardMediaComponent } from "./styles";
interface CardCharacterProps {
  character: Character;
  onHandleSelectCharacter: () => void;
}

export function CardCharacter({
  character,
  onHandleSelectCharacter,
}: CardCharacterProps) {
  return (
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
  );
}
