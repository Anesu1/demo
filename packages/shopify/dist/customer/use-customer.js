import { getCustomerQuery, getCustomerToken } from "../utils";
import useCustomer from "@vercel/commerce/customer/use-customer";
export default useCustomer;
export const handler = {
    fetchOptions: {
        query: getCustomerQuery
    },
    async fetcher ({ options , fetch  }) {
        const customerAccessToken = getCustomerToken();
        if (customerAccessToken) {
            const { customer  } = await fetch({
                ...options,
                variables: {
                    customerAccessToken: getCustomerToken()
                }
            });
            if (!customer) {
                return null;
            }
            return {
                id: customer.id,
                firstName: customer.firstName ?? "N/A",
                lastName: customer.lastName ?? "",
                ...customer.email && {
                    email: customer.email
                },
                ...customer.phone && {
                    phone: customer.phone
                }
            };
        }
    },
    useHook: ({ useData  })=>{
        return (input)=>{
            return useData({
                swrOptions: {
                    revalidateOnFocus: false,
                    ...input == null ? void 0 : input.swrOptions
                }
            });
        };
    }
};
