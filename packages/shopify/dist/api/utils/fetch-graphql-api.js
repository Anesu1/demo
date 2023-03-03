import { API_URL, API_TOKEN } from "../../const";
import { getError } from "../../utils/handle-fetch-response";
const fetchGraphqlApi = async (query, { variables  } = {}, options)=>{
    try {
        const res = await fetch(API_URL, {
            method: (options == null ? void 0 : options.method) || "POST",
            headers: {
                "X-Shopify-Storefront-Access-Token": API_TOKEN,
                ...options == null ? void 0 : options.headers,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...options == null ? void 0 : options.body,
                query,
                variables
            })
        });
        const { data , errors , status  } = await res.json();
        if (errors) {
            throw getError(errors, status);
        }
        return {
            data,
            res
        };
    } catch (err) {
        throw getError([
            {
                message: `${err} \n Most likely related to an unexpected output. E.g: NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN & NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN might be incorect.`
            }, 
        ], 500);
    }
};
export default fetchGraphqlApi;
