import { API_URL, PERSON_TOTAL_COUNT } from "@/contants/constants";
import { get } from "@/services/apiService";
import { Person, PersonApiResponse } from "@/types/person";

export const getPersons = async ({page, size}: {page: number, size: number}) => {
  const response = await get({
    url: `${API_URL}/persons`,
    config: {
      params: {
        "_quantity": size,
        "_seed": page, //seed is used to generate the same data for the same page
      }
    },
  }).then(({data}) => {
    return {
      data: data.map((person: Person, index: number) => {
        return {
          ...person,
          id:  index + 1 + ((page - 1)* size),
        };
      }),
      total: PERSON_TOTAL_COUNT,
    } as PersonApiResponse;
  });

  return response;
};
