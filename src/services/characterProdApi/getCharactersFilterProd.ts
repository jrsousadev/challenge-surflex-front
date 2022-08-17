interface IGetCharactersFilterProd {
  name: string;
  specie: string;
}

export const getCharactersFilterProd = async ({
  name = "",
  specie = "",
}: IGetCharactersFilterProd) => {
  const listCharacters = await fetch(
    `https://rickandmortyapi.com/api/character/?name=${name}&species=${specie}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  )
    .then(async (response) => {
      const data = await response.json();
      return data;
    })
    .catch((err) => console.log(err));

  if (!listCharacters) {
    return null;
  }

  return listCharacters;
};
