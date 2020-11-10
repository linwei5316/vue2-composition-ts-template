import axios from "axios";

const requestTimeoutMillisecond = 15000;

const getService = axios.create({
  timeout: requestTimeoutMillisecond,
});
getService.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const postService = axios.create({
  timeout: requestTimeoutMillisecond,
  headers: {
    "Content-Type": "application/json",
  },
});
postService.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
postService.interceptors.response.use(
  ({data}) => {
    if (process.env.MOCK === "true") {
      return Promise.resolve(data);
    } else {
      if (data.Success) {
        return Promise.resolve(data);
      } else {
        return Promise.reject(data);
      }
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

const service = {
  get(apiPath: string) {
    const url = process.env.API_ORIGIN + apiPath;

    return getService.get(url);
  },
  post(apiPath: string, payload: any) {
    const url = process.env.API_ORIGIN + apiPath;

    return postService.post(url, payload);
  }
}

export default service;
