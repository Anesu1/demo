const addItem = async ({ req , body: { item , cartId  } , config: { restBuyerFetch , tokenCookie  } ,  })=>{
    var ref;
    // Get token
    const token = (ref = req.cookies.get(tokenCookie)) == null ? void 0 : ref.value;
    const [exp_month, exp_year] = item.cardExpireDate.split("/");
    const stripeToken = await fetch("https://api.stripe.com/v1/tokens", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.STRIPE_SECRET}`
        },
        body: JSON.stringify({
            card: {
                number: item.cardNumber,
                exp_month,
                exp_year,
                cvc: item.cardCvc
            }
        })
    }).then((res)=>res.json()).then((res)=>res.id);
    // Register credit card
    const creditCard = await restBuyerFetch("POST", `/me/creditcards`, {
        Token: stripeToken,
        CardType: "credit",
        PartialAccountNumber: item.cardNumber.slice(-4),
        CardholderName: item.cardHolder,
        ExpirationDate: item.cardExpireDate
    }, {
        token
    }).then((response)=>response.ID);
    // Assign payment to order
    const payment = await restBuyerFetch("POST", `/orders/All/${cartId}/payments`, {
        Type: "CreditCard",
        CreditCardID: creditCard
    }, {
        token
    }).then((response)=>response.ID);
    // Accept payment to order
    await restBuyerFetch("PATCH", `/orders/All/${cartId}/payments/${payment}`, {
        Accepted: true
    });
    return {
        data: null
    };
};
export default addItem;
