import { serialize } from "cookie";
const logout = async ({ body: { redirectTo  } , config ,  })=>{
    const headers = {
        "Set-Cookie": serialize(config.customerCookie, "", {
            maxAge: -1,
            path: "/"
        })
    };
    return redirectTo ? {
        redirectTo,
        headers
    } : {
        headers
    };
};
export default logout;
