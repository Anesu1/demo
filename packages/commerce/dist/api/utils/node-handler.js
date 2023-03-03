import { normalizeApiError } from "./errors";
import { transformRequest, setHeaders } from ".";
export default function nodeHandler(commerce, endpoints) {
    const paths = Object.keys(endpoints);
    const handlers = paths.reduce((acc, path)=>Object.assign(acc, {
            [path]: endpoints[path](commerce)
        }), {});
    return async (req, res)=>{
        try {
            if (!req.query.commerce) {
                throw new Error("Invalid configuration. Please make sure that the /pages/api/commerce/[[...commerce]].ts route is configured correctly, and it passes the commerce instance.");
            }
            /**
       * Get the url path
       */ const path = Array.isArray(req.query.commerce) ? req.query.commerce.join("/") : req.query.commerce;
            // Check if the handler for this path exists and return a 404 if it doesn't
            if (!paths.includes(path)) {
                throw new Error(`Endpoint handler not implemented. Please use one of the available api endpoints: ${paths.join(", ")}`);
            }
            const output = await handlers[path](transformRequest(req));
            const { status , errors , data , redirectTo , headers  } = output;
            setHeaders(res, headers);
            if (output instanceof Response) {
                return res.end(output.body);
            }
            if (redirectTo) {
                return res.redirect(redirectTo);
            }
            res.status(status || 200).json({
                data,
                errors
            });
        } catch (error) {
            const output1 = normalizeApiError(error);
            if (output1 instanceof Response) {
                return res.end(output1.body);
            }
            const { status: status1 = 500 , ...rest } = output1;
            res.status(status1).json(rest);
        }
    };
};
