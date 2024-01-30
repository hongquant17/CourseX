import { AxiosResponse } from "axios";

interface SuccessResponse<T = any> {
    data: T;
    message: string;
    statusCode: number;
    success: boolean;
  }

type ApiCallback<T> = () => Promise<AxiosResponse<SuccessResponse<T>, any>>;

// A utility function for handling API requests with loading, success, and error handling
export const requestHandler = <T>(api: ApiCallback<T>) => {
  return async () => {
    try {
      const { data } = await api();
      console.log(data);
      
      return data;
    } catch (error: any) {
      // Handle error cases, including unauthorized and forbidden cases
      if ([401, 403].includes(error?.response.data?.statusCode)) {
        localStorage.clear(); // Clear local storage on authentication issues
        //   if (isBrowser) window.location.href = "/login"; // Redirect to login page
      }

      throw new Error(error?.response?.data?.message || "Something went wrong");
    }
  };
};

// Check if the code is running in a browser environment
export const isBrowser = typeof window !== "undefined";
