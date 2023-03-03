import { logoutBodySchema } from "../../schemas/auth";
import validateHandlers from "../utils/validate-handlers";
const logoutEndpoint = async (ctx)=>{
    const { req , handlers  } = ctx;
    validateHandlers(req, {
        GET: handlers["logout"]
    });
    const redirectTo = new URL(req.url).searchParams.get("redirectTo");
    const body = logoutBodySchema.parse(typeof redirectTo === "string" ? {
        redirectTo
    } : {});
    return handlers["logout"]({
        ...ctx,
        body
    });
};
export default logoutEndpoint;
