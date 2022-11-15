import axiosClient, {AxiosError, AxiosRequestConfig} from "axios";
import { API_BASE_URL, API_VERSION_1 } from "@env"
import { storeErrorHandler } from '$stores/action'
import { store } from '$stores/index'

/**
 * Creates an initial 'axios' instance with custom settings.
 */
let refreshTokenReq = false

const baseUrl = API_BASE_URL
const version = API_VERSION_1

const instance = axiosClient.create({
  baseURL: `${baseUrl}${version}`,
  timeout: 30000,
  headers: {
    Accept: "application/json"
  },
});

instance.interceptors.request.use(
  async (config) => {
    const token = '';
    if (token && !refreshTokenReq) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    config.headers = {
      ...config.headers,
    };
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Handle all responses. It is possible to add handlers
 * for requests, but it is omitted here for brevity.
 */
instance.interceptors.response.use(
  (res) => {
    let { data } = res.data
    if (data) return data
    return res.data
  },
  async (err: AxiosError) => {
    // if connection time out, dispatch data ke redux untuk menampilkan halaman (popup) Req Timeout
    if (err.code === 'ECONNABORTED') {
      store.dispatch(storeErrorHandler({
        type: 'ABBORTED',
        message: "" //STR.ERROR_HANDLER_ABBORTED ?? "ABBORD"
      }))
      return
    }
    if (err.response) {
        return Promise.reject(err.response.data);
    }
    if (err.request) {
        return Promise.reject(err.request);
    }
    return Promise.reject(err.message);
    }
);
/**
 * Replaces main `axios` instance with the custom-one.
 *
 * @param cfg - Axios configuration object.
 * @returns A promise object of a response of the HTTP request with the 'data' object already
 * destructured.
 */
const axios = <T>(cfg: AxiosRequestConfig) => instance.request<any, T>(cfg);
export default axios;