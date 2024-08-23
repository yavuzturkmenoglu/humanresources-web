import { useState, forwardRef, useImperativeHandle, Ref, useRef, ChangeEvent } from "react";
import { Modal, CloseButton, Container, Button, InputGroup, FormControl, ButtonGroup, ToggleButton, Form } from "react-bootstrap";
import { createPortal } from "react-dom";
import portalDom from "../../../constants/portalDom";
import MinMaxValidationText from "../../validationtexts/MinMaxValidationText";
import UserDto from "../../../data/dtos/user/userDto";
import { genericErrorToast, invalidFieldToast } from "../../toasts/customToasts";
import Operation from "../../../data/enums/operation";
import { fieldConstraints } from "../../../constants/fieldConstraints";
import { MdDriveFileRenameOutline, MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { genders } from "../../../constants/gender";
import { equipment } from "../../../constants/equipment";
import { userService } from "../../../services/userService";
import InventoryDto from "../../../data/dtos/inventory/inventoryDto";
import UniversityDto from "../../../data/dtos/university/universityDto";
import { universityService } from "../../../services/universityService";
import EducationDto from "../../../data/dtos/education/educationDto";
import { nameof } from "ts-simple-nameof";
import { validateUserDto } from "../../../services/helpers/validationHelper";

export type UserOperationsModalRef = {
  setModalVisible: (operation: Operation, userId?: number) => void;
};

type UserOperationsModalProps = {
  refresh: () => void;
};

const UserOperationsModal = forwardRef((props: UserOperationsModalProps, ref: Ref<UserOperationsModalRef>) => {
  //#region Ref Operations
  const [visible, setVisible] = useState<boolean>(false);
  useImperativeHandle(ref, () => ({ setModalVisible }));

  function setModalVisible(operation: Operation, userId?: number): void {
    operationRef.current = operation;
    getUniversities();
    if (operationRef.current === Operation.Update) getUser(userId!);

    setVisible(true);
  }

  function setModalInvisible(): void {
    setUser({} as UserDto);
    setUniversities([]);
    props.refresh();
    setVisible(false);
  }
  //#endregion

  const [user, setUser] = useState<UserDto>({} as UserDto);
  const [universities, setUniversities] = useState<UniversityDto[]>([]);
  const operationRef = useRef<Operation>();

  async function getUser(userId: number) {
    const result = await userService.get(userId);

    if (!result.Success) return;

    setUser(result.Data);
  }

  async function getUniversities() {
    const result = await universityService.getAll();

    if (!result) return;

    setUniversities(result);
  }

  async function saveUserSubmit() {
    if (!user) {
      genericErrorToast();
      return;
    }

    if (!validateUserDto(user)) return;

    let resut;
    switch (operationRef.current) {
      case Operation.Add:
        resut = await userService.add(user);
        break;
      case Operation.Update:
        resut = await userService.update(user);
        break;
    }

    if (resut && resut.Success) setModalInvisible();
  }

  return createPortal(
    <Modal ref={ref} show={visible} onHide={setModalInvisible} centered>
      <Modal.Header>
        <Modal.Title>Kullanıcı Bilgileri</Modal.Title>
        <CloseButton variant="white" onClick={setModalInvisible} />
      </Modal.Header>

      <Modal.Body>
        <Container>
          <InputGroup className="mt-2">
            <InputGroup.Text>
              <MdDriveFileRenameOutline />
            </InputGroup.Text>
            <FormControl
              onChange={(e) =>
                setUser({
                  ...(user as UserDto),
                  Name: e.target.value,
                })
              }
              value={user?.Name}
              type="text"
              placeholder="İsim"
            />
          </InputGroup>
          <MinMaxValidationText minLength={fieldConstraints.user.NameMinLenght} maxLenght={fieldConstraints.user.NameMaxLenght} />

          <InputGroup className="mt-2">
            <InputGroup.Text>
              <MdOutlineDriveFileRenameOutline />
            </InputGroup.Text>
            <FormControl
              onChange={(e) =>
                setUser({
                  ...(user as UserDto),
                  LastName: e.target.value,
                })
              }
              value={user?.LastName}
              type="text"
              placeholder="Soyisim"
            />
          </InputGroup>
          <MinMaxValidationText minLength={fieldConstraints.user.LastNameMinLenght} maxLenght={fieldConstraints.user.LastNameMaxLenght} />

          <div className="d-grid mt-2">
            <ButtonGroup className="mb-3">
              {genders.map((type, idx) => (
                <ToggleButton
                  key={type.value}
                  id={`radio-${idx}`}
                  type="radio"
                  variant={"outline-success"}
                  value={type.value}
                  checked={user.Gender === type.value}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setUser({
                      ...(user as UserDto),
                      Gender: Number(e.currentTarget.value),
                    });
                  }}
                >
                  {type.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </div>

          <div className="d-grid mt-2">
            <ButtonGroup className="mb-3">
              {equipment.map((type, idx) => (
                <ToggleButton
                  key={type.value}
                  id="toggle-timed"
                  type="checkbox"
                  variant="outline-primary"
                  checked={user?.Inventories?.find((x) => x.Equipment === type.value) !== undefined}
                  value={type.value}
                  onClick={() => {
                    const isChecked = user?.Inventories?.some((x) => x.Equipment === type.value);
                    const updatedInventories = !isChecked
                      ? [...(user?.Inventories || []), { Equipment: type.value } as InventoryDto]
                      : user?.Inventories?.filter((x) => x.Equipment !== type.value) || [];

                    setUser({
                      ...(user as UserDto),
                      Inventories: Array.from(new Set(updatedInventories?.map((x) => x) || [])),
                    });
                  }}
                >
                  {type.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </div>

          {user?.Educations?.map((item, index) => (
            <div className="d-flex justify-content-between">
              <Form.Select
                key={index}
                className="my-2 w-75"
                onChange={(e) => {
                  setUser({
                    ...(user as UserDto),
                    Educations: user.Educations.map((education) => (education === item ? { ...education, Name: e.target.value } : education)),
                  });
                }}
                value={item?.Name}
              >
                {universities.map((university) => (
                  <option value={university.name}>{university.name}</option>
                ))}
              </Form.Select>

              <Button
                className="border my-2"
                size="sm"
                variant="dark"
                onClick={() => {
                  setUser({
                    ...(user as UserDto),
                    Educations: user.Educations.filter((x) => x !== item),
                  });
                }}
              >
                Eğitim Sil
              </Button>
            </div>
          ))}

          <div className="d-grid mt-2 border rounded">
            <Button size="lg" variant="dark" onClick={() => setUser({ ...(user as UserDto), Educations: [...(user?.Educations || []), { Name: universities[0].name } as EducationDto] })}>
              Eğitim Ekle
            </Button>
          </div>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={saveUserSubmit}>
          Kaydet
        </Button>
      </Modal.Footer>
    </Modal>,
    portalDom
  );
});

export default UserOperationsModal;
