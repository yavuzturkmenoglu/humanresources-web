import { ReactText } from "react";
import { toast, Zoom } from "react-toastify";
import Operation from "../../data/enums/operation";

export const customToast = toast;

//#region Error
export const genericErrorToast = () => {
  return toast("Bir hata oluştu", {
    position: "top-right",
    autoClose: 2000,
    type: "error",
    transition: Zoom,
    toastId: "fetchError",
  });
};

export const invalidFieldToast = (field: string) => {
  return toast(`Hatalı ${field} girişi`, {
    position: "top-right",
    autoClose: 2000,
    type: "error",
    transition: Zoom,
    toastId: `${field}`,
  });
};
//#endregion

//#region Success
export const successToast = (text: string, operation: Operation) => {
  const messages = {
    [Operation.Add]: `${text} başarı ile eklendi`,
    [Operation.Update]: `${text} başarı ile güncellendi`,
    [Operation.Delete]: `${text} başarı ile silindi`,
  };

  return toast(messages[operation], {
    position: "top-right",
    autoClose: 2000,
    type: "success",
    transition: Zoom,
    toastId: `${text}${operation}`,
  });
};
//#endregion
