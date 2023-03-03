// Based on https://github.com/spark-solutions/spree2vuestorefront/blob/d88d85ae1bcd2ec99b13b81cd2e3c25600a0216e/src/utils/index.ts
const getMediaGallery = (images, getImageUrl)=>{
    return images.reduce((productImages, _, imageIndex)=>{
        const url = getImageUrl(images[imageIndex], 800, 800);
        if (url) {
            return [
                ...productImages,
                {
                    url
                }
            ];
        }
        return productImages;
    }, []);
};
export default getMediaGallery;
