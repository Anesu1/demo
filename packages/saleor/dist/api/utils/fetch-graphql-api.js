import { API_URL } from "../../const";
import { getError } from "../../utils/handle-fetch-response";
import { getToken } from "../../utils/index";
const fetchGraphqlApi = async (query, { variables  } = {}, options)=>{
    const token = getToken();
    const res = await fetch(API_URL, {
        method: (options == null ? void 0 : options.method) || "POST",
        headers: {
            ...token && {
                Authorization: `Bearer ${token}`
            },
            ...options == null ? void 0 : options.headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ...options == null ? void 0 : options.body,
            query,
            variables
        })
    });
    const { data , errors , message , type , status  } = await res.json();
    if (errors || res.status >= 400) {
        throw getError(errors || [
            {
                message: `${type ? `${type}, ` : ""}${message}`
            }, 
        ], status || res.status);
    }
    return {
        data,
        res
    };
};
export default fetchGraphqlApi;
