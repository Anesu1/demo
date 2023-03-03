import { getInput } from "../utils";
import validateHandlers from "../utils/validate-handlers";
import { loginBodySchema } from "../../schemas/auth";
const loginEndpoint = async (ctx)=>{
    const { req , handlers  } = ctx;
    validateHandlers(req, {
        POST: handlers["login"],
        GET: handlers["login"]
    });
    const input = await getInput(req);
    const body = loginBodySchema.parse(input);
    return handlers["login"]({
        ...ctx,
        body
    });
};
export default loginEndpoint;
