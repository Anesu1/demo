import getCustomerId from "../../utils/get-customer-id";
import { CommerceAPIError } from "@vercel/commerce/api/utils/errors";
import { normalizeWishlist } from "../../../lib/normalize";
// Return wishlist info
const removeItem = async ({ body: { customerToken , itemId  } , config , commerce ,  })=>{
    const customerId = customerToken && await getCustomerId({
        customerToken,
        config
    });
    const { wishlist  } = customerId && await commerce.getCustomerWishlist({
        variables: {
            customerId
        },
        config
    }) || {};
    if (!wishlist || !itemId) {
        throw new CommerceAPIError("Wishlist not found", {
            status: 400
        });
    }
    const result = await config.storeApiFetch(`/v3/wishlists/${wishlist.id}/items/${itemId}`, {
        method: "DELETE"
    });
    return {
        data: (result == null ? void 0 : result.data) ? normalizeWishlist(result.data) : null
    };
};
export default removeItem;
