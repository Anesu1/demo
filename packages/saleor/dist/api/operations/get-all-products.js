import { normalizeProduct } from "../../utils";
import * as Query from "../../utils/queries";
export default function getAllProductsOperation({ commerce  }) {
    async function getAllProducts({ query =Query.ProductMany , variables , config , featured  } = {}) {
        const { fetch , locale  } = commerce.getConfig(config);
        if (featured) {
            variables = {
                ...variables,
                categoryId: "Q29sbGVjdGlvbjo0"
            };
            query = Query.CollectionOne;
        }
        const { data  } = await fetch(query, {
            variables
        }, {
            headers: {
                ...locale && {
                    "Accept-Language": locale
                }
            }
        });
        if (featured) {
            var ref, ref1;
            const products = ((ref = data == null ? void 0 : data.collection.products) == null ? void 0 : (ref1 = ref.edges) == null ? void 0 : ref1.map(({ node: p  })=>normalizeProduct(p))) ?? [];
            return {
                products
            };
        } else {
            var ref2, ref3;
            const products1 = (data == null ? void 0 : (ref2 = data.products) == null ? void 0 : (ref3 = ref2.edges) == null ? void 0 : ref3.map(({ node: p  })=>normalizeProduct(p))) ?? [];
            return {
                products: products1
            };
        }
    }
    return getAllProducts;
};
