import createEndpoints from "@vercel/commerce/api/endpoints";
import login from "./login";
import checkout from "./checkout";
const endpoints = {
    login,
    checkout
};
export default function commercejsAPI(commerce) {
    return createEndpoints(commerce, endpoints);
};
