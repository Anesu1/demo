export default function getAllPagesOperation({ commerce  }) {
    async function getAllPages({ config: cfg , preview  } = {}) {
        var ref;
        const config = commerce.getConfig(cfg);
        const { locale , fetch  } = config;
        const data = await fetch("content", "list", [
            "pages"
        ]);
        const pages = (data == null ? void 0 : (ref = data.results) == null ? void 0 : ref.map(({ slug , body , ...rest })=>({
                ...rest,
                url: `/${locale}/${slug}`,
                body: body ?? ""
            }))) ?? [];
        return {
            pages
        };
    }
    return getAllPages;
};
