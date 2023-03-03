import { normalizeWishlist } from "../../lib/normalize";
export default function getCustomerWishlistOperation({ commerce  }) {
    async function getCustomerWishlist({ config , variables , includeProducts  }) {
        var ref;
        config = commerce.getConfig(config);
        const { data =[]  } = await config.storeApiFetch(`/v3/wishlists?customer_id=${variables.customerId}`);
        const wishlist = data[0];
        if (includeProducts && (wishlist == null ? void 0 : (ref = wishlist.items) == null ? void 0 : ref.length)) {
            const ids = [];
            for (const wishlistItem of wishlist.items){
                if (wishlistItem.product_id) {
                    ids.push(String(wishlistItem.product_id));
                }
            }
            if (ids.length) {
                const graphqlData = await commerce.getAllProducts({
                    variables: {
                        first: 50,
                        ids
                    },
                    config
                });
                // Put the products in an object that we can use to get them by id
                const productsById = graphqlData.products.reduce((prods, p)=>{
                    prods[Number(p.id)] = p;
                    return prods;
                }, {});
                // Populate the wishlist items with the graphql products
                wishlist.items.forEach((item)=>{
                    const product = item && productsById[Number(item.product_id)];
                    if (item && product) {
                        // @ts-ignore Fix this type when the wishlist type is properly defined
                        item.product = product;
                    }
                });
            }
        }
        return {
            wishlist: wishlist && normalizeWishlist(wishlist)
        };
    }
    return getCustomerWishlist;
};
