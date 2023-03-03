import { normalizeCart } from "../../../lib/normalize";
import getCartCookie from "../../utils/get-cart-cookie";
const removeItem = async ({ body: { cartId , itemId  } , config ,  })=>{
    const result = await config.storeApiFetch(`/v3/carts/${cartId}/items/${itemId}?include=line_items.physical_items.options`, {
        method: "DELETE"
    });
    return {
        data: (result == null ? void 0 : result.data) ? normalizeCart(result.data) : null,
        headers: {
            "Set-Cookie": (result == null ? void 0 : result.data) ? getCartCookie(config.cartCookie, cartId, config.cartCookieMaxAge) : getCartCookie(config.cartCookie)
        }
    };
};
export default removeItem;
