import createEndpoints from "@vercel/commerce/api/endpoints";
import products from "./catalog/products";
const endpoints = {
    "catalog/products": products
};
export default function sfccApi(commerce) {
    return createEndpoints(commerce, endpoints);
};
