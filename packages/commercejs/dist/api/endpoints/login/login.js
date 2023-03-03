import { serialize } from "cookie";
import { getDeploymentUrl } from "../../../utils/get-deployment-url";
const login = async ({ req , config: { sdkFetch , customerCookie  } ,  })=>{
    const sdkFetcher = sdkFetch;
    const redirectUrl = getDeploymentUrl();
    const { searchParams  } = new URL(req.url);
    const loginToken = searchParams.get("token");
    if (!loginToken) {
        return {
            redirectTo: redirectUrl
        };
    }
    const { jwt  } = await sdkFetcher("customer", "getToken", loginToken, false);
    return {
        headers: {
            "Set-Cookie": serialize(customerCookie, jwt, {
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24,
                path: "/"
            })
        }
    };
};
export default login;
