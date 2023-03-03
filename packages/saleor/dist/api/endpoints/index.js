import createEndpoints from "@vercel/commerce/api/endpoints";
import checkout from "./checkout";
const endpoints = {
    checkout
};
export default function saleorAPI(commerce) {
    return createEndpoints(commerce, endpoints);
};
