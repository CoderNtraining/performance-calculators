export const brandingConfig = {
  productBrandName: 'BuildIQ',
  poweredByLabel: 'Powered by BuildIQ',
  demoClientName: 'Client Brand Name',
  demoClientTagline: 'Find the right turbo and fuel system for your power goal',
  demoMode: true,
  demoClientLogoLabel: 'Client Logo',
  demoCatalogLabel: 'Client Product Catalog',
  demoInHouseLabel: 'Client In-House Product',
  demoHelperText: 'White-label preview: client branding and product catalog are configurable.',
} as const;

export function getClientBrandName() {
  return brandingConfig.demoClientName;
}

export function getClientTagline() {
  return brandingConfig.demoClientTagline;
}
