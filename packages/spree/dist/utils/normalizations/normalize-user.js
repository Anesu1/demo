const normalizeUser = (_spreeSuccessResponse, spreeUser)=>{
    return {
        id: spreeUser.id,
        email: spreeUser.attributes.email,
        firstName: spreeUser.attributes.firstname,
        lastName: spreeUser.attributes.lastname
    };
};
export default normalizeUser;
