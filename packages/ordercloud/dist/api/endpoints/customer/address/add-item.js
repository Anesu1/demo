const addItem = async ({ req , body: { item , cartId  } , config: { restBuyerFetch , tokenCookie  } ,  })=>{
    var ref;
    const token = (ref = req.cookies.get(tokenCookie)) == null ? void 0 : ref.value;
    // Register address
    const address = await restBuyerFetch("POST", `/me/addresses`, {
        AddressName: "main address",
        CompanyName: item.company,
        FirstName: item.firstName,
        LastName: item.lastName,
        Street1: item.streetNumber,
        Street2: item.streetNumber,
        City: item.city,
        State: item.city,
        Zip: item.zipCode,
        Country: item.country.slice(0, 2).toLowerCase(),
        Shipping: true
    }).then((response)=>response.ID);
    // Assign address to order
    await restBuyerFetch("PATCH", `/orders/Outgoing/${cartId}`, {
        ShippingAddressID: address
    }, {
        token
    });
    return {
        data: null
    };
};
export default addItem;
