export const getCharactersProd = async () => {
  const listCharacters = await fetch(
    `https://rickandmortyapi.com/api/character/`,
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
