import { z } from "zod";
import { parse } from "../../utils";
import validateHandlers from "../../utils/validate-handlers";
import { customerSchema } from "../../../schemas/customer";
const customerEndpoint = async (ctx)=>{
    const { req , handlers  } = ctx;
    validateHandlers(req, {
        GET: handlers["getLoggedInCustomer"]
    });
    const body = null;
    const output = await handlers["getLoggedInCustomer"]({
        ...ctx,
        body
    });
    return output ? parse(output, z.object({
        customer: customerSchema
    })) : {
        status: 204
    };
};
export default customerEndpoint;
