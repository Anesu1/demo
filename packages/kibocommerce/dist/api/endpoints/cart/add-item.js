import { normalizeCart } from "../../../lib/normalize";
import addToCurrentCartMutation from "../../../api/mutations/addToCart-mutation";
import { getProductQuery } from "../../../api/queries/get-product-query";
import { getCartQuery } from "../../../api/queries/get-cart-query";
import CookieHandler from "../../../api/utils/cookie-handler";
const buildAddToCartVariables = ({ productId , variantId , quantity =1 , productResponse  })=>{
    var ref;
    const { product  } = productResponse.data;
    const selectedOptions = (ref = product.variations) == null ? void 0 : ref.find((v)=>v.productCode === variantId).options;
    let options = [];
    selectedOptions == null ? void 0 : selectedOptions.forEach((each)=>{
        product == null ? void 0 : product.options.filter((option)=>{
            return option.attributeFQN == each.attributeFQN;
        }).forEach((po)=>{
            var ref;
            options.push({
                attributeFQN: po.attributeFQN,
                name: po.attributeDetail.name,
                value: (ref = po.values) == null ? void 0 : ref.find((v)=>v.value == each.value).value
            });
        });
    });
    return {
        productToAdd: {
            product: {
                productCode: productId,
                variationProductCode: variantId ? variantId : null,
                options
            },
            quantity,
            fulfillmentMethod: "Ship"
        }
    };
};
const addItem = async ({ req , body: { item  } , config ,  })=>{
    const productResponse = await config.fetch(getProductQuery, {
        variables: {
            productCode: item == null ? void 0 : item.productId
        }
    });
    const cookieHandler = new CookieHandler(config, req);
    let accessToken = null;
    if (!cookieHandler.getAccessToken()) {
        let anonymousShopperTokenResponse = await cookieHandler.getAnonymousToken();
        accessToken = anonymousShopperTokenResponse.accessToken;
    } else {
        accessToken = cookieHandler.getAccessToken();
    }
    const addToCartResponse = await config.fetch(addToCurrentCartMutation, {
        variables: buildAddToCartVariables({
            ...item,
            productResponse
        })
    }, {
        headers: {
            "x-vol-user-claims": accessToken
        }
    });
    let currentCart = null;
    if (addToCartResponse.data.addItemToCurrentCart) {
        var ref;
        let result = await config.fetch(getCartQuery, {}, {
            headers: {
                "x-vol-user-claims": accessToken
            }
        });
        currentCart = result == null ? void 0 : (ref = result.data) == null ? void 0 : ref.currentCart;
    }
    return {
        data: normalizeCart(currentCart)
    };
};
export default addItem;
