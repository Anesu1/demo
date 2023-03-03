import { getAllPagesQuery } from "../queries/get-all-pages-query";
import { normalizePage } from "../../lib/normalize";
export default function getAllPagesOperation({ commerce  }) {
    async function getAllPages({ query =getAllPagesQuery , config  } = {}) {
        const cfg = commerce.getConfig(config);
        const variables = {
            documentListName: cfg.documentListName
        };
        const { data  } = await cfg.fetch(query, {
            variables
        });
        const pages = data.documentListDocuments.items.map(normalizePage);
        return {
            pages
        };
    }
    return getAllPages;
};
