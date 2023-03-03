import { getAllProductsPathsQuery } from "../../utils/queries";
export default function getAllProductPathsOperation({ commerce  }) {
    async function getAllProductPaths({ query =getAllProductsPathsQuery , config , variables  } = {}) {
        var ref, ref1;
        config = commerce.getConfig(config);
        const { data  } = await config.fetch(query, {
            variables
        });
        return {
            products: data == null ? void 0 : (ref = data.products) == null ? void 0 : (ref1 = ref.edges) == null ? void 0 : ref1.map(({ node: { slug  }  })=>({
                    path: `/${slug}`
                }) ?? [])
        };
    }
    return getAllProductPaths;
};
