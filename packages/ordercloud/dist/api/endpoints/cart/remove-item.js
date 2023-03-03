import { formatCart } from "../../utils/cart";
const removeItem = async ({ req , body: { cartId , itemId  } , config: { restBuyerFetch , tokenCookie  } ,  })=>{
    var ref;
    const token = (ref = req.cookies.get(tokenCookie)) == null ? void 0 : ref.value;
    // Remove the item to the order
    await restBuyerFetch("DELETE", `/orders/Outgoing/${cartId}/lineitems/${itemId}`, null, {
        token
    });
    // Get cart
    const [cart, lineItems] = await Promise.all([
        restBuyerFetch("GET", `/orders/Outgoing/${cartId}`, null, {
            token
        }),
        restBuyerFetch("GET", `/orders/Outgoing/${cartId}/lineitems`, null, {
            token
        }).then((response)=>response.Items), 
    ]);
    // Format cart
    const formattedCart = formatCart(cart, lineItems);
    // Return cart and errors
    return {
        data: formattedCart
    };
};
export default removeItem;
