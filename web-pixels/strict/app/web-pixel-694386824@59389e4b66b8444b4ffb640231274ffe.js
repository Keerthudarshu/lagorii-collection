(() => {
    var F = Object.create;
    var T = Object.defineProperty;
    var K = Object.getOwnPropertyDescriptor;
    var L = Object.getOwnPropertyNames;
    var Q = Object.getPrototypeOf,
        X = Object.prototype.hasOwnProperty;
    var C = (o, i) => () => (o && (i = o(o = 0)), i);
    var G = (o, i) => () => (i || o((i = {
        exports: {}
    }).exports, i), i.exports);
    var W = (o, i, l, w) => {
        if (i && typeof i == "object" || typeof i == "function")
            for (let f of L(i)) !X.call(o, f) && f !== l && T(o, f, {
                get: () => i[f],
                enumerable: !(w = K(i, f)) || w.enumerable
            });
        return o
    };
    var Z = (o, i, l) => (l = o != null ? F(Q(o)) : {}, W(i || !o || !o.__esModule ? T(l, "default", {
        value: o,
        enumerable: !0
    }) : l, o));
    var p = (o, i, l) => new Promise((w, f) => {
        var d = n => {
                try {
                    m(l.next(n))
                } catch (h) {
                    f(h)
                }
            },
            s = n => {
                try {
                    m(l.throw(n))
                } catch (h) {
                    f(h)
                }
            },
            m = n => n.done ? w(n.value) : Promise.resolve(n.value).then(d, s);
        m((l = l.apply(o, i)).next())
    });
    var N, U = C(() => {
        N = "WebPixel::Render"
    });
    var S, E = C(() => {
        U();
        S = o => shopify.extend(N, o)
    });
    var R = C(() => {
        E()
    });
    var j = C(() => {
        R()
    });
    var A = G(y => {
        j();
        S(w => p(y, [w], function*({
            analytics: o,
            browser: i,
            settings: l
        }) {
            let f = "https://affiliatery-app-api.staqlab.com/affiliatery/api";
            o.subscribe("all_events", d => p(y, null, function*() {
                let s = {},
                    m = 604800,
                    n = d.context && d.context.window || {};
                if (!n.location) return;
                let h = e => {
                        try {
                            return e()
                        } catch (a) {
                            return
                        }
                    },
                    J = e => p(y, null, function*() {
                        try {
                            return (yield(yield fetch(`${f}/discount-code?clientId=${s.clientId}&refCode=${e}`)).json()).discountCode
                        } catch (a) {
                            console.log(a)
                        }
                    }),
                    q = e => {
                        let a = Object.fromEntries(new URLSearchParams(n.location.search));
                        if (!a.ref_cca) {
                            if (!a.ref) {
                                if (!s.checkDiscountCookie) return;
                                let t = "affiliatery_dis_tried";
                                if (u(t) || (i.cookie.set(`${t}=true;max-age=31104000;path=/`), u("discount_code") === e)) return
                            }
                            a.ref && (a.ref_cca = a.ref), delete a.ref;
                            try {
                                let t = new URLSearchParams(a).toString(),
                                    c = `https://${n.location.hostname}/discount/${e}?redirect=${n.location.pathname}${t?`?${t}`:""}`;
                                ["84DKG3BZM7DB2Q4TE73IQPJJ"].some(g => s.clientId === g) || (c = encodeURI(c)), i.cookie.set(`affiliatery-redirect=${c};max-age=31104000;path=/`)
                            } catch (t) {
                                console.error("Error", t)
                            }
                        }
                    },
                    _ = e => e.location.href.includes("checkout") || e.location.href.includes("thank_you") || e.location.href.includes("orders"),
                    M = () => p(y, null, function*() {
                        try {
                            let e = yield v();
                            if (!e) return;
                            let a = "affiliatery-user-id",
                                t = yield u(a), c = {
                                    userUniqueId: t,
                                    refCode: e,
                                    clientId: l.accountID
                                };
                            t = (yield(yield fetch(`${f}/aevt`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                credentials: "include",
                                body: JSON.stringify(c)
                            })).json()).userUniqueId, yield i.cookie.set(`${a}=${t};max-age=31104000;path=/`)
                        } catch (e) {
                            console.log(e)
                        }
                    }),
                    V = e => p(y, null, function*() {
                        if (!_ && e && s && !e.includes("converted-ignore")) {
                            if (!u("aff-ord-gen")) return;
                            yield i.cookie.set("aff-ord-gen=cnv;max-age=86400;path=/");
                            let a = 180 * 24 * 60 * 60,
                                t = parseInt(new Date().valueOf() / 1e3) + a;
                            x(e + "-converted-ignore", t);
                            let c = `affiliatery-partner-code=${e}-converted-ignore;max-age=${a};path=/`;
                            yield i.localStorage.setItem("affiliatery-partner-code", c + `;created-at=${new Date().valueOf()}`)
                        }
                    }),
                    b = e => {
                        e = e || n.location.search.slice(1);
                        let a = e.split("&"),
                            t = {};
                        return a.forEach(function(c) {
                            let g = c.split("="),
                                I = g[0],
                                P = decodeURIComponent(g[1] || "");
                            t[I] ? Object.prototype.toString.call(t[I]) === "[object Array]" ? t[I].push(P) : t[I] = [t[I], P] : t[I] = P
                        }), JSON.parse(JSON.stringify(t))
                    },
                    D = () => p(y, null, function*() {
                        return yield(yield fetch(`${f}/js/settings?s=${l.accountID}`)).json()
                    }),
                    x = (e, a) => {
                        let t = a - parseInt(new Date().valueOf() / 1e3);
                        if (t < 0) {
                            console.log(`refCodeMaxAge ${t} not valid`);
                            return
                        }
                        let c = `affiliatery-partner-code=${e};max-age=${t};path=/`;
                        i.cookie.set(c);
                        let g = `affiliatery-ref-age=${a};max-age=${t};path=/`;
                        i.cookie.set(g)
                    },
                    u = e => p(y, null, function*() {
                        return yield i.cookie.get(e)
                    }),
                    v = () => p(y, null, function*() {
                        let e = yield u("affiliatery-partner-code");
                        if (e) {
                            let a = yield u("affiliatery-ref-age");
                            a && Number(a) && x(e, a)
                        }
                        if (!e) try {
                            let a = yield i.localStorage.getItem("affiliatery-partner-code");
                            if (a && a !== "null" && a !== "undefined") {
                                let t = a.split(";").find(c => c.includes("created-at"));
                                if (t) {
                                    t = Number(t.split("created-at=")[1].trim());
                                    let c = Number(a.split(";").find(g => g.includes("max-age")).split("max-age=")[1].trim());
                                    t + c * 1e3 > new Date().valueOf() && (e = a.split("=")[1].split(";")[0])
                                }
                            } else {
                                let t = yield u("_shopify_sa_p");
                                t && (t = decodeURIComponent(t), t = t.replace("ref=", ""), e = t)
                            }
                        } catch (a) {
                            console.log(a)
                        }
                        return e
                    }),
                    k = b(n.location.search.slice(1)),
                    r = k.ref || k.ref_cca,
                    $ = [60459843651].some(e => l.accountId + "" == e + "");
                if ($ = $ || !!(yield u("discount_code")), $ && (s = yield D(), !r && n.affiliateryPixelConfig.refParam && n.affiliateryPixelConfig.refParam !== "" && (r = k[n.affiliateryPixelConfig.refParam])), r && ["gclid", "utm_source", "fbclid", "utm_campaign", "shpxid"].some(e => r.includes(e)) && (r = null), r) {
                    r = decodeURIComponent(r);
                    let e = parseInt(m),
                        a = parseInt(new Date().valueOf() / 1e3) + e;
                    x(r, a);
                    try {
                        let t = `affiliatery-partner-code=${r};max-age=${m};path=/`;
                        yield i.localStorage.setItem("affiliatery-partner-code", t + `;created-at=${new Date().valueOf()}`)
                    } catch (t) {
                        console.log(t)
                    }
                    s = yield D(), e = parseInt(s.RefCodeMaxAge), a = parseInt(new Date().valueOf() / 1e3) + e, x(r, a)
                } else {
                    r = yield v();
                    let e = yield u("discount_code")
                }
                if (r && s.autoApplyDiscount) {
                    let e = yield J(r);
                    e && q(e)
                }
                if (r || (r = yield i.cookie.get("affiliatery-partner-code")), r && ["gclid", "utm_source", "fbclid", "utm_campaign", "shpxid"].some(e => r.includes(e)) && (r = null), !r) return;
                let B = yield i.cookie.get("affiliatery-user-id"), O = {
                    partnerRefCode: r,
                    clientId: l.accountID,
                    userUniqueId: B,
                    event: d,
                    checkoutToken: h(() => d.data.checkout.token),
                    orderId: h(() => d.data.checkout.order.id)
                };
                _(d.context.window) && (O.orderStatusUrl = d.context.window.location.href, r && O.orderId && (yield i.cookie.set("aff-ord-gen=cnv;max-age=31104000;path=/"))), yield fetch(`${f}/p-cart-mapping`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(O),
                    keepalive: !0
                }), yield M(), yield V(r)
            }))
        }))
    });
    var ce = Z(A());
})();