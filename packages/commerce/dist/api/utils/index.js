import { NextRequest } from "next/server";
/**
 * Parses the output data of the API handler and returns a valid APIResponse
 * or throws an error if the data is invalid.
 * @param res  APIResponse
 * @param parser ZodSchema
 */ export const parse = (res, parser)=>{
    if (res.data) {
        res.data = parser.parse(res.data);
    }
    return res;
};
/**
 * Returns the body of the request as a JSON object.
 * @param req NextRequest
 */ export const getInput = (req)=>req.json().catch(()=>({}));
/**
 * Convert NextApiRequest to NextRequest
 * @param req NextApiRequest
 * @param path string
 */ export const transformRequest = (req)=>{
    const headers = new Headers();
    let body;
    for(let i = 0; i < req.rawHeaders.length; i += 2){
        headers.append(req.rawHeaders[i], req.rawHeaders[i + 1]);
    }
    if (req.method === "POST" || req.method === "PUT" || req.method === "DELETE") {
        body = JSON.stringify(req.body);
    }
    // Get the url path & query string
    const url = new URL(req.url || "/", `https://${req.headers.host}`);
    return new NextRequest(url, {
        headers,
        method: req.method,
        body
    });
};
/**
 * Sets the custom headers received in the APIResponse in the
 * @param headers Record<string, string|string[]> | Headers | undefined
 * @returns Headers
 */ export const transformHeaders = (headers = {})=>{
    if (headers instanceof Headers) {
        return headers;
    }
    const newHeaders = new Headers();
    Object.entries(headers).forEach(([key, value])=>{
        newHeaders.append(key, value);
    });
    return newHeaders;
};
export const setHeaders = (res, headers = {})=>{
    if (headers instanceof Headers) {
        headers.forEach((value, key)=>{
            res.setHeader(key, value);
        });
    } else {
        Object.entries(headers).forEach(([key, value])=>{
            res.setHeader(key, value);
        });
    }
};
