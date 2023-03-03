import { normalizePages } from "../../utils";
import getAllPagesQuery from "../../utils/queries/get-all-pages-query";
export default function getAllPagesOperation({ commerce  }) {
    async function getAllPages({ query =getAllPagesQuery , config , variables  } = {}) {
        const { fetch , locale , locales =[
            "en-US",
            "es"
        ] ,  } = commerce.getConfig(config);
        const { data  } = await fetch(query, {
            variables
        }, {
            ...locale && {
                headers: {
                    "Accept-Language": locale
                }
            }
        });
        return {
            pages: locales.reduce((arr, locale)=>arr.concat(normalizePages(data.pages.edges, locale)), [])
        };
    }
    return getAllPages;
};
