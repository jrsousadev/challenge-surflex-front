export const CREATE_CHARACTER = "character/";
export const GET_ALL_CHARACTERS = (name?: string, species?: string) =>
  `character/?name=${name}&species=${species}`;
export const DELETE_CHARACTER = (id: number) => `character/${id}`;
