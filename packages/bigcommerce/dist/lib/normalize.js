import getSlug from "./get-slug";
function normalizeProductOption(productOption) {
    const { node: { entityId , values: { edges =[]  } = {} , ...rest } ,  } = productOption;
    return {
        id: String(entityId),
        values: edges == null ? void 0 : edges.map(({ node  })=>node),
        ...rest
    };
}
export function normalizeProduct(productNode) {
    var ref, ref1, ref2;
    const { entityId: id , productOptions , prices , path , images , variants ,  } = productNode;
    return {
        id: String(id),
        name: productNode.name,
        description: productNode.description,
        images: ((ref = images.edges) == null ? void 0 : ref.map(({ node: { urlOriginal , altText , ...rest }  })=>({
                url: urlOriginal,
                alt: altText,
                ...rest
            }))) || [],
        path: `/${getSlug(path)}`,
        variants: ((ref1 = variants.edges) == null ? void 0 : ref1.map(({ node: { entityId , productOptions , ...rest }  })=>{
            return {
                id: String(entityId),
                options: (productOptions == null ? void 0 : productOptions.edges) ? productOptions.edges.map(normalizeProductOption) : [],
                ...rest
            };
        })) || [],
        options: (productOptions == null ? void 0 : (ref2 = productOptions.edges) == null ? void 0 : ref2.map(normalizeProductOption)) || [],
        slug: path == null ? void 0 : path.replace(/^\/+|\/+$/g, ""),
        price: {
            value: prices == null ? void 0 : prices.price.value,
            currencyCode: prices == null ? void 0 : prices.price.currencyCode
        }
    };
}
export function normalizePage(page) {
    return {
        id: String(page.id),
        name: page.name,
        is_visible: page.is_visible,
        sort_order: page.sort_order,
        body: page.body ?? "",
        url: page.url
    };
}
export function normalizeCart(data) {
    var ref;
    return {
        id: data.id,
        customerId: String(data.customer_id),
        email: data.email,
        createdAt: data.created_time,
        currency: data.currency,
        taxesIncluded: data.tax_included,
        lineItems: [
            ...data.line_items.physical_items.map(normalizeLineItem),
            ...data.line_items.digital_items.map(normalizeLineItem), 
        ],
        lineItemsSubtotalPrice: data.base_amount,
        subtotalPrice: data.base_amount + data.discount_amount,
        totalPrice: data.cart_amount,
        discounts: (ref = data.discounts) == null ? void 0 : ref.map((discount)=>({
                value: discount.discounted_amount
            }))
    };
}
function normalizeLineItem(item) {
    return {
        id: item.id,
        variantId: String(item.variant_id),
        productId: String(item.product_id),
        name: item.name,
        quantity: item.quantity,
        variant: {
            id: String(item.variant_id),
            sku: item.sku,
            name: item.name,
            image: {
                url: item.image_url
            },
            requiresShipping: item.is_require_shipping,
            price: item.sale_price,
            listPrice: item.list_price
        },
        options: item.options,
        path: `/${item.url.split("/")[3]}`,
        discounts: item.discounts.map((discount)=>({
                value: discount.discounted_amount
            }))
    };
}
export function normalizeCategory(category) {
    return {
        id: `${category.entityId}`,
        name: category.name,
        slug: getSlug(category.path),
        path: category.path
    };
}
export function normalizeBrand(brand) {
    const path = brand.node.path.replace("/brands/", "");
    const slug = getSlug(path);
    return {
        id: `${brand.node.entityId}`,
        name: brand.node.name,
        slug,
        path: `/${slug}`
    };
}
export function normalizeWishlist(wishlist) {
    return {
        id: String(wishlist.id),
        token: wishlist.token,
        items: wishlist.items.map((item)=>({
                id: String(item.id),
                productId: String(item.product_id),
                variantId: String(item.variant_id),
                product: item.product
            }))
    };
}
