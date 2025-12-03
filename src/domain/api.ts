import axios from "axios";

const base = import.meta.env.VITE_API_URL;

const apiInstance = axios.create({
  baseURL: base,
  headers: {
    accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "cache-control": "no-cache",
    "X-UID": localStorage.__X_UID__,
    "X-LANG": localStorage.__LANGUAGE__,
  },
});

apiInstance.interceptors.request.use(
  (config) => {
    // const token = authStore.getState().token;
    const token = "";
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  (response) => {
    const { data } = response;

    if (!data) {
      return Promise.reject(data.message);
    }

    return data;
  },
  (error) => {
    console.error(error && error.response, "the error response");

    if (error.response) {
      if (error.response.status === 401) {
        // authStore.getState().removeToken();
      }

      if (error.response.data) {
        return Promise.reject({
          ...error.response.data,
          msg: error.response.data.message || "Network Error",
        });
      }
    }

    return Promise.reject({
      message: "Network Error",
      msg: "Network Error",
    });
  }
);

export async function api<T, R>({
  endPoint,
  method,
  data,
}: {
  endPoint: string;
  method: "post" | "get";
  data?: T;
}): Promise<R> {
  const result = await apiInstance[method]<R>(endPoint, data);
  return result as R;
}
