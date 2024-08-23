import { nameof } from "ts-simple-nameof";
import { invalidFieldToast } from "../../components/toasts/customToasts";
import UserDto from "../../data/dtos/user/userDto";
import { fieldConstraints } from "../../constants/fieldConstraints";

export function validateUserDto(userDto: UserDto) {
  if (!userDto.Name || userDto.Name.length < fieldConstraints.user.NameMinLenght || userDto.Name.length > fieldConstraints.user.NameMaxLenght) {
    invalidFieldToast(nameof<UserDto>((x) => x.Name));
    return false;
  }

  if (!userDto.LastName || userDto.LastName.length < fieldConstraints.user.LastNameMinLenght || userDto.LastName.length > fieldConstraints.user.LastNameMaxLenght) {
    invalidFieldToast(nameof<UserDto>((x) => x.LastName));
    return false;
  }

  if (userDto.Gender === undefined) {
    invalidFieldToast(nameof<UserDto>((x) => x.Gender));
    return false;
  }

  if (userDto.Educations && hasDuplicateNames(userDto.Educations)) {
    invalidFieldToast(nameof<UserDto>((x) => x.Educations));
    return false;
  }

  if (
    userDto.Inventories &&
    hasDuplicateNames(
      userDto.Inventories.map((x) => {
        return { Name: x.Equipment.toString() };
      })
    )
  ) {
    invalidFieldToast(nameof<UserDto>((x) => x.Educations));
    return false;
  }

  return true;
}

function hasDuplicateNames(arr: { Name: string }[]): boolean {
  const names = arr.map((obj) => obj.Name);
  const uniqueNames = new Set(names);
  return uniqueNames.size !== names.length;
}
