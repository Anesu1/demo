import { prepareSetCookie } from "../../../lib/prepare-set-cookie";
const logout = async ({ body: { redirectTo  } , config ,  })=>{
    // Remove the cookie
    const authCookie = prepareSetCookie(config.customerCookie, "", {
        maxAge: -1,
        path: "/"
    });
    const headers = {
        "Set-Cookie": authCookie
    };
    // Only allow redirects to a relative URL
    return (redirectTo == null ? void 0 : redirectTo.startsWith("/")) ? {
        redirectTo,
        headers
    } : {
        headers
    };
};
export default logout;
