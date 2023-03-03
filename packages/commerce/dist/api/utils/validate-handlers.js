import validateMethod from "./validate-method";
/**
 * Validates the request method and throws an error if it's not allowed, or if the handler is not implemented.
 * and stops the execution of the handler.
 * @param req The request object.
 * @param allowedOperations An object containing the handlers for each method.
 * @throws Error when the method is not allowed or the handler is not implemented.
 */ export default function validateHandlers(req, allowedOperations) {
    const methods = Object.keys(allowedOperations);
    const allowedMethods = methods.reduce((arr, method)=>{
        if (allowedOperations[method]) {
            arr.push(method);
        }
        return arr;
    }, []);
    return validateMethod(req, allowedMethods);
};
