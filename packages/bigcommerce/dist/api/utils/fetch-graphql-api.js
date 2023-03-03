import { FetcherError } from "@vercel/commerce/utils/errors";
const fetchGraphqlApi = (getConfig)=>{
    return async (query, { variables , preview  } = {}, options)=>{
        // log.warn(query)
        const config = getConfig();
        const res = await fetch(config.commerceUrl + (preview ? "/preview" : ""), {
            method: (options == null ? void 0 : options.method) || "POST",
            headers: {
                Authorization: `Bearer ${config.apiToken}`,
                ...options == null ? void 0 : options.headers,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...options == null ? void 0 : options.body,
                query,
                variables
            })
        });
        const json = await res.json();
        if (json.errors) {
            throw new FetcherError({
                errors: json.errors ?? [
                    {
                        message: "Failed to fetch Bigcommerce API"
                    }
                ],
                status: res.status
            });
        }
        return {
            data: json.data,
            res
        };
    };
};
export default fetchGraphqlApi;
