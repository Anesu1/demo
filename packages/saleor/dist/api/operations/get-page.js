import * as Query from "../../utils/queries";
export default function getPageOperation({ commerce  }) {
    async function getPage({ query =Query.PageOne , variables , config  }) {
        const { fetch , locale ="en-US"  } = commerce.getConfig(config);
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
            page: data && data.page ? {
                ...data.page,
                name: data.page.title,
                body: data.page.content || "",
                url: `/${locale}/${data.page.slug}`
            } : null
        };
    }
    return getPage;
};
