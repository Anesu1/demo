import { normalizeCart } from "../../../lib/normalize";
import removeItemFromCartMutation from "../../../api/mutations/removeItemFromCart-mutation";
import { getCartQuery } from "../../../api/queries/get-cart-query";
const removeItem = async ({ req , body: { itemId  } , config ,  })=>{
    var ref;
    const encodedToken = (ref = req.cookies.get(config.customerCookie)) == null ? void 0 : ref.value;
    const token = encodedToken ? Buffer.from(encodedToken, "base64").toString("ascii") : null;
    const accessToken = token ? JSON.parse(token).accessToken : null;
    const removeItemResponse = await config.fetch(removeItemFromCartMutation, {
        variables: {
            id: itemId
        }
    }, {
        headers: {
            "x-vol-user-claims": accessToken
        }
    });
    let currentCart = null;
    if (removeItemResponse.data.deleteCurrentCartItem) {
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
export default removeItem;
