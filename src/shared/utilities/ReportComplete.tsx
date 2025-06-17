import { forwardRef, useCallback, useRef } from "react";
import { useSnackbar, SnackbarContent, CustomContentProps } from "notistack";
import { IoClose } from "react-icons/io5";

const ReportComplete = forwardRef<HTMLDivElement, CustomContentProps>(
  ({ id, ...props }, ref) => {
    const { closeSnackbar } = useSnackbar();
    const errorCode = typeof props.message == 'string' && props.message.split('-')[0];
    const errorStack = typeof props.message == 'string' && props.message.split('-')[1];
    // const [expanded, setExpanded] = useState(false);
    const checkboxRef = useRef<HTMLInputElement>(null);

    // const handleExpandClick = useCallback(() => {
    //   setExpanded((oldExpanded) => !oldExpanded);
    // }, []);

    const handleDismiss = useCallback(() => {
      closeSnackbar(id);
    }, [id, closeSnackbar]);

    return (
      <SnackbarContent ref={ref}>
        <div className="collapse max-w-96 bg-red-500 text-white outline-none border-base-300 border">
          <input type="checkbox" ref={checkboxRef} id="miCheckbox" />
          <div className="flex items-center  justify-between pr-4 collapse-title font-semibold">
            <p>{errorCode}</p>
            <button className="z-50" onClick={handleDismiss}>
              <IoClose size={25} />
            </button>
          </div>
          <div className="collapse-content text-sm">
            {errorStack}
          </div>
        </div>
      </SnackbarContent>
    );
  }
);

ReportComplete.displayName = "ReportComplete";

export default ReportComplete;