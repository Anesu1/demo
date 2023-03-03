import { FetcherError } from "@vercel/commerce/utils/errors";
const fetchGraphqlApi = (getConfig)=>{
    return async (query, { variables , preview  } = {}, options)=>{
        const config = getConfig();
        const res = await fetch(config.commerceUrl, {
            method: (options == null ? void 0 : options.method) || "POST",
            headers: {
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
                        message: "Failed to fetch for API"
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
