const getVendors = async (config)=>{
    var ref;
    const vendors = ((ref = await config.fetch("attributes", "get", [
        "brand"
    ])) == null ? void 0 : ref.values) ?? [];
    return [
        ...new Set(vendors)
    ].map((v)=>({
            id: v,
            name: v,
            slug: v.replace(/\s+/g, "-").toLowerCase(),
            path: `/${v}`
        }));
};
export default getVendors;
