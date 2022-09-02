import { toast } from "react-toastify";

//add toast
export const notify = () =>
  toast.info("You just finish the task!", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  });
  
export const announce = () =>
  toast.success("New task just created! Check the store", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  });
export const editAnnounce = () =>
  toast.success("Save success!", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  });
export const taskInputError = () =>
  toast.error("The task is no longer 24 hours and context is not empty", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  });
export const ExpiredAnnounce = () =>
  toast.error("Token is expired please log in again", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  });
/////////////
