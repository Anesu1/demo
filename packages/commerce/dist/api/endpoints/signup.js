import { getInput } from "../utils";
import validateHandlers from "../utils/validate-handlers";
import { signupBodySchema } from "../../schemas/auth";
const signupEndpoint = async (ctx)=>{
    var ref;
    const { req , handlers , config  } = ctx;
    validateHandlers(req, {
        POST: handlers["signup"]
    });
    const input = await getInput(req);
    const { cookies  } = req;
    const cartId = (ref = cookies.get(config.cartCookie)) == null ? void 0 : ref.value;
    const body = signupBodySchema.parse({
        ...input,
        cartId
    });
    return handlers["signup"]({
        ...ctx,
        body
    });
};
export default signupEndpoint;
