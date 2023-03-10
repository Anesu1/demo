import useLogin from "@vercel/commerce/auth/use-login";
import { useCallback } from "react";
import { CommerceError } from "@vercel/commerce/utils/errors";
import useCustomer from "../customer/use-customer";
import useCart from "../cart/use-cart";
export default useLogin;
export const handler = {
    fetchOptions: {
        url: "/api/commerce/login",
        method: "POST"
    },
    async fetcher ({ input: { email , password  } , options , fetch  }) {
        if (!(email && password)) {
            throw new CommerceError({
                message: "An email and password are required to login"
            });
        }
        return fetch({
            ...options,
            body: {
                email,
                password
            }
        });
    },
    useHook: ({ fetch  })=>()=>{
            const { mutate  } = useCustomer();
            const { mutate: mutateCart  } = useCart();
            return useCallback(async function login(input) {
                const data = await fetch({
                    input
                });
                await mutate();
                await mutateCart();
                return data;
            }, [
                fetch,
                mutate,
                mutateCart
            ]);
        }
};
