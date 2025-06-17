import { forwardRef, useCallback } from "react";
import { useSnackbar, SnackbarContent, CustomContentProps } from "notistack";
import { IoClose } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { MdError } from "react-icons/md";

const ReportComplete = forwardRef<HTMLDivElement, CustomContentProps>(
  ({ id, ...props }, ref) => {
    const { closeSnackbar } = useSnackbar();
    const errorCode = typeof props.message == 'string' && props.message.split('-')[0];
    const errorStack = typeof props.message == 'string' && props.message.split('-')[1];

    const handleDismiss = useCallback(() => {
      closeSnackbar(id);
    }, [id, closeSnackbar]);

    return (
      <SnackbarContent ref={ref}>
        {
          import.meta.env.MODE !== "production"
            ? (
              <div className="collapse max-w-96 bg-[#121212] text-white rounded-md">
                <input type="checkbox" className="peer" />
                <IoIosArrowDown size={25} className="absolute mt-[19px] text-gray-300 right-13 peer-checked:rotate-180" />
                <div className="flex items-center justify-between pr-4 h-14 collapse-title font-semibold">
                  <div className="flex justify-center items-center gap-2">
                    <MdError size={25} color="#e74d3c" />
                    <p>{errorCode}</p>
                  </div>
                  <button className="z-50 cursor-pointer text-gray-300 hover:text-white" onClick={handleDismiss}>
                    <IoClose size={25} />
                  </button>
                </div>
                <div className="collapse-content text-sm">
                  {errorStack}
                </div>
              </div>
            ) : (
              <div className="w-96 bg-[#121212] text-white rounded-md">
                <div className="flex items-center justify-between p-4 h-14 font-semibold">
                  <div className="flex justify-center items-center gap-2">
                    <MdError size={25} color="#e74d3c" />
                    <p>{errorCode}</p>
                  </div>
                  <button className="z-50 cursor-pointer text-gray-300 hover:text-white" onClick={handleDismiss}>
                    <IoClose size={25} />
                  </button>
                </div>
              </div>
            )
        }
      </SnackbarContent>
    );
  }
);

ReportComplete.displayName = "ReportComplete";

export default ReportComplete;