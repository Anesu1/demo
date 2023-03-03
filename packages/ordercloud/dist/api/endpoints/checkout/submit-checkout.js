const submitCheckout = async ({ req , body: { cartId  } , config: { restBuyerFetch , tokenCookie  } ,  })=>{
    var ref;
    const token = (ref = req.cookies.get(tokenCookie)) == null ? void 0 : ref.value;
    // Submit order
    await restBuyerFetch("POST", `/orders/Outgoing/${cartId}/submit`, null, {
        token
    });
    // Return cart and errors
    return {
        data: null
    };
};
export default submitCheckout;
