import { CommerceAPIResponseError } from "./errors";
export default function validateMethod(req, allowedMethods) {
    const methods = allowedMethods.includes("OPTIONS") ? allowedMethods : [
        ...allowedMethods,
        "OPTIONS"
    ];
    if (!req.method || !methods.includes(req.method)) {
        throw new CommerceAPIResponseError(`The HTTP ${req.method} method is not supported at this route.`, new Response(JSON.stringify({
            errors: [
                {
                    code: "invalid_method",
                    message: `The HTTP ${req.method} method is not supported at this route.`
                }, 
            ]
        }), {
            status: 405,
            headers: {
                Allow: methods.join(", ")
            }
        }));
    }
    if (req.method === "OPTIONS") {
        throw new CommerceAPIResponseError("This is a CORS preflight request.", new Response(null, {
            status: 204,
            headers: {
                Allow: methods.join(", "),
                "Content-Length": "0"
            }
        }));
    }
};
