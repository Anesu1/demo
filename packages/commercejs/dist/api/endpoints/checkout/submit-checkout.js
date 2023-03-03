import { normalizeTestCheckout } from "../../../utils/normalize-checkout";
const submitCheckout = async ({ body: { item , cartId  } , config: { sdkFetch  } ,  })=>{
    var ref;
    const sdkFetcher = sdkFetch;
    // Generate a checkout token
    const { id: checkoutToken  } = await sdkFetcher("checkout", "generateTokenFrom", "cart", cartId);
    const shippingMethods = await sdkFetcher("checkout", "getShippingOptions", checkoutToken, {
        country: "US"
    });
    const shippingMethodToUse = (shippingMethods == null ? void 0 : (ref = shippingMethods[0]) == null ? void 0 : ref.id) || "";
    const checkoutData = normalizeTestCheckout({
        paymentInfo: item == null ? void 0 : item.card,
        shippingInfo: item == null ? void 0 : item.address,
        shippingOption: shippingMethodToUse
    });
    // Capture the order
    await sdkFetcher("checkout", "capture", checkoutToken, checkoutData);
    return {
        data: null
    };
};
export default submitCheckout;
