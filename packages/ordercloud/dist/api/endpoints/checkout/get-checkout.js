const getCheckout = async ({ req , body: { cartId  } , config: { restBuyerFetch  } ,  })=>{
    var ref, ref1;
    const token = (ref = req.cookies.get("token")) == null ? void 0 : ref.value;
    // Register credit card
    const payments = await restBuyerFetch("GET", `/orders/Outgoing/${cartId}/payments`).then((response)=>response.Items);
    const address = await restBuyerFetch("GET", `/orders/Outgoing/${cartId}`, null, {
        token
    }).then((response)=>response.ShippingAddressID);
    // Return cart and errors
    return {
        data: {
            hasPayment: payments.length > 0,
            hasShipping: Boolean(address),
            addressId: address,
            cardId: (ref1 = payments[0]) == null ? void 0 : ref1.ID
        }
    };
};
export default getCheckout;
