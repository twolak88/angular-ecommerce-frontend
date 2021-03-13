export const environment = {
  production: true,
  baseBackendServiceUrl: 'http://localhost:8080/api/',
  productsBackendServiceUrl: 'products/',
  productsSearchByCategoryIdBackendServiceUrl: 'products/search/findByCategoryId',
  productsSearchByNameBackendServiceUrl: 'products/search/findByNameContaining',
  productCategoryBackendServiceUrl: 'product-category/',
  countriesBackendServiceUrl: 'countries',
  statesSearchByCountryCodeBackendServiceUrl: 'states/search/findByCountryCode',
  checkoutBackendServiceUrl: 'checkout/purchase',
  orderSearchByCustomerEmail: 'orders/search/findByCustomerEmail',

  dateFormat: 'medium'
};
