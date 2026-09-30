import { forwardRef, useState } from "react";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import TextField from "./TextField";

type PasswordFieldProps = Omit<React.ComponentProps<typeof TextField>, "type" | "trailing">;

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>((props, ref) => {
  const [visible, setVisible] = useState(false);

  return (
    <TextField
      ref={ref}
      type={visible ? "text" : "password"}
      icon={FiLock}
      trailing={
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
          className="grid h-8 w-8 place-items-center rounded-md text-ink-muted transition-colors
            hover:bg-cream hover:text-brand"
        >
          {visible ? <FiEyeOff size={16} /> : <FiEye size={16} />}
        </button>
      }
      {...props}
    />
  );
});

PasswordField.displayName = "PasswordField";

export default PasswordField;
