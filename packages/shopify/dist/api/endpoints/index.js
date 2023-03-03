import createEndpoints from "@vercel/commerce/api/endpoints";
import checkout from "./checkout";
import products from "./catalog/products";
const endpoints = {
    checkout,
    "catalog/products": products
};
export default function shopifyAPI(commerce) {
    return createEndpoints(commerce, endpoints);
};
