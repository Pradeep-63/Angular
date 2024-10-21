import { AxiosResponse } from "axios";
import { JsonBody, makeRequest } from "./requestBuilder";

export type RequestBody = JsonBody;

export type RequestMethod = (
    url: string,
    body?: RequestBody,
) => Promise<AxiosResponse["data"]>;

export interface ApiWrapper {
    get: RequestMethod;
    post: RequestMethod;
    put: RequestMethod;
    delete: RequestMethod;
}

export const API: ApiWrapper = {
    get: async (url: string, params?: JsonBody) =>
        makeRequest({
            method: "get",
            url,
            params,
        }),

    post: async (url: string, body?: JsonBody) =>
        makeRequest({
            method: "post",
            body,
            url,
        }),

    put: async (url: string, body?: JsonBody) =>
        makeRequest({
            method: "put",
            body,
            url,
        }),

    delete: async (url: string, body?: JsonBody) =>
        makeRequest({
            method: "delete",
            body,
            url,
        }),
};
