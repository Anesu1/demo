import { useCallback } from "react";
import useSubmitCheckout from "@vercel/commerce/checkout/use-submit-checkout";
import { useCheckoutContext } from "@components/checkout/context";
export default useSubmitCheckout;
export const handler = {
    fetchOptions: {
        url: "/api/commerce/checkout",
        method: "POST"
    },
    async fetcher ({ input: item , options , fetch  }) {
        const data = await fetch({
            ...options,
            body: {
                item
            }
        });
        return data;
    },
    useHook: ({ fetch  })=>function useHook() {
            const { cardFields , addressFields  } = useCheckoutContext();
            return useCallback(async function onSubmitCheckout(input) {
                const data = await fetch({
                    input: {
                        card: cardFields,
                        address: addressFields
                    }
                });
                return data;
            }, [
                cardFields,
                addressFields
            ]);
        }
};
