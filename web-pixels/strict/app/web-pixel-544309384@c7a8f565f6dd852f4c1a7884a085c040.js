(() => {
    var P = Object.create;
    var y = Object.defineProperty;
    var w = Object.getOwnPropertyDescriptor;
    var N = Object.getOwnPropertyNames;
    var O = Object.getPrototypeOf,
        b = Object.prototype.hasOwnProperty;
    var d = (e, t) => () => (e && (t = e(e = 0)), t);
    var v = (e, t) => () => (t || e((t = {
        exports: {}
    }).exports, t), t.exports);
    var S = (e, t, a, c) => {
        if (t && typeof t == "object" || typeof t == "function")
            for (let i of N(t)) !b.call(e, i) && i !== a && y(e, i, {
                get: () => t[i],
                enumerable: !(c = w(t, i)) || c.enumerable
            });
        return e
    };
    var k = (e, t, a) => (a = e != null ? P(O(e)) : {}, S(t || !e || !e.__esModule ? y(a, "default", {
        value: e,
        enumerable: !0
    }) : a, e));
    var m = (e, t, a) => new Promise((c, i) => {
        var p = o => {
                try {
                    s(a.next(o))
                } catch (n) {
                    i(n)
                }
            },
            l = o => {
                try {
                    s(a.throw(o))
                } catch (n) {
                    i(n)
                }
            },
            s = o => o.done ? c(o.value) : Promise.resolve(o.value).then(p, l);
        s((a = a.apply(e, t)).next())
    });
    var E, g = d(() => {
        E = "WebPixel::Render"
    });
    var f, u = d(() => {
        g();
        f = e => shopify.extend(E, e)
    });
    var D = d(() => {
        u()
    });
    var T = d(() => {
        D()
    });
    var h = v(x => {
        T();
        f(c => m(x, [c], function*({
            settings: e,
            analytics: t,
            browser: a
        }) {
            let {
                spcid: i,
                pixelEndpoint: p
            } = yield s();
            t.subscribe("all_events", o => m(x, null, function*() {
                if (o.name === "page_viewed") {
                    let r = new URLSearchParams(o.context.document.location.search).get("spcid");
                    r && (i = r, a.cookie.set(`spcid=${i}; expires=${l(7)}`), {
                        spcid: i,
                        pixelEndpoint: p
                    } = yield s(i))
                }
                i && (yield fetch(p, {
                    method: "POST",
                    body: JSON.stringify(o),
                    keepalive: !0,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }))
            }));

            function l(o) {
                let n = new Date,
                    r = new Date(n);
                return r.setDate(n.getDate() + o), r
            }

            function s(o = null) {
                return m(this, null, function*() {
                    let n = o != null ? o : yield a.cookie.get("spcid"), r = `https://api.spurnow.com/pixel?id=${e.accountID}&spcid=${n}`;
                    return {
                        spcid: n,
                        pixelEndpoint: r
                    }
                })
            }
        }))
    });
    var L = k(h());
})();