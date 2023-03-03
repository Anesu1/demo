import { FetcherError } from "@vercel/commerce/utils/errors";
const fetchGraphqlApi = (getConfig)=>async (query, { variables , preview  } = {}, headers)=>{
        const config = getConfig();
        const res = await fetch(config.commerceUrl, {
            method: "POST",
            headers: {
                ...headers,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
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
export default fetchGraphqlApi;
