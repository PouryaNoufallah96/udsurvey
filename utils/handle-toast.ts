import { useToast } from "primevue/usetoast";

export enum SeverityType {
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
}

export function ToastHandler() {
  const toast = useToast();
  const life: number = 3000;

  const show = (severity: SeverityType, summary: string, detail?: string) => {
    toast.add({
      severity,
      summary,
      detail,
      life,
    });
  };

  const info = (message: string, detail?: string) => {
    show(SeverityType.INFO, message, detail);
  };
  const warning = (message: string, detail?: string) => {
    show(SeverityType.WARNING, message, detail);
  };
  const error = (message: string, detail?: string) => {
    show(SeverityType.ERROR, message, detail);
  };
  const success = (message: string, detail?: string) => {
    show(SeverityType.SUCCESS, message, detail);
  };
  return { info, warning, error, success };
}
