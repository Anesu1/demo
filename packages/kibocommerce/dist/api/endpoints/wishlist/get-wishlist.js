import { CommerceAPIError } from "@vercel/commerce/api/utils/errors";
import getCustomerId from "../../utils/get-customer-id";
import { normalizeWishlistItem } from "../../../lib/normalize";
// Return wishlist info
const getWishlist = async ({ body: { customerToken , includeProducts  } , config , commerce ,  })=>{
    let result = {};
    if (customerToken) {
        var ref;
        const customerId = customerToken && await getCustomerId({
            customerToken,
            config
        });
        const wishlistName = config.defaultWishlistName;
        if (!customerId) {
            throw new CommerceAPIError("Wishlist not found", {
                status: 404,
                code: "not_found"
            });
        }
        const { wishlist  } = await commerce.getCustomerWishlist({
            variables: {
                customerId,
                wishlistName
            },
            includeProducts,
            config
        });
        result = {
            data: {
                ...wishlist,
                items: wishlist == null ? void 0 : (ref = wishlist.items) == null ? void 0 : ref.map((item)=>normalizeWishlistItem(item, config, includeProducts))
            }
        };
    }
    return {
        data: (result == null ? void 0 : result.data) ?? null
    };
};
export default getWishlist;
