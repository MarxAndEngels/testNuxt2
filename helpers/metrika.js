import {mainDomain} from "~/app/variables";

const y_metrika = 94932158
const e_comm = 308674889

export const yandexMetrika = (route) => {
    (function (m, e, t, r, i, k, a) {
        m[i] = m[i] || function () {
            (m[i].a = m[i].a || []).push(arguments)
        };
        m[i].l = 1 * new Date();
        k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
    })
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    ym(y_metrika, "init", {
        defer: true,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
        ecommerce: "dataLayer"
    });
    sendUrlYandexMetrika(route)
}
export const sendUrlYandexMetrika = (route) => {
    // console.log(`https://auto-otzovik.ru${route.fullPath}`)
    ym(y_metrika, 'hit', `${mainDomain.link}${route.fullPath}`)
}
export const vkAds = () => {
    _tmr.push({
        id: 3381119,
        type: "pageView",
        start: (new Date()).getTime(),
        pid: "USER_ID"
    });
    (function (d, w, id) {
        if (d.getElementById(id)) return;
        var ts = d.createElement("script");
        ts.type = "text/javascript";
        ts.async = true;
        ts.id = id;
        ts.src = "https://top-fwz1.mail.ru/js/code.js";
        var f = function () {
            var s = d.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(ts, s);
        };
        if (w.opera == "[object Opera]") {
            d.addEventListener("DOMContentLoaded", f, false);
        } else {
            f();
        }
    })(document, window, "tmr-code");
}

export const vkAdsReachGoal = (price, id, purchase = false) => {
    if (process.client) {
        let _tmr = window._tmr || (window._tmr = []);
        _tmr.push({
            type: 'reachGoal',
            id: 3381119,
            value: price,
            goal: purchase ? 'purchase' : 'viewProduct',
            params: {
                product_id: id
            }
        });
    }
}
export const yandexCommercialNew = ({id, mark, folder, price, modification}, thanks = false) => {
    if (process.client) {
        const product = {
            id: id,
            name: `${mark} ${folder}, ${modification} ${price} - ${id}`,
            price: price,
            brand: mark,
            category: `/Новые/${mark}/${folder}/${mark} ${folder}, ${modification}`,
            quantity: 1,
        }
        let ecommerce
        if (thanks) {
            ecommerce = {
                purchase: {
                    actionField: {
                        id: id,
                        goal_id: e_comm
                    },
                    products: [
                        product
                    ],
                }
            }
        } else {
            ecommerce = {
                detail: {
                    products: [
                        product
                    ],
                },
            }
        }
        dataLayer.push({
            ecommerce
        });
    }
}
export const yandexCommercialUsed = ({id, mark, folder, price, gearbox, year}, thanks = false) => {
    if (process.client) {
        const product = {
            id: id,
            name: `${mark} ${folder}, ${year} года, ${gearbox} ${price} руб. - ${id}`,
            price: price,
            brand: mark,
            category: `/С пробегом/${mark}/${folder}/${mark} ${folder}, ${year} г.`,
            quantity: 1,
        }
        let ecommerce
        if (thanks) {
            ecommerce = {
                purchase: {
                    actionField: {
                        id: id,
                        goal_id: e_comm
                    },
                    products: [
                        product
                    ],
                }
            }
        } else {
            ecommerce = {
                detail: {
                    products: [
                        product
                    ],
                },
            }
        }
        dataLayer.push({
            ecommerce
        });
    }
}