import { FetcherError } from "@vercel/commerce/utils/errors";
export let token = null;
// Get token util
async function getToken({ baseUrl , clientId , clientSecret  }) {
    // If not, get a new one and store it
    const authResponse = await fetch(`${baseUrl}/oauth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
        },
        body: `client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`
    });
    // If something failed getting the auth response
    if (!authResponse.ok) {
        // Get the body of it
        const error = await authResponse.json();
        console.log(JSON.stringify(error, null, 2));
        // And return an error
        throw new FetcherError({
            errors: [
                {
                    message: error.error_description.Code
                }
            ],
            status: error.error_description.HttpStatus
        });
    }
    // Return the token
    return authResponse.json();
}
export async function fetchData(opts) {
    // Destructure opts
    const { path , body , fetchOptions , config , token , method ="GET"  } = opts;
    // Do the request with the correct headers
    const dataResponse = await fetch(`${config.commerceUrl}/${config.apiVersion}${path}`, {
        ...fetchOptions,
        method,
        headers: {
            ...fetchOptions == null ? void 0 : fetchOptions.headers,
            "Content-Type": "application/json",
            accept: "application/json, text/plain, */*",
            authorization: `Bearer ${token}`
        },
        body: body ? JSON.stringify(body) : undefined
    });
    // If something failed getting the data response
    if (!dataResponse.ok) {
        let errors;
        try {
            // Get the body of it
            const error = await dataResponse.json();
            errors = error.Errors;
        } catch (e) {
            const message = await dataResponse.text();
            errors = [
                {
                    message
                }
            ];
        }
        throw new FetcherError({
            errors,
            status: dataResponse.status
        });
    }
    try {
        // Return data response as json
        return await dataResponse.json();
    } catch (error1) {
        // If response is empty return it as text
        return null;
    }
}
export const createBuyerFetcher = (getConfig)=>{
    return async (method, path, body, fetchOptions)=>{
        if (fetchOptions == null ? void 0 : fetchOptions.token) {
            token = fetchOptions == null ? void 0 : fetchOptions.token;
        }
        // Get provider config
        const config = getConfig();
        let meta = {};
        if (!token) {
            const newToken = await getToken({
                baseUrl: config.commerceUrl,
                clientId: process.env.ORDERCLOUD_BUYER_CLIENT_ID
            });
            token = newToken.access_token;
            meta.token = newToken;
        }
        // Return the data and specify the expected type
        const data = await fetchData({
            token,
            fetchOptions,
            config,
            method,
            path,
            body
        });
        return {
            ...data,
            meta
        };
    };
};
