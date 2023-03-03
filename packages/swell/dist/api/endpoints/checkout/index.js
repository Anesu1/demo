import { createEndpoint } from "@vercel/commerce/api";
import { SWELL_CHECKOUT_URL_COOKIE } from "../../../const";
import checkoutEndpoint from "@vercel/commerce/api/endpoints/checkout";
const getCheckout = async ({ req ,  })=>{
    var ref;
    const { cookies  } = req;
    const checkoutUrl = (ref = cookies.get(SWELL_CHECKOUT_URL_COOKIE)) == null ? void 0 : ref.value;
    if (checkoutUrl) {
        return {
            redirectTo: checkoutUrl
        };
    } else {
        return {
            redirectTo: "/cart"
        };
    }
};
export const handlers = {
    getCheckout
};
const checkoutApi = createEndpoint({
    handler: checkoutEndpoint,
    handlers
});
export default checkoutApi;
