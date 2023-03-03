import { normalizeCart } from "../../../lib/normalize";
import { parseCartItem } from "../../utils/parse-item";
import getCartCookie from "../../utils/get-cart-cookie";
const updateItem = async ({ body: { cartId , itemId , item  } , config ,  })=>{
    const { data  } = await config.storeApiFetch(`/v3/carts/${cartId}/items/${itemId}?include=line_items.physical_items.options`, {
        method: "PUT",
        body: JSON.stringify({
            line_item: parseCartItem(item)
        })
    });
    return {
        data: normalizeCart(data),
        headers: {
            "Set-Cookie": getCartCookie(config.cartCookie, cartId, config.cartCookieMaxAge)
        }
    };
};
export default updateItem;
