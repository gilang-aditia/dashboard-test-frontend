import { ReactNode } from "react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { cn } from "../../lib/utils";

interface CustomAlertProps {
  status: "warning" | "info" | "success" | "error";
  title: string;
  description: string;
  icon?: ReactNode;
  className?: string;
}

export function CustomAlert({
  status,
  title,
  description,
  className,
}: CustomAlertProps) {
  const statusStyles = {
    warning: "bg-orange-500 text-white",
    info: "bg-blue-500 text-white",
    success: "bg-green-500 text-white",
    error: "bg-red-100 text-slate-600",
  };

  return (
    <Alert
      className={cn(
        "flex items-center rounded-lg p-3",
        statusStyles[status],
        className,
      )}
    >
      {/* <div className="text--500 mx-2 rounded-full bg-red-100 p-1">
        {icon || <i className="fas fa-exclamation-circle" />}
      </div> */}
      <div className="text-dark mx-2">
        <AlertTitle className="text-sm font-bold">{title}</AlertTitle>
        <AlertDescription className="text-sm">{description}</AlertDescription>
      </div>
    </Alert>
  );
}
