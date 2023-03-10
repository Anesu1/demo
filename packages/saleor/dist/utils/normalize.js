// TODO: Check nextjs-commerce bug if no images are added for a product
const placeholderImg = "/product-img-placeholder.svg";
const money = ({ amount , currency  })=>{
    return {
        value: +amount,
        currencyCode: currency || "USD"
    };
};
const normalizeProductOptions = (options)=>{
    return options == null ? void 0 : options.map((option)=>{
        return option == null ? void 0 : option.attributes;
    }).flat(1).reduce((acc, x)=>{
        if (acc.find(({ displayName  })=>displayName === x.attribute.name)) {
            return acc.map((opt)=>{
                return opt.displayName === x.attribute.name ? {
                    ...opt,
                    id: x.attribute.id,
                    values: [
                        ...opt.values,
                        ...x.values.map((value)=>{
                            return {
                                label: value == null ? void 0 : value.name
                            };
                        }), 
                    ]
                } : opt;
            });
        }
        return acc.concat({
            __typename: "MultipleChoiceOption",
            id: x.attribute.id,
            displayName: x.attribute.name,
            variant: "size",
            values: x.values.map((value)=>{
                return {
                    label: value == null ? void 0 : value.name
                };
            })
        });
    }, []);
};
const normalizeProductVariants = (variants)=>{
    return variants == null ? void 0 : variants.map((variant)=>{
        var ref, ref1;
        const { id , sku , name , pricing  } = variant;
        const price = (pricing == null ? void 0 : (ref = pricing.price) == null ? void 0 : ref.net) && ((ref1 = money(pricing.price.net)) == null ? void 0 : ref1.value);
        return {
            id,
            name,
            ...!!sku && {
                sku
            },
            price,
            listPrice: price,
            requiresShipping: true,
            options: normalizeProductOptions([
                variant
            ])
        };
    });
};
export function normalizeProduct(productNode) {
    var ref, ref1, ref2, ref3;
    const { id , name , media =[] , variants , description , slug , pricing , ...rest } = productNode;
    const product = {
        id,
        name,
        vendor: "",
        description: description ? (ref1 = (ref = JSON.parse(description)) == null ? void 0 : ref.blocks[0]) == null ? void 0 : ref1.data.text : "",
        path: `/${slug}`,
        slug: slug == null ? void 0 : slug.replace(/^\/+|\/+$/g, ""),
        price: (pricing == null ? void 0 : (ref2 = pricing.priceRange) == null ? void 0 : (ref3 = ref2.start) == null ? void 0 : ref3.net) && money(pricing.priceRange.start.net) || {
            value: 0,
            currencyCode: "USD"
        },
        // TODO: Check nextjs-commerce bug if no images are added for a product
        images: (media == null ? void 0 : media.length) ? media : [
            {
                url: placeholderImg
            }
        ],
        variants: variants && variants.length > 0 ? normalizeProductVariants(variants) : [],
        options: variants && variants.length > 0 ? normalizeProductOptions(variants) : [],
        ...rest
    };
    return product;
}
export function normalizeCart(checkout) {
    var ref, ref1, ref2, ref3, ref4, ref5;
    const lines = checkout.lines;
    const lineItems = lines.length > 0 ? lines == null ? void 0 : lines.map(normalizeLineItem) : [];
    return {
        id: checkout.id,
        customerId: "",
        email: "",
        createdAt: checkout.created,
        currency: {
            code: (ref = checkout.totalPrice) == null ? void 0 : ref.currency
        },
        taxesIncluded: false,
        lineItems,
        lineItemsSubtotalPrice: (ref1 = checkout.subtotalPrice) == null ? void 0 : (ref2 = ref1.gross) == null ? void 0 : ref2.amount,
        subtotalPrice: (ref3 = checkout.subtotalPrice) == null ? void 0 : (ref4 = ref3.gross) == null ? void 0 : ref4.amount,
        totalPrice: (ref5 = checkout.totalPrice) == null ? void 0 : ref5.gross.amount,
        discounts: []
    };
}
function normalizeLineItem({ id , variant , quantity  }) {
    var ref, ref1, ref2;
    return {
        id,
        variantId: String(variant == null ? void 0 : variant.id),
        productId: String(variant == null ? void 0 : variant.id),
        name: `${variant.product.name}`,
        quantity,
        variant: {
            id: String(variant == null ? void 0 : variant.id),
            ...(variant == null ? void 0 : variant.sku) && {
                sku: variant.sku
            },
            name: variant == null ? void 0 : variant.name,
            image: {
                url: (variant == null ? void 0 : variant.media[0]) ? variant == null ? void 0 : variant.media[0].url : placeholderImg
            },
            requiresShipping: false,
            price: variant == null ? void 0 : (ref = variant.pricing) == null ? void 0 : (ref1 = ref.price) == null ? void 0 : ref1.gross.amount,
            listPrice: 0
        },
        path: String(variant == null ? void 0 : (ref2 = variant.product) == null ? void 0 : ref2.slug),
        discounts: [],
        options: []
    };
}
