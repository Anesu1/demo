import { parse, getInput } from "../utils";
import validateHandlers from "../utils/validate-handlers";
import { getCartBodySchema, addItemBodySchema, updateItemBodySchema, removeItemBodySchema, cartSchema } from "../../schemas/cart";
const cartEndpoint = async (ctx)=>{
    var ref;
    const { req , handlers , config  } = ctx;
    validateHandlers(req, {
        GET: handlers["getCart"],
        POST: handlers["addItem"],
        PUT: handlers["updateItem"],
        DELETE: handlers["removeItem"]
    });
    const input = await getInput(req);
    let output;
    const { cookies  } = req;
    const cartId = (ref = cookies.get(config.cartCookie)) == null ? void 0 : ref.value;
    // Return current cart info
    if (req.method === "GET") {
        const body = getCartBodySchema.parse({
            cartId
        });
        output = await handlers["getCart"]({
            ...ctx,
            body
        });
    }
    // Create or add an item to the cart
    if (req.method === "POST") {
        const body1 = addItemBodySchema.parse({
            ...input,
            cartId
        });
        if (!body1.item.quantity) {
            body1.item.quantity = 1;
        }
        output = await handlers["addItem"]({
            ...ctx,
            body: body1
        });
    }
    // Update item in cart
    if (req.method === "PUT") {
        const body2 = updateItemBodySchema.parse({
            ...input,
            cartId
        });
        output = await handlers["updateItem"]({
            ...ctx,
            body: body2
        });
    }
    // Remove an item from the cart
    if (req.method === "DELETE") {
        const body3 = removeItemBodySchema.parse({
            ...input,
            cartId
        });
        return await handlers["removeItem"]({
            ...ctx,
            body: body3
        });
    }
    return output ? parse(output, cartSchema.nullish()) : {
        status: 405
    };
};
export default cartEndpoint;
