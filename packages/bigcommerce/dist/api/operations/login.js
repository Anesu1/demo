export const loginMutation = /* GraphQL */ `
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      result
    }
  }
`;
export default function loginOperation({ commerce  }) {
    async function login({ query =loginMutation , variables , config  }) {
        var ref;
        config = commerce.getConfig(config);
        const { data , res  } = await config.fetch(query, {
            variables
        });
        const headers = new Headers();
        // Bigcommerce returns a Set-Cookie header with the auth cookie
        let cookie = res.headers.get("Set-Cookie");
        if (cookie && typeof cookie === "string") {
            // In development, don't set a secure cookie or the browser will ignore it
            if (process.env.NODE_ENV !== "production") {
                cookie = cookie.replace("; Secure", "");
                // SameSite=none can't be set unless the cookie is Secure
                // bc seems to sometimes send back SameSite=None rather than none so make
                // this case insensitive
                cookie = cookie.replace(/; SameSite=none/gi, "; SameSite=lax");
            }
            headers.set("Set-Cookie", cookie);
        }
        return {
            result: (ref = data.login) == null ? void 0 : ref.result,
            headers,
            status: res.status
        };
    }
    return login;
};
