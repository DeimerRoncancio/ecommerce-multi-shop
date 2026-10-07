import { forwardRef, useCallback } from "react";
import { useSnackbar, SnackbarContent, CustomContentProps } from "notistack";
import { IoClose } from "react-icons/io5";
import { MdError } from "react-icons/md";

const SnackbarError = forwardRef<HTMLDivElement, CustomContentProps>(
  ({ id, ...props }, ref) => {
    const { closeSnackbar } = useSnackbar();

    const handleDismiss = useCallback(() => {
      closeSnackbar(id);
    }, [id, closeSnackbar]);

    return (
      <SnackbarContent ref={ref}>
        <div className="w-96 bg-ink text-white rounded-md">
          <div className="flex items-center justify-between gap-3 p-4 font-semibold">
            <div className="flex items-center gap-2">
              <MdError size={25} color="#e74d3c" className="shrink-0" />
              <p>{props.message}</p>
            </div>
            <button className="z-50 cursor-pointer text-gray-300 hover:text-white" onClick={handleDismiss}>
              <IoClose size={25} />
            </button>
          </div>
        </div>
      </SnackbarContent>
    );
  }
);

SnackbarError.displayName = "ReportComplete";

export default SnackbarError;
