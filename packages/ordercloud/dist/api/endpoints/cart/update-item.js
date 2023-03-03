import { formatCart } from "../../utils/cart";
const updateItem = async ({ req , body: { cartId , itemId , item  } , config: { restBuyerFetch , tokenCookie  } ,  })=>{
    var ref;
    const token = (ref = req.cookies.get(tokenCookie)) == null ? void 0 : ref.value;
    // Store specs
    let specs = [];
    // If a variant is present, fetch its specs
    if (item.variantId) {
        specs = await restBuyerFetch("GET", `/me/products/${item.productId}/variants/${item.variantId}`).then((res)=>res.Specs);
    }
    // Add the item to the order
    await restBuyerFetch("PATCH", `/orders/Outgoing/${cartId}/lineitems/${itemId}`, {
        ProductID: item.productId,
        Quantity: item.quantity,
        Specs: specs
    }, {
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
export default updateItem;
