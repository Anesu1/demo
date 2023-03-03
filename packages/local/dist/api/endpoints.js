import createEndpoints from "@vercel/commerce/api/endpoints";
const endpoints = {};
export default function localAPI(commerce) {
    return createEndpoints(commerce, endpoints);
};
