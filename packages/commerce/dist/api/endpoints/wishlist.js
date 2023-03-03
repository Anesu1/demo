import { parse, getInput } from "../utils";
import { wishlistSchema, addItemBodySchema, removeItemBodySchema, getWishlistBodySchema } from "../../schemas/whishlist";
import validateHandlers from "../utils/validate-handlers";
const wishlistEndpoint = async (ctx)=>{
    var ref;
    const { req , handlers , config  } = ctx;
    validateHandlers(req, {
        GET: handlers["getWishlist"],
        POST: handlers["addItem"],
        DELETE: handlers["removeItem"]
    });
    let output;
    const { cookies  } = req;
    const input = await getInput(req);
    const customerToken = (ref = cookies.get(config.customerCookie)) == null ? void 0 : ref.value;
    const products = new URL(req.url).searchParams.get("products");
    // Return current wishlist info
    if (req.method === "GET") {
        const body = getWishlistBodySchema.parse({
            customerToken,
            includeProducts: !!products
        });
        output = await handlers["getWishlist"]({
            ...ctx,
            body
        });
    }
    // Add an item to the wishlist
    if (req.method === "POST") {
        const body1 = addItemBodySchema.parse({
            ...input,
            customerToken
        });
        output = await handlers["addItem"]({
            ...ctx,
            body: body1
        });
    }
    // Remove an item from the wishlist
    if (req.method === "DELETE") {
        const body2 = removeItemBodySchema.parse({
            ...input,
            customerToken
        });
        output = await handlers["removeItem"]({
            ...ctx,
            body: body2
        });
    }
    return output ? parse(output, wishlistSchema.optional()) : {
        status: 405
    };
};
export default wishlistEndpoint;
