export function normalizeProduct(productNode, config) {
    var ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7;
    const product = {
        id: productNode.productCode || "",
        name: ((ref = productNode.content) == null ? void 0 : ref.productName) || "",
        vendor: "",
        path: `/${productNode.productCode}`,
        slug: productNode.productCode || "",
        price: {
            value: (productNode == null ? void 0 : (ref1 = productNode.price) == null ? void 0 : ref1.price) ?? 0,
            currencyCode: config.currencyCode
        },
        description: ((ref2 = productNode.content) == null ? void 0 : ref2.productFullDescription) || "",
        descriptionHtml: ((ref3 = productNode.content) == null ? void 0 : ref3.productFullDescription) || "",
        images: ((ref4 = productNode.content) == null ? void 0 : (ref5 = ref4.productImages) == null ? void 0 : ref5.map((p)=>({
                url: `http:${p.imageUrl}`,
                altText: p.imageLabel
            }))) || [],
        variants: ((ref6 = productNode.variations) == null ? void 0 : ref6.map((v)=>{
            var ref;
            return {
                id: v.productCode,
                options: ((ref = v.options) == null ? void 0 : ref.map((o)=>({
                        ["__typename"]: "MultipleChoiceOption",
                        id: o.attributeFQN,
                        displayName: o.attributeFQN.split("~")[1][0].toUpperCase() + o.attributeFQN.split("~")[1].slice(1).toLowerCase(),
                        values: [
                            {
                                label: o.value.toString()
                            }
                        ]
                    }))) ?? []
            };
        })) ?? [],
        options: ((ref7 = productNode.options) == null ? void 0 : ref7.map((o)=>({
                id: o.attributeFQN,
                displayName: o.attributeDetail.name,
                values: o.values.map((v)=>({
                        label: v.value.toString()
                    }))
            }))) ?? []
    };
    return product;
}
export function normalizePage(page) {
    return {
        id: String(page.id),
        name: String(page.name),
        url: page.properties.url,
        body: page.properties.body,
        is_visible: page.properties.is_visible,
        sort_order: page.properties.sort_order
    };
}
export function normalizeCart(data) {
    var ref;
    return {
        id: data.id,
        customerId: data.userId,
        email: data == null ? void 0 : data.email,
        createdAt: data == null ? void 0 : data.created_time,
        currency: {
            code: "USD"
        },
        taxesIncluded: true,
        lineItems: data.items.map(normalizeLineItem),
        lineItemsSubtotalPrice: data == null ? void 0 : data.items.reduce((acc, obj)=>acc + obj.subtotal, 0),
        subtotalPrice: data == null ? void 0 : data.subtotal,
        totalPrice: data == null ? void 0 : data.total,
        discounts: (ref = data.orderDiscounts) == null ? void 0 : ref.map((discount)=>({
                value: discount.impact
            }))
    };
}
export function normalizeCustomer(customer) {
    return {
        id: String(customer.id),
        firstName: customer.firstName || "",
        lastName: customer.lastName || "",
        email: customer.emailAddress || "",
        acceptsMarketing: !!customer.acceptsMarketing
    };
}
function normalizeLineItem(item) {
    var ref, ref1, ref2;
    return {
        id: item.id,
        variantId: item.product.variationProductCode,
        productId: String(item.product.productCode),
        name: item.product.name,
        quantity: item.quantity,
        variant: {
            id: item.product.variationProductCode,
            sku: (ref = item.product) == null ? void 0 : ref.sku,
            name: item.product.name,
            image: {
                url: item == null ? void 0 : (ref1 = item.product) == null ? void 0 : ref1.imageUrl
            },
            requiresShipping: item == null ? void 0 : item.is_require_shipping,
            price: item == null ? void 0 : item.unitPrice.extendedAmount,
            listPrice: 0
        },
        options: item.product.options ?? [],
        path: `${item.product.productCode}`,
        discounts: item == null ? void 0 : (ref2 = item.discounts) == null ? void 0 : ref2.map((discount)=>({
                value: discount.discounted_amount
            }))
    };
}
export function normalizeCategory(category) {
    var ref, ref1, ref2;
    return {
        id: (category == null ? void 0 : category.categoryCode) || "",
        name: (category == null ? void 0 : (ref = category.content) == null ? void 0 : ref.name) || "",
        slug: (category == null ? void 0 : (ref1 = category.content) == null ? void 0 : ref1.slug) || "",
        path: `/${category == null ? void 0 : (ref2 = category.content) == null ? void 0 : ref2.slug}`
    };
}
export function normalizeWishlistItem(item, config, includeProducts = false) {
    if (includeProducts) {
        return {
            id: item.id,
            productId: String(item.product.productCode),
            variantId: item.product.variationProductCode,
            product: getProuducts(item, config)
        };
    } else {
        return getProuducts(item, config);
    }
}
function getProuducts(item, config) {
    var ref;
    return {
        variant_id: item.product.variationProductCode || "",
        id: String(item.product.productCode),
        product_id: String(item.product.productCode),
        name: item.product.name,
        quantity: item.quantity,
        images: [
            {
                url: `http:${item.product.imageUrl}`,
                alt: item.product.imageAlternateText
            }, 
        ],
        price: {
            value: item.product.price.price,
            retailPrice: item.product.price.retailPrice || 0,
            currencyCode: config.currencyCode
        },
        variants: [
            {
                id: item.product.variationProductCode || "",
                sku: (ref = item.product) == null ? void 0 : ref.sku,
                name: item.product.name,
                image: {
                    url: item == null ? void 0 : item.product.imageUrl
                }
            }, 
        ],
        options: item.product.options ?? [],
        path: `/${item.product.productCode}`,
        description: item.product.description
    };
}
