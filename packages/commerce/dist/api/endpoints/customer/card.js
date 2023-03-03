import { z } from "zod";
import { cardSchema, addCardBodySchema, deleteCardBodySchema, updateCardBodySchema } from "../../../schemas/customer";
import { parse, getInput } from "../../utils";
import validateHandlers from "../../utils/validate-handlers";
const customerCardEndpoint = async (ctx)=>{
    var ref;
    const { req , handlers , config  } = ctx;
    validateHandlers(req, {
        GET: handlers["getCards"],
        POST: handlers["addItem"],
        PUT: handlers["updateItem"],
        DELETE: handlers["removeItem"]
    });
    let output;
    const input = await getInput(req);
    const { cookies  } = req;
    // Cart id might be usefull for anonymous shopping
    const cartId = (ref = cookies.get(config.cartCookie)) == null ? void 0 : ref.value;
    // Create or add a card
    if (req.method === "GET") {
        const body = {
            ...input
        };
        return parse(await handlers["getCards"]({
            ...ctx,
            body
        }), z.array(cardSchema).optional());
    }
    // Create or add an item to customer cards
    if (req.method === "POST") {
        const body1 = addCardBodySchema.parse({
            ...input,
            cartId
        });
        output = await handlers["addItem"]({
            ...ctx,
            body: body1
        });
    }
    // Update item in customer cards
    if (req.method === "PUT") {
        const body2 = updateCardBodySchema.parse({
            ...input,
            cartId
        });
        output = await handlers["updateItem"]({
            ...ctx,
            body: body2
        });
    }
    // Remove an item from customer cards
    if (req.method === "DELETE") {
        const body3 = deleteCardBodySchema.parse({
            ...input,
            cartId
        });
        return await handlers["removeItem"]({
            ...ctx,
            body: body3
        });
    }
    return output ? parse(output, cardSchema.nullish()) : {
        status: 405
    };
};
export default customerCardEndpoint;
