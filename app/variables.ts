export const byApiDomain = 'api.atlas-probeg.ru'
export const newApiDomain = 'api.atlas-dealer.ru'
export const apiSlug = 'atlas-dealer'
export const domains = [
    {
        domain: 'xn----7sbabk4czaugg.xn--p1ai',
        title: 'ATLAS-DEALER',
        // атлас-авто.рф
        link: 'https://xn----7sbabk4czaugg.xn--p1ai',
        catalogRoute: 'used',
        hasGeneration: true,
        root: true
    },
]
export const mainDomain = domains.find(value => value.root) || domains[0]