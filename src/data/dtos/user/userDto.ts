import Gender from "../../enums/gender";
import EducationDto from "../education/educationDto";
import InventoryDto from "../inventory/inventoryDto";

class UserDto {
  Id!: number;
  Name!: string;
  LastName!: string;
  Gender!: Gender;
  Educations!: EducationDto[];
  Inventories!: InventoryDto[];
}

export default UserDto;
