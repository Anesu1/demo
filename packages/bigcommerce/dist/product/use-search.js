import useSearch from "@vercel/commerce/product/use-search";
export default useSearch;
export const handler = {
    fetchOptions: {
        url: "/api/commerce/catalog/products",
        method: "GET"
    },
    fetcher ({ input: { search , categoryId , brandId , sort  } , options , fetch  }) {
        // Use a dummy base as we only care about the relative path
        const url = new URL(options.url, "http://a");
        if (search) url.searchParams.set("search", search);
        if (Number.isInteger(Number(categoryId))) url.searchParams.set("categoryId", String(categoryId));
        if (Number.isInteger(Number(brandId))) url.searchParams.set("brandId", String(brandId));
        if (sort) url.searchParams.set("sort", sort);
        return fetch({
            url: url.pathname + url.search,
            method: options.method
        });
    },
    useHook: ({ useData  })=>(input = {})=>{
            return useData({
                input: [
                    [
                        "search",
                        input.search
                    ],
                    [
                        "categoryId",
                        input.categoryId
                    ],
                    [
                        "brandId",
                        input.brandId
                    ],
                    [
                        "sort",
                        input.sort
                    ], 
                ],
                swrOptions: {
                    revalidateOnFocus: false,
                    ...input.swrOptions
                }
            });
        }
};
