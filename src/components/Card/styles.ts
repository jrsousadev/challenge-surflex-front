import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CardComponent = styled(Card)`
  width: 365px;
  width: 100%;
`;

type CardMedia = {
  img: string;
};

export const CardMediaComponent = styled("div")<CardMedia>`
  width: 100%;
  height: 400px;
  background-image: url(${(props) => props.img});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
