import { useEffect, useRef, useState } from "react";
import UserPreviewDto from "../../data/dtos/user/userPreviewDto";
import { Button } from "react-bootstrap";
import UserOperationsModal, { UserOperationsModalRef } from "../modals/user/UserOperationsModal";
import Operation from "../../data/enums/operation";
import { userService } from "../../services/userService";
import { MdOutlineAdd, MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { successToast } from "../toasts/customToasts";

type UserGridProps = {};

export default function UserGrid(props: UserGridProps) {
  const [users, setUsers] = useState<UserPreviewDto[]>([]);

  useEffect(() => {
    getUserPreviews();
  }, []);

  async function getUserPreviews() {
    const result = await userService.getAll();
    if (!result.Success) {
      return;
    }

    setUsers(result.Data);
  }

  async function onDeleteClicked(userId: number) {
    const result = await userService.deleteUser(userId);
    if (!result.Success) {
      return;
    }

    getUserPreviews();
    successToast("kullanıcı", Operation.Delete);
  }

  //#region Modal code
  const userOperationsModal = useRef<UserOperationsModalRef>(null);

  function setUserOperationsModalVisible(operation: Operation, userId?: number) {
    userOperationsModal.current?.setModalVisible(operation, userId);
  }
  //#endregion

  return (
    <>
      <div className="w-100 mb-4">
        <Button size="lg" variant="dark" onClick={() => setUserOperationsModalVisible(Operation.Add)}>
          <MdOutlineAdd />
        </Button>
      </div>
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Operation</th>
          </tr>
        </thead>
        <tbody>
          {users.map((x) => {
            return (
              <>
                <tr key={x.Id}>
                  <th>{x.Id}</th>
                  <td>{x.Name.toString()}</td>
                  <td>{x.LastName}</td>
                  <td className="d-flex justify-content-around">
                    <Button variant="light" onClick={() => setUserOperationsModalVisible(Operation.Update, x.Id)}>
                      <AiFillEdit />
                    </Button>
                    <Button variant="light" onClick={() => onDeleteClicked(x.Id)}>
                      <MdDelete />
                    </Button>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>

      <UserOperationsModal ref={userOperationsModal} refresh={getUserPreviews} />
    </>
  );
}
