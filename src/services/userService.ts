import { apiPaths } from "./helpers/apiPaths";
import httpClient from "./httpClient";
import Result from "../data/core/result";
import UserDto from "../data/dtos/user/userDto";
import UserPreviewDto from "../data/dtos/user/userPreviewDto";

export const userService = {
  async getAll(): Promise<Result<UserPreviewDto[]>> {
    return await httpClient.get(apiPaths.user.getall);
  },

  async get(id: number): Promise<Result<UserDto>> {
    return await httpClient.get(apiPaths.user.get, {
      params: {
        id,
      },
    });
  },

  async add(user: UserDto): Promise<Result<boolean>> {
    return await httpClient.post(apiPaths.user.add, user);
  },

  async update(user: UserDto): Promise<Result<boolean>> {
    return await httpClient.put(apiPaths.user.update, user);
  },

  async deleteUser(id: number): Promise<Result<boolean>> {
    return await httpClient.delete(apiPaths.user.delete, {
      params: {
        id,
      },
    });
  },
};
