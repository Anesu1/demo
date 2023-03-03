import { getCategories, getBrands } from "../../utils";
export default function getSiteInfoOperation({ commerce  }) {
    async function getSiteInfo({ config  } = {}) {
        const cfg = commerce.getConfig(config);
        const categoriesPromise = getCategories(cfg);
        const brandsPromise = getBrands(cfg);
        const [categories, brands] = await Promise.all([
            categoriesPromise,
            brandsPromise, 
        ]);
        return {
            categories,
            brands
        };
    }
    return getSiteInfo;
};
