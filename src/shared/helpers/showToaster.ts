/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";

export const showToast = (result: any) => {
  if (result?.data?.success) {
    toast.success(result.data.message);
    return true;
  } else {
    const errorStatus = result?.error?.status;
    const errorMessage =
      result?.error?.data?.message || "Unknown error occurred";

    if (errorStatus === 403 || errorStatus === 401) {
      toast.error(errorMessage, {
        onClose: () => {
          window.location.href = "/";
        },
      });
    } else {
      toast.error(errorMessage);
      return false;
    }
  }
};
