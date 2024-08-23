import { apiPaths } from "./helpers/apiPaths";
import httpClient from "./httpClient";
import UniversityDto from "../data/dtos/university/universityDto";

export const universityService = {
  async getAll(): Promise<UniversityDto[]> {
    return await httpClient.get(apiPaths.external.university.getAll);
  },
};
