import { normalizeApiError } from "./errors";
import { transformHeaders } from ".";
export default function edgeHandler(commerce, endpoints) {
    const endpointsKeys = Object.keys(endpoints);
    const handlers = endpointsKeys.reduce((acc, endpoint)=>Object.assign(acc, {
            [endpoint]: endpoints[endpoint](commerce)
        }), {});
    return async (req)=>{
        try {
            const { pathname  } = new URL(req.url);
            /**
       * Get the current endpoint by removing the leading and trailing slash & base path.
       * Csovers: /api/commerce/cart & /checkout
       */ const endpoint = pathname.replace("/api/commerce/", "").replace(/^\/|\/$/g, "");
            // Check if the handler for this path exists and return a 404 if it doesn't
            if (!endpointsKeys.includes(endpoint)) {
                throw new Error(`Endpoint "${endpoint}" not implemented. Please use one of the available api endpoints: ${endpointsKeys.join(", ")}`);
            }
            /**
       * Executes the handler for this endpoint, provided by the provider,
       * parses the input body and returns the parsed output
       */ const output = await handlers[endpoint](req);
            // If the output is a Response, return it directly (E.g. checkout page & validateMethod util)
            if (output instanceof Response) {
                return output;
            }
            const headers = transformHeaders(output.headers);
            // If the output contains a redirectTo property, return a Response with the redirect
            if (output.redirectTo) {
                headers.append("Location", output.redirectTo);
                return new Response(null, {
                    status: 302,
                    headers
                });
            }
            // Otherwise, return a JSON response with the output data or errors returned by the handler
            const { data =null , errors , status  } = output;
            return new Response(JSON.stringify({
                data,
                errors
            }), {
                status,
                headers
            });
        } catch (error) {
            const output1 = normalizeApiError(error);
            if (output1 instanceof Response) {
                return output1;
            }
            const { status: status1 = 500 , ...rest } = output1;
            return output1 instanceof Response ? output1 : new Response(JSON.stringify(rest), {
                status: status1
            });
        }
    };
};
