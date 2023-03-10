import { useMemo } from "react";
import useCart from "@vercel/commerce/cart/use-cart";
export default useCart;
export const handler = {
    fetchOptions: {
        url: "/api/commerce/cart",
        method: "GET"
    },
    useHook: ({ useData  })=>{
        return function useHook(input) {
            const response = useData({
                swrOptions: {
                    revalidateOnFocus: false,
                    ...input == null ? void 0 : input.swrOptions
                }
            });
            return useMemo(()=>{
                return Object.create(response, {
                    isEmpty: {
                        get () {
                            var ref, ref1;
                            return (((ref = response.data) == null ? void 0 : (ref1 = ref.lineItems) == null ? void 0 : ref1.length) ?? 0) <= 0;
                        },
                        enumerable: true
                    }
                });
            }, [
                response
            ]);
        };
    }
};
