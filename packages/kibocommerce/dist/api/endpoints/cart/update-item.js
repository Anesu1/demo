import { normalizeCart } from "../../../lib/normalize";
import { getCartQuery } from "../../../api/queries/get-cart-query";
import updateCartItemQuantityMutation from "../../../api/mutations/updateCartItemQuantity-mutation";
const updateItem = async ({ req , body: { itemId , item  } , config ,  })=>{
    var ref;
    const encodedToken = (ref = req.cookies.get(config.cartCookie)) == null ? void 0 : ref.value;
    const token = encodedToken ? Buffer.from(encodedToken, "base64").toString("ascii") : null;
    const accessToken = token ? JSON.parse(token).accessToken : null;
    const updateItemResponse = await config.fetch(updateCartItemQuantityMutation, {
        variables: {
            itemId: itemId,
            quantity: item.quantity
        }
    }, {
        headers: {
            "x-vol-user-claims": accessToken
        }
    });
    let currentCart = null;
    if (updateItemResponse.data) {
        var ref1;
        let result = await config.fetch(getCartQuery, {}, {
            headers: {
                "x-vol-user-claims": accessToken
            }
        });
        currentCart = result == null ? void 0 : (ref1 = result.data) == null ? void 0 : ref1.currentCart;
    }
    return {
        data: normalizeCart(currentCart)
    };
};
export default updateItem;
