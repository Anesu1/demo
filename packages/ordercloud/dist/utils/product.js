export function normalize(product) {
    var ref, ref1;
    return {
        id: product.ID,
        name: product.Name,
        description: product.Description,
        slug: product.ID,
        path: `/${product.ID}`,
        images: product.xp.Images,
        price: {
            value: product.xp.Price,
            currencyCode: product.xp.PriceCurrency
        },
        variants: ((ref = product.xp.Variants) == null ? void 0 : ref.length) ? product.xp.Variants.map((variant)=>({
                id: variant.ID,
                sku: variant.ID,
                name: product.Name,
                options: variant.Specs.map((spec)=>({
                        id: spec.SpecID,
                        __typename: "MultipleChoiceOption",
                        displayName: spec.Name,
                        values: [
                            {
                                label: spec.Value
                            }, 
                        ]
                    }))
            })) : [],
        options: ((ref1 = product.xp.Specs) == null ? void 0 : ref1.length) ? product.xp.Specs.map((spec)=>{
            return {
                id: spec.ID,
                displayName: spec.Name,
                values: spec.Options.map((option)=>{
                    var ref;
                    return {
                        label: option.Value,
                        ...((ref = option.xp) == null ? void 0 : ref.hexColor) && {
                            hexColors: [
                                option.xp.hexColor
                            ]
                        }
                    };
                })
            };
        }) : []
    };
}
