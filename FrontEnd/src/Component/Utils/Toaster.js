import { toast } from "react-toastify";

export const Toaster = (message) => {
  return toast.dark(message,{autoClose:3000});
};