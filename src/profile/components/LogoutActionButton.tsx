import { useEffect } from "react";
import { useFetcher } from "react-router";

type LogoutActionProps = {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string
}

export default function LogoutActionButton({ children, disabled, className }: LogoutActionProps) {
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data?.reload) window.location.reload();
  }, [fetcher.data]);

  return (
    <fetcher.Form method="post" action="/logout-action" className="p-0 flex">
      <button disabled={disabled} className={className} name="path" type="submit">
        {children}
      </button>
    </fetcher.Form>
  )
}
