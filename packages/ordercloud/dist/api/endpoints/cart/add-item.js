import { formatCart } from "../../utils/cart";
import { serialize } from "cookie";
const addItem = async ({ req , body: { cartId , item  } , config: { restBuyerFetch , cartCookie , tokenCookie  } ,  })=>{
    var ref;
    // Get token
    let token = (ref = req.cookies.get(tokenCookie)) == null ? void 0 : ref.value;
    let headers = {};
    // Create an order if it doesn't exist
    if (!cartId) {
        const { ID , meta  } = await restBuyerFetch("POST", `/orders/Outgoing`, {}, {
            token
        });
        cartId = ID;
        headers = {
            "set-cookie": [
                serialize(cartCookie, cartId, {
                    maxAge: 60 * 60 * 24 * 30,
                    expires: new Date(Date.now() + 60 * 60 * 24 * 30 * 1000),
                    secure: process.env.NODE_ENV === "production",
                    path: "/",
                    sameSite: "lax"
                }), 
            ]
        };
        if (meta == null ? void 0 : meta.token) {
            var ref1;
            headers["set-cookie"].push(serialize(tokenCookie, (ref1 = meta.token) == null ? void 0 : ref1.access_token, {
                maxAge: meta.token.expires_in,
                expires: new Date(Date.now() + meta.token.expires_in * 1000),
                secure: process.env.NODE_ENV === "production",
                path: "/",
                sameSite: "lax"
            }));
        }
    }
    let specs = [];
    // If a variant is present, fetch its specs
    if (item.variantId !== "undefined") {
        const { Specs  } = await restBuyerFetch("GET", `/me/products/${item.productId}/variants/${item.variantId}`, null, {
            token
        });
        specs = Specs;
    }
    // Add the item to the order
    await restBuyerFetch("POST", `/orders/Outgoing/${cartId}/lineitems`, {
        ProductID: item.productId,
        Quantity: item.quantity,
        Specs: specs
    }, {
        token
    });
    // Get cart & line items
    const [cart, { Items  }] = await Promise.all([
        restBuyerFetch("GET", `/orders/Outgoing/${cartId}`, null, {
            token
        }),
        restBuyerFetch("GET", `/orders/Outgoing/${cartId}/lineitems`, null, {
            token
        }), 
    ]);
    // Format cart
    const formattedCart = formatCart(cart, Items);
    // Return cart and headers
    return {
        data: formattedCart,
        headers
    };
};
export default addItem;
