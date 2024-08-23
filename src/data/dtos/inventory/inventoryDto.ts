import Equipment from "../../enums/equipment";

class InventoryDto {
  Id!: number;
  Equipment!: Equipment;
  UserId!: number;
}

export default InventoryDto;
