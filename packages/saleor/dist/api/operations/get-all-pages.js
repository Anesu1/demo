import * as Query from "../../utils/queries";
export default function getAllPagesOperation({ commerce  }) {
    async function getAllPages({ query =Query.PageMany , config , variables  } = {}) {
        var ref, ref1;
        const { fetch , locale , locales =[
            "en-US"
        ]  } = commerce.getConfig(config);
        const { data  } = await fetch(query, {
            variables
        }, {
            ...locale && {
                headers: {
                    "Accept-Language": locale
                }
            }
        });
        const pages = (data == null ? void 0 : (ref = data.pages) == null ? void 0 : (ref1 = ref.edges) == null ? void 0 : ref1.map(({ node: { title: name , slug , ...node }  })=>({
                id: node.id,
                url: `/${locale}/${slug}`,
                body: node.content || "",
                name
            }))) ?? [];
        return {
            pages
        };
    }
    return getAllPages;
};
