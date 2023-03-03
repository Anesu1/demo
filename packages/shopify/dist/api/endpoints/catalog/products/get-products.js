// Return current cart info
const getProducts = async ({ commerce ,  })=>{
    const { products  } = await commerce.getAllProducts();
    const found = !!products.length;
    return {
        data: {
            products,
            found
        }
    };
};
export default getProducts;
