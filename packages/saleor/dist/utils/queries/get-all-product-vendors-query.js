export const getAllProductVendors = /* GraphQL */ `
  query getAllProductVendors($first: Int = 50, $cursor: String) {
    products(first: $first, after: $cursor) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          vendor
        }
        cursor
      }
    }
  }
`;
