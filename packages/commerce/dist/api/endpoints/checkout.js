import { checkoutSchema, getCheckoutBodySchema, submitCheckoutBodySchema } from "../../schemas/checkout";
import { parse, getInput } from "../utils";
import validateHandlers from "../utils/validate-handlers";
const checkoutEndpoint = async (ctx)=>{
    var ref;
    const { req , handlers , config  } = ctx;
    validateHandlers(req, {
        GET: handlers["getCheckout"],
        POST: handlers["submitCheckout"]
    });
    const { cookies  } = req;
    const cartId = (ref = cookies.get(config.cartCookie)) == null ? void 0 : ref.value;
    const input = await getInput(req);
    // Get checkout
    if (req.method === "GET") {
        const body = getCheckoutBodySchema.parse({
            ...input,
            cartId
        });
        const res = await handlers["getCheckout"]({
            ...ctx,
            body
        });
        return parse(res, checkoutSchema.optional());
    }
    // Create checkout
    if (req.method === "POST" && handlers["submitCheckout"]) {
        const body1 = submitCheckoutBodySchema.parse({
            ...input,
            cartId
        });
        const res1 = await handlers["submitCheckout"]({
            ...ctx,
            body: body1
        });
        return parse(res1, checkoutSchema.optional());
    }
    return {
        status: 405
    };
};
export default checkoutEndpoint;
