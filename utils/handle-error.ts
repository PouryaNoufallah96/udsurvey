import { IApiErrorResponse } from "./../types/index";
import { ICustomError } from "~~/types";
import { useAuth } from "~~/composables/auth";

export function ErrorHandler() {
  const { logout } = useAuth();

  const handlingError = async (error: any, notificationHandler?: (message: string, detail?: string) => void) => {
    if (process.client)
      await customClientErrorHandler(error, notificationHandler);
    else
      customSrrverErrorHandler(error);
  }

  const customClientErrorHandler = async (
    error: ICustomError,
    notificationHandler?: (message: string, detail?: string) => void
  ) => {
    let { statusCode, message } = error;
    if (!statusCode || !message) {
      statusCode = 400;
      message = "خطایی رخ داده است";
    }

    if (statusCode == 401) return logout();
    if (statusCode == 403) return throwError({ statusCode, message });

    if (notificationHandler)
      notificationHandler(message, statusCode.toString());
    else throwError({ statusCode, message });
  }

  const customSrrverErrorHandler = (error: true | Error): void => {

    if (error) {
      const statusCode = error['statusCode'];
      const message = error['message'];
      if (statusCode == 401) return logout();
      throwError({ statusCode, message });
    }
  }

  const createMyError = (err: IApiErrorResponse): ICustomError => {
    const { message, code } = err;
    const error: ICustomError = {
      statusCode: code ?? 400,
      message: message ?? "خطایی رخ داده است",
    };
    return error;
  }

  return {
    handlingError,
    customClientErrorHandler,
    customSrrverErrorHandler,
    createMyError,
  }
}
