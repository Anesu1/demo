import { SHOPIFY_CHECKOUT_ID_COOKIE, SHOPIFY_CHECKOUT_URL_COOKIE, SHOPIFY_CUSTOMER_TOKEN_COOKIE } from "../../../const";
import associateCustomerWithCheckoutMutation from "../../../utils/mutations/associate-customer-with-checkout";
const getCheckout = async ({ req , config ,  })=>{
    var ref, ref1;
    const { cookies  } = req;
    const checkoutUrl = (ref = cookies.get(SHOPIFY_CHECKOUT_URL_COOKIE)) == null ? void 0 : ref.value;
    const customerCookie = (ref1 = cookies.get(SHOPIFY_CUSTOMER_TOKEN_COOKIE)) == null ? void 0 : ref1.value;
    if (customerCookie) {
        try {
            var ref2, ref3;
            await config.fetch(associateCustomerWithCheckoutMutation, {
                variables: {
                    checkoutId: (ref2 = cookies.get(SHOPIFY_CHECKOUT_ID_COOKIE)) == null ? void 0 : ref2.value,
                    customerAccessToken: (ref3 = cookies.get(SHOPIFY_CUSTOMER_TOKEN_COOKIE)) == null ? void 0 : ref3.value
                }
            });
        } catch (error) {
            console.error(error);
        }
    }
    return {
        redirectTo: checkoutUrl ?? "/cart"
    };
};
export default getCheckout;
