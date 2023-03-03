import validateHandlers from "../../utils/validate-handlers";
import { addAddressBodySchema, addressSchema, deleteAddressBodySchema, updateAddressBodySchema } from "../../../schemas/customer";
import { parse, getInput } from "../../utils";
import { getCartBodySchema } from "../../../schemas/cart";
// create a function that returns a function
const customerShippingEndpoint = async (ctx)=>{
    var ref;
    const { req , handlers , config  } = ctx;
    validateHandlers(req, {
        GET: handlers["getAddresses"],
        POST: handlers["addItem"],
        PUT: handlers["updateItem"],
        DELETE: handlers["removeItem"]
    });
    let output;
    const input = await getInput(req);
    const { cookies  } = req;
    // Cart id might be usefull for anonymous shopping
    const cartId = (ref = cookies.get(config.cartCookie)) == null ? void 0 : ref.value;
    // Return customer addresses
    if (req.method === "GET") {
        const body = getCartBodySchema.parse({
            cartId
        });
        return parse(await handlers["getAddresses"]({
            ...ctx,
            body
        }), addressSchema);
    }
    // Create or add an item to customer addresses list
    if (req.method === "POST") {
        const body1 = addAddressBodySchema.parse({
            ...input,
            cartId
        });
        output = await handlers["addItem"]({
            ...ctx,
            body: body1
        });
    }
    // Update item in customer addresses list
    if (req.method === "PUT") {
        const body2 = updateAddressBodySchema.parse({
            ...input,
            cartId
        });
        output = await handlers["updateItem"]({
            ...ctx,
            body: body2
        });
    }
    // Remove an item from customer addresses list
    if (req.method === "DELETE") {
        const body3 = deleteAddressBodySchema.parse({
            ...input,
            cartId
        });
        return await handlers["removeItem"]({
            ...ctx,
            body: body3
        });
    }
    return output ? parse(output, addressSchema) : {
        status: 405
    };
};
export default customerShippingEndpoint;
