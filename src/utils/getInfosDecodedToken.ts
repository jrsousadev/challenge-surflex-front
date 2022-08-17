import jwt_decode from "jwt-decode";

interface IDecoded {
  user: string;
}

export const getInfosDecodedToken = async (token: string) => {
  const decoded: IDecoded = jwt_decode(token);

  return decoded.user;
};
