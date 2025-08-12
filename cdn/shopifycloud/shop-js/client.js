! function() {
    "use strict";
    const e = (e, t) => {};

    function t(e, t) {
        var n;
        if (!window.customElements) return;
        customElements.get(e) || (null === (n = Reflect.defineProperty) || void 0 === n || n.call(Reflect, t, "componentVersion", {
            value: "vanilla"
        }), customElements.define(e, t))
    }

    function n(e) {
        var t, n;
        return Boolean(null === (n = null === (t = window.Shopify) || void 0 === t ? void 0 : t.SignInWithShop) || void 0 === n ? void 0 : n[`${e}Called`])
    }

    function i(e) {
        window.Shopify || (window.Shopify = {}), window.Shopify.SignInWithShop || (window.Shopify.SignInWithShop = {}), window.Shopify.SignInWithShop[`${e}Called`] = !0
    }

    function a(e, t, n, i) {
        return new(n || (n = Promise))((function(a, o) {
            function s(e) {
                try {
                    l(i.next(e))
                } catch (e) {
                    o(e)
                }
            }

            function r(e) {
                try {
                    l(i.throw(e))
                } catch (e) {
                    o(e)
                }
            }

            function l(e) {
                var t;
                e.done ? a(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
                    e(t)
                }))).then(s, r)
            }
            l((i = i.apply(e, t || [])).next())
        }))
    }

    function o(e, t, n, i) {
        if ("a" === n && !i) throw new TypeError("Private accessor was defined without a getter");
        if ("function" == typeof t ? e !== t || !i : !t.has(e)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return "m" === n ? i : "a" === n ? i.call(e) : i ? i.value : t.get(e)
    }

    function s(e, t, n, i, a) {
        if ("m" === i) throw new TypeError("Private method is not writable");
        if ("a" === i && !a) throw new TypeError("Private accessor was defined without a setter");
        if ("function" == typeof t ? e !== t || !a : !t.has(e)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return "a" === i ? a.call(e, n) : a ? a.value = n : t.set(e, n), n
    }
    "function" == typeof SuppressedError && SuppressedError;
    class r {
        constructor(e) {
            this.emailInput = e, this.passwordInput = this.findPasswordInput()
        }
        start() {
            var e;
            this.emailInput.addEventListener("input", this.trackEmailChange.bind(this)), null === (e = this.passwordInput) || void 0 === e || e.addEventListener("input", this.trackPasswordChange.bind(this))
        }
        stop() {
            var e;
            this.emailInput.removeEventListener("input", this.trackEmailChange), null === (e = this.passwordInput) || void 0 === e || e.removeEventListener("input", this.trackPasswordChange)
        }
        isFilledWithPasswordManager() {
            if (void 0 !== this.emailLastUpdated && void 0 !== this.passwordLastUpdated) {
                return Math.abs(this.emailLastUpdated - this.passwordLastUpdated) < 100
            }
        }
        trackEmailChange(e) {
            this.emailLastUpdated = e.timeStamp
        }
        trackPasswordChange(e) {
            this.passwordLastUpdated = e.timeStamp
        }
        findPasswordInput() {
            var e;
            return null === (e = this.emailInput.form) || void 0 === e ? void 0 : e.querySelector('input[type="password"]')
        }
    }

    function l(e) {
        const t = e ? "sessionStorage" : "localStorage";
        try {
            const e = window[t],
                n = "__storage_test__";
            return e.setItem(n, n), e.removeItem(n), !0
        } catch (e) {
            return !1
        }
    }
    const c = {
        following: "shop_followed",
        modalDismissed: "sign_in_with_shop_modal_dismissed"
    };
    class p {
        constructor(e, t) {
            this.key = e, this.defaultValue = t, this.namespacedKey = `signInWithShop:${e}`, this.currentValue = this.initAndBackfillCurrentValue()
        }
        get value() {
            return this.currentValue
        }
        set(e) {
            this.currentValue = e,
                function(e, t, {
                    session: n
                } = {}) {
                    !!l(n) && window[n ? "sessionStorage" : "localStorage"].setItem(e, t)
                }(this.namespacedKey, JSON.stringify(this.currentValue))
        }
        initAndBackfillCurrentValue() {
            const e = function(e, {
                session: t
            } = {}) {
                return l(t) ? window[t ? "sessionStorage" : "localStorage"].getItem(e) : null
            }(this.namespacedKey);
            if (!e) {
                const e = function(e) {
                    try {
                        const t = new RegExp(`(${e})=([^;]+)`).exec(document.cookie);
                        return t ? t[2] : null
                    } catch (e) {
                        return null
                    }
                }(c[this.key]);
                if ("string" == typeof e) {
                    const t = "true" === e;
                    return this.set(t), t
                }
                return this.defaultValue
            }
            try {
                return JSON.parse(e)
            } catch (e) {
                return this.defaultValue
            }
        }
    }
    var d, u;
    class m {
        constructor(e, t) {
            d.set(this, void 0), u.set(this, void 0), e && (s(this, d, e, "f"), s(this, u, (e => {
                t(e.target.value)
            }), "f"), o(this, d, "f").addEventListener("input", o(this, u, "f")))
        }
        destroy() {
            o(this, d, "f") && o(this, u, "f") && o(this, d, "f").removeEventListener("input", o(this, u, "f"))
        }
    }
    d = new WeakMap, u = new WeakMap;
    const h = "1.0.32",
        _ = "form[data-login-with-shop-sign-in]",
        g = "form[data-login-with-shop-sign-up]",
        f = 'input[name="customer[email]"',
        b = 'input[name="customer[first_name]"',
        y = 'input[name="customer[last_name]"',
        v = `${_} input[type="email"],${_} ${f}`,
        k = `${g} input[type="email"],${g} ${f}`,
        w = "2147483647";

    function P(e = window.location.origin, t) {
        const n = `${e}/services/login_with_shop/finalize`;
        return fetch(n).catch(t)
    }
    const S = [];
    for (let e = 0; e < 256; ++e) S.push((e + 256).toString(16).slice(1));
    let z;
    const j = new Uint8Array(16);
    var C = {
        randomUUID: "undefined" != typeof crypto && crypto.randomUUID && crypto.randomUUID.bind(crypto)
    };

    function x(e, t, n) {
        if (C.randomUUID && !t && !e) return C.randomUUID();
        const i = (e = e || {}).random ? ? e.rng ? .() ? ? function() {
            if (!z) {
                if ("undefined" == typeof crypto || !crypto.getRandomValues) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
                z = crypto.getRandomValues.bind(crypto)
            }
            return z(j)
        }();
        if (i.length < 16) throw new Error("Random bytes length must be >= 16");
        return i[6] = 15 & i[6] | 64, i[8] = 63 & i[8] | 128,
            function(e, t = 0) {
                return (S[e[t + 0]] + S[e[t + 1]] + S[e[t + 2]] + S[e[t + 3]] + "-" + S[e[t + 4]] + S[e[t + 5]] + "-" + S[e[t + 6]] + S[e[t + 7]] + "-" + S[e[t + 8]] + S[e[t + 9]] + "-" + S[e[t + 10]] + S[e[t + 11]] + S[e[t + 12]] + S[e[t + 13]] + S[e[t + 14]] + S[e[t + 15]]).toLowerCase()
            }(i)
    }
    const L = () => ({
        width: window.innerWidth || document.documentElement.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight
    });

    function A({
        url: e,
        width: t,
        height: n,
        windowName: i,
        onClose: a
    }) {
        const o = {
                left: void 0 === window.screenLeft ? window.screenX : window.screenLeft,
                top: void 0 === window.screenTop ? window.screenY : window.screenTop
            },
            s = L(),
            r = s.width || screen.width,
            l = s.height || screen.height,
            c = screen.width && window.screen.availWidth ? screen.width / window.screen.availWidth : 1,
            p = (r - t) / 2 / c + o.left,
            d = (l - n) / 2 / c + o.top,
            u = window.open(e, i, `scrollbars=yes,width=${t},height=${n},top=${d},left=${p}`);
        if (!u) return null;
        if (u.focus(), a) {
            const e = setInterval((() => {
                u.closed && (a(), clearInterval(e))
            }), 1e3)
        }
        return u
    }

    function T(e, t, n, i) {
        (i || e.getAttribute(t) !== n) && !0 !== e[t] && e.setAttribute(t, n)
    }

    function E(e, t, n) {
        const i = n.includes(t);
        e && !i ? n.push(t) : !e && i && n.splice(n.indexOf(t), 1)
    }

    function I() {
        return x()
    }

    function M() {
        return a(this, arguments, void 0, (function*(e = location.origin) {
            const t = fetch(`${e}/meta.json`);
            try {
                const e = yield t;
                return yield e.json()
            } catch (e) {
                return null
            }
        }))
    }

    function O(e) {
        try {
            return new URL(e).hostname
        } catch (t) {
            return console.error(`[Shop Pay] Store URL (${e}) is not valid`, t), null
        }
    }

    function N(e, t) {
        let n;
        return (...i) => {
            clearTimeout(n), n = setTimeout((() => {
                e(...i)
            }), t)
        }
    }

    function q() {
        if (! function() {
                const e = window.navigator.userAgent,
                    t = Boolean(e.match(/iPad/i)) || Boolean(e.match(/iPhone/i)),
                    n = Boolean(e.match(/WebKit/i));
                return t && n && !e.match(/CriOS/i)
            }()) return;
        const e = "shop-pay-safari-unzoom",
            t = document.getElementById(e);
        if (t) return t.focus();
        const n = document.createElement("input");
        n.id = e, n.style.fontSize = "16px", n.style.width = "1px", n.style.height = "1px", n.style.position = "fixed", n.style.bottom = "-1000px", n.style.right = "-1000px", n.style.transform = "translate(1000px, 1000px)", n.setAttribute("aria-hidden", "true"), document.body.appendChild(n), n.focus({
            preventScroll: !0
        })
    }

    function R(e) {
        return null === e || "" === e.trim()
    }

    function D() {
        var e;
        const t = null === (e = document.querySelector("script#shop-js-features")) || void 0 === e ? void 0 : e.innerHTML;
        return t ? JSON.parse(t) : {}
    }

    function B() {
        var e;
        const t = null === (e = document.querySelector("script#shop-js-analytics")) || void 0 === e ? void 0 : e.innerHTML;
        return t ? JSON.parse(t) : {}
    }
    const F = /^[^@]+@[^@]+\.[^@]{2,}$/i;

    function V(e) {
        return !!e && RegExp(F).test(e)
    }

    function $({
        selector: e,
        onElementFound: t
    }) {
        const n = new WeakSet,
            i = new MutationObserver((e => {
                let t = !1;
                for (const n of e)
                    if (n.addedNodes.length > 0) {
                        t = !0;
                        break
                    }
                t && o()
            }));

        function o() {
            document.querySelectorAll(e).forEach((e => {
                n.has(e) || (t(e), n.add(e))
            }))
        }
        return function() {
            a(this, void 0, void 0, (function*() {
                yield function() {
                    if (document.body) return Promise.resolve();
                    return new Promise((e => {
                        window.addEventListener("DOMContentLoaded", (() => e()))
                    }))
                }(), o(), i.observe(document.body || document.documentElement, {
                    childList: !0,
                    subtree: !0
                })
            }))
        }(), i
    }

    function W({
        onVisible: e,
        onFallback: t
    }) {
        const n = new IntersectionObserver((a => {
            for (const o of a) {
                const {
                    target: a,
                    isIntersecting: s
                } = o;
                s && (i(a) ? e(a) : t(a), n.unobserve(a))
            }
        }), {
            threshold: 1
        });

        function i(e) {
            let t = e;
            for (; t;) {
                if (!["", "1"].includes(getComputedStyle(t).opacity)) return !1;
                t = t.parentElement
            }
            return !0
        }
        return n
    }

    function U(e, t = !0) {
        return Boolean(e)
    }

    function H(e, t, n) {
        const i = n.querySelector(`#${t}`),
            a = null == i ? void 0 : i.parentElement,
            o = null != a ? a : document.createElement("div");
        o.innerHTML = e, o.style.display = "none", "innerHTML" in n && (n.innerHTML = ""), n.prepend(o);
        const s = n.querySelector(`#${t}`).content;
        n.appendChild(s.cloneNode(!0))
    }
    const K = Math.min,
        Z = Math.max,
        G = Math.round,
        J = Math.floor,
        Y = e => ({
            x: e,
            y: e
        }),
        Q = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        },
        X = {
            start: "end",
            end: "start"
        };

    function ee(e, t, n) {
        return Z(e, K(t, n))
    }

    function te(e, t) {
        return "function" == typeof e ? e(t) : e
    }

    function ne(e) {
        return e.split("-")[0]
    }

    function ie(e) {
        return e.split("-")[1]
    }

    function ae(e) {
        return "x" === e ? "y" : "x"
    }

    function oe(e) {
        return "y" === e ? "height" : "width"
    }

    function se(e) {
        return ["top", "bottom"].includes(ne(e)) ? "y" : "x"
    }

    function re(e) {
        return ae(se(e))
    }

    function le(e) {
        return e.replace(/start|end/g, (e => X[e]))
    }

    function ce(e) {
        return e.replace(/left|right|bottom|top/g, (e => Q[e]))
    }

    function pe(e) {
        return "number" != typeof e ? function(e) {
            return {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                ...e
            }
        }(e) : {
            top: e,
            right: e,
            bottom: e,
            left: e
        }
    }

    function de(e) {
        const {
            x: t,
            y: n,
            width: i,
            height: a
        } = e;
        return {
            width: i,
            height: a,
            top: n,
            left: t,
            right: t + i,
            bottom: n + a,
            x: t,
            y: n
        }
    }

    function ue(e, t, n) {
        let {
            reference: i,
            floating: a
        } = e;
        const o = se(t),
            s = re(t),
            r = oe(s),
            l = ne(t),
            c = "y" === o,
            p = i.x + i.width / 2 - a.width / 2,
            d = i.y + i.height / 2 - a.height / 2,
            u = i[r] / 2 - a[r] / 2;
        let m;
        switch (l) {
            case "top":
                m = {
                    x: p,
                    y: i.y - a.height
                };
                break;
            case "bottom":
                m = {
                    x: p,
                    y: i.y + i.height
                };
                break;
            case "right":
                m = {
                    x: i.x + i.width,
                    y: d
                };
                break;
            case "left":
                m = {
                    x: i.x - a.width,
                    y: d
                };
                break;
            default:
                m = {
                    x: i.x,
                    y: i.y
                }
        }
        switch (ie(t)) {
            case "start":
                m[s] -= u * (n && c ? -1 : 1);
                break;
            case "end":
                m[s] += u * (n && c ? -1 : 1)
        }
        return m
    }
    async function me(e, t) {
        var n;
        void 0 === t && (t = {});
        const {
            x: i,
            y: a,
            platform: o,
            rects: s,
            elements: r,
            strategy: l
        } = e, {
            boundary: c = "clippingAncestors",
            rootBoundary: p = "viewport",
            elementContext: d = "floating",
            altBoundary: u = !1,
            padding: m = 0
        } = te(t, e), h = pe(m), _ = r[u ? "floating" === d ? "reference" : "floating" : d], g = de(await o.getClippingRect({
            element: null == (n = await (null == o.isElement ? void 0 : o.isElement(_))) || n ? _ : _.contextElement || await (null == o.getDocumentElement ? void 0 : o.getDocumentElement(r.floating)),
            boundary: c,
            rootBoundary: p,
            strategy: l
        })), f = "floating" === d ? {
            x: i,
            y: a,
            width: s.floating.width,
            height: s.floating.height
        } : s.reference, b = await (null == o.getOffsetParent ? void 0 : o.getOffsetParent(r.floating)), y = await (null == o.isElement ? void 0 : o.isElement(b)) && await (null == o.getScale ? void 0 : o.getScale(b)) || {
            x: 1,
            y: 1
        }, v = de(o.convertOffsetParentRelativeRectToViewportRelativeRect ? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: r,
            rect: f,
            offsetParent: b,
            strategy: l
        }) : f);
        return {
            top: (g.top - v.top + h.top) / y.y,
            bottom: (v.bottom - g.bottom + h.bottom) / y.y,
            left: (g.left - v.left + h.left) / y.x,
            right: (v.right - g.right + h.right) / y.x
        }
    }

    function he() {
        return "undefined" != typeof window
    }

    function _e(e) {
        return be(e) ? (e.nodeName || "").toLowerCase() : "#document"
    }

    function ge(e) {
        var t;
        return (null == e || null == (t = e.ownerDocument) ? void 0 : t.defaultView) || window
    }

    function fe(e) {
        var t;
        return null == (t = (be(e) ? e.ownerDocument : e.document) || window.document) ? void 0 : t.documentElement
    }

    function be(e) {
        return !!he() && (e instanceof Node || e instanceof ge(e).Node)
    }

    function ye(e) {
        return !!he() && (e instanceof Element || e instanceof ge(e).Element)
    }

    function ve(e) {
        return !!he() && (e instanceof HTMLElement || e instanceof ge(e).HTMLElement)
    }

    function ke(e) {
        return !(!he() || "undefined" == typeof ShadowRoot) && (e instanceof ShadowRoot || e instanceof ge(e).ShadowRoot)
    }

    function we(e) {
        const {
            overflow: t,
            overflowX: n,
            overflowY: i,
            display: a
        } = xe(e);
        return /auto|scroll|overlay|hidden|clip/.test(t + i + n) && !["inline", "contents"].includes(a)
    }

    function Pe(e) {
        return ["table", "td", "th"].includes(_e(e))
    }

    function Se(e) {
        return [":popover-open", ":modal"].some((t => {
            try {
                return e.matches(t)
            } catch (e) {
                return !1
            }
        }))
    }

    function ze(e) {
        const t = je(),
            n = ye(e) ? xe(e) : e;
        return ["transform", "translate", "scale", "rotate", "perspective"].some((e => !!n[e] && "none" !== n[e])) || !!n.containerType && "normal" !== n.containerType || !t && !!n.backdropFilter && "none" !== n.backdropFilter || !t && !!n.filter && "none" !== n.filter || ["transform", "translate", "scale", "rotate", "perspective", "filter"].some((e => (n.willChange || "").includes(e))) || ["paint", "layout", "strict", "content"].some((e => (n.contain || "").includes(e)))
    }

    function je() {
        return !("undefined" == typeof CSS || !CSS.supports) && CSS.supports("-webkit-backdrop-filter", "none")
    }

    function Ce(e) {
        return ["html", "body", "#document"].includes(_e(e))
    }

    function xe(e) {
        return ge(e).getComputedStyle(e)
    }

    function Le(e) {
        return ye(e) ? {
            scrollLeft: e.scrollLeft,
            scrollTop: e.scrollTop
        } : {
            scrollLeft: e.scrollX,
            scrollTop: e.scrollY
        }
    }

    function Ae(e) {
        if ("html" === _e(e)) return e;
        const t = e.assignedSlot || e.parentNode || ke(e) && e.host || fe(e);
        return ke(t) ? t.host : t
    }

    function Te(e) {
        const t = Ae(e);
        return Ce(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : ve(t) && we(t) ? t : Te(t)
    }

    function Ee(e, t, n) {
        var i;
        void 0 === t && (t = []), void 0 === n && (n = !0);
        const a = Te(e),
            o = a === (null == (i = e.ownerDocument) ? void 0 : i.body),
            s = ge(a);
        if (o) {
            const e = Ie(s);
            return t.concat(s, s.visualViewport || [], we(a) ? a : [], e && n ? Ee(e) : [])
        }
        return t.concat(a, Ee(a, [], n))
    }

    function Ie(e) {
        return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null
    }

    function Me(e) {
        const t = xe(e);
        let n = parseFloat(t.width) || 0,
            i = parseFloat(t.height) || 0;
        const a = ve(e),
            o = a ? e.offsetWidth : n,
            s = a ? e.offsetHeight : i,
            r = G(n) !== o || G(i) !== s;
        return r && (n = o, i = s), {
            width: n,
            height: i,
            $: r
        }
    }

    function Oe(e) {
        return ye(e) ? e : e.contextElement
    }

    function Ne(e) {
        const t = Oe(e);
        if (!ve(t)) return Y(1);
        const n = t.getBoundingClientRect(),
            {
                width: i,
                height: a,
                $: o
            } = Me(t);
        let s = (o ? G(n.width) : n.width) / i,
            r = (o ? G(n.height) : n.height) / a;
        return s && Number.isFinite(s) || (s = 1), r && Number.isFinite(r) || (r = 1), {
            x: s,
            y: r
        }
    }
    const qe = Y(0);

    function Re(e) {
        const t = ge(e);
        return je() && t.visualViewport ? {
            x: t.visualViewport.offsetLeft,
            y: t.visualViewport.offsetTop
        } : qe
    }

    function De(e, t, n, i) {
        void 0 === t && (t = !1), void 0 === n && (n = !1);
        const a = e.getBoundingClientRect(),
            o = Oe(e);
        let s = Y(1);
        t && (i ? ye(i) && (s = Ne(i)) : s = Ne(e));
        const r = function(e, t, n) {
            return void 0 === t && (t = !1), !(!n || t && n !== ge(e)) && t
        }(o, n, i) ? Re(o) : Y(0);
        let l = (a.left + r.x) / s.x,
            c = (a.top + r.y) / s.y,
            p = a.width / s.x,
            d = a.height / s.y;
        if (o) {
            const e = ge(o),
                t = i && ye(i) ? ge(i) : i;
            let n = e,
                a = Ie(n);
            for (; a && i && t !== n;) {
                const e = Ne(a),
                    t = a.getBoundingClientRect(),
                    i = xe(a),
                    o = t.left + (a.clientLeft + parseFloat(i.paddingLeft)) * e.x,
                    s = t.top + (a.clientTop + parseFloat(i.paddingTop)) * e.y;
                l *= e.x, c *= e.y, p *= e.x, d *= e.y, l += o, c += s, n = ge(a), a = Ie(n)
            }
        }
        return de({
            width: p,
            height: d,
            x: l,
            y: c
        })
    }

    function Be(e, t) {
        const n = Le(e).scrollLeft;
        return t ? t.left + n : De(fe(e)).left + n
    }

    function Fe(e, t, n) {
        void 0 === n && (n = !1);
        const i = e.getBoundingClientRect();
        return {
            x: i.left + t.scrollLeft - (n ? 0 : Be(e, i)),
            y: i.top + t.scrollTop
        }
    }

    function Ve(e, t, n) {
        let i;
        if ("viewport" === t) i = function(e, t) {
            const n = ge(e),
                i = fe(e),
                a = n.visualViewport;
            let o = i.clientWidth,
                s = i.clientHeight,
                r = 0,
                l = 0;
            if (a) {
                o = a.width, s = a.height;
                const e = je();
                (!e || e && "fixed" === t) && (r = a.offsetLeft, l = a.offsetTop)
            }
            return {
                width: o,
                height: s,
                x: r,
                y: l
            }
        }(e, n);
        else if ("document" === t) i = function(e) {
            const t = fe(e),
                n = Le(e),
                i = e.ownerDocument.body,
                a = Z(t.scrollWidth, t.clientWidth, i.scrollWidth, i.clientWidth),
                o = Z(t.scrollHeight, t.clientHeight, i.scrollHeight, i.clientHeight);
            let s = -n.scrollLeft + Be(e);
            const r = -n.scrollTop;
            return "rtl" === xe(i).direction && (s += Z(t.clientWidth, i.clientWidth) - a), {
                width: a,
                height: o,
                x: s,
                y: r
            }
        }(fe(e));
        else if (ye(t)) i = function(e, t) {
            const n = De(e, !0, "fixed" === t),
                i = n.top + e.clientTop,
                a = n.left + e.clientLeft,
                o = ve(e) ? Ne(e) : Y(1);
            return {
                width: e.clientWidth * o.x,
                height: e.clientHeight * o.y,
                x: a * o.x,
                y: i * o.y
            }
        }(t, n);
        else {
            const n = Re(e);
            i = {
                x: t.x - n.x,
                y: t.y - n.y,
                width: t.width,
                height: t.height
            }
        }
        return de(i)
    }

    function $e(e, t) {
        const n = Ae(e);
        return !(n === t || !ye(n) || Ce(n)) && ("fixed" === xe(n).position || $e(n, t))
    }

    function We(e, t, n) {
        const i = ve(t),
            a = fe(t),
            o = "fixed" === n,
            s = De(e, !0, o, t);
        let r = {
            scrollLeft: 0,
            scrollTop: 0
        };
        const l = Y(0);
        if (i || !i && !o)
            if (("body" !== _e(t) || we(a)) && (r = Le(t)), i) {
                const e = De(t, !0, o, t);
                l.x = e.x + t.clientLeft, l.y = e.y + t.clientTop
            } else a && (l.x = Be(a));
        const c = !a || i || o ? Y(0) : Fe(a, r);
        return {
            x: s.left + r.scrollLeft - l.x - c.x,
            y: s.top + r.scrollTop - l.y - c.y,
            width: s.width,
            height: s.height
        }
    }

    function Ue(e) {
        return "static" === xe(e).position
    }

    function He(e, t) {
        if (!ve(e) || "fixed" === xe(e).position) return null;
        if (t) return t(e);
        let n = e.offsetParent;
        return fe(e) === n && (n = n.ownerDocument.body), n
    }

    function Ke(e, t) {
        const n = ge(e);
        if (Se(e)) return n;
        if (!ve(e)) {
            let t = Ae(e);
            for (; t && !Ce(t);) {
                if (ye(t) && !Ue(t)) return t;
                t = Ae(t)
            }
            return n
        }
        let i = He(e, t);
        for (; i && Pe(i) && Ue(i);) i = He(i, t);
        return i && Ce(i) && Ue(i) && !ze(i) ? n : i || function(e) {
            let t = Ae(e);
            for (; ve(t) && !Ce(t);) {
                if (ze(t)) return t;
                if (Se(t)) return null;
                t = Ae(t)
            }
            return null
        }(e) || n
    }
    const Ze = {
        convertOffsetParentRelativeRectToViewportRelativeRect: function(e) {
            let {
                elements: t,
                rect: n,
                offsetParent: i,
                strategy: a
            } = e;
            const o = "fixed" === a,
                s = fe(i),
                r = !!t && Se(t.floating);
            if (i === s || r && o) return n;
            let l = {
                    scrollLeft: 0,
                    scrollTop: 0
                },
                c = Y(1);
            const p = Y(0),
                d = ve(i);
            if ((d || !d && !o) && (("body" !== _e(i) || we(s)) && (l = Le(i)), ve(i))) {
                const e = De(i);
                c = Ne(i), p.x = e.x + i.clientLeft, p.y = e.y + i.clientTop
            }
            const u = !s || d || o ? Y(0) : Fe(s, l, !0);
            return {
                width: n.width * c.x,
                height: n.height * c.y,
                x: n.x * c.x - l.scrollLeft * c.x + p.x + u.x,
                y: n.y * c.y - l.scrollTop * c.y + p.y + u.y
            }
        },
        getDocumentElement: fe,
        getClippingRect: function(e) {
            let {
                element: t,
                boundary: n,
                rootBoundary: i,
                strategy: a
            } = e;
            const o = "clippingAncestors" === n ? Se(t) ? [] : function(e, t) {
                    const n = t.get(e);
                    if (n) return n;
                    let i = Ee(e, [], !1).filter((e => ye(e) && "body" !== _e(e))),
                        a = null;
                    const o = "fixed" === xe(e).position;
                    let s = o ? Ae(e) : e;
                    for (; ye(s) && !Ce(s);) {
                        const t = xe(s),
                            n = ze(s);
                        n || "fixed" !== t.position || (a = null), (o ? !n && !a : !n && "static" === t.position && a && ["absolute", "fixed"].includes(a.position) || we(s) && !n && $e(e, s)) ? i = i.filter((e => e !== s)) : a = t, s = Ae(s)
                    }
                    return t.set(e, i), i
                }(t, this._c) : [].concat(n),
                s = [...o, i],
                r = s[0],
                l = s.reduce(((e, n) => {
                    const i = Ve(t, n, a);
                    return e.top = Z(i.top, e.top), e.right = K(i.right, e.right), e.bottom = K(i.bottom, e.bottom), e.left = Z(i.left, e.left), e
                }), Ve(t, r, a));
            return {
                width: l.right - l.left,
                height: l.bottom - l.top,
                x: l.left,
                y: l.top
            }
        },
        getOffsetParent: Ke,
        getElementRects: async function(e) {
            const t = this.getOffsetParent || Ke,
                n = this.getDimensions,
                i = await n(e.floating);
            return {
                reference: We(e.reference, await t(e.floating), e.strategy),
                floating: {
                    x: 0,
                    y: 0,
                    width: i.width,
                    height: i.height
                }
            }
        },
        getClientRects: function(e) {
            return Array.from(e.getClientRects())
        },
        getDimensions: function(e) {
            const {
                width: t,
                height: n
            } = Me(e);
            return {
                width: t,
                height: n
            }
        },
        getScale: Ne,
        isElement: ye,
        isRTL: function(e) {
            return "rtl" === xe(e).direction
        }
    };

    function Ge(e, t) {
        return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height
    }

    function Je(e, t, n, i) {
        void 0 === i && (i = {});
        const {
            ancestorScroll: a = !0,
            ancestorResize: o = !0,
            elementResize: s = "function" == typeof ResizeObserver,
            layoutShift: r = "function" == typeof IntersectionObserver,
            animationFrame: l = !1
        } = i, c = Oe(e), p = a || o ? [...c ? Ee(c) : [], ...Ee(t)] : [];
        p.forEach((e => {
            a && e.addEventListener("scroll", n, {
                passive: !0
            }), o && e.addEventListener("resize", n)
        }));
        const d = c && r ? function(e, t) {
            let n, i = null;
            const a = fe(e);

            function o() {
                var e;
                clearTimeout(n), null == (e = i) || e.disconnect(), i = null
            }
            return function s(r, l) {
                void 0 === r && (r = !1), void 0 === l && (l = 1), o();
                const c = e.getBoundingClientRect(),
                    {
                        left: p,
                        top: d,
                        width: u,
                        height: m
                    } = c;
                if (r || t(), !u || !m) return;
                const h = {
                    rootMargin: -J(d) + "px " + -J(a.clientWidth - (p + u)) + "px " + -J(a.clientHeight - (d + m)) + "px " + -J(p) + "px",
                    threshold: Z(0, K(1, l)) || 1
                };
                let _ = !0;

                function g(t) {
                    const i = t[0].intersectionRatio;
                    if (i !== l) {
                        if (!_) return s();
                        i ? s(!1, i) : n = setTimeout((() => {
                            s(!1, 1e-7)
                        }), 1e3)
                    }
                    1 !== i || Ge(c, e.getBoundingClientRect()) || s(), _ = !1
                }
                try {
                    i = new IntersectionObserver(g, { ...h,
                        root: a.ownerDocument
                    })
                } catch (e) {
                    i = new IntersectionObserver(g, h)
                }
                i.observe(e)
            }(!0), o
        }(c, n) : null;
        let u, m = -1,
            h = null;
        s && (h = new ResizeObserver((e => {
            let [i] = e;
            i && i.target === c && h && (h.unobserve(t), cancelAnimationFrame(m), m = requestAnimationFrame((() => {
                var e;
                null == (e = h) || e.observe(t)
            }))), n()
        })), c && !l && h.observe(c), h.observe(t));
        let _ = l ? De(e) : null;
        return l && function t() {
            const i = De(e);
            _ && !Ge(_, i) && n();
            _ = i, u = requestAnimationFrame(t)
        }(), n(), () => {
            var e;
            p.forEach((e => {
                a && e.removeEventListener("scroll", n), o && e.removeEventListener("resize", n)
            })), null == d || d(), null == (e = h) || e.disconnect(), h = null, l && cancelAnimationFrame(u)
        }
    }
    const Ye = function(e) {
            return void 0 === e && (e = 0), {
                name: "offset",
                options: e,
                async fn(t) {
                    var n, i;
                    const {
                        x: a,
                        y: o,
                        placement: s,
                        middlewareData: r
                    } = t, l = await async function(e, t) {
                        const {
                            placement: n,
                            platform: i,
                            elements: a
                        } = e, o = await (null == i.isRTL ? void 0 : i.isRTL(a.floating)), s = ne(n), r = ie(n), l = "y" === se(n), c = ["left", "top"].includes(s) ? -1 : 1, p = o && l ? -1 : 1, d = te(t, e);
                        let {
                            mainAxis: u,
                            crossAxis: m,
                            alignmentAxis: h
                        } = "number" == typeof d ? {
                            mainAxis: d,
                            crossAxis: 0,
                            alignmentAxis: null
                        } : {
                            mainAxis: 0,
                            crossAxis: 0,
                            alignmentAxis: null,
                            ...d
                        };
                        return r && "number" == typeof h && (m = "end" === r ? -1 * h : h), l ? {
                            x: m * p,
                            y: u * c
                        } : {
                            x: u * c,
                            y: m * p
                        }
                    }(t, e);
                    return s === (null == (n = r.offset) ? void 0 : n.placement) && null != (i = r.arrow) && i.alignmentOffset ? {} : {
                        x: a + l.x,
                        y: o + l.y,
                        data: { ...l,
                            placement: s
                        }
                    }
                }
            }
        },
        Qe = function(e) {
            return void 0 === e && (e = {}), {
                name: "shift",
                options: e,
                async fn(t) {
                    const {
                        x: n,
                        y: i,
                        placement: a
                    } = t, {
                        mainAxis: o = !0,
                        crossAxis: s = !1,
                        limiter: r = {
                            fn: e => {
                                let {
                                    x: t,
                                    y: n
                                } = e;
                                return {
                                    x: t,
                                    y: n
                                }
                            }
                        },
                        ...l
                    } = te(e, t), c = {
                        x: n,
                        y: i
                    }, p = await me(t, l), d = se(ne(a)), u = ae(d);
                    let m = c[u],
                        h = c[d];
                    if (o) {
                        const e = "y" === u ? "bottom" : "right";
                        m = ee(m + p["y" === u ? "top" : "left"], m, m - p[e])
                    }
                    if (s) {
                        const e = "y" === d ? "bottom" : "right";
                        h = ee(h + p["y" === d ? "top" : "left"], h, h - p[e])
                    }
                    const _ = r.fn({ ...t,
                        [u]: m,
                        [d]: h
                    });
                    return { ..._,
                        data: {
                            x: _.x - n,
                            y: _.y - i
                        }
                    }
                }
            }
        },
        Xe = function(e) {
            return void 0 === e && (e = {}), {
                name: "flip",
                options: e,
                async fn(t) {
                    var n, i;
                    const {
                        placement: a,
                        middlewareData: o,
                        rects: s,
                        initialPlacement: r,
                        platform: l,
                        elements: c
                    } = t, {
                        mainAxis: p = !0,
                        crossAxis: d = !0,
                        fallbackPlacements: u,
                        fallbackStrategy: m = "bestFit",
                        fallbackAxisSideDirection: h = "none",
                        flipAlignment: _ = !0,
                        ...g
                    } = te(e, t);
                    if (null != (n = o.arrow) && n.alignmentOffset) return {};
                    const f = ne(a),
                        b = se(r),
                        y = ne(r) === r,
                        v = await (null == l.isRTL ? void 0 : l.isRTL(c.floating)),
                        k = u || (y || !_ ? [ce(r)] : function(e) {
                            const t = ce(e);
                            return [le(e), t, le(t)]
                        }(r)),
                        w = "none" !== h;
                    !u && w && k.push(... function(e, t, n, i) {
                        const a = ie(e);
                        let o = function(e, t, n) {
                            const i = ["left", "right"],
                                a = ["right", "left"],
                                o = ["top", "bottom"],
                                s = ["bottom", "top"];
                            switch (e) {
                                case "top":
                                case "bottom":
                                    return n ? t ? a : i : t ? i : a;
                                case "left":
                                case "right":
                                    return t ? o : s;
                                default:
                                    return []
                            }
                        }(ne(e), "start" === n, i);
                        return a && (o = o.map((e => e + "-" + a)), t && (o = o.concat(o.map(le)))), o
                    }(r, _, h, v));
                    const P = [r, ...k],
                        S = await me(t, g),
                        z = [];
                    let j = (null == (i = o.flip) ? void 0 : i.overflows) || [];
                    if (p && z.push(S[f]), d) {
                        const e = function(e, t, n) {
                            void 0 === n && (n = !1);
                            const i = ie(e),
                                a = re(e),
                                o = oe(a);
                            let s = "x" === a ? i === (n ? "end" : "start") ? "right" : "left" : "start" === i ? "bottom" : "top";
                            return t.reference[o] > t.floating[o] && (s = ce(s)), [s, ce(s)]
                        }(a, s, v);
                        z.push(S[e[0]], S[e[1]])
                    }
                    if (j = [...j, {
                            placement: a,
                            overflows: z
                        }], !z.every((e => e <= 0))) {
                        var C, x;
                        const e = ((null == (C = o.flip) ? void 0 : C.index) || 0) + 1,
                            t = P[e];
                        if (t) return {
                            data: {
                                index: e,
                                overflows: j
                            },
                            reset: {
                                placement: t
                            }
                        };
                        let n = null == (x = j.filter((e => e.overflows[0] <= 0)).sort(((e, t) => e.overflows[1] - t.overflows[1]))[0]) ? void 0 : x.placement;
                        if (!n) switch (m) {
                            case "bestFit":
                                {
                                    var L;
                                    const e = null == (L = j.filter((e => {
                                        if (w) {
                                            const t = se(e.placement);
                                            return t === b || "y" === t
                                        }
                                        return !0
                                    })).map((e => [e.placement, e.overflows.filter((e => e > 0)).reduce(((e, t) => e + t), 0)])).sort(((e, t) => e[1] - t[1]))[0]) ? void 0 : L[0];e && (n = e);
                                    break
                                }
                            case "initialPlacement":
                                n = r
                        }
                        if (a !== n) return {
                            reset: {
                                placement: n
                            }
                        }
                    }
                    return {}
                }
            }
        },
        et = e => ({
            name: "arrow",
            options: e,
            async fn(t) {
                const {
                    x: n,
                    y: i,
                    placement: a,
                    rects: o,
                    platform: s,
                    elements: r,
                    middlewareData: l
                } = t, {
                    element: c,
                    padding: p = 0
                } = te(e, t) || {};
                if (null == c) return {};
                const d = pe(p),
                    u = {
                        x: n,
                        y: i
                    },
                    m = re(a),
                    h = oe(m),
                    _ = await s.getDimensions(c),
                    g = "y" === m,
                    f = g ? "top" : "left",
                    b = g ? "bottom" : "right",
                    y = g ? "clientHeight" : "clientWidth",
                    v = o.reference[h] + o.reference[m] - u[m] - o.floating[h],
                    k = u[m] - o.reference[m],
                    w = await (null == s.getOffsetParent ? void 0 : s.getOffsetParent(c));
                let P = w ? w[y] : 0;
                P && await (null == s.isElement ? void 0 : s.isElement(w)) || (P = r.floating[y] || o.floating[h]);
                const S = v / 2 - k / 2,
                    z = P / 2 - _[h] / 2 - 1,
                    j = K(d[f], z),
                    C = K(d[b], z),
                    x = j,
                    L = P - _[h] - C,
                    A = P / 2 - _[h] / 2 + S,
                    T = ee(x, A, L),
                    E = !l.arrow && null != ie(a) && A !== T && o.reference[h] / 2 - (A < x ? j : C) - _[h] / 2 < 0,
                    I = E ? A < x ? A - x : A - L : 0;
                return {
                    [m]: u[m] + I,
                    data: {
                        [m]: T,
                        centerOffset: A - T - I,
                        ...E && {
                            alignmentOffset: I
                        }
                    },
                    reset: E
                }
            }
        }),
        tt = function(e) {
            return void 0 === e && (e = {}), {
                options: e,
                fn(t) {
                    const {
                        x: n,
                        y: i,
                        placement: a,
                        rects: o,
                        middlewareData: s
                    } = t, {
                        offset: r = 0,
                        mainAxis: l = !0,
                        crossAxis: c = !0
                    } = te(e, t), p = {
                        x: n,
                        y: i
                    }, d = se(a), u = ae(d);
                    let m = p[u],
                        h = p[d];
                    const _ = te(r, t),
                        g = "number" == typeof _ ? {
                            mainAxis: _,
                            crossAxis: 0
                        } : {
                            mainAxis: 0,
                            crossAxis: 0,
                            ..._
                        };
                    if (l) {
                        const e = "y" === u ? "height" : "width",
                            t = o.reference[u] - o.floating[e] + g.mainAxis,
                            n = o.reference[u] + o.reference[e] - g.mainAxis;
                        m < t ? m = t : m > n && (m = n)
                    }
                    if (c) {
                        var f, b;
                        const e = "y" === u ? "width" : "height",
                            t = ["top", "left"].includes(ne(a)),
                            n = o.reference[d] - o.floating[e] + (t && (null == (f = s.offset) ? void 0 : f[d]) || 0) + (t ? 0 : g.crossAxis),
                            i = o.reference[d] + o.reference[e] + (t ? 0 : (null == (b = s.offset) ? void 0 : b[d]) || 0) - (t ? g.crossAxis : 0);
                        h < n ? h = n : h > i && (h = i)
                    }
                    return {
                        [u]: m,
                        [d]: h
                    }
                }
            }
        },
        nt = (e, t, n) => {
            const i = new Map,
                a = {
                    platform: Ze,
                    ...n
                },
                o = { ...a.platform,
                    _c: i
                };
            return (async (e, t, n) => {
                const {
                    placement: i = "bottom",
                    strategy: a = "absolute",
                    middleware: o = [],
                    platform: s
                } = n, r = o.filter(Boolean), l = await (null == s.isRTL ? void 0 : s.isRTL(t));
                let c = await s.getElementRects({
                        reference: e,
                        floating: t,
                        strategy: a
                    }),
                    {
                        x: p,
                        y: d
                    } = ue(c, i, l),
                    u = i,
                    m = {},
                    h = 0;
                for (let n = 0; n < r.length; n++) {
                    const {
                        name: o,
                        fn: _
                    } = r[n], {
                        x: g,
                        y: f,
                        data: b,
                        reset: y
                    } = await _({
                        x: p,
                        y: d,
                        initialPlacement: i,
                        placement: u,
                        strategy: a,
                        middlewareData: m,
                        rects: c,
                        platform: s,
                        elements: {
                            reference: e,
                            floating: t
                        }
                    });
                    p = null != g ? g : p, d = null != f ? f : d, m = { ...m,
                        [o]: { ...m[o],
                            ...b
                        }
                    }, y && h <= 50 && (h++, "object" == typeof y && (y.placement && (u = y.placement), y.rects && (c = !0 === y.rects ? await s.getElementRects({
                        reference: e,
                        floating: t,
                        strategy: a
                    }) : y.rects), ({
                        x: p,
                        y: d
                    } = ue(c, u, l))), n = -1)
                }
                return {
                    x: p,
                    y: d,
                    placement: u,
                    strategy: a,
                    middlewareData: m
                }
            })(e, t, { ...a,
                platform: o
            })
        },
        it = "sda-modal-header",
        at = "sda-modal-headerless",
        ot = "\n  bottom: 0;\n  top: auto !important;\n  left: 0 !important;\n  right: 0 !important;\n  border-radius: 20px 20px 0 0;\n",
        st = `\n<style>\n.sda-overlay {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: ${w} !important;\n  will-change: opacity, transform;\n}\n\n.sda-modal {\n  background-color: #fff;\n  min-width: 340px;\n  border-radius: 20px;\n  padding: 0;\n  will-change: opacity, transform, overflow;\n}\n\n.sda-modal:focus {\n  outline: 0;\n}\n\n.sda-modal.disable-popup {\n  ${ot}\n}\n\n.${it} {\n  padding: 16px 16px 8px;\n  display: flex;\n  align-items: center;\n}\n\n.${it} shop-logo {\n  flex: 1 0 1px;\n  display: flex;\n  line-height: 18px;\n}\n\n.sda-modal-close-button {\n    border: none;\n    border-radius: 50%;\n    position: relative;\n    padding: 0;\n    cursor: pointer;\n    display: flex;\n}\n\n.sda-modal-close-button:focus,\n.sda-modal-close-button:hover {\n  color: #E3E3E3;\n  outline: none;\n\n  --icon-color: #E3E3E3;\n}\n\n.sda-modal-close-button:before {\n  position: absolute;\n  content: '';\n  top: 1px;\n  left: 1px;\n  right: 1px;\n  bottom: 1px;\n  border-radius: 50%;\n  background-color: #707070;\n}\n.sda-modal-close-button shop-close-icon {\n    pointer-events: none;\n    z-index: 1;\n}\n\n.${it}.${at} {\n  display: block;\n  padding: 0;\n  height: 0;\n}\n\n.${it}.${at} shop-logo {\n  display: none;\n}\n\n.${it}.${at} .sda-modal-close-button {\n  position: absolute;\n  top: 26px;\n  right: 16px;\n}\n\n.sda-landing {\n    width: 340px;\n    margin: auto;\n}\n\n.sda-hidden {\n  height: 0 !important;\n  border: 0;\n  padding: 0;\n  margin: 0;\n  visibility: hidden;\n  overflow: hidden;\n}\n\n.focus-trap {\n  border: 0;\n  clip: rect(0, 0, 0, 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  white-space: nowrap;\n  width: 1px;\n}\n\n@media (forced-colors: active) {\n  .sda-modal {\n    border: 1px solid;\n  }\n}\n\n.arrow {\n  position: absolute;\n  background-color: #fff;\n  width: 24px;\n  height: 24px;\n  transform: rotate(45deg);\n  z-index: -1;\n}\n\n@media screen and (max-width: 448px) {\n  .sda-landing {\n    width: 100%;\n  }\n\n  .sda-modal {\n    position: absolute;\n    ${ot}\n    min-width: 340px;\n    max-width: unset;\n    box-sizing: border-box;\n  }\n\n  .arrow {\n    display: none;\n  }\n}\n\n@media screen and (min-width: 449px) {\n  .sda-overlay {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n  }\n\n\n  .sda-modal {\n    position: absolute;\n    bottom: unset !important;\n    right: unset !important;\n    margin: 0 auto !important;\n    max-width: 400px;\n    box-sizing: border-box;\n  }\n}\n</style>\n\n<div class="sda-overlay sda-hidden">\n  <button type="button" aria-hidden="true" class="focus-trap focus-trap--start"></button>\n  <section class="sda-modal" data-testid="authorize-modal" part="modal" role="dialog" aria-modal="true" aria-label="Sign in with Shop" tabindex="-1">\n    <div class="${it}">\n      <shop-logo role="img" size="18" color="brand" label="Shop"></shop-logo>\n      <button type="button" class="sda-modal-close-button" aria-label="Close">\n        <shop-close-icon compact size="24"/>\n      </button>\n    </div>\n    <div class="sda-landing">\n      <slot></slot>\n    </div>\n  </section>\n  <button type="button" aria-hidden="true" class="focus-trap focus-trap--end"></button>\n</div>\n`;
    var rt;
    ! function(e) {
        e.Dynamic = "DYNAMIC", e.Mobile = "MOBILE", e.Center = "CENTER"
    }(rt || (rt = {}));
    const lt = new Map([
            ["top", "bottom"],
            ["top-end", "bottom"],
            ["top-start", "bottom"],
            ["right", "left"],
            ["right-end", "left"],
            ["right-start", "left"],
            ["bottom", "top"],
            ["bottom-end", "top"],
            ["bottom-start", "top"],
            ["left", "right"],
            ["left-end", "right"],
            ["left-start", "right"]
        ]),
        ct = {
            [rt.Dynamic]: (e, t, n, i) => {
                let o = e.querySelector(".arrow");
                return e.style.position = "absolute", null === o && (o = document.createElement("div"), o.className = "arrow", e.appendChild(o)), {
                    config: {
                        placement: null != i ? i : "right",
                        middleware: [Ye(22), i ? void 0 : Qe({
                            limiter: tt({
                                offset: 64
                            })
                        }), Xe({
                            fallbackPlacements: i ? [] : ["left", "top", "bottom"]
                        }), et({
                            element: o,
                            padding: 32
                        }), {
                            name: "center",
                            fn() {
                                return a(this, void 0, void 0, (function*() {
                                    return {
                                        data: {
                                            center: window.matchMedia("screen and (((min-width: 401px) and (max-width: 999px)) or (max-height: 750px))").matches
                                        }
                                    }
                                }))
                            }
                        }]
                    },
                    fn: ({
                        x: t,
                        y: n,
                        placement: i,
                        strategy: a,
                        middlewareData: s
                    }) => {
                        const {
                            center: r
                        } = s;
                        if (r.center) return null !== o && (o.style.display = "none"), Object.assign(e.style, {
                            top: (window.innerHeight - e.offsetHeight) / 2 + "px",
                            left: (window.innerWidth - e.offsetWidth) / 2 + "px",
                            bottom: "",
                            right: ""
                        }), null;
                        Object.assign(e.style, {
                            left: `${t}px`,
                            top: `${n}px`,
                            right: "",
                            bottom: ""
                        });
                        const {
                            arrow: l
                        } = s, c = lt.get(i);
                        return null !== o && Object.assign(o.style, {
                            left: void 0 === (null == l ? void 0 : l.x) ? "" : `${null==l?void 0:l.x}px`,
                            top: void 0 === (null == l ? void 0 : l.y) ? "" : `${null==l?void 0:l.y}px`,
                            right: "",
                            bottom: "",
                            display: "",
                            [c]: "-12px"
                        }), {
                            x: t,
                            y: n,
                            strategy: a,
                            placement: i,
                            staticSide: c,
                            middlewareData: s
                        }
                    }
                }
            },
            [rt.Center]: (e, t, n = {}) => ({
                config: {},
                fn: () => {
                    const i = e.querySelector(".arrow");
                    null !== i && (i.style.display = "none");
                    const a = Object.keys(n).length > 0;
                    return a && Object.assign(e.style, n, {
                        position: "absolute"
                    }), t.classList.toggle("centered", !a), null
                }
            }),
            [rt.Mobile]: e => ({
                config: {},
                fn: () => (Object.assign(e.style, {
                    top: "auto !important",
                    right: "0 !important",
                    bottom: "0 !important",
                    left: "auto"
                }), null)
            })
        },
        pt = {
            cleanup: () => {},
            updatePosition: () => a(void 0, void 0, void 0, (function*() {
                return Promise.resolve(null)
            }))
        };
    var dt;
    ! function(e) {
        e.UserStatusIdentity = "userstatuschange:identity", e.UserStatusScope = "userstatuschange:scope", e.UserSessionCreate = "usersession:create"
    }(dt || (dt = {}));
    const ut = (() => {
        class e {
            constructor() {
                this._topics = {}
            }
            subscribe(e, t, n) {
                this._topics[e] = [...this._topics[e] || [], {
                    publisherId: t,
                    callback: n
                }]
            }
            unsubscribe(e, t) {
                this._topics[e] = (this._topics[e] || []).filter((e => e.publisherId !== t))
            }
            unsubscribeAll(e) {
                Object.keys(this._topics).forEach((t => {
                    this.unsubscribe(t, e)
                }))
            }
            publish(e, t, n) {
                var i;
                null === (i = this._topics[e]) || void 0 === i || i.forEach((e => {
                    e.publisherId !== t && e.callback(n)
                }))
            }
        }
        let t;
        return {
            getInstance: () => (t || (t = new e), t)
        }
    })();
    class mt extends Error {
        constructor(e, t = I()) {
            super(e), this.analyticsTraceId = t, this.name = "MonorailProducerError", this.code = "monorail_producer_error"
        }
    }
    class ht extends Error {
        constructor(e, t = I()) {
            super(e), this.analyticsTraceId = t, this.name = "AbortSignalReceivedError", this.code = "abort_signal_received_error"
        }
    }

    function _t() {
        var e;
        null === (e = document.querySelector("com-1password-notification")) || void 0 === e || e.remove()
    }

    function gt(e, t, n) {
        return (t = function(e) {
            var t = function(e, t) {
                if ("object" != typeof e || !e) return e;
                var n = e[Symbol.toPrimitive];
                if (void 0 !== n) {
                    var i = n.call(e, t);
                    if ("object" != typeof i) return i;
                    throw new TypeError("@@toPrimitive must return a primitive value.")
                }
                return ("string" === t ? String : Number)(e)
            }(e, "string");
            return "symbol" == typeof t ? t : t + ""
        }(t)) in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function ft(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(e);
            t && (i = i.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            }))), n.push.apply(n, i)
        }
        return n
    }

    function bt(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2 ? ft(Object(n), !0).forEach((function(t) {
                gt(e, t, n[t])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ft(Object(n)).forEach((function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
            }))
        }
        return e
    }
    const yt = "http://localhost:8082",
        vt = "https://monorail-edge.shopifysvc.com",
        kt = "/v1/produce";

    function wt(e) {
        return void 0 !== e.schemaId
    }
    class Pt {
        constructor(e) {
            this.producer = e
        }
        do(e, t) {
            return wt(e) ? this.producer.produce(e) : this.producer.produceBatch(e)
        }
    }

    function St() {
        if ("undefined" != typeof crypto && crypto && "function" == typeof crypto.randomUUID) return crypto.randomUUID();
        const e = new Array(36);
        for (let t = 0; t < 36; t++) e[t] = Math.floor(16 * Math.random());
        return e[14] = 4, e[19] = e[19] &= -5, e[19] = e[19] |= 8, e[8] = e[13] = e[18] = e[23] = "-", e.map((e => e.toString(16))).join("")
    }

    function zt(e, t = !0) {
        return e && Object.keys(e).length && t ? Object.keys(e).map((t => ({
            [jt(t)]: e[t]
        }))).reduce(((e, t) => bt(bt({}, e), t))) : e
    }

    function jt(e) {
        return e.split(/(?=[A-Z])/).join("_").toLowerCase()
    }

    function Ct(e) {
        return e.events.map((e => {
            let t = !0,
                n = !0;
            return e && e.options && Object.prototype.hasOwnProperty.call(e.options, "convertEventCase") && (t = Boolean(e.options.convertEventCase)), e && e.options && Object.prototype.hasOwnProperty.call(e.options, "convertMetaDataCase") && (n = Boolean(e.options.convertMetaDataCase)), bt({
                schema_id: e.schemaId,
                payload: zt(e.payload, t)
            }, e.metadata && {
                metadata: zt(e.metadata, n)
            })
        }))
    }
    class xt extends Error {
        constructor(e) {
            super(`Error producing to the Monorail Edge. Response received: ${JSON.stringify(e)}`), gt(this, "name", "MonorailUnableToProduceError"), this.response = e, Object.setPrototypeOf(this, xt.prototype)
        }
    }
    class Lt extends Error {
        constructor(e) {
            super(`Response not from Monorail Edge. Response received: ${JSON.stringify(e)}`), gt(this, "name", "MonorailInterceptedProduceError"), this.response = e, Object.setPrototypeOf(this, Lt.prototype)
        }
    }
    class At extends Error {
        constructor(e) {
            super(`Error producing to the Monorail Edge. Response received: ${JSON.stringify(e)}`), gt(this, "name", "MonorailBatchProduceError"), Object.setPrototypeOf(this, At.prototype), this.response = e
        }
    }
    class Tt extends Error {
        constructor(e, t) {
            super(`Error completing request. A network failure may have prevented the request from completing. Error: ${e}. Schemas: ${Array.from(new Set(t)).join(", ")}`), gt(this, "name", "MonorailRequestError"), Object.setPrototypeOf(this, Tt.prototype)
        }
    }
    class Et extends Error {
        constructor(e, t) {
            super(`Error reading response from Monorail Edge. Status: ${t||"unknown"}. Error: ${(null==e?void 0:e.message)||"Unknown error"}`), gt(this, "name", "MonorailResponseReadError"), this.error = e, this.status = t, Object.setPrototypeOf(this, Et.prototype)
        }
    }
    class It {
        static withEndpoint(e) {
            return new It(`https://${new URL(e).hostname}`)
        }
        constructor(e = yt, t = {}) {
            var n, i;
            if (this.edgeDomain = e, this.optionsOrKeepalive = t, "boolean" == typeof t) return this.keepalive = t, void(this.detectInterceptedErrorEnabled = !1);
            this.keepalive = null !== (n = t.keepalive) && void 0 !== n && n, this.detectInterceptedErrorEnabled = null !== (i = t.detectInterceptedErrorEnabled) && void 0 !== i && i
        }
        async produceBatch(e) {
            const t = {
                events: Ct(e),
                metadata: zt(e.metadata)
            };
            let n, i;
            try {
                n = await fetch(this.produceBatchEndpoint(), {
                    method: "post",
                    headers: Mt(e.metadata),
                    body: JSON.stringify(t),
                    keepalive: this.keepalive
                })
            } catch (t) {
                throw new Tt(t, e.events.map((e => e.schemaId)))
            }
            if (207 === n.status) {
                const e = await n.json();
                throw new At(e)
            }
            try {
                i = await n.text()
            } catch (e) {
                throw new Et(e, n.status)
            }
            if (!n.ok) {
                if (!Boolean(n.headers.get("x-request-id")) && this.detectInterceptedErrorEnabled) throw new Lt({
                    status: n.status,
                    message: i
                });
                throw new xt({
                    status: n.status,
                    message: i
                })
            }
            return {
                status: n.status
            }
        }
        async produce(e) {
            let t, n, i = !0;
            e && e.options && Object.prototype.hasOwnProperty.call(e.options, "convertEventCase") && (i = Boolean(e.options.convertEventCase));
            try {
                t = await async function({
                    endpoint: e,
                    event: t,
                    keepalive: n
                }) {
                    var i, a, o, s, r;
                    const l = t.metadata ? {
                        clientMessageId: null === (i = t.metadata) || void 0 === i ? void 0 : i.clientMessageId,
                        eventCreatedAtMs: null === (a = t.metadata) || void 0 === a ? void 0 : a.eventCreatedAtMs,
                        consent: null === (o = t.metadata) || void 0 === o ? void 0 : o.consent,
                        consent_provider: null === (s = t.metadata) || void 0 === s ? void 0 : s.consent_provider,
                        consent_version: null === (r = t.metadata) || void 0 === r ? void 0 : r.consent_version
                    } : void 0;
                    return fetch(null != e ? e : vt + kt, {
                        method: "post",
                        headers: Mt(t.metadata),
                        body: JSON.stringify({
                            schema_id: t.schemaId,
                            payload: t.payload,
                            metadata: l && zt(l, !0)
                        }),
                        keepalive: n
                    })
                }({
                    endpoint: this.produceEndpoint(),
                    keepalive: this.keepalive,
                    event: bt(bt({}, e), {}, {
                        payload: zt(e.payload, i)
                    })
                })
            } catch (t) {
                throw new Tt(t, [e.schemaId])
            }
            if (!t) throw new xt({
                message: "No response from edge"
            });
            try {
                n = await t.text()
            } catch (e) {
                throw new Et(e, t.status)
            }
            if (!t.ok) {
                if (!Boolean(t.headers.get("x-request-id")) && this.detectInterceptedErrorEnabled) throw new Lt({
                    status: t.status,
                    message: n
                });
                throw new xt({
                    status: t.status,
                    message: n
                })
            }
            return {
                status: t.status
            }
        }
        produceBatchEndpoint() {
            return this.edgeDomain + "/unstable/produce_batch"
        }
        produceEndpoint() {
            return this.edgeDomain + kt
        }
    }

    function Mt(e) {
        const t = {
            "Content-Type": "application/json; charset=utf-8",
            "X-Monorail-Edge-Event-Created-At-Ms": (e && e.eventCreatedAtMs || Date.now()).toString(),
            "X-Monorail-Edge-Event-Sent-At-Ms": Date.now().toString(),
            "X-Monorail-Edge-Client-Message-Id": (e && e.clientMessageId || St()).toString()
        };
        return e && e.userAgent && (t["User-Agent"] = e.userAgent), e && e.remoteIp && (t["X-Forwarded-For"] = e.remoteIp), e && e.deviceInstallId && (t["X-Monorail-Edge-Device-Install-Id"] = e.deviceInstallId), e && e.client && (t["X-Monorail-Edge-Client"] = e.client), e && e.clientOs && (t["X-Monorail-Edge-Client-OS"] = e.clientOs), t
    }
    class Ot {
        static printWelcomeMessage(e) {
            console.log(`%c👋 from Monorail%c\n\nWe've noticed that you're${e?"":" not"} running in debug mode. As such, we will ${e?"produce":"not produce"} Monorail events to the console. \n\nIf you want Monorail events to ${e?"stop":"start"} appearing here, %cset debugMode=${(!e).toString()}%c, for the Monorail Log Producer in your code.`, "font-size: large;", "font-size: normal;", "font-weight: bold;", "font-weight: normal;")
        }
        constructor(e) {
            this.sendToConsole = e, e && Ot.printWelcomeMessage(e)
        }
        async produce(e) {
            return this.sendToConsole && console.log("Monorail event produced", e), new Promise((t => {
                t(e)
            }))
        }
        produceBatch(e) {
            return this.sendToConsole && console.log("Monorail Batch event produced", e), new Promise((t => {
                t(e)
            }))
        }
    }
    class Nt {
        static createLogProducer(e) {
            return new Nt(new Ot(e.debugMode), e.middleware || [])
        }
        static createHttpProducerWithEndpoint(e, t = []) {
            return new Nt(It.withEndpoint(e), t)
        }
        static createHttpProducer(e) {
            return new Nt(e.production ? new It(vt, e.options) : new It(yt, e.options), e.middleware || [])
        }
        static buildMiddlewareChain(e, t = 0) {
            return t === e.length ? this.identityFn : n => e[t].do(n, this.buildMiddlewareChain(e, t + 1))
        }
        constructor(e, t) {
            this.producer = e, this.middleware = t, this.executeChain = Nt.buildMiddlewareChain(this.middleware.concat(new Pt(e)))
        }
        produce(e) {
            return e.metadata = bt({
                eventCreatedAtMs: Date.now(),
                clientMessageId: St()
            }, e.metadata), this.executeChain(e)
        }
        produceBatch(e) {
            return this.executeChain(e)
        }
    }
    class qt {
        constructor(e) {
            this.version = e.version
        }
    }
    class Rt {
        constructor(e, t = () => !1) {
            if (gt(this, "eventsAwaitingConsent", []), null == e || !e.provider) throw new Dt("ConsentTrackingMiddleware requires an instance of ConsentTrackingProvider");
            this.isStrictlyNecessary = t, this.provider = e.provider
        }
        async do(e, t) {
            if (wt(e)) {
                const n = await this.provider.annotateEvent(e);
                return this.isConsentGivenForEmission(n) ? (await this.processBufferedEvents(t), t(n)) : this.isStrictlyNecessary(n) ? t(n) : (this.eventsAwaitingConsent.push(e), Promise.resolve({
                    status: 0,
                    message: "Consent not granted and event not marked strictly necessary, event not sent"
                }))
            } {
                if (this.isConsentGivenForEmission(await this.provider.annotateEvent(e.events[0]))) {
                    await this.processBufferedEvents(t);
                    const n = await Promise.all(e.events.map((e => this.provider.annotateEvent(e))));
                    return t(bt(bt({}, e), {}, {
                        events: n
                    }))
                }
                const n = e.events.filter((e => !!this.isStrictlyNecessary(e) || (this.eventsAwaitingConsent.push(e), !1)));
                if (n.length > 0) {
                    const i = await Promise.all(n.map((e => this.provider.annotateEvent(e))));
                    return t(bt(bt({}, e), {}, {
                        events: i
                    }))
                }
                return Promise.resolve({
                    status: 0,
                    message: "Consent not granted for any event, and no event marked strictly necessary, event batch not sent"
                })
            }
        }
        isConsentGivenForEmission(e) {
            var t;
            const n = null === (t = e.metadata) || void 0 === t ? void 0 : t.consent,
                i = this.provider.getRequiredConsentForEmission();
            return Boolean(Array.isArray(n) && n.some((e => i.includes(e))))
        }
        async
        processBufferedEvents(e) {
            if (0 === this.eventsAwaitingConsent.length) return;
            const t = this.eventsAwaitingConsent;
            this.eventsAwaitingConsent = [];
            const n = await Promise.all(t.map((e => this.provider.annotateEvent(e))));
            await e({
                events: n
            })
        }
    }
    class Dt extends Error {
        constructor(e) {
            super(e), Object.setPrototypeOf(this, Dt.prototype)
        }
    }
    var Bt, Ft, Vt;
    ! function(e) {
        e.Histogram = "Histogram", e.Counter = "Counter", e.UpDownCounter = "UpDownCounter"
    }(Bt || (Bt = {})),
    function(e) {
        e[e.INT = 0] = "INT", e[e.DOUBLE = 1] = "DOUBLE"
    }(Ft || (Ft = {})),
    function(e) {
        e.InvalidStorefrontOrigin = "shop_js_invalid_storefront_origin", e.RequestShowCalledBeforeIframeLoaded = "shop_js_request_show_called_before_iframe_loaded", e.HandleSilentError = "shop_js_handle_silent_error", e.MonorailProducerError = "shop_js_monorail_producer_error"
    }(Vt || (Vt = {})), Vt.InvalidStorefrontOrigin, Bt.Counter, Ft.INT, Vt.RequestShowCalledBeforeIframeLoaded, Bt.Counter, Ft.INT, Vt.HandleSilentError, Bt.Counter, Ft.INT, Vt.MonorailProducerError, Bt.Counter, Ft.INT;

    function $t(...e) {
        return a(this, void 0, void 0, (function*() {
            var t;
            if (!window.ShopifyAnalytics && !window.analytics) return {};
            let n;
            Boolean(null === (t = window.trekkie) || void 0 === t ? void 0 : t.ready) ? n = Wt() : (window.trekkie = window.trekkie || [], n = new Promise((e => {
                window.trekkie.push(["ready", () => {
                    e(Wt())
                }])
            })));
            const i = yield n;
            return e.reduce(((e, t) => {
                const n = i[t];
                return void 0 !== n && (e[t] = n), e
            }), {})
        }))
    }

    function Wt() {
        let e;
        const t = Promise.race([new Promise((t => e = setTimeout((() => t({})), 1e4))), new Promise((e => {
            var t, n, i;
            const a = (null === (n = null === (t = window.ShopifyAnalytics) || void 0 === t ? void 0 : t.lib) || void 0 === n ? void 0 : n.ready) || (null === (i = window.analytics) || void 0 === i ? void 0 : i.ready);
            null == a || a((() => {
                var t, n, i, a;
                const o = (null === (n = null === (t = window.ShopifyAnalytics) || void 0 === t ? void 0 : t.lib) || void 0 === n ? void 0 : n.trekkie) || (null === (i = window.analytics) || void 0 === i ? void 0 : i.trekkie),
                    s = null !== (a = null == o ? void 0 : o.defaultAttributes) && void 0 !== a ? a : {};
                e(s)
            }))
        }))]);
        return t.finally((() => clearTimeout(e)))
    }
    var Ut, Ht, Kt, Zt;
    ! function(e) {
        e.UiImpression = "shop_js_ui_impression/1.1", e.InstallmentsModalOpened = "shop_pay_installments_dynamic_modal_impression/1.0", e.InstallmentsModalUserAction = "shop_pay_installments_dynamic_modal_user_actions/1.0", e.InstallmentsBannerImpression = "shop_pay_installments_banner_ui_impression/3.0", e.InstallmentsPrequalPopupPageImpression = "shop_pay_installments_prequal_popup_page_impression/3.0", e.InstallmentsBannerPrequalInteraction = "shop_pay_installments_banner_prequal_interaction/3.0", e.InstallmentsInvalidMetadata = "shop_pay_installments_banner_invalid_metadata/1.0", e.ShopLoginFirstTimeRender = "shop_js_ui_shop_login_first_time_render/1.0", e.ShopifyLoginWithShopSdkDiscountStatus = "shopify_pay_login_with_shop_sdk_discount_status/2.0", e.LoginWithShopSdkPageImpression = "shopify_pay_login_with_shop_sdk_page_impressions/3.3", e.LoginWithShopSdkUserAction = "shopify_pay_login_with_shop_sdk_user_actions/2.2", e.LoginWithShopSdkErrorEvents = "shopify_pay_login_with_shop_sdk_error_events/1.0", e.ShopifyPayModalStateChange = "shopify_pay_modal_state_change/1.3", e.LoginWithShopModalStateChange = "shop_identity_modal_state_change/1.4", e.LoginWithShopFeatureInitialize = "shopify_pay_login_with_shop_sdk_feature_initialize/1.1"
    }(Ut || (Ut = {})),
    function(e) {
        e.AuthorizeModal = "AUTHORIZE_MODAL", e.AuthorizeModalInViewport = "AUTHORIZE_MODAL_IN_VIEWPORT", e.ClassicCustomerAccount = "CLASSIC_CUSTOMER_ACCOUNTS_ACCOUNT_PAGE", e.ClassicCustomerAccountCreateAccount = "CLASSIC_CUSTOMER_ACCOUNTS_CREATE_ACCOUNT_PAGE", e.ClassicCustomerAccountLogin = "CLASSIC_CUSTOMER_ACCOUNTS_LOGIN_PAGE", e.ComponentLoadedFollowing = "COMPONENT_LOADED_FOLLOWING", e.ComponentLoadedNotFollowing = "COMPONENT_LOADED_NOT_FOLLOWING", e.ContinueWithShop = "CONTINUE_WITH_SHOP_PAGE", e.DiscountSaved = "DISCOUNT_SAVE_CONFIRMATION_PAGE", e.DiscountShown = "DISCOUNT_SHOWN", e.FollowButtonShownInViewport = "FOLLOW_BUTTON_SHOWN_IN_VIEWPORT", e.FollowingGetShopAppCta = "FOLLOWING_GET_SHOP_APP_CTA", e.PartnerEmailInputShown = "PARTNER_EMAIL_INPUT_SHOWN", e.PhoneConsent = "TEXT_MARKETING_SIGN_UP", e.PhoneConsentConfirmed = "TEXT_MARKETING_CONFIRMED_PAGE", e.PhoneConsentDeclined = "TEXT_MARKETING_DECLINED_PAGE", e.SdkLoaded = "SDK_HAS_LOADED_INITIAL_PAGE", e.SignInWithShopButton = "SIGN_IN_WITH_SHOP_BUTTON"
    }(Ht || (Ht = {})),
    function(e) {
        e.CreateAccountLinkClicked = "CREATE_ACCOUNT_CLICK", e.EmailEntered = "EMAIL_ENTERED", e.FollowOnShopClicked = "FOLLOW_ON_SHOP_CLICKED", e.FollowingGetShopAppClick = "FOLLOWING_GET_SHOP_APP_CLICK", e.PasswordManagerAutofillDetected = "PASSWORD_MANAGER_AUTOFILL_DETECTED", e.PhoneConsentDeclined = "DO_NOT_SHARE_PHONE_CLICK", e.PhoneConsentProvided = "SHARE_PHONE_CLICK", e.SignInWithShopClicked = "SIGN_IN_WITH_SHOP_BUTTON_CLICK", e.ThirdPartyFormSubmission = "3RD_PARTY_EMAIL_CAPTURE_FORM_SUBMISSION_CLICK", e.FedCmCancelled = "FEDCM_CANCELLED", e.FedCmCompleted = "FEDCM_COMPLETED"
    }(Kt || (Kt = {})),
    function(e) {
        e.Loaded = "loaded", e.Shown = "shown", e.Hidden = "hidden"
    }(Zt || (Zt = {}));
    const Gt = "",
        Jt = "1",
        Yt = "0",
        Qt = "p",
        Xt = "a",
        en = "m",
        tn = "t",
        nn = "m",
        an = "a",
        on = "p",
        sn = "s";

    function rn(e) {
        try {
            return decodeURIComponent(e)
        } catch (e) {
            return ""
        }
    }

    function ln(e, t = !1) {
        const n = function() {
            try {
                return document.cookie
            } catch {
                return !1
            }
        }() ? document.cookie.split("; ") : [];
        for (let t = 0; t < n.length; t++) {
            const [i, a] = n[t].split("=");
            if (e === rn(i)) {
                return rn(a)
            }
        }
        if (t && "_tracking_consent" === e && !window.localStorage.getItem("tracking_consent_fetched")) {
            if ("undefined" != typeof __CtaTestEnv__ && "true" === __CtaTestEnv__) return;
            return console.debug("_tracking_consent missing"),
                function(e = "/") {
                    const t = new XMLHttpRequest;
                    t.open("HEAD", e, !1), t.withCredentials = !0, t.send()
                }(), window.localStorage.setItem("tracking_consent_fetched", "true"), ln(e, !1)
        }
    }

    function cn() {
        const e = new URLSearchParams(window.location.search).get("_cs") || ln("_tracking_consent");
        if (void 0 !== e) return function(e) {
            const t = e.slice(0, 1);
            if ("{" == t) return function(e) {
                var t;
                let n;
                try {
                    n = JSON.parse(e)
                } catch {
                    return
                }
                if ("2.1" !== n.v) return;
                if (null === (t = n.con) || void 0 === t || !t.CMP) return;
                return n
            }(e);
            if ("3" == t) return function(e) {
                const t = e.slice(1).split("_"),
                    [n, i, a, o, s] = t;
                let r, l;
                try {
                    r = t[5] ? JSON.parse(t.slice(5).join("_")) : void 0
                } catch {}
                if (s) {
                    const e = s.replace(/\*/g, "/").replace(/-/g, "+"),
                        t = Array.from(atob(e)).map((e => e.charCodeAt(0).toString(16).padStart(2, "0"))).join("");
                    l = [8, 13, 18, 23].reduce(((e, t) => e.slice(0, t) + "-" + e.slice(t)), t)
                }

                function c(e) {
                    const t = n.split(".")[0];
                    return t.includes(e.toLowerCase()) ? Yt : t.includes(e.toUpperCase()) ? Jt : Gt
                }

                function p(e) {
                    return n.includes(e.replace("t", "s").toUpperCase())
                }
                return {
                    v: "3",
                    con: {
                        CMP: {
                            [an]: c(an),
                            [on]: c(on),
                            [nn]: c(nn),
                            [sn]: c(sn)
                        }
                    },
                    region: i || "",
                    cus: r,
                    purposes: {
                        [Xt]: p(Xt),
                        [Qt]: p(Qt),
                        [en]: p(en),
                        [tn]: p(tn)
                    },
                    sale_of_data_region: "t" == o,
                    display_banner: "t" == a,
                    consent_id: l
                }
            }(e);
            return
        }(e)
    }

    function pn(e) {
        const t = cn();
        if (!t || !t.purposes) return !0;
        const n = t.purposes[e];
        return "boolean" != typeof n || n
    }

    function dn() {
        return pn(Xt)
    }

    function un() {
        return pn(Qt)
    }

    function mn() {
        return pn(en)
    }

    function hn() {
        return pn(tn)
    }

    function _n() {
        const e = [];
        return dn() && e.push("analytics"), mn() && e.push("marketing"), hn() && e.push("sale_of_data"), un() && e.push("preferences"), e
    }
    class gn extends qt {
        async annotateEvent(e) {
            return Promise.resolve(function(e, t) {
                if ("v1" === t) {
                    const n = _n();
                    return { ...e,
                        metadata: { ...null == e ? void 0 : e.metadata,
                            consent: n,
                            consent_provider: "consent-tracking-api",
                            consent_version: t
                        }
                    }
                }
                throw new fn(t || "unknown")
            }(e, this.version))
        }
        getRequiredConsentForEmission() {
            if ("v1" === this.version) return ["analytics", "marketing"];
            throw new fn(this.version || "unknown")
        }
    }
    class fn extends Error {
        constructor(e) {
            super(`Version ${e} is not supported by the consent-tracking-api provider`), this.name = "MonorailConsentTrackingApiProviderVersionError", Object.setPrototypeOf(this, fn.prototype)
        }
    }
    const bn = {
        errorParsingCreatedAtMs: "Error parsing: X-Monorail-Edge-Event-Created-At-Ms",
        emptyeEventCreatedAtMs: "event_created_at_ms metadata field cannot be empty",
        noPermissionToGetURL: "Your client does not have permission to get URL",
        noResponseFromEdge: "No response from edge",
        incorrectContentType: "Incorrect Content-Type. Expected: application/json or text/plain",
        blockedRequest: "Blocked Request",
        failedToReadRequestBody: "Failed to read request body",
        methodNotAllowed: "Method Not Allowed",
        schemaValidationError: "Schema validation error"
    };

    function yn() {
        const e = new gn({
            version: "v1"
        });
        return [new Rt({
            provider: e
        })]
    }
    const vn = yn(),
        kn = Nt.createHttpProducer({
            production: !0,
            middleware: vn
        });
    let wn = class {
        constructor({
            elementName: e,
            analyticsTraceId: t,
            flow: n = "",
            flowVersion: i = "unspecified",
            shopId: a,
            shopPermanentDomain: o,
            checkoutVersion: s,
            checkoutToken: r
        }) {
            var l;
            this._shopPermanentDomain = "", this._impressionTracked = !1, this._shopLoginFirstTimeRenderTracked = {}, this._pageImpressionTracked = {
                AUTHORIZE_MODAL: !1,
                AUTHORIZE_MODAL_IN_VIEWPORT: !1,
                CLASSIC_CUSTOMER_ACCOUNTS_ACCOUNT_PAGE: !1,
                CLASSIC_CUSTOMER_ACCOUNTS_CREATE_ACCOUNT_PAGE: !1,
                CLASSIC_CUSTOMER_ACCOUNTS_LOGIN_PAGE: !1,
                COMPONENT_LOADED_FOLLOWING: !1,
                COMPONENT_LOADED_NOT_FOLLOWING: !1,
                CONTINUE_WITH_SHOP_PAGE: !1,
                DISCOUNT_SAVE_CONFIRMATION_PAGE: !1,
                DISCOUNT_SHOWN: !1,
                FOLLOWING_GET_SHOP_APP_CTA: !1,
                FOLLOW_BUTTON_SHOWN_IN_VIEWPORT: !1,
                PARTNER_EMAIL_INPUT_SHOWN: !1,
                SDK_HAS_LOADED_INITIAL_PAGE: !1,
                SIGN_IN_WITH_SHOP_BUTTON: !1,
                TEXT_MARKETING_SIGN_UP: !1,
                TEXT_MARKETING_CONFIRMED_PAGE: !1,
                TEXT_MARKETING_DECLINED_PAGE: !1
            }, this._elementName = e, this._flow = n, this._analyticsTraceId = t, this._initTimestamp = (new Date).getTime(), this._flowVersion = i, this._checkoutVersion = s, this._checkoutToken = r, this._shopId = a, this._shopPermanentDomain = o || (null === (l = window.Shopify) || void 0 === l ? void 0 : l.shop) || "", this._shopModalPreviousState = void 0
        }
        get analyticsTraceId() {
            return this._analyticsTraceId
        }
        trackElementImpression(e) {
            return a(this, void 0, void 0, (function*() {
                if (this._impressionTracked) return;
                this._impressionTracked = !0;
                const t = yield $t("uniqToken", "visitToken", "microSessionId", "microSessionCount", "shopId", "themeId", "themeCityHash", "contentLanguage", "referer"), n = Object.assign(Object.assign({}, t), {
                    elementType: e,
                    elementName: this._elementName,
                    shopJsVersion: h
                });
                Pn({
                    schemaId: Ut.UiImpression,
                    payload: n
                }, t, (() => {
                    this._impressionTracked = !1
                }))
            }))
        }
        trackPageImpression(e) {
            return a(this, arguments, void 0, (function*({
                shopAccountUuid: e,
                apiKey: t,
                page: n,
                allowDuplicates: i = !1
            }) {
                var a;
                if (!i && this._pageImpressionTracked[n]) return;
                this._pageImpressionTracked[n] = !0;
                const o = yield $t("uniqToken", "visitToken", "isPersistentCookie", "path", "customerId"), s = B(), r = null !== (a = null == s ? void 0 : s.pageType) && void 0 !== a ? a : "", l = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, o), {
                    analyticsTraceId: this._analyticsTraceId,
                    flow: this._flow,
                    flowVersion: this._flowVersion,
                    pageName: n,
                    sdkVersion: h,
                    shopPermanentDomain: this._shopPermanentDomain,
                    storefrontPageType: r
                }), t && {
                    apiKey: t
                }), e && {
                    shopAccountUuid: e
                }), this._checkoutToken && {
                    checkoutToken: this._checkoutToken
                });
                Pn({
                    schemaId: Ut.LoginWithShopSdkPageImpression,
                    payload: l
                }, o, (() => {
                    this._pageImpressionTracked[n] = !1
                }))
            }))
        }
        trackShopLoginFirstTimeRender() {
            return a(this, arguments, void 0, (function*(e = this._flowVersion, t = this._initTimestamp) {
                if (this._shopLoginFirstTimeRenderTracked[e]) return;
                this._shopLoginFirstTimeRenderTracked[e] = !0;
                const n = (new Date).getTime() - t,
                    i = yield $t("shopId"), a = Object.assign(Object.assign({
                        analyticsTraceId: this._analyticsTraceId,
                        duration: n
                    }, i), {
                        shopLoginVersion: e,
                        url: window.location.href,
                        userAgent: navigator.userAgent
                    });
                Pn({
                    schemaId: Ut.ShopLoginFirstTimeRender,
                    payload: a
                }, i, (() => {
                    this._shopLoginFirstTimeRenderTracked[e] = !1
                }))
            }))
        }
        trackShopPayLoginWithShopSdkUserAction({
            apiKey: e,
            userAction: t
        }) {
            const n = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, e && {
                apiKey: e
            }), {
                flow: this._flow,
                flowVersion: this._flowVersion,
                sdkVersion: h,
                analyticsTraceId: this._analyticsTraceId
            }), this._checkoutVersion && {
                checkoutVersion: this._checkoutVersion
            }), this._shopId && {
                shopId: this._shopId
            }), {
                shopPermanentDomain: this._shopPermanentDomain,
                userAction: t
            });
            Pn({
                schemaId: Ut.LoginWithShopSdkUserAction,
                payload: n
            })
        }
        trackShopPayLoginWithSdkErrorEvents({
            apiKey: e,
            errorCode: t,
            errorMessage: n
        }) {
            const i = {
                apiKey: e,
                flow: this._flow,
                flowVersion: this._flowVersion,
                sdkVersion: h,
                analyticsTraceId: this._analyticsTraceId,
                shopPermanentDomain: this._shopPermanentDomain,
                errorCode: t,
                errorMessage: n
            };
            Pn({
                schemaId: Ut.LoginWithShopSdkErrorEvents,
                payload: i
            })
        }
        trackShopPayModalStateChange({
            currentState: e,
            reason: t,
            dismissMethod: n
        }) {
            var i, a;
            if (this._checkoutToken) {
                const t = {
                    checkoutToken: this._checkoutToken,
                    checkoutVersion: this._checkoutVersion,
                    shopId: this._shopId,
                    shopifyDomain: this._shopPermanentDomain,
                    previousState: "",
                    currentState: e,
                    analyticsTraceId: this._analyticsTraceId,
                    clientTimestampMs: (new Date).getTime(),
                    zoom: `${null===(i=window.visualViewport)||void 0===i?void 0:i.scale}`
                };
                Pn({
                    schemaId: Ut.ShopifyPayModalStateChange,
                    payload: t
                })
            }
            this._flow && this._flowVersion && (Pn({
                schemaId: Ut.LoginWithShopModalStateChange,
                payload: {
                    currentState: e,
                    previousState: this._shopModalPreviousState,
                    reason: t,
                    dismissMethod: n,
                    flow: this._flow,
                    flowVersion: this._flowVersion,
                    analyticsTraceId: this._analyticsTraceId,
                    zoom: `${null===(a=window.visualViewport)||void 0===a?void 0:a.scale}`
                }
            }), this._shopModalPreviousState = e)
        }
        trackFeatureInitialization(e) {
            return a(this, arguments, void 0, (function*({
                apiKey: e,
                source: t
            }) {
                var n;
                const i = yield $t("uniqToken", "visitToken", "isPersistentCookie", "path", "customerId"), a = B(), o = null !== (n = null == a ? void 0 : a.pageType) && void 0 !== n ? n : "", s = Object.assign(Object.assign(Object.assign(Object.assign({}, i), {
                    analyticsTraceId: this._analyticsTraceId,
                    flow: this._flow,
                    flowVersion: this._flowVersion,
                    sdkVersion: h,
                    shopPermanentDomain: this._shopPermanentDomain,
                    source: t,
                    storefrontPageType: o
                }), e && {
                    apiKey: e
                }), this._checkoutToken && {
                    checkoutToken: this._checkoutToken
                });
                Pn({
                    schemaId: Ut.LoginWithShopFeatureInitialize,
                    payload: s
                }, i)
            }))
        }
    };

    function Pn(e, t, n) {
        !t || Object.keys(t).length ? (e.payload = Object.assign(e.payload, t), kn.produce(e).catch((e => {
            if (null == n || n(e), function(e) {
                    var t;
                    return !(e instanceof Tt || (null === (t = null == e ? void 0 : e.message) || void 0 === t ? void 0 : t.includes("Invalid agent:")))
                }(e)) {
                ! function(e) {
                    const t = Object.entries(bn).find((([t, n]) => e.message.includes(n)));
                    null == t || t[0]
                }(e instanceof Error ? e : new mt(String(e))), Vt.MonorailProducerError
            }
        }))) : null == n || n({
            message: "trekkie attributes are empty"
        })
    }
    const Sn = 448,
        zn = "\n  bottom: 0;\n  top: auto !important;\n  left: 0 !important;\n  right: 0 !important;\n  border-radius: 32px 32px 0 0;\n",
        jn = `\n<style>\n.sda-overlay {\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.5);\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: ${w} !important;\n  will-change: opacity, transform;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n\n.sda-modal {\n  background-color: #fff;\n  max-width: max-content;\n  min-width: 320px;\n  border-radius: 32px;\n  padding: 40px 28px 16px;\n  will-change: opacity, transform;\n}\n\n.sda-modal:focus {\n  outline: 0;\n}\n\n@media screen and (max-width: 448px) {\n  .sda-modal {\n    position: absolute;\n    ${zn}\n    max-width: unset;\n    padding: 32px 0 16px;\n    box-sizing: border-box;\n  }\n\n  .arrow {\n    display: none;\n  }\n}\n\n@media screen and (min-width: 449px) {\n  .sda-overlay.centered {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n  }\n}\n\n.sda-modal.disable-popup {\n  ${zn}\n}\n\n.sda-modal-close-button {\n    background: none;\n    border: none;\n    position: absolute;\n    right: 16px;\n    top: 24px;\n    padding: 8px;\n    cursor: pointer;\n    display: flex;\n}\n\n.sda-modal-close-button:focus,\n.sda-modal-close-button:hover {\n  border-radius: 6px;\n  background: rgb(0 0 0 / 0.03);\n  color: #7b61f0;\n  outline: none;\n\n  --icon-color: #7b61f0;\n}\n\n.sda-modal-close-button shop-close-icon {\n    pointer-events: none;\n}\n\n.sda-landing {\n    width: 320px;\n    margin: auto;\n}\n\n.sda-shop-logo {\n    text-align: center;\n    padding: 12px 0 8px 0;\n}\n\n.sda-hidden {\n  height: 0 !important;\n  border: 0;\n  padding: 0;\n  margin: 0;\n  visibility: hidden;\n  overflow: hidden;\n}\n\n.focus-trap {\n  border: 0;\n  clip: rect(0, 0, 0, 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  white-space: nowrap;\n  width: 1px;\n}\n\n@media (forced-colors: active) {\n  .sda-modal {\n    border: 1px solid;\n  }\n}\n\n.arrow {\n  position: absolute;\n  background-color: #fff;\n  width: 24px;\n  height: 24px;\n  transform: rotate(45deg);\n}\n</style>\n\n<div class="sda-overlay sda-hidden">\n  <button type="button" aria-hidden="true" class="focus-trap focus-trap--start"></button>\n  <section class="sda-modal" data-testid="authorize-modal" part="modal" role="dialog" aria-modal="true" aria-label="Sign in with Shop" tabindex="-1">\n      <button type="button" class="sda-modal-close-button" aria-label="Close">\n          <shop-close-icon size="16"/>\n      </button>\n      <div class="sda-landing">\n          <slot></slot>\n      </div>\n      <div class="sda-shop-logo">\n          <shop-logo role="img" size="20" color="brand" label="Shop"/>\n      </div>\n  </section>\n  <button type="button" aria-hidden="true" class="focus-trap focus-trap--end"></button>\n</div>\n`,
        Cn = "<style>\n  :host {\n    display:inline-block;\n    font-family: -apple-system,BlinkMacSystemFont,San Francisco,Roboto,Segoe UI,Helvetica Neue,sans-serif !important;\n    font-style: normal !important;\n    line-height: normal;\n  }\n  iframe {\n    border:none;\n    height:0;\n    width:100%;\n  }\n  store-logo {\n    margin: 16px 0 29px;\n  }\n\n  .hidden {\n    display: none;\n  }\n\n  @media screen and (min-width: 449px) {\n    store-logo {\n      margin-top: 38px;\n    }\n  }\n  </style>";
    class xn extends wn {
        constructor({
            elementName: e,
            analyticsTraceId: t
        }) {
            super({
                elementName: e,
                analyticsTraceId: t,
                flow: "follow"
            })
        }
        trackFollowButtonPageImpression(e) {
            this.trackPageImpression({
                page: e ? Ht.ComponentLoadedFollowing : Ht.ComponentLoadedNotFollowing
            })
        }
        trackFollowButtonInViewport() {
            this.trackPageImpression({
                page: Ht.FollowButtonShownInViewport
            })
        }
        trackFollowingGetAppButtonPageImpression() {
            this.trackPageImpression({
                page: Ht.FollowingGetShopAppCta
            })
        }
        trackFollowButtonClicked() {
            this.trackShopPayLoginWithShopSdkUserAction({
                userAction: Kt.FollowOnShopClicked
            })
        }
        trackFollowingGetAppButtonClicked() {
            this.trackShopPayLoginWithShopSdkUserAction({
                userAction: Kt.FollowingGetShopAppClick
            })
        }
    }
    var Ln;
    ! function(e) {
        e.Default = "loginWithShop", e.CheckoutModal = "loginWithShopCheckoutModal", e.ClassicCustomerAccounts = "loginWithShopClassicCustomerAccounts", e.Prequal = "loginWithShopPrequal", e.Web = "loginWithShopShopWeb", e.SelfServe = "loginWithShopSelfServe", e.CheckoutExtension = "loginWithShopCheckoutExtension", e.PaymentRequest = "loginWithShopPaymentRequest"
    }(Ln || (Ln = {}));
    const An = {
            [Ln.Default]: "default",
            [Ln.SelfServe]: "self_serve_customer_accounts",
            [Ln.ClassicCustomerAccounts]: "classic_customer_accounts",
            [Ln.Prequal]: "shop_pay_installments_prequal",
            [Ln.PaymentRequest]: "payment_request",
            [Ln.CheckoutExtension]: "default",
            [Ln.CheckoutModal]: "checkout_modal",
            [Ln.Web]: ""
        },
        Tn = "shop-login-default",
        En = `${Tn}-iframe`,
        In = `${Tn}-iframe-compact`,
        Mn = `${Tn}-header`,
        On = `${Mn}-contents-container`,
        Nn = `${Mn}-title`,
        qn = `${Mn}-description`,
        Rn = `${Mn}-divider`,
        Dn = `${Tn}-footer`,
        Bn = `${Dn}-content`,
        Fn = `${Tn}-hidden`,
        Vn = "20px",
        $n = `\n    <style>\n        body {\n            font-family: -apple-system,BlinkMacSystemFont,San Francisco,Roboto,Segoe UI,Helvetica Neue,sans-serif !important;\n            font-style: normal !important;\n            text-align: center;\n            margin: 0;\n            -webkit-font-smoothing: antialiased;\n            overflow: hidden;\n        }\n\n        .${Nn} {\n            font-size: 18px;\n            font-weight: 700;\n            line-height: 25px;\n            letter-spacing: -0.2px;\n            color: #000000;\n            margin-bottom: 8px;\n        }\n\n        .${qn} {\n            font-size: 14px;\n            font-weight: 400;\n            color: #0F1721;\n            letter-spacing: 0px;\n            white-space: pre-line;\n            overflow: hidden;\n            text-overflow: ellipsis;\n        }\n    </style>\n`;
    class Wn extends wn {
        constructor({
            elementName: e,
            analyticsTraceId: t,
            analyticsContext: n = Ln.Default,
            flowVersion: i = "unspecified",
            checkoutVersion: a,
            checkoutToken: o,
            shopId: s,
            shopPermanentDomain: r
        }) {
            super({
                elementName: e,
                analyticsTraceId: t,
                flow: An[n],
                flowVersion: i,
                checkoutVersion: a,
                checkoutToken: o,
                shopId: s,
                shopPermanentDomain: r
            }), this._emailEnteredUserActionTracked = !1, this._passwordManagerAutofillDetected = !1
        }
        trackLoginDefaultButtonClicked() {
            this.trackShopPayLoginWithShopSdkUserAction({
                userAction: Kt.SignInWithShopClicked
            })
        }
        trackEmailEnteredAction() {
            this._emailEnteredUserActionTracked || (this._emailEnteredUserActionTracked = !0, this.trackShopPayLoginWithShopSdkUserAction({
                userAction: Kt.EmailEntered
            }))
        }
        trackPasswordManagerAutofillDetected() {
            this._passwordManagerAutofillDetected || (this._passwordManagerAutofillDetected = !0, this.trackShopPayLoginWithShopSdkUserAction({
                userAction: Kt.PasswordManagerAutofillDetected
            }))
        }
        trackFedCMCancelledUserAction() {
            this.trackShopPayLoginWithShopSdkUserAction({
                userAction: Kt.FedCmCancelled
            })
        }
        trackFedCMCompletedUserAction() {
            this.trackShopPayLoginWithShopSdkUserAction({
                userAction: Kt.FedCmCompleted
            })
        }
    }
    class Un extends Wn {
        constructor({
            elementName: e,
            flowVersion: t,
            analyticsTraceId: n
        }) {
            super({
                elementName: e,
                analyticsTraceId: n,
                analyticsContext: Ln.ClassicCustomerAccounts,
                flowVersion: t
            })
        }
        trackClassicCustomerAccountsLoginPageImpression() {
            this.trackPageImpression({
                page: Ht.ClassicCustomerAccountLogin
            })
        }
        trackClassicCustomerAccountsCreateAccountPageImpression() {
            this.trackPageImpression({
                page: Ht.ClassicCustomerAccountCreateAccount
            })
        }
        trackClassicCustomerAccountsAccountPageImpression() {
            this.trackPageImpression({
                page: Ht.ClassicCustomerAccount
            })
        }
        trackClassicCustomerAccountsContinueWithShopPageImpression() {
            this.trackPageImpression({
                page: Ht.ContinueWithShop
            })
        }
        trackClassicCustomerAccountsCreateAccountAction() {
            this.trackShopPayLoginWithShopSdkUserAction({
                userAction: Kt.CreateAccountLinkClicked
            })
        }
    }
    var Hn, Kn, Zn, Gn, Jn, Yn, Qn;
    ! function(e) {
        e.Source = "src", e.Initial = "initial"
    }(Hn || (Hn = {})),
    function(e) {
        e.Email = "email", e.Phone = "phone", e.PhoneOwnershipVerified = "phone_ownership_verified"
    }(Kn || (Kn = {})),
    function(e) {
        e.Follow = "follow", e.Default = "default", e.Custom = "custom", e.Prequal = "prequal", e.PopUp = "pop_up"
    }(Zn || (Zn = {})),
    function(e) {
        e.Start = "start", e.SignUp = "signup", e.Verify = "verify", e.Captcha = "captcha", e.OneClick = "one-click"
    }(Gn || (Gn = {})),
    function(e) {
        e.ApiUnavailable = "api_unavailable", e.InvalidApiKey = "invalid_api_key", e.ServerError = "server_error", e.UserBlocked = "user_blocked", e.NoDiscountReceived = "no_discount_received", e.InvalidAnalyticsContext = "invalid_analytics_context", e.InstallmentsIneligible = "installments_ineligible", e.CaptchaChallenge = "captcha_challenge", e.RetriableServerError = "retriable_server_error"
    }(Jn || (Jn = {})),
    function(e) {
        e.Init = "init", e.Restart = "restart", e.UserMatched = "user_matched", e.UserNotMatched = "user_not_matched", e.VerificationStepChanged = "verification_step_changed", e.CustomizationValidityChanged = "customization_validity_changed", e.PopUpOpened = "pop_up_opened"
    }(Yn || (Yn = {})),
    function(e) {
        e.Start = "start", e.SignUp = "signup", e.EmailVerification = "email_verification", e.PhoneVerification = "phone_verification", e.WebAuthnVerification = "webauthn_verification", e.PopUpOpened = "pop_up_opened", e.OneClick = "one_click", e.PersonalizeConsent = "personalize_consent"
    }(Qn || (Qn = {}));
    const Xn = "setheight";
    var ei, ti, ni, ii, ai, oi, si, ri, li;
    ! function(e) {
        e.Interest = "interest", e.SplitPay = "split_pay", e.ZeroPercent = "zero_percent"
    }(ei || (ei = {})),
    function(e) {
        e.Cart = "cart", e.Product = "product", e.Checkout = "checkout"
    }(ti || (ti = {})),
    function(e) {
        e.IntroPageLoaded = "prequal_intro_page_loaded", e.AuthorizeLoaded = "prequal_authorize_loaded", e.BuyerFormOverlayLoaded = "prequal_buyer_form_overlay_loaded", e.ResultsPageLoading = "prequal_results_page_loading", e.ResultsPageLoaded = "prequal_results_page_loaded", e.ContinueToCheckoutClicked = "prequal_continue_to_checkout_clicked"
    }(ni || (ni = {})),
    function(e) {
        e.PayInFour = "pay_in_4", e.AsLowAs = "as_low_as", e.PayInFourAsLowAs = "pay_in_4_or_as_low_as"
    }(ii || (ii = {})),
    function(e) {
        e.Standard = "standard", e.CustomizedByMerchant = "customized_by_merchant"
    }(ai || (ai = {})),
    function(e) {
        e.SplitPay = "split_pay", e.ZeroInterest = "zero_interest", e.InterestOnly = "interest_only", e.ZeroInterestOnly = "zero_interest_only", e.Adaptive = "adaptive", e.Ineligible = "ineligible"
    }(oi || (oi = {})),
    function(e) {
        e.Close = "close", e.ContinueToCheckout = "continue_to_checkout", e.CloseAuth = "close_auth_modal"
    }(si || (si = {})),
    function(e) {
        e.SplitPay = "split_pay", e.Monthly = "monthly"
    }(ri || (ri = {})),
    function(e) {
        e.SignIn = "sign_in", e.SignUp = "sign_up"
    }(li || (li = {}));
    class ci extends Error {
        constructor() {
            super("FedCM is not supported")
        }
    }
    class pi extends Error {
        constructor() {
            super("FedCM was cancelled")
        }
    }
    const di = e => a(void 0, void 0, void 0, (function*() {
        if (!("IdentityCredential" in window)) throw new ci;
        const {
            mediation: t = "optional",
            analyticsTraceId: n,
            monorailTracker: i
        } = e, o = yield function(e) {
            return a(this, void 0, void 0, (function*() {
                let t = "/services/login_with_shop/fedcm/provider";
                e && (t += `?analytics_trace_id=${encodeURIComponent(e)}`);
                const n = yield fetch(t, {
                    method: "GET"
                }), i = yield n.json();
                return {
                    configURL: i.configURL,
                    clientId: i.clientId,
                    nonce: i.nonce,
                    state: i.state
                }
            }))
        }(n), s = yield function(e, t) {
            return navigator.credentials.get({
                identity: {
                    providers: [t]
                },
                mediation: e
            })
        }(t, o);
        if (!s) throw null == i || i.trackFedCMCancelledUserAction(), new pi;
        return function(e, t, n) {
            return a(this, void 0, void 0, (function*() {
                const i = yield fetch("/services/login_with_shop/fedcm/callback", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: new URLSearchParams({
                        raw_id_token: e,
                        state: t
                    }).toString()
                });
                return null == n || n.trackFedCMCompletedUserAction(), i
            }))
        }(s.token, o.state, i)
    }));

    function ui() {
        return a(this, arguments, void 0, (function*(e = !1) {
            if (!n("initCustomerAccounts")) {
                i("initCustomerAccounts");
                try {
                    if (("/" === (t = window.location.pathname) ? t : t.endsWith("/") ? t.slice(0, -1) : t).endsWith("/account")) return void
                    function() {
                        const e = (t = "analytics_trace_id", new URLSearchParams(window.location.search).get(t));
                        var t;
                        if (e) {
                            new Un({
                                elementName: "shop-login-button",
                                flowVersion: li.SignIn,
                                analyticsTraceId: e
                            }).trackClassicCustomerAccountsAccountPageImpression()
                        }
                    }();
                    ! function(e = !1) {
                        const t = I(),
                            n = new Un({
                                elementName: "shop-login-button",
                                flowVersion: li.SignIn,
                                analyticsTraceId: t
                            }),
                            i = new WeakMap;
                        let a = null;
                        e && d();
                        const o = W({
                            onVisible: t => c({
                                input: t,
                                autoOpen: !e
                            }),
                            onFallback: e => {
                                e.addEventListener("focus", s, {
                                    once: !0
                                }), n.trackShopPayLoginWithSdkErrorEvents({
                                    apiKey: "",
                                    errorCode: "fallback_to_focus_event",
                                    errorMessage: "Fallback to focus event for classic customer accounts"
                                })
                            }
                        });

                        function s(t) {
                            c({
                                input: t.target,
                                autoOpen: !e
                            })
                        }

                        function l(e, t) {
                            var n, i;
                            const a = null === (n = e.elements.namedItem("checkout_url")) || void 0 === n ? void 0 : n.value,
                                o = null === (i = e.elements.namedItem("return_url")) || void 0 === i ? void 0 : i.value,
                                s = new URLSearchParams(Object.assign(Object.assign({
                                    analytics_trace_id: t
                                }, a && {
                                    checkout_url: a
                                }), o && {
                                    return_url: o
                                }));
                            return `${window.location.origin}/account/redirect?${s.toString()}`
                        }

                        function c({
                            input: e,
                            autoOpen: o
                        }) {
                            var s, c;
                            const d = e.form;
                            if (!d) return;
                            i.has(e) && (null === (s = i.get(e)) || void 0 === s || s.destroy(), i.delete(e));
                            const u = document.createElement("input");
                            u.type = "hidden", u.name = "login_with_shop[analytics_trace_id]", u.value = t, d.appendChild(u);
                            const h = new p("modalDismissed", !1);
                            a || (a = function({
                                analyticsTraceId: e,
                                autoOpen: t
                            }) {
                                let n, i = !1;
                                n = document.querySelector("shop-login-button:not([action])"), n || (n = document.createElement("shop-login-button"), n.setAttribute("hide-button", "true"), i = !0);
                                n.setAttribute("client-id", ""), n.setAttribute("action", "default"), n.setAttribute("version", "2"), n.setAttribute("flow-version", li.SignIn), n.setAttribute("analytics-context", Ln.ClassicCustomerAccounts), n.setAttribute("analytics-trace-id", e), n.setAttribute("disable-sign-up", "true"), t && n.setAttribute("auto-open", "true");
                                n.setAttribute("consent-challenge", ""), Object.entries(D()).forEach((([e, t]) => {
                                    const i = e.replace(/_/g, "-");
                                    n.setAttribute(i, t)
                                })), i && document.body.appendChild(n);
                                return n
                            }({
                                analyticsTraceId: t,
                                autoOpen: o
                            }), n.trackClassicCustomerAccountsLoginPageImpression(), a.addEventListener("completed", (() => {
                                const e = l(d, t);
                                window.location.assign(e)
                            })), a.addEventListener("modalclosed", (() => {
                                h.set(!0)
                            })));
                            const _ = new r(e);
                            _.start(), null === (c = a.setPasswordManagerDetection) || void 0 === c || c.call(a, _), a.email = e.value, i.set(e, new m(e, (e => {
                                a.email = e
                            })))
                        }

                        function d() {
                            const e = document.querySelector("#customer_login");
                            e && di({
                                mediation: "required",
                                analyticsTraceId: t,
                                monorailTracker: n
                            }).then((n => u(n, e, t))).catch((e => h(e)))
                        }

                        function u(e, t, n) {
                            if (200 !== e.status) return;
                            if (!t) return;
                            const i = l(t, n);
                            window.location.assign(i)
                        }

                        function h(e) {
                            e instanceof ci || e instanceof pi || "NetworkError" === e.name && e.message
                        }
                        $({
                            selector: v,
                            onElementFound: e => o.observe(e)
                        })
                    }(e)
                } catch (e) {
                    if (e instanceof mi) {
                        new Un({
                            elementName: "shop-login-button",
                            flowVersion: li.SignIn,
                            analyticsTraceId: e.analyticsTraceId
                        }).trackShopPayLoginWithSdkErrorEvents({
                            apiKey: "",
                            errorCode: e.code,
                            errorMessage: e.message
                        })
                    }
                }
                var t
            }
        }))
    }
    class mi extends Error {
        constructor(e, t = I()) {
            super(e), this.analyticsTraceId = t, this.name = "InitCustomerAccountsError", this.code = "init_customer_accounts_error"
        }
    }

    function hi() {
        return a(this, void 0, void 0, (function*() {
            if (!n("initCustomerAccountsSignUp")) {
                i("initCustomerAccountsSignUp");
                try {
                    ! function() {
                        const e = I(),
                            t = new Un({
                                elementName: "shop-login-button",
                                flowVersion: li.SignUp,
                                analyticsTraceId: e
                            }),
                            n = new WeakMap;
                        let i = null;
                        const a = W({
                            onVisible: r,
                            onFallback: e => {
                                e.addEventListener("focus", o, {
                                    once: !0
                                }), t.trackShopPayLoginWithSdkErrorEvents({
                                    apiKey: "",
                                    errorCode: "fallback_to_focus_event",
                                    errorMessage: "Fallback to focus event for classic customer accounts"
                                })
                            }
                        });

                        function o(e) {
                            r(e.target)
                        }

                        function s(e, t) {
                            var n, i;
                            const a = null === (n = e.elements.namedItem("checkout_url")) || void 0 === n ? void 0 : n.value,
                                o = null === (i = e.elements.namedItem("return_url")) || void 0 === i ? void 0 : i.value,
                                s = new URLSearchParams(Object.assign(Object.assign({
                                    analytics_trace_id: t
                                }, a && {
                                    checkout_url: a
                                }), o && {
                                    return_url: o
                                }));
                            return `${window.location.origin}/account/redirect?${s.toString()}`
                        }

                        function r(a) {
                            var o;
                            const r = a.form;
                            if (!r) return;
                            n.has(a) && (null === (o = n.get(a)) || void 0 === o || o.destroy(), n.delete(a));
                            const l = document.createElement("input");
                            l.type = "hidden", l.name = "login_with_shop[analytics_trace_id]", l.value = e, r.appendChild(l), i || (i = function(e) {
                                const t = new p("modalDismissed", !1),
                                    n = null === document.querySelector(v),
                                    i = t.value,
                                    a = n && !i,
                                    o = document.createElement("shop-login-button");
                                o.setAttribute("client-id", ""), o.setAttribute("action", "default"), o.setAttribute("version", "2"), o.setAttribute("flow-version", li.SignUp), o.setAttribute("analytics-context", Ln.ClassicCustomerAccounts), o.setAttribute("analytics-trace-id", e), o.setAttribute("hide-button", "true"), o.setAttribute("disable-sign-up", "true"), a && o.setAttribute("auto-open", "true");
                                return document.body.appendChild(o), o
                            }(e), t.trackClassicCustomerAccountsCreateAccountPageImpression(), i.addEventListener("completed", (() => {
                                const t = s(r, e);
                                window.location.assign(t)
                            })));
                            const c = r.querySelector(b),
                                d = r.querySelector(y);
                            i.firstName = null == c ? void 0 : c.value, i.lastName = null == d ? void 0 : d.value, i.email = a.value, n.set(a, new m(a, (e => {
                                i.firstName = null == c ? void 0 : c.value, i.lastName = null == d ? void 0 : d.value, i.email = e
                            })))
                        }
                        $({
                            selector: k,
                            onElementFound: e => a.observe(e)
                        })
                    }()
                } catch (e) {}
            }
        }))
    }

    function _i(e) {
        const t = N((() => function({
            shopLoginButton: e,
            emailInput: t,
            emailLookupStarted: n,
            emailLookupEnded: i
        }) {
            if (!V(t.value)) return;
            n();
            const a = new Promise((t => {
                const n = () => t();
                e.addEventListener("shopusernotmatched", (() => {
                    n()
                }), {
                    once: !0
                }), e.addEventListener("shopusermatched", (() => {
                    n()
                }), {
                    once: !0
                })
            }));
            (function(e, t) {
                let n;
                const i = new Promise((e => {
                    n = setTimeout((() => {
                        e()
                    }), t)
                }));
                return Promise.race([e, i]).finally((() => {
                    clearTimeout(n)
                }))
            })(a, 1500).then((() => i())).catch((() => i()))
        }(e)), 300);
        e.emailInput.addEventListener("input", (() => {
            const n = e.emailInput.value;
            e.emailChanged({
                email: n,
                emailIsValid: V(n)
            }), t()
        })), t()
    }
    class gi {
        constructor(e, t, n, i = window) {
            this._subscribers = new Set, this._eventSource = e, this._subscribers.add(n), this._eventListener = e => {
                this._eventSource && this._eventSource.isSourceOf(e) && (t.some((t => function(e, t) {
                    try {
                        const n = new URL(e).host.split(".").reverse(),
                            i = new URL(t).host.split(".").reverse();
                        for (let e = 0; e < Math.min(n.length, i.length); e++)
                            if (n[e] !== i[e]) return !1;
                        return !0
                    } catch (e) {
                        return !1
                    }
                }(t, e.origin))) ? this._notify(e.data) : console.error("Origin mismatch for message event", e))
            }, this._eventDestination = i, i.addEventListener("message", this._eventListener, !1)
        }
        set eventSource(e) {
            this._eventSource !== e && (this._eventSource = e)
        }
        destroy() {
            this._eventDestination.removeEventListener("message", this._eventListener, !1)
        }
        waitForMessage(e, t) {
            let n;
            return new Promise(((i, a) => {
                const o = () => {
                    a(new ht("Abort signal received"))
                };
                (null == t ? void 0 : t.aborted) && o(), n = n => {
                    n.type === e && (null == t || t.removeEventListener("abort", o), i(n))
                }, this._subscribers.add(n), null == t || t.addEventListener("abort", o)
            })).finally((() => {
                this._subscribers.delete(n)
            }))
        }
        _notify(e) {
            this._subscribers.forEach((t => t(e)))
        }
    }
    const fi = "https://shop.app",
        bi = "https://pay.shopify.com",
        yi = "https://shop.app";
    var vi;

    function ki(e) {
        let t;
        try {
            const n = new URL(e);
            "localhost" !== n.hostname && "127.0.0.1" !== n.hostname || "https:" === n.protocol ? "https:" !== n.protocol ? t = vi.NotUsingHttps : "/" !== n.pathname ? t = vi.HasPath : n.hash ? t = vi.HasHash : n.search && (t = vi.HasSearch) : t = vi.UsingLocalhost
        } catch (e) {
            t = vi.InvalidUrl
        } finally {
            t && (console.error(`[shop-js] Invalid storefront origin: ${e}`), Vt.InvalidStorefrontOrigin)
        }
        return void 0 === t
    }! function(e) {
        e.UsingLocalhost = "using_localhost", e.NotUsingHttps = "not_using_https", e.HasPath = "has_path", e.HasHash = "has_hash", e.HasSearch = "has_search", e.InvalidUrl = "invalid_url"
    }(vi || (vi = {}));
    class wi {
        constructor(e, t) {
            this._eventDestination = e, this._eventOrigins = t
        }
        postMessage(e) {
            const t = this._eventDestination instanceof HTMLIFrameElement ? this._eventDestination.contentWindow : this._eventDestination;
            this._eventOrigins.forEach((n => {
                null == t || t.postMessage(e, n)
            }))
        }
        set eventDestination(e) {
            e && this._eventDestination !== e && (this._eventDestination = e)
        }
    }
    class Pi extends wi {
        constructor(e) {
            super(e, [fi, bi])
        }
    }
    class Si {
        constructor(e) {
            this._source = e
        }
        isSourceOf(e) {
            return e.source === this._source.contentWindow
        }
    }
    class zi {
        constructor(e) {
            this._source = e
        }
        isSourceOf(e) {
            return e.source === this._source
        }
    }

    function ji(e) {
        const t = document.createElement("iframe");
        return t.src = function(e) {
            const t = new URLSearchParams({
                client_id: e.clientId,
                response_mode: e.responseMode || "",
                redirect_type: e.redirectType || "",
                response_type: e.responseType || "",
                redirect_uri: e.redirectUri || "",
                code_challenge: e.codeChallenge || "",
                code_challenge_method: e.codeChallengeMethod || "",
                analytics_trace_id: e.analyticsTraceId || "",
                analytics_context: e.analyticsContext || "",
                scope: e.scope || "",
                state: e.state || "",
                flow: e.flow,
                version: "1"
            });
            return `${bi}/pay/shop-auth-input?${t}`
        }(e), t.setAttribute("style", "border: none; margin-top: 0.75rem;"), t.setAttribute("allow", "publickey-credentials-get *"), t.tabIndex = 0, t.width = "100%", t.height = "0", t
    }

    function Ci({
        loader: e,
        target: t,
        targetWrapper: n,
        attributes: i,
        analyticsTraceId: a,
        analyticsContext: o,
        flow: s,
        hiddenClassName: r,
        onLoaded: l
    }) {
        var c, p;
        if (!U(t) || !U(n)) return;
        const d = ji(Object.assign(Object.assign({}, i), {
            analyticsTraceId: a,
            analyticsContext: o,
            version: "1",
            flow: s
        }));
        d.classList.add(r), d.id = "shop-login-email-input-iframe", null === (c = n.parentNode) || void 0 === c || c.insertBefore(d, n);
        const u = new gi(new Si(d), [fi, bi, null === (p = null === window || void 0 === window ? void 0 : window.location) || void 0 === p ? void 0 : p.origin], (function(n) {
                const i = (e => {
                    const t = e.replace("shopify_pay:", "");
                    try {
                        return JSON.parse(t)
                    } catch (e) {
                        return {}
                    }
                })(n);
                switch (i.action) {
                    case "loaded":
                        ! function() {
                            if (!e || "shop-loading" === (null == e ? void 0 : e.getAttribute("data-status"))) return d.classList.remove(r), null == e || e.dispatchEvent(new Event("shopinputloaded")), void l();
                            u.destroy(), d.remove(), null == t || t.removeEventListener("change", m)
                        }();
                        break;
                    case "error":
                        o = i.message, null == e || e.dispatchEvent(new CustomEvent("processingerror", {
                            detail: {
                                message: o
                            }
                        }));
                        break;
                    case "enterPressed":
                        ! function() {
                            null == t || t.form;
                            t.form.requestSubmit()
                        }();
                        break;
                    case "processing":
                        null == e || e.dispatchEvent(new Event("processing"));
                        break;
                    case "resized":
                        a = i.height, d.height = a;
                        break;
                    case "changed":
                        ! function(e) {
                            if (!U(t)) return;
                            t.value !== e && (t.value = e, t.dispatchEvent(new Event("input")))
                        }(i.value);
                        break;
                    case "loggedIn":
                        u.destroy()
                }
                var a;
                var o
            })),
            m = e => {
                const t = e.target;
                null == h || h.postMessage({
                    type: "emailsubmitted",
                    email: t.value
                })
            },
            h = new wi(d, [fi, bi]);
        t.addEventListener("change", m)
    }
    const xi = {
            code: "temporarily_unavailable",
            message: "Shop login is temporarily unavailable"
        },
        Li = "client-id",
        Ai = "version",
        Ti = "action",
        Ei = "storefront-origin",
        Ii = "keep-modal-open",
        Mi = "hide-button",
        Oi = "disable-sign-up",
        Ni = "redirect-uri",
        qi = "ux-mode",
        Ri = "redirect-type",
        Di = "auto-open",
        Bi = "analytics-context",
        Fi = "analytics-trace-id",
        Vi = "compact",
        $i = "response-type",
        Wi = "response-mode",
        Ui = "code-challenge",
        Hi = "code-challenge-method",
        Ki = "state",
        Zi = "scope",
        Gi = "avoid-pay-alt-domain",
        Ji = "avoid-sdk-session",
        Yi = "flow",
        Qi = "flow-version",
        Xi = "email",
        ea = "anchor-to",
        ta = "dev-mode",
        na = "modal-title",
        ia = "modal-description",
        aa = "modal-logo-src",
        oa = "api-key",
        sa = "pop-up-name",
        ra = "pop-up-features",
        la = "modal-brand",
        ca = "consent-challenge",
        pa = "checkout-redirect-url",
        da = "checkout-version",
        ua = "shop-id",
        ma = "require-verification",
        ha = "first-name",
        _a = "last-name",
        ga = "checkout-token",
        fa = "transaction-params",
        ba = "shop-permanent-domain",
        ya = "source",
        va = {
            clientId: "",
            redirectType: "top_frame",
            responseType: "code",
            responseMode: "query",
            scope: "openid email pay:session_token profile",
            redirectUri: "",
            codeChallenge: "",
            codeChallengeMethod: "",
            state: ""
        };

    function ka(e) {
        return a(this, arguments, void 0, (function*({
            loaderSelector: e,
            inputSelector: t,
            inputWrapperSelector: n,
            attributes: i,
            unixTimestamp: o,
            hiddenClassName: s
        }) {
            var r;
            const l = I(),
                c = Zn.Default,
                p = new wn({
                    elementName: "new-customer-accounts-passkeys",
                    analyticsTraceId: l
                }),
                d = Object.assign(Object.assign({}, va), i);
            p.trackShopLoginFirstTimeRender("sdk-rendered", o);
            const u = document.createElement("shop-login-button");
            u.setAttribute("id", "hidden-button-identity"), u.setAttribute("version", "1"), u.setAttribute("response-type", d.responseType), u.setAttribute("response-mode", d.responseMode), u.setAttribute("redirect-type", "top_frame"), u.setAttribute("scope", d.scope), u.setAttribute("action", "default"), u.setAttribute("analytics-context", Ln.SelfServe), u.setAttribute("analytics-trace-id", l), u.setAttribute("flow", c), u.setAttribute("hide-button", ""), u.setAttribute("disable-sign-up", ""), u.setAttribute("auto-open", ""), u.setAttribute("consent-challenge", ""), u.setAttribute("client-id", d.clientId), u.setAttribute("redirect-uri", d.redirectUri), u.setAttribute("state", d.state), u.setAttribute("code-challenge", d.codeChallenge), u.setAttribute("code-challenge-method", d.codeChallengeMethod);
            const m = yield function() {
                return a(this, void 0, void 0, (function*() {
                    var e, t;
                    return null === (t = null === (e = null === window || void 0 === window ? void 0 : window.PublicKeyCredential) || void 0 === e ? void 0 : e.isConditionalMediationAvailable) || void 0 === t ? void 0 : t.call(e)
                }))
            }(), h = document.querySelector(e), _ = document.querySelector(t), g = document.querySelector(n);
            return m ? Ci({
                loader: h,
                target: _,
                targetWrapper: g,
                attributes: d,
                analyticsTraceId: l,
                analyticsContext: Ln.SelfServe,
                flow: c,
                hiddenClassName: s,
                onLoaded: () => {
                    p.trackShopLoginFirstTimeRender("iframed-input-rendered", o), document.getElementById("shop-login-email-input-iframe") && u.setAttribute(ea, "#shop-login-email-input-iframe")
                }
            }) : null == h || h.dispatchEvent(new Event("inputwillnotload")), u.setAttribute(ea, "div.next-input.combined-input-wrapper.type-ahead-wrapper"), Object.entries(D()).forEach((([e, t]) => {
                u.setAttribute(e, t)
            })), null === (r = g.parentNode) || void 0 === r || r.insertBefore(u, g), u.listenToInput(_), u
        }))
    }

    function wa(e) {
        console.error(`[shop-js] ${e}`)
    }
    const Pa = {
        brand: "#5a31f4",
        white: "#fff",
        black: "#000",
        warning: "#d02e11",
        close: "#707070",
        foregroundSecondary: "#3F454D",
        backgroundSubdued: "#F2F3F5",
        backgroundError: "#FFECE9",
        backgroundFaint: "#F2F4F5",
        error: "#D02E11"
    };

    function Sa(e) {
        let t = 0,
            n = 0,
            i = 0;
        return 4 === e.length ? (t = Number(`0x${e[1]}${e[1]}`), n = Number(`0x${e[2]}${e[2]}`), i = Number(`0x${e[3]}${e[3]}`)) : 7 === e.length && (t = Number(`0x${e[1]}${e[2]}`), n = Number(`0x${e[3]}${e[4]}`), i = Number(`0x${e[5]}${e[6]}`)), [t, n, i]
    }

    function za(e) {
        const t = e.match(/\d+/g) || [],
            [n = 0, i = 0, a = 0] = t.map((e => Number(e)));
        return [n, i, a]
    }

    function ja(e) {
        const t = [90, 49, 244],
            n = [255, 255, 255];
        let i = [255, 255, 255];
        return e.startsWith("#") ? i = Sa(e) : e.startsWith("rgb(") && (i = za(e)), La(i, t) > La(i, n) ? t : n
    }

    function Ca(e, t) {
        return La(e.startsWith("#") ? Sa(e) : za(e), t.startsWith("#") ? Sa(t) : za(t))
    }

    function xa(e, t, n) {
        const i = [e, t, n].map((function(e) {
            const t = e / 255;
            return t <= .03928 ? t / 12.92 : Math.pow((t + .055) / 1.055, 2.4)
        }));
        return .2126 * i[0] + .7152 * i[1] + .0722 * i[2]
    }

    function La(e, t) {
        const n = xa(e[0], e[1], e[2]),
            i = xa(t[0], t[1], t[2]);
        return (Math.max(n, i) + .05) / (Math.min(n, i) + .05)
    }

    function Aa(e) {
        var t;
        const n = null === (t = window.getComputedStyle(e).getPropertyValue("--color-background")) || void 0 === t ? void 0 : t.trim();
        if (n) return n;
        for (const t of function*(e) {
                let t = e;
                for (; t;) {
                    if (t.parentElement) t = t.parentElement;
                    else if (t instanceof ShadowRoot) t = t.host;
                    else {
                        if (!(t instanceof Element)) break; {
                            const e = t.getRootNode();
                            if (!(e instanceof ShadowRoot)) break;
                            t = e.host
                        }
                    }
                    if (yield t, t === document.body) break
                }
            }(e)) {
            const e = window.getComputedStyle(t).getPropertyValue("background-color");
            if (e && "rgba(0, 0, 0, 0)" !== e) return e
        }
        return "#ffffff"
    }
    class Ta extends HTMLElement {
        constructor() {
            super();
            const e = document.createElement("template"),
                t = this.getAttribute("size") || "",
                n = this.getAttribute("background-color") || "#FFF";
            e.innerHTML = function(e, t) {
                const n = "large" === e ? "shop-pay-logo-large" : "shop-pay-logo",
                    [i, a, o] = ja(t),
                    s = `rgb(${i}, ${a}, ${o})`;
                return `\n    <style>\n      .shop-pay-logo {\n        height: 14px;\n        width: 59px;\n        vertical-align: middle;\n        margin-bottom: 1px;\n      }\n\n      .shop-pay-logo-large {\n        height: 21px;\n        width: 88px;\n        vertical-align: middle;\n      }\n    </style>\n    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" class="${n}" viewBox="0 0 341 81" fill="none">\n      <path fill-rule="evenodd" clip-rule="evenodd" d="M227.297 0C220.448 0 214.896 5.47237 214.896 12.2229V67.8125C214.896 74.563 220.448 80.0354 227.297 80.0354H328.357C335.206 80.0354 340.758 74.563 340.758 67.8125V12.2229C340.758 5.47237 335.206 0 328.357 0H227.297ZM244.999 55.8917V41.8012H253.993C262.21 41.8012 266.579 37.2604 266.579 30.379C266.579 23.4976 262.21 19.3782 253.993 19.3782H239.205V55.8917H244.999ZM244.999 24.8084H252.663C257.982 24.8084 260.595 26.9617 260.595 30.5663C260.595 34.1708 258.077 36.3242 252.9 36.3242H244.999V24.8084ZM276.795 56.6407C281.212 56.6407 284.109 54.7214 285.439 51.4445C285.819 55.0959 288.052 56.9684 292.896 55.7044L292.944 51.819C290.996 52.0063 290.616 51.3041 290.616 49.2912V39.7415C290.616 34.124 286.864 30.8003 279.93 30.8003C273.09 30.8003 269.148 34.1708 269.148 39.8819H274.468C274.468 37.1668 276.415 35.5284 279.835 35.5284C283.444 35.5284 285.107 37.0732 285.059 39.7415V40.9586L278.932 41.614C272.045 42.3629 268.246 44.9376 268.246 49.4316C268.246 53.1298 270.905 56.6407 276.795 56.6407ZM277.982 52.4276C274.99 52.4276 273.803 50.836 273.803 49.2443C273.803 47.091 276.273 46.1079 281.117 45.5462L284.917 45.1249C284.679 49.2443 281.877 52.4276 277.982 52.4276ZM310.537 57.7174C308.115 63.5221 304.22 65.2541 298.141 65.2541H295.528V60.4793H298.331C301.655 60.4793 303.27 59.4494 305.028 56.5002L294.246 31.5493H300.23L307.925 49.7593L314.764 31.5493H320.606L310.537 57.7174Z" fill="${s}"/>\n      <path d="M29.5136 35.1798C21.5797 33.4835 18.0451 32.8197 18.0451 29.8064C18.0451 26.9722 20.4371 25.5604 25.221 25.5604C29.4282 25.5604 32.5036 27.3726 34.7674 30.9232C34.9382 31.1972 35.2906 31.292 35.5789 31.1445L44.506 26.6983C44.8263 26.5402 44.9438 26.1399 44.7623 25.8343C41.0569 19.5022 34.2121 16.0358 25.1996 16.0358C13.3574 16.0358 6 21.7885 6 30.9338C6 40.648 14.9591 43.1029 22.9038 44.7992C30.8484 46.4955 34.3936 47.1592 34.3936 50.1725C34.3936 53.1858 31.8095 54.6082 26.6518 54.6082C21.8893 54.6082 18.3548 52.4589 16.2191 48.2866C16.059 47.981 15.6852 47.8546 15.3756 48.0127L6.46985 52.364C6.16017 52.5221 6.03203 52.8908 6.19221 53.2069C9.72673 60.2134 16.9773 64.1538 26.6625 64.1538C38.996 64.1538 46.4494 58.496 46.4494 49.0663C46.4494 39.6365 37.4476 36.8972 29.5136 35.2009V35.1798Z" fill="${s}"/>\n      <path d="M77.3525 16.0358C72.291 16.0358 67.8168 17.8059 64.6026 20.9561C64.3997 21.1458 64.0687 21.0088 64.0687 20.7349V0.621625C64.0687 0.273937 63.791 0 63.4387 0H52.2692C51.9168 0 51.6391 0.273937 51.6391 0.621625V63.0476C51.6391 63.3952 51.9168 63.6692 52.2692 63.6692H63.4387C63.791 63.6692 64.0687 63.3952 64.0687 63.0476V35.6644C64.0687 30.3754 68.1798 26.319 73.7219 26.319C79.2639 26.319 83.279 30.2911 83.279 35.6644V63.0476C83.279 63.3952 83.5566 63.6692 83.909 63.6692H95.0785C95.4309 63.6692 95.7085 63.3952 95.7085 63.0476V35.6644C95.7085 24.1591 88.0628 16.0464 77.3525 16.0464V16.0358Z" fill="${s}"/>\n      <path d="M118.389 14.2552C112.324 14.2552 106.622 16.0779 102.542 18.7224C102.265 18.9016 102.169 19.2703 102.34 19.5548L107.262 27.8466C107.444 28.1416 107.828 28.247 108.127 28.0679C111.224 26.2241 114.769 25.2653 118.389 25.2864C128.138 25.2864 135.303 32.0716 135.303 41.0377C135.303 48.6763 129.569 54.3342 122.297 54.3342C116.371 54.3342 112.26 50.9311 112.26 46.1266C112.26 43.3767 113.445 41.122 116.531 39.5311C116.851 39.3625 116.969 38.9727 116.777 38.6671L112.132 30.9126C111.982 30.6598 111.662 30.5439 111.373 30.6492C105.148 32.925 100.78 38.4037 100.78 45.7579C100.78 56.8839 109.761 65.1863 122.287 65.1863C136.916 65.1863 147.434 55.1876 147.434 40.8481C147.434 25.476 135.197 14.2446 118.368 14.2446L118.389 14.2552Z" fill="${s}"/>\n      <path d="M180.098 15.9515C174.449 15.9515 169.409 18.006 165.725 21.6304C165.522 21.8306 165.191 21.6831 165.191 21.4092V17.0473C165.191 16.6996 164.914 16.4256 164.561 16.4256H153.68C153.328 16.4256 153.05 16.6996 153.05 17.0473V79.3784C153.05 79.7261 153.328 80 153.68 80H164.849C165.202 80 165.48 79.7261 165.48 79.3784V58.9385C165.48 58.6645 165.811 58.5276 166.013 58.7067C169.687 62.0782 174.545 64.0485 180.109 64.0485C193.211 64.0485 203.43 53.5862 203.43 39.9947C203.43 26.4032 193.2 15.941 180.109 15.941L180.098 15.9515ZM177.995 53.4914C170.541 53.4914 164.892 47.6439 164.892 39.9104C164.892 32.177 170.53 26.3295 177.995 26.3295C185.459 26.3295 191.086 32.0822 191.086 39.9104C191.086 47.7387 185.533 53.4914 177.984 53.4914H177.995Z" fill="${s}"/>\n    </svg>\n  `
            }(t, n), this.attachShadow({
                mode: "open"
            }).appendChild(e.content.cloneNode(!0))
        }
    }
    class Ea extends HTMLElement {
        constructor() {
            super()
        }
        updateAttribute(e, t) {
            this.getAttribute(e) !== t && (t ? this.setAttribute(e, t) : this.removeAttribute(e))
        }
        getBooleanAttribute(e) {
            const t = this.getAttribute(e);
            return null != t
        }
        dispatchCustomEvent(e, t) {
            const n = new CustomEvent(e, {
                bubbles: "error" !== e,
                cancelable: !1,
                composed: !0,
                detail: t
            });
            this.dispatchEvent(n)
        }
    }
    var Ia, Ma, Oa, Na;
    class qa extends HTMLElement {
        constructor() {
            super(), Ia.set(this, void 0), s(this, Ia, this.attachShadow({
                mode: "open"
            }), "f")
        }
        connectedCallback() {
            const e = document.createElement("template"),
                t = this.getAttribute("size") || "",
                n = this.getAttribute("color") || "",
                i = this.getAttribute("label") || "";
            e.innerHTML = function(e, t = "brand", n) {
                return `\n    <style>\n      @keyframes revealIcon {\n        to {\n          stroke-dashoffset: 408;\n        }\n      }\n\n      @keyframes infiniteSpin {\n        0% {\n          transform: rotate(0deg);\n        }\n\n        100% {\n          transform: rotate(360deg);\n        }\n      }\n\n      .Wrapper {\n        display: block;\n\n        @media screen and (-ms-high-contrast: active),\n          screen and (-ms-high-contrast: none) {\n\n        }\n      }\n\n      .ShopLogo {\n        stroke-dashoffset: 136;\n        stroke-dasharray: 136;\n        animation: revealIcon 1.3s ease-in-out 0s reverse infinite;\n\n        // Target IE11 and provide a fallback animation\n        @media screen and (-ms-high-contrast: active),\n          screen and (-ms-high-contrast: none) {\n          stroke-dasharray: 0;\n        }\n      }\n    </style>\n    <svg\n      class="Wrapper"\n      fill="none"\n      width=${e}\n      height=${e}\n      viewBox="0 0 52 58"\n      xmlns="http://www.w3.org/2000/svg"\n    >\n      <title>${n}</title>\n      <path\n        class="ShopLogo"\n        d="M3 13C5 11.75 10.4968 6.92307 21.5 6.4999C34.5 5.99993 42 13 45 23C48.3 34 42.9211 48.1335 30.5 51C17.5 54 6.6 46 6 37C5.46667 29 10.5 25 14 23"\n        stroke=${Pa[t]}\n        stroke-width="11"\n      />\n    </svg>\n  `
            }(t, n, i), o(this, Ia, "f").appendChild(e.content.cloneNode(!0))
        }
    }
    Ia = new WeakMap, customElements.get("animated-shop-logo") || customElements.define("animated-shop-logo", qa);
    class Ra extends HTMLElement {
        constructor() {
            super(), Ma.set(this, void 0), s(this, Ma, this.attachShadow({
                mode: "open"
            }), "f")
        }
        connectedCallback() {
            const e = document.createElement("template"),
                t = this.getAttribute("size") || "";
            e.innerHTML = function(e) {
                return `\n    <style>\n\n      @keyframes infiniteSpin {\n        0% {\n          transform: rotate(0deg);\n        }\n\n        100% {\n          transform: rotate(360deg);\n        }\n      }\n\n\n      .Wrapper {\n        fill: #5433EB;\n        animation: infiniteSpin 1.3s linear infinite;\n      }\n    </style>\n    <div>\n    <svg fill="none"\n    width=${e}\n    height=${e} viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" class="Wrapper">\n        <path class="LargeSpinner" d="M15.542 1.487A21.507 21.507 0 00.5 22c0 11.874 9.626 21.5 21.5 21.5 9.847 0 18.364-6.675 20.809-16.072a1.5 1.5 0 00-2.904-.756C37.803 34.755 30.473 40.5 22 40.5 11.783 40.5 3.5 32.217 3.5 22c0-8.137 5.3-15.247 12.942-17.65a1.5 1.5 0 10-.9-2.863z" />\n    </svg>\n    </div>\n  `
            }(t), o(this, Ma, "f").appendChild(e.content.cloneNode(!0))
        }
    }
    Ma = new WeakMap, customElements.get("large-spinner") || customElements.define("large-spinner", Ra);
    class Da extends HTMLElement {
        constructor() {
            super();
            const e = document.createElement("template"),
                t = this.getAttribute("size") || "",
                n = this.getAttribute("compact"),
                i = null != n;
            e.innerHTML = i ? function(e) {
                return `\n    <style>\n      :host {\n        display: flex;\n      }\n\n      svg path {\n        fill: var(--icon-color, ${Pa.backgroundFaint});\n      }\n    </style>\n    <svg\n        aria-hidden="true"\n        width=${e}\n        height=${e}\n        viewBox="0 0 20 20"\n        fill="none"\n        xmlns="http://www.w3.org/2000/svg"\n    >\n      <path fill-rule="evenodd" clip-rule="evenodd" d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10ZM7.70711 6.29289C7.31658 5.90237 6.68342 5.90237 6.29289 6.29289C5.90237 6.68342 5.90237 7.31658 6.29289 7.70711L8.58579 10L6.29289 12.2929C5.90237 12.6834 5.90237 13.3166 6.29289 13.7071C6.68342 14.0976 7.31658 14.0976 7.70711 13.7071L10 11.4142L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L11.4142 10L13.7071 7.70711C14.0976 7.31658 14.0976 6.68342 13.7071 6.29289C13.3166 5.90237 12.6834 5.90237 12.2929 6.29289L10 8.58579L7.70711 6.29289Z" fill="currentColor"/>\n    </svg>\n  `
            }(t) : function(e) {
                return `\n    <style>\n      :host {\n        display: flex;\n      }\n\n      svg path {\n        fill: var(--icon-color, ${Pa.close});\n      }\n    </style>\n    <svg\n        aria-hidden="true"\n        width=${e}\n        height=${e}\n        viewBox="0 0 17 16"\n        fill="none"\n        xmlns="http://www.w3.org/2000/svg"\n    >\n        <path\n            d="M16.4875 1.5877L14.9125 0.0126953L8.5 6.4252L2.0875 0.0126953L0.512497 1.5877L6.925 8.0002L0.512497 14.4127L2.0875 15.9877L8.5 9.5752L14.9125 15.9877L16.4875 14.4127L10.075 8.0002"\n        />\n    </svg>\n  `
            }(t), this.attachShadow({
                mode: "open"
            }).appendChild(e.content.cloneNode(!0))
        }
    }
    const Ba = "shop-discount-icon",
        Fa = "24",
        Va = "variant";
    var $a, Wa, Ua;
    ! function(e) {
        e.Regular = "regular", e.Subdued = "subdued", e.Branded = "branded"
    }($a || ($a = {}));
    class Ha extends Ea {
        static get observedAttributes() {
            return [Va]
        }
        constructor() {
            super(), Oa.set(this, void 0), Na.set(this, null);
            const e = document.createElement("template");
            e.innerHTML = `\n    <style>\n      :host {\n        display: inline-block;\n        height: ${Fa}px;\n      }\n\n      svg {\n        font-size: 0;\n      }\n\n      svg path {\n        stroke-width: 2;\n      }\n\n      svg path, svg circle {\n        transition: fill 200ms ease-in-out, stroke 200ms ease-in-out;\n      }\n\n      .${Ba}--${$a.Regular} path {\n        fill: ${Pa.white};\n        stroke: ${Pa.foregroundSecondary};\n      }\n\n      .${Ba}--${$a.Regular} circle {\n        fill: ${Pa.foregroundSecondary};\n        stroke: ${Pa.foregroundSecondary};\n      }\n\n      .${Ba}--${$a.Subdued} path {\n        fill: ${Pa.backgroundSubdued};\n        stroke: ${Pa.foregroundSecondary};\n      }\n\n      .${Ba}--${$a.Subdued} circle {\n        fill: ${Pa.foregroundSecondary};\n        stroke: ${Pa.foregroundSecondary};\n      }\n\n      .${Ba}--${$a.Branded} path {\n        fill: ${Pa.brand};\n        stroke: ${Pa.brand};\n      }\n\n      .${Ba}--${$a.Branded} circle {\n        fill: ${Pa.white};\n        stroke: ${Pa.white};\n      }\n    </style>\n    <svg\n      width="25"\n      height="${Fa}"\n      viewBox="0 0 25 24"\n      fill="none"\n      xmlns="http://www.w3.org/2000/svg"\n    >\n      <path d="M1.83337 11.1238V3.82557L4.64039 1.01855H11.9386L23.1667 12.2466L13.0614 22.3519L1.83337 11.1238Z" />\n      <circle cx="7.44727" cy="6.63245" r="1.18421" />\n    </svg>\n  `, s(this, Oa, this.attachShadow({
                mode: "open"
            }), "f"), o(this, Oa, "f").appendChild(e.content.cloneNode(!0)), s(this, Na, o(this, Oa, "f").querySelector("svg"), "f")
        }
        connectedCallback() {
            const e = this.getAttribute(Va);
            this._initVariant(e)
        }
        disconnectedCallback() {}
        attributeChangedCallback(e, t, n) {
            if (e === Va) this._initVariant(n)
        }
        _initVariant(e) {
            var t;
            const n = Object.values($a),
                i = e && n.includes(e) ? e : $a.Regular;
            null === (t = o(this, Na, "f")) || void 0 === t || t.setAttribute("class", `${Ba}--${i}`)
        }
    }
    Oa = new WeakMap, Na = new WeakMap, customElements.get(Ba) || customElements.define(Ba, Ha);
    const Ka = "shop-heart-icon",
        Za = "15";
    class Ga extends HTMLElement {
        constructor() {
            var e;
            super(), Wa.set(this, void 0), Ua.set(this, null);
            const t = document.createElement("template");
            t.innerHTML = `\n    <style>\n      :host {\n        display: inline-block;\n        height: ${Za}px;\n        color: #ffffff;\n      }\n\n      svg {\n        font-size: 0;\n      }\n\n      .${Ka}__filled-path,\n      .${Ka}--filled .${Ka}__regular-path {\n        display: none;\n      }\n\n      .${Ka}--filled .${Ka}__filled-path {\n        display: inline;\n      }\n\n      svg path {\n        /* currentColor allows for a forced-colors to override the svg colors */\n        fill: currentColor;\n      }\n\n    </style>\n    <svg width="16" height="${Za}" viewBox="0 0 16 ${Za}" fill="none" xmlns="http://www.w3.org/2000/svg">\n      <path class="${Ka}__regular-path" fill-rule="evenodd" clip-rule="evenodd" d="M6.54472 2.60954C5.45403 1.48463 3.70006 1.48464 2.60939 2.60958C1.50057 3.75323 1.50057 5.62073 2.60939 6.76438L7.99999 12.3243L13.3871 6.76795L13.4392 6.713C14.4985 5.56641 14.4826 3.73943 13.3938 2.61293L13.3408 2.55942C12.248 1.4854 10.53 1.50107 9.45523 2.60958L7.99989 4.11061L6.54472 2.60954ZM1.32887 1.38465C3.11884 -0.461548 6.0353 -0.461548 7.82527 1.38465L7.99998 1.56487L8.17472 1.38465C9.93952 -0.435601 12.8002 -0.461712 14.5965 1.30944L14.6036 1.31645L14.6711 1.38461C16.4188 3.18714 16.4422 6.0802 14.744 7.91243L14.7372 7.91974L14.6711 7.98935L7.99999 14.87L1.32887 7.98931C-0.442958 6.16182 -0.442958 3.21214 1.32887 1.38465Z" />\n      <path class="${Ka}__filled-path" fill-rule="evenodd" clip-rule="evenodd" d="M1.30822 1.36997C3.06735 -0.456657 5.93121 -0.456657 7.69034 1.36997L7.99997 1.69153L8.30965 1.36997C10.0441 -0.43103 12.8532 -0.456731 14.6184 1.29546L14.6242 1.30123L14.6918 1.36994C16.4122 3.15636 16.4354 6.02587 14.7635 7.84188L14.758 7.8479L14.6918 7.91809L7.99999 14.8666L1.30822 7.91806C-0.436073 6.10684 -0.436073 3.1812 1.30822 1.36997Z" />\n    </svg>\n  `, s(this, Wa, this.attachShadow({
                mode: "open"
            }), "f"), o(this, Wa, "f").appendChild(t.content.cloneNode(!0)), s(this, Ua, o(this, Wa, "f").querySelector("svg"), "f"), null === (e = o(this, Ua, "f")) || void 0 === e || e.setAttribute("class", `${Ka}--regular`)
        }
        setFilled(e = !0) {
            var t;
            null === (t = o(this, Ua, "f")) || void 0 === t || t.setAttribute("class", `${Ka}--${e?"filled":"regular"}`)
        }
    }

    function Ja() {
        return document.createElement(Ka)
    }
    Wa = new WeakMap, Ua = new WeakMap, customElements.get(Ka) || customElements.define(Ka, Ga);
    class Ya extends HTMLElement {
        constructor() {
            super();
            const e = document.createElement("template"),
                t = this.getAttribute("size") || "",
                n = this.getAttribute("color") || "",
                i = this.getAttribute("label") || "";
            e.innerHTML = function(e, t = "brand", n) {
                const i = Math.ceil(parseInt(e, 10) * Qa),
                    a = Pa[t];
                return `\n    <style>\n      :host {\n        color: ${a};\n      }\n\n      svg path {\n        /* currentColor allows for a forced-colors to override the svg colors */\n        fill: currentColor;\n      }\n    </style>\n    <svg\n      role="img"\n      width=${i}\n      height=${e}\n      viewBox="0 0 65 26"\n      aria-labelledby="shop-logo"\n      fill="none"\n      xmlns="http://www.w3.org/2000/svg"\n    >\n      <title id="shop-logo">${n}</title>\n      <path\n        d="M12.5782 8.5748L9.35595 10.1981C8.61942 8.94227 7.6067 8.2992 6.19532 8.2992C4.66089 8.2992 3.89339 8.75853 3.89281 9.6772C3.89281 10.6574 5.02886 10.8715 7.5763 11.4227C10.1237 11.9739 13.0125 12.7703 13.0125 15.9241C13.0125 18.9869 10.6188 20.8243 6.65999 20.8243C3.46809 20.8243 1.10131 19.4766 0 17.0881L3.2223 15.496C3.89716 16.9693 5.0636 17.7311 6.65999 17.7311C8.31717 17.7311 9.14576 17.2718 9.14576 16.2916C9.14576 15.3114 8.0071 15.0973 5.45619 14.5461C2.90528 13.9949 0.027794 13.1985 0.027794 10.0447C0.027794 7.07373 2.3911 5.20607 6.19445 5.20607C9.17355 5.20607 11.4144 6.40033 12.5782 8.5748Z"\n      />\n      <path\n        d="M15.281 0H19.2711V6.98187C20.3133 5.84913 21.8176 5.20607 23.5365 5.20607C26.9742 5.20607 29.4295 7.83987 29.4295 11.5761V20.67H25.4394V11.5761C25.4394 9.8306 24.1505 8.54273 22.37 8.54273C20.5895 8.54273 19.2711 9.8592 19.2711 11.5761V20.67H15.281V0Z"\n      />\n      <path\n        d="M32.0378 6.30846C33.358 5.3898 35.2601 4.74846 37.2864 4.74846C42.6878 4.74846 46.6163 8.3928 46.6163 13.3848C46.6163 18.0388 43.2402 21.2853 38.544 21.2853C34.5235 21.2853 31.6391 18.5909 31.6391 14.9769C31.6391 12.5268 33.1156 10.7198 35.2001 10.0161L36.8877 12.8639C35.7525 13.3839 35.3243 14.1501 35.3243 15.0991C35.3243 16.6591 36.6445 17.7641 38.5466 17.7641C40.8795 17.7641 42.7209 15.9259 42.7209 13.4455C42.7209 10.5361 40.4192 8.33213 37.289 8.33213C36.0587 8.32254 34.8527 8.67394 33.8209 9.34266L32.0378 6.30846Z"\n      />\n      <path\n        d="M52.8152 18.9254V26H48.826V5.35947H52.7231V7.22714C53.9209 5.941 55.6084 5.20607 57.5114 5.20607C61.716 5.20607 65 8.60513 65 13.0156C65 17.4261 61.716 20.8243 57.5114 20.8243C55.6388 20.8243 54.0121 20.1197 52.8152 18.9254ZM61.0403 12.9844C61.0403 10.4425 59.2607 8.5748 56.8357 8.5748C54.442 8.5748 52.6311 10.4737 52.6311 12.9844C52.6311 15.4951 54.442 17.3949 56.8357 17.3949C59.2607 17.3949 61.0429 15.5263 61.0429 12.9844H61.0403Z"\n      />\n    </svg>\n  `
            }(t, n, i), this.attachShadow({
                mode: "open"
            }).appendChild(e.content.cloneNode(!0))
        }
    }
    const Qa = 2.5;

    function Xa(e) {
        return e === rt.Mobile ? "translate(0, 100%)" : ""
    }

    function eo() {
        return {
            easing: "cubic-bezier(0.32,0.72,0,1)",
            duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 400
        }
    }

    function to(e) {
        const t = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        return Array.from(e.assignedElements()).reduce(((e, n) => {
            const i = Array.from(n.querySelectorAll(t));
            return n.matches(t) && i.unshift(n), [...e, ...i]
        }), [])
    }
    const no = "busy",
        io = "disable-popup",
        ao = "title",
        oo = ["Escape", "Esc"],
        so = "anchor-to",
        ro = "light-overlay",
        lo = "anchor-position",
        co = "compact",
        po = "headerless";
    class uo extends Ea {
        static get observedAttributes() {
            return [no, ao, so, Fi, la, ro, lo]
        }
        constructor() {
            super(), this._shown = !1, this._busy = !1, this._animating = !1, this._popupDisabled = !1, this._compact = !1, this._headerless = !1, this._overFlowPreviousValue = "", this._focusHandler = e => {
                this._firstFocusableElement && e.target === this._focusableEndButton && this._firstFocusableElement.focus(), this._lastFocusableElement && e.target === this._focusableStartButton && this._lastFocusableElement.focus()
            }, customElements.get("shop-close-icon") || customElements.define("shop-close-icon", Da), customElements.get("shop-logo") || customElements.define("shop-logo", Ya), customElements.get("shop-pay-logo") || customElements.define("shop-pay-logo", Ta), this._compact = this.getBooleanAttribute(co), this._headerless = this._compact && this.getBooleanAttribute(po);
            const e = document.createElement("template"),
                t = this._compact ? st : jn;
            if (e.innerHTML = t, this.attachShadow({
                    mode: "open"
                }).append(e.content.cloneNode(!0)), this._headerless) {
                this.shadowRoot.querySelector(`.${it}`).classList.add(at)
            }
        }
        connectedCallback() {
            var e;
            this._overlay = this.shadowRoot.querySelector(".sda-overlay"), this._modal = this.shadowRoot.querySelector(".sda-modal"), this._modal.style.overflow = "hidden", this._focusableStartButton = this._overlay.querySelector(".focus-trap--start"), this._focusableEndButton = this._overlay.querySelector(".focus-trap--end"), this._popupDisabled = Boolean(this.getAttribute(io)), null === (e = this._modal) || void 0 === e || e.classList.toggle(io, this._popupDisabled), this._closeButton = this.shadowRoot.querySelector(".sda-modal-close-button"), this._closableElements = [this._closeButton, this._overlay], this._overlay.addEventListener("click", this._handleClick.bind(this)), this._windowKeydownListener || (this._windowKeydownListener = this._handleKeyboard.bind(this), window.addEventListener("keydown", this._windowKeydownListener))
        }
        disconnectedCallback() {
            var e;
            this._windowKeydownListener && window.removeEventListener("keydown", this._windowKeydownListener), null === (e = this._modalPositioningCleanup) || void 0 === e || e.call(this)
        }
        attributeChangedCallback(e, t, n) {
            var i, a;
            switch (e) {
                case no:
                    this._busy = Boolean(n);
                    break;
                case io:
                    this._popupDisabled = Boolean(n), null === (i = this._modal) || void 0 === i || i.classList.toggle(io, this._popupDisabled);
                    break;
                case ao:
                    this._modal.setAttribute("aria-label", n || "");
                    break;
                case so:
                    {
                        const e = this.getAttribute(so);null !== e && "" !== e && (this._anchorElement = document.querySelector(e));
                        break
                    }
                case la:
                    {
                        const e = this.getAttribute(la),
                            t = null === (a = this.shadowRoot) || void 0 === a ? void 0 : a.querySelector(".sda-shop-logo");t.innerHTML = "shop-pay" === e ? '<shop-pay-logo aria-hidden="true" role="img" size="large"></shop-pay-logo>' : '<shop-logo role="img" size="20" color="brand" label="Shop"></shop-logo>';
                        break
                    }
                case ro:
                    {
                        const e = this.hasAttribute(ro);this._overlay.style.backgroundColor = e ? "rgba(0, 0, 0, 0.18)" : "rgba(0, 0, 0, 0.5)";
                        break
                    }
                case lo:
                    {
                        const e = this.getAttribute(lo);
                        if (!e) break;this._anchorPosition = e;
                        break
                    }
            }
        }
        setMonorailTracker(e) {
            this._monorailTracker = e
        }
        open(e) {
            return a(this, void 0, void 0, (function*() {
                if (this._shown) return;
                this._animating = !0, this._shown = !0, this._behavior = yield this._determineBehavior();
                const t = Object.assign({}, eo());
                this._modal.style.opacity = "0";
                const n = this._modalOverrides();
                this._overlay.classList.remove("sda-hidden"), this._overlay.animate([{
                    opacity: 0
                }, {
                    opacity: 1
                }], t);
                const {
                    cleanup: i,
                    updatePosition: o
                } = function({
                    anchorElement: e,
                    floatingElement: t,
                    overlayElement: n,
                    behavior: i = rt.Center
                }, o = {}, s) {
                    if (null === t) return pt;
                    const r = null == e && i !== rt.Mobile ? ct[rt.Center](t, n, o) : ct[i](t, n, o, s),
                        l = e || document.body,
                        c = () => a(this, void 0, void 0, (function*() {
                            const e = yield nt(l, t, r.config);
                            return r.fn(e)
                        }));
                    return {
                        cleanup: Je(l, t, c, {
                            ancestorScroll: !1,
                            ancestorResize: !0,
                            elementResize: !0,
                            animationFrame: !1
                        }),
                        updatePosition: c
                    }
                }({
                    anchorElement: this._anchorElement,
                    floatingElement: this._modal,
                    overlayElement: this._overlay,
                    behavior: this._behavior
                }, n, this._anchorPosition);
                this._modalPositioningCleanup = i;
                const s = yield o();
                if (this._overFlowPreviousValue = document.documentElement.style.overflow, document.documentElement.style.overflow = "hidden", this._behavior === rt.Dynamic && null !== s) {
                    const {
                        staticSide: e,
                        middlewareData: t
                    } = s, {
                        arrow: n
                    } = t;
                    "left" !== e && "right" !== e || (this._modal.style.transformOrigin = `${e} ${null==n?void 0:n.y}px`), "top" !== e && "bottom" !== e || (this._modal.style.transformOrigin = `${null==n?void 0:n.x}px ${e}`)
                }
                this._monorailTracker && this._monorailTracker.trackShopPayModalStateChange({
                    currentState: Zt.Shown,
                    reason: e
                });
                try {
                    const e = this._modal.animate(Object.keys(n).length ? [{
                        opacity: 0
                    }, {
                        opacity: 1
                    }] : (r = this._behavior) === rt.Dynamic ? [{
                        transform: "scale(0)",
                        opacity: 0
                    }, {
                        transform: "scale(1)",
                        opacity: 1
                    }] : [{
                        transform: Xa(r),
                        opacity: 0
                    }, {
                        transform: "none",
                        opacity: 1
                    }], Object.assign({}, t));
                    return yield e.finished, e
                } finally {
                    this._animating = !1, this._modal.style.opacity = "1", this._ensureModalIsInViewport(), this._setupFocusLock()
                }
                var r
            }))
        }
        close() {
            return a(this, arguments, void 0, (function*({
                reason: e,
                dismissMethod: t
            } = {}) {
                var n;
                if (this._busy || !this._shown) return Promise.resolve();
                this._animating = !0, this._resetFocus();
                const i = Object.assign({
                    duration: 200
                }, eo());
                var a;
                this._modal.animate((a = this._behavior, a === rt.Dynamic ? [{
                    transform: "scale(1)",
                    opacity: 1
                }, {
                    transform: "scale(0)",
                    opacity: 0
                }] : [{
                    transform: "translate(0, 0)",
                    opacity: 1
                }, {
                    transform: Xa(a),
                    opacity: 0
                }]), i).finished.finally((() => this._modal.style.display = "none"));
                const o = this._overlay.animate([{
                    opacity: 1
                }, {
                    opacity: 0
                }], Object.assign({}, i));
                this._monorailTracker && this._monorailTracker.trackShopPayModalStateChange({
                    currentState: Zt.Hidden,
                    reason: e,
                    dismissMethod: t
                });
                try {
                    yield o.finished
                } finally {
                    this._closeOnAnimationFinished(), null === (n = this._modalPositioningCleanup) || void 0 === n || n.call(this), document.documentElement.style.overflow = this._overFlowPreviousValue
                }
                return o
            }))
        }
        onContentLoaded() {
            this._modal.style.overflow = "visible"
        }
        setCloseButtonVisibility(e) {
            this._closeButton.style.display = e ? "" : "none"
        }
        removeDisplayElements() {
            var e;
            this.setCloseButtonVisibility(!1), this._modal.style.cssText = "border-radius: 0; padding: 0;";
            (null === (e = this.shadowRoot) || void 0 === e ? void 0 : e.querySelector(".sda-shop-logo")).style.display = "none";
            this.shadowRoot.querySelector(".sda-landing").style.width = "100%"
        }
        _modalOverrides() {
            const e = getComputedStyle(this._modal);
            return e.getPropertyValue("--sda-modal-top") && (e.getPropertyValue("--sda-modal-right") || e.getPropertyValue("--sda-modal-left")) ? {
                top: e.getPropertyValue("--sda-modal-top"),
                right: e.getPropertyValue("--sda-modal-right") || "auto",
                bottom: e.getPropertyValue("--sda-modal-bottom") || "auto",
                left: e.getPropertyValue("--sda-modal-left") || "auto"
            } : {}
        }
        _determineBehavior() {
            return a(this, void 0, void 0, (function*() {
                return L().width <= Sn || this._popupDisabled ? rt.Mobile : this._anchorElement ? rt.Dynamic : rt.Center
            }))
        }
        _closeOnAnimationFinished() {
            this._animating = !1, this._shown = !1, this._modal.style.display = "", this._overlay.classList.add("sda-hidden")
        }
        _handleKeyboard(e) {
            oo.includes(e.key) && this._handleCloseRequest(e)
        }
        _handleClick(e) {
            this._closableElements.includes(e.target) && this._handleCloseRequest(e)
        }
        _handleCloseRequest(e) {
            !this._shown || this._busy || this._animating || (e.stopPropagation(), this.dispatchCustomEvent("modalcloserequest"))
        }
        _ensureModalIsInViewport() {
            const e = new IntersectionObserver((t => a(this, void 0, void 0, (function*() {
                var n;
                for (const e of t) {
                    e.boundingClientRect.top < 0 && window.scrollTo({
                        top: 0,
                        left: 0
                    }), e.isIntersecting && (yield null === (n = this._monorailTracker) || void 0 === n ? void 0 : n.trackPageImpression({
                        page: Ht.AuthorizeModalInViewport,
                        allowDuplicates: !0
                    }))
                }
                e.disconnect()
            }))));
            e.observe(this._modal)
        }
        _setupFocusLock() {
            var e;
            const t = [this._closeButton, ...to(this._modal.querySelector("slot"))];
            this._firstFocusableElement = t[0], this._lastFocusableElement = t[t.length - 1];
            const n = this.getRootNode();
            (null === (e = n.activeElement) || void 0 === e ? void 0 : e.closest("shop-sheet-modal")) && n.activeElement.closest("shop-sheet-modal") === this || this._modal.focus(), this._overlay.addEventListener("focus", this._focusHandler, !0)
        }
        _resetFocus() {
            this._firstFocusableElement = void 0, this._lastFocusableElement = void 0, this._overlay.removeEventListener("focus", this._focusHandler, !0)
        }
    }
    customElements.get("shop-sheet-modal") || customElements.define("shop-sheet-modal", uo);
    const mo = () => {
        var e;
        return null === (e = null === window || void 0 === window ? void 0 : window.ShopPay) || void 0 === e ? void 0 : e.PaymentRequest
    };
    var ho, _o, go, fo, bo, yo, vo;
    class ko {
        static getDefaultLanguage() {
            var e, t;
            try {
                const n = (() => {
                        var e;
                        const t = mo();
                        if (t) return null === (e = null == t ? void 0 : t.configuration) || void 0 === e ? void 0 : e.locale
                    })(),
                    i = n || document.documentElement.lang || (null === (e = window.Shopify) || void 0 === e ? void 0 : e.locale);
                if (i) {
                    const e = new Intl.Locale(i);
                    if (_o.allowedLocales.includes(i)) return i;
                    if (_o.allowedLocales.includes(e.language)) return e.language;
                    t = `Unsupported locale: "${i}". Falling back to "en".`, console.log(`[shop-js] ${t}`)
                }
                for (const e of navigator.languages) {
                    if (_o.allowedLocales.includes(e)) return e;
                    const t = new Intl.Locale(e);
                    if (_o.allowedLocales.includes(t.language)) return t.language
                }
            } catch (e) {}
            return "en"
        }
        constructor(e) {
            ho.add(this), go.set(this, void 0), fo.set(this, _o.getDefaultLanguage()), s(this, go, e, "f")
        }
        get locale() {
            return o(this, fo, "f")
        }
        set locale(e) {
            _o.allowedLocales.includes(e) && s(this, fo, e, "f")
        }
        translate(e, t = {}) {
            const n = e.split(".");
            let i = o(this, go, "f")[o(this, fo, "f")];
            try {
                for (const e of n) switch (typeof i) {
                    case "object":
                        i = i[e];
                        break;
                    case "string":
                    case "undefined":
                        throw new ReferenceError
                }
                if (void 0 === i) throw new ReferenceError;
                return o(this, ho, "m", bo).call(this, i, t) && (i = i[o(this, ho, "m", yo).call(this, i, t.count)]), o(this, ho, "m", vo).call(this, i, t)
            } catch (n) {
                return t.defaultValue ? t.defaultValue : e
            }
        }
        isEnglish() {
            return "en" === o(this, fo, "f")
        }
    }
    _o = ko, go = new WeakMap, fo = new WeakMap, ho = new WeakSet, bo = function(e, t = {}) {
        return "string" != typeof e && "undefined" !== t.count
    }, yo = function(e, t) {
        let n = 1 === t ? "one" : "other";
        return 0 === t && "string" != typeof e && "undefined" !== e.zero && (n = "zero"), n
    }, vo = function(e, t = {}) {
        const n = e.match(/\{.+?\}/g);
        return n ? n.reduce(((e, n) => {
            const i = n.replace(/\{(.*)\}/, "$1");
            return t[i] ? e.replace(n, t[i]) : e
        }), e) : e
    }, ko.allowedLocales = ["en", "bg-BG", "cs", "da", "de", "el", "es", "fi", "fr", "hi", "hr-HR", "hu", "id", "it", "ja", "ko", "lt-LT", "ms", "nb", "nl", "pl", "pt-BR", "pt-PT", "ro-RO", "ru", "sk-SK", "sl-SI", "sv", "th", "tr", "vi", "zh-CN", "zh-TW"];
    class wo extends Ea {
        constructor() {
            super(...arguments), this._shopHub = ut.getInstance(), this._publisherId = x()
        }
        subscribeToHub(e, t) {
            this._shopHub.subscribe(e, this._publisherId, t)
        }
        unsubscribeAllFromHub() {
            this._shopHub.unsubscribeAll(this._publisherId)
        }
        unsubscribeFromHub(e) {
            this._shopHub.unsubscribe(e, this._publisherId)
        }
        publishToHub(e, t) {
            this._shopHub.publish(e, this._publisherId, t), e === dt.UserSessionCreate && (this.dispatchCustomEvent(dt.UserSessionCreate, t), this._dispatchStorefrontSignInCompleted(t))
        }
        _dispatchStorefrontSignInCompleted(e) {
            const {
                avatar: t,
                initial: n
            } = e, i = document.createElement("shop-user-avatar");
            i.setAttribute(Hn.Source, t || ""), i.setAttribute(Hn.Initial, n), this.dispatchCustomEvent("storefront:signincompleted", {
                avatar: i
            })
        }
    }
    const Po = {
            code: "temporarily_unavailable",
            message: "Shop login is temporarily unavailable"
        },
        So = "discount",
        zo = yn(),
        jo = Nt.createHttpProducer({
            production: !0,
            middleware: zo
        });
    class Co extends wn {
        constructor({
            analyticsTraceId: e,
            apiKey: t,
            elementName: n,
            flowVersion: i
        }) {
            super({
                elementName: n,
                analyticsTraceId: e,
                flow: So,
                flowVersion: i
            }), this._apiKey = t
        }
        update({
            apiKey: e,
            shopAccountUuid: t,
            flowVersion: n
        }) {
            e && (this._apiKey = e), t && (this._shopAccountUuid = t), n && (this._flowVersion = n)
        }
        trackShopPayLoginWithSdkDiscountStatus({
            discountCode: e
        }) {
            const t = {
                apiKey: this._apiKey,
                discountCode: e,
                flow: So,
                flowVersion: this._flowVersion,
                discountCodeStatus: "received",
                analyticsTraceId: this._analyticsTraceId,
                shopPermanentDomain: this._shopPermanentDomain
            };
            jo.produce({
                schemaId: Ut.ShopifyLoginWithShopSdkDiscountStatus,
                payload: t
            })
        }
        trackPageImpression(e) {
            const t = Object.create(null, {
                trackPageImpression: {
                    get: () => super.trackPageImpression
                }
            });
            return a(this, arguments, void 0, (function*({
                page: e
            }) {
                t.trackPageImpression.call(this, {
                    apiKey: this._apiKey,
                    shopAccountUuid: this._shopAccountUuid,
                    page: e
                })
            }))
        }
        trackShopPayLoginWithShopSdkUserAction({
            userAction: e
        }) {
            super.trackShopPayLoginWithShopSdkUserAction({
                apiKey: this._apiKey,
                userAction: e
            })
        }
        trackShopPayLoginWithSdkErrorEvents({
            errorCode: e,
            errorMessage: t
        }) {
            super.trackShopPayLoginWithSdkErrorEvents({
                apiKey: this._apiKey,
                errorCode: e,
                errorMessage: t
            })
        }
    }

    function xo(e, t) {
        return void 0 === t ? null : {
            [e]: t ? "true" : "false"
        }
    }

    function Lo(e, t) {
        var n, i;
        const a = null !== (i = null === (n = t.parentElement) || void 0 === n ? void 0 : n.offsetWidth) && void 0 !== i ? i : 0;
        return Math.min(a, e) || e
    }
    var Ao, To, Eo, Io, Mo, Oo, No, qo;
    const Ro = "shop-status-indicator";
    var Do;
    ! function(e) {
        e.Branded = "branded", e.Regular = "regular", e.Large = "large"
    }(Do || (Do = {}));
    class Bo extends HTMLElement {
        constructor() {
            super(), Ao.add(this), To.set(this, void 0), Eo.set(this, void 0), Io.set(this, void 0);
            const e = document.createElement("template");
            e.innerHTML = `\n    <style>\n      .${Ro} {\n        align-items: center;\n        background-color: #F2F3F5;\n        border-radius: 4px;\n        color: #5433EB;\n        display: flex;\n        font-size: 14px;\n        height: 42px;\n        justify-content: center;\n        padding: 0;\n      }\n\n      .${Ro}-message {\n        display: inline-flex;\n        align-items: center;\n        font-size: 16px;\n      }\n\n      .${Ro}-error {\n        background-color: ${Pa.backgroundError};\n        color: ${Pa.error};\n        text-align: left;\n      }\n\n      .${Ro}-branded {\n        background-color: ${Pa.brand};\n      }\n\n      .${Ro}-regular {\n        background-color: ${Pa.backgroundSubdued};\n      }\n\n      .${Ro}-large {\n        background-color: transparent;\n      }\n    </style>\n  `, s(this, To, this.attachShadow({
                mode: "open"
            }), "f"), o(this, To, "f").appendChild(e.content.cloneNode(!0)), s(this, Io, Do.Regular, "f")
        }
        connectedCallback() {
            o(this, Eo, "f") || (s(this, Eo, document.createElement("div"), "f"), o(this, Eo, "f").setAttribute("class", Ro), o(this, To, "f").appendChild(o(this, Eo, "f"))), s(this, Io, this.getAttribute("loader") || Do.Regular, "f")
        }
        setStatus(e) {
            switch (e.status) {
                case "loading":
                    o(this, Ao, "m", No).call(this, e.message);
                    break;
                case "success":
                case "error":
                    o(this, Ao, "m", qo).call(this, e)
            }
        }
    }

    function Fo(e = Do.Regular) {
        const t = document.createElement("shop-status-indicator");
        return t.setAttribute("loader", e), t
    }
    var Vo, $o, Wo, Uo, Ho, Ko;
    To = new WeakMap, Eo = new WeakMap, Io = new WeakMap, Ao = new WeakSet, Mo = function(e) {
        o(this, Eo, "f").innerHTML = "", o(this, Eo, "f").appendChild(e)
    }, Oo = function(e = "") {
        const t = [Ro, e || `${Ro}-regular`].join(" ");
        o(this, Eo, "f").setAttribute("class", t)
    }, No = function(e) {
        const t = "branded" === o(this, Io, "f") ? "white" : "brand",
            n = "large" === o(this, Io, "f") ? function() {
                const e = document.createElement("large-spinner");
                return e.setAttribute("role", "img"), e.setAttribute("size", "64"), e
            }() : function() {
                const e = document.createElement("animated-shop-logo");
                return e.setAttribute("role", "img"), e.setAttribute("size", "22"), e
            }();
        n.setAttribute("color", t), void 0 !== e && n.setAttribute("label", e);
        const i = `${Ro}-${o(this,Io,"f")}`;
        o(this, Ao, "m", Mo).call(this, n), o(this, Ao, "m", Oo).call(this, i)
    }, qo = function({
        status: e,
        message: t
    }) {
        if (void 0 !== t) {
            const e = document.createElement("span");
            e.setAttribute("class", `${Ro}-message`), e.textContent = t, o(this, Ao, "m", Mo).call(this, e)
        }
        o(this, Ao, "m", Oo).call(this, `${Ro}-${e}`)
    }, customElements.get("shop-status-indicator") || customElements.define("shop-status-indicator", Bo);
    const Zo = "shop-discount-code",
        Go = "code-visible",
        Jo = "subdued",
        Yo = "code",
        Qo = "saved";
    class Xo extends Ea {
        static get observedAttributes() {
            return [Yo, Qo]
        }
        constructor() {
            super(), Vo.set(this, void 0), $o.set(this, void 0), Wo.set(this, void 0), Uo.set(this, void 0), Ho.set(this, null), Ko.set(this, !1);
            const e = document.createElement("template");
            e.innerHTML = `\n    <style>\n      :host {\n        display: flex;\n        justify-content: center;\n      }\n\n      .${Zo} {\n        background: ${Pa.white};\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        border: 1px solid ${Pa.backgroundSubdued};\n        border-radius: 100px;\n        padding: 16px;\n        transition: background-color 200ms ease-in-out;\n      }\n\n      .${Zo}--${Go} {\n        padding: 16px 24px;\n      }\n\n      .${Zo}--${Jo} {\n        background: ${Pa.backgroundSubdued};\n      }\n\n      span {\n        font-weight: 600;\n        font-size: 16px;\n        line-height: 24px;\n        letter-spacing: 0.06em;\n        color: ${Pa.foregroundSecondary};\n        padding-left: 13px;\n        max-width: 160px;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n      }\n\n      span:empty {\n        padding-left: 0;\n      }\n    </style>\n  `, s(this, Vo, this.attachShadow({
                mode: "open"
            }), "f"), o(this, Vo, "f").appendChild(e.content.cloneNode(!0)), s(this, $o, document.createElement("div"), "f"), s(this, Uo, document.createElement(Ba), "f"), o(this, $o, "f").appendChild(o(this, Uo, "f")), s(this, Wo, document.createElement("span"), "f"), o(this, $o, "f").appendChild(o(this, Wo, "f")), o(this, Vo, "f").appendChild(o(this, $o, "f"))
        }
        connectedCallback() {
            const e = this.getAttribute(Yo);
            this._initCode(e);
            const t = Boolean(null !== this.getAttribute(Qo));
            this._initSaved(t)
        }
        attributeChangedCallback(e, t, n) {
            const i = Boolean(null !== n);
            switch (e) {
                case Yo:
                    this._initCode(n);
                    break;
                case Qo:
                    this._initSaved(i)
            }
        }
        disconnectedCallback() {}
        _updateStyles() {
            const e = [Zo];
            o(this, Ho, "f") && e.push(`${Zo}--${Go}`), o(this, Ko, "f") ? o(this, Uo, "f").setAttribute("variant", $a.Branded) : o(this, Ho, "f") ? (e.push(`${Zo}--${Jo}`), o(this, Uo, "f").setAttribute("variant", $a.Subdued)) : o(this, Uo, "f").setAttribute("variant", $a.Regular);
            const t = e.join(" ");
            o(this, $o, "f").setAttribute("class", t)
        }
        _initCode(e) {
            o(this, Wo, "f").textContent = e, s(this, Ho, e, "f"), this._updateStyles()
        }
        _initSaved(e) {
            s(this, Ko, e, "f"), this._updateStyles()
        }
    }
    Vo = new WeakMap, $o = new WeakMap, Wo = new WeakMap, Uo = new WeakMap, Ho = new WeakMap, Ko = new WeakMap, customElements.get("shop-discount-code") || customElements.define("shop-discount-code", Xo);
    class es {
        constructor(e, t, n, i) {
            this._onOpen = n, this._onClose = i, this._rootElement = e, H('\n    <template id="shop-discount-auth-landing">\n        <style>\n            :host {\n                display: block;\n                width: 100%;\n                font-family: -apple-system,San Francisco,Roboto,Segoe UI,Helvetica Neue,sans-serif !important;\n                text-align: center;\n                font-style: normal !important;\n                line-height: normal;\n            }\n\n            .sda-iframe {\n                width: 100%;\n                height: 0;\n                border: 0;\n                margin: auto;\n            }\n\n            .sda-header {\n                padding-bottom: 16px;\n                text-align: center;\n                -webkit-font-smoothing: antialiased;\n            }\n\n            .sda-header-divider {\n                border-bottom: 1px solid #D9D9D9;\n            }\n\n            .sda-header-title {\n                font-size: 18px;\n                font-weight: 700;\n                line-height: 25px;\n                letter-spacing: -0.2px;\n                color: #000000;\n                margin-bottom: 8px;\n            }\n\n            .sda-header-description {\n                font-size: 14px;\n                font-weight: 400;\n                color: #0F1721;\n                letter-spacing: 0px;\n            }\n\n            .sda-processing {\n                margin-bottom: 7px;\n            }\n\n            .sda-processing-user {\n                color: #0F1721;\n                font-family: -apple-system, BlinkMacSystemFont, San Francisco, Roboto, Segoe UI, Helvetica Neue, sans-serif;\n                font-size: 12px;\n                letter-spacing: 0px;\n                line-height: 21px;\n                margin: 12px 0;\n                min-height: 21px;\n                overflow: hidden;\n                text-align: left;\n                text-overflow: ellipsis;\n                text-rendering: optimizelegibility;\n                white-space: nowrap;\n                -webkit-font-smoothing: antialiased;\n            }\n\n            .sda-phone-capture {\n                margin: 0 20px;\n            }\n\n            .sda-phone-capture,\n            .sda-phone-capture a {\n                color: #424242;\n            }\n\n            .sda-phone-capture h3 {\n                font-size: 12px;\n                margin: 0px 0 5px 0;\n            }\n\n            .sda-disclosure {\n                border: 1px solid #eee;\n                border-radius: 5px;\n                margin-bottom: 24px;\n                padding: 10px;\n                text-align: left;\n            }\n\n            .sda-disclosure-text-container {\n                border: none;\n                width: 100%;\n            }\n\n            .sda-phone-capture button {\n                /* TODO: Centralize styling of shop branded buttons: https://github.com/Shopify/shop-identity/issues/1252 */\n                border: 0;\n                border-radius: 4px;\n                cursor: pointer;\n                font: 16px/18px -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica;\n                margin-bottom: 2px;\n                padding: 16px;\n                transition: background-color 100ms ease-in-out, opacity 100ms ease-out, color 100ms ease-in-out;\n                width: 100%;\n            }\n\n            .sda-phone-capture button:last-of-type {\n                margin-bottom: 0;\n            }\n\n            .sda-phone-capture button.primary {\n                background: #5433EB;\n                color: #fff;\n            }\n\n            .sda-phone-capture button.primary:hover {\n                background: #7f68e9;\n            }\n\n            .sda-phone-capture button.secondary {\n                background: none;\n                color: #5433EB;\n            }\n\n            .sda-phone-capture button.secondary:hover {\n                color: #7b61f0;\n            }\n\n            .sda-hidden {\n                position: absolute;\n                height: 0 !important;\n                border: 0;\n                padding: 0;\n                margin: 0;\n                visibility: hidden;\n                overflow: hidden;\n            }\n\n            discount-code {\n                margin: 0 20px;\n            }\n        </style>\n        <shop-sheet-modal data-nametag="shop-portal-provider" data-type="modal" data-variant="leadCapture">\n            <div class="sda-header sda-header-divider sda-hidden">\n                <h2 class="sda-header-title"></h2>\n                <div class="sda-header-description"></div>\n            </div>\n            <div class="sda-content">\n                <iframe class="sda-iframe sda-hidden" tabindex="0"></iframe>\n                <div class="sda-phone-capture sda-hidden">\n                    <div class="sda-disclosure">\n                        <h3 class="sda-disclosure-heading"></h3>\n                        <iframe sandbox="allow-same-origin allow-popups" class="sda-disclosure-text-container"></iframe>\n                    </div>\n                    <div class="sda-phone-capture-buttons">\n                        <button class="primary sda-phone-capture-confirm"></button>\n                        <button class="secondary sda-phone-capture-decline"></button>\n                    </div>\n                </div>\n                <div class="sda-processing sda-hidden">\n                    <div class="sda-processing-user"></div>\n                    <div class="sda-processing-status"></div>\n                </div>\n            </div>\n        </shop-sheet-modal>\n    </template>', "shop-discount-auth-landing", this._rootElement), this._sheetModal = this._rootElement.querySelector("shop-sheet-modal"), this._headerElement = this._rootElement.querySelector(".sda-header"), this._headerTitle = this._rootElement.querySelector(".sda-header-title"), this._headerDescription = this._rootElement.querySelector(".sda-header-description"), this._iframe = this._rootElement.querySelector(".sda-iframe"), this._discountCodeElement = document.createElement("shop-discount-code"), this._sheetModal.prepend(this._discountCodeElement), this._processingElement = this._rootElement.querySelector(".sda-processing"), this._processingUserElement = this._processingElement.querySelector(".sda-processing-user"), this._processingStatusElement = this._processingElement.querySelector(".sda-processing-status"), this._phoneCaptureContainer = this._rootElement.querySelector(".sda-phone-capture"), this._phoneCaptureButtonsContainer = this._phoneCaptureContainer.querySelector(".sda-phone-capture-buttons"), this._phoneConsentConfirmButton = this._phoneCaptureContainer.querySelector(".sda-phone-capture-confirm"), this._phoneConsentDeclineButton = this._phoneCaptureContainer.querySelector(".sda-phone-capture-decline"), this._disclosureIframe = this._rootElement.querySelector("iframe.sda-disclosure-text-container"), this._sheetModal.addEventListener("modalcloserequest", t), T(this._iframe, "allow", "publickey-credentials-get *")
        }
        updateSheetContent({
            headerVisible: e,
            title: t,
            description: n,
            headerDivider: i,
            processingElementVisible: a,
            processingUserElementVisible: o,
            processingUser: s,
            phoneCaptureContainerVisible: r,
            phoneCaptureButtonsContainerVisible: l,
            phoneConsentConfirmButton: c,
            phoneConsentDeclineButton: p,
            disclosureHeading: d,
            disclosureText: u,
            iframeVisible: m,
            statusIndicator: h,
            discountVisible: _,
            discountCode: g
        }) {
            var f;
            if (void 0 !== e && ts(this._headerElement, e), void 0 !== t && (this._headerTitle.textContent = t), void 0 !== n && (this._headerDescription.textContent = n), void 0 !== i && this._headerElement.classList.toggle("sda-header-divider", i), void 0 !== o && ts(this._processingUserElement, o), void 0 !== a && ts(this._processingElement, a), void 0 !== s && (this._processingUserElement.textContent = s), void 0 !== r && ts(this._phoneCaptureContainer, r), void 0 !== l && ts(this._phoneCaptureButtonsContainer, l), void 0 !== c && (this._phoneConsentConfirmButton.innerText = c.label, this._phoneConsentConfirmButton.onclick = c.onClick), void 0 !== p && (this._phoneConsentDeclineButton.innerText = p.label, this._phoneConsentDeclineButton.onclick = p.onClick), void 0 !== d && (this._rootElement.querySelector(".sda-disclosure-heading").textContent = d), void 0 !== u && this._updateDisclosureText(u), !0 === m ? this._showIframe() : !1 === m && this._hideIframe(), h) {
                this._statusIndicator || this._initStatusIndicator(h.branded);
                const {
                    status: e,
                    message: t
                } = h;
                null === (f = this._statusIndicator) || void 0 === f || f.setStatus({
                    status: e,
                    message: t
                })
            }
            void 0 !== _ && this._discountCodeElement && ts(this._discountCodeElement, _), g && this._updateDiscountCode(g)
        }
        showPhoneConsentScreen({
            title: e,
            disclosureHeading: t,
            disclosureText: n,
            confirmButtonLabel: i,
            declineButtonLabel: a,
            discountCode: o,
            onConfirm: s,
            onDecline: r
        }) {
            var l;
            this.updateSheetContent({
                title: e,
                description: "",
                iframeVisible: !1,
                headerDivider: !1,
                processingElementVisible: !1,
                phoneCaptureContainerVisible: !0,
                disclosureHeading: t,
                disclosureText: n,
                discountCode: o,
                phoneConsentConfirmButton: {
                    label: i,
                    onClick: () => {
                        var e;
                        null === (e = this._monorailTracker) || void 0 === e || e.trackShopPayLoginWithShopSdkUserAction({
                            userAction: Kt.PhoneConsentProvided
                        }), s()
                    }
                },
                phoneConsentDeclineButton: {
                    label: a,
                    onClick: () => {
                        var e;
                        null === (e = this._monorailTracker) || void 0 === e || e.trackShopPayLoginWithShopSdkUserAction({
                            userAction: Kt.PhoneConsentDeclined
                        }), r()
                    }
                }
            }), null === (l = this._monorailTracker) || void 0 === l || l.trackPageImpression({
                page: Ht.PhoneConsent
            })
        }
        showTitleAndDescriptionOnlyScreen({
            title: e,
            description: t
        }) {
            this.updateSheetContent({
                title: e,
                description: t,
                processingElementVisible: !1,
                phoneCaptureContainerVisible: !1,
                processingUserElementVisible: !1
            })
        }
        getIframe() {
            return this._iframe
        }
        resizeIframe(e, t, n) {
            this._iframe && (this._iframe.style.height = `${e}px`, this._iframe.style.width = `${Lo(t,this._iframe)}px`, n())
        }
        toggleModalBusy(e) {
            e ? this._sheetModal.setAttribute("busy", "true") : this._sheetModal.removeAttribute("busy")
        }
        isModalBusy() {
            return "true" === this._sheetModal.getAttribute("busy")
        }
        setModalAnalyticsTraceId(e) {
            this._sheetModal.setAttribute(Fi, e)
        }
        showModal() {
            return a(this, void 0, void 0, (function*() {
                (yield this._sheetModal.open()) && this._onOpen()
            }))
        }
        hideModal() {
            return a(this, void 0, void 0, (function*() {
                return this._sheetModal.close().then((e => {
                    e && (this._hideIframe(), this._onClose())
                })).catch((() => {
                    this._hideIframe(), this._onClose()
                }))
            }))
        }
        reset() {
            this.hideModal(), this.updateSheetContent({
                headerVisible: !1,
                processingElementVisible: !1,
                discountCode: {
                    code: "",
                    saved: !1
                }
            })
        }
        setMonorailTracker(e) {
            this._monorailTracker = e, this._sheetModal.setMonorailTracker(this._monorailTracker)
        }
        _initStatusIndicator(e) {
            const t = e ? Do.Branded : Do.Regular;
            this._statusIndicator = Fo(t), this._processingStatusElement.appendChild(this._statusIndicator)
        }
        _showIframe() {
            ts(this._iframe, !0)
        }
        _hideIframe() {
            ts(this._iframe, !1)
        }
        _updateDiscountCode({
            code: e,
            saved: t
        }) {
            var n, i, a, o, s;
            void 0 !== e && (e ? (null === (n = this._discountCodeElement) || void 0 === n || n.setAttribute("code", e), null === (i = this._monorailTracker) || void 0 === i || i.trackPageImpression({
                page: Ht.DiscountShown
            })) : null === (a = this._discountCodeElement) || void 0 === a || a.removeAttribute("code")), void 0 !== t && (t ? null === (o = this._discountCodeElement) || void 0 === o || o.setAttribute("saved", "") : null === (s = this._discountCodeElement) || void 0 === s || s.removeAttribute("saved"))
        }
        _updateDisclosureText(e) {
            var t;
            if (!this._disclosureContainer) {
                const e = null === (t = this._disclosureIframe.contentDocument) || void 0 === t ? void 0 : t.querySelector("body");
                e.innerHTML = "\n    <style>\n        body {\n            font-family: -apple-system,San Francisco,Roboto,Segoe UI,Helvetica Neue,sans-serif !important;\n            font-style: normal !important;\n            margin: 0;\n        }\n\n        .sda-disclosure-text {\n            color: #424242;\n            font-size: 12px;\n            line-height: 14px;\n            margin: 0;\n        }\n\n        .sda-disclosure-text a {\n            color: #424242;\n        }\n    </style>";
                const n = document.createElement("div");
                n.setAttribute("class", "sda-disclosure-text"), e.appendChild(n), this._disclosureContainer = n
            }
            this._disclosureContainer.innerHTML = e, this._disclosureIframe.setAttribute("height", `${this._disclosureContainer.getBoundingClientRect().height}px`)
        }
    }

    function ts(e, t) {
        e.classList.toggle("sda-hidden", !t)
    }
    /*! @license DOMPurify 3.2.5 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.2.5/LICENSE */
    const {
        entries: ns,
        setPrototypeOf: is,
        isFrozen: as,
        getPrototypeOf: os,
        getOwnPropertyDescriptor: ss
    } = Object;
    let {
        freeze: rs,
        seal: ls,
        create: cs
    } = Object, {
        apply: ps,
        construct: ds
    } = "undefined" != typeof Reflect && Reflect;
    rs || (rs = function(e) {
        return e
    }), ls || (ls = function(e) {
        return e
    }), ps || (ps = function(e, t, n) {
        return e.apply(t, n)
    }), ds || (ds = function(e, t) {
        return new e(...t)
    });
    const us = Cs(Array.prototype.forEach),
        ms = Cs(Array.prototype.lastIndexOf),
        hs = Cs(Array.prototype.pop),
        _s = Cs(Array.prototype.push),
        gs = Cs(Array.prototype.splice),
        fs = Cs(String.prototype.toLowerCase),
        bs = Cs(String.prototype.toString),
        ys = Cs(String.prototype.match),
        vs = Cs(String.prototype.replace),
        ks = Cs(String.prototype.indexOf),
        ws = Cs(String.prototype.trim),
        Ps = Cs(Object.prototype.hasOwnProperty),
        Ss = Cs(RegExp.prototype.test),
        zs = (js = TypeError, function() {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
            return ds(js, t)
        });
    var js;

    function Cs(e) {
        return function(t) {
            t instanceof RegExp && (t.lastIndex = 0);
            for (var n = arguments.length, i = new Array(n > 1 ? n - 1 : 0), a = 1; a < n; a++) i[a - 1] = arguments[a];
            return ps(e, t, i)
        }
    }

    function xs(e, t) {
        let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : fs;
        is && is(e, null);
        let i = t.length;
        for (; i--;) {
            let a = t[i];
            if ("string" == typeof a) {
                const e = n(a);
                e !== a && (as(t) || (t[i] = e), a = e)
            }
            e[a] = !0
        }
        return e
    }

    function Ls(e) {
        for (let t = 0; t < e.length; t++) {
            Ps(e, t) || (e[t] = null)
        }
        return e
    }

    function As(e) {
        const t = cs(null);
        for (const [n, i] of ns(e)) {
            Ps(e, n) && (Array.isArray(i) ? t[n] = Ls(i) : i && "object" == typeof i && i.constructor === Object ? t[n] = As(i) : t[n] = i)
        }
        return t
    }

    function Ts(e, t) {
        for (; null !== e;) {
            const n = ss(e, t);
            if (n) {
                if (n.get) return Cs(n.get);
                if ("function" == typeof n.value) return Cs(n.value)
            }
            e = os(e)
        }
        return function() {
            return null
        }
    }
    const Es = rs(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]),
        Is = rs(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]),
        Ms = rs(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]),
        Os = rs(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]),
        Ns = rs(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]),
        qs = rs(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]),
        Rs = rs(["#text"]),
        Ds = rs(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]),
        Bs = rs(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]),
        Fs = rs(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]),
        Vs = rs(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]),
        $s = ls(/\{\{[\w\W]*|[\w\W]*\}\}/gm),
        Ws = ls(/<%[\w\W]*|[\w\W]*%>/gm),
        Us = ls(/\$\{[\w\W]*/gm),
        Hs = ls(/^data-[\-\w.\u00B7-\uFFFF]+$/),
        Ks = ls(/^aria-[\-\w]+$/),
        Zs = ls(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),
        Gs = ls(/^(?:\w+script|data):/i),
        Js = ls(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),
        Ys = ls(/^html$/i),
        Qs = ls(/^[a-z][.\w]*(-[.\w]+)+$/i);
    var Xs = Object.freeze({
        __proto__: null,
        ARIA_ATTR: Ks,
        ATTR_WHITESPACE: Js,
        CUSTOM_ELEMENT: Qs,
        DATA_ATTR: Hs,
        DOCTYPE_NAME: Ys,
        ERB_EXPR: Ws,
        IS_ALLOWED_URI: Zs,
        IS_SCRIPT_OR_DATA: Gs,
        MUSTACHE_EXPR: $s,
        TMPLIT_EXPR: Us
    });
    const er = 1,
        tr = 3,
        nr = 7,
        ir = 8,
        ar = 9,
        or = function() {
            return "undefined" == typeof window ? null : window
        };
    var sr, rr = function e() {
        let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : or();
        const n = t => e(t);
        if (n.version = "3.2.5", n.removed = [], !t || !t.document || t.document.nodeType !== ar || !t.Element) return n.isSupported = !1, n;
        let {
            document: i
        } = t;
        const a = i,
            o = a.currentScript,
            {
                DocumentFragment: s,
                HTMLTemplateElement: r,
                Node: l,
                Element: c,
                NodeFilter: p,
                NamedNodeMap: d = t.NamedNodeMap || t.MozNamedAttrMap,
                HTMLFormElement: u,
                DOMParser: m,
                trustedTypes: h
            } = t,
            _ = c.prototype,
            g = Ts(_, "cloneNode"),
            f = Ts(_, "remove"),
            b = Ts(_, "nextSibling"),
            y = Ts(_, "childNodes"),
            v = Ts(_, "parentNode");
        if ("function" == typeof r) {
            const e = i.createElement("template");
            e.content && e.content.ownerDocument && (i = e.content.ownerDocument)
        }
        let k, w = "";
        const {
            implementation: P,
            createNodeIterator: S,
            createDocumentFragment: z,
            getElementsByTagName: j
        } = i, {
            importNode: C
        } = a;
        let x = {
            afterSanitizeAttributes: [],
            afterSanitizeElements: [],
            afterSanitizeShadowDOM: [],
            beforeSanitizeAttributes: [],
            beforeSanitizeElements: [],
            beforeSanitizeShadowDOM: [],
            uponSanitizeAttribute: [],
            uponSanitizeElement: [],
            uponSanitizeShadowNode: []
        };
        n.isSupported = "function" == typeof ns && "function" == typeof v && P && void 0 !== P.createHTMLDocument;
        const {
            MUSTACHE_EXPR: L,
            ERB_EXPR: A,
            TMPLIT_EXPR: T,
            DATA_ATTR: E,
            ARIA_ATTR: I,
            IS_SCRIPT_OR_DATA: M,
            ATTR_WHITESPACE: O,
            CUSTOM_ELEMENT: N
        } = Xs;
        let {
            IS_ALLOWED_URI: q
        } = Xs, R = null;
        const D = xs({}, [...Es, ...Is, ...Ms, ...Ns, ...Rs]);
        let B = null;
        const F = xs({}, [...Ds, ...Bs, ...Fs, ...Vs]);
        let V = Object.seal(cs(null, {
                tagNameCheck: {
                    writable: !0,
                    configurable: !1,
                    enumerable: !0,
                    value: null
                },
                attributeNameCheck: {
                    writable: !0,
                    configurable: !1,
                    enumerable: !0,
                    value: null
                },
                allowCustomizedBuiltInElements: {
                    writable: !0,
                    configurable: !1,
                    enumerable: !0,
                    value: !1
                }
            })),
            $ = null,
            W = null,
            U = !0,
            H = !0,
            K = !1,
            Z = !0,
            G = !1,
            J = !0,
            Y = !1,
            Q = !1,
            X = !1,
            ee = !1,
            te = !1,
            ne = !1,
            ie = !0,
            ae = !1,
            oe = !0,
            se = !1,
            re = {},
            le = null;
        const ce = xs({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
        let pe = null;
        const de = xs({}, ["audio", "video", "img", "source", "image", "track"]);
        let ue = null;
        const me = xs({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]),
            he = "http://www.w3.org/1998/Math/MathML",
            _e = "http://www.w3.org/2000/svg",
            ge = "http://www.w3.org/1999/xhtml";
        let fe = ge,
            be = !1,
            ye = null;
        const ve = xs({}, [he, _e, ge], bs);
        let ke = xs({}, ["mi", "mo", "mn", "ms", "mtext"]),
            we = xs({}, ["annotation-xml"]);
        const Pe = xs({}, ["title", "style", "font", "a", "script"]);
        let Se = null;
        const ze = ["application/xhtml+xml", "text/html"];
        let je = null,
            Ce = null;
        const xe = i.createElement("form"),
            Le = function(e) {
                return e instanceof RegExp || e instanceof Function
            },
            Ae = function() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                if (!Ce || Ce !== e) {
                    if (e && "object" == typeof e || (e = {}), e = As(e), Se = -1 === ze.indexOf(e.PARSER_MEDIA_TYPE) ? "text/html" : e.PARSER_MEDIA_TYPE, je = "application/xhtml+xml" === Se ? bs : fs, R = Ps(e, "ALLOWED_TAGS") ? xs({}, e.ALLOWED_TAGS, je) : D, B = Ps(e, "ALLOWED_ATTR") ? xs({}, e.ALLOWED_ATTR, je) : F, ye = Ps(e, "ALLOWED_NAMESPACES") ? xs({}, e.ALLOWED_NAMESPACES, bs) : ve, ue = Ps(e, "ADD_URI_SAFE_ATTR") ? xs(As(me), e.ADD_URI_SAFE_ATTR, je) : me, pe = Ps(e, "ADD_DATA_URI_TAGS") ? xs(As(de), e.ADD_DATA_URI_TAGS, je) : de, le = Ps(e, "FORBID_CONTENTS") ? xs({}, e.FORBID_CONTENTS, je) : ce, $ = Ps(e, "FORBID_TAGS") ? xs({}, e.FORBID_TAGS, je) : {}, W = Ps(e, "FORBID_ATTR") ? xs({}, e.FORBID_ATTR, je) : {}, re = !!Ps(e, "USE_PROFILES") && e.USE_PROFILES, U = !1 !== e.ALLOW_ARIA_ATTR, H = !1 !== e.ALLOW_DATA_ATTR, K = e.ALLOW_UNKNOWN_PROTOCOLS || !1, Z = !1 !== e.ALLOW_SELF_CLOSE_IN_ATTR, G = e.SAFE_FOR_TEMPLATES || !1, J = !1 !== e.SAFE_FOR_XML, Y = e.WHOLE_DOCUMENT || !1, ee = e.RETURN_DOM || !1, te = e.RETURN_DOM_FRAGMENT || !1, ne = e.RETURN_TRUSTED_TYPE || !1, X = e.FORCE_BODY || !1, ie = !1 !== e.SANITIZE_DOM, ae = e.SANITIZE_NAMED_PROPS || !1, oe = !1 !== e.KEEP_CONTENT, se = e.IN_PLACE || !1, q = e.ALLOWED_URI_REGEXP || Zs, fe = e.NAMESPACE || ge, ke = e.MATHML_TEXT_INTEGRATION_POINTS || ke, we = e.HTML_INTEGRATION_POINTS || we, V = e.CUSTOM_ELEMENT_HANDLING || {}, e.CUSTOM_ELEMENT_HANDLING && Le(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (V.tagNameCheck = e.CUSTOM_ELEMENT_HANDLING.tagNameCheck), e.CUSTOM_ELEMENT_HANDLING && Le(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (V.attributeNameCheck = e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), e.CUSTOM_ELEMENT_HANDLING && "boolean" == typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (V.allowCustomizedBuiltInElements = e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), G && (H = !1), te && (ee = !0), re && (R = xs({}, Rs), B = [], !0 === re.html && (xs(R, Es), xs(B, Ds)), !0 === re.svg && (xs(R, Is), xs(B, Bs), xs(B, Vs)), !0 === re.svgFilters && (xs(R, Ms), xs(B, Bs), xs(B, Vs)), !0 === re.mathMl && (xs(R, Ns), xs(B, Fs), xs(B, Vs))), e.ADD_TAGS && (R === D && (R = As(R)), xs(R, e.ADD_TAGS, je)), e.ADD_ATTR && (B === F && (B = As(B)), xs(B, e.ADD_ATTR, je)), e.ADD_URI_SAFE_ATTR && xs(ue, e.ADD_URI_SAFE_ATTR, je), e.FORBID_CONTENTS && (le === ce && (le = As(le)), xs(le, e.FORBID_CONTENTS, je)), oe && (R["#text"] = !0), Y && xs(R, ["html", "head", "body"]), R.table && (xs(R, ["tbody"]), delete $.tbody), e.TRUSTED_TYPES_POLICY) {
                        if ("function" != typeof e.TRUSTED_TYPES_POLICY.createHTML) throw zs('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
                        if ("function" != typeof e.TRUSTED_TYPES_POLICY.createScriptURL) throw zs('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
                        k = e.TRUSTED_TYPES_POLICY, w = k.createHTML("")
                    } else void 0 === k && (k = function(e, t) {
                        if ("object" != typeof e || "function" != typeof e.createPolicy) return null;
                        let n = null;
                        const i = "data-tt-policy-suffix";
                        t && t.hasAttribute(i) && (n = t.getAttribute(i));
                        const a = "dompurify" + (n ? "#" + n : "");
                        try {
                            return e.createPolicy(a, {
                                createHTML: e => e,
                                createScriptURL: e => e
                            })
                        } catch (e) {
                            return console.warn("TrustedTypes policy " + a + " could not be created."), null
                        }
                    }(h, o)), null !== k && "string" == typeof w && (w = k.createHTML(""));
                    rs && rs(e), Ce = e
                }
            },
            Te = xs({}, [...Is, ...Ms, ...Os]),
            Ee = xs({}, [...Ns, ...qs]),
            Ie = function(e) {
                _s(n.removed, {
                    element: e
                });
                try {
                    v(e).removeChild(e)
                } catch (t) {
                    f(e)
                }
            },
            Me = function(e, t) {
                try {
                    _s(n.removed, {
                        attribute: t.getAttributeNode(e),
                        from: t
                    })
                } catch (e) {
                    _s(n.removed, {
                        attribute: null,
                        from: t
                    })
                }
                if (t.removeAttribute(e), "is" === e)
                    if (ee || te) try {
                        Ie(t)
                    } catch (e) {} else try {
                        t.setAttribute(e, "")
                    } catch (e) {}
            },
            Oe = function(e) {
                let t = null,
                    n = null;
                if (X) e = "<remove></remove>" + e;
                else {
                    const t = ys(e, /^[\r\n\t ]+/);
                    n = t && t[0]
                }
                "application/xhtml+xml" === Se && fe === ge && (e = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + e + "</body></html>");
                const a = k ? k.createHTML(e) : e;
                if (fe === ge) try {
                    t = (new m).parseFromString(a, Se)
                } catch (e) {}
                if (!t || !t.documentElement) {
                    t = P.createDocument(fe, "template", null);
                    try {
                        t.documentElement.innerHTML = be ? w : a
                    } catch (e) {}
                }
                const o = t.body || t.documentElement;
                return e && n && o.insertBefore(i.createTextNode(n), o.childNodes[0] || null), fe === ge ? j.call(t, Y ? "html" : "body")[0] : Y ? t.documentElement : o
            },
            Ne = function(e) {
                return S.call(e.ownerDocument || e, e, p.SHOW_ELEMENT | p.SHOW_COMMENT | p.SHOW_TEXT | p.SHOW_PROCESSING_INSTRUCTION | p.SHOW_CDATA_SECTION, null)
            },
            qe = function(e) {
                return e instanceof u && ("string" != typeof e.nodeName || "string" != typeof e.textContent || "function" != typeof e.removeChild || !(e.attributes instanceof d) || "function" != typeof e.removeAttribute || "function" != typeof e.setAttribute || "string" != typeof e.namespaceURI || "function" != typeof e.insertBefore || "function" != typeof e.hasChildNodes)
            },
            Re = function(e) {
                return "function" == typeof l && e instanceof l
            };

        function De(e, t, i) {
            us(e, (e => {
                e.call(n, t, i, Ce)
            }))
        }
        const Be = function(e) {
                let t = null;
                if (De(x.beforeSanitizeElements, e, null), qe(e)) return Ie(e), !0;
                const i = je(e.nodeName);
                if (De(x.uponSanitizeElement, e, {
                        tagName: i,
                        allowedTags: R
                    }), e.hasChildNodes() && !Re(e.firstElementChild) && Ss(/<[/\w!]/g, e.innerHTML) && Ss(/<[/\w!]/g, e.textContent)) return Ie(e), !0;
                if (e.nodeType === nr) return Ie(e), !0;
                if (J && e.nodeType === ir && Ss(/<[/\w]/g, e.data)) return Ie(e), !0;
                if (!R[i] || $[i]) {
                    if (!$[i] && Ve(i)) {
                        if (V.tagNameCheck instanceof RegExp && Ss(V.tagNameCheck, i)) return !1;
                        if (V.tagNameCheck instanceof Function && V.tagNameCheck(i)) return !1
                    }
                    if (oe && !le[i]) {
                        const t = v(e) || e.parentNode,
                            n = y(e) || e.childNodes;
                        if (n && t) {
                            for (let i = n.length - 1; i >= 0; --i) {
                                const a = g(n[i], !0);
                                a.__removalCount = (e.__removalCount || 0) + 1, t.insertBefore(a, b(e))
                            }
                        }
                    }
                    return Ie(e), !0
                }
                return e instanceof c && ! function(e) {
                    let t = v(e);
                    t && t.tagName || (t = {
                        namespaceURI: fe,
                        tagName: "template"
                    });
                    const n = fs(e.tagName),
                        i = fs(t.tagName);
                    return !!ye[e.namespaceURI] && (e.namespaceURI === _e ? t.namespaceURI === ge ? "svg" === n : t.namespaceURI === he ? "svg" === n && ("annotation-xml" === i || ke[i]) : Boolean(Te[n]) : e.namespaceURI === he ? t.namespaceURI === ge ? "math" === n : t.namespaceURI === _e ? "math" === n && we[i] : Boolean(Ee[n]) : e.namespaceURI === ge ? !(t.namespaceURI === _e && !we[i]) && !(t.namespaceURI === he && !ke[i]) && !Ee[n] && (Pe[n] || !Te[n]) : !("application/xhtml+xml" !== Se || !ye[e.namespaceURI]))
                }(e) ? (Ie(e), !0) : "noscript" !== i && "noembed" !== i && "noframes" !== i || !Ss(/<\/no(script|embed|frames)/i, e.innerHTML) ? (G && e.nodeType === tr && (t = e.textContent, us([L, A, T], (e => {
                    t = vs(t, e, " ")
                })), e.textContent !== t && (_s(n.removed, {
                    element: e.cloneNode()
                }), e.textContent = t)), De(x.afterSanitizeElements, e, null), !1) : (Ie(e), !0)
            },
            Fe = function(e, t, n) {
                if (ie && ("id" === t || "name" === t) && (n in i || n in xe)) return !1;
                if (H && !W[t] && Ss(E, t));
                else if (U && Ss(I, t));
                else if (!B[t] || W[t]) {
                    if (!(Ve(e) && (V.tagNameCheck instanceof RegExp && Ss(V.tagNameCheck, e) || V.tagNameCheck instanceof Function && V.tagNameCheck(e)) && (V.attributeNameCheck instanceof RegExp && Ss(V.attributeNameCheck, t) || V.attributeNameCheck instanceof Function && V.attributeNameCheck(t)) || "is" === t && V.allowCustomizedBuiltInElements && (V.tagNameCheck instanceof RegExp && Ss(V.tagNameCheck, n) || V.tagNameCheck instanceof Function && V.tagNameCheck(n)))) return !1
                } else if (ue[t]);
                else if (Ss(q, vs(n, O, "")));
                else if ("src" !== t && "xlink:href" !== t && "href" !== t || "script" === e || 0 !== ks(n, "data:") || !pe[e]) {
                    if (K && !Ss(M, vs(n, O, "")));
                    else if (n) return !1
                } else;
                return !0
            },
            Ve = function(e) {
                return "annotation-xml" !== e && ys(e, N)
            },
            $e = function(e) {
                De(x.beforeSanitizeAttributes, e, null);
                const {
                    attributes: t
                } = e;
                if (!t || qe(e)) return;
                const i = {
                    attrName: "",
                    attrValue: "",
                    keepAttr: !0,
                    allowedAttributes: B,
                    forceKeepAttr: void 0
                };
                let a = t.length;
                for (; a--;) {
                    const o = t[a],
                        {
                            name: s,
                            namespaceURI: r,
                            value: l
                        } = o,
                        c = je(s);
                    let p = "value" === s ? l : ws(l);
                    if (i.attrName = c, i.attrValue = p, i.keepAttr = !0, i.forceKeepAttr = void 0, De(x.uponSanitizeAttribute, e, i), p = i.attrValue, !ae || "id" !== c && "name" !== c || (Me(s, e), p = "user-content-" + p), J && Ss(/((--!?|])>)|<\/(style|title)/i, p)) {
                        Me(s, e);
                        continue
                    }
                    if (i.forceKeepAttr) continue;
                    if (Me(s, e), !i.keepAttr) continue;
                    if (!Z && Ss(/\/>/i, p)) {
                        Me(s, e);
                        continue
                    }
                    G && us([L, A, T], (e => {
                        p = vs(p, e, " ")
                    }));
                    const d = je(e.nodeName);
                    if (Fe(d, c, p)) {
                        if (k && "object" == typeof h && "function" == typeof h.getAttributeType)
                            if (r);
                            else switch (h.getAttributeType(d, c)) {
                                case "TrustedHTML":
                                    p = k.createHTML(p);
                                    break;
                                case "TrustedScriptURL":
                                    p = k.createScriptURL(p)
                            }
                        try {
                            r ? e.setAttributeNS(r, s, p) : e.setAttribute(s, p), qe(e) ? Ie(e) : hs(n.removed)
                        } catch (e) {}
                    }
                }
                De(x.afterSanitizeAttributes, e, null)
            },
            We = function e(t) {
                let n = null;
                const i = Ne(t);
                for (De(x.beforeSanitizeShadowDOM, t, null); n = i.nextNode();) De(x.uponSanitizeShadowNode, n, null), Be(n), $e(n), n.content instanceof s && e(n.content);
                De(x.afterSanitizeShadowDOM, t, null)
            };
        return n.sanitize = function(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                i = null,
                o = null,
                r = null,
                c = null;
            if (be = !e, be && (e = "\x3c!--\x3e"), "string" != typeof e && !Re(e)) {
                if ("function" != typeof e.toString) throw zs("toString is not a function");
                if ("string" != typeof(e = e.toString())) throw zs("dirty is not a string, aborting")
            }
            if (!n.isSupported) return e;
            if (Q || Ae(t), n.removed = [], "string" == typeof e && (se = !1), se) {
                if (e.nodeName) {
                    const t = je(e.nodeName);
                    if (!R[t] || $[t]) throw zs("root node is forbidden and cannot be sanitized in-place")
                }
            } else if (e instanceof l) i = Oe("\x3c!----\x3e"), o = i.ownerDocument.importNode(e, !0), o.nodeType === er && "BODY" === o.nodeName || "HTML" === o.nodeName ? i = o : i.appendChild(o);
            else {
                if (!ee && !G && !Y && -1 === e.indexOf("<")) return k && ne ? k.createHTML(e) : e;
                if (i = Oe(e), !i) return ee ? null : ne ? w : ""
            }
            i && X && Ie(i.firstChild);
            const p = Ne(se ? e : i);
            for (; r = p.nextNode();) Be(r), $e(r), r.content instanceof s && We(r.content);
            if (se) return e;
            if (ee) {
                if (te)
                    for (c = z.call(i.ownerDocument); i.firstChild;) c.appendChild(i.firstChild);
                else c = i;
                return (B.shadowroot || B.shadowrootmode) && (c = C.call(a, c, !0)), c
            }
            let d = Y ? i.outerHTML : i.innerHTML;
            return Y && R["!doctype"] && i.ownerDocument && i.ownerDocument.doctype && i.ownerDocument.doctype.name && Ss(Ys, i.ownerDocument.doctype.name) && (d = "<!DOCTYPE " + i.ownerDocument.doctype.name + ">\n" + d), G && us([L, A, T], (e => {
                d = vs(d, e, " ")
            })), k && ne ? k.createHTML(d) : d
        }, n.setConfig = function() {
            Ae(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}), Q = !0
        }, n.clearConfig = function() {
            Ce = null, Q = !1
        }, n.isValidAttribute = function(e, t, n) {
            Ce || Ae({});
            const i = je(e),
                a = je(t);
            return Fe(i, a, n)
        }, n.addHook = function(e, t) {
            "function" == typeof t && _s(x[e], t)
        }, n.removeHook = function(e, t) {
            if (void 0 !== t) {
                const n = ms(x[e], t);
                return -1 === n ? void 0 : gs(x[e], n, 1)[0]
            }
            return hs(x[e])
        }, n.removeHooks = function(e) {
            x[e] = []
        }, n.removeAllHooks = function() {
            x = {
                afterSanitizeAttributes: [],
                afterSanitizeElements: [],
                afterSanitizeShadowDOM: [],
                beforeSanitizeAttributes: [],
                beforeSanitizeElements: [],
                beforeSanitizeShadowDOM: [],
                uponSanitizeAttribute: [],
                uponSanitizeElement: [],
                uponSanitizeShadowNode: []
            }
        }, n
    }();

    function lr(e) {
        return function(e) {
            if (!rr.isSupported) throw new Error("Disclosure sanitization is not supported in this browser.");
            return rr.sanitize(e, {
                ALLOWED_TAGS: []
            })
        }(e).length
    }
    rr.addHook("afterSanitizeAttributes", (function(e) {
            "target" in e && e.setAttribute("target", "_blank")
        })),
        function(e) {
            e.AuthorizeShown = "authorize-shown", e.AuthorizeSuccess = "authorize-success", e.PhoneConsentShown = "phone-consent-shown", e.PhoneConsentDeclined = "phone-consent-declined", e.PhoneConsentConfirmed = "phone-consent-confirmed", e.CheckYourTexts = "check-your-texts", e.Never = "never"
        }(sr || (sr = {}));
    const cr = Object.values(sr),
        pr = [sr.PhoneConsentShown, sr.PhoneConsentConfirmed, sr.Never],
        dr = [sr.AuthorizeShown, sr.AuthorizeSuccess, sr.PhoneConsentShown, sr.PhoneConsentConfirmed, sr.Never],
        ur = [sr.AuthorizeSuccess, sr.PhoneConsentConfirmed, sr.Never];

    function mr({
        phoneCapture: e,
        showDiscountAt: t,
        saveDiscountAt: n
    }) {
        return e ? `PHONE_CAPTURE_SHOWN_AT_${t}_SAVED_AT_${n}`.toUpperCase().replace(/[-]/g, "_") : "EMAIL_CAPTURE"
    }

    function hr(e, t) {
        return (e !== sr.PhoneConsentDeclined || t !== sr.PhoneConsentConfirmed) && cr.indexOf(t) <= cr.indexOf(e)
    }
    var _r;
    ! function(e) {
        e.DiscountCodeCallback = "discount-code-callback", e.StorefrontOrigin = "storefront-origin", e.DevMode = "dev-mode", e.ApiKey = "api-key", e.Email = "email", e.HideChange = "hide-change", e.PhoneCapture = "phone-capture", e.ShowDiscountAt = "show-discount-at", e.SaveDiscountAt = "save-discount-at", e.PhoneCaptureDisclosureText = "phone-capture-disclosure-text"
    }(_r || (_r = {}));
    const gr = [_r.DiscountCodeCallback, _r.ApiKey];
    class fr extends Error {
        constructor(e, t = I()) {
            super(e), this.analyticsTraceId = t, this.name = "SaveDiscountError", this.code = "save_discount_error"
        }
    }
    var br, yr, vr, kr, wr, Pr, Sr, zr, jr, Cr, xr, Lr, Ar, Tr, Er, Ir, Mr, Or, Nr, qr, Rr, Dr, Br, Fr, Vr, $r, Wr, Ur, Hr, Kr, Zr, Gr, Jr, Yr, Qr, Xr, el, tl, nl, il;
    const al = {
        emailCapture: {
            showDiscountAt: sr.AuthorizeShown,
            saveDiscountAt: sr.AuthorizeSuccess
        },
        phoneCapture: {
            showDiscountAt: sr.Never,
            saveDiscountAt: sr.AuthorizeSuccess
        }
    };
    class ol extends wo {
        static get observedAttributes() {
            return [_r.ApiKey, _r.DevMode, _r.DiscountCodeCallback, _r.Email, _r.PhoneCapture, _r.PhoneCaptureDisclosureText, _r.SaveDiscountAt, _r.ShowDiscountAt, _r.StorefrontOrigin]
        }
        constructor() {
            super(), br.add(this), yr.set(this, !1), vr.set(this, !1), kr.set(this, !1), wr.set(this, ""), Pr.set(this, ""), Sr.set(this, ""), zr.set(this, null), jr.set(this, void 0), Cr.set(this, void 0), xr.set(this, void 0), Lr.set(this, void 0), Ar.set(this, !1), Tr.set(this, void 0), Er.set(this, I()), Ir.set(this, ""), Mr.set(this, null), Or.set(this, void 0), this._phoneCapture = !1, this._showDiscountAt = al.emailCapture.showDiscountAt, this._saveDiscountAt = al.emailCapture.saveDiscountAt, this._pendingStep = cr[0], this._discountSaved = !1, this._discountSaveTriggered = !1, this._confirmCompleted = !1, this._isModalClosing = !1, this._phoneCaptureDisclosureText = "", this._apiKey = "", this._completedEventPayload = {
                loggedIn: !1
            }, this._defaultHeaderState = {
                title: "",
                headerDivider: !0,
                discountVisible: !0
            }, customElements.get("shop-sheet-modal") || customElements.define("shop-sheet-modal", uo);
            const e = this.attachShadow({
                mode: "open"
            });
            this._view = new es(e, (() => {
                var e;
                this._confirmCompleted || this._pendingStep === sr.AuthorizeShown ? this.hideModalAndDispatchCompleted() : (this._view.hideModal(), this._isModalClosing = !0, null === (e = o(this, xr, "f")) || void 0 === e || e.postMessage(Object.assign({
                    type: "phoneshareconsentreceived",
                    consented: this._pendingStep === sr.PhoneConsentConfirmed
                }, !this._discountSaved && {
                    skipDiscountSaving: !0
                })))
            }), (() => {
                var e;
                null === (e = o(this, xr, "f")) || void 0 === e || e.postMessage({
                    type: "sheetmodalopened"
                })
            }), (() => {
                var e;
                null === (e = o(this, xr, "f")) || void 0 === e || e.postMessage({
                    type: "sheetmodalclosed"
                }), _t()
            })), this._view.setModalAnalyticsTraceId(o(this, Er, "f")), s(this, jr, this._view.getIframe(), "f"), s(this, Tr, !1, "f")
        }
        get storefrontOrigin() {
            return o(this, Ir, "f")
        }
        set storefrontOrigin(e) {
            s(this, Ir, e, "f"), this.updateAttribute(_r.StorefrontOrigin, e)
        }
        get apiKey() {
            return this._apiKey
        }
        set apiKey(e) {
            this._apiKey = e, this.updateAttribute(_r.ApiKey, e)
        }
        connectedCallback() {
            return a(this, void 0, void 0, (function*() {
                var e;
                if (o(this, br, "m", Rr).call(this), yield o(this, br, "m", Nr).call(this), s(this, Ar, this.getBooleanAttribute(_r.DevMode), "f"), s(this, Tr, null !== this.getAttribute(_r.HideChange), "f"), o(this, Ar, "f") || o(this, Or, "f") || (s(this, Or, new Co({
                        elementName: "shop-discount-auth",
                        apiKey: this.apiKey,
                        flowVersion: mr({
                            phoneCapture: this._phoneCapture,
                            showDiscountAt: this._showDiscountAt,
                            saveDiscountAt: this._saveDiscountAt
                        }),
                        analyticsTraceId: o(this, Er, "f")
                    }), "f"), this._view.setMonorailTracker(o(this, Or, "f")), o(this, Or, "f").trackPageImpression({
                        page: Ht.SdkLoaded
                    }), o(this, Or, "f").trackShopPayModalStateChange({
                        currentState: Zt.Loaded
                    })), o(this, br, "m", $r).call(this), !o(this, Cr, "f")) {
                    const t = (null === (e = this.ownerDocument) || void 0 === e ? void 0 : e.defaultView) || void 0,
                        n = o(this, br, "m", qr).call(this);
                    s(this, Cr, new gi(new Si(o(this, jr, "f")), [fi, bi, n], o(this, br, "m", nl).bind(this), t), "f"), s(this, Mr, yield M(n), "f")
                }
                o(this, xr, "f") || s(this, xr, new Pi(o(this, jr, "f")), "f")
            }))
        }
        disconnectedCallback() {
            var e;
            null === (e = o(this, Cr, "f")) || void 0 === e || e.destroy()
        }
        attributeChangedCallback(e, t, n) {
            var i;
            const a = Boolean(null !== n);
            switch (e) {
                case _r.DiscountCodeCallback:
                    this._initDiscountCodeCallback();
                    break;
                case _r.StorefrontOrigin:
                    this._initStorefrontOrigin();
                    break;
                case _r.ApiKey:
                    this._initApiKey(), null === (i = o(this, Or, "f")) || void 0 === i || i.update({
                        apiKey: this.apiKey
                    });
                    break;
                case _r.Email:
                    o(this, br, "m", Vr).call(this, n);
                    break;
                case _r.PhoneCapture:
                    this._initPhoneCapture(a), this.updateFlowVersion();
                    break;
                case _r.ShowDiscountAt:
                    this._initShowDiscountAt(n), this.updateFlowVersion();
                    break;
                case _r.SaveDiscountAt:
                    this._initSaveDiscountAt(n), this.updateFlowVersion();
                    break;
                case _r.PhoneCaptureDisclosureText:
                    this._initPhoneCaptureDisclosureText(n);
                    break;
                case _r.DevMode:
                    this._initDevMode()
            }
        }
        notifyEmailFieldShown() {
            var e;
            null === (e = o(this, Or, "f")) || void 0 === e || e.trackPageImpression({
                page: Ht.PartnerEmailInputShown
            })
        }
        requestShow(e) {
            if (o(this, yr, "f")) {
                if (!e) throw new Error("Missing email string parameter");
                o(this, br, "m", Vr).call(this, e)
            } else Vt.RequestShowCalledBeforeIframeLoaded
        }
        updateFlowVersion() {
            var e;
            null === (e = o(this, Or, "f")) || void 0 === e || e.update({
                flowVersion: mr({
                    phoneCapture: this._phoneCapture,
                    showDiscountAt: this._showDiscountAt,
                    saveDiscountAt: this._saveDiscountAt
                })
            })
        }
        moveToNextStep(e, t = !1) {
            if (this._pendingStep = e, this._discountSaveTriggered && !this._discountSaved) return;
            if (function(e, t, n, i) {
                    return !n && !i && e && e !== sr.PhoneConsentDeclined && cr.indexOf(e) >= cr.indexOf(t)
                }(e, this._saveDiscountAt, this._discountSaved, this._discountSaveTriggered)) return this._view.toggleModalBusy(!0), void this._saveDiscountWithPay();
            let n = 0;
            t && (n = 1500), e === this._showDiscountAt && (n = 2e3), setTimeout((() => {
                switch (e) {
                    case sr.AuthorizeShown:
                    case sr.AuthorizeSuccess:
                        break;
                    case sr.PhoneConsentShown:
                        this._view.toggleModalBusy(!1), this._updateCompletedPayload({
                            phoneShareConsent: !1
                        }), this._showPhoneConsent();
                        break;
                    case sr.PhoneConsentConfirmed:
                        this._saveDiscountAt !== sr.Never && this._showPhoneConsentConfirmed();
                        break;
                    case sr.PhoneConsentDeclined:
                        this._showPhoneConsentDeclined()
                }
            }), n)
        }
        hideModalAndDispatchCompleted() {
            var e, t;
            null === (e = o(this, Cr, "f")) || void 0 === e || e.destroy(), this._view.toggleModalBusy(!1), this._updateCompletedPayload({
                email: null !== (t = this._completedEventPayload.email) && void 0 !== t ? t : o(this, wr, "f")
            }), this._view.hideModal().finally((() => {
                this.dispatchCustomEvent("completed", this._completedEventPayload)
            }))
        }
        dispatchCustomEvent(e, t) {
            super.dispatchCustomEvent(e, t)
        }
        _initDiscountCodeCallback() {
            const e = this.getAttribute(_r.DiscountCodeCallback);
            e && s(this, Sr, e, "f")
        }
        _initStorefrontOrigin() {
            const e = this.getAttribute(_r.StorefrontOrigin);
            e && (this.storefrontOrigin = e)
        }
        _initApiKey() {
            this.apiKey = this.getAttribute(_r.ApiKey), o(this, br, "m", $r).call(this)
        }
        _initPhoneCapture(e) {
            this._phoneCapture = e, this._initShowDiscountAt(this.getAttribute(_r.ShowDiscountAt)), this._initSaveDiscountAt(this.getAttribute(_r.SaveDiscountAt)), o(this, br, "m", $r).call(this)
        }
        _initShowDiscountAt(e) {
            if (t = e, Boolean(t && dr.includes(t))) return this._showDiscountAt = e, void o(this, br, "m", $r).call(this);
            var t;
            this._showDiscountAt = this._phoneCapture ? al.phoneCapture.showDiscountAt : al.emailCapture.showDiscountAt, o(this, br, "m", $r).call(this), R(e) || wa(`Invalid value of ${_r.ShowDiscountAt} ('${e}'). Must be one of: ${dr.join(", ")}. Using the default '${this._showDiscountAt}' instead.`)
        }
        _initSaveDiscountAt(e) {
            if (t = e, Boolean(t && ur.includes(t))) return this._saveDiscountAt = e, void o(this, br, "m", $r).call(this);
            var t;
            this._saveDiscountAt = this._phoneCapture ? al.phoneCapture.saveDiscountAt : al.emailCapture.saveDiscountAt, o(this, br, "m", $r).call(this), R(e) || wa(`Invalid value of ${_r.SaveDiscountAt} ('${e}'). Must be one of: ${ur.join(", ")}. Using the default '${this._saveDiscountAt}' instead.`)
        }
        _initPhoneCaptureDisclosureText(e) {
            try {
                this._phoneCaptureDisclosureText = e ? function(e) {
                    if (!rr.isSupported) throw new Error("Disclosure sanitization is not supported in this browser.");
                    return rr.sanitize(e, {
                        ALLOWED_TAGS: ["a"]
                    })
                }(e) : ""
            } catch (e) {
                e instanceof Error && o(this, br, "m", Gr).call(this, "disclosure_parse_error", e.message)
            }
        }
        _initDevMode() {
            s(this, Ar, this.getBooleanAttribute(_r.DevMode), "f"), o(this, br, "m", $r).call(this)
        }
        _showPhoneConsent() {
            return a(this, void 0, void 0, (function*() {
                var e;
                const t = this._saveDiscountAt === sr.AuthorizeSuccess,
                    n = o(this, zr, "f").translate(t ? "shop_discount_auth.phone_capture.consent.title_discount_saved" : "shop_discount_auth.phone_capture.consent.title_discount_not_saved"),
                    i = (null === (e = o(this, Mr, "f")) || void 0 === e ? void 0 : e.name) || "",
                    a = o(this, zr, "f").translate("shop_discount_auth.phone_capture.consent.disclosure_heading", {
                        merchantName: i
                    }),
                    s = o(this, zr, "f").translate("shop_discount_auth.phone_capture.consent.confirm_button", {
                        phone: this._maskedPhoneNumber
                    }),
                    r = o(this, zr, "f").translate("shop_discount_auth.phone_capture.consent.decline_button"),
                    l = hr(sr.PhoneConsentShown, this._showDiscountAt);
                this._view.showPhoneConsentScreen(Object.assign({
                    title: n,
                    disclosureHeading: a,
                    disclosureText: this._phoneCaptureDisclosureText,
                    confirmButtonLabel: s,
                    declineButtonLabel: r,
                    onConfirm: () => {
                        var e;
                        this._pendingStep = sr.PhoneConsentConfirmed, null === (e = o(this, xr, "f")) || void 0 === e || e.postMessage({
                            type: "phoneshareconsentreceived",
                            consented: !0
                        }), this._updateCompletedPayload({
                            phoneShareConsent: !0
                        }), this._saveDiscountAt === sr.PhoneConsentConfirmed && (this._view.toggleModalBusy(!0), this._saveDiscountWithPay())
                    },
                    onDecline: () => {
                        var e;
                        this._pendingStep = sr.PhoneConsentDeclined, null === (e = o(this, xr, "f")) || void 0 === e || e.postMessage(Object.assign({
                            type: "phoneshareconsentreceived",
                            consented: !1
                        }, !this._discountSaved && {
                            skipDiscountSaving: !0
                        })), this._updateCompletedPayload({
                            phoneShareConsent: !1
                        })
                    }
                }, l && {
                    discountCode: {
                        code: o(this, Pr, "f")
                    }
                }))
            }))
        }
        _showPhoneConsentConfirmed() {
            var e;
            const t = o(this, zr, "f").translate("shop_discount_auth.phone_capture.consent_confirmed.title"),
                n = o(this, zr, "f").translate("shop_discount_auth.phone_capture.consent_confirmed.description", {
                    phone: this._maskedPhoneNumber
                });
            this._showTitleAndDescriptionOnly(t, n), null === (e = o(this, Or, "f")) || void 0 === e || e.trackPageImpression({
                page: Ht.PhoneConsentConfirmed
            })
        }
        _showPhoneConsentDeclined() {
            var e, t;
            if (this._saveDiscountAt !== sr.AuthorizeSuccess) return void this.hideModalAndDispatchCompleted();
            const n = (null === (e = o(this, Mr, "f")) || void 0 === e ? void 0 : e.name) || "",
                i = o(this, zr, "f").translate("shop_discount_auth.phone_capture.consent_declined.title", {
                    merchantName: n
                }),
                a = o(this, zr, "f").translate("shop_discount_auth.phone_capture.consent_declined.description");
            this._showTitleAndDescriptionOnly(i, a), null === (t = o(this, Or, "f")) || void 0 === t || t.trackPageImpression({
                page: Ht.PhoneConsentDeclined
            })
        }
        _showTitleAndDescriptionOnly(e, t) {
            this._view.showTitleAndDescriptionOnlyScreen({
                title: e,
                description: t
            });
            const n = hr(sr.CheckYourTexts, this._showDiscountAt);
            this._view.updateSheetContent(Object.assign({
                iframeVisible: !1
            }, n && {
                discountCode: {
                    code: o(this, Pr, "f")
                }
            })), this._view.toggleModalBusy(!1), setTimeout((() => {
                this.hideModalAndDispatchCompleted()
            }), 5e3)
        }
        _saveDiscountWithPay() {
            return a(this, void 0, void 0, (function*() {
                var e;
                this._discountSaveTriggered = !0;
                const t = yield o(this, br, "m", il).call(this, o(this, wr, "f"));
                if (!t) throw new fr("Tried to save a discount code, but no discount code received");
                null === (e = o(this, xr, "f")) || void 0 === e || e.postMessage({
                    type: "savediscount",
                    discountCode: t
                })
            }))
        }
        _updateCompletedPayload(e) {
            this._completedEventPayload = Object.assign(Object.assign({}, this._completedEventPayload), e)
        }
    }

    function sl(e, t, n) {
        return function(e, t) {
            return Object.values(t).includes(e)
        }(e, t) ? e : n
    }
    var rl, ll;
    yr = new WeakMap, vr = new WeakMap, kr = new WeakMap, wr = new WeakMap, Pr = new WeakMap, Sr = new WeakMap, zr = new WeakMap, jr = new WeakMap, Cr = new WeakMap, xr = new WeakMap, Lr = new WeakMap, Ar = new WeakMap, Tr = new WeakMap, Er = new WeakMap, Ir = new WeakMap, Mr = new WeakMap, Or = new WeakMap, br = new WeakSet, Nr = function() {
        return a(this, void 0, void 0, (function*() {
            try {
                const e = ko.getDefaultLanguage(),
                    t = yield function(e) {
                        switch (e) {
                            case "./translations/bg-BG.json":
                                return Promise.resolve().then((function() {
                                    return km
                                }));
                            case "./translations/cs.json":
                                return Promise.resolve().then((function() {
                                    return Sm
                                }));
                            case "./translations/da.json":
                                return Promise.resolve().then((function() {
                                    return Cm
                                }));
                            case "./translations/de.json":
                                return Promise.resolve().then((function() {
                                    return Am
                                }));
                            case "./translations/el.json":
                                return Promise.resolve().then((function() {
                                    return Im
                                }));
                            case "./translations/en.json":
                                return Promise.resolve().then((function() {
                                    return Nm
                                }));
                            case "./translations/es.json":
                                return Promise.resolve().then((function() {
                                    return Dm
                                }));
                            case "./translations/fi.json":
                                return Promise.resolve().then((function() {
                                    return Vm
                                }));
                            case "./translations/fr.json":
                                return Promise.resolve().then((function() {
                                    return Um
                                }));
                            case "./translations/hi.json":
                                return Promise.resolve().then((function() {
                                    return Zm
                                }));
                            case "./translations/hr-HR.json":
                                return Promise.resolve().then((function() {
                                    return Ym
                                }));
                            case "./translations/hu.json":
                                return Promise.resolve().then((function() {
                                    return eh
                                }));
                            case "./translations/id.json":
                                return Promise.resolve().then((function() {
                                    return ih
                                }));
                            case "./translations/it.json":
                                return Promise.resolve().then((function() {
                                    return sh
                                }));
                            case "./translations/ja.json":
                                return Promise.resolve().then((function() {
                                    return ch
                                }));
                            case "./translations/ko.json":
                                return Promise.resolve().then((function() {
                                    return uh
                                }));
                            case "./translations/lt-LT.json":
                                return Promise.resolve().then((function() {
                                    return _h
                                }));
                            case "./translations/ms.json":
                                return Promise.resolve().then((function() {
                                    return bh
                                }));
                            case "./translations/nb.json":
                                return Promise.resolve().then((function() {
                                    return kh
                                }));
                            case "./translations/nl.json":
                                return Promise.resolve().then((function() {
                                    return Sh
                                }));
                            case "./translations/pl.json":
                                return Promise.resolve().then((function() {
                                    return Ch
                                }));
                            case "./translations/pt-BR.json":
                                return Promise.resolve().then((function() {
                                    return Ah
                                }));
                            case "./translations/pt-PT.json":
                                return Promise.resolve().then((function() {
                                    return Ih
                                }));
                            case "./translations/ro-RO.json":
                                return Promise.resolve().then((function() {
                                    return Nh
                                }));
                            case "./translations/ru.json":
                                return Promise.resolve().then((function() {
                                    return Dh
                                }));
                            case "./translations/sk-SK.json":
                                return Promise.resolve().then((function() {
                                    return Vh
                                }));
                            case "./translations/sl-SI.json":
                                return Promise.resolve().then((function() {
                                    return Uh
                                }));
                            case "./translations/sv.json":
                                return Promise.resolve().then((function() {
                                    return Zh
                                }));
                            case "./translations/th.json":
                                return Promise.resolve().then((function() {
                                    return Yh
                                }));
                            case "./translations/tr.json":
                                return Promise.resolve().then((function() {
                                    return e_
                                }));
                            case "./translations/vi.json":
                                return Promise.resolve().then((function() {
                                    return i_
                                }));
                            case "./translations/zh-CN.json":
                                return Promise.resolve().then((function() {
                                    return s_
                                }));
                            case "./translations/zh-TW.json":
                                return Promise.resolve().then((function() {
                                    return c_
                                }));
                            default:
                                return new Promise((function(t, n) {
                                    ("function" == typeof queueMicrotask ? queueMicrotask : setTimeout)(n.bind(null, new Error("Unknown variable dynamic import: " + e)))
                                }))
                        }
                    }(`./translations/${e}.json`);
                s(this, zr, new ko({
                    [e]: t
                }), "f")
            } catch (e) {}
        }))
    }, qr = function() {
        return o(this, Ir, "f") || window.location.origin
    }, Rr = function() {
        var e;
        e = this, gr.forEach((t => {
            e.getAttribute(t) || wa(`Missing ${t} attribute`)
        })), o(this, Ir, "f") && ki(o(this, Ir, "f"))
    }, Dr = function(e) {
        return a(this, void 0, void 0, (function*() {
            const t = yield o(this, br, "m", il).call(this, e);
            t && (s(this, Pr, t, "f"), o(this, br, "m", Br).call(this))
        }))
    }, Br = function() {
        if (!o(this, Pr, "f") || !o(this, vr, "f")) return;
        const e = hr(sr.AuthorizeShown, this._showDiscountAt);
        this._view.updateSheetContent(Object.assign({
            iframeVisible: !0
        }, e && {
            discountCode: {
                code: o(this, Pr, "f")
            }
        })), this._view.showModal()
    }, Fr = function(e, t) {
        var n;
        s(this, yr, !0, "f"), o(this, br, "m", Ur).call(this), this._defaultHeaderState.title = t, this._view.updateSheetContent({
            title: t,
            headerVisible: e
        }), this.dispatchCustomEvent(e ? "userfound" : "usernotfound"), null === (n = o(this, Or, "f")) || void 0 === n || n.trackShopLoginFirstTimeRender()
    }, Vr = function(e) {
        var t, n;
        if (e) {
            try {
                ! function({
                    isPhoneCapture: e,
                    phoneCaptureDisclosureText: t,
                    saveDiscountAt: n,
                    showDiscountAt: i
                }) {
                    if (e && !t) throw new Error(`A valid ${_r.PhoneCaptureDisclosureText} must be provided when ${_r.PhoneCapture} is enabled.`);
                    if (t && lr(t) > 500) throw new Error(`The attribute ${_r.PhoneCaptureDisclosureText} has a max length of 500 characters (excluding HTML tags).`);
                    if (!e && pr.includes(i)) throw new Error(`The attribute ${_r.ShowDiscountAt} can only be set to ${i} when ${_r.PhoneCapture} is enabled.`);
                    if (!e && pr.includes(n)) throw new Error(`The attribute ${_r.SaveDiscountAt} can only be set to ${n} when ${_r.PhoneCapture} is enabled.`)
                }({
                    isPhoneCapture: this._phoneCapture,
                    saveDiscountAt: this._saveDiscountAt,
                    showDiscountAt: this._showDiscountAt,
                    phoneCaptureDisclosureText: this._phoneCaptureDisclosureText
                })
            } catch (e) {
                return void(e instanceof Error && (wa(`Invalid config. ${e.message}`), o(this, br, "m", Gr).call(this, "invalid_config", e.message)))
            }
            if (s(this, wr, e, "f"), null === (t = o(this, Or, "f")) || void 0 === t || t.trackShopPayLoginWithShopSdkUserAction({
                    userAction: Kt.ThirdPartyFormSubmission
                }), o(this, br, "m", Dr).call(this, e), o(this, Ar, "f")) {
                if ("success-not-a-shop-user@myshopify.io" === e) return this._updateCompletedPayload({
                    email: e,
                    loggedIn: !1
                }), void o(this, br, "m", Yr).call(this);
                if ("blocked-user@myshopify.io" === e) return void o(this, br, "m", Gr).call(this, "user_blocked", "Hardcoded error event test email was entered.", e)
            }
            null === (n = o(this, xr, "f")) || void 0 === n || n.postMessage({
                type: "emailsubmitted",
                email: e,
                hideChange: o(this, Tr, "f")
            })
        }
    }, $r = function() {
        if (!o(this, jr, "f")) return;
        const e = (({
            apiKey: e,
            analyticsTraceId: t,
            storefrontOrigin: n,
            devMode: i,
            phoneCapture: a,
            saveDiscountAt: o,
            flowVersion: s
        }) => {
            const r = new URLSearchParams(Object.assign(Object.assign(Object.assign(Object.assign({
                target_origin: window.location.origin,
                api_key: e,
                flow: So,
                flow_version: s,
                locale: ko.getDefaultLanguage()
            }, t && {
                analytics_trace_id: t
            }), xo("phone_capture", a)), i && xo("dev_mode", i)), o && {
                save_discount_at: o
            }));
            return `${n||window.location.origin}/services/login_with_shop/authorize?${r}`
        })({
            analyticsTraceId: o(this, Er, "f"),
            storefrontOrigin: o(this, Ir, "f"),
            devMode: o(this, Ar, "f"),
            phoneCapture: this._phoneCapture,
            saveDiscountAt: this._saveDiscountAt,
            apiKey: this._apiKey,
            flowVersion: mr({
                phoneCapture: this._phoneCapture,
                showDiscountAt: this._showDiscountAt,
                saveDiscountAt: this._saveDiscountAt
            })
        });
        o(this, br, "m", Wr).call(this), T(o(this, jr, "f"), "src", e)
    }, Wr = function() {
        o(this, br, "m", Ur).call(this), s(this, Lr, setTimeout((() => {
            const {
                message: e,
                code: t
            } = Po;
            this.dispatchCustomEvent("error", {
                message: e,
                code: t
            }), o(this, br, "m", Ur).call(this)
        }), 1e4), "f")
    }, Ur = function() {
        o(this, Lr, "f") && (clearTimeout(o(this, Lr, "f")), s(this, Lr, void 0, "f"))
    }, Hr = function(e, t, n) {
        s(this, kr, e, "f"), this._maskedPhoneNumber = t, this._view.updateSheetContent(Object.assign({
            headerVisible: !0
        }, n ? {
            title: o(this, zr, "f").translate("shop_discount_auth.personalization_consent.title"),
            headerDivider: !1,
            discountVisible: !1
        } : this._defaultHeaderState)), s(this, vr, !0, "f"), this.dispatchCustomEvent("shopusermatched"), o(this, br, "m", Br).call(this)
    }, Kr = function({
        step: e,
        email: t,
        phone: n
    }) {
        switch (e) {
            case "one_click":
                this._view.updateSheetContent(this._defaultHeaderState);
                break;
            case "email":
                this._view.updateSheetContent({
                    description: o(this, zr, "f").translate("shop_discount_auth.auth_modal.login_email_description", {
                        email: t
                    })
                });
                break;
            case "sms":
                this._view.updateSheetContent({
                    description: o(this, zr, "f").translate("shop_discount_auth.auth_modal.login_sms_description", {
                        phoneNumber: n
                    })
                });
                break;
            case "webauthn":
                this._view.updateSheetContent({
                    headerDivider: !1,
                    description: o(this, zr, "f").translate("shop_discount_auth.auth_modal.login_webauthn_description")
                })
        }
    }, Zr = function(e, t, n) {
        this._view.toggleModalBusy(!0);
        const i = [sr.PhoneConsentConfirmed, sr.PhoneConsentDeclined].includes(this._pendingStep),
            a = this._phoneCapture && "success" === e ? void 0 : {
                branded: o(this, kr, "f"),
                status: e,
                message: t
            },
            s = hr(this._pendingStep, this._showDiscountAt),
            r = !(this._saveDiscountAt !== sr.AuthorizeSuccess || this._isModalClosing && this._pendingStep === sr.PhoneConsentShown || i);
        this._isModalClosing || this._view.updateSheetContent({
            iframeVisible: !1,
            processingElementVisible: !0,
            processingUserElementVisible: r,
            phoneCaptureButtonsContainerVisible: r,
            processingUser: null != n ? n : o(this, wr, "f"),
            statusIndicator: a,
            discountCode: Object.assign({}, s && {
                code: o(this, Pr, "f")
            })
        })
    }, Gr = function(e, t, n) {
        var i;
        o(this, br, "m", Ur).call(this), null === (i = o(this, Or, "f")) || void 0 === i || i.trackShopPayLoginWithSdkErrorEvents({
            errorCode: e,
            errorMessage: t
        }), this.dispatchCustomEvent("error", {
            code: e,
            message: t,
            email: n
        }), this._view.toggleModalBusy(!1)
    }, Jr = function() {
        var e;
        this._discountSaved = !0, this._view.updateSheetContent({
            discountCode: {
                saved: this._discountSaved
            }
        }), null === (e = o(this, Or, "f")) || void 0 === e || e.trackPageImpression({
            page: Ht.DiscountSaved
        }), this.moveToNextStep(this._pendingStep, !0)
    }, Yr = function() {
        return a(this, arguments, void 0, (function*(e = !1) {
            var t, n;
            if ((null === (t = this._completedEventPayload) || void 0 === t ? void 0 : t.loggedIn) && e) {
                P(o(this, Ir, "f"), (e => {}));
                const {
                    avatar: e,
                    email: t,
                    givenName: n
                } = this._completedEventPayload;
                this.publishToHub(dt.UserSessionCreate, {
                    email: n || t,
                    initial: (null == n ? void 0 : n[0]) || (null == t ? void 0 : t[0]) || "",
                    avatar: e
                })
            }
            if (this._phoneCapture) {
                if (this._isModalClosing) return void this.hideModalAndDispatchCompleted();
                if (this._saveDiscountAt === sr.Never && this._pendingStep === sr.PhoneConsentConfirmed) return void this._showPhoneConsentConfirmed();
                this._saveDiscountAt === sr.PhoneConsentConfirmed && this._pendingStep !== sr.PhoneConsentDeclined || this.moveToNextStep(this._pendingStep)
            } else null === (n = o(this, Or, "f")) || void 0 === n || n.trackPageImpression({
                page: Ht.DiscountSaved
            }), setTimeout((() => {
                this.hideModalAndDispatchCompleted()
            }), 2e3)
        }))
    }, Qr = function() {
        this._phoneCapture ? this.moveToNextStep(sr.PhoneConsentShown) : this.moveToNextStep(sr.AuthorizeSuccess)
    }, Xr = function() {
        this._view.reset(), s(this, kr, !1, "f"), s(this, vr, !1, "f"), this.dispatchCustomEvent("restarted")
    }, el = function(e, t) {
        this._view.resizeIframe(e, t, (() => {
            this.dispatchCustomEvent("resized", {
                height: e,
                width: t
            })
        }))
    }, tl = function() {
        this._view.isModalBusy() || this.hideModalAndDispatchCompleted()
    }, nl = function(e) {
        var t;
        switch (e.type) {
            case "resize_iframe":
                o(this, br, "m", el).call(this, e.height, e.width);
                break;
            case "restarted":
                o(this, br, "m", Xr).call(this);
                break;
            case "completed":
                {
                    this._confirmCompleted = !0;
                    const {
                        shopAccountUuid: n,
                        shouldFinalizeLogin: i,
                        type: a
                    } = e,
                    s = function(e, t) {
                        var n = {};
                        for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && t.indexOf(i) < 0 && (n[i] = e[i]);
                        if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                            var a = 0;
                            for (i = Object.getOwnPropertySymbols(e); a < i.length; a++) t.indexOf(i[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, i[a]) && (n[i[a]] = e[i[a]])
                        }
                        return n
                    }(e, ["shopAccountUuid", "shouldFinalizeLogin", "type"]);null === (t = o(this, Or, "f")) || void 0 === t || t.update({
                        shopAccountUuid: n
                    }),
                    this._updateCompletedPayload(s),
                    o(this, br, "m", Yr).call(this, i);
                    break
                }
            case "error":
                o(this, br, "m", Gr).call(this, e.code, e.message, e.email);
                break;
            case "shop_user_matched":
                o(this, br, "m", Hr).call(this, e.userCookieExists, e.maskedPhoneNumber || "", e.personalizeConsentChallenge || !1);
                break;
            case "loaded":
                o(this, br, "m", Fr).call(this, e.userFound, e.loginTitle);
                break;
            case "authorize_step_changed":
                o(this, br, "m", Kr).call(this, e);
                break;
            case "processing_status_updated":
                o(this, br, "m", Zr).call(this, e.status, e.message, e.email);
                break;
            case "discount_saved":
                o(this, br, "m", Jr).call(this);
                break;
            case "close_requested":
                o(this, br, "m", tl).call(this);
                break;
            case "user_verified":
                o(this, br, "m", Qr).call(this)
        }
    }, il = function(e) {
        return a(this, void 0, void 0, (function*() {
            var t;
            if (o(this, Pr, "f")) return o(this, Pr, "f");
            try {
                if (o(this, Ar, "f") && "discount-code-error@myshopify.io" === e) throw new Error("Discount code error");
                if ("string" != typeof o(this, Sr, "f")) throw new Error("discount-code-callback attribute was not provided or is not a string");
                const n = window[o(this, Sr, "f")];
                if ("function" != typeof n) throw new Error("discount-code-callback attribute did not contain the name of a global function");
                const i = yield n(e);
                if ("string" != typeof i || 0 === i.trim().length) throw new Error("discount code is non-string or empty");
                return null === (t = o(this, Or, "f")) || void 0 === t || t.trackShopPayLoginWithSdkDiscountStatus({
                    discountCode: i
                }), i
            } catch (t) {
                t instanceof Error && o(this, br, "m", Gr).call(this, "no_discount_received", t.message, e)
            }
        }))
    };
    const cl = {
            [Zn.Follow]: "shop-follow-button",
            [Zn.Default]: "shop-login-default",
            [Zn.Prequal]: "shop-login-default",
            [Zn.PopUp]: "shop-login-default",
            [Zn.Custom]: "shop-login-default"
        },
        pl = {
            [Mi]: !1,
            [Oi]: !1,
            [Di]: !1,
            [Bi]: "",
            [Gi]: !1,
            [Ji]: !1,
            [Qi]: "unspecified",
            [Xi]: "",
            [ta]: !1,
            [Ii]: !1,
            [ca]: !1,
            [ma]: !1,
            [ya]: "unspcified"
        };
    class dl extends Ea {
        constructor() {
            super(...arguments), rl.set(this, void 0), ll.set(this, void 0)
        }
        static get observedAttributes() {
            return [Li, Ai, Qi, Ei, Mi, Oi, Di, Vi, Ri, Ni, Bi, Ni, qi, $i, Wi, Ui, Hi, Ki, Zi, Xi, ea, ta, na, ia, aa, oa, sa, ra, la, ca, Fi, pa, da, ga, fa, ua, ba, ha, _a, ma, Gi, Ji, Ii, ya]
        }
        get clientId() {
            return this._getAttributeValueWithDefault(Li)
        }
        set clientId(e) {
            this.updateAttribute(Li, e)
        }
        set redirectUri(e) {
            this.updateAttribute(Ni, e)
        }
        get version() {
            return this._getAttributeValueWithDefault(Ai)
        }
        set version(e) {
            this.updateAttribute(Ai, e)
        }
        get email() {
            return this._getAttributeValueWithDefault(Xi)
        }
        set email(e) {
            this.updateAttribute(Xi, e)
        }
        set firstName(e) {
            this.updateAttribute(ha, e)
        }
        set lastName(e) {
            this.updateAttribute(_a, e)
        }
        set popUpName(e) {
            this.updateAttribute(sa, e)
        }
        set popUpFeatures(e) {
            this.updateAttribute(ra, e)
        }
        connectedCallback() {
            var e;
            s(this, rl, sl(this.getAttribute(Ti), Zn, Zn.Default), "f"), s(this, ll, this._createActionButton({
                actionType: o(this, rl, "f"),
                attributes: this._getAttributeValues()
            }), "f"), this.shadowRoot || this.attachShadow({
                mode: "open"
            }), o(this, ll, "f") && (this.shadowRoot.innerHTML = "", null === (e = this.shadowRoot) || void 0 === e || e.appendChild(o(this, ll, "f")))
        }
        disconnectedCallback() {}
        attributeChangedCallback(e, t, n) {
            var i, a;
            const s = n || this._getAttributeValueWithDefault(e);
            "boolean" == typeof s ? this.updateAttribute(e, s ? "" : void 0) : this.updateAttribute(e, s || void 0), null === n ? null === (i = o(this, ll, "f")) || void 0 === i || i.removeAttribute(e) : null === (a = o(this, ll, "f")) || void 0 === a || a.setAttribute(e, n)
        }
        requestShow(e) {
            o(this, ll, "f") && "requestShow" in o(this, ll, "f") && o(this, ll, "f").requestShow(e)
        }
        listenToInput(e) {
            o(this, ll, "f") && "listenToInput" in o(this, ll, "f") && o(this, ll, "f").listenToInput(e)
        }
        stopListeningToInput() {
            o(this, ll, "f") && "stopListeningToInput" in o(this, ll, "f") && o(this, ll, "f").stopListeningToInput()
        }
        setPasswordManagerDetection(e) {
            o(this, ll, "f") && "setPasswordManagerDetection" in o(this, ll, "f") && o(this, ll, "f").setPasswordManagerDetection(e)
        }
        dispatchCustomEvent(e, t) {
            super.dispatchCustomEvent(e, t)
        }
        _createActionButton({
            actionType: e,
            attributes: t
        }) {
            const n = cl[e];
            if (!n) return;
            const i = document.createElement(n);
            return i ? (Object.entries(t).forEach((([e, t]) => {
                t && i.setAttribute(e, String(t))
            })), i) : void 0
        }
        _getAttributeValues() {
            return dl.observedAttributes.reduce(((e, t) => Object.assign(Object.assign({}, e), {
                [t]: this._getAttributeValueWithDefault(t)
            })), Object.assign(Object.assign({}, pl), {
                [Yi]: this._getAttributeValueWithDefault(Ti)
            }))
        }
        _getAttributeValueWithDefault(e) {
            switch (e) {
                case Ti:
                case Yi:
                    return sl(this.getAttribute(Ti), Zn, Zn.Default);
                case Mi:
                case Oi:
                case Di:
                case Gi:
                case Ji:
                case ta:
                case Ii:
                case ca:
                case ma:
                case Vi:
                    return this.getBooleanAttribute(e);
                case Bi:
                case Xi:
                    return this.getAttribute(e) || "";
                case Qi:
                    return this.getAttribute(e) || "unspecified";
                case Fi:
                    return this.getAttribute(e) || I();
                default:
                    return this.getAttribute(e) || void 0
            }
        }
    }
    rl = new WeakMap, ll = new WeakMap;
    class ul extends HTMLElement {
        static get observedAttributes() {
            return ["disabled", "hide-logo", "href"]
        }
        constructor() {
            super(), customElements.get("shop-pay-logo") || customElements.define("shop-pay-logo", Ta), this.attachShadow({
                mode: "open"
            })
        }
        connectedCallback() {
            this._updateButton()
        }
        attributeChangedCallback() {
            this._updateButton()
        }
        _updateButton() {
            const e = this.shadowRoot;
            if (!e) return;
            const t = !this.hasAttribute("hide-logo");
            e.innerHTML = (e => `\n<style>\n  * {\n    box-sizing: border-box;\n  }\n\n  .shop-pay-button {\n    background: #5a31f4 !important;\n    line-height: normal;\n    border-radius: var(--shop-pay-button-border-radius, 4px) !important;\n    height: var(--shop-pay-button-height, 42px) !important;\n    width: var(--shop-pay-button-width, 262px) !important;\n    text-decoration: none;\n    color: #ffffff;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    column-gap: 4px;\n    white-space: nowrap;\n  }\n\n  .shop-pay-button:not(.disabled):hover {\n    cursor: pointer;\n    background: #3c0def !important;\n  }\n\n  .shop-pay-button.disabled {\n    opacity: 0.5;\n    cursor: default;\n  }\n\n  .shop-pay-button.bordered {\n    border: 1px solid #EDEDED;\n  }\n\n  shop-pay-logo {\n    display: inline-block;\n    max-height: 100%;\n    max-width: 100%;\n  }\n\n  .visually-hidden {\n    position: absolute;\n    border: 0;\n    clip: rect(0, 0, 0, 0);\n    overflow: hidden;\n    padding: 0;\n  }\n</style>\n\n<a id="shop-pay-button-link" href="#" class="shop-pay-button" aria-label="Buy with Shop Pay">\n  <span class="visually-hidden">Buy with Shop Pay</span>\n  <slot id="pay-button-content">\n  </slot>\n  ${e?'\n  <shop-pay-logo\n    aria-hidden="true"\n    role="img"\n    size="large"\n    background-color="#5a31f4"\n  ></shop-pay-logo>\n':""}\n</a>\n`)(t);
            const n = e.querySelector("#shop-pay-button-link"),
                i = this.hasAttribute("disabled"),
                a = this.getAttribute("href");
            return n ? i ? (n.classList.toggle("disabled", !0), void n.setAttribute("href", "#")) : void n.setAttribute("href", a || "#") : void 0
        }
    }
    var ml;

    function hl(e) {
        return a(this, void 0, void 0, (function*() {
            try {
                const t = yield fetch(`https://${e}/cart.js`);
                return yield t.json()
            } catch (t) {
                return wa(`Failed to fetch cart token for ${e} due to error: ${t}`), {
                    token: "",
                    currency: "",
                    items: []
                }
            }
        }))
    }

    function _l({
        storeUrl: e,
        variants: t,
        paymentOption: n,
        source: i,
        sourceToken: a,
        redirectSource: o,
        channel: s
    }) {
        const r = O(e);
        if (!r || !t.length) return "#";
        const l = t.map((e => `${e.id}:${e.quantity}`)).join(","),
            c = new URL(`https://${r}/cart/${l}`),
            p = new URLSearchParams(c.search);
        return p.append("payment", n || ml.ShopPay), i && p.append("source", i), a && p.append("source_token", a), o && p.append("redirect_source", o), s && p.append("channel", s), `${c.href}?${p}`
    }

    function gl(e) {
        return e.split(",").map((e => {
            const [t, n] = e.split(":"), i = Number(null != n ? n : 1), a = isNaN(i) ? 1 : i;
            return {
                id: Number(t),
                quantity: a
            }
        }))
    }

    function fl(e, t, n, i, a) {
        const o = new URLSearchParams;
        o.append("redirect_source", "direct_checkout_cart"), o.append("pre_select_installments", String(t === ml.ShopPayInstallments));
        const s = function(e) {
            const t = document.cookie.split("; ");
            for (const n of t) {
                const [t, i] = n.split("=");
                if (t === e) return i
            }
        }("_checkout_queue_token");
        return void 0 !== s && o.append("checkout_queue_token", s), null !== n && o.append("source", n), null !== i && o.append("source_token", i), null !== a && o.append("channel", a), `${e.href}&${o}`
    }! function(e) {
        e.ShopPay = "shop_pay", e.ShopPayInstallments = "shop_pay_installments"
    }(ml || (ml = {}));
    class bl extends HTMLElement {
        static get observedAttributes() {
            return ["button-text", "cart", "channel", "disabled", "payment-option", "source", "source-token", "store-url", "variants"]
        }
        constructor() {
            super(), this._handleShopPayButtonClick = () => a(this, void 0, void 0, (function*() {
                const e = this.getAttribute("store-url");
                if (!e) return;
                const t = this.getAttribute("payment-option"),
                    n = this.getAttribute("source"),
                    i = this.getAttribute("source-token"),
                    o = this.getAttribute("cart"),
                    s = this.getAttribute("channel"),
                    r = O(e),
                    l = yield function(e, t) {
                        return a(this, void 0, void 0, (function*() {
                            if (!e) return null;
                            let n, i;
                            t ? (n = JSON.parse(decodeURIComponent(t)), i = yield yl(e)) : [n, i] = yield Promise.all([hl(e), yl(e)]);
                            const a = n.items.some((e => void 0 !== e.selling_plan_allocation && void 0 !== e.selling_plan_allocation.selling_plan && !e.selling_plan_allocation.selling_plan.fixed_selling_plan));
                            try {
                                const t = yield fetch(`https://${e}/wallets/checkouts.json`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        authorization: `Basic ${i}`
                                    },
                                    body: JSON.stringify({
                                        checkout: {
                                            cart_token: n.token,
                                            presentment_currency: n.currency,
                                            has_selling_plans: a,
                                            secret: !0,
                                            wallet_name: "ShopifyPay",
                                            page_type: "cart_page"
                                        }
                                    })
                                });
                                return (yield t.json()).checkout.shop_pay_configuration.transaction_url
                            } catch (t) {
                                return wa(`Failed to fetch transaction url for ${e} due to error: ${t}`), null
                            }
                        }))
                    }(r, o);
                if (l) {
                    const e = fl(new URL(l), t, n, i, s);
                    window.location.assign(e)
                }
            })), this._monorailTracker = new wn({
                elementName: "shop-pay-button"
            }), customElements.get("shop-pay-button-base") || customElements.define("shop-pay-button-base", ul), this.attachShadow({
                mode: "open"
            })
        }
        connectedCallback() {
            this._monorailTracker.trackElementImpression();
            const e = this.shadowRoot;
            e && (e.innerHTML = "<shop-pay-button-base></shop-pay-button-base>", this._updateButton())
        }
        attributeChangedCallback() {
            this._updateButton()
        }
        _setOnClick(e = null) {
            var t;
            const n = null === (t = this.shadowRoot) || void 0 === t ? void 0 : t.querySelector("shop-pay-button-base");
            n && (n.onclick = e)
        }
        _updateHref(e) {
            var t;
            const n = this.getAttribute("store-url");
            if (!n) return;
            const i = null === (t = this.shadowRoot) || void 0 === t ? void 0 : t.querySelector("shop-pay-button-base");
            if (!i) return;
            const a = this.getAttribute("payment-option"),
                o = this.getAttribute("source"),
                s = this.getAttribute("source-token"),
                r = this.getAttribute("redirect-source"),
                l = this.getAttribute("channel"),
                c = _l({
                    storeUrl: n,
                    variants: gl(e),
                    paymentOption: a,
                    source: o,
                    sourceToken: s,
                    redirectSource: r,
                    channel: l
                });
            this._setOnClick(), T(i, "href", c)
        }
        _updateButton() {
            var e;
            const t = this.shadowRoot,
                n = null === (e = this.shadowRoot) || void 0 === e ? void 0 : e.querySelector("shop-pay-button-base");
            if (!n || !t) return;
            const i = this.getAttribute("button-text");
            i ? (n.innerHTML = i || "", T(n, "hide-logo", "")) : n.removeAttribute("hide-logo");
            if (this.hasAttribute("disabled")) return void T(n, "disabled", "true");
            const a = this.getAttribute("variants");
            a ? this._updateHref(a) : this._setOnClick(this._handleShopPayButtonClick)
        }
    }

    function yl(e) {
        return a(this, void 0, void 0, (function*() {
            try {
                const t = yield fetch(`https://${e}/payments/config.json`), n = yield t.json();
                return window.btoa(encodeURIComponent(n.paymentInstruments.accessToken))
            } catch (t) {
                return wa(`Failed to fetch authorization token for ${e} due to error: ${t}`), ""
            }
        }))
    }
    const vl = (e, t) => t.every((t => t in e));

    function kl(e, t) {
        return null != e && ("cart" === (null == e ? void 0 : e.type) ? function(e, t) {
            const n = vl(e, ["min_price", "max_price", "price", "eligible", "number_of_payment_terms", "available_loan_types"]);
            n || t(ti.Cart, JSON.stringify(e))
        }(e, t) : function(e, t) {
            var n;
            const i = vl(e, ["variants", "max_price", "min_price", "number_of_payment_terms"]),
                a = (null === (n = e.variants) || void 0 === n ? void 0 : n.length) > 0 && vl(e.variants[0], ["id", "price", "eligible", "available_loan_types", "available"]);
            i && a || t(ti.Product, JSON.stringify(e))
        }(e, t), vl(e, ["min_price", "max_price"]))
    }

    function wl(e, t) {
        return null != e && (e.type === ti.Cart ? function(e, t) {
            const n = vl(e, ["min_price", "max_price", "price_per_term", "eligible", "number_of_payment_terms", "full_price", "financing_plans"]);
            if (!n) return null == t || t(ti.Cart, JSON.stringify(e)), !1;
            return !0
        }(e, t) : e.type === ti.Checkout ? function(e, t) {
            const n = vl(e, ["min_price", "max_price", "price_per_term", "eligible", "number_of_payment_terms", "full_price", "financing_plans"]);
            if (!n) return null == t || t(ti.Checkout, JSON.stringify(e)), !1;
            return !0
        }(e, t) : function(e, t) {
            var n;
            const i = vl(e, ["variants", "max_price", "min_price", "financing_plans"]),
                a = (null === (n = e.variants) || void 0 === n ? void 0 : n.length) > 0 && vl(e.variants[0], ["id", "price_per_term", "eligible", "full_price", "available"]);
            if (!i || !a) return null == t || t(ti.Product, JSON.stringify(e)), !1;
            return !0
        }(e, t))
    }
    class Pl extends HTMLElement {
        static get observedAttributes() {
            return ["variant-id", "shopify-meta"]
        }
        constructor() {
            super(), this._didMount = !1, this._currentBanner = document.createElement("div"), this.attachShadow({
                mode: "open"
            })
        }
        connectedCallback() {
            var e;
            const t = this._getNewBannerNode();
            this.shadowRoot, null === (e = this.shadowRoot) || void 0 === e || e.appendChild(t), this._currentBanner = t, this._didMount = !0
        }
        attributeChangedCallback() {
            var e;
            if (this._didMount) {
                const t = this._getNewBannerNode();
                null === (e = this.shadowRoot) || void 0 === e || e.replaceChild(t, this._currentBanner), this._currentBanner = t
            }
        }
        disconnectedCallback() {
            var e, t;
            (null === (e = this.shadowRoot) || void 0 === e ? void 0 : e.contains(this._currentBanner)) && (null === (t = this.shadowRoot) || void 0 === t || t.removeChild(this._currentBanner))
        }
        _getNewBannerNode() {
            const e = this.getAttribute("shopify-meta"),
                t = this.getAttribute("variant-id"),
                n = Boolean(e && wl(JSON.parse(e))),
                i = document.createElement(n ? "shop-pay-installments-banner" : "shop-pay-banner");
            return t && i.setAttribute("variant-id", t), e && i.setAttribute("shopify-meta", e), i
        }
    }

    function Sl() {
        const e = function() {
                const e = document.createElement("div");
                return e.id = `shop-sheet-modal-wrapper-${x()}`, e.style.setProperty("all", "initial"), e.style.setProperty("position", "absolute"), e.style.setProperty("z-index", w), e.style.setProperty("overflow", "visible"), e.style.setProperty("display", "block"), e
            }(),
            t = e.attachShadow({
                mode: "open"
            });
        return {
            withInnerHTML(e) {
                return t.innerHTML = e, this
            },
            build: () => (document.body.appendChild(e), t.appendChild(document.createElement("shop-sheet-modal")), {
                get sheetModal() {
                    return t.querySelector("shop-sheet-modal")
                },
                get shadowRoot() {
                    return t
                },
                setNametagSuffix(t) {
                    e.setAttribute("data-nametag", "shop-portal-provider"), e.setAttribute("data-type", "modal"), e.setAttribute("data-variant", t)
                },
                destroy() {
                    e.remove()
                }
            })
        }
    }
    var zl, jl, Cl, xl, Ll, Al, Tl, El, Il, Ml, Ol, Nl, ql, Rl, Dl;
    const Bl = "shop-modal-content";
    class Fl extends HTMLElement {
        constructor() {
            super(), zl.add(this), jl.set(this, void 0), Cl.set(this, void 0), xl.set(this, void 0), Ll.set(this, void 0), Al.set(this, void 0), Tl.set(this, void 0), El.set(this, void 0), Il.set(this, void 0), Ml.set(this, void 0), Ol.set(this, void 0), Nl.set(this, {});
            const e = document.createElement("template");
            e.innerHTML = `\n    <style>\n      .${Bl} {\n        border-bottom: 1px solid #D9D9D9;\n        padding-bottom: 20px;\n        text-align: center;\n        margin: 0 20px;\n      }\n\n      .${Bl}--small {\n        padding-bottom: 7px;\n      }\n\n      .${Bl}.hide-divider {\n        border-bottom-color: transparent;\n      }\n\n      .${Bl}-title {\n        font-size: 20px;\n        font-weight: 600;\n        line-height: 25px;\n        letter-spacing: -0.2px;\n        color: #000000;\n        margin-bottom: 8px;\n      }\n\n      .${Bl}-description {\n        font-size: 14px;\n        font-weight: 400;\n        color: #0F1721;\n        letter-spacing: 0px;\n      }\n\n      .${Bl}-processing {\n        min-height: 97px;\n        margin: 0 20px;\n      }\n\n      .${Bl}-processing-user {\n        padding: 15px 0;\n        min-height: 15px;\n        font-size: 12px;\n        color: #0F1721;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n        -webkit-font-smoothing: antialiased;\n        -webkit-text-size-adjust: 100%;\n        font-family: -apple-system, BlinkMacSystemFont, San Francisco, Roboto, Segoe UI, Helvetica Neue, sans-serif !important;\n      }\n\n      .${Bl}-disclaimer {\n        font-size: 12px;\n        line-height: 1.4;\n        text-align: center;\n        color: rgb(63, 69, 77);\n        padding: 8px 0 5px;\n        margin: 0 20px;\n      }\n\n      .${Bl}-disclaimer a {\n        color: ${Pa.brand};\n        -webkit-appearance: none;\n        appearance: none;\n        text-decoration: none;\n        cursor: pointer;\n      }\n\n      .${Bl}-disclaimer a:hover,\n      .${Bl}-disclaimer a:focus,\n      .${Bl}-disclaimer a:active {\n        outline: none;\n        color: #7b61f0;\n      }\n\n      @media (forced-colors: active) {\n        .${Bl}.hide-divider {\n          border-bottom: none;\n        }\n      }\n\n      .hidden {\n        display: none;\n      }\n    </style>\n    <div class="${Bl} hidden">\n      <h2 class="${Bl}-title hidden"></h2>\n      <div class="${Bl}-description hidden"></div>\n    </div>\n    <div class="${Bl}-content hidden">\n      <div class="${Bl}-processing hidden">\n        <div class="${Bl}-processing-user"></div>\n        <div class="${Bl}-processing-status"></div>\n      </div>\n      <div class="${Bl}-children hidden">\n        <slot></slot>\n      </div>\n      <div class="${Bl}-disclaimer hidden"></div>\n    </div>\n  `, s(this, jl, this.attachShadow({
                mode: "open"
            }), "f"), o(this, jl, "f").appendChild(e.content.cloneNode(!0)), s(this, Cl, o(this, jl, "f").querySelector(`.${Bl}`), "f"), s(this, xl, o(this, jl, "f").querySelector(`.${Bl}-title`), "f"), s(this, Ll, o(this, jl, "f").querySelector(`.${Bl}-description`), "f"), s(this, Al, o(this, jl, "f").querySelector(`.${Bl}-content`), "f"), s(this, Tl, o(this, jl, "f").querySelector(`.${Bl}-processing`), "f"), s(this, El, o(this, jl, "f").querySelector(`.${Bl}-processing-user`), "f"), s(this, Ml, o(this, jl, "f").querySelector(`.${Bl}-children`), "f"), s(this, Ol, o(this, jl, "f").querySelector(`.${Bl}-disclaimer`), "f")
        }
        hideDivider() {
            o(this, Cl, "f").classList.add("hide-divider")
        }
        showDivider() {
            o(this, Cl, "f").classList.remove("hide-divider")
        }
        update(e) {
            s(this, Nl, Object.assign(Object.assign({}, o(this, Nl, "f")), e), "f"), o(this, zl, "m", ql).call(this), o(this, zl, "m", Rl).call(this), o(this, zl, "m", Dl).call(this)
        }
    }

    function Vl(e, t = !1) {
        const n = document.createElement("shop-modal-content");
        return t && n.hideDivider(), n.update(e), n
    }
    jl = new WeakMap, Cl = new WeakMap, xl = new WeakMap, Ll = new WeakMap, Al = new WeakMap, Tl = new WeakMap, El = new WeakMap, Il = new WeakMap, Ml = new WeakMap, Ol = new WeakMap, Nl = new WeakMap, zl = new WeakSet, ql = function() {
        const {
            title: e,
            description: t,
            authorizeState: n
        } = o(this, Nl, "f"), i = e || t;
        o(this, Cl, "f").classList.toggle("hidden", !i), o(this, xl, "f").classList.toggle("hidden", !e), o(this, Ll, "f").classList.toggle("hidden", !t), o(this, xl, "f").textContent = e || "", o(this, Ll, "f").textContent = t || "", n && (o(this, Cl, "f").classList.toggle("hide-divider", n === Gn.Start), o(this, Cl, "f").classList.toggle(`${Bl}--small`, n === Gn.Start))
    }, Rl = function() {
        var e;
        const {
            authorizeState: t,
            status: n,
            email: i
        } = o(this, Nl, "f"), a = Boolean(t || n), r = Boolean(n && i), l = Boolean(a && !r);
        if (o(this, Al, "f").classList.toggle("hidden", !a), o(this, Tl, "f").classList.toggle("hidden", !r), o(this, Ml, "f").classList.toggle("hidden", !l), !o(this, Il, "f") && r) {
            const n = t === Gn.OneClick ? Do.Branded : Do.Regular;
            s(this, Il, Fo(n), "f"), o(this, Tl, "f").appendChild(o(this, Il, "f")), null === (e = o(this, Il, "f")) || void 0 === e || e.setStatus({
                status: "loading",
                message: ""
            })
        }
        o(this, El, "f").textContent = i || ""
    }, Dl = function() {
        const {
            disclaimer: e
        } = o(this, Nl, "f"), t = Boolean(e);
        o(this, Ol, "f").classList.toggle("hidden", !t), o(this, Ol, "f").innerHTML = e || ""
    }, customElements.get("shop-modal-content") || customElements.define("shop-modal-content", Fl);
    const $l = window.location.origin,
        Wl = ({
            version: e,
            apiKey: t,
            analyticsTraceId: n,
            analyticsContext: i,
            isCompactLayout: a,
            isFullView: o,
            flow: s,
            flowVersion: r,
            signUpEnabled: l,
            oauthParams: c,
            avoidPayAltDomain: p,
            avoidSdkSession: d,
            hideCopy: u,
            modalCustomized: m,
            popupWindowParams: h,
            consentChallenge: _,
            checkoutRedirectUrl: g,
            checkoutVersion: f,
            checkoutToken: b,
            transactionParams: y,
            shopId: v,
            requireVerification: k,
            uxMode: w,
            error: P
        }) => "1" === e || "redirect" === w ? function(e) {
            return Boolean(void 0 !== e && "clientId" in e && (null == e ? void 0 : e.clientId))
        }(c) ? (({
            oauthParams: e,
            analyticsTraceId: t,
            analyticsContext: n,
            isCompactLayout: i,
            isFullView: a,
            flow: o,
            flowVersion: s,
            signUpEnabled: r,
            avoidPayAltDomain: l,
            hideCopy: c,
            modalCustomized: p,
            apiKey: d,
            popupWindowParams: u,
            consentChallenge: m,
            checkoutVersion: h,
            checkoutToken: _,
            transactionParams: g,
            shopId: f,
            requireVerification: b,
            uxMode: y,
            error: v
        }) => {
            const {
                clientId: k,
                redirectType: w
            } = e, P = e.scope || "openid email profile", S = e.responseType || "id_token", z = e.responseMode || "web_message", j = e.redirectUri || window.location.origin, {
                popUpName: C,
                popUpFeatures: x
            } = u || {}, L = "redirect" !== y && c, A = new URLSearchParams(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({
                target_origin: window.location.origin,
                response_mode: z,
                response_type: S,
                scope: P,
                version: "1",
                client_id: k
            }, w && {
                redirect_type: w
            }), {
                redirect_uri: j,
                locale: ko.getDefaultLanguage()
            }), t && {
                analytics_trace_id: t
            }), n && {
                analytics_context: n
            }), xo("compact_layout", i)), d && {
                apiKey: d
            }), o && {
                flow: o
            }), s && {
                flow_version: s
            }), e.codeChallenge && {
                code_challenge: e.codeChallenge
            }), e.codeChallengeMethod && {
                code_challenge_method: e.codeChallengeMethod
            }), e.state && {
                state: e.state
            }), h && {
                checkout_version: h
            }), _ && {
                checkout_token: _
            }), g && {
                transaction_params: g
            }), f && {
                shop_id: f
            }), v && {
                error: v
            }), xo("full_view", a)), xo("sign_up_enabled", r)), xo("hide_copy", L)), xo("customize-modal", p)), xo("consent_challenge", m)), xo("require_verification", b)), xo("preact", !1)), "pop_up" === w ? {
                pop_up_name: C,
                pop_up_features: x
            } : {}));
            return `${fi}${l?"/pay/sdk-authorize":"/pay/sdk-session"}?${A}`
        })({
            popupWindowParams: h,
            oauthParams: c,
            analyticsTraceId: n,
            analyticsContext: i,
            isCompactLayout: a,
            isFullView: o,
            flow: s,
            flowVersion: r,
            signUpEnabled: l,
            avoidPayAltDomain: p,
            hideCopy: u,
            modalCustomized: m,
            apiKey: t,
            consentChallenge: _,
            checkoutVersion: f,
            checkoutToken: b,
            transactionParams: y,
            shopId: v,
            requireVerification: k,
            uxMode: w,
            error: P
        }) : "" : (({
            analyticsTraceId: e,
            analyticsContext: t,
            isCompactLayout: n,
            isFullView: i,
            flow: a,
            flowVersion: o,
            signUpEnabled: s,
            avoidSdkSession: r,
            hideCopy: l,
            modalCustomized: c,
            apiKey: p,
            consentChallenge: d,
            checkoutRedirectUrl: u,
            checkoutVersion: m,
            checkoutToken: h,
            transactionParams: _,
            shopId: g,
            requireVerification: f,
            oauthParams: b,
            error: y
        }) => {
            const v = new URLSearchParams(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({
                target_origin: window.location.origin,
                api_key: null != p ? p : "123",
                locale: ko.getDefaultLanguage()
            }, e && {
                analytics_trace_id: e
            }), t && {
                analytics_context: t
            }), xo("compact_layout", n)), a && {
                flow: a
            }), o && {
                flow_version: o
            }), u && {
                checkout_redirect_url: u
            }), m && {
                checkout_version: m
            }), h && {
                checkout_token: h
            }), _ && {
                transaction_params: _
            }), g && {
                shop_id: g
            }), y && {
                error: y
            }), xo("full_view", i)), xo("sign_up_enabled", s)), xo("avoid_sdk_session", r)), xo("hide_copy", l)), xo("customize-modal", c)), xo("consent_challenge", d)), xo("require_verification", f)), xo("preact", !1)), (null == b ? void 0 : b.responseType) && {
                response_type: b.responseType
            }), (null == b ? void 0 : b.redirectType) && {
                redirect_type: b.redirectType
            }));
            return `${$l}/services/login_with_shop/authorize?${v}`
        })({
            analyticsTraceId: n,
            analyticsContext: i,
            isCompactLayout: a,
            isFullView: o,
            flow: s,
            flowVersion: r,
            signUpEnabled: l,
            avoidSdkSession: d,
            hideCopy: u,
            modalCustomized: m,
            apiKey: t,
            consentChallenge: _,
            checkoutRedirectUrl: g,
            checkoutVersion: f,
            checkoutToken: b,
            transactionParams: y,
            shopId: v,
            requireVerification: k,
            oauthParams: c,
            error: P
        });
    const Ul = "following";
    class Hl extends HTMLElement {
        constructor() {
            super(), this._rootElement = null, this._button = null, this._wrapper = null, this._heartIcon = null, this._followSpan = null, this._followingSpan = null, this._i18n = null, this._followTextWidth = 0, this._followingTextWidth = 0, customElements.get("shop-logo") || customElements.define("shop-logo", Ya)
        }
        connectedCallback() {
            return a(this, void 0, void 0, (function*() {
                yield this._initTranslations(), this._initElements()
            }))
        }
        setFollowing({
            following: e = !0,
            skipAnimation: t = !1
        }) {
            var n, i, a, o, s;
            null === (n = this._button) || void 0 === n || n.classList.toggle("button--animating", !t), null === (i = this._button) || void 0 === i || i.classList.toggle("button--following", e), null !== this._followSpan && null !== this._followingSpan && (this._followSpan.ariaHidden = e ? "true" : "false", this._followingSpan.ariaHidden = e ? "false" : "true"), this.style.setProperty("--button-width", `${e?this._followingTextWidth:this._followTextWidth}px`), window.matchMedia("(prefers-reduced-motion: reduce)").matches || t ? null === (a = this._heartIcon) || void 0 === a || a.setFilled(e) : null === (s = null === (o = this._button) || void 0 === o ? void 0 : o.querySelector(".follow-text")) || void 0 === s || s.addEventListener("transitionend", (() => {
                var t;
                null === (t = this._heartIcon) || void 0 === t || t.setFilled(e)
            }))
        }
        setFocused() {
            var e;
            null === (e = this._button) || void 0 === e || e.focus()
        }
        _initTranslations() {
            return a(this, void 0, void 0, (function*() {
                try {
                    const e = ko.getDefaultLanguage(),
                        t = yield function(e) {
                            switch (e) {
                                case "../translations/bg-BG.json":
                                    return Promise.resolve().then((function() {
                                        return b_
                                    }));
                                case "../translations/cs.json":
                                    return Promise.resolve().then((function() {
                                        return C_
                                    }));
                                case "../translations/da.json":
                                    return Promise.resolve().then((function() {
                                        return N_
                                    }));
                                case "../translations/de.json":
                                    return Promise.resolve().then((function() {
                                        return U_
                                    }));
                                case "../translations/el.json":
                                    return Promise.resolve().then((function() {
                                        return eg
                                    }));
                                case "../translations/en.json":
                                    return Promise.resolve().then((function() {
                                        return cg
                                    }));
                                case "../translations/es.json":
                                    return Promise.resolve().then((function() {
                                        return bg
                                    }));
                                case "../translations/fi.json":
                                    return Promise.resolve().then((function() {
                                        return Cg
                                    }));
                                case "../translations/fr.json":
                                    return Promise.resolve().then((function() {
                                        return Ng
                                    }));
                                case "../translations/hi.json":
                                    return Promise.resolve().then((function() {
                                        return Ug
                                    }));
                                case "../translations/hr-HR.json":
                                    return Promise.resolve().then((function() {
                                        return ef
                                    }));
                                case "../translations/hu.json":
                                    return Promise.resolve().then((function() {
                                        return pf
                                    }));
                                case "../translations/id.json":
                                    return Promise.resolve().then((function() {
                                        return yf
                                    }));
                                case "../translations/it.json":
                                    return Promise.resolve().then((function() {
                                        return xf
                                    }));
                                case "../translations/ja.json":
                                    return Promise.resolve().then((function() {
                                        return qf
                                    }));
                                case "../translations/ko.json":
                                    return Promise.resolve().then((function() {
                                        return Hf
                                    }));
                                case "../translations/lt-LT.json":
                                    return Promise.resolve().then((function() {
                                        return tb
                                    }));
                                case "../translations/ms.json":
                                    return Promise.resolve().then((function() {
                                        return pb
                                    }));
                                case "../translations/nb.json":
                                    return Promise.resolve().then((function() {
                                        return yb
                                    }));
                                case "../translations/nl.json":
                                    return Promise.resolve().then((function() {
                                        return xb
                                    }));
                                case "../translations/pl.json":
                                    return Promise.resolve().then((function() {
                                        return qb
                                    }));
                                case "../translations/pt-BR.json":
                                    return Promise.resolve().then((function() {
                                        return Hb
                                    }));
                                case "../translations/pt-PT.json":
                                    return Promise.resolve().then((function() {
                                        return ty
                                    }));
                                case "../translations/ro-RO.json":
                                    return Promise.resolve().then((function() {
                                        return py
                                    }));
                                case "../translations/ru.json":
                                    return Promise.resolve().then((function() {
                                        return yy
                                    }));
                                case "../translations/sk-SK.json":
                                    return Promise.resolve().then((function() {
                                        return xy
                                    }));
                                case "../translations/sl-SI.json":
                                    return Promise.resolve().then((function() {
                                        return qy
                                    }));
                                case "../translations/sv.json":
                                    return Promise.resolve().then((function() {
                                        return Hy
                                    }));
                                case "../translations/th.json":
                                    return Promise.resolve().then((function() {
                                        return tv
                                    }));
                                case "../translations/tr.json":
                                    return Promise.resolve().then((function() {
                                        return pv
                                    }));
                                case "../translations/vi.json":
                                    return Promise.resolve().then((function() {
                                        return yv
                                    }));
                                case "../translations/zh-CN.json":
                                    return Promise.resolve().then((function() {
                                        return xv
                                    }));
                                case "../translations/zh-TW.json":
                                    return Promise.resolve().then((function() {
                                        return qv
                                    }));
                                default:
                                    return new Promise((function(t, n) {
                                        ("function" == typeof queueMicrotask ? queueMicrotask : setTimeout)(n.bind(null, new Error("Unknown variable dynamic import: " + e)))
                                    }))
                            }
                        }(`../translations/${e}.json`);
                    this._i18n = new ko({
                        [e]: t
                    })
                } catch (e) {}
                return null
            }))
        }
        _initElements() {
            var e, t, n, i;
            const a = document.createElement("template");
            if (a.innerHTML = `\n    <style>\n      @keyframes followBackground {\n        0% {\n          width: 100%;\n          height: 100%;\n          transform: scaleY(1);\n        }\n\n        25% {\n          transform: scaleY(1);\n        }\n\n        50% {\n          transform: scaleY(1.2);\n        }\n\n        100% {\n          transform: scaleY(1);\n          width: 37px;\n          height: 37px;\n        }\n      }\n\n      :host {\n        display: inline-block;\n        line-height: normal;\n\n        --following-text-color: #000000;\n        --border-color: #5433EB;\n        --border-hover-color: #7f68e9;\n        --parent-width: var(--reserved-width, 177px);\n\n        /* Reserve width to prevent layout shifts */\n        width: var(--parent-width);\n      }\n\n      .button {\n        border: none;\n        margin: 0;\n        padding: 0;\n        overflow: visible;\n        isolation: isolate;\n\n        background: transparent;\n        color: #ffffff;\n        font: 16px/19px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica;\n\n        line-height: normal;\n\n        -webkit-font-smoothing: inherit;\n        -moz-osx-font-smoothing: inherit;\n\n        -webkit-appearance: none;\n        position: relative;\n        display: inline-block;\n        align-items: center;\n\n        height: 37px;\n        width: var(--button-width, 100%);\n        border-radius: 48px;\n      }\n\n      .button:focus,\n      .button:focus-visible {\n        outline: none;\n      }\n\n      .button--dark {\n        --following-text-color: #ffffff;\n      }\n\n      .button--bordered {\n        --border-color: #EDEDED;\n        --border-hover-color: #EDEDED;\n      }\n\n      .follow-icon-wrapper {\n        display: flex;\n        align-items: center;\n        width: auto;\n        position: relative;\n        z-index: 1;\n        top: 0;\n        left: 0;\n      }\n\n      .follow-icon-wrapper:before {\n        content: '';\n        background: #5433EB;\n        border-radius: 48px;\n        width: 100%;\n        height: 100%;\n        top: 0;\n        left: 0;\n        position: absolute;\n        z-index: -1;\n        transform-origin: center;\n        box-sizing: border-box;\n        border: 1px solid var(--border-color);\n      }\n\n      .button:not(.button--following):focus-visible .follow-icon-wrapper:before,\n      .button:not(.button--following):hover .follow-icon-wrapper:before {\n        background: #7f68e9;\n        border-color: var(--border-hover-color);\n      }\n\n      .follow-icon-wrapper shop-heart-icon {\n        position: absolute;\n        top: 11px;\n        left: 12px;\n      }\n\n      .follow-text,\n      .following-text {\n        white-space: nowrap;\n        padding: 9px 11px 9px 35px;\n        cursor: pointer;\n      }\n\n      .follow-text shop-logo,\n      .following-text shop-logo {\n        position: relative;\n        top: 3px;\n        padding-left: 1px;\n      }\n\n      .following-text {\n        opacity: 0;\n        pointer-events: none;\n        color: var(--following-text-color);\n        padding: 9px 8px 9px 43px;\n        position: absolute;\n        top: 0;\n        left: 0;\n        box-sizing: border-box;\n        overflow: hidden;\n        max-width: var(--button-width);\n      }\n\n      .following-icon {\n        opacity: 0;\n      }\n\n      .button--following .follow-icon-wrapper:before {\n        position: absolute;\n        width: 37px;\n        height: 37px;\n        padding: 0;\n      }\n\n      .button--following:focus-visible,\n      .button--following:hover {\n        background: rgb(217 217 217 / 0.2);\n      }\n\n      .button--following .follow-text,\n      .button--following .follow-icon {\n        opacity: 0;\n      }\n\n      .button--following .following-text {\n        opacity: 1;\n        width: auto;\n        pointer-events: auto;\n      }\n\n      .button--following .following-icon {\n        opacity: 1;\n      }\n\n      .button--following .follow-icon-wrapper shop-heart-icon {\n        transform: translateX(-1.5px);\n      }\n\n      @media (prefers-reduced-motion: no-preference) {\n        .button--animating {\n          transition: 400ms width cubic-bezier(0.45, 0, 0.15, 1);\n        }\n\n        .button--animating .follow-text {\n          transition: 200ms opacity cubic-bezier(0.45, 0, 1, 1);\n        }\n\n        .button--animating .following-text {\n          transition: 200ms opacity cubic-bezier(0, 0, 0.15, 1);\n          transition-delay: 0.2s;\n        }\n\n        .button--animating.button--following .follow-icon-wrapper:before {\n          animation: followBackground 0.4s cubic-bezier(0.45, 0, 0.15, 1);\n        }\n\n        .button--animating.button--following .follow-icon-wrapper shop-heart-icon {\n          transition: 400ms transform cubic-bezier(0.45, 0, 0.15, 1);\n        }\n      }\n    </style>\n    <button class="button">\n      <span class="follow-icon-wrapper">\n        <span class="follow-text">\n          <slot name="follow-text">\n            Follow on ${Kl("white")}\n          </slot>\n        </span>\n      </span>\n\n      <span class="following-text" aria-hidden="true">\n        <slot name="following-text">\n          Following on ${Kl("black")}\n        </slot>\n      </span>\n    </button>\n  `, this._rootElement = this.attachShadow({
                    mode: "open"
                }), this._rootElement.appendChild(a.content.cloneNode(!0)), this._i18n) {
                const e = this._i18n.translate("follow_on_shop.follow", {
                        shop: Kl("white")
                    }),
                    t = this._i18n.translate("follow_on_shop.following", {
                        shop: Kl("black")
                    });
                this._rootElement.querySelector('slot[name="follow-text"]').innerHTML = e, this._rootElement.querySelector('slot[name="following-text"]').innerHTML = t
            }
            this._button = this._rootElement.querySelector(".button"), this._wrapper = this._button.querySelector(".follow-icon-wrapper"), this._followSpan = null === (e = this._rootElement) || void 0 === e ? void 0 : e.querySelector("span.follow-text"), this._followingSpan = null === (t = this._rootElement) || void 0 === t ? void 0 : t.querySelector("span.following-text"), this._heartIcon = Ja(), this._wrapper.prepend(this._heartIcon), this._followTextWidth = (null === (n = this._rootElement.querySelector(".follow-text")) || void 0 === n ? void 0 : n.scrollWidth) || 0, this._followingTextWidth = (null === (i = this._rootElement.querySelector(".following-text")) || void 0 === i ? void 0 : i.scrollWidth) || 0, this.style.setProperty("--reserved-width", `${Math.max(this._followTextWidth,this._followingTextWidth)}px`), this.setFollowing({
                following: this.hasAttribute(Ul),
                skipAnimation: !0
            }), this._setButtonStyle()
        }
        _setButtonStyle() {
            var e, t;
            const n = Aa(this),
                i = Ca(n, "#ffffff") > Ca(n, "#000000"),
                a = Ca(n, "#5433EB") <= 3.06;
            if (null === (e = this._button) || void 0 === e || e.classList.toggle("button--dark", i), null === (t = this._button) || void 0 === t || t.classList.toggle("button--bordered", a), i && this._i18n) {
                const e = this._i18n.translate("follow_on_shop.following", {
                    shop: Kl("white")
                });
                this._rootElement.querySelector('slot[name="following-text"]').innerHTML = e
            }
        }
    }

    function Kl(e) {
        return `<shop-logo role="img" color=${e} size="15" style="display: inline-flex;" aria-label="Shop"></shop-logo>`
    }
    var Zl, Gl, Jl, Yl, Ql, Xl, ec, tc, nc, ic;
    customElements.get("follow-on-shop-button") || customElements.define("follow-on-shop-button", Hl);
    const ac = "store-logo";
    class oc extends HTMLElement {
        constructor() {
            super(), Zl.add(this), Gl.set(this, void 0), Jl.set(this, void 0), Yl.set(this, void 0), Ql.set(this, void 0), Xl.set(this, void 0), ec.set(this, void 0), tc.set(this, ""), nc.set(this, "");
            const e = document.createElement("template");
            e.innerHTML = `\n    <style>\n      @keyframes heartBeat {\n        0% {\n          transform: scale(1);\n        }\n\n        25% {\n          transform: scale(1.12);\n        }\n\n        50% {\n          transform: scale(0.9);\n        }\n\n        70% {\n          transform: scale(1);\n        }\n      }\n\n      :host {\n        display: flex;\n        justify-content: center;\n        font-family: -apple-system,San Francisco,Roboto,Segoe UI,Helvetica Neue,sans-serif !important;\n      }\n\n      .${ac} {\n        display: inline-block;\n        position: relative;\n      }\n\n      .${ac}-logo-wrapper {\n        width: 58px;\n        height: 58px;\n        border-radius: 100%;\n        background: linear-gradient(0deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), #FFFFFF;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        position: relative;\n        overflow: hidden;\n        box-sizing: border-box;\n      }\n\n      .${ac}-logo-wrapper--text {\n        background: ${Pa.foregroundSecondary};\n      }\n\n      .${ac}-logo-wrapper--text img,\n      .${ac}-logo-wrapper--image span {\n        display: none;\n      }\n\n      .${ac}-logo-wrapper--text span,\n      .${ac}-logo-wrapper--image img {\n        display: block;\n      }\n\n      .${ac}-logo-wrapper img {\n        max-width: 100%;\n        max-height: 100%;\n        object-fit: contain;\n      }\n\n      .${ac}-icon-wrapper {\n        position: absolute;\n        top: -16px;\n        left: 28px;\n        width: 36px;\n        height: 36px;\n        border-radius: 100%;\n        background: rgba(40, 40, 40, 0.3);\n        /* Note: backdrop-filter has minimal browser support */\n        -webkit-backdrop-filter: blur(24px);\n        backdrop-filter: blur(24px);\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        box-sizing: border-box;\n      }\n\n      .${ac}-text {\n        font-size: 28px;\n        line-height: 32px;\n        font-weight: 500;\n        color: ${Pa.white};\n        text-transform: capitalize;\n      }\n\n      .${ac}--favorited .${ac}-icon-wrapper {\n        background: ${Pa.brand};\n      }\n\n      @media (forced-colors: active) {\n        .${ac}-logo-wrapper--text,\n        .${ac}-icon-wrapper {\n          border: 1px solid;\n        }\n      }\n\n      @media (prefers-reduced-motion: no-preference) {\n        .${ac}-icon-wrapper {\n          transition: background 0.1s 0.75s cubic-bezier(0.45, 0, 0.15, 1);\n        }\n\n        .${ac}--favorited shop-heart-icon {\n          transform-origin: center;\n          animation: 0.4s cubic-bezier(0.45, 0, 0.15, 1) 0.75s heartBeat;\n        }\n      }\n    </style>\n    <div class="${ac}">\n      <div class="${ac}-logo-wrapper">\n        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==" alt="" class="${ac}-image">\n        <span class="${ac}-text"></span>\n      </div>\n      <div class="${ac}-icon-wrapper"></div>\n    </div>\n  `, s(this, Gl, this.attachShadow({
                mode: "open"
            }), "f"), o(this, Gl, "f").appendChild(e.content.cloneNode(!0)), s(this, Jl, o(this, Gl, "f").querySelector(`.${ac}`), "f"), s(this, Yl, o(this, Gl, "f").querySelector(`.${ac}-logo-wrapper`), "f"), s(this, Ql, o(this, Yl, "f").querySelector("img"), "f"), s(this, Xl, o(this, Yl, "f").querySelector("span"), "f"), s(this, ec, Ja(), "f"), o(this, Gl, "f").querySelector(`.${ac}-icon-wrapper`).append(o(this, ec, "f"))
        }
        update({
            name: e,
            logoSrc: t
        }) {
            s(this, tc, e || o(this, tc, "f"), "f"), s(this, nc, t || o(this, nc, "f"), "f"), o(this, Zl, "m", ic).call(this)
        }
        connectedCallback() {
            o(this, Ql, "f").addEventListener("error", (() => {
                s(this, nc, "", "f"), o(this, Zl, "m", ic).call(this)
            }))
        }
        setFavorited() {
            return o(this, Jl, "f").classList.add(`${ac}--favorited`), window.matchMedia("(prefers-reduced-motion: reduce)").matches ? (o(this, ec, "f").setFilled(), Promise.resolve()) : new Promise((e => {
                o(this, ec, "f").addEventListener("animationstart", (() => {
                    o(this, ec, "f").setFilled()
                })), o(this, ec, "f").addEventListener("animationend", (() => {
                    setTimeout(e, 1e3)
                }))
            }))
        }
    }
    var sc, rc, lc, cc, pc, dc, uc, mc, hc, _c, gc, fc, bc, yc, vc, kc, wc, Pc, Sc, zc, jc, Cc, xc, Lc, Ac, Tc, Ec, Ic, Mc, Oc, Nc, qc, Rc, Dc, Bc, Fc, Vc, $c, Wc, Uc, Hc, Kc, Zc, Gc, Jc, Yc, Qc, Xc, ep, tp, np;
    Gl = new WeakMap, Jl = new WeakMap, Yl = new WeakMap, Ql = new WeakMap, Xl = new WeakMap, ec = new WeakMap, tc = new WeakMap, nc = new WeakMap, Zl = new WeakSet, ic = function() {
            const e = o(this, tc, "f"),
                t = o(this, Ql, "f").src;
            o(this, Xl, "f").textContent = e.charAt(0), o(this, Xl, "f").ariaLabel = e, o(this, nc, "f") && o(this, nc, "f") !== t ? (o(this, Ql, "f").src = o(this, nc, "f"), o(this, Ql, "f").alt = e, o(this, Yl, "f").classList.remove(`${ac}-logo-wrapper--text`), o(this, Yl, "f").classList.add(`${ac}-logo-wrapper--image`)) : o(this, nc, "f") || (o(this, Yl, "f").classList.remove(`${ac}-logo-wrapper--image`), o(this, Yl, "f").classList.add(`${ac}-logo-wrapper--text`))
        }, customElements.get(ac) || customElements.define(ac, oc),
        function(e) {
            e.Closed = "closed", e.Mounting = "mounting", e.Open = "open"
        }(np || (np = {}));
    class ip extends wo {
        static get observedAttributes() {
            return [Li, Ai, Ei, ta]
        }
        constructor() {
            super(), sc.add(this), rc.set(this, void 0), lc.set(this, I()), cc.set(this, ""), pc.set(this, "2"), dc.set(this, window.location.origin), uc.set(this, !1), mc.set(this, new xn({
                elementName: "shop-follow-button",
                analyticsTraceId: o(this, lc, "f")
            })), hc.set(this, void 0), _c.set(this, void 0), gc.set(this, !1), fc.set(this, null), bc.set(this, void 0), yc.set(this, void 0), vc.set(this, void 0), kc.set(this, void 0), wc.set(this, void 0), Pc.set(this, void 0), Sc.set(this, void 0), zc.set(this, void 0), jc.set(this, void 0), Cc.set(this, np.Closed), xc.set(this, void 0), Lc.set(this, void 0), Ac.set(this, void 0), Tc.set(this, new p("following", !1)), Ec.set(this, null), Ic.set(this, ""), Mc.set(this, (() => {
                o(this, sc, "m", Wc).call(this, !0)
            })), s(this, rc, this.attachShadow({
                mode: "open"
            }), "f"), s(this, gc, o(this, Tc, "f").value, "f")
        }
        attributeChangedCallback(e, t, n) {
            switch (e) {
                case Ai:
                    s(this, pc, n, "f"), o(this, sc, "m", Wc).call(this);
                    break;
                case Li:
                    s(this, cc, n, "f"), o(this, sc, "m", Wc).call(this);
                    break;
                case Ei:
                    s(this, dc, n, "f"), ki(o(this, dc, "f"));
                    break;
                case ta:
                    s(this, uc, "true" === n, "f"), o(this, sc, "m", Wc).call(this)
            }
        }
        connectedCallback() {
            return a(this, void 0, void 0, (function*() {
                this.subscribeToHub(dt.UserStatusIdentity, o(this, Mc, "f")), yield o(this, sc, "m", Oc).call(this), o(this, sc, "m", Nc).call(this), o(this, sc, "m", qc).call(this)
            }))
        }
        disconnectedCallback() {
            var e, t, n, i;
            this.unsubscribeAllFromHub(), null === (e = o(this, yc, "f")) || void 0 === e || e.destroy(), null === (t = o(this, hc, "f")) || void 0 === t || t.disconnect(), null === (n = o(this, wc, "f")) || void 0 === n || n.destroy(), null === (i = o(this, Pc, "f")) || void 0 === i || i.destroy()
        }
    }
    rc = new WeakMap, lc = new WeakMap, cc = new WeakMap, pc = new WeakMap, dc = new WeakMap, uc = new WeakMap, mc = new WeakMap, hc = new WeakMap, _c = new WeakMap, gc = new WeakMap, fc = new WeakMap, bc = new WeakMap, yc = new WeakMap, vc = new WeakMap, kc = new WeakMap, wc = new WeakMap, Pc = new WeakMap, Sc = new WeakMap, zc = new WeakMap, jc = new WeakMap, Cc = new WeakMap, xc = new WeakMap, Lc = new WeakMap, Ac = new WeakMap, Tc = new WeakMap, Ec = new WeakMap, Ic = new WeakMap, Mc = new WeakMap, sc = new WeakSet, Oc = function() {
        return a(this, void 0, void 0, (function*() {
            try {
                const e = ko.getDefaultLanguage(),
                    t = yield function(e) {
                        switch (e) {
                            case "./translations/bg-BG.json":
                                return Promise.resolve().then((function() {
                                    return b_
                                }));
                            case "./translations/cs.json":
                                return Promise.resolve().then((function() {
                                    return C_
                                }));
                            case "./translations/da.json":
                                return Promise.resolve().then((function() {
                                    return N_
                                }));
                            case "./translations/de.json":
                                return Promise.resolve().then((function() {
                                    return U_
                                }));
                            case "./translations/el.json":
                                return Promise.resolve().then((function() {
                                    return eg
                                }));
                            case "./translations/en.json":
                                return Promise.resolve().then((function() {
                                    return cg
                                }));
                            case "./translations/es.json":
                                return Promise.resolve().then((function() {
                                    return bg
                                }));
                            case "./translations/fi.json":
                                return Promise.resolve().then((function() {
                                    return Cg
                                }));
                            case "./translations/fr.json":
                                return Promise.resolve().then((function() {
                                    return Ng
                                }));
                            case "./translations/hi.json":
                                return Promise.resolve().then((function() {
                                    return Ug
                                }));
                            case "./translations/hr-HR.json":
                                return Promise.resolve().then((function() {
                                    return ef
                                }));
                            case "./translations/hu.json":
                                return Promise.resolve().then((function() {
                                    return pf
                                }));
                            case "./translations/id.json":
                                return Promise.resolve().then((function() {
                                    return yf
                                }));
                            case "./translations/it.json":
                                return Promise.resolve().then((function() {
                                    return xf
                                }));
                            case "./translations/ja.json":
                                return Promise.resolve().then((function() {
                                    return qf
                                }));
                            case "./translations/ko.json":
                                return Promise.resolve().then((function() {
                                    return Hf
                                }));
                            case "./translations/lt-LT.json":
                                return Promise.resolve().then((function() {
                                    return tb
                                }));
                            case "./translations/ms.json":
                                return Promise.resolve().then((function() {
                                    return pb
                                }));
                            case "./translations/nb.json":
                                return Promise.resolve().then((function() {
                                    return yb
                                }));
                            case "./translations/nl.json":
                                return Promise.resolve().then((function() {
                                    return xb
                                }));
                            case "./translations/pl.json":
                                return Promise.resolve().then((function() {
                                    return qb
                                }));
                            case "./translations/pt-BR.json":
                                return Promise.resolve().then((function() {
                                    return Hb
                                }));
                            case "./translations/pt-PT.json":
                                return Promise.resolve().then((function() {
                                    return ty
                                }));
                            case "./translations/ro-RO.json":
                                return Promise.resolve().then((function() {
                                    return py
                                }));
                            case "./translations/ru.json":
                                return Promise.resolve().then((function() {
                                    return yy
                                }));
                            case "./translations/sk-SK.json":
                                return Promise.resolve().then((function() {
                                    return xy
                                }));
                            case "./translations/sl-SI.json":
                                return Promise.resolve().then((function() {
                                    return qy
                                }));
                            case "./translations/sv.json":
                                return Promise.resolve().then((function() {
                                    return Hy
                                }));
                            case "./translations/th.json":
                                return Promise.resolve().then((function() {
                                    return tv
                                }));
                            case "./translations/tr.json":
                                return Promise.resolve().then((function() {
                                    return pv
                                }));
                            case "./translations/vi.json":
                                return Promise.resolve().then((function() {
                                    return yv
                                }));
                            case "./translations/zh-CN.json":
                                return Promise.resolve().then((function() {
                                    return xv
                                }));
                            case "./translations/zh-TW.json":
                                return Promise.resolve().then((function() {
                                    return qv
                                }));
                            default:
                                return new Promise((function(t, n) {
                                    ("function" == typeof queueMicrotask ? queueMicrotask : setTimeout)(n.bind(null, new Error("Unknown variable dynamic import: " + e)))
                                }))
                        }
                    }(`./translations/${e}.json`);
                s(this, Ec, new ko({
                    [e]: t
                }), "f")
            } catch (e) {}
            return null
        }))
    }, Nc = function() {
        s(this, _c, function(e) {
            const t = document.createElement("follow-on-shop-button");
            return e && t.setAttribute(Ul, ""), t
        }(o(this, gc, "f")), "f"), o(this, rc, "f").innerHTML = Cn, o(this, rc, "f").appendChild(o(this, _c, "f"))
    }, qc = function() {
        var e;
        o(this, sc, "m", Kc).call(this, o(this, gc, "f")), o(this, sc, "m", Zc).call(this), ki(o(this, dc, "f")), null === (e = o(this, _c, "f")) || void 0 === e || e.addEventListener("click", (() => {
            var e;
            if (o(this, uc, "f")) return s(this, gc, !o(this, gc, "f"), "f"), void(null === (e = o(this, _c, "f")) || void 0 === e || e.setFollowing({
                following: o(this, gc, "f")
            }));
            o(this, gc, "f") ? (o(this, mc, "f").trackFollowingGetAppButtonPageImpression(), Boolean(navigator.userAgent) && /(android|iphone|ipad|mobile|phone)/i.test(navigator.userAgent) ? o(this, sc, "m", Dc).call(this) : o(this, sc, "m", $c).call(this)) : (o(this, mc, "f").trackFollowButtonClicked(), o(this, sc, "m", Rc).call(this))
        }))
    }, Rc = function() {
        o(this, Sc, "f") ? o(this, sc, "m", Xc).call(this) : (s(this, zc, o(this, sc, "m", Bc).call(this), "f"), s(this, jc, Vl({}), "f"), o(this, jc, "f").append(o(this, sc, "m", Fc).call(this)), s(this, wc, Sl().withInnerHTML(Cn).build(), "f"), o(this, wc, "f").setNametagSuffix("follow"), s(this, Sc, o(this, wc, "f").sheetModal, "f"), o(this, Sc, "f").setAttribute(Fi, o(this, lc, "f")), o(this, Sc, "f").appendChild(o(this, zc, "f")), o(this, Sc, "f").appendChild(o(this, jc, "f")), o(this, Sc, "f").addEventListener("modalcloserequest", o(this, sc, "m", ep).bind(this)), o(this, Sc, "f").setMonorailTracker(o(this, mc, "f")), s(this, Cc, np.Mounting, "f"))
    }, Dc = function() {
        return a(this, void 0, void 0, (function*() {
            var e, t, n;
            if (!o(this, xc, "f")) {
                s(this, Pc, Sl().withInnerHTML(Cn).build(), "f"), o(this, Pc, "f").setNametagSuffix("followed"), s(this, xc, o(this, Pc, "f").sheetModal, "f"), o(this, xc, "f").setMonorailTracker(o(this, mc, "f")), o(this, xc, "f").setAttribute("disable-popup", "true");
                const i = yield o(this, sc, "m", Gc).call(this), r = null !== (e = null == i ? void 0 : i.name) && void 0 !== e ? e : "the store", l = null === (t = o(this, Ec, "f")) || void 0 === t ? void 0 : t.translate("follow_on_shop.following_modal.title", {
                    store: r
                }), c = null === (n = o(this, Ec, "f")) || void 0 === n ? void 0 : n.translate("follow_on_shop.following_modal.subtitle");
                s(this, Lc, Vl({
                    title: l,
                    description: c
                }, !0), "f"), o(this, xc, "f").appendChild(o(this, Lc, "f")), o(this, xc, "f").appendChild(yield o(this, sc, "m", Vc).call(this)), o(this, xc, "f").addEventListener("modalcloserequest", (() => a(this, void 0, void 0, (function*() {
                    var e;
                    o(this, xc, "f") && (yield o(this, xc, "f").close({
                        reason: "user_dismissed"
                    })), null === (e = o(this, _c, "f")) || void 0 === e || e.setFocused()
                })))), l && o(this, xc, "f").setAttribute("title", l)
            }
            o(this, xc, "f").open("user_button_clicked"), o(this, mc, "f").trackFollowingGetAppButtonPageImpression()
        }))
    }, Bc = function() {
        const e = document.createElement(ac);
        return o(this, sc, "m", Gc).call(this).then((t => {
            e.update({
                name: (null == t ? void 0 : t.name) || "",
                logoSrc: (null == t ? void 0 : t.id) ? `${yi}/shops/${t.id}/logo?width=58` : ""
            })
        })).catch((() => {})), e
    }, Fc = function() {
        var e;
        s(this, bc, document.createElement("iframe"), "f"), o(this, bc, "f").tabIndex = 0, o(this, sc, "m", Wc).call(this);
        const t = (null === (e = this.ownerDocument) || void 0 === e ? void 0 : e.defaultView) || void 0;
        return s(this, yc, new gi(new Si(o(this, bc, "f")), [fi, bi, o(this, dc, "f")], o(this, sc, "m", tp).bind(this), t), "f"), s(this, vc, new Pi(o(this, bc, "f")), "f"), T(o(this, bc, "f"), "allow", "publickey-credentials-get *"), o(this, bc, "f")
    }, Vc = function() {
        return a(this, void 0, void 0, (function*() {
            var e, t;
            const n = document.createElement("div"),
                i = yield o(this, sc, "m", Gc).call(this), s = null == i ? void 0 : i.id, r = null !== (t = null === (e = o(this, Ec, "f")) || void 0 === e ? void 0 : e.translate("follow_on_shop.following_modal.continue", {
                    defaultValue: "Continue"
                })) && void 0 !== t ? t : "", l = s ? `https://shop.app/sid/${s}` : "#";
            return n.innerHTML = ((e, t) => `<style>\n  .fos-get-app-button {\n    color: #fff;\n    font-size: 16px;\n    display: flex;\n    justify-content: center;\n    background: #5433EB;\n    border-radius: 6px;\n    align-items: center;\n    padding: 12px;\n    text-decoration: none;\n    color: #ffffff;\n    line-height: 24px;\n  }</style><a href="${e}" class="fos-get-app-button">${t}</a>`)(l, r), n.addEventListener("click", (() => a(this, void 0, void 0, (function*() {
                var e;
                o(this, mc, "f").trackFollowingGetAppButtonClicked(), null === (e = o(this, xc, "f")) || void 0 === e || e.close({
                    reason: "user_dismissed"
                })
            })))), n
        }))
    }, $c = function() {
        return a(this, void 0, void 0, (function*() {
            var e, t, n, i, a, r, l;
            if (!o(this, Ac, "f")) {
                s(this, Ac, document.createElement("div"), "f"), o(this, Ac, "f").classList.add("fos-tooltip", "fos-tooltip-hidden");
                const c = yield o(this, sc, "m", Gc).call(this), p = null !== (e = null == c ? void 0 : c.name) && void 0 !== e ? e : "the store", d = null !== (n = null === (t = o(this, Ec, "f")) || void 0 === t ? void 0 : t.translate("follow_on_shop.following_modal.qr_header", {
                    store: p
                })) && void 0 !== n ? n : "", u = null !== (a = null === (i = o(this, Ec, "f")) || void 0 === i ? void 0 : i.translate("follow_on_shop.following_modal.qr_alt_text")) && void 0 !== a ? a : "", m = null == c ? void 0 : c.id, h = m ? `${yi}/qr/sid/${m}` : "#";
                o(this, Ac, "f").innerHTML = ((e, t, n) => `\n<style>\n  .fos-tooltip {\n    position: relative;\n    display: flex;\n    left: -10px;\n  }\n\n  .fos-tooltip-popup {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    visibility: visible;\n    background-color: #fff;\n    text-align: center;\n    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.35);\n    border-radius: 14px;\n    position: absolute;\n    width: 220px;\n    bottom: 78px;\n    z-index: ${w} !important;\n  }\n\n  .fos-tooltip-popup::after {\n    content: " ";\n    position: absolute;\n    top: 100%; /* At the bottom of the tooltip */\n    left: 18px;\n    margin-left: -3px;\n    border-width: 13px;\n    border-style: solid;\n    border-color: white transparent transparent transparent;\n    transform: scale(1, 0.75) translateY(-7px);\n  }\n\n  .fos-tooltip-overlay {\n    position: fixed;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    z-index: 2147483646 !important;\n    will-change: opacity, transform;\n  }\n\n  .fos-tooltip-text {\n    color: #000;\n    font-size: 16px;\n    line-height: 18px;\n    padding: 24px 24px 16px;\n    max-width: 100%;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n\n  .fos-tooltip-code-frame {\n    background: #ffffff;\n    forced-color-adjust: none;\n  }\n\n  .fos-tooltip-code {\n    width: 147px;\n    height: 147px;\n    display: block;\n  }\n\n  .fos-tooltip-shop-logo {\n    padding: 16px 0 24px 0;\n    display: flex;\n    justify-content: center;\n  }\n\n  .fos-tooltip-shop-logo shop-logo {\n    display: inline-flex;\n  }\n\n  .fos-tooltip-hidden {\n    height: 0 !important;\n    border: 0;\n    padding: 0;\n    margin: 0;\n    visibility: hidden;\n    overflow: hidden;\n  }\n\n  @media (forced-colors: active) {\n    .fos-tooltip-popup {\n      border: 1px solid;\n    }\n\n    .fos-tooltip-popup::after {\n      display: none;\n    }\n  }\n</style>\n<div class="fos-tooltip-overlay"></div>\n<div class="fos-tooltip-popup">\n    <div class="fos-tooltip-text">${e}</div>\n    <div class="fos-tooltip-code-frame">\n      <img src="${t}" class="fos-tooltip-code" alt="${n}"/>\n    </div>\n    <div class="fos-tooltip-shop-logo">\n      <shop-logo role="img" size="20" color="brand" label="Shop"/>\n    </div>\n  </div>\n`)(d, h, u), null === (r = o(this, Ac, "f").querySelector(".fos-tooltip-overlay")) || void 0 === r || r.addEventListener("click", (() => {
                    var e;
                    null === (e = o(this, Ac, "f")) || void 0 === e || e.classList.toggle("fos-tooltip-hidden", !0)
                })), null === (l = o(this, Ac, "f")) || void 0 === l || l.addEventListener("click", (() => {
                    var e;
                    null === (e = o(this, Ac, "f")) || void 0 === e || e.classList.toggle("fos-tooltip-hidden", !0)
                })), o(this, rc, "f").appendChild(o(this, Ac, "f"))
            }
            o(this, Ac, "f").classList.toggle("fos-tooltip-hidden", !1)
        }))
    }, Wc = function(e) {
        if (o(this, bc, "f")) {
            const t = {
                    clientId: o(this, cc, "f"),
                    responseType: "code"
                },
                n = Wl({
                    version: o(this, pc, "f"),
                    analyticsTraceId: o(this, lc, "f"),
                    flow: Zn.Follow,
                    error: o(this, Ic, "f"),
                    oauthParams: t
                });
            o(this, sc, "m", Uc).call(this), T(o(this, bc, "f"), "src", n, e)
        }
    }, Uc = function() {
        o(this, sc, "m", Hc).call(this), s(this, kc, setTimeout((() => {
            const e = xi;
            this.dispatchCustomEvent("error", {
                message: e.message,
                code: e.code
            }), o(this, sc, "m", Hc).call(this)
        }), 1e4), "f")
    }, Hc = function() {
        o(this, kc, "f") && (clearTimeout(o(this, kc, "f")), s(this, kc, void 0, "f"))
    }, Kc = function(e) {
        o(this, mc, "f").trackFollowButtonPageImpression(e)
    }, Zc = function() {
        s(this, hc, new IntersectionObserver((e => {
            var t;
            for (const {
                    isIntersecting: n
                } of e) n && (null === (t = o(this, hc, "f")) || void 0 === t || t.disconnect(), o(this, mc, "f").trackFollowButtonInViewport())
        })), "f"), o(this, hc, "f").observe(o(this, _c, "f"))
    }, Gc = function() {
        return a(this, void 0, void 0, (function*() {
            return o(this, fc, "f") || s(this, fc, yield M(o(this, dc, "f")), "f"), o(this, fc, "f")
        }))
    }, Jc = function(e) {
        return a(this, arguments, void 0, (function*({
            loggedIn: e,
            shouldFinalizeLogin: t,
            email: n,
            givenName: i,
            avatar: a
        }) {
            var r, l, c, p;
            o(this, Tc, "f").set(!0), e && t && (P(o(this, dc, "f"), (e => {})), this.publishToHub(dt.UserSessionCreate, {
                email: i || n,
                initial: (null == i ? void 0 : i[0]) || (null == n ? void 0 : n[0]) || "",
                avatar: a
            })), this.dispatchCustomEvent("completed", {
                loggedIn: e,
                email: n
            }), yield null === (r = o(this, zc, "f")) || void 0 === r ? void 0 : r.setFavorited(), yield null === (l = o(this, Sc, "f")) || void 0 === l ? void 0 : l.close({
                reason: "event_completed"
            }), null === (c = o(this, yc, "f")) || void 0 === c || c.destroy(), null === (p = o(this, _c, "f")) || void 0 === p || p.setFollowing({
                following: !0
            }), s(this, gc, !0, "f"), o(this, sc, "m", Kc).call(this, !0)
        }))
    }, Yc = function(e, t, n) {
        var i;
        o(this, sc, "m", Hc).call(this), e === Jn.RetriableServerError && (null === (i = o(this, jc, "f")) || void 0 === i || i.update({
            status: void 0
        }), s(this, Ic, e, "f"), o(this, sc, "m", Wc).call(this, !0)), this.dispatchCustomEvent("error", {
            code: e,
            message: t,
            email: n
        })
    }, Qc = function(e) {
        return a(this, arguments, void 0, (function*({
            clientName: e,
            logoSrc: t
        }) {
            (e || t) && o(this, zc, "f").update({
                name: e,
                logoSrc: t
            }), o(this, mc, "f").trackShopPayModalStateChange({
                currentState: Zt.Loaded,
                reason: "event_loaded"
            }), o(this, Cc, "f") === np.Mounting && (o(this, sc, "m", Xc).call(this), s(this, Cc, np.Open, "f"), o(this, sc, "m", Hc).call(this))
        }))
    }, Xc = function() {
        return a(this, void 0, void 0, (function*() {
            var e;
            (yield o(this, Sc, "f").open("user_button_clicked")) && (null === (e = o(this, vc, "f")) || void 0 === e || e.postMessage({
                type: "sheetmodalopened"
            }))
        }))
    }, ep = function() {
        return a(this, void 0, void 0, (function*() {
            var e, t;
            if (o(this, Sc, "f")) {
                (yield o(this, Sc, "f").close({
                    reason: "user_dismissed"
                })) && (null === (e = o(this, vc, "f")) || void 0 === e || e.postMessage({
                    type: "sheetmodalclosed"
                }), _t())
            }
            null === (t = o(this, _c, "f")) || void 0 === t || t.setFocused()
        }))
    }, tp = function(e) {
        var t, n, i, a;
        switch (e.type) {
            case "loaded":
                o(this, sc, "m", Qc).call(this, e);
                break;
            case "resize_iframe":
                o(this, bc, "f").style.height = `${e.height}px`, o(this, bc, "f").style.width = `${Lo(e.width,o(this,bc,"f"))}px`;
                break;
            case "completed":
                o(this, sc, "m", Jc).call(this, e);
                break;
            case "error":
                o(this, sc, "m", Yc).call(this, e.code, e.message, e.email);
                break;
            case "content":
                null === (t = o(this, Sc, "f")) || void 0 === t || t.setAttribute("title", e.title), null === (n = o(this, jc, "f")) || void 0 === n || n.update(e), null === (i = o(this, zc, "f")) || void 0 === i || i.classList.toggle("hidden", e.authorizeState === Gn.Captcha);
                break;
            case "processing_status_updated":
                null === (a = o(this, jc, "f")) || void 0 === a || a.update(e);
                break;
            case "close_requested":
                o(this, sc, "m", ep).call(this)
        }
    };
    const ap = [Ln.CheckoutModal, Ln.ClassicCustomerAccounts, Ln.Web, Ln.SelfServe];

    function op(e) {
        if (!e) return;
        const t = parseInt(e, 10);
        return isNaN(t) ? void 0 : t
    }
    var sp, rp, lp, cp;
    class pp extends HTMLElement {
        constructor() {
            super(), sp.add(this), rp.set(this, null), lp.set(this, null), customElements.get("shop-logo") || customElements.define("shop-logo", Ya)
        }
        connectedCallback() {
            return a(this, void 0, void 0, (function*() {
                if (yield o(this, sp, "m", cp).call(this), this.shadowRoot) return;
                const e = document.createElement("template");
                if (e.innerHTML = `\n    <style>\n      :host {\n        display: inline-block;\n        line-height: normal;\n      }\n\n      /* TODO: Centralize styling of shop branded buttons: https://github.com/Shopify/shop-identity/issues/1252 */\n      .button {\n        border: none;\n        margin: 0;\n        padding: 0;\n        width: auto;\n        overflow: visible;\n\n        background: #5433EB;\n        border-radius: var(--buttons-radius, 4px);\n        color: #ffffff;\n        font: 16px/19px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica;\n\n        line-height: normal;\n\n        -webkit-font-smoothing: inherit;\n        -moz-osx-font-smoothing: inherit;\n\n        -webkit-appearance: none;\n        position: relative;\n        display: flex;\n        align-items: center;\n\n        transition: background-color 100ms ease-in-out, opacity 100ms ease-out, color 100ms ease-in-out;\n      }\n\n      .button:hover {\n        background: #7f68e9;\n      }\n\n      .login-text {\n        white-space: nowrap;\n        padding: 14px 45px;\n        cursor: pointer;\n      }\n\n      .login-text shop-logo {\n        position: relative;\n        top: 3px;\n      }\n    </style>\n    <button class="button">\n      <span class="login-text">\n        <slot name="login-text">\n          Login with ${dp("white")}\n        </slot>\n      </span>\n    </button>\n  `, s(this, rp, this.attachShadow({
                        mode: "open"
                    }), "f"), o(this, rp, "f").appendChild(e.content.cloneNode(!0)), o(this, lp, "f")) {
                    const e = o(this, lp, "f").translate("login_with_shop.login", {
                        shop: dp("white")
                    });
                    o(this, rp, "f").querySelector('slot[name="login-text"]').innerHTML = e
                }
            }))
        }
        setFocused() {
            var e, t;
            null === (t = null === (e = o(this, rp, "f")) || void 0 === e ? void 0 : e.querySelector("button")) || void 0 === t || t.focus()
        }
    }

    function dp(e) {
        return `<shop-logo role="img" color=${e} size="15" style="display: inline-flex;"></shop-logo>`
    }
    rp = new WeakMap, lp = new WeakMap, sp = new WeakSet, cp = function() {
        return a(this, void 0, void 0, (function*() {
            try {
                const e = ko.getDefaultLanguage(),
                    t = yield function(e) {
                        switch (e) {
                            case "../translations/bg-BG.json":
                                return Promise.resolve().then((function() {
                                    return b_
                                }));
                            case "../translations/cs.json":
                                return Promise.resolve().then((function() {
                                    return C_
                                }));
                            case "../translations/da.json":
                                return Promise.resolve().then((function() {
                                    return N_
                                }));
                            case "../translations/de.json":
                                return Promise.resolve().then((function() {
                                    return U_
                                }));
                            case "../translations/el.json":
                                return Promise.resolve().then((function() {
                                    return eg
                                }));
                            case "../translations/en.json":
                                return Promise.resolve().then((function() {
                                    return cg
                                }));
                            case "../translations/es.json":
                                return Promise.resolve().then((function() {
                                    return bg
                                }));
                            case "../translations/fi.json":
                                return Promise.resolve().then((function() {
                                    return Cg
                                }));
                            case "../translations/fr.json":
                                return Promise.resolve().then((function() {
                                    return Ng
                                }));
                            case "../translations/hi.json":
                                return Promise.resolve().then((function() {
                                    return Ug
                                }));
                            case "../translations/hr-HR.json":
                                return Promise.resolve().then((function() {
                                    return ef
                                }));
                            case "../translations/hu.json":
                                return Promise.resolve().then((function() {
                                    return pf
                                }));
                            case "../translations/id.json":
                                return Promise.resolve().then((function() {
                                    return yf
                                }));
                            case "../translations/it.json":
                                return Promise.resolve().then((function() {
                                    return xf
                                }));
                            case "../translations/ja.json":
                                return Promise.resolve().then((function() {
                                    return qf
                                }));
                            case "../translations/ko.json":
                                return Promise.resolve().then((function() {
                                    return Hf
                                }));
                            case "../translations/lt-LT.json":
                                return Promise.resolve().then((function() {
                                    return tb
                                }));
                            case "../translations/ms.json":
                                return Promise.resolve().then((function() {
                                    return pb
                                }));
                            case "../translations/nb.json":
                                return Promise.resolve().then((function() {
                                    return yb
                                }));
                            case "../translations/nl.json":
                                return Promise.resolve().then((function() {
                                    return xb
                                }));
                            case "../translations/pl.json":
                                return Promise.resolve().then((function() {
                                    return qb
                                }));
                            case "../translations/pt-BR.json":
                                return Promise.resolve().then((function() {
                                    return Hb
                                }));
                            case "../translations/pt-PT.json":
                                return Promise.resolve().then((function() {
                                    return ty
                                }));
                            case "../translations/ro-RO.json":
                                return Promise.resolve().then((function() {
                                    return py
                                }));
                            case "../translations/ru.json":
                                return Promise.resolve().then((function() {
                                    return yy
                                }));
                            case "../translations/sk-SK.json":
                                return Promise.resolve().then((function() {
                                    return xy
                                }));
                            case "../translations/sl-SI.json":
                                return Promise.resolve().then((function() {
                                    return qy
                                }));
                            case "../translations/sv.json":
                                return Promise.resolve().then((function() {
                                    return Hy
                                }));
                            case "../translations/th.json":
                                return Promise.resolve().then((function() {
                                    return tv
                                }));
                            case "../translations/tr.json":
                                return Promise.resolve().then((function() {
                                    return pv
                                }));
                            case "../translations/vi.json":
                                return Promise.resolve().then((function() {
                                    return yv
                                }));
                            case "../translations/zh-CN.json":
                                return Promise.resolve().then((function() {
                                    return xv
                                }));
                            case "../translations/zh-TW.json":
                                return Promise.resolve().then((function() {
                                    return qv
                                }));
                            default:
                                return new Promise((function(t, n) {
                                    ("function" == typeof queueMicrotask ? queueMicrotask : setTimeout)(n.bind(null, new Error("Unknown variable dynamic import: " + e)))
                                }))
                        }
                    }(`../translations/${e}.json`);
                s(this, lp, new ko({
                    [e]: t
                }), "f")
            } catch (e) {}
            return null
        }))
    }, customElements.get("login-with-shop-button") || customElements.define("login-with-shop-button", pp);

    function up(e) {
        if (!rr.isSupported) throw new Error("Sanitization of custom modal text is not supported in this browser.");
        return rr.sanitize(e, {
            ALLOWED_TAGS: []
        })
    }
    const mp = {
        step: Qn.Start,
        configurable: !1,
        headerVisible: !1,
        headerDividerVisible: !1,
        headerTemplate: "",
        descriptionTemplate: "",
        userNameKnown: !1,
        sessionDetected: !1,
        templateVariables: {
            clientName: "the store",
            store: "the store"
        }
    };

    function hp(e, t) {
        switch (e.type) {
            case Yn.Init:
                return e.payload.personalizeConsentChallenge ? Object.assign(Object.assign({}, t), {
                    step: Qn.PersonalizeConsent,
                    headerVisible: !0,
                    headerDividerVisible: !1,
                    userNameKnown: e.payload.userNameKnown || !1,
                    templateVariables: Object.assign(Object.assign(Object.assign({}, t.templateVariables), e.payload), {
                        store: e.payload.clientName
                    }),
                    headerTemplate: "login_with_shop.auth_modal.login_title_with_store",
                    descriptionTemplate: "",
                    sessionDetected: e.payload.userFound
                }) : Object.assign(Object.assign({}, t), {
                    configurable: !0,
                    headerVisible: !0,
                    headerDividerVisible: e.payload.userFound,
                    step: e.payload.userFound ? Qn.OneClick : Qn.Start,
                    userNameKnown: e.payload.userNameKnown || !1,
                    templateVariables: Object.assign(Object.assign(Object.assign({}, t.templateVariables), e.payload), {
                        store: e.payload.clientName
                    }),
                    headerTemplate: "login_with_shop.auth_modal.login_title",
                    descriptionTemplate: "login_with_shop.auth_modal.login_description",
                    sessionDetected: e.payload.userFound
                });
            case Yn.PopUpOpened:
                return Object.assign(Object.assign({}, t), {
                    step: Qn.PopUpOpened
                });
            case Yn.Restart:
                return Object.assign(Object.assign({}, t), {
                    configurable: !0,
                    headerDividerVisible: !1,
                    step: Qn.Start,
                    userNameKnown: !1,
                    headerTemplate: "login_with_shop.auth_modal.login_title",
                    descriptionTemplate: "login_with_shop.auth_modal.login_description",
                    sessionDetected: !1,
                    templateVariables: Object.assign(Object.assign({}, t.templateVariables), {
                        email: "",
                        phoneNumber: "",
                        userFound: !1,
                        userNameKnown: !1
                    })
                });
            case Yn.UserMatched:
                return e.payload.personalizeConsentChallenge ? Object.assign(Object.assign({}, t), {
                    step: Qn.PersonalizeConsent,
                    userNameKnown: e.payload.hasName || !1,
                    headerVisible: !0,
                    headerDividerVisible: !1,
                    headerTemplate: "login_with_shop.auth_modal.login_title_with_store",
                    descriptionTemplate: "",
                    sessionDetected: e.payload.userCookieExists
                }) : e.payload.userCookieExists ? Object.assign(Object.assign({}, t), {
                    configurable: !0,
                    headerDividerVisible: !0,
                    step: Qn.OneClick,
                    userNameKnown: e.payload.hasName || !1,
                    sessionDetected: !0
                }) : Object.assign(Object.assign({}, t), {
                    userNameKnown: e.payload.hasName || !1,
                    sessionDetected: !1
                });
            case Yn.UserNotMatched:
                return Object.assign(Object.assign({}, t), {
                    step: Qn.SignUp,
                    headerDividerVisible: !0,
                    userNameKnown: !1,
                    configurable: !1,
                    headerTemplate: "login_with_shop.auth_modal.signup_title",
                    descriptionTemplate: "login_with_shop.auth_modal.signup_description",
                    sessionDetected: !1
                });
            case Yn.VerificationStepChanged:
                {
                    const {
                        step: n,
                        phone: i = "",
                        email: a = ""
                    } = e.payload;
                    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, t), {
                        step: _p(n),
                        configurable: !1,
                        headerDividerVisible: !0,
                        templateVariables: Object.assign(Object.assign({}, t.templateVariables), {
                            phoneNumber: "windows-1252" === document.characterSet.toLowerCase() ? i : i.replaceAll(" ", " "),
                            email: a
                        }),
                        legalTextVariant: "authorize"
                    }), "email" === n && {
                        headerTemplate: "login_with_shop.auth_modal.login_email_title",
                        descriptionTemplate: "login_with_shop.auth_modal.login_email_description"
                    }), "sms" === n && {
                        headerTemplate: "login_with_shop.auth_modal.login_sms_title",
                        descriptionTemplate: "login_with_shop.auth_modal.login_sms_description"
                    }), "one_click" === n && {
                        headerTemplate: "login_with_shop.auth_modal.login_title",
                        descriptionTemplate: "login_with_shop.auth_modal.login_description"
                    }), "webauthn" === n && {
                        headerTemplate: "login_with_shop.auth_modal.login_webauthn_title",
                        descriptionTemplate: "login_with_shop.auth_modal.login_webauthn_description",
                        legalTextVariant: "generic",
                        legalTextTemplate: "login_with_shop.auth_modal.login_webauthn_footer",
                        headerDividerVisible: !1
                    })
                }
        }
        return t
    }

    function _p(e) {
        switch (e) {
            case "one_click":
                return Qn.OneClick;
            case "email":
                return Qn.EmailVerification;
            case "webauthn":
                return Qn.WebAuthnVerification;
            default:
                return Qn.PhoneVerification
        }
    }
    class gp {
        get _sheetModal() {
            return this._sheetModalManager.sheetModal
        }
        constructor(e, t) {
            this._isCompact = !1, this._isHeaderless = !1, this._analyticsContext = Ln.Default, this._flowVersion = "unspecified", this._authenticationLevel = Kn.Phone, this._state = mp, this._rootElement = e, this._sheetModalManager = Sl().build(), ({
                onOpen: this._onOpen,
                onClose: this._onClose
            } = t)
        }
        setCompact(e) {
            this._isCompact = e
        }
        setHeaderless(e) {
            this._isHeaderless = e
        }
        init() {
            var e, t, n, i;
            H(((e = "") => `\n<template id="shop-login-default-landing">\n    <style>\n        shop-sheet-modal {\n            line-height: 21px;\n            font-style: normal;\n        }\n\n        iframe {\n            width: 100%;\n        }\n\n        .${En} {\n            height: 0;\n            border: none;\n            margin: auto;\n        }\n\n        .${In} {\n            border-radius: ${Vn};\n        }\n\n        @media screen and (max-width: 448px) {\n            .${In} {\n                border-radius: ${Vn} ${Vn} 0 0;\n            }\n        }\n\n        .${Mn} {\n            padding-bottom: 16px;\n            text-align: center;\n            margin: 0 20px;\n            -webkit-font-smoothing: antialiased;\n        }\n\n        .${Mn}-container {\n            border: 0;\n        }\n\n        .${Rn} {\n            border-bottom: 1px solid #D9D9D9;\n        }\n\n        .${Dn} {\n            padding: 4px 12px 0;\n            text-align: center;\n            -webkit-font-smoothing: antialiased;\n        }\n\n        .${Bn} {\n            font-size: 12px;\n            line-height: 1.4;\n            font-family: -apple-system, BlinkMacSystemFont, San Francisco, Roboto, Segoe UI, Helvetica Neue, sans-serif;\n            font-weight: 400;\n            color: #707070;\n            letter-spacing: 0;\n            padding: 8px 0 4px;\n        }\n\n        .${Tn}-processing {\n            margin: 0 20px 7px 20px;\n        }\n\n        .${Tn}-processing-user {\n            color: #0F1721;\n            font-family: -apple-system, BlinkMacSystemFont, San Francisco, Roboto, Segoe UI, Helvetica Neue, sans-serif;\n            font-size: 12px;\n            letter-spacing: 0px;\n            line-height: 21px;\n            margin: 12px 0;\n            min-height: 21px;\n            overflow: hidden;\n            text-align: left;\n            text-overflow: ellipsis;\n            text-rendering: optimizelegibility;\n            white-space: nowrap;\n            -webkit-font-smoothing: antialiased;\n        }\n\n        .${Fn} {\n            position: absolute;\n            height: 0 !important;\n            border: 0;\n            padding: 0;\n            margin: 0;\n            visibility: hidden;\n            overflow: hidden;\n            pointer-events: none;\n        }\n\n        a {\n            color: #5433EB;\n            text-decoration: none;\n        }\n\n        a:active, a:focus, a:hover {\n            color: #7b61f0;\n            outline: none;\n        }\n\n        discount-code {\n            margin: 0 20px;\n        }\n\n        .${Tn}-content {\n            display: flex;\n            flex-direction: row;\n            flex-grow: 1;\n            flex-shrink: 1;\n            flex-basis: 1px;\n        }\n\n        .${Tn}-content iframe {\n          display: flex;\n          flex-direction: row;\n          flex-grow: 1;\n          flex-shrink: 1;\n          flex-basis: 1px;\n        }\n    </style>\n    <shop-sheet-modal ${e}>\n        <div class="${Mn} ${Rn} ${Fn}">\n            <iframe sandbox="allow-same-origin" class="${Mn}-container"></iframe>\n        </div>\n        <div class="${Tn}-content">\n            <iframe class="${En}" tabindex="0"></iframe>\n            <div class="${Tn}-processing ${Tn}-hidden">\n                <div class="${Tn}-processing-user"></div>\n                <div class="${Tn}-processing-status"></div>\n            </div>\n        </div>\n        <div class="${Dn} ${Fn}">\n            <div class="${Bn}"></div>\n        </div>\n    </shop-sheet-modal>\n</template>`)(this.getModalAttributes()), "shop-login-default-landing", this._sheetModalManager.shadowRoot), this._modalHeader = this._sheetModalManager.shadowRoot.querySelector(`.${Mn}`), this._footerElement = this._sheetModalManager.shadowRoot.querySelector(`.${Dn}`), this._footerContent = this._sheetModalManager.shadowRoot.querySelector(`.${Bn}`), this._iframe = this._sheetModalManager.shadowRoot.querySelector(`.${En}`), this._sheetModal.addEventListener("modalcloserequest", (() => a(this, void 0, void 0, (function*() {
                yield this.closeAuthorizeModal({
                    modalStateChangeReason: "user_dismissed"
                })
            })))), this._isCompact && (this._sheetModal.setAttribute(co, ""), this._sheetModal.setMonorailTracker(this._monorailTracker), this._iframe.classList.add(In), null === (t = null === (e = this._modalHeader) || void 0 === e ? void 0 : e.parentNode) || void 0 === t || t.removeChild(this._modalHeader), null === (i = null === (n = this._footerElement) || void 0 === n ? void 0 : n.parentNode) || void 0 === i || i.removeChild(this._footerElement)), T(this._iframe, "allow", "publickey-credentials-get *")
        }
        setModalAnalyticsTraceId(e) {
            this._sheetModal.setAttribute(Fi, e)
        }
        showModal(e) {
            return a(this, void 0, void 0, (function*() {
                (yield this._sheetModal.open(e)) && this._onOpen(), this.refreshHeaderIframeHeight()
            }))
        }
        openAuthorizeModal(e) {
            return a(this, void 0, void 0, (function*() {
                var t;
                yield this.showModal(e), yield null === (t = this._monorailTracker) || void 0 === t ? void 0 : t.trackPageImpression({
                    page: Ht.AuthorizeModal
                })
            }))
        }
        closeAuthorizeModal() {
            return a(this, arguments, void 0, (function*({
                modalStateChangeReason: e
            } = {}) {
                var t;
                if (this._sheetModal) {
                    (yield this._sheetModal.close({
                        reason: e
                    })) && this._onClose()
                }
                null === (t = this._continueButton) || void 0 === t || t.setFocused()
            }))
        }
        destroy() {
            this._sheetModalManager.destroy()
        }
        setContinueButtonVisible(e) {
            var t, n, i;
            if (!e) return null === (t = this._continueButton) || void 0 === t || t.remove(), void(this._continueButton = void 0);
            this._continueButton || (this._continueButton = document.createElement("login-with-shop-button"), null === (n = this._continueButton) || void 0 === n || n.addEventListener("click", (() => {
                var e;
                null === (e = this._monorailTracker) || void 0 === e || e.trackLoginDefaultButtonClicked(), "redirect" === this._uxMode && this._authorizeUrl ? window.location.href = this._authorizeUrl : this.openAuthorizeModal("user_button_clicked")
            })), null === (i = this._monorailTracker) || void 0 === i || i.trackPageImpression({
                page: Ht.SignInWithShopButton
            }), this._rootElement.appendChild(this._continueButton))
        }
        setMonorailTracker(e) {
            var t, n;
            this._monorailTracker = e, null === (n = (t = this._sheetModal).setMonorailTracker) || void 0 === n || n.call(t, e)
        }
        setAnalyticsContext(e) {
            this._analyticsContext = e
        }
        setFlowVersion(e) {
            this._flowVersion = e
        }
        getUxMode() {
            return this._uxMode
        }
        setUxMode(e) {
            e && (this._uxMode = e)
        }
        setAuthorizeUrl(e) {
            this._authorizeUrl = e
        }
        setAuthenticationLevel(e) {
            this._authenticationLevel = e
        }
        onContentLoaded() {
            this._sheetModal.onContentLoaded()
        }
        setFlow(e) {
            this._flow = e, this._sheetModalManager.setNametagSuffix(e)
        }
        getIframe() {
            return this._iframe
        }
        setAnchorSelector(e) {
            this._sheetModal.setAttribute(ea, e)
        }
        setBrand(e) {
            e && this._sheetModal.setAttribute("modal-brand", e)
        }
        resizeIframe(e, t) {
            this._iframe && (this._iframe.style.height = `${e}px`, this._iframe.style.width = `${Lo(t,this._iframe)}px`)
        }
        render() {
            const {
                configurable: e,
                headerVisible: t,
                headerDividerVisible: n
            } = this._state;
            this.setHeaderVisible(t), this.setHeaderDividerVisible(n), e && this._modalLogoSrc && this.updateHeaderLogo(this._modalLogoSrc), this.renderHeaderTemplate(), this.renderHeaderDescriptionTemplate(), this.renderFooterContent(), this.refreshHeaderIframeHeight()
        }
        dispatch(e) {
            switch (this._analyticsContext) {
                case Ln.CheckoutExtension:
                case Ln.Default:
                    this._state = this._authenticationLevel === Kn.Phone ? hp(e, this._state) : function(e, t) {
                        const n = hp(e, t);
                        switch (n.step) {
                            case Qn.Start:
                                return Object.assign(Object.assign({}, n), {
                                    headerTemplate: "verified_email_auth.auth_modal.login_title",
                                    descriptionTemplate: ""
                                });
                            case Qn.SignUp:
                                return Object.assign(Object.assign({}, n), {
                                    headerTemplate: "verified_email_auth.auth_modal.signup_title",
                                    descriptionTemplate: "verified_email_auth.auth_modal.signup_description"
                                });
                            case Qn.PhoneVerification:
                                return Object.assign(Object.assign({}, n), {
                                    headerTemplate: "login_with_shop.auth_modal.login_sms_title",
                                    descriptionTemplate: "login_with_shop.auth_modal.login_sms_description"
                                });
                            case Qn.EmailVerification:
                                return Object.assign(Object.assign({}, n), {
                                    headerTemplate: "login_with_shop.auth_modal.login_email_title",
                                    descriptionTemplate: "login_with_shop.auth_modal.login_email_description"
                                })
                        }
                        return n
                    }(e, this._state);
                    break;
                case Ln.ClassicCustomerAccounts:
                    this._state = "sign_up" === this._flowVersion ? function(e, t) {
                        const n = hp(e, t);
                        switch (n.step) {
                            case Qn.Start:
                            case Qn.OneClick:
                                return Object.assign(Object.assign({}, n), {
                                    headerTemplate: "customer_accounts.sign_up_page.auth_modal.login_title",
                                    descriptionTemplate: "customer_accounts.sign_up_page.auth_modal.login_description"
                                });
                            case Qn.PhoneVerification:
                                return Object.assign(Object.assign({}, n), {
                                    headerTemplate: "customer_accounts.sign_up_page.auth_modal.login_title",
                                    descriptionTemplate: "customer_accounts.sign_up_page.auth_modal.login_sms_description"
                                });
                            case Qn.EmailVerification:
                                return Object.assign(Object.assign({}, n), {
                                    headerTemplate: "customer_accounts.sign_up_page.auth_modal.login_title",
                                    descriptionTemplate: "customer_accounts.sign_up_page.auth_modal.login_email_description"
                                });
                            case Qn.WebAuthnVerification:
                                return Object.assign(Object.assign({}, n), {
                                    headerTemplate: "customer_accounts.sign_up_page.auth_modal.login_title",
                                    descriptionTemplate: "login_with_shop.auth_modal.login_webauthn_description"
                                })
                        }
                        return n
                    }(e, this._state) : hp(e, this._state);
                    break;
                case Ln.CheckoutModal:
                    this._state = function(e, t) {
                        const n = hp(e, t);
                        switch (n.step) {
                            case Qn.PhoneVerification:
                                return Object.assign(Object.assign({}, n), {
                                    descriptionTemplate: "checkout_modal.auth_modal.login_sms_description"
                                });
                            case Qn.EmailVerification:
                                return Object.assign(Object.assign({}, n), {
                                    descriptionTemplate: "checkout_modal.auth_modal.login_email_description"
                                })
                        }
                        return n
                    }(e, this._state);
                    break;
                case Ln.PaymentRequest:
                    this._state = function(e, t) {
                        const n = hp(e, t);
                        switch (n.step) {
                            case Qn.PopUpOpened:
                            case Qn.OneClick:
                                return Object.assign(Object.assign({}, n), {
                                    headerTemplate: "payment_request.auth_modal.login_title",
                                    descriptionTemplate: "payment_request.auth_modal.login_description"
                                });
                            case Qn.PhoneVerification:
                                return Object.assign(Object.assign({}, n), {
                                    headerTemplate: "payment_request.auth_modal.login_sms_title",
                                    descriptionTemplate: "payment_request.auth_modal.login_sms_description"
                                });
                            case Qn.EmailVerification:
                                return Object.assign(Object.assign({}, n), {
                                    headerTemplate: "payment_request.auth_modal.login_email_title",
                                    descriptionTemplate: "payment_request.auth_modal.login_email_description"
                                })
                        }
                        return n
                    }(e, this._state);
                    break;
                default:
                    this._state = mp
            }
            this._isCompact || this.render()
        }
        updateHeaderLogo(e) {
            var t, n;
            if (!this._headerLogo) {
                this._headerLogo = document.createElement("img");
                const e = null === (t = this._headerContentsContainer) || void 0 === t ? void 0 : t.firstChild;
                e && (null === (n = this._headerContentsContainer) || void 0 === n || n.insertBefore(this._headerLogo, e))
            }
            this._headerLogo.src = e, this._headerLogo.style.maxHeight = "64px", this._headerLogo.style.width = "auto"
        }
        renderHeaderTemplate() {
            var t;
            const {
                configurable: n,
                headerTemplate: i,
                templateVariables: a
            } = this._state;
            let o = "";
            if (n && this._modalTitle) try {
                o = this._modalTitle.replace(/\${storeName}/gi, a.clientName)
            } catch (t) {
                if (t instanceof Error && t.message.includes("replaceAll is not a function")) return void e(new Error("modalTitle is not a string. Expected string, received " + typeof this._modalTitle));
                throw t
            } else i && (o = (null === (t = this._i18n) || void 0 === t ? void 0 : t.translate(i, a)) || "");
            "string" == typeof o && (this._headerTitle.textContent = o)
        }
        renderHeaderDescriptionTemplate() {
            var e, t;
            const {
                configurable: n,
                descriptionTemplate: i,
                templateVariables: a
            } = this._state;
            let o = "";
            n && this._modalDescription ? o = null === (e = this._modalDescription) || void 0 === e ? void 0 : e.replace(/\${storeName}/gi, a.clientName) : i && (o = (null === (t = this._i18n) || void 0 === t ? void 0 : t.translate(i, a)) || ""), "string" == typeof o && (this._headerDescription.textContent = o)
        }
        renderFooterContent() {
            if (!this._i18n) return;
            const {
                step: e,
                templateVariables: t,
                sessionDetected: n
            } = this._state, {
                clientName: i,
                privacyPolicyUrl: a,
                termsOfServiceUrl: o
            } = t;
            let s = "";
            switch (e) {
                case Qn.PersonalizeConsent:
                case Qn.EmailVerification:
                case Qn.PhoneVerification:
                case Qn.WebAuthnVerification:
                case Qn.OneClick:
                    {
                        if (e === Qn.PersonalizeConsent && !n) break;
                        if (this._analyticsContext === Ln.PaymentRequest) break;
                        const r = this._i18n.translate("legal.authorized_scopes.email_name", t);
                        if (!a || !o) {
                            s = r;
                            break
                        }
                        s = `${r} ${this._i18n.translate("legal.client",{clientName:i,privacyPolicy:`<a href="${a}" target="_blank">${this._i18n.translate("legal.privacy_policy")}</a>`,termsOfService:`<a href="${o}" target="_blank">${this._i18n.translate("legal.terms")}</a>`})}`;
                        break
                    }
                case Qn.SignUp:
                    {
                        const e = `<a href="https://shop.app/terms-of-service" target="_blank">${this._i18n.translate("legal.terms_of_service")}</a>`,
                            t = `<a href="https://www.shopify.com/legal/privacy/app-users" target="_blank">${this._i18n.translate("legal.privacy_policy")}</a>`;s = this._i18n.translate("legal.shop", {
                            clientName: i,
                            termsOfService: e,
                            privacyPolicy: t
                        });
                        break
                    }
            }
            this._footerContent.innerHTML = s, this.setFooterVisible(Boolean(s))
        }
        setHeaderVisible(e) {
            var t;
            if (this._modalHeader.classList.toggle(Fn, !e), !this._headerIframe) {
                this._headerIframe = this._sheetModalManager.shadowRoot.querySelector(`.${Mn}-container`);
                const e = null === (t = this._headerIframe.contentDocument) || void 0 === t ? void 0 : t.querySelector("body");
                e.innerHTML = $n, this._headerContentsContainer = document.createElement("div"), this._headerContentsContainer.classList.add(On), this._headerTitle = document.createElement("h2"), this._headerTitle.classList.add(Nn), this._headerDescription = document.createElement("div"), this._headerDescription.classList.add(qn), this._headerContentsContainer.appendChild(this._headerTitle), this._headerContentsContainer.appendChild(this._headerDescription), "pop_up" === this._flow && (this._headerContentsContainer.style.display = "flex", this._headerContentsContainer.style.flexDirection = "column"), e.appendChild(this._headerContentsContainer), window.ResizeObserver ? (this._headerResizeObserver = new ResizeObserver((() => {
                    this.refreshHeaderIframeHeight()
                })), this._headerResizeObserver.observe(this._headerContentsContainer)) : this.refreshHeaderIframeHeight()
            }
        }
        refreshHeaderIframeHeight() {
            var e, t, n, i;
            const a = null === (t = null === (e = this._headerIframe) || void 0 === e ? void 0 : e.contentDocument) || void 0 === t ? void 0 : t.querySelector("body"),
                o = `${null===(n=this._headerContentsContainer)||void 0===n?void 0:n.getBoundingClientRect().height}px`;
            null == a || a.setAttribute("height", o), null === (i = this._headerIframe) || void 0 === i || i.setAttribute("height", o)
        }
        setHeaderDividerVisible(e) {
            this._modalHeader.classList.toggle(Rn, e)
        }
        setFooterVisible(e) {
            this._footerElement.classList.toggle(Fn, !e)
        }
        setCloseButtonVisible(e) {
            this._sheetModal.setCloseButtonVisibility(e)
        }
        setCustomizedModalContent({
            modalTitle: e,
            modalDescription: t,
            modalLogo: n
        }) {
            e && (this._modalTitle = up(e)), t && (this._modalDescription = up(t)), n && (this._modalLogoSrc = up(n))
        }
        getCustomizedModalContent() {
            return {
                modalTitle: this._modalTitle,
                modalDescription: this._modalDescription,
                modalLogo: this._modalLogoSrc
            }
        }
        setTranslations(e) {
            this._i18n = e
        }
        isModalCustomized() {
            return Boolean(this._modalTitle || this._modalDescription || this._modalLogoSrc)
        }
        getModalAttributes() {
            var e, t;
            const n = null !== (t = null === (e = this._sheetModal) || void 0 === e ? void 0 : e.getAttributeNames()) && void 0 !== t ? t : [];
            return E(this._isCompact, co, n), E(this._isHeaderless, po, n), n.map((e => {
                var t;
                const n = null === (t = this._sheetModal) || void 0 === t ? void 0 : t.getAttribute(e);
                return n ? `${e}="${n}"` : e
            })).join(" ")
        }
    }
    const fp = [Ln.Default, Ln.CheckoutExtension, Ln.CheckoutModal, Ln.ClassicCustomerAccounts, Ln.PaymentRequest];
    var bp, yp, vp, kp, wp, Pp, Sp, zp, jp, Cp, xp, Lp, Ap, Tp, Ep, Ip, Mp, Op, Np, qp;
    const Rp = [Jn.CaptchaChallenge];
    class Dp extends wo {
        static get observedAttributes() {
            return [ea, Li, Ai, Ei, Mi, Oi, Di, Ri, Ni, qi, Bi, Fi, $i, Wi, Ui, Hi, Ki, Zi, Gi, Ji, Yi, Qi, Xi, na, ia, aa, oa, sa, ra, la, ca, pa, da, ga, fa, ua, ba, ha, _a, ma, ya]
        }
        constructor() {
            super(), bp.add(this), yp.set(this, I()), vp.set(this, ""), kp.set(this, "2"), wp.set(this, window.location.origin), Pp.set(this, new Wn({
                elementName: "shop-login-default",
                analyticsTraceId: o(this, yp, "f")
            })), Sp.set(this, void 0), zp.set(this, void 0), jp.set(this, void 0), Cp.set(this, void 0), xp.set(this, void 0), Lp.set(this, null), this._disableSignUp = !1, this._autoOpen = !1, this._autoOpened = !1, this._analyticsContext = Ln.Default, this._avoidPayAltDomain = !1, this._avoidSdkSession = !1, this._flow = Zn.Default, this._flowVersion = "unspecified", this._error = "", this._hideButton = !1, this._anchorSelector = "", this._isCompactLayout = !1, this._hidePayCopy = !1, this._email = "", this._authorizeModalOpened = !1, this._keepModalOpen = !1, this._requireVerification = !1, this._shouldListenToResizeMessage = !0, Ap.set(this, (() => {
                this._updateSrc(!0)
            })), Tp.set(this, (() => {
                var e;
                this.dispatchCustomEvent("modalclosed"), null === (e = this._iframeMessenger) || void 0 === e || e.postMessage({
                    type: "sheetmodalclosed"
                }), _t()
            })), Ep.set(this, (() => {
                var e;
                this.dispatchCustomEvent("modalopened"), null === (e = this._iframeMessenger) || void 0 === e || e.postMessage({
                    type: "sheetmodalopened"
                })
            })), Ip.set(this, (e => {
                var t, n;
                const i = !!(a = this._analyticsContext) && ap.includes(a);
                var a, o;
                return this._hidePayCopy = !i && (o = this._analyticsContext, fp.includes(o)), !(!e && this._isCompactLayout === i) && (this._isCompactLayout = i, null === (t = this._view) || void 0 === t || t.setCompact(this._isCompactLayout), null === (n = this._view) || void 0 === n || n.init(), !0)
            })), this._rootElement = this.attachShadow({
                mode: "open"
            }), this._analyticsContext = this.getAttribute(Bi) || Ln.Default, this._view = new gp(this._rootElement, {
                onOpen: o(this, Ep, "f"),
                onClose: o(this, Tp, "f")
            }), o(this, Ip, "f").call(this, !0), this._debouncedUpdateUserInfo = N((({
                email: e,
                firstName: t,
                lastName: n
            }) => {
                var i;
                (null === (i = this._passwordManagerDetection) || void 0 === i ? void 0 : i.isFilledWithPasswordManager()) && o(this, Pp, "f").trackPasswordManagerAutofillDetected(), this._updateUserInfo({
                    email: e,
                    firstName: t,
                    lastName: n
                }), V(e) && o(this, Pp, "f").trackEmailEnteredAction()
            }), 200), this._payLoadedResolve = () => {}, this._payLoaded = new Promise((e => {
                this._payLoadedResolve = e
            }))
        }
        attributeChangedCallback(e, t, n) {
            var i, a, r, l, c, p, d, u, m, h;
            const _ = Boolean(null !== n);
            switch (e) {
                case Ai:
                    s(this, kp, n, "f"), this._updateSrc();
                    break;
                case Li:
                    s(this, vp, n || "", "f"), this._updateSrc();
                    break;
                case $i:
                    this._responseType = n || "", this._updateSrc();
                    break;
                case Wi:
                    this._responseMode = n || "", this._updateSrc();
                    break;
                case Ui:
                    this._codeChallenge = n || "", this._updateSrc();
                    break;
                case Hi:
                    this._codeChallengeMethod = n || "", this._updateSrc();
                    break;
                case Ki:
                    this._state = n || "", this._updateSrc();
                    break;
                case Zi:
                    this._scope = n || "", this._updateSrc();
                    break;
                case Ei:
                    s(this, wp, n || window.location.origin, "f"), ki(o(this, wp, "f"));
                    break;
                case Mi:
                    this._hideButton = _, null === (i = this._view) || void 0 === i || i.setContinueButtonVisible(_), this._updateSrc();
                    break;
                case Gi:
                    this._avoidPayAltDomain = _, this._updateSrc();
                    break;
                case Ji:
                    this._avoidSdkSession = _, this._updateSrc();
                    break;
                case Yi:
                    this._flow = n || Zn.Default, null === (a = this._view) || void 0 === a || a.setFlow(this._flow), this._updateSrc();
                    break;
                case Qi:
                    this._flowVersion = n || "unspecified", null === (r = this._view) || void 0 === r || r.setFlowVersion(this._flowVersion), this._updateMonorailTracker(), this._updateSrc();
                    break;
                case Oi:
                    this._disableSignUp = _, this._updateSrc();
                    break;
                case Di:
                    this._autoOpen = _;
                    break;
                case Ri:
                    s(this, Sp, "pop_up" === n || "iframe" === n ? n : "top_frame", "f"), this._updateSrc();
                    break;
                case Ni:
                    s(this, zp, n || void 0, "f"), this._updateSrc();
                    break;
                case qi:
                    s(this, jp, n || void 0, "f"), null === (l = this._view) || void 0 === l || l.setUxMode(o(this, jp, "f")), this._updateSrc();
                    break;
                case Bi:
                    this._analyticsContext = n || Ln.Default, null === (c = this._view) || void 0 === c || c.setAnalyticsContext(this._analyticsContext), o(this, Ip, "f").call(this), this._updateMonorailTracker(), this._updateSrc();
                    break;
                case Fi:
                    s(this, yp, n || I(), "f"), this._updateMonorailTracker(), this._updateSrc();
                    break;
                case Xi:
                    this._initEmail(n || "");
                    break;
                case ea:
                    this._anchorSelector = n || "", null === (p = this._view) || void 0 === p || p.setAnchorSelector(n || "");
                    break;
                case na:
                    null === (d = this._view) || void 0 === d || d.setCustomizedModalContent({
                        modalTitle: n || void 0
                    }), this._updateSrc();
                    break;
                case ia:
                    null === (u = this._view) || void 0 === u || u.setCustomizedModalContent({
                        modalDescription: n || void 0
                    }), this._updateSrc();
                    break;
                case aa:
                    null === (m = this._view) || void 0 === m || m.setCustomizedModalContent({
                        modalLogo: n || void 0
                    }), this._updateSrc();
                    break;
                case oa:
                    this._apiKey = n || void 0, this._updateSrc();
                    break;
                case sa:
                    s(this, Cp, n || void 0, "f"), this._updateSrc();
                    break;
                case ra:
                    s(this, xp, n || void 0, "f"), this._updateSrc();
                    break;
                case la:
                    null === (h = this._view) || void 0 === h || h.setBrand(n || void 0);
                    break;
                case ca:
                    this._consentChallenge = _, this._updateSrc();
                    break;
                case pa:
                    this._checkoutRedirectUrl = n || void 0, this._updateSrc();
                    break;
                case da:
                    this._checkoutVersion = n || void 0, this._updateSrc(), this._updateMonorailTracker();
                    break;
                case ga:
                    this._checkoutToken = n || void 0, this._updateSrc(), this._updateMonorailTracker();
                    break;
                case fa:
                    this._transactionParams = n || void 0, this._updateSrc();
                    break;
                case ua:
                    this._shopId = n || void 0, this._updateSrc(), this._updateMonorailTracker();
                    break;
                case ba:
                    this._shopPermanentDomain = n || void 0, this._updateMonorailTracker();
                    break;
                case ha:
                    this._firstName = n || void 0;
                    break;
                case _a:
                    this._lastName = n || void 0;
                    break;
                case ma:
                    this._requireVerification = _, this._updateSrc();
                    break;
                case ya:
                    this._source = n || "unspecified"
            }
        }
        connectedCallback() {
            return a(this, void 0, void 0, (function*() {
                this.subscribeToHub(dt.UserStatusIdentity, o(this, Ap, "f")), this._keepModalOpen = this.getBooleanAttribute(Ii), this._hideButton = this.getBooleanAttribute(Mi), this._apiKey = this.getAttribute(oa) || void 0, this._source = this.getAttribute(ya) || "unspecified";
                try {
                    ! function({
                        modalTitle: e,
                        modalDescription: t,
                        modalLogo: n
                    }, i) {
                        if (Boolean(e || t || n) && !i) throw new Error("An API key must be provided if the modal content is customized");
                        if (e && e.length > 150) throw new Error(`${na} cannot exceed 150 characters.`);
                        if (t && t.length > 300) throw new Error(`${ia} cannot exceed 300 characters.`);
                        if (n) try {
                            new URL(n)
                        } catch (e) {
                            throw new Error(`${aa} must be a valid URL`)
                        }
                    }(this._view.getCustomizedModalContent(), this._apiKey), yield o(this, bp, "m", Mp).call(this), yield this._initElements(), ki(o(this, wp, "f")), o(this, Pp, "f").trackFeatureInitialization({
                        apiKey: this._apiKey,
                        source: this._source
                    })
                } catch (e) {
                    e instanceof Error && (wa(`Invalid config. ${e.message}`), this._handleError("invalid_config", Jn.ApiUnavailable))
                }
            }))
        }
        _initElements() {
            return a(this, void 0, void 0, (function*() {
                var e, t;
                if (!this._view) return;
                this._view.setModalAnalyticsTraceId(o(this, yp, "f")), this._view.setMonorailTracker(o(this, Pp, "f")), this._view.setAnchorSelector(this._anchorSelector), this._view.setContinueButtonVisible(!this._hideButton), this._iframe = this._view.getIframe(), this._updateSrc();
                const n = (null === (e = this.ownerDocument) || void 0 === e ? void 0 : e.defaultView) || void 0;
                this._iframeListener = new gi(new Si(this._iframe), [fi, bi, o(this, wp, "f")], o(this, bp, "m", qp).bind(this), n), this._iframeMessenger = new Pi(this._iframe);
                const {
                    userFound: i
                } = yield this._iframeListener.waitForMessage("loaded");
                this._payLoadedResolve({
                    userFound: i
                }), this.dispatchCustomEvent("iframeloaded"), o(this, Pp, "f").trackShopPayModalStateChange({
                    currentState: Zt.Loaded,
                    reason: "event_loaded"
                }), o(this, bp, "m", Np).call(this), i && this._autoOpen && !this._autoOpened && (null === (t = this._updateEmailAbortController) || void 0 === t || t.abort(), this._autoOpened = !0, yield this._view.openAuthorizeModal("event_loaded_with_auto_open"))
            }))
        }
        _initEmail(e) {
            this._email = e, V(this._email) ? this._debouncedUpdateUserInfo({
                email: this._email,
                firstName: this._firstName,
                lastName: this._lastName
            }) : this._debouncedUpdateUserInfo({
                email: ""
            })
        }
        disconnectedCallback() {
            var e, t;
            this.unsubscribeAllFromHub(), null === (e = this._iframeListener) || void 0 === e || e.destroy(), null === (t = this._view) || void 0 === t || t.destroy(), this.stopListeningToInput()
        }
        setShouldListenToResizeMessage(e) {
            this._shouldListenToResizeMessage = e
        }
        requestShow(e) {
            return a(this, void 0, void 0, (function*() {
                var t;
                yield this._payLoaded, this._authorizeModalOpened || (e && this._updateUserInfo({
                    email: e,
                    firstName: this._firstName,
                    lastName: this._lastName
                }), yield this._payLoaded, yield null === (t = this._view) || void 0 === t ? void 0 : t.openAuthorizeModal("user_button_clicked"))
            }))
        }
        setPasswordManagerDetection(e) {
            this._passwordManagerDetection = e
        }
        listenToInput(e) {
            this.stopListeningToInput();
            const t = N((e => {
                V(e) ? (this._updateUserInfo({
                    email: e
                }), o(this, Pp, "f").trackEmailEnteredAction()) : this._updateUserInfo({
                    email: ""
                })
            }), 200);
            t(e.value), this._inputListener = new m(e, t)
        }
        getIframe() {
            var e;
            return null === (e = this._view) || void 0 === e ? void 0 : e.getIframe()
        }
        ensureIframeIsLoaded() {
            return this._payLoaded.then((() => {}))
        }
        stopListeningToInput() {
            var e;
            null === (e = this._inputListener) || void 0 === e || e.destroy()
        }
        _updateUserInfo(t) {
            return a(this, arguments, void 0, (function*({
                email: t,
                firstName: n = "",
                lastName: i = ""
            }) {
                var o, s;
                if (!this._authorizeModalOpened) {
                    this._updateEmailAbortController && !(null === (o = this._updateEmailAbortController) || void 0 === o ? void 0 : o.signal.aborted) && this._updateEmailAbortController.abort(), this._updateEmailAbortController = new AbortController;
                    try {
                        const {
                            userFound: e
                        } = yield this._payLoaded;
                        if (e && this._autoOpen && !this._autoOpened) return;
                        this._iframeMessenger.postMessage({
                            type: "namesubmitted",
                            firstName: n,
                            lastName: i
                        }), this._iframeMessenger.postMessage({
                            type: "emailsubmitted",
                            email: t,
                            hideChange: t.length > 0
                        });
                        const o = this._iframeListener.waitForMessage("shop_user_matched", this._updateEmailAbortController.signal),
                            r = new Promise(((e, t) => {
                                const n = () => a(this, void 0, void 0, (function*() {
                                    try {
                                        const {
                                            code: t
                                        } = yield this._iframeListener.waitForMessage("error", this._updateEmailAbortController.signal);
                                        t === Jn.CaptchaChallenge ? e(void 0) : n()
                                    } catch (e) {
                                        t(e)
                                    }
                                }));
                                n()
                            }));
                        yield Promise.race([o, r]), yield null === (s = this._view) || void 0 === s ? void 0 : s.openAuthorizeModal("event_shop_user_matched"), this._updateEmailAbortController.abort()
                    } catch (t) {
                        if (t instanceof ht) return;
                        t instanceof Error && e(new Error(`Error updating user info: ${t.name} - ${t.message}`))
                    }
                }
            }))
        }
        _updateSrc(e) {
            var t, n, i;
            const a = null === (t = this._view) || void 0 === t ? void 0 : t.getIframe();
            if (!a && "redirect" !== (null === (n = this._view) || void 0 === n ? void 0 : n.getUxMode())) return;
            const s = this._buildAuthorizeUrl();
            null === (i = this._view) || void 0 === i || i.setAuthorizeUrl(s), a && s && (this._updateListeners(a), this._iframeSrcTimeout && clearTimeout(this._iframeSrcTimeout), this._iframeSrcTimeout = setTimeout((() => {
                o(this, bp, "m", Op).call(this),
                    function(e, t, n) {
                        if (!n && e.src === t) return;
                        const i = e.parentNode;
                        i && (i.removeChild(e), e.setAttribute("src", t), i.appendChild(e))
                    }(a, s, e)
            }), 0))
        }
        _buildAuthorizeUrl() {
            var e;
            const t = {
                    clientId: o(this, vp, "f"),
                    responseType: this._responseType,
                    responseMode: this._responseMode,
                    redirectType: o(this, Sp, "f"),
                    redirectUri: o(this, zp, "f"),
                    codeChallenge: this._codeChallenge,
                    codeChallengeMethod: this._codeChallengeMethod,
                    state: this._state,
                    scope: this._scope
                },
                n = null === (e = this._view) || void 0 === e ? void 0 : e.isModalCustomized();
            return Wl(Object.assign(Object.assign({
                version: o(this, kp, "f"),
                analyticsTraceId: o(this, yp, "f"),
                analyticsContext: this._analyticsContext,
                isCompactLayout: this._isCompactLayout,
                flow: this._flow,
                flowVersion: this._flowVersion,
                signUpEnabled: !this._disableSignUp,
                oauthParams: t,
                avoidPayAltDomain: this._avoidPayAltDomain,
                avoidSdkSession: this._avoidSdkSession,
                hideCopy: this._hidePayCopy
            }, n && {
                modalCustomized: n
            }), {
                apiKey: this._apiKey,
                popupWindowParams: {
                    popUpName: o(this, Cp, "f"),
                    popUpFeatures: o(this, xp, "f")
                },
                consentChallenge: this._consentChallenge,
                checkoutRedirectUrl: this._checkoutRedirectUrl,
                checkoutVersion: this._checkoutVersion,
                checkoutToken: this._checkoutToken,
                transactionParams: this._transactionParams,
                shopId: this._shopId,
                requireVerification: this._requireVerification,
                uxMode: o(this, jp, "f"),
                error: this._error
            }))
        }
        _updateListeners(e) {
            this._iframeListener && (this._iframeListener.eventSource = new Si(e)), this._iframeMessenger && (this._iframeMessenger.eventDestination = e)
        }
        _updateMonorailTracker() {
            var e;
            s(this, Pp, new Wn({
                elementName: "shop-login-default",
                analyticsTraceId: o(this, yp, "f"),
                analyticsContext: this._analyticsContext,
                flowVersion: this._flowVersion,
                shopId: op(this._shopId),
                shopPermanentDomain: this._shopPermanentDomain,
                checkoutVersion: this._checkoutVersion,
                checkoutToken: this._checkoutToken
            }), "f"), null === (e = this._view) || void 0 === e || e.setMonorailTracker(o(this, Pp, "f"))
        }
        _handleCompleted(t, n, i, s, r, l, c, p) {
            return a(this, void 0, void 0, (function*() {
                var a, d;
                t && r && (yield P(o(this, wp, "f"), e), this.publishToHub(dt.UserSessionCreate, {
                    email: c || n,
                    initial: (null == c ? void 0 : c[0]) || (null == n ? void 0 : n[0]) || "",
                    avatar: p
                })), this._keepModalOpen || (yield null === (a = this._view) || void 0 === a ? void 0 : a.closeAuthorizeModal({
                    modalStateChangeReason: "event_completed"
                })), null === (d = this._iframeListener) || void 0 === d || d.destroy(), this.stopListeningToInput(), this.dispatchCustomEvent("completed", {
                    loggedIn: t,
                    email: n,
                    customerAccessToken: i,
                    customerAccessTokenExpiresAt: s,
                    shopPayInstallmentsOnboarded: l
                }), this._maybeRedirect()
            }))
        }
        _handleCustomFlowSideEffect(e) {
            return a(this, void 0, void 0, (function*() {
                if (e.flow === Zn.Prequal) this.dispatchCustomEvent("prequal_flow_side_effect", {
                    shopPayInstallmentsOnboarded: e.shopPayInstallmentsOnboarded
                })
            }))
        }
        _maybeRedirect() {
            if ("pop_up" !== o(this, Sp, "f") && o(this, zp, "f")) try {
                let t = o(this, zp, "f");
                if (o(this, yp, "f")) {
                    const e = {
                            analytics_trace_id: o(this, yp, "f")
                        },
                        n = new URLSearchParams(e);
                    t = t.concat(`?${n.toString()}`)
                } else e(new Error("Missing analytics trace ID when redirecting to account page"));
                window.location.assign(t)
            } catch (e) {}
        }
        _handleError(e, t) {
            this.dispatchCustomEvent("error", {
                message: e,
                code: t
            }), t === Jn.RetriableServerError && (this._error = t, this._updateSrc(!0)), Rp.includes(t) && Vt.HandleSilentError, o(this, bp, "m", Np).call(this)
        }
        _onPopUpOpened(e) {
            var t;
            e.didOpen && (null === (t = this._view) || void 0 === t || t.dispatch({
                type: Yn.PopUpOpened,
                payload: e
            })), this.dispatchCustomEvent("popuploading", e)
        }
        _onLoaded(e) {
            var t, n, i;
            null === (t = this._view) || void 0 === t || t.setAuthenticationLevel((null == e ? void 0 : e.authenticationLevelRequired) || Kn.Phone), null === (n = this._view) || void 0 === n || n.dispatch({
                type: Yn.Init,
                payload: e
            }), null === (i = this._view) || void 0 === i || i.onContentLoaded()
        }
        _onUserMatched({
            hasName: e = !1,
            userCookieExists: t = !1,
            personalizeConsentChallenge: n = !1
        }) {
            var i;
            null === (i = this._view) || void 0 === i || i.dispatch({
                type: Yn.UserMatched,
                payload: {
                    hasName: e,
                    userCookieExists: t,
                    personalizeConsentChallenge: n
                }
            }), q(), this.dispatchCustomEvent("shopusermatched")
        }
        _onUserNotMatched({
            apiError: e
        }) {
            var t;
            null === (t = this._view) || void 0 === t || t.dispatch({
                type: Yn.UserNotMatched
            }), this.dispatchCustomEvent("shopusernotmatched", {
                apiError: e
            })
        }
        _onEmailChangeRequested() {
            var e;
            null === (e = this._view) || void 0 === e || e.dispatch({
                type: Yn.Restart
            }), this.dispatchCustomEvent("restarted")
        }
        _onVerificationStepChanged(e) {
            var t;
            null === (t = this._view) || void 0 === t || t.dispatch({
                type: Yn.VerificationStepChanged,
                payload: e
            })
        }
    }
    yp = new WeakMap, vp = new WeakMap, kp = new WeakMap, wp = new WeakMap, Pp = new WeakMap, Sp = new WeakMap, zp = new WeakMap, jp = new WeakMap, Cp = new WeakMap, xp = new WeakMap, Lp = new WeakMap, Ap = new WeakMap, Tp = new WeakMap, Ep = new WeakMap, Ip = new WeakMap, bp = new WeakSet, Mp = function() {
        return a(this, void 0, void 0, (function*() {
            var e;
            try {
                const t = ko.getDefaultLanguage(),
                    n = yield function(e) {
                        switch (e) {
                            case "./translations/bg-BG.json":
                                return Promise.resolve().then((function() {
                                    return b_
                                }));
                            case "./translations/cs.json":
                                return Promise.resolve().then((function() {
                                    return C_
                                }));
                            case "./translations/da.json":
                                return Promise.resolve().then((function() {
                                    return N_
                                }));
                            case "./translations/de.json":
                                return Promise.resolve().then((function() {
                                    return U_
                                }));
                            case "./translations/el.json":
                                return Promise.resolve().then((function() {
                                    return eg
                                }));
                            case "./translations/en.json":
                                return Promise.resolve().then((function() {
                                    return cg
                                }));
                            case "./translations/es.json":
                                return Promise.resolve().then((function() {
                                    return bg
                                }));
                            case "./translations/fi.json":
                                return Promise.resolve().then((function() {
                                    return Cg
                                }));
                            case "./translations/fr.json":
                                return Promise.resolve().then((function() {
                                    return Ng
                                }));
                            case "./translations/hi.json":
                                return Promise.resolve().then((function() {
                                    return Ug
                                }));
                            case "./translations/hr-HR.json":
                                return Promise.resolve().then((function() {
                                    return ef
                                }));
                            case "./translations/hu.json":
                                return Promise.resolve().then((function() {
                                    return pf
                                }));
                            case "./translations/id.json":
                                return Promise.resolve().then((function() {
                                    return yf
                                }));
                            case "./translations/it.json":
                                return Promise.resolve().then((function() {
                                    return xf
                                }));
                            case "./translations/ja.json":
                                return Promise.resolve().then((function() {
                                    return qf
                                }));
                            case "./translations/ko.json":
                                return Promise.resolve().then((function() {
                                    return Hf
                                }));
                            case "./translations/lt-LT.json":
                                return Promise.resolve().then((function() {
                                    return tb
                                }));
                            case "./translations/ms.json":
                                return Promise.resolve().then((function() {
                                    return pb
                                }));
                            case "./translations/nb.json":
                                return Promise.resolve().then((function() {
                                    return yb
                                }));
                            case "./translations/nl.json":
                                return Promise.resolve().then((function() {
                                    return xb
                                }));
                            case "./translations/pl.json":
                                return Promise.resolve().then((function() {
                                    return qb
                                }));
                            case "./translations/pt-BR.json":
                                return Promise.resolve().then((function() {
                                    return Hb
                                }));
                            case "./translations/pt-PT.json":
                                return Promise.resolve().then((function() {
                                    return ty
                                }));
                            case "./translations/ro-RO.json":
                                return Promise.resolve().then((function() {
                                    return py
                                }));
                            case "./translations/ru.json":
                                return Promise.resolve().then((function() {
                                    return yy
                                }));
                            case "./translations/sk-SK.json":
                                return Promise.resolve().then((function() {
                                    return xy
                                }));
                            case "./translations/sl-SI.json":
                                return Promise.resolve().then((function() {
                                    return qy
                                }));
                            case "./translations/sv.json":
                                return Promise.resolve().then((function() {
                                    return Hy
                                }));
                            case "./translations/th.json":
                                return Promise.resolve().then((function() {
                                    return tv
                                }));
                            case "./translations/tr.json":
                                return Promise.resolve().then((function() {
                                    return pv
                                }));
                            case "./translations/vi.json":
                                return Promise.resolve().then((function() {
                                    return yv
                                }));
                            case "./translations/zh-CN.json":
                                return Promise.resolve().then((function() {
                                    return xv
                                }));
                            case "./translations/zh-TW.json":
                                return Promise.resolve().then((function() {
                                    return qv
                                }));
                            default:
                                return new Promise((function(t, n) {
                                    ("function" == typeof queueMicrotask ? queueMicrotask : setTimeout)(n.bind(null, new Error("Unknown variable dynamic import: " + e)))
                                }))
                        }
                    }(`./translations/${t}.json`);
                s(this, Lp, new ko({
                    [t]: n
                }), "f"), null === (e = this._view) || void 0 === e || e.setTranslations(o(this, Lp, "f"))
            } catch (e) {}
            return null
        }))
    }, Op = function() {
        o(this, bp, "m", Np).call(this), this._iframeLoadTimeout = setTimeout((() => {
            const e = xi;
            this.dispatchCustomEvent("error", {
                message: e.message,
                code: e.code
            }), o(this, bp, "m", Np).call(this)
        }), 1e4)
    }, Np = function() {
        this._iframeLoadTimeout && (clearTimeout(this._iframeLoadTimeout), this._iframeLoadTimeout = void 0)
    }, qp = function(e) {
        var t, n;
        switch (e.type) {
            case "loaded":
                this._onLoaded(e);
                break;
            case "resize_iframe":
                if (!this._shouldListenToResizeMessage) return;
                null === (t = this._view) || void 0 === t || t.resizeIframe(e.height, Lo(e.width, this._view.getIframe()));
                break;
            case "completed":
                this._handleCompleted(e.loggedIn, e.email, e.customerAccessToken, e.customerAccessTokenExpiresAt, e.shouldFinalizeLogin, e.shopPayInstallmentsOnboarded, e.givenName, e.avatar);
                break;
            case "error":
                this._handleError(e.message, e.code);
                break;
            case "close_requested":
                null === (n = this._view) || void 0 === n || n.closeAuthorizeModal({
                    modalStateChangeReason: "event_close_requested"
                });
                break;
            case "shop_user_matched":
                this._onUserMatched(e);
                break;
            case "pop_up_opened":
                this._onPopUpOpened(e);
                break;
            case "shop_user_not_matched":
                this._onUserNotMatched(e);
                break;
            case "email_change_requested":
                this._onEmailChangeRequested();
                break;
            case "verification_step_changed":
                this._onVerificationStepChanged(e);
                break;
            case "custom_flow_side_effect":
                this._handleCustomFlowSideEffect(e)
        }
    };
    const Bp = `<style>\n.prequal_overlay {\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  z-index: ${w} !important;\n  color: white;\n  background: radial-gradient(\n    106.68% 106.68% at 50% 50%,\n    rgba(0, 0, 0, 0.94) 23.96%,\n    rgba(0, 0, 0, 0.6) 100%\n  );\n  animation: fadein 300ms ease-out;\n}\n@keyframes fadein {\n  from {\n      opacity:0;\n  }\n  to {\n      opacity:1;\n  }\n}\n\np {\n    margin: 1em;\n}\n\na {\n    text-decoration: underline;\n    color: #FFF;\n}\n\n</style>\n\n<div class="prequal_overlay">\n    <shop-pay-logo background-color="#000" size="large"></shop-pay-logo>\n    <p>We need a bit more information. <br>\n    Click continue and a new tab will open so you can provide your information securely.</p>\n    <a href="#" id="installments-prequal-overlay-continue">Continue</a>\n</div>\n`,
        Fp = () => `${$l}/shopify_pay/prequal_authorize?target_origin=${window.location.origin}`;
    var Vp, $p, Wp;
    class Up extends Ea {
        constructor() {
            super(), Vp.add(this), $p.set(this, void 0), customElements.get("shop-pay-logo") || customElements.define("shop-pay-logo", Ta)
        }
        connectedCallback() {
            const e = document.createElement("template");
            e.innerHTML = Bp, this.attachShadow({
                mode: "open"
            }).append(e.content.cloneNode(!0)), o(this, Vp, "m", Wp).call(this)
        }
        disconnectedCallback() {
            var e;
            null === (e = this._popupListener) || void 0 === e || e.destroy(), this._popupListener = void 0
        }
        attributeChangedCallback() {}
        handlePostMessage(e) {
            var t, n, i;
            "close" === e.type && (null === (t = o(this, $p, "f")) || void 0 === t || t.close(), this.dispatchCustomEvent("overlayClose")), "prequal_buyer_upsert_successful" === e.type && (null === (n = o(this, $p, "f")) || void 0 === n || n.close(), this.dispatchCustomEvent("buyerOnboardingSuccess")), "error" === e.type && (null === (i = o(this, $p, "f")) || void 0 === i || i.close(), this.dispatchCustomEvent("closeOverlayAndModal"))
        }
        handleContinueButtonClick() {
            if (o(this, $p, "f") && !o(this, $p, "f").closed) o(this, $p, "f").focus(), this.addPostMessageEventListener();
            else {
                const e = Fp();
                s(this, $p, A({
                    url: e,
                    width: 500,
                    height: 750
                }), "f"), o(this, $p, "f") && (o(this, $p, "f").focus(), this.addPostMessageEventListener())
            }
        }
        addPostMessageEventListener() {
            o(this, $p, "f") && (this._popupListener = new gi(new zi(o(this, $p, "f")), [fi], this.handlePostMessage.bind(this)))
        }
    }
    $p = new WeakMap, Vp = new WeakSet, Wp = function() {
        var e;
        const t = null === (e = this.shadowRoot) || void 0 === e ? void 0 : e.querySelector("#installments-prequal-overlay-continue");
        t && (t.onclick = () => {
            this.handleContinueButtonClick()
        })
    };
    class Hp extends Error {
        constructor() {
            super("ShopifyAnalytics not available")
        }
    }
    const Kp = e => Object.keys(e).reduce(((t, n) => Object.assign(Object.assign({}, t), {
            [n.replace(/[A-Z]/g, (e => `_${e.toLowerCase()}`))]: e[n]
        })), {}),
        Zp = "initial";
    class Gp extends HTMLElement {
        constructor() {
            if (super(), this._pageImpressionEventEmitted = !1, !this.shadowRoot) {
                const e = this.attachShadow({
                        mode: "open"
                    }),
                    t = document.createElement("template");
                t.innerHTML = "<style>:host{display:inline-block;font-size:0;line-height:normal;-webkit-font-smoothing:inherit;-moz-osx-font-smoothing:inherit;--shop-avatar-size:32px}.avatar-wrapper{--normalized-size:clamp(24px, var(--shop-avatar-size), 32px);font:600 16px/19px -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica;display:inline-block;border-radius:100%;padding:calc(var(--normalized-size) * .1875)}.avatar-wrapper:hover{background-color:rgb(242 244 245 / 1);background-color:color-mix(in srgb,currentColor 15%,transparent)}.avatar{position:relative;font-size:calc(var(--normalized-size) / 2);box-sizing:border-box;display:flex;width:var(--normalized-size);height:var(--normalized-size);align-items:center;justify-content:center;border-radius:9999999px;border:1px solid rgb(227 227 227/1);background-color:rgb(242 244 245/1);color:rgb(18 18 18/1);background-size:cover;background-position:center;text-transform:uppercase;padding-left:1px;padding-bottom:1px}.avatar:before{content:var(--shop-avatar-initial)}.avatar:after{position:absolute;content:'';top:0;left:0;width:100%;height:100%;background-image:var(--shop-avatar-src);background-size:cover;background-position:center;border-radius:9999999px}</style><div class=\"avatar-wrapper\"><div class=\"avatar\"></div></div>", e.appendChild(t.content.cloneNode(!0)), this._wrapperElement = e.querySelector(".avatar-wrapper")
            }
        }
        connectedCallback() {
            this._emitPageImpressionEvent(), this._synchronizeCustomProperties()
        }
        attributeChangedCallback() {
            this._synchronizeCustomProperties()
        }
        _synchronizeCustomProperties() {
            var e, t, n;
            const i = this.getAttribute("src") || "",
                a = this.getAttribute(Zp) || "";
            null === (e = this._wrapperElement) || void 0 === e || e.style.setProperty("--shop-avatar-initial", `"${a}"`), i ? null === (t = this._wrapperElement) || void 0 === t || t.style.setProperty("--shop-avatar-src", `url("${i}")`) : null === (n = this._wrapperElement) || void 0 === n || n.style.removeProperty("--shop-avatar-src")
        }
        _emitPageImpressionEvent() {
            var e;
            this._pageImpressionEventEmitted || ((e => {
                let t;
                const n = Promise.race([new Promise(((e, n) => t = setTimeout((() => n(new Hp)), 1e4))), new Promise(((t, n) => {
                    var i;
                    const a = null === (i = window.ShopifyAnalytics) || void 0 === i ? void 0 : i.lib;
                    a && a.ready ? a.ready((() => {
                        var i, a;
                        (null === (a = null === (i = window.ShopifyAnalytics) || void 0 === i ? void 0 : i.lib) || void 0 === a ? void 0 : a.track) ? t(window.ShopifyAnalytics.lib.track(`monorail://${e.schemaId}`, Kp(e.payload))): n(new Hp)
                    })) : n(new Hp)
                }))]);
                n.catch((e => {
                    e instanceof Hp || console.log("[shop-js] Error emitting monorail event", e)
                })).finally((() => clearTimeout(t)))
            })({
                schemaId: "shopify_pay_login_with_shop_sdk_page_impressions/3.3",
                payload: {
                    shopPermanentDomain: (null === (e = window.Shopify) || void 0 === e ? void 0 : e.shop) || "",
                    flow: "avatar",
                    flowVersion: "unspecified",
                    analyticsTraceId: this._getAnalyticsTraceId() || "",
                    pageName: "AVATAR_SHOWN"
                }
            }), this._pageImpressionEventEmitted = !0)
        }
        _getAnalyticsTraceId() {
            try {
                const e = new RegExp("(shop_analytics)=([^;]+)").exec(document.cookie);
                return e ? e[2] : null
            } catch (e) {
                return null
            }
        }
    }
    Gp.observedAttributes = ["src", Zp];
    const Jp = '\n  <style>\n      @font-face {\n        font-family: \'InterVariable\';\n        src: url(\'https://cdn.shopify.com/static/fonts/inter/v4/InterVariable.woff2\') format(\'woff2\');\n        font-weight: 100 900;\n        font-display: swap;\n        font-style: normal;\n        font-named-instance: \'Regular\';\n    }\n\n    * {\n      box-sizing: border-box;\n    }\n\n    .visually-hidden {\n      border: 0;\n      clip: rect(0, 0, 0, 0);\n      height: 1px;\n      margin: -1px;\n      overflow: hidden;\n      padding: 0;\n      position: absolute;\n      white-space: nowrap;\n      width: 1px;\n    }\n\n    .shopify-installments {\n      margin-top: 0;\n      margin-bottom: 0;\n    }\n\n    .shopify-installments__inline {\n      display: inline\n    }\n\n    .shopify-installments__content {\n      padding-right: 4px;\n    }\n\n    .shopify-installments__learn-more {\n      color: inherit;\n      font-weight: inherit;\n      font: inherit;\n      background: none;\n      border: none;\n      padding: 0;\n      margin: 0;\n      cursor: pointer;\n      text-decoration: underline;\n    }\n\n    .shopify-installments__prequal-row-wrapper {\n      display: inline-flex;\n      position: relative;\n      overflow: hidden;\n    }\n\n    .shopify-installments__prequal-row {\n      display: inline-flex;\n      width: fit-content;\n      column-gap: 4px;\n      flex-wrap: nowrap;\n      min-width: max-content;\n      align-items: center;\n      transition: width 200ms;\n    }\n\n    .shopify-installments__prequal-row shop-prequal-amount,\n    .shopify-installments__prequal-row .shopify-installments__learn-more {\n      display: inline-block;\n    }\n\n    .default-font #shopify-installments-content b {\n      font-family: \'InterVariable\', sans-serif;\n      font-weight: bold;\';\n    }\n\n    #prequalAmountRowWrapper:not(.is-prequalified) #prequalAmountContainer {\n      transform: translateY(100%);\n      position: absolute;\n    }\n\n    .is-prequalified #prequalAmountContainer {\n      animation-name: slideUp;\n      animation-duration: 300ms;\n      animation-timing-function: ease-in;\n    }\n    .is-prequalified #prequalBackupCTA {\n      transition: all 300ms ease-out;\n      transform: translateY(100%);\n      opacity: 0;\n      position: absolute;\n    }\n\n    .stable.is-prequalified #prequalBackupCTA,\n    #prequalAmountRowWrapper.stable:not(.is-prequalified) #prequalAmountContainer\n    {\n      visibility: hidden;\n    }\n\n    #prequalAmountRowWrapper:not(.is-prequalified) #prequalAmountContainer button,\n    .is-prequalified #prequalBackupCTA button {\n      -webkit-touch-callout: none;\n      -webkit-user-select: none;\n      -khtml-user-select: none;\n      -moz-user-select: none;\n      -ms-user-select: none;\n      user-select: none;\n      pointer-events: none;\n    }\n\n    @keyframes slideUp {\n      0%,\n      20% {\n        transform: translateY(100%);\n        opacity: 0;\n      }\n\n      100% {\n        transform: translateY(0);\n        opacity: 1;\n      }\n    }\n  </style>\n  <p class="shopify-installments" id="shopify-installments">\n    <span class="shopify-installments__content" id="shopify-installments-content"></span>\n    <span class="shopify-installments__prequal-row-wrapper stable" id="prequalAmountRowWrapper">\n      <span class="shopify-installments__prequal-row" id="prequalBackupCTA">\n        <button aria-haspopup="dialog" class="shopify-installments__learn-more" id="shopify-installments-cta"></button>\n      </span>\n      <span class="shopify-installments__prequal-row" id="prequalAmountContainer">\n        <button aria-haspopup="dialog" class="shopify-installments__learn-more" id="shopifyPrequalifiedCTA" tabIndex="-1"></button>\n      </span>\n    </span>\n  </p>\n',
        Yp = e => `<shop-pay-logo role="img" aria-label="Shop Pay" background-color="${e}"></shop-pay-logo>`,
        Qp = "Affirm",
        Xp = "\n#shopify-payment-terms-modal .visually-hidden {\n  border: 0;\n  clip: rect(0, 0, 0, 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  white-space: nowrap;\n  width: 1px;\n}\n\n#shopify-payment-terms-modal .modal-wrapper {\n  max-width: 432px;\n}\n\n#shopify-payment-terms-modal p {\n  font-size: 18px;\n  line-height: 150%;\n}\n\n#shopify-payment-terms-modal section {\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,\n    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';\n}\n\n#shopify-payment-terms-modal .price {\n  color: rgb(90, 49, 244);\n  font-weight: 600;\n  display: inline-flex;\n  flex-direction: column;\n  line-height: 1;\n  align-items: center;\n}\n\n#shopify-payment-terms-modal .price__icon {\n  width: 43px;\n  height: 10px;\n}\n\n#shopify-payment-terms-modal .list {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n\n#shopify-payment-terms-modal .list-item__subheading {\n  font-size: 14px;\n  line-height: 140%;\n  color: rgba(0, 0, 0, 0.7);\n}\n\n#shopify-payment-terms-modal .btn__close--icon {\n  display: inline-flex;\n  flex-shrink: 0;\n  padding: 16px;\n  border-radius: 6px;\n}\n\n#shopify-payment-terms-modal .btn__close--icon:hover,\n#shopify-payment-terms-modal .btn__close--icon:active,\n#shopify-payment-terms-modal .btn__close--icon:focus {\n  background-color: rgb(244, 241, 254);\n  color: rgb(63, 34, 171);\n}\n\n#shopify-payment-terms-modal .help_text {\n  margin-bottom: 19px;\n  margin-top: 16px;\n  font-size: 11px;\n  line-height: 14px;\n  color: rgba(0, 0, 0, 0.6);\n}\n\n#shopify-payment-terms-modal .help_text small {\n  color: inherit;\n  letter-spacing: 0.04rem;\n  font-weight: 300;\n  font-size: 11px;\n}\n\n#shopify-payment-terms-modal .help_text__link {\n  color: rgba(0, 0, 0, 0.6);\n  text-decoration: underline;\n}\n\n#shopify-payment-terms-modal .help_text__link:hover,\n#shopify-payment-terms-modal .help_text__link:active,\n#shopify-payment-terms-modal .help_text__link:focus {\n  color: rgb(63, 34, 171);\n}\n\n#shopify-payment-terms-modal .tagline__bold {\n  font-weight: 700;\n}\n\n#shopify-payment-terms-modal footer, #shopify-payment-terms-cover footer {\n  text-align: center;\n}\n\n#shopify-payment-terms-modal .shop-pay-logo-wrapper,\n#shopify-payment-terms-cover .shop-pay-logo-wrapper {\n  margin-bottom: 12px;\n}\n\n#shopify-payment-terms-modal .close__icon {\n  width: 13px;\n  height: 13px;\n}\n\n.affirm-logo,\n#shopify-payment-terms-modal .affirm-logo,\n#shopify-payment-terms-cover .affirm-logo {\n  width: 39px;\n  height: 21px;\n  padding-left: 4px;\n  box-sizing: content-box;\n}\n\n.affirm-logo-inline,\n#shopify-payment-terms-modal .affirm-logo-inline,\n#shopify-payment-terms-cover .affirm-logo-inline {\n  margin-bottom: -6px;\n  padding-left: 0px;\n}\n\n.affirm-text,\n#shopify-payment-terms-modal .affirm-text,\n#shopify-payment-terms-cover .affirm-text {\n  display: flex;\n  font-size: 12px;\n  font-weight: 300;\n  line-height: 150%;\n  color: rgba(0, 0, 0, 0.6);\n  justify-content: center;\n  align-items: center;\n}\n\n.affirm-text small,\n#shopify-payment-terms-modal .affirm-text small,\n#shopify-payment-terms-cover .affirm-text small {\n  font-size: 11px;\n  letter-spacing: 0.04rem;\n  line-height: 14px;\n}\n",
        ed = "Failed to construct 'HTMLElement': This instance is already constructed";
    class td {
        constructor(e) {
            this._documentFocusHandler = e => {
                this._lastFocusable && e.target !== this._getShadowRootHost() && !this._isEventFromModal(e) && (e.preventDefault(), e.stopPropagation(), this._lastFocusable.focus())
            }, this._shadowRootFocusHandler = e => {
                this._firstFocusable && e.target === this._phantomElement && this._firstFocusable.focus()
            }, this._htmlElement = e
        }
        lock() {
            const e = this._htmlElement.querySelectorAll('a[href], button:not([disabled]):not([tabindex="-1"]');
            this._firstFocusable = e[0], this._lastFocusable = e[e.length - 1], this._phantomElement = this._createPhantomElement(), this._htmlElement.appendChild(this._phantomElement), this._htmlElement.addEventListener("focus", this._shadowRootFocusHandler, !0), document.addEventListener("focus", this._documentFocusHandler, !0)
        }
        release(e = {}) {
            this._htmlElement.removeEventListener("focus", this._shadowRootFocusHandler, !0), document.removeEventListener("focus", this._documentFocusHandler, !0), this._removePhantomElement(), e instanceof HTMLElement && e.focus()
        }
        _createPhantomElement() {
            const e = document.createElement("button");
            return e.setAttribute("aria-hidden", "true"), e.className = "visually-hidden", e
        }
        _removePhantomElement() {
            this._phantomElement && this._htmlElement.removeChild(this._phantomElement)
        }
        _isEventFromModal(e) {
            const t = e.composedPath().find((e => e instanceof Element && e.ariaModal));
            return Boolean(t)
        }
        _getShadowRootHost() {
            const e = this._htmlElement.getRootNode();
            return e instanceof ShadowRoot ? e.host : null
        }
    }

    function nd(e) {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2
        }).format(e)
    }

    function id() {
        var e, t, n;
        switch (null === (n = null === (t = null === (e = window.Shopify) || void 0 === e ? void 0 : e.theme) || void 0 === t ? void 0 : t.name) || void 0 === n ? void 0 : n.toLowerCase()) {
            case "boundless":
            case "brooklyn":
                return ".cart__subtotal";
            case "dawn":
                return ".totals__subtotal-value, .sections.cart.new_subtotal";
            case "debut":
                return ".cart-subtotal__price";
            case "express":
                return ".cart__subtotal, .cart-drawer__subtotal-value";
            case "minimal":
                return ".h5.cart__subtotal-price";
            case "narrative":
                return ".cart-subtotal__price, .cart-drawer__subtotal-number";
            case "simple":
                return ".cart__subtotal.h3";
            case "supply":
                return ".h1.cart-subtotal--price";
            case "venture":
                return ".CartSubtotal"
        }
        return null
    }

    function ad() {
        document.querySelector("[data-cart-subtotal]") || console.warn("[Shop Pay Installments] Cart price updates may not be handled automatically for this theme. To ensure the price shown in the Shop Pay Installments banner is updated correctly, follow the instructions found here: https://shopify.dev/themes/pricing-payments/installments#updating-the-banner-with-cart-total-changes")
    }

    function od(e) {
        var t, n, i;
        const a = "#FFF";
        if (!e) return a;
        const o = e.host.parentElement && (null === (t = getComputedStyle(e.host.parentElement).getPropertyValue("--payment-terms-background-color")) || void 0 === t ? void 0 : t.trim()),
            s = null === (n = getComputedStyle(document.documentElement).getPropertyValue("--payment-terms-background-color")) || void 0 === n ? void 0 : n.trim(),
            r = null === (i = getComputedStyle(document.documentElement).getPropertyValue("--color-body")) || void 0 === i ? void 0 : i.trim(),
            l = o || s || r;
        return l && CSS.supports("color", l) ? l : a
    }

    function sd(e) {
        return parseFloat(e.replace(/[^0-9.]/g, ""))
    }

    function rd(e) {
        const t = e.querySelector('select[name^="id"]') || e.querySelector('[name^="id"]');
        return t ? Number(t.value) : function() {
            const e = new URL(document.location.href).searchParams.get("variant");
            return e ? Number(e) : void 0
        }()
    }

    function ld(e) {
        const t = '<svg role="img" aria-labelledby="shopify-payment-terms-modal-affirm" class="affirm-logo-inline affirm-logo"><use xlink:href="#affirm" /></svg>';
        return e.isEnglish() ? e.translate("modal.partnership", {
            affirmLogo: t
        }) : e.translate("modal.partnership_disclaimer", {
            affirmLogo: t
        })
    }

    function cd(e, t, n) {
        return {
            subTitle: e.translate("modal.subtitle.dynamic_pdp", {
                count: t,
                priceWithoutInterest: n
            }),
            legalCopy: e.translate("modal.legal.dynamic_pdp")
        }
    }

    function pd(e, t) {
        return e.map((({
            pricePerTerm: e,
            apr: n,
            numberOfPaymentTerms: i,
            loanType: a
        }) => {
            const o = sd(e) * i,
                s = sd(t);
            return {
                pricePerTerm: e,
                apr: n,
                numberOfPaymentTerms: i,
                interest: nd(0 === n ? 0 : o - s),
                totalPriceWithInterest: nd(0 === n ? s : o),
                loanType: a
            }
        }))
    }

    function dd(e, t, n, i) {
        const a = e.translate("modal.title"),
            o = e.translate("modal.sample_plan_contents.check_eligibility"),
            s = e.translate("modal.sample_plan_contents.interest"),
            r = e.translate("modal.sample_plan_contents.total"),
            l = e.translate("modal.sample_plan_contents.processing"),
            c = e.translate("modal.sample_plan_contents.processing_time"),
            p = ld(e),
            d = e.translate("modal.new_window"),
            u = e.translate("modal.close");
        return `\n  <style>\n    ${Xp}\n\n    shop-pay-button[disabled] {\n      pointer-events: none;\n    }\n\n    #shopify-payment-terms-modal header {\n      display: flex;\n      flex-direction: column;\n    }\n\n    #shopify-payment-terms-modal h1 {\n      display: flex;\n      flex-direction: column;\n      color: rgb(18, 18, 18)\n    }\n\n    #shopify-payment-terms-modal p {\n      color: rgba(18, 18, 18, 0.7)\n    }\n\n    #shopify-payment-terms-modal #header-icons {\n      display: flex;\n      width: 100%;\n      justify-content: space-between;\n      align-items: baseline;\n      margin-bottom: 16px;\n    }\n\n    #shopify-payment-terms-modal .btn__close {\n      margin: 0;\n      background: transparent;\n      border: none;\n      -webkit-font-smoothing: inherit;\n      appearance: button;\n      cursor: pointer;\n    }\n\n    #shopify-payment-terms-modal h1 {\n      font-size: 30px;\n      font-weight: 600;\n      line-height: 120%;\n      margin: 0;\n      max-width: 100%;\n      font-family: inherit;\n      letter-spacing: 0.02em;\n    }\n\n    #shopify-payment-terms-modal .tagline {\n      margin: 0 0 16px 0;\n      line-height: 24px;\n    }\n    #shopify-payment-terms-modal .list {\n      background-color: #F5F5F5;\n      border-radius: 5px;\n      border: 1px solid #D9D9D9;\n      padding: 17px 21px;\n    }\n    #shopify-payment-terms-modal .list-item {\n      display: flex;\n      justify-content: space-between;\n      flex-direction: column;\n      padding: 11px 0;\n      color: #707070;\n      border-bottom: 1px solid #D9D9D9;\n    }\n\n    #shopify-payment-terms-modal .list-item:first-child {\n      padding-top: 0;\n    }\n\n    #shopify-payment-terms-modal .list-item:last-child {\n      border-bottom: none;\n      padding-bottom: 0;\n    }\n\n    #shopify-payment-terms-modal .list-item__price-per-term {\n      font-size: 18px;\n      font-weight: 600;\n    }\n\n    #shopify-payment-terms-modal .list-item__frequency {\n      font-size: 14px;\n      font-weight: 600;\n    }\n\n    #shopify-payment-terms-modal .list-item__payment-length {\n      padding: 2px 0px;\n      background: #F0F2F4;\n      border-radius: 4px;\n    }\n\n    #shopify-payment-terms-modal .list-item__number-of-terms {\n      font-size: 14px;\n    }\n\n    #shopify-payment-terms-modal .list-item__interest-details-container {\n      display: flex;\n      flex-direction: column;\n      row-gap: 9px;\n    }\n\n    #shopify-payment-terms-modal .list-item__interest-detail-label {\n      font-size: 12px;\n      line-height: 18px;\n    }\n\n    #shopify-payment-terms-modal .list-item__interest-detail-value {\n      font-size: 12px;\n      line-height: 18px;\n    }\n\n    #shopify-payment-terms-modal .list-item__financial-container {\n      display: flex;\n      justify-content: space-between;\n      margin-bottom: 9px;\n    }\n\n    #shopify-payment-terms-modal .list-item__amount-per-interval {\n      display: flex;\n      align-items: baseline;\n      line-height: 26px;\n    }\n\n    #shopify-payment-terms-modal .list-item__plan-total {\n      font-weight: 600;\n    }\n\n    #shopify-payment-terms-modal .list-item__interest-detail {\n      display: flex;\n      flex-direction: row;\n      margin-right: 12px;\n      align-content: center;\n      justify-content: space-between;\n      width: 100%;\n    }\n\n    #shopify-payment-terms-modal .navigation-buttons {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      margin-top: 16px;\n    }\n\n    #shopify-payment-terms-modal .shop-status-indicator-loading {\n      width: 100%;\n      height: 42px;\n    }\n\n    #shopify-payment-terms-modal .check_eligibility {\n      margin: 5px 0;\n      font-weight: 300;\n      font-size: 12px;\n      text-align: center;\n    }\n\n    #shopify-payment-terms-modal .help_text {\n      margin-top: 32px;\n      font-size: 12px;\n    }\n\n    .shop-modal-content-processing {\n      display: flex;\n      align-items: center;\n      position: absolute;\n      top: 0;\n      bottom: 0;\n      right: 0;\n      left: 0;\n      padding: 2em;\n      flex-direction: column;\n      justify-content: center;\n\n      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,\n    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';\n    }\n\n    @keyframes fadeIn {\n      0% { opacity: 0; }\n      100% { opacity: 1; }\n    }\n\n    .shop-modal-content-processing:not(.prequal-hidden-state) {\n      animation: fadeIn 1s;\n    }\n\n    .shop-modal-content-processing > div {\n      margin-top: 20px;\n      text-align: center;\n    }\n\n    .shop-modal-content-processing .shop-modal-content-processing-loading-container {\n      height: 100%;\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      align-items: center;\n    }\n\n    .shop-modal-content-processing-loading-container > div {\n      margin-top: 20px;\n    }\n\n    .shop-modal-content-processing p {\n      margin: 0;\n    }\n\n    .shop-modal-content-processing p:first-child {\n      color: black;\n    }\n\n    .shop-modal-content-processing p:last-child {\n      font-size: 12px;\n      color: rgba(0, 0, 0, 0.6);\n    }\n\n    .hidden-navigation-buttons {\n      display: none;\n    }\n\n    .prequal-hidden-state {\n      display: none !important;\n    }\n\n    .modal-wrapper.opaque-hidden {\n      opacity: 0;\n      height: 500px;\n      overflow: hidden;\n    }\n  </style>\n  <div class="shop-modal-content-processing prequal-hidden-state">\n    <div class="shop-modal-content-processing-loading-container">\n      <div>\n        <p>${l}</p>\n        <p>${c}</p>\n      </div>\n    </div>\n    <div>\n      ${md(p)}\n      ${hd()}\n    </div>\n  </div>\n  <div class="shop-modal-feature-iframe-wrapper prequal-hidden-state"></div>\n  <div class="continue-to-checkout-button prequal-hidden-state"></div>\n  <div\n    id="shopify-payment-terms-modal"\n    role="dialog"\n    aria-modal="true"\n    aria-labelledby="shopify-payment-terms-modal-heading"\n    tabindex="-1">\n    <section class="modal-wrapper">\n      <header>\n        <div id="header-icons">\n          <h1 id="shopify-payment-terms-modal-heading">${a}</h1>\n          <button type="button" class="btn__close btn__close--icon" aria-label="${u}">\n            <svg class="close__icon" aria-hidden="true"><use xlink:href="#close" /></svg>\n          </button>\n        </div>\n      </header>\n      <div hidden id="shopify-payment-terms-modal-warning-text">${d}</div>\n      <p class="tagline">${t}</p>\n      <ul class="list">\n        ${i.map((({pricePerTerm:t,apr:n,numberOfPaymentTerms:i,interest:a,totalPriceWithInterest:o,loanType:l})=>{const c=e.translate("modal.sample_plan_contents.apr",{aprAmount:n});return`\
        n < li class = "list-item" > \n < div class = "list-item__financial-container" > \n < span class = "list-item__amount-per-interval" > \n $ {
            l === ei.SplitPay ? e.translate("modal.sample_plan_contents.split_pay_frequency", {
                pricePerTerm: t
            }) : e.translate("modal.sample_plan_contents.other_frequency", {
                pricePerTerm: t
            })
        }\
        n < span class = "list-item__number-of-terms" > $ {
            l === ei.SplitPay ? e.translate("modal.sample_plan_contents.split_pay_number_of_terms", {
                numberOfTerms: 2 * i
            }) : e.translate("modal.sample_plan_contents.other_number_of_terms", {
                numberOfTerms: i
            })
        } < /span>\n              </span > \n < /div>\n            <div class="list-item__interest-details-container">\n              <div class="list-item__interest-detail">\n                <span class="list-item__interest-detail-label list-item__apr-amount">${s} (${n}% ${c})</span > \n < span class = "list-item__interest-detail-value list-item__interest-amount" > $ {
            a
        } < /span>\n              </div > \n < div class = "list-item__interest-detail" > \n < span class = "list-item__interest-detail-label" > $ {
            r
        } < /span>\n                <span class="list-item__interest-detail-value list-item__plan-total">${o}</span > \n < /div>\n            </div > \n < /li>\n        `})).join("")}\n      </ul > \n < div class = "navigation-buttons" > < /div>\n      <p class="check_eligibility">${o}</p > \n < p id = "eligibility-approval"
        class = "help_text" > \n < small > \n $ {
            n
        }\
        n < /small>\n      </p > \n < footer > \n $ {
            md(p)
        }\
        n < /footer>\n      ${hd()}\n    </section > \n < /div>`}function ud(e,t,n,i,a){return`\n   <shop-pay-button style="width: 100%; --shop-pay-button-width: auto;" store-url="${e}" ${void 0===i?"":`variants="${i.idQuantityMapping}" ${!1===i.available?"disabled":""}`} button-text="${n}" payment-option="shop_pay_installments" source="installments_modal" source-token="${t}" ${void 0===a?"":`cart=${encodeURIComponent(JSON.stringify({currency:a.currency,items:a.items,token:a.token}))}`}></shop - pay - button > \n `}function md(e){return`\
        n < div class = "shop-pay-logo-wrapper" > \n < shop - pay - logo role = "img"
        aria - label = "Shop Pay"
        size = "large" > < /shop-pay-logo>\n  </div > \n < div class = "affirm-text" > \n < small > \n $ {
            e
        }\
        n < /small>\n  </div > `}function hd(){return'<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" style="display: none;">\n  <symbol id="fees-icon" viewBox="0 0 21 18" fill="none">\n    <path d="M18.5 10.5474C18.5 15.267 14.5995 19.1236 9.75 19.1236C4.90048 19.1236 1 15.267 1 10.5474C1 5.82767 4.90048 1.97107 9.75 1.97107C14.5995 1.97107 18.5 5.82767 18.5 10.5474Z" stroke="#0B0B0C" stroke-width="2"/>\n    <path d="M11.4875 8.06938C11.8819 8.456 12.515 8.4497 12.9016 8.05531C13.2882 7.66092 13.2819 7.02778 12.8875 6.64117L11.4875 8.06938ZM10.0408 6.55725V7.55725V6.55725ZM7.1335 12.4337C6.70617 12.0838 6.07613 12.1466 5.72626 12.5739C5.37639 13.0013 5.43917 13.6313 5.8665 13.9812L7.1335 12.4337ZM12.1875 7.35527C12.8875 6.64117 12.8872 6.64088 12.887 6.6406C12.8869 6.6405 12.8866 6.64021 12.8864 6.64001C12.8859 6.63961 12.8855 6.6392 12.8851 6.63878C12.8842 6.63793 12.8833 6.63703 12.8823 6.63609C12.8804 6.63419 12.8782 6.6321 12.8758 6.62982C12.871 6.62526 12.8654 6.61993 12.8589 6.61388C12.8459 6.6018 12.8294 6.58683 12.8096 6.5694C12.7699 6.53459 12.7164 6.48973 12.6497 6.43832C12.5166 6.33585 12.328 6.20519 12.0884 6.07602C11.6099 5.81808 10.9106 5.55725 10.0408 5.55725V7.55725C10.5036 7.55725 10.8777 7.69544 11.1394 7.83651C11.2698 7.90684 11.3681 7.97569 11.4293 8.02285C11.4597 8.04625 11.4802 8.06374 11.4903 8.07257C11.4953 8.07696 11.4976 8.07914 11.4972 8.07874C11.497 8.07854 11.4961 8.07769 11.4944 8.07615C11.4936 8.07538 11.4927 8.07443 11.4915 8.07331C11.4909 8.07274 11.4903 8.07214 11.4896 8.07148C11.4893 8.07116 11.4889 8.07082 11.4886 8.07047C11.4884 8.07029 11.4881 8.07002 11.488 8.06993C11.4877 8.06966 11.4875 8.06938 12.1875 7.35527ZM10.0408 5.55725C8.12515 5.55725 6.90378 6.0365 6.19464 6.83562C5.49081 7.62876 5.5 8.51566 5.5 8.77398L7.5 8.77398C7.5 8.58897 7.50919 8.3675 7.69057 8.1631C7.86664 7.96469 8.41567 7.55725 10.0408 7.55725V5.55725ZM5.5 8.77398C5.5 10.0149 6.8138 11.5474 10.0408 11.5474V9.54737C7.35373 9.54737 7.5 8.41981 7.5 8.77398L5.5 8.77398ZM10.0408 11.5474C11.3127 11.5474 11.7267 11.9199 11.8526 12.072C11.9294 12.1647 11.9638 12.2521 11.9797 12.3098C11.9877 12.3388 11.9908 12.3595 11.9919 12.3681C11.9924 12.3721 11.9925 12.3743 11.9927 12.376C11.9927 12.3767 11.9928 12.3777 11.9929 12.3796C11.993 12.3801 11.9934 12.3859 11.9937 12.3909C11.9938 12.3916 11.9953 12.4128 11.9983 12.4379C11.9991 12.4448 12.004 12.4884 12.0163 12.5424C12.0206 12.5613 12.0384 12.6404 12.081 12.7343C12.1072 12.7876 12.1909 12.9199 12.2529 12.9949C12.374 13.1073 12.744 13.2896 12.9915 13.3208V11.3208C13.239 11.3519 13.609 11.5342 13.7301 11.6466C13.7921 11.7215 13.8758 11.8538 13.9019 11.907C13.9445 12.0008 13.9622 12.0798 13.9664 12.0985C13.9786 12.152 13.9835 12.195 13.9842 12.201C13.9859 12.2154 13.9869 12.2264 13.9873 12.2305C13.9877 12.2355 13.988 12.2393 13.9881 12.2405C13.9882 12.2421 13.9883 12.2437 13.988 12.2392C13.9878 12.2363 13.9874 12.2314 13.987 12.2257C13.9852 12.2014 13.9821 12.1655 13.9765 12.121C13.9655 12.0326 13.9455 11.9148 13.9076 11.7775C13.8317 11.5027 13.6833 11.1468 13.3928 10.7961C12.7843 10.0615 11.7261 9.54737 10.0408 9.54737V11.5474ZM12.9915 13.3208C12.7152 13.2818 12.3392 13.0787 12.2329 12.9723C12.1834 12.9097 12.1152 12.8024 12.0934 12.7604C12.0576 12.6873 12.0393 12.6263 12.0345 12.6106C12.0212 12.5665 12.014 12.5313 12.0123 12.5227C12.0071 12.4972 12.0042 12.4778 12.0034 12.4721C12.0011 12.4564 12.0001 12.4462 11.9998 12.4436C11.9991 12.4365 11.9995 12.4381 11.9998 12.4473C12.0003 12.4656 12.0003 12.5037 11.9945 12.5544C11.9827 12.6586 11.9503 12.7886 11.8754 12.9129C11.7692 13.089 11.4095 13.5375 10.0408 13.5375V15.5375C11.9075 15.5375 13.0264 14.8776 13.5883 13.9454C13.8474 13.5154 13.9465 13.0913 13.9818 12.7798C13.9996 12.6227 14.002 12.4876 13.9988 12.3847C13.9972 12.3333 13.9941 12.2872 13.9902 12.2477C13.9883 12.2288 13.9858 12.2062 13.9822 12.1821C13.9808 12.1723 13.9774 12.1497 13.9717 12.122C13.9698 12.1124 13.9624 12.0764 13.9489 12.0317C13.9441 12.0157 13.9257 11.9545 13.8899 11.8814C13.868 11.8393 13.7998 11.7319 13.7502 11.6693C13.6439 11.5628 13.2679 11.3597 12.9915 11.3208V13.3208ZM10.0408 13.5375C9.30305 13.5375 8.58044 13.2774 8.00962 12.9834C7.73057 12.8397 7.50347 12.696 7.34846 12.59C7.27131 12.5372 7.21302 12.4944 7.17616 12.4666C7.15775 12.4527 7.14477 12.4426 7.13753 12.4369C7.13392 12.434 7.13175 12.4323 7.13106 12.4317C7.13071 12.4314 7.13074 12.4315 7.13115 12.4318C7.13135 12.432 7.13165 12.4322 7.13204 12.4325C7.13224 12.4327 7.13245 12.4329 7.1327 12.4331C7.13282 12.4331 7.13302 12.4333 7.13308 12.4334C7.13329 12.4335 7.1335 12.4337 6.5 13.2074C5.8665 13.9812 5.86672 13.9814 5.86696 13.9816C5.86704 13.9816 5.86728 13.9818 5.86745 13.982C5.86779 13.9822 5.86816 13.9825 5.86855 13.9829C5.86934 13.9835 5.87023 13.9842 5.87122 13.985C5.8732 13.9866 5.87559 13.9886 5.87838 13.9908C5.88396 13.9953 5.89114 14.001 5.89989 14.0079C5.91739 14.0217 5.94118 14.0402 5.97093 14.0626C6.03039 14.1075 6.11399 14.1687 6.21908 14.2406C6.42854 14.3839 6.72734 14.5727 7.09394 14.7615C7.81445 15.1326 8.86225 15.5375 10.0408 15.5375V13.5375Z" fill="#0B0B0C"/>\n    <path d="M9.75 4.96118L9.75 16.1335" stroke="#0B0B0C" stroke-width="2" stroke-linecap="round"/>\n  </symbol>\n  <symbol id="cc-icon" viewBox="0 0 21 16" fill="none">\n    <path\n    d="M17.3636 1H2.63636C1.73262 1 1 1.7835 1 2.75V13.25C1 14.2165 1.73262 15 2.63636 15H17.3636C18.2674 15 19 14.2165 19 13.25V2.75C19 1.7835 18.2674 1 17.3636 1Z"\n    stroke="#0B0B0C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />\n    <path d="M1 6L19 6" stroke="#0B0B0C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />\n    <path d="M13 11H15" stroke="#0B0B0C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />\n  </symbol>\n  <symbol id="affirm" viewBox="0 0 40 22" fill="none">\n    <title id="shopify-payment-terms-modal-affirm">Affirm</title>\n    <path fill="#000000"\n      d="M3.058 14.543c-.482 0-.724-.236-.724-.623 0-.72.812-.965 2.292-1.121 0 .962-.656 1.744-1.569 1.744zm.638-5.413c-1.058 0-2.275.495-2.936 1.017l.604 1.26c.53-.48 1.386-.892 2.159-.892.734 0 1.14.243 1.14.734 0 .33-.269.497-.777.563C1.99 12.056.5 12.575.5 14.026c0 1.15.826 1.846 2.116 1.846.92 0 1.74-.507 2.129-1.176v.99H6.46v-4.148c0-1.712-1.2-2.408-2.764-2.408zM20.92 9.318v6.367h1.837v-3.068c0-1.458.89-1.886 1.51-1.886.243 0 .57.07.785.23l.334-1.684a2.104 2.104 0 00-.822-.147c-.944 0-1.538.415-1.929 1.258v-1.07h-1.714zM33.899 9.13c-.971 0-1.697.57-2.075 1.118-.35-.709-1.093-1.118-1.983-1.118-.971 0-1.643.535-1.954 1.15v-.962h-1.77v6.367h1.838v-3.277c0-1.177.621-1.742 1.201-1.742.525 0 1.007.337 1.007 1.207v3.812h1.835v-3.277c0-1.19.606-1.742 1.213-1.742.486 0 .998.35.998 1.193v3.826h1.834v-4.401c0-1.431-.971-2.154-2.144-2.154zM16.452 9.317h-1.664v-.648c0-.842.485-1.083.903-1.083.462 0 .822.203.822.203l.566-1.284s-.573-.372-1.617-.372c-1.173 0-2.508.656-2.508 2.716v.468h-2.785v-.648c0-.842.485-1.083.903-1.083.238 0 .557.054.822.203l.566-1.284c-.338-.196-.88-.372-1.617-.372-1.173 0-2.508.656-2.508 2.716v.468H7.269v1.405h1.066v4.963h1.834v-4.963h2.785v4.963h1.834v-4.963h1.664V9.317zM17.547 15.684h1.832V9.317h-1.832v6.367z" />\n    <path fill="#5A31F4"\n      d="M28.24.434c-4.956 0-9.372 3.413-10.625 7.8h1.795C20.457 4.968 24.012 2.1 28.24 2.1c5.14 0 9.582 3.882 9.582 9.925 0 1.356-.177 2.58-.513 3.66h1.743l.017-.059c.286-1.115.431-2.326.431-3.6 0-6.74-4.95-11.59-11.26-11.59z" />\n  </symbol>\n  <symbol id="squiggle" viewBox="0 0 43 10" fill="none">\n    <path\n      d="M9.62095 5.04617C8.94881 5.25492 8.31699 5.39409 7.71878 5.63067C5.84572 6.36986 4.08993 7.39479 2.50965 8.6715C2.22013 8.91561 1.9685 9.20426 1.76356 9.52739C1.64079 9.72655 1.45521 9.87557 1.23834 9.94914C1.02147 10.0227 0.786683 10.0163 0.573866 9.93098C0.150414 9.81964 0.0159848 9.46476 0.0025419 9.03334C-0.0117113 8.78028 0.0341362 8.52746 0.136075 8.29699C0.238015 8.06651 0.392942 7.86541 0.587309 7.71124C1.44731 6.98191 2.34482 6.30131 3.27589 5.67243C4.88859 4.53384 6.69839 3.72817 8.60601 3.2996C9.16432 3.2139 9.72969 3.18825 10.2931 3.22306C10.5766 3.23472 10.8466 3.35146 11.0539 3.552C11.2611 3.75254 11.3919 4.02352 11.4223 4.31553C11.4514 4.96274 11.4401 5.61122 11.3887 6.25693C11.3887 6.47264 11.3416 6.68835 11.2946 7.03628C11.5734 6.98943 11.8463 6.91006 12.1079 6.79969C13.1228 6.23606 14.1243 5.6933 15.1191 5.04617C16.7687 3.80877 18.5394 2.75456 20.4022 1.90096C21.4062 1.47852 22.4848 1.27937 23.568 1.31645C23.7541 1.30668 23.9402 1.33708 24.1144 1.40573C24.2886 1.47438 24.447 1.57978 24.5798 1.71523C24.7125 1.85068 24.8166 2.01322 24.8854 2.19254C24.9542 2.37186 24.9862 2.56402 24.9795 2.75685C24.9795 3.30656 24.9123 3.85628 24.8719 4.46166C24.9997 4.3712 25.1542 4.27378 25.3088 4.17636C26.7002 3.24394 28.0646 2.2628 29.4963 1.393C30.9457 0.454744 32.6266 -0.028641 34.3358 0.00131229C35.3238 0.0361044 35.8078 0.50232 35.8078 1.51129C35.8195 1.97782 35.7835 2.44432 35.7002 2.90297C35.5848 3.41514 35.4389 3.91943 35.2633 4.41295C35.5053 4.26682 35.6666 4.18332 35.8145 4.0859C37.5361 2.791 39.3752 1.67239 41.3059 0.745863C41.5215 0.653045 41.7472 0.587624 41.9781 0.551028C42.1749 0.499154 42.3835 0.528135 42.5601 0.6319C42.7368 0.735666 42.8678 0.906168 42.9258 1.1077C43.0097 1.31745 43.0229 1.55039 42.9631 1.76883C42.9033 1.98728 42.7742 2.17848 42.5964 2.31151C42.5112 2.38001 42.4187 2.43837 42.3209 2.48547C40.393 3.40943 38.5543 4.52081 36.8294 5.80463C36.453 6.05514 36.0766 6.30564 35.6868 6.54223C35.4484 6.71142 35.1882 6.84495 34.9138 6.93886C33.4082 7.32853 32.5882 6.93886 32.8638 5.28971C32.9948 4.73065 33.1702 4.18373 33.388 3.65448C33.5762 3.11868 33.7913 2.5968 34.0602 1.93575C33.5628 2.02621 33.1864 2.07492 32.8302 2.17234C31.1747 2.70218 29.6179 3.5186 28.226 4.58691C27.1035 5.37321 26.0146 6.20126 24.8652 6.9319C24.4142 7.18452 23.9125 7.32507 23.3999 7.34244C23.2503 7.3709 23.0962 7.3608 22.9512 7.31303C22.8062 7.26527 22.6747 7.18131 22.5685 7.06855C22.4622 6.9558 22.3844 6.81771 22.3418 6.66646C22.2993 6.51521 22.2933 6.35545 22.3245 6.20126C22.4231 5.49335 22.5782 4.79511 22.7883 4.11374C22.8992 3.78799 23.0294 3.46962 23.1781 3.16044C22.6262 3.27341 22.0843 3.43401 21.5583 3.64057C20.2543 4.33641 18.9571 5.03225 17.7001 5.72809C16.3559 6.54223 15.0116 7.44682 13.6673 8.28183C12.8993 8.75227 12.0091 8.96383 11.1198 8.88721C10.8941 8.89799 10.6688 8.85872 10.459 8.77204C10.2491 8.68537 10.0595 8.55327 9.903 8.38461C9.74644 8.21596 9.6265 8.01462 9.5512 7.79409C9.4759 7.57355 9.44697 7.3389 9.46636 7.10586C9.48652 6.50048 9.54702 5.83943 9.62095 5.04617Z"\n      fill="#BDADFB" />\n  </symbol>\n  <symbol id="close" viewBox="0 0 14 14" fill="none">\n    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.547 6.77l5.322-5.086A.468.468 0 0014 1.347a.662.662 0 00-.131-.379l-.875-.842A.725.725 0 0012.6 0c-.175 0-.262.042-.35.126L7 5.136 1.75.127A.508.508 0 001.4 0c-.175 0-.306.042-.394.126L.131.968a.662.662 0 00-.131.38c0 .126.044.252.175.336L5.453 6.73.13 11.816a.468.468 0 00-.131.337c0 .126.044.252.131.379l.875.842a.724.724 0 00.394.126c.175 0 .263-.042.35-.126L7 8.364l5.25 5.01a.508.508 0 00.35.126c.175 0 .306-.042.394-.126l.875-.842a.662.662 0 00.131-.38.378.378 0 00-.175-.336L8.547 6.77z" fill="#000000"/>\n  </symbol>\n</svg>'}function _d(e){if(!e||""===e.trim())return[];const t=e=>"CSSFontFaceRule"===e.constructor.name;try{const n=[...document.styleSheets].filter((e=>{try{return Boolean(e.cssRules)}catch(e){return!1}})).flatMap((e=>[...e.cssRules].filter(t))).filter((t=>e.includes(t.style.getPropertyValue("font-family")))).map((e=>{const t={};for(let n=e.style.length;n--;){const i=e.style[n];t[i]=e.style.getPropertyValue(i)}const n=e.style.getPropertyValue("src");return n&&(t.src=n.replace(/url\((["']?)([^"')]+)\1\)/gm,((t,n,i)=>{var a,o;if(i.match(/^(https?:)?\/\//))return t;{const t=null!==(o=null===(a=e.parentStyleSheet)||void 0===a?void 0:a.href)&&void 0!==o?o:location.href;return`
        url("${new URL(i,t).toString()}")
        `}}))),t})),i=e=>{if(!e)return{};const t=new Map([["font-weight","weight"],["font-display","display"],["font-style","style"],["font-stretch","stretch"],["ascent-override","ascentOverride"],["descent-override","descentOverride"],["font-feature-settings","featureSettings"],["line-gap-override","lineGapOverride"],["unicode-range","unicodeRange"]]),n={};return t.forEach(((t,i)=>{e[i]&&(n[t]=e[i])})),n};return(null!=n?n:[]).map((e=>({src:e.src,fontFamily:e["font-family"].replace(/["']/g,""),fontFaceDescriptors:i(e)})))}catch(e){return[]}}class gd extends HTMLElement{constructor(e,t,n,i,a,o,s,r,l){super(),this._i18n=null,this._trackContinueToCheckout=!0,this._initialized=!1,this.handleClose=()=>{this._monorailTracker.trackModalAction(this._modalToken,si.Close);const e=new Event("shopify_modal_close");this.dispatchEvent(e)},this.handleEscKey=e=>{"Escape"!==e.key&&"Esc"!==e.key||this.handleClose()},this.handleContinueToCheckout=()=>{this._trackContinueToCheckout&&this._monorailTracker.trackModalAction(this._modalToken,si.ContinueToCheckout)},this._loanTypes=i,this._eligible=t,this._modalToken=a,this._monorailTracker=o,this._pricePerTerm=e,this._priceRange=n,this._priceWithoutInterest=s,this._minIneligibleMessageType=r,this._numberOfPaymentTerms=l,this.attachShadow({mode:"open",delegatesFocus:!0})}get focusLockTarget(){return this.rootContainer.querySelector("#shopify-payment-terms-modal")}get rootContainer(){return this.shadowRoot}connectedCallback(){return a(this,void 0,void 0,(function*(){this._initialized||(yield this._initTranslations(),yield this._initContent(),this._closeButtons=this.rootContainer.querySelectorAll(".btn__close"),this._closeButtons&&0!==this._closeButtons.length&&(this._closeButtons.forEach((e=>e.addEventListener("click",this.handleClose))),this._closeButtons[0].focus(),window.addEventListener("keydown",this.handleEscKey),this._initialized=!0))}))}disconnectedCallback(){this._closeButtons&&(this._closeButtons.forEach((e=>e.removeEventListener("click",this.handleClose))),window.removeEventListener("keydown",this.handleEscKey))}get price(){return this.getAttribute("price")||""}set price(e){this.setAttribute("price",e)}getModalToken(){return this._modalToken}getModalType(){var e;return(null===(e=this._loanTypes)||void 0===e?void 0:e.length)&&this._eligible?this._loanTypes.includes(ei.Interest)&&this._loanTypes.includes(ei.SplitPay)?oi.Adaptive:this._loanTypes.includes(ei.SplitPay)?oi.SplitPay:oi.InterestOnly:oi.Ineligible}determineListItemsByLoanTypes(e){return this._i18n?e&&e.includes(ei.Interest)?[this._i18n.translate("modal.split_pay_contents.interest_fees"),this._i18n.translate("modal.split_pay_contents.interest_credit")]:[this._i18n.translate("modal.split_pay_contents.no_interest_fees"),this._i18n.translate("modal.split_pay_contents.no_interest_credit")]:["",""]}determineTextByLoanTypes(e,t,n,i,a,o){if(!this._i18n)return{subTitle:"",legalCopy:""};if(!e||!i)return this.getIneligibleMessage(n,o,a);if(e.includes(ei.Interest)&&e.includes(ei.SplitPay)){const e=[this._i18n.translate("modal.legal.interest_and_split_pay"),this._i18n.translate("modal.legal.rates_from_apr"),this._i18n.translate("modal.legal.ca_residents_notice")].filter(Boolean).join(" ");return{subTitle:this._i18n.translate("modal.subtitle.interest_and_split_pay",{splitPayLoanRepayment:t}),legalCopy:e}}if(e.includes(ei.SplitPay)){const e=[this._i18n.translate("modal.legal.split_pay_only"),this._i18n.translate("modal.legal.ca_residents_notice")].filter(Boolean).join(" ");let n="modal.subtitle.split_pay_only";2===this._numberOfPaymentTerms?n="modal.subtitle.split_pay_only_2":1===this._numberOfPaymentTerms&&(n="modal.subtitle.split_pay_only_30");return{subTitle:this._i18n.translate(n,{price:o,splitPayLoanRepayment:t}),legalCopy:e}}if(e.includes(ei.Interest)){const e=[this._i18n.translate("modal.legal.rates_from_apr"),this._i18n.translate("modal.legal.ca_residents_notice")].filter(Boolean).join(" ");return{subTitle:this._i18n.translate("modal.subtitle.interest_only"),legalCopy:e}}return this.getIneligibleMessage(n,o,a)}getIneligibleMessage(e,t,n){if(!this._i18n)return{subTitle:"",legalCopy:""};const i=null==e?void 0:e.minPrice,a=null==e?void 0:e.maxPrice,o=i?sd(i):null,s=t?sd(t):null,r=[this._i18n.translate("modal.legal.ineligible"),this._i18n.translate("modal.legal.ca_residents_notice")].filter(Boolean).join(" ");if(!o||!a)return{subTitle:"",legalCopy:r};if(!s||s<o){let e="modal.subtitle.ineligible_min";2!==this._numberOfPaymentTerms&&1!==this._numberOfPaymentTerms||(e="modal.subtitle.ineligible_min_over_time");const t=this._i18n.translate(e,{minPrice:i}),a=this._i18n.translate("modal.subtitle.ineligible_monthly_payments_min",{minPrice:i});return{subTitle:n===ri.Monthly?a:t,legalCopy:r}}return{subTitle:this._i18n.translate("modal.subtitle.ineligible_max",{maxPrice:a}),legalCopy:r}}_initTranslations(){return a(this,void 0,void 0,(function*(){if(!this._i18n)try{const e=ko.getDefaultLanguage(),t=yield function(e){switch(e){case"./translations/bg-BG.json":return Promise.resolve().then((function(){return $v}));case"./translations/cs.json":return Promise.resolve().then((function(){return Gv}));case"./translations/da.json":return Promise.resolve().then((function(){return tk}));case"./translations/de.json":return Promise.resolve().then((function(){return rk}));case"./translations/el.json":return Promise.resolve().then((function(){return mk}));case"./translations/en.json":return Promise.resolve().then((function(){return yk}));case"./translations/es.json":return Promise.resolve().then((function(){return zk}));case"./translations/fi.json":return Promise.resolve().then((function(){return Tk}));case"./translations/fr.json":return Promise.resolve().then((function(){return qk}));case"./translations/hi.json":return Promise.resolve().then((function(){return $k}));case"./translations/hr-HR.json":return Promise.resolve().then((function(){return Gk}));case"./translations/hu.json":return Promise.resolve().then((function(){return tw}));case"./translations/id.json":return Promise.resolve().then((function(){return rw}));case"./translations/it.json":return Promise.resolve().then((function(){return mw}));case"./translations/ja.json":return Promise.resolve().then((function(){return yw}));case"./translations/ko.json":return Promise.resolve().then((function(){return zw}));case"./translations/lt-LT.json":return Promise.resolve().then((function(){return Tw}));case"./translations/ms.json":return Promise.resolve().then((function(){return qw}));case"./translations/nb.json":return Promise.resolve().then((function(){return $w}));case"./translations/nl.json":return Promise.resolve().then((function(){return Gw}));case"./translations/pl.json":return Promise.resolve().then((function(){return tP}));case"./translations/pt-BR.json":return Promise.resolve().then((function(){return rP}));case"./translations/pt-PT.json":return Promise.resolve().then((function(){return mP}));case"./translations/ro-RO.json":return Promise.resolve().then((function(){return yP}));case"./translations/ru.json":return Promise.resolve().then((function(){return zP}));case"./translations/sk-SK.json":return Promise.resolve().then((function(){return TP}));case"./translations/sl-SI.json":return Promise.resolve().then((function(){return qP}));case"./translations/sv.json":return Promise.resolve().then((function(){return $P}));case"./translations/th.json":return Promise.resolve().then((function(){return GP}));case"./translations/tr.json":return Promise.resolve().then((function(){return tS}));case"./translations/vi.json":return Promise.resolve().then((function(){return rS}));case"./translations/zh-CN.json":return Promise.resolve().then((function(){return mS}));case"./translations/zh-TW.json":return Promise.resolve().then((function(){return yS}));default:return new Promise((function(t,n){("function"==typeof queueMicrotask?queueMicrotask:setTimeout)(n.bind(null,new Error("Unknown variable dynamic import: "+e)))}))}}(`. / translations / $ {
            e
        }.json `);this._i18n=new ko({[e]:t})}catch(e){}}))}_initContent(){return a(this,void 0,void 0,(function*(){if(!this._i18n)return;const e=document.createElement("template"),t=this.determineListItemsByLoanTypes(this._loanTypes),{subTitle:n,legalCopy:i}=this.determineTextByLoanTypes(this._loanTypes,this._pricePerTerm,this._priceRange,this._eligible,this._minIneligibleMessageType,this._priceWithoutInterest);e.innerHTML=function(e,t,n,i){const a=e.translate("modal.title"),o=e.translate("modal.close"),s=e.translate("modal.new_window"),r=ld(e);return`\
        n < style > \n $ {
            Xp
        }\
        n\ n# shopify - payment - terms - modal {\
            n color: rgba(18, 18, 18, 0.7);\
            n
        }\
        n\ n# shopify - payment - terms - modal header {\
            n display: flex;\
            n justify - content: space - between;\
            n align - items: baseline;\
            n background: inherit;\
            n position: inherit;\
            n color: black;\
            n
        }\
        n\ n# shopify - payment - terms - modal.btn__close {\
            n position: absolute;\
            n right: 22 px;\
            n top: 22 px;\
            n overflow: visible;\
            n margin: 0;\
            n background: transparent;\
            n border: none;\
            n - webkit - font - smoothing: inherit;\
            n appearance: button;\
            n cursor: pointer;\
            n width: fit - content;\
            n
        }\
        n\ n# shopify - payment - terms - modal h1 {\
            n font - size: 32 px;\
            n font - weight: 600;\
            n line - height: 120 % ;\
            n margin: 0 0 20 px;\
            n max - width: 295 px;\
            n font - family: inherit;\
            n letter - spacing: 0.02e m;\
            n
        }\
        n\ n# shopify - payment - terms - modal.tagline {\
            n margin: 0 0 28 px 0;\
            n line - height: 24 px;\
            n
        }\
        n\ n# shopify - payment - terms - modal.list - item {\
            n display: flex;\
            n align - items: center;\
            n padding - bottom: 8 px;\
            n
        }\
        n\ n# shopify - payment - terms - modal.list - item__heading {\
            n font - size: 16 px;\
            n line - height: 125 % ;\
            n margin: 0;\
            n
        }\
        n\ n# shopify - payment - terms - modal.list - item__icon {\
            n width: 24 px;\
            n height: 24 px;\
            n flex: 0 0 21 px;\
            n padding - right: 12 px;\
            n box - sizing: content - box;\
            n
        }\
        n < /style>\n  <div\n    id="shopify-payment-terms-modal"\n    role="dialog"\n    aria-modal="true"\n    aria-labelledby="shopify-payment-terms-modal-heading"\n    tabindex="-1">\n    <section class="modal-wrapper">\n        <header>\n        <button type="button" class="btn__close btn__close--icon" aria-label="${o}">\n          <svg class="close__icon" aria-hidden="true"><use xlink:href="#close" / > < /svg>\n        </button > \n < h1 id = "shopify-payment-terms-modal-heading" > $ {
            a
        } < /h1>\n      </header > \n < div hidden id = "shopify-payment-terms-modal-warning-text" > $ {
            s
        } < /div>\n      <p class="tagline">${t}</p > \n < ul class = "list" > \n < li class = "list-item" > \n < svg role = "img"
        aria - hidden = "true"
        class = "list-item__icon" > < use xlink: href = "#fees-icon" / > < /svg>\n          <span class="list-item__heading">${i[0]}</span > \n < /li>\n        <li class="list-item">\n          <svg role="img" aria-hidden="true" class="list-item__icon"><use xlink:href="#cc-icon" / > < /svg>\n          <span class="list-item__heading">${i[1]}</span > \n < /li>\n      </ul > \n < p id = "eligibility-approval"
        class = "help_text" > \n < small > \n $ {
            n
        }\
        n < /small>\n      </p > \n < footer > \n < div class = "shop-pay-logo-wrapper" > \n < shop - pay - logo role = "img"
        aria - label = "Shop Pay"
        size = "large" > < /shop-pay-logo>\n        </div > \n < div class = "affirm-text" > \n < small > $ {
            r
        } < /small>\n        </div > \n < /footer>\n      <svg aria-hidden="true" xmlns="http:/ / www.w3.org / 2000 / svg " style="
        display: none;
        ">\n        <symbol id="
        fees - icon " viewBox="
        0 0 21 18 " fill="
        none ">\n          <path d="
        M18 .5 10.5474 C18 .5 15.267 14.5995 19.1236 9.75 19.1236 C4 .90048 19.1236 1 15.267 1 10.5474 C1 5.82767 4.90048 1.97107 9.75 1.97107 C14 .5995 1.97107 18.5 5.82767 18.5 10.5474 Z " stroke="
        #0B0B0C" stroke-width= "2" / > \n < path d = "M11.4875 8.06938C11.8819 8.456 12.515 8.4497 12.9016 8.05531C13.2882 7.66092 13.2819 7.02778 12.8875 6.64117L11.4875 8.06938ZM10.0408 6.55725V7.55725V6.55725ZM7.1335 12.4337C6.70617 12.0838 6.07613 12.1466 5.72626 12.5739C5.37639 13.0013 5.43917 13.6313 5.8665 13.9812L7.1335 12.4337ZM12.1875 7.35527C12.8875 6.64117 12.8872 6.64088 12.887 6.6406C12.8869 6.6405 12.8866 6.64021 12.8864 6.64001C12.8859 6.63961 12.8855 6.6392 12.8851 6.63878C12.8842 6.63793 12.8833 6.63703 12.8823 6.63609C12.8804 6.63419 12.8782 6.6321 12.8758 6.62982C12.871 6.62526 12.8654 6.61993 12.8589 6.61388C12.8459 6.6018 12.8294 6.58683 12.8096 6.5694C12.7699 6.53459 12.7164 6.48973 12.6497 6.43832C12.5166 6.33585 12.328 6.20519 12.0884 6.07602C11.6099 5.81808 10.9106 5.55725 10.0408 5.55725V7.55725C10.5036 7.55725 10.8777 7.69544 11.1394 7.83651C11.2698 7.90684 11.3681 7.97569 11.4293 8.02285C11.4597 8.04625 11.4802 8.06374 11.4903 8.07257C11.4953 8.07696 11.4976 8.07914 11.4972 8.07874C11.497 8.07854 11.4961 8.07769 11.4944 8.07615C11.4936 8.07538 11.4927 8.07443 11.4915 8.07331C11.4909 8.07274 11.4903 8.07214 11.4896 8.07148C11.4893 8.07116 11.4889 8.07082 11.4886 8.07047C11.4884 8.07029 11.4881 8.07002 11.488 8.06993C11.4877 8.06966 11.4875 8.06938 12.1875 7.35527ZM10.0408 5.55725C8.12515 5.55725 6.90378 6.0365 6.19464 6.83562C5.49081 7.62876 5.5 8.51566 5.5 8.77398L7.5 8.77398C7.5 8.58897 7.50919 8.3675 7.69057 8.1631C7.86664 7.96469 8.41567 7.55725 10.0408 7.55725V5.55725ZM5.5 8.77398C5.5 10.0149 6.8138 11.5474 10.0408 11.5474V9.54737C7.35373 9.54737 7.5 8.41981 7.5 8.77398L5.5 8.77398ZM10.0408 11.5474C11.3127 11.5474 11.7267 11.9199 11.8526 12.072C11.9294 12.1647 11.9638 12.2521 11.9797 12.3098C11.9877 12.3388 11.9908 12.3595 11.9919 12.3681C11.9924 12.3721 11.9925 12.3743 11.9927 12.376C11.9927 12.3767 11.9928 12.3777 11.9929 12.3796C11.993 12.3801 11.9934 12.3859 11.9937 12.3909C11.9938 12.3916 11.9953 12.4128 11.9983 12.4379C11.9991 12.4448 12.004 12.4884 12.0163 12.5424C12.0206 12.5613 12.0384 12.6404 12.081 12.7343C12.1072 12.7876 12.1909 12.9199 12.2529 12.9949C12.374 13.1073 12.744 13.2896 12.9915 13.3208V11.3208C13.239 11.3519 13.609 11.5342 13.7301 11.6466C13.7921 11.7215 13.8758 11.8538 13.9019 11.907C13.9445 12.0008 13.9622 12.0798 13.9664 12.0985C13.9786 12.152 13.9835 12.195 13.9842 12.201C13.9859 12.2154 13.9869 12.2264 13.9873 12.2305C13.9877 12.2355 13.988 12.2393 13.9881 12.2405C13.9882 12.2421 13.9883 12.2437 13.988 12.2392C13.9878 12.2363 13.9874 12.2314 13.987 12.2257C13.9852 12.2014 13.9821 12.1655 13.9765 12.121C13.9655 12.0326 13.9455 11.9148 13.9076 11.7775C13.8317 11.5027 13.6833 11.1468 13.3928 10.7961C12.7843 10.0615 11.7261 9.54737 10.0408 9.54737V11.5474ZM12.9915 13.3208C12.7152 13.2818 12.3392 13.0787 12.2329 12.9723C12.1834 12.9097 12.1152 12.8024 12.0934 12.7604C12.0576 12.6873 12.0393 12.6263 12.0345 12.6106C12.0212 12.5665 12.014 12.5313 12.0123 12.5227C12.0071 12.4972 12.0042 12.4778 12.0034 12.4721C12.0011 12.4564 12.0001 12.4462 11.9998 12.4436C11.9991 12.4365 11.9995 12.4381 11.9998 12.4473C12.0003 12.4656 12.0003 12.5037 11.9945 12.5544C11.9827 12.6586 11.9503 12.7886 11.8754 12.9129C11.7692 13.089 11.4095 13.5375 10.0408 13.5375V15.5375C11.9075 15.5375 13.0264 14.8776 13.5883 13.9454C13.8474 13.5154 13.9465 13.0913 13.9818 12.7798C13.9996 12.6227 14.002 12.4876 13.9988 12.3847C13.9972 12.3333 13.9941 12.2872 13.9902 12.2477C13.9883 12.2288 13.9858 12.2062 13.9822 12.1821C13.9808 12.1723 13.9774 12.1497 13.9717 12.122C13.9698 12.1124 13.9624 12.0764 13.9489 12.0317C13.9441 12.0157 13.9257 11.9545 13.8899 11.8814C13.868 11.8393 13.7998 11.7319 13.7502 11.6693C13.6439 11.5628 13.2679 11.3597 12.9915 11.3208V13.3208ZM10.0408 13.5375C9.30305 13.5375 8.58044 13.2774 8.00962 12.9834C7.73057 12.8397 7.50347 12.696 7.34846 12.59C7.27131 12.5372 7.21302 12.4944 7.17616 12.4666C7.15775 12.4527 7.14477 12.4426 7.13753 12.4369C7.13392 12.434 7.13175 12.4323 7.13106 12.4317C7.13071 12.4314 7.13074 12.4315 7.13115 12.4318C7.13135 12.432 7.13165 12.4322 7.13204 12.4325C7.13224 12.4327 7.13245 12.4329 7.1327 12.4331C7.13282 12.4331 7.13302 12.4333 7.13308 12.4334C7.13329 12.4335 7.1335 12.4337 6.5 13.2074C5.8665 13.9812 5.86672 13.9814 5.86696 13.9816C5.86704 13.9816 5.86728 13.9818 5.86745 13.982C5.86779 13.9822 5.86816 13.9825 5.86855 13.9829C5.86934 13.9835 5.87023 13.9842 5.87122 13.985C5.8732 13.9866 5.87559 13.9886 5.87838 13.9908C5.88396 13.9953 5.89114 14.001 5.89989 14.0079C5.91739 14.0217 5.94118 14.0402 5.97093 14.0626C6.03039 14.1075 6.11399 14.1687 6.21908 14.2406C6.42854 14.3839 6.72734 14.5727 7.09394 14.7615C7.81445 15.1326 8.86225 15.5375 10.0408 15.5375V13.5375Z"
        fill = "#0B0B0C" / > \n < path d = "M9.75 4.96118L9.75 16.1335"
        stroke = "#0B0B0C"
        stroke - width = "2"
        stroke - linecap = "round" / > \n < /symbol>\n        <symbol id="cc-icon" viewBox="0 0 21 16" fill="none">\n          <path\n          d="M17.3636 1H2.63636C1.73262 1 1 1.7835 1 2.75V13.25C1 14.2165 1.73262 15 2.63636 15H17.3636C18.2674 15 19 14.2165 19 13.25V2.75C19 1.7835 18.2674 1 17.3636 1Z"\n          stroke="#0B0B0C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" / > \n < path d = "M1 6L19 6"
        stroke = "#0B0B0C"
        stroke - width = "2"
        stroke - linecap = "round"
        stroke - linejoin = "round" / > \n < path d = "M13 11H15"
        stroke = "#0B0B0C"
        stroke - width = "2"
        stroke - linecap = "round"
        stroke - linejoin = "round" / > \n < /symbol>\n        <symbol id="affirm" viewBox="0 0 40 22" fill="none">\n          <title id="shopify-payment-terms-modal-affirm">${Qp}</title > \n < path fill = "#000000"\
        n d = "M3.058 14.543c-.482 0-.724-.236-.724-.623 0-.72.812-.965 2.292-1.121 0 .962-.656 1.744-1.569 1.744zm.638-5.413c-1.058 0-2.275.495-2.936 1.017l.604 1.26c.53-.48 1.386-.892 2.159-.892.734 0 1.14.243 1.14.734 0 .33-.269.497-.777.563C1.99 12.056.5 12.575.5 14.026c0 1.15.826 1.846 2.116 1.846.92 0 1.74-.507 2.129-1.176v.99H6.46v-4.148c0-1.712-1.2-2.408-2.764-2.408zM20.92 9.318v6.367h1.837v-3.068c0-1.458.89-1.886 1.51-1.886.243 0 .57.07.785.23l.334-1.684a2.104 2.104 0 00-.822-.147c-.944 0-1.538.415-1.929 1.258v-1.07h-1.714zM33.899 9.13c-.971 0-1.697.57-2.075 1.118-.35-.709-1.093-1.118-1.983-1.118-.971 0-1.643.535-1.954 1.15v-.962h-1.77v6.367h1.838v-3.277c0-1.177.621-1.742 1.201-1.742.525 0 1.007.337 1.007 1.207v3.812h1.835v-3.277c0-1.19.606-1.742 1.213-1.742.486 0 .998.35.998 1.193v3.826h1.834v-4.401c0-1.431-.971-2.154-2.144-2.154zM16.452 9.317h-1.664v-.648c0-.842.485-1.083.903-1.083.462 0 .822.203.822.203l.566-1.284s-.573-.372-1.617-.372c-1.173 0-2.508.656-2.508 2.716v.468h-2.785v-.648c0-.842.485-1.083.903-1.083.238 0 .557.054.822.203l.566-1.284c-.338-.196-.88-.372-1.617-.372-1.173 0-2.508.656-2.508 2.716v.468H7.269v1.405h1.066v4.963h1.834v-4.963h2.785v4.963h1.834v-4.963h1.664V9.317zM17.547 15.684h1.832V9.317h-1.832v6.367z" / > \n < path fill = "#5A31F4"\
        n d = "M28.24.434c-4.956 0-9.372 3.413-10.625 7.8h1.795C20.457 4.968 24.012 2.1 28.24 2.1c5.14 0 9.582 3.882 9.582 9.925 0 1.356-.177 2.58-.513 3.66h1.743l.017-.059c.286-1.115.431-2.326.431-3.6 0-6.74-4.95-11.59-11.26-11.59z" / > \n < /symbol>\n        <symbol id="squiggle" viewBox="0 0 43 10" fill="none">\n          <path\n            d="M9.62095 5.04617C8.94881 5.25492 8.31699 5.39409 7.71878 5.63067C5.84572 6.36986 4.08993 7.39479 2.50965 8.6715C2.22013 8.91561 1.9685 9.20426 1.76356 9.52739C1.64079 9.72655 1.45521 9.87557 1.23834 9.94914C1.02147 10.0227 0.786683 10.0163 0.573866 9.93098C0.150414 9.81964 0.0159848 9.46476 0.0025419 9.03334C-0.0117113 8.78028 0.0341362 8.52746 0.136075 8.29699C0.238015 8.06651 0.392942 7.86541 0.587309 7.71124C1.44731 6.98191 2.34482 6.30131 3.27589 5.67243C4.88859 4.53384 6.69839 3.72817 8.60601 3.2996C9.16432 3.2139 9.72969 3.18825 10.2931 3.22306C10.5766 3.23472 10.8466 3.35146 11.0539 3.552C11.2611 3.75254 11.3919 4.02352 11.4223 4.31553C11.4514 4.96274 11.4401 5.61122 11.3887 6.25693C11.3887 6.47264 11.3416 6.68835 11.2946 7.03628C11.5734 6.98943 11.8463 6.91006 12.1079 6.79969C13.1228 6.23606 14.1243 5.6933 15.1191 5.04617C16.7687 3.80877 18.5394 2.75456 20.4022 1.90096C21.4062 1.47852 22.4848 1.27937 23.568 1.31645C23.7541 1.30668 23.9402 1.33708 24.1144 1.40573C24.2886 1.47438 24.447 1.57978 24.5798 1.71523C24.7125 1.85068 24.8166 2.01322 24.8854 2.19254C24.9542 2.37186 24.9862 2.56402 24.9795 2.75685C24.9795 3.30656 24.9123 3.85628 24.8719 4.46166C24.9997 4.3712 25.1542 4.27378 25.3088 4.17636C26.7002 3.24394 28.0646 2.2628 29.4963 1.393C30.9457 0.454744 32.6266 -0.028641 34.3358 0.00131229C35.3238 0.0361044 35.8078 0.50232 35.8078 1.51129C35.8195 1.97782 35.7835 2.44432 35.7002 2.90297C35.5848 3.41514 35.4389 3.91943 35.2633 4.41295C35.5053 4.26682 35.6666 4.18332 35.8145 4.0859C37.5361 2.791 39.3752 1.67239 41.3059 0.745863C41.5215 0.653045 41.7472 0.587624 41.9781 0.551028C42.1749 0.499154 42.3835 0.528135 42.5601 0.6319C42.7368 0.735666 42.8678 0.906168 42.9258 1.1077C43.0097 1.31745 43.0229 1.55039 42.9631 1.76883C42.9033 1.98728 42.7742 2.17848 42.5964 2.31151C42.5112 2.38001 42.4187 2.43837 42.3209 2.48547C40.393 3.40943 38.5543 4.52081 36.8294 5.80463C36.453 6.05514 36.0766 6.30564 35.6868 6.54223C35.4484 6.71142 35.1882 6.84495 34.9138 6.93886C33.4082 7.32853 32.5882 6.93886 32.8638 5.28971C32.9948 4.73065 33.1702 4.18373 33.388 3.65448C33.5762 3.11868 33.7913 2.5968 34.0602 1.93575C33.5628 2.02621 33.1864 2.07492 32.8302 2.17234C31.1747 2.70218 29.6179 3.5186 28.226 4.58691C27.1035 5.37321 26.0146 6.20126 24.8652 6.9319C24.4142 7.18452 23.9125 7.32507 23.3999 7.34244C23.2503 7.3709 23.0962 7.3608 22.9512 7.31303C22.8062 7.26527 22.6747 7.18131 22.5685 7.06855C22.4622 6.9558 22.3844 6.81771 22.3418 6.66646C22.2993 6.51521 22.2933 6.35545 22.3245 6.20126C22.4231 5.49335 22.5782 4.79511 22.7883 4.11374C22.8992 3.78799 23.0294 3.46962 23.1781 3.16044C22.6262 3.27341 22.0843 3.43401 21.5583 3.64057C20.2543 4.33641 18.9571 5.03225 17.7001 5.72809C16.3559 6.54223 15.0116 7.44682 13.6673 8.28183C12.8993 8.75227 12.0091 8.96383 11.1198 8.88721C10.8941 8.89799 10.6688 8.85872 10.459 8.77204C10.2491 8.68537 10.0595 8.55327 9.903 8.38461C9.74644 8.21596 9.6265 8.01462 9.5512 7.79409C9.4759 7.57355 9.44697 7.3389 9.46636 7.10586C9.48652 6.50048 9.54702 5.83943 9.62095 5.04617Z"\n            fill="#BDADFB" / > \n < /symbol>\n        <symbol id="close" viewBox="0 0 14 14" fill="none">\n          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.547 6.77l5.322-5.086A.468.468 0 0014 1.347a.662.662 0 00-.131-.379l-.875-.842A.725.725 0 0012.6 0c-.175 0-.262.042-.35.126L7 5.136 1.75.127A.508.508 0 001.4 0c-.175 0-.306.042-.394.126L.131.968a.662.662 0 00-.131.38c0 .126.044.252.175.336L5.453 6.73.13 11.816a.468.468 0 00-.131.337c0 .126.044.252.131.379l.875.842a.724.724 0 00.394.126c.175 0 .263-.042.35-.126L7 8.364l5.25 5.01a.508.508 0 00.35.126c.175 0 .306-.042.394-.126l.875-.842a.662.662 0 00.131-.38.378.378 0 00-.175-.336L8.547 6.77z" fill="#000000"/ > \n < /symbol>\n      </svg > \n < /section>\n  </div > `}(this._i18n,n,i,t),this.rootContainer.appendChild(e.content.cloneNode(!0))}))}}const fd=e=>{const t=999999,n=document.createElement("div"),i=document.createElement("div");if(n.setAttribute("id","shopify-payment-terms-cover"),Object.assign(n.style,{position:"fixed",left:0,right:0,top:0,bottom:0,zIndex:t,background:"rgba(0,0,0,.3)"}),Object.assign(i.style,{position:"fixed",left:0,right:0,top:0,bottom:0,zIndex:t,background:"white",height:"max-content",width:"432px",maxWidth:"95%",maxHeight:"95%",margin:"auto",borderRadius:"7px",padding:"32px",boxSizing:"border-box",overflow:"auto",transition:"max-height ease-in 300ms"}),window.innerWidth<448&&Object.assign(i.style,{borderRadius:"0px",height:"auto",width:"auto",maxHeight:"100%",maxWidth:"100%"}),i.appendChild(e),i.addEventListener(Xn,(e=>{if(""===e.detail.height)return i.style.maxHeight="95%",void(i.style.overflow="auto");i.style.maxHeight=e.detail.height,i.style.overflow=e.detail.lockScroll?"hidden":"auto"})),"animate"in i){const e=[{opacity:0},{opacity:1}],t=[{transform:"translateY(-15%)",opacity:0},{transform:"translateY(0)",opacity:1}];i.animate(t,{fill:"forwards",duration:150}),n.animate(e,{fill:"forwards",duration:150})}n.appendChild(i),document.body.appendChild(n),document.body.dataset.paymentTermsInitialStyles=JSON.stringify({overflow:document.body.style.overflow}),document.body.style.overflow="hidden",n.addEventListener("click",(t=>{t.target===n&&e.handleClose()}))},bd=()=>{const e=document.querySelector("#shopify-payment-terms-cover");if(e&&(document.body.removeChild(e),document.body.dataset.paymentTermsInitialStyles)){const e=JSON.parse(document.body.dataset.paymentTermsInitialStyles);document.body.style.overflow=e.overflow,document.body.style.position=e.position,delete document.body.dataset.initialStyles}};class yd extends wn{constructor({elementName:e,analyticsTraceId:t,flow:n="",flowVersion:i="unspecified",shopId:a,checkoutVersion:o}){super({elementName:e,analyticsTraceId:t,flow:n,flowVersion:i,shopId:a,checkoutVersion:o}),this._modalActionTracker={},this._bannerImpressionTracked={},this._prequalPopupPageImpressionTracked={},this._bannerPrequalInteractionTracked=!1,this._invalidBannerMetadataTracked=!1}trackModalOpened(e,t,n,i,o,s,r){return a(this,void 0,void 0,(function*(){let a;if(a=e===ti.Cart?`
        $ {
            e
        } - open `:`
        $ {
            t
        } - open `,this._modalActionTracker[a])return;this._modalActionTracker[a]=!0;const l=yield $t("uniqToken","visitToken","microSessionId","microSessionCount","shopId","currency"),c=Object.assign(Object.assign({},l),{origin:e,modalToken:t,eligibleSpiPlanType:n,price:s,cartPermalink:r,spiPlanDetails:i,variantId:o,shopJsVersion:h});Pn({schemaId:Ut.InstallmentsModalOpened,payload:c},l,(()=>{this._modalActionTracker[a]=!1}))}))}trackModalAction(e,t,n){return a(this,void 0,void 0,(function*(){const i=`
        $ {
            e
        } - $ {
            t
        }
        `;if(this._modalActionTracker[i])return;this._modalActionTracker[i]=!0;const a=yield $t("uniqToken","visitToken","microSessionId","microSessionCount","shopId"),o=Object.assign(Object.assign({},a),{modalToken:e,action:t,cartPermalink:n,shopJsVersion:h});Pn({schemaId:Ut.InstallmentsModalUserAction,payload:o},a,(()=>{this._modalActionTracker[i]=!1}))}))}trackInstallmentsBannerImpression(e,t,n,i,o,s,r){return a(this,void 0,void 0,(function*(){const a=r?String(r):"cart";if(this._bannerImpressionTracked[a])return;this._bannerImpressionTracked[a]=!0;const l=yield $t("uniqToken","visitToken","shopId","microSessionId","contentLanguage","currency"),c=Object.assign(Object.assign({},l),{origin:e,bannerContent:t,eligible:n,bannerTemplateCodeSignature:i,price:s,shopJsVersion:h,hasPrequalLink:o,analyticsTraceId:this.analyticsTraceId||""});Pn({schemaId:Ut.InstallmentsBannerImpression,payload:c},l,(()=>{this._bannerImpressionTracked[a]=!1}))}))}trackInstallmentsPrequalPopupPageImpression(e,t){return a(this,void 0,void 0,(function*(){if(this._prequalPopupPageImpressionTracked[t])return;this._prequalPopupPageImpressionTracked[t]=!0;const n={analyticsTraceId:this.analyticsTraceId,sellerId:e,pageType:t};Pn({schemaId:Ut.InstallmentsPrequalPopupPageImpression,payload:n},void 0,(()=>{this._prequalPopupPageImpressionTracked[t]=!1}))}))}trackInvalidInstallmentBannerMetadata(e,t){return a(this,void 0,void 0,(function*(){if(this._invalidBannerMetadataTracked)return;this._invalidBannerMetadataTracked=!0;const n=yield $t("uniqToken","visitToken","microSessionId","microSessionCount","shopId"),i=Object.assign(Object.assign({},n),{origin:e,metadata:t,shopJsVersion:h});Pn({schemaId:Ut.InstallmentsInvalidMetadata,payload:i},n,(()=>{this._invalidBannerMetadataTracked=!1}))}))}trackInstallmentsBannerPrequalInteraction(e,t,n,i,o){return a(this,void 0,void 0,(function*(){if(this._bannerPrequalInteractionTracked)return;this._bannerPrequalInteractionTracked=!0;const a=yield $t("uniqToken","visitToken","shopId","microSessionId","contentLanguage","currency"),s=Object.assign(Object.assign({},a),{origin:e,bannerContent:t,eligible:n,price:i,shopJsVersion:h,prequalLinkClicked:o,analyticsTraceId:this.analyticsTraceId});Pn({schemaId:Ut.InstallmentsBannerPrequalInteraction,payload:s},a,(()=>{this._bannerPrequalInteractionTracked=!1}))}))}}class vd extends HTMLElement{static get observedAttributes(){return["variant-id","shopify-meta"]}constructor(){super(),this._minPrice="$50",this._maxPrice="$3000",this._open=!1,this._eligible=!1,this._numberOfPaymentTerms=4,this._hasChangeEventListener=!1,this._loanTypes=[],this._metaType=ti.Product,this._backgroundColor="",this._didMount=!1,this._i18n=null,this.getContent=e=>{if(!this._i18n)return"";const t=Yp(this._backgroundColor);if(!this._loanTypes.length)return this.getIneligibleContent();if(this._loanTypes.includes(ei.SplitPay))return this._i18n.translate("banner.split_pay_eligible",{price:e||"",shopPayLogo:t});return this._loanTypes.includes(ei.Interest)?this._i18n.translate("banner.interest_only_eligible",{shopPayLogo:t}):this.getIneligibleContent()},this.getIneligibleContent=()=>{if(!this._i18n)return"";const e=Yp(this._backgroundColor);return this._i18n.translate("banner.non_eligible_min",{shopPayLogo:e,minPrice:this._minPrice})},this.updateVariant=e=>{var t;const n=null===(t=this._variants)||void 0===t?void 0:t.find((t=>Number(t.id)===e));return this._eligible=Boolean(null==n?void 0:n.eligible),this._loanTypes=(null==n?void 0:n.available_loan_types)||[],this.updateBannerPrice(null==n?void 0:n.price),(null==n?void 0:n.price)||""},this.calculatePricePerTerm=(e,t)=>{const n=t.apr/1200,i=t.installments_count;if(0===n)return nd(e/i);return nd(e*n*Math.pow(1+n,i)/(Math.pow(1+n,i)-1))},this.updateBannerPrice=e=>{var t;let n;n=this._eligible?this.getContent(e):this.getIneligibleContent();const i=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector("#shopify-installments-content");i&&(i.innerHTML=n)},this._monorailTracker=new yd({elementName:"shop-pay-banner"}),this._modalMonorailTracker=new yd({elementName:"shopify-installments-modal"}),customElements.get("shopify-installments-modal")||customElements.define("shopify-installments-modal",gd),customElements.get("shop-pay-logo")||customElements.define("shop-pay-logo",Ta),this.attachShadow({mode:"open"}).innerHTML=Jp}initTranslations(){return a(this,void 0,void 0,(function*(){if(!this._i18n)try{const e=ko.getDefaultLanguage(),t=yield function(e){switch(e){case"../translations/bg-BG.json":return Promise.resolve().then((function(){return $v}));case"../translations/cs.json":return Promise.resolve().then((function(){return Gv}));case"../translations/da.json":return Promise.resolve().then((function(){return tk}));case"../translations/de.json":return Promise.resolve().then((function(){return rk}));case"../translations/el.json":return Promise.resolve().then((function(){return mk}));case"../translations/en.json":return Promise.resolve().then((function(){return yk}));case"../translations/es.json":return Promise.resolve().then((function(){return zk}));case"../translations/fi.json":return Promise.resolve().then((function(){return Tk}));case"../translations/fr.json":return Promise.resolve().then((function(){return qk}));case"../translations/hi.json":return Promise.resolve().then((function(){return $k}));case"../translations/hr-HR.json":return Promise.resolve().then((function(){return Gk}));case"../translations/hu.json":return Promise.resolve().then((function(){return tw}));case"../translations/id.json":return Promise.resolve().then((function(){return rw}));case"../translations/it.json":return Promise.resolve().then((function(){return mw}));case"../translations/ja.json":return Promise.resolve().then((function(){return yw}));case"../translations/ko.json":return Promise.resolve().then((function(){return zw}));case"../translations/lt-LT.json":return Promise.resolve().then((function(){return Tw}));case"../translations/ms.json":return Promise.resolve().then((function(){return qw}));case"../translations/nb.json":return Promise.resolve().then((function(){return $w}));case"../translations/nl.json":return Promise.resolve().then((function(){return Gw}));case"../translations/pl.json":return Promise.resolve().then((function(){return tP}));case"../translations/pt-BR.json":return Promise.resolve().then((function(){return rP}));case"../translations/pt-PT.json":return Promise.resolve().then((function(){return mP}));case"../translations/ro-RO.json":return Promise.resolve().then((function(){return yP}));case"../translations/ru.json":return Promise.resolve().then((function(){return zP}));case"../translations/sk-SK.json":return Promise.resolve().then((function(){return TP}));case"../translations/sl-SI.json":return Promise.resolve().then((function(){return qP}));case"../translations/sv.json":return Promise.resolve().then((function(){return $P}));case"../translations/th.json":return Promise.resolve().then((function(){return GP}));case"../translations/tr.json":return Promise.resolve().then((function(){return tS}));case"../translations/vi.json":return Promise.resolve().then((function(){return rS}));case"../translations/zh-CN.json":return Promise.resolve().then((function(){return mS}));case"../translations/zh-TW.json":return Promise.resolve().then((function(){return yS}));default:return new Promise((function(t,n){("function"==typeof queueMicrotask?queueMicrotask:setTimeout)(n.bind(null,new Error("Unknown variable dynamic import: "+e)))}))}}(`.. / translations / $ {
            e
        }.json `);this._i18n=new ko({[e]:t})}catch(e){}}))}attributeChangedCallback(){this._didMount&&this.updateBanner()}connectedCallback(){return a(this,void 0,void 0,(function*(){yield this.initTranslations(),this.updateBanner(),this._didMount=!0}))}updateBanner(){try{const e=this.getAttribute("shopify-meta");if(e){const t=JSON.parse(e);this._backgroundColor=od(this.shadowRoot),kl(t,this._monorailTracker.trackInvalidInstallmentBannerMetadata.bind(this._monorailTracker))&&(t.type===ti.Cart?(this._monorailTracker.trackElementImpression(ti.Cart),this._metaType=ti.Cart,this.handleCartMeta(t)):(this._monorailTracker.trackElementImpression(ti.Product),this._metaType=ti.Product,this.handleProductMeta(t))),this.updateLearnMoreButtonAndModal()}}catch(t){t instanceof TypeError&&t.message.match(ed)?console.error(t):e(t,{metadata:{component:this._componentMetadata()}}),this._clearShadowRoot()}}updateLearnMoreButtonAndModal(){return a(this,void 0,void 0,(function*(){var e;if(!this._i18n)return;const t=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector(".shopify-installments__learn-more"),n=x();if(t){t.innerHTML=this._i18n.translate("banner.learn_more"),this._monorailTracker.trackInstallmentsBannerImpression(this._metaType,ii.PayInFour,this._eligible,ai.CustomizedByMerchant,!1,void 0,this._currentVariantId);const e=()=>a(this,void 0,void 0,(function*(){if(this._pricePerTerm&&!this._open){this._open=!0,this._modalMonorailTracker.trackElementImpression(this._metaType);const e={minPrice:this._minPrice,maxPrice:this._maxPrice},i=new gd(this._pricePerTerm,this._eligible,e,this._loanTypes,n,this._modalMonorailTracker,void 0,ri.SplitPay);yield i.connectedCallback();const a=new td(i.focusLockTarget);i.addEventListener("shopify_modal_close",(()=>{this._open=!1,bd(),a.release(t)})),fd(i),this._instrumentMonorailModalOpenEvent(i,this._metaType),a.lock()}}));this._lastLearnMoreEventListener&&t.removeEventListener("click",this._lastLearnMoreEventListener),this._lastLearnMoreEventListener=e,t.addEventListener("click",e)}}))}handleProductMeta(e){this._variants=e.variants,this._minPrice=e.min_price,this._minPriceNumber=sd(this._minPrice),this._maxPrice=e.max_price,this._maxPriceNumber=sd(this._maxPrice),this._currentVariantId=Number(this.getAttribute("variant-id")),this._pricePerTerm=this.updateVariant(this._currentVariantId),this._numberOfPaymentTerms=e.number_of_payment_terms;const t=this._getProductForm();if(t){const e=(n=0)=>{if(n>4)return;const i=rd(t);i&&(this._currentVariantId===i?setTimeout((()=>{e(n+1)}),100):(this._pricePerTerm=this.updateVariant(i),this._currentVariantId=i,this.updateLearnMoreButtonAndModal()))};this._hasChangeEventListener||(this._hasChangeEventListener=!0,t.addEventListener("change",(()=>{e()})))}}handleCartMeta(e){const t=id();this._minPrice=e.min_price,this._minPriceNumber=sd(this._minPrice),this._maxPrice=e.max_price,this._maxPriceNumber=sd(this._maxPrice),this._loanTypes=e.available_loan_types,this._eligible=e.eligible,this._pricePerTerm=e.price,this._numberOfPaymentTerms=e.number_of_payment_terms,this.updateBannerPrice(this._pricePerTerm),t||ad();new MutationObserver((e=>{e.forEach((e=>{if(e.target.nodeType!==Node.ELEMENT_NODE)return;const n=e.target;if((n.matches("[data-cart-subtotal]")||t&&n.matches(t))&&n.textContent){const e=sd(n.textContent);if(e){this._eligible=this._priceEligible(e);const t=this._splitCartPrice(e);if(t){const e=nd(t);this._pricePerTerm=e,this.updateBannerPrice(e)}}}}))})).observe(document,{attributes:!0,childList:!0,subtree:!0})}_splitCartPrice(e){if(!isNaN(e))return Math.floor(e/this._numberOfPaymentTerms*100)/100}_priceEligible(e){return null!=this._minPriceNumber&&null!=this._maxPriceNumber&&e>=this._minPriceNumber&&e<=this._maxPriceNumber}_instrumentMonorailModalOpenEvent(e,t){this._modalMonorailTracker.trackModalOpened(t,e.getModalToken(),e.getModalType(),JSON.stringify([]),this._currentVariantId,void 0)}_getProductForm(){var e,t,n;return null===(n=null===(t=null===(e=this.shadowRoot)||void 0===e?void 0:e.host.parentNode)||void 0===t?void 0:t.host)||void 0===n?void 0:n.closest("form")}_clearShadowRoot(){this.shadowRoot&&(this.shadowRoot.innerHTML="")}_componentMetadata(){return{name:"shop-pay-banner",shopifyMeta:this.getAttribute("shopify-meta"),variantId:this.getAttribute("variant-id")}}}class kd extends HTMLElement{constructor(e,t,n,i,a,o,s){var r;super(),this._i18n=null,this._samplePlans=[],this._trackContinueToCheckout=!0,this._initialized=!1,this.handleClose=()=>{this._monorailTracker.trackModalAction(this._modalToken,si.Close,this._permalink);const e=new Event("shopify_modal_close");this.dispatchEvent(e)},this.handleEscKey=e=>{"Escape"!==e.key&&"Esc"!==e.key||this.handleClose()},this.handleContinueToCheckout=()=>{this._trackContinueToCheckout&&this._monorailTracker.trackModalAction(this._modalToken,si.ContinueToCheckout,this._permalink)},this._modalToken=e,this._monorailTracker=t,this._trackContinueToCheckout=null===(r=null==o?void 0:o.available)||void 0===r||r,this._installmentPlans=n,this._priceWithoutInterest=i,this._variantInfo=o,this._cart=s,this._metaType=a}get focusLockTarget(){return this.querySelector("#shopify-payment-terms-modal")}get rootContainer(){return this}connectedCallback(){return a(this,void 0,void 0,(function*(){this._initialized||(yield this._initTranslations(),yield this._initContent(),this._closeButtons=this.querySelectorAll(".btn__close"),this._closeButtons&&0!==this._closeButtons.length&&(this._closeButtons.forEach((e=>e.addEventListener("click",this.handleClose))),this._closeButtons[0].focus(),this._continueToCheckoutButton&&this._continueToCheckoutButton.addEventListener("click",this.handleContinueToCheckout),window.addEventListener("keydown",this.handleEscKey),this._initialized=!0))}))}disconnectedCallback(){this._closeButtons&&(this._closeButtons.forEach((e=>e.removeEventListener("click",this.handleClose))),this._continueToCheckoutButton&&this._continueToCheckoutButton.removeEventListener("click",this.handleContinueToCheckout),window.removeEventListener("keydown",this.handleEscKey))}getModalSamplePlans(){return this._samplePlans}getPermalink(){return this._permalink}getModalToken(){return this._modalToken}getModalType(){var e,t,n,i;if(null===(e=this._samplePlans)||void 0===e?void 0:e.some((e=>0===e.apr&&e.loanType===ei.Interest))){return(null===(t=this._samplePlans)||void 0===t?void 0:t.every((e=>0===e.apr)))?oi.ZeroInterestOnly:oi.ZeroInterest}return(null===(n=this._samplePlans)||void 0===n?void 0:n.some((e=>e.loanType===ei.SplitPay)))&&(null===(i=this._samplePlans)||void 0===i?void 0:i.some((e=>e.loanType===ei.Interest)))?oi.Adaptive:oi.InterestOnly}getButtonText(){var e;return this._i18n?!1===(null===(e=this._variantInfo)||void 0===e?void 0:e.available)?this._i18n.translate("modal.sample_plan_contents.unavailable"):this._i18n.translate("modal.sample_plan_contents.continue_to_checkout"):""}_initTranslations(){return a(this,void 0,void 0,(function*(){if(!this._i18n)try{const e=ko.getDefaultLanguage(),t=yield function(e){switch(e){case"./translations/bg-BG.json":return Promise.resolve().then((function(){return $v}));case"./translations/cs.json":return Promise.resolve().then((function(){return Gv}));case"./translations/da.json":return Promise.resolve().then((function(){return tk}));case"./translations/de.json":return Promise.resolve().then((function(){return rk}));case"./translations/el.json":return Promise.resolve().then((function(){return mk}));case"./translations/en.json":return Promise.resolve().then((function(){return yk}));case"./translations/es.json":return Promise.resolve().then((function(){return zk}));case"./translations/fi.json":return Promise.resolve().then((function(){return Tk}));case"./translations/fr.json":return Promise.resolve().then((function(){return qk}));case"./translations/hi.json":return Promise.resolve().then((function(){return $k}));case"./translations/hr-HR.json":return Promise.resolve().then((function(){return Gk}));case"./translations/hu.json":return Promise.resolve().then((function(){return tw}));case"./translations/id.json":return Promise.resolve().then((function(){return rw}));case"./translations/it.json":return Promise.resolve().then((function(){return mw}));case"./translations/ja.json":return Promise.resolve().then((function(){return yw}));case"./translations/ko.json":return Promise.resolve().then((function(){return zw}));case"./translations/lt-LT.json":return Promise.resolve().then((function(){return Tw}));case"./translations/ms.json":return Promise.resolve().then((function(){return qw}));case"./translations/nb.json":return Promise.resolve().then((function(){return $w}));case"./translations/nl.json":return Promise.resolve().then((function(){return Gw}));case"./translations/pl.json":return Promise.resolve().then((function(){return tP}));case"./translations/pt-BR.json":return Promise.resolve().then((function(){return rP}));case"./translations/pt-PT.json":return Promise.resolve().then((function(){return mP}));case"./translations/ro-RO.json":return Promise.resolve().then((function(){return yP}));case"./translations/ru.json":return Promise.resolve().then((function(){return zP}));case"./translations/sk-SK.json":return Promise.resolve().then((function(){return TP}));case"./translations/sl-SI.json":return Promise.resolve().then((function(){return qP}));case"./translations/sv.json":return Promise.resolve().then((function(){return $P}));case"./translations/th.json":return Promise.resolve().then((function(){return GP}));case"./translations/tr.json":return Promise.resolve().then((function(){return tS}));case"./translations/vi.json":return Promise.resolve().then((function(){return rS}));case"./translations/zh-CN.json":return Promise.resolve().then((function(){return mS}));case"./translations/zh-TW.json":return Promise.resolve().then((function(){return yS}));default:return new Promise((function(t,n){("function"==typeof queueMicrotask?queueMicrotask:setTimeout)(n.bind(null,new Error("Unknown variable dynamic import: "+e)))}))}}(`. / translations / $ {
            e
        }.json `);this._i18n=new ko({[e]:t})}catch(e){}}))}_initContent(){return a(this,void 0,void 0,(function*(){if(!this._i18n)return;const e=document.createElement("template");this._samplePlans=pd(this._installmentPlans,this._priceWithoutInterest);const{subTitle:t,legalCopy:n}=cd(this._i18n,this._samplePlans.length,this._priceWithoutInterest);e.innerHTML=dd(this._i18n,t,n,this._samplePlans),this.appendChild(e.content.cloneNode(!0));const i=this.getElementsByClassName("navigation-buttons")[0];if(this._metaType===ti.Checkout){const e=this.getElementsByClassName("check_eligibility")[0];return i.classList.add("hidden-navigation-buttons"),void e.classList.add("hidden-navigation-buttons")}const a=this.getButtonText();i.innerHTML=ud(window.location.origin,this._modalToken,a,this._variantInfo,this._cart),this._continueToCheckoutButton=i.querySelector("shop-pay-button"),this._permalink=this._cart?this._cart.token:_l({storeUrl:window.location.origin,variants:this._variantInfo?gl(this._variantInfo.idQuantityMapping):[],paymentOption:ml.ShopPayInstallments,source:"installments_modal",sourceToken:this._modalToken})}))}}var wd,Pd,Sd,zd,jd,Cd,xd,Ld,Ad,Td,Ed;class Id extends HTMLElement{constructor(e,t,n,i,a,o,s,r,l,c){super(),wd.add(this),this._samplePlans=[],this._authorizeModalOpened=!1,this._nextState=ni.AuthorizeLoaded,this._i18n=null,this._initialized=!1,this.handleClose=()=>{this._monorailTracker.trackModalAction(this._modalToken,si.Close,this._permalink);const e=new Event("shopify_modal_close");this.dispatchEvent(e);const t=document.querySelector(".prequal");t&&document.body.removeChild(t),this._closePrequalBuyerFormOverlay()},this.handleEscKey=e=>{"Escape"!==e.key&&"Esc"!==e.key||!this._authorizeModalOpened?"Escape"!==e.key&&"Esc"!==e.key||this.handleClose():this._closeAuthorizeModal()},this.handleOverlayClose=()=>{var e;null===(e=document.querySelector("installments-prequal-overlay-modal"))||void 0===e||e.remove()},this.handleBuyerOnboardingSuccess=()=>{this.handleOverlayClose(),this._openFeatureIframe()},this.handlePrequalFlowSideEffect=e=>{this._prequalSideEffectEventReceived=!0;e.detail.shopPayInstallmentsOnboarded?this._nextState=ni.ResultsPageLoaded:this._nextState=ni.BuyerFormOverlayLoaded,this._completedEventReceived&&(this.removeCheckIfYouQualifyButtonLoading(),this.handleLoginCompleted())},this.handleLoginCompleted=()=>{if(this._completedEventReceived=!0,this._prequalSideEffectEventReceived)switch(this._nextState){case ni.ResultsPageLoaded:this._openFeatureIframe();break;case ni.BuyerFormOverlayLoaded:this._openPrequalBuyerFormOverlay()}else this.addCheckIfYouQualifyButtonLoading()},this.handleLoginModalOpened=()=>{this.removeCheckIfYouQualifyButtonLoading()},this.addCheckIfYouQualifyButtonLoading=()=>{this._contentStatusIndicator=Fo(Do.Branded),this._contentStatusIndicator.classList.add("shop-status-indicator-loading"),this._navigationButtons.querySelector("shop-pay-button").classList.add("prequal-hidden-state"),this._navigationButtons.appendChild(this._contentStatusIndicator),this._contentStatusIndicator.connectedCallback(),this._contentStatusIndicator.setStatus({status:"loading",message:""})},this.removeCheckIfYouQualifyButtonLoading=()=>{this._contentStatusIndicator&&(this._navigationButtons.querySelector("shop-pay-button").classList.remove("prequal-hidden-state"),this._navigationButtons.removeChild(this._contentStatusIndicator))},this._modalToken=e,this._monorailTracker=t,this._analyticsTraceId=c||this.getAttribute(Fi)||I(),this._variantInfo=r,this._cart=l,this._loanTypes=n,this._eligible=i,this._productAmount=sd(o),this._sellerId=s,this._installmentsPlans=a,this._priceWithoutInterest=o,this.attachShadow({mode:"open",delegatesFocus:!0})}get focusLockTarget(){return this.rootContainer.querySelector("#shopify-payment-terms-modal")}get rootContainer(){return this.shadowRoot}destroyIframe(){var e;null===(e=this._iframeMessageListener)||void 0===e||e.destroy()}connectedCallback(){return a(this,void 0,void 0,(function*(){this._initialized||(yield this._initTranslations(),yield this._initContent(),o(this,wd,"m",Sd).call(this),window.addEventListener("keydown",this.handleEscKey),this.addOverlayEventListeners())}))}addOverlayEventListeners(){window.addEventListener("overlayClose",this.handleOverlayClose),window.addEventListener("buyerOnboardingSuccess",this.handleBuyerOnboardingSuccess),window.addEventListener("closeOverlayAndModal",(()=>{this.handleOverlayClose(),this.handleClose()})),this._initialized=!0}disconnectedCallback(){this._closeAuthorizeModal(),this._closeButtons&&(this._closeButtons.forEach((e=>e.removeEventListener("click",this.handleClose))),window.removeEventListener("keydown",this.handleEscKey),this.destroyIframe())}handlePostMessage(e){var t;switch(e.type){case"prequal_ready":null===(t=this._iframeMessenger)||void 0===t||t.postMessage({type:"createprequal",amount:this._productAmount,currency:"USD",sellerId:Number(this._sellerId)});break;case"prequal_success":case"prequal_error":this._showFeatureIframe();break;case"prequal_missing_information":this._showMainContent(),this._openPrequalBuyerFormOverlay();break;case"close":this.handleClose();break;case"continue_to_checkout":this._continueToCheckout();break;case"resize_iframe":this._iframe.style.height=e.height<this.getContentModalHeight()?`
        $ {
            this.getContentModalHeight()
        }
        px `:`
        $ {
            e.height
        }
        px `,this._iframe.style.width="100%"}}getModalSamplePlans(){return this._samplePlans}getPermalink(){return this._permalink}getModalToken(){return this._modalToken}getContentModalHeight(){return window.innerHeight-75<642?window.innerHeight-75:642}getModalType(){var e,t,n,i,a;if(!(null===(e=this._loanTypes)||void 0===e?void 0:e.length)||!this._eligible)return oi.Ineligible;if(null===(t=this._samplePlans)||void 0===t?void 0:t.some((e=>0===e.apr&&e.loanType===ei.Interest))){return(null===(n=this._samplePlans)||void 0===n?void 0:n.every((e=>0===e.apr)))?oi.ZeroInterestOnly:oi.ZeroInterest}return(null===(i=this._samplePlans)||void 0===i?void 0:i.some((e=>e.loanType===ei.SplitPay)))&&(null===(a=this._samplePlans)||void 0===a?void 0:a.some((e=>e.loanType===ei.Interest)))?oi.Adaptive:oi.InterestOnly}_openFeatureIframe(){if(this._iframe)return;this._contentStatusIndicator=Fo(Do.Large);const e=this._contentProcessingWrapper.querySelector(".shop-modal-content-processing-loading-container");null==e||e.insertBefore(this._contentStatusIndicator,e.firstChild),this._contentStatusIndicator.setStatus({status:"loading",message:""});const t=(e=>{const t=fi.replace("https://","");return`
        $ {
            fi
        }
        /pay/installments / prequalifications / authorize ? shopify_domain = $ {
            window.location.hostname
        } & pay_domain = $ {
            t
        } & analytics_trace_id = $ {
            e
        } & redirect_source = $ {
            window.location.origin
        }
        `})(this._analyticsTraceId);this._iframe=document.createElement("iframe"),this._iframe.style.border="none",this._iframe.src=t,this._featureIframeWrapper.appendChild(this._iframe),this._showLoadingState(),this._iframeMessageListener||(this._iframeMessageListener=this.createListener(new Si(this._iframe))),this._iframeMessenger||(this._iframeMessenger=new Pi(this._iframe))}createListener(e){var t;const n=(null===(t=this.ownerDocument)||void 0===t?void 0:t.defaultView)||void 0;return new gi(e,[fi,bi,window.location.origin],this.handlePostMessage.bind(this),n)}_getSellerIdInNumber(){return this._sellerId?Number.parseInt(this._sellerId,10):void 0}_continueToCheckout(){var e;const t=this.rootContainer.querySelector("shop-pay-button").shadowRoot,n=null==t?void 0:t.querySelector("shop-pay-button-base"),i=null===(e=null==n?void 0:n.shadowRoot)||void 0===e?void 0:e.querySelector("#shop-pay-button-link");null==i||i.dispatchEvent(new MouseEvent("click")),null==n||n.dispatchEvent(new Event("click")),this._monorailTracker.trackInstallmentsPrequalPopupPageImpression(this._getSellerIdInNumber(),ni.ContinueToCheckoutClicked)}_openPrequalBuyerFormOverlay(){if(document.querySelector(".prequal-buyer-form-overlay"))return;const e=document.createElement("installments-prequal-overlay-modal");e.classList.add("prequal-buyer-form-overlay"),document.body.appendChild(e),this._monorailTracker.trackInstallmentsPrequalPopupPageImpression(this._getSellerIdInNumber(),ni.BuyerFormOverlayLoaded)}_closePrequalBuyerFormOverlay(){const e=document.querySelector(".prequal-buyer-form-overlay");e&&document.body.removeChild(e)}_openAuthorizeModal(){const e=document.querySelector(".prequal");null==e||e.requestShow,null==e||e.requestShow(""),this._authorizeModalOpened=!0,this._monorailTracker.trackInstallmentsPrequalPopupPageImpression(this._getSellerIdInNumber(),ni.AuthorizeLoaded)}_closeAuthorizeModal(){this._authorizeModalOpened=!1}_showLoadingState(){o(this,wd,"m",Pd).call(this,"400px"),this._contentProcessingWrapper.classList.remove("prequal-hidden-state"),this._featureIframeWrapper.classList.add("prequal-hidden-state"),this._contentModalWrapper.classList.add("opaque-hidden"),this._monorailTracker.trackInstallmentsPrequalPopupPageImpression(this._getSellerIdInNumber(),ni.ResultsPageLoading)}_showFeatureIframe(){var e,t,n,i;o(this,wd,"m",Pd).call(this,""),this._contentModalWrapper.classList.add("prequal-hidden-state"),this._contentProcessingWrapper.classList.add("prequal-hidden-state"),this._featureIframeWrapper.classList.remove("prequal-hidden-state"),this._continueToCheckoutContainer.innerHTML=(e=window.location.origin,t=this._modalToken,n=this._variantInfo,i=this._cart,`\
        n < shop - pay - button style = "width: 100%; height: 50px; --shop-pay-button-width: auto;"
        store - url = "${e}"
        $ {
            void 0 === n ? "" : `variants="${n.idQuantityMapping}" ${!1===n.available?"disabled":""}`
        }
        button - text = ""
        class = "shop-pay-continue-to-checkout-button"
        payment - option = "shop_pay_installments"
        source = "installments_modal"
        source - token = "${t}"
        redirect - source = "installments_modal"
        $ {
            void 0 === i ? "" : `cart=${encodeURIComponent(JSON.stringify({currency:i.currency,items:i.items,token:i.token}))}`
        } > < /shop-pay-button>\n`)}_showMainContent(){this._contentModalWrapper.classList.remove("opaque-hidden"),this._contentProcessingWrapper.classList.add("prequal-hidden-state"),this._featureIframeWrapper.classList.add("prequal-hidden-state")}getButtonText(e){return this._i18n?!1===(null==e?void 0:e.available)?this._i18n.translate("modal.prequal_contents.unavailable"):this._i18n.translate("modal.prequal_contents.check"):""}_initTranslations(){return a(this,void 0,void 0,(function*(){if(!this._i18n)try{const e=ko.getDefaultLanguage(),t=yield function(e){switch(e){case"./translations / bg - BG.json ":return Promise.resolve().then((function(){return $v}));case". / translations / cs.json ":return Promise.resolve().then((function(){return Gv}));case". / translations / da.json ":return Promise.resolve().then((function(){return tk}));case". / translations / de.json ":return Promise.resolve().then((function(){return rk}));case". / translations / el.json ":return Promise.resolve().then((function(){return mk}));case". / translations / en.json ":return Promise.resolve().then((function(){return yk}));case". / translations / es.json ":return Promise.resolve().then((function(){return zk}));case". / translations / fi.json ":return Promise.resolve().then((function(){return Tk}));case". / translations / fr.json ":return Promise.resolve().then((function(){return qk}));case". / translations / hi.json ":return Promise.resolve().then((function(){return $k}));case". / translations / hr - HR.json ":return Promise.resolve().then((function(){return Gk}));case". / translations / hu.json ":return Promise.resolve().then((function(){return tw}));case". / translations / id.json ":return Promise.resolve().then((function(){return rw}));case". / translations / it.json ":return Promise.resolve().then((function(){return mw}));case". / translations / ja.json ":return Promise.resolve().then((function(){return yw}));case". / translations / ko.json ":return Promise.resolve().then((function(){return zw}));case". / translations / lt - LT.json ":return Promise.resolve().then((function(){return Tw}));case". / translations / ms.json ":return Promise.resolve().then((function(){return qw}));case". / translations / nb.json ":return Promise.resolve().then((function(){return $w}));case". / translations / nl.json ":return Promise.resolve().then((function(){return Gw}));case". / translations / pl.json ":return Promise.resolve().then((function(){return tP}));case". / translations / pt - BR.json ":return Promise.resolve().then((function(){return rP}));case". / translations / pt - PT.json ":return Promise.resolve().then((function(){return mP}));case". / translations / ro - RO.json ":return Promise.resolve().then((function(){return yP}));case". / translations / ru.json ":return Promise.resolve().then((function(){return zP}));case". / translations / sk - SK.json ":return Promise.resolve().then((function(){return TP}));case". / translations / sl - SI.json ":return Promise.resolve().then((function(){return qP}));case". / translations / sv.json ":return Promise.resolve().then((function(){return $P}));case". / translations / th.json ":return Promise.resolve().then((function(){return GP}));case". / translations / tr.json ":return Promise.resolve().then((function(){return tS}));case". / translations / vi.json ":return Promise.resolve().then((function(){return rS}));case". / translations / zh - CN.json ":return Promise.resolve().then((function(){return mS}));case". / translations / zh - TW.json ":return Promise.resolve().then((function(){return yS}));default:return new Promise((function(t,n){("
        function "==typeof queueMicrotask?queueMicrotask:setTimeout)(n.bind(null,new Error("
        Unknown variable dynamic
        import: "+e)))}))}}(`./translations/${e}.json`);this._i18n=new ko({[e]:t})}catch(e){}}))}_initContent(){return a(this,void 0,void 0,(function*(){if(!this._i18n)return;const e=document.createElement("
        template ");this._samplePlans=pd(this._installmentsPlans,this._priceWithoutInterest);const{subTitle:t,legalCopy:n}=cd(this._i18n,this._samplePlans.length,this._priceWithoutInterest);e.innerHTML=dd(this._i18n,t,n,this._samplePlans),this.rootContainer.innerHTML="
        ",this.rootContainer.appendChild(e.content.cloneNode(!0)),this._contentProcessingWrapper=this.rootContainer.querySelector(".shop - modal - content - processing "),this._contentModalWrapper=this.rootContainer.querySelector(".modal - wrapper "),this._featureIframeWrapper=this.rootContainer.querySelector(".shop - modal - feature - iframe - wrapper "),this._navigationButtons=this.rootContainer.querySelectorAll(".navigation - buttons ")[0],this._continueToCheckoutContainer=this.rootContainer.querySelectorAll(".continue-to - checkout - button ")[0],this._permalink=this._cart?this._cart.token:_l({storeUrl:window.location.origin,variants:this._variantInfo?gl(this._variantInfo.idQuantityMapping):[],paymentOption:ml.ShopPayInstallments,source:"
        installments_modal ",sourceToken:this._modalToken})}))}}wd=new WeakSet,Pd=function(e){const t=new CustomEvent(Xn,{detail:{height:e,lockScroll:"
        "!==e},bubbles:!0});this.dispatchEvent(t)},Sd=function(){const e=this.getButtonText(this._variantInfo);this._navigationButtons.innerHTML=ud("
        ",this._modalToken,e,this._variantInfo,this._cart);const t=this._navigationButtons.querySelector("
        shop - pay - button "),n=t.shadowRoot,i=null==n?void 0:n.querySelector("#
        shop - pay - button - link ");null==i||i.setAttribute("
        href ","#
        ");const a=document.createElement("
        shop - login - button ");a.setAttribute("
        action ",Zn.Prequal),a.setAttribute("
        client - id ","
        "),a.setAttribute("
        version ","
        2 "),a.setAttribute("
        analytics - context ",Ln.Prequal),a.setAttribute("
        analytics - trace - id ",this._analyticsTraceId),a.setAttribute("
        hide - button ","
        true "),a.classList.add("
        prequal "),a.setAttribute("
        anchor - to ","
        shop - pay - button "),document.body.appendChild(a),t.addEventListener("
        click ",(()=>{switch(this.addCheckIfYouQualifyButtonLoading(),this._nextState){case ni.AuthorizeLoaded:const e=document.querySelector(".prequal ");null==e||e.requestShow,this._openAuthorizeModal();break;case ni.BuyerFormOverlayLoaded:this.removeCheckIfYouQualifyButtonLoading(),this._openPrequalBuyerFormOverlay();break;case ni.ResultsPageLoaded:this.removeCheckIfYouQualifyButtonLoading(),this._openFeatureIframe()}})),a.addEventListener("
        completed ",this.handleLoginCompleted),a.addEventListener("
        prequal_flow_side_effect ",this.handlePrequalFlowSideEffect),a.addEventListener("
        modalopened ",this.handleLoginModalOpened),this._closeButtons=this.rootContainer.querySelectorAll(".btn__close "),this._closeButtons&&0!==this._closeButtons.length&&(this._closeButtons.forEach((e=>e.addEventListener("
        click ",this.handleClose))),this._closeButtons[0].focus())};class Md extends HTMLElement{static get observedAttributes(){return["
        variant - id ","
        shopify - meta "]}constructor(){super(),zd.add(this),this._minPrice="
        $50 ",this._maxPrice="
        $3000 ",this._open=!1,this._eligible=!1,this._numberOfPaymentTerms=4,this._hasChangeEventListener=!1,this._loanTypes=[],this._lastLearnMoreEventListener=new WeakMap,this._metaType=ti.Product,this._backgroundColor="
        ",this._didMount=!1,this._variantAvailable=!0,this._i18n=null,this.getContent=e=>{if(!this._i18n)return"
        ";if(this._metaType===ti.Checkout)return"
        ";const t=Yp(this._backgroundColor);if(!this._loanTypes.length)return this.getIneligibleContent();if(this._financingTermForBanner&&this._hasZeroInterestLoanType()){return 0===this._financingTermForBanner.apr?this._i18n.translate("
        banner.zero_interest_eligible_zero_apr ",{price:e,shopPayLogo:t}):this._i18n.translate("
        banner.zero_interest_eligible ",{price:e,shopPayLogo:t})}if(this._financingTermForBanner&&this.isInAdaptiveRangeWithoutZeroInterest())return this._i18n.translate("
        banner.pay_in_4_or_as_low_as_eligible ",{price:e,shopPayLogo:t});if(this._loanTypes.includes(ei.SplitPay)){let n="
        banner.split_pay_eligible ";return 2===this._numberOfPaymentTerms?n="
        banner.split_pay_eligible_2 ":1===this._numberOfPaymentTerms&&(n="
        banner.split_pay_eligible_30 "),this._i18n.translate(n,{price:e,shopPayLogo:t})}return this._loanTypes.includes(ei.Interest)?this._i18n.translate("
        banner.dynamic_interest_only_eligible ",{price:e,shopPayLogo:t}):this.getIneligibleContent()},this.getIneligibleContent=()=>{if(!this._i18n)return"
        ";const e=Yp(this._backgroundColor);let t="
        banner.non_eligible_min ";this._minIneligibleMessageType===ri.Monthly?t="
        banner.non_eligible_monthly_payments_min ":2===this._numberOfPaymentTerms?t="
        banner.non_eligible_min_over_time ":1===this._numberOfPaymentTerms&&(t="
        banner.non_eligible_min_over_time_30 ");const n=this._i18n.translate(t,{minPrice:this._minPrice,shopPayLogo:e});if(!this._fullPrice)return n;return sd(this._fullPrice)>sd(this._maxPrice)?this._i18n.translate("
        banner.non_eligible_max ",{maxPrice:this._maxPrice,shopPayLogo:e}):n},this.updatePDPVariant=(e,t)=>{var n;const i=null===(n=this._variants)||void 0===n?void 0:n.find((t=>Number(t.id)===e));if(!i||!i.full_price)return this._eligible=!1,this._loanTypes=[],this.updateBannerPrice(),"
        ";this._eligible=i.eligible,this._loanTypes=this._getAvailableLoanTypes(i.full_price,t),this._variantAvailable=i.available;const a=sd(i.full_price),o=this._getFinancingPlanForPrice(a,t);if(!o)return this.updateBannerPrice(i.price_per_term),i.price_per_term;if(this._financingTermForBanner=this._getFinancingTermForBanner(o),this._financingTermForBanner.loan_type===ei.SplitPay)return this.updateBannerPrice(i.price_per_term),i.price_per_term;const s=this.calculatePricePerTerm(a,this._financingTermForBanner);return this.updateBannerPrice(s),s},this.calculatePricePerTerm=(e,t)=>{const n=t.apr/1200,i=t.installments_count;if(0===n)return nd(e/i);return nd(e*n*Math.pow(1+n,i)/(Math.pow(1+n,i)-1))},this.updateBannerPrice=e=>{var t,n;let i;if(i=this._eligible&&e?this.getContent(e):this.getIneligibleContent(),this._metaType===ti.Checkout){const e=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector("#
        shopify - installments ");null==e||e.classList.add("
        shopify - installments__inline ")}const a=null===(n=this.shadowRoot)||void 0===n?void 0:n.querySelector("#
        shopify - installments - content ");a&&(a.innerHTML=i)},this._analyticsTraceId=x(),this._monorailTracker=new yd({elementName:"
        shop - pay - installments - banner ",analyticsTraceId:this._analyticsTraceId}),this._modalMonorailTracker=new yd({elementName:"
        shopify - installments - modal ",analyticsTraceId:this._analyticsTraceId}),customElements.get("
        shopify - installments - modal ")||customElements.define("
        shopify - installments - modal ",gd),customElements.get("
        shopify - installments - sample - plans - modal ")||customElements.define("
        shopify - installments - sample - plans - modal ",kd),customElements.get("
        shopify - installments - prequal - modal ")||customElements.define("
        shopify - installments - prequal - modal ",Id),customElements.get("
        shop - pay - logo ")||customElements.define("
        shop - pay - logo ",Ta),this.attachShadow({mode:"
        open "}).innerHTML=Jp}initTranslations(){return a(this,void 0,void 0,(function*(){if(!this._i18n)try{const e=ko.getDefaultLanguage(),t=yield function(e){switch(e){case".. / translations / bg - BG.json ":return Promise.resolve().then((function(){return $v}));case".. / translations / cs.json ":return Promise.resolve().then((function(){return Gv}));case".. / translations / da.json ":return Promise.resolve().then((function(){return tk}));case".. / translations / de.json ":return Promise.resolve().then((function(){return rk}));case".. / translations / el.json ":return Promise.resolve().then((function(){return mk}));case".. / translations / en.json ":return Promise.resolve().then((function(){return yk}));case".. / translations / es.json ":return Promise.resolve().then((function(){return zk}));case".. / translations / fi.json ":return Promise.resolve().then((function(){return Tk}));case".. / translations / fr.json ":return Promise.resolve().then((function(){return qk}));case".. / translations / hi.json ":return Promise.resolve().then((function(){return $k}));case".. / translations / hr - HR.json ":return Promise.resolve().then((function(){return Gk}));case".. / translations / hu.json ":return Promise.resolve().then((function(){return tw}));case".. / translations / id.json ":return Promise.resolve().then((function(){return rw}));case".. / translations / it.json ":return Promise.resolve().then((function(){return mw}));case".. / translations / ja.json ":return Promise.resolve().then((function(){return yw}));case".. / translations / ko.json ":return Promise.resolve().then((function(){return zw}));case".. / translations / lt - LT.json ":return Promise.resolve().then((function(){return Tw}));case".. / translations / ms.json ":return Promise.resolve().then((function(){return qw}));case".. / translations / nb.json ":return Promise.resolve().then((function(){return $w}));case".. / translations / nl.json ":return Promise.resolve().then((function(){return Gw}));case".. / translations / pl.json ":return Promise.resolve().then((function(){return tP}));case".. / translations / pt - BR.json ":return Promise.resolve().then((function(){return rP}));case".. / translations / pt - PT.json ":return Promise.resolve().then((function(){return mP}));case".. / translations / ro - RO.json ":return Promise.resolve().then((function(){return yP}));case".. / translations / ru.json ":return Promise.resolve().then((function(){return zP}));case".. / translations / sk - SK.json ":return Promise.resolve().then((function(){return TP}));case".. / translations / sl - SI.json ":return Promise.resolve().then((function(){return qP}));case".. / translations / sv.json ":return Promise.resolve().then((function(){return $P}));case".. / translations / th.json ":return Promise.resolve().then((function(){return GP}));case".. / translations / tr.json ":return Promise.resolve().then((function(){return tS}));case".. / translations / vi.json ":return Promise.resolve().then((function(){return rS}));case".. / translations / zh - CN.json ":return Promise.resolve().then((function(){return mS}));case".. / translations / zh - TW.json ":return Promise.resolve().then((function(){return yS}));default:return new Promise((function(t,n){("
        function "==typeof queueMicrotask?queueMicrotask:setTimeout)(n.bind(null,new Error("
        Unknown variable dynamic
        import: "+e)))}))}}(`../translations/${e}.json`);this._i18n=new ko({[e]:t})}catch(e){}}))}attributeChangedCallback(){this._didMount&&this.updateBanner()}connectedCallback(){return a(this,void 0,void 0,(function*(){yield this.initTranslations(),this.updateBanner(),this._didMount=!0}))}isInAdaptiveRangeWithoutZeroInterest(){return this._eligible&&!this._hasZeroInterestLoanType()&&2===this._loanTypes.length&&this._loanTypes.includes(ei.SplitPay)&&this._loanTypes.includes(ei.Interest)}updateBanner(){try{const e=this.getAttribute("
        shopify - meta ");if(e){const n=JSON.parse(e);this._backgroundColor=od(this.shadowRoot);const i=this._getLowestLoanTypes(n.financing_plans);this._minIneligibleMessageType=(t=i)&&(t.includes(ei.Interest)&&!t.includes(ei.SplitPay)||t.includes(ei.ZeroPercent))?ri.Monthly:ri.SplitPay,wl(n,this._monorailTracker.trackInvalidInstallmentBannerMetadata.bind(this._monorailTracker))&&(n.type===ti.Cart?(this._monorailTracker.trackElementImpression(ti.Cart),this._metaType=ti.Cart,this.handleCartOrCheckoutMeta(n)):n.type===ti.Checkout?(this._monorailTracker.trackElementImpression(ti.Checkout),this._metaType=ti.Checkout,this.handleCartOrCheckoutMeta(n)):(this._monorailTracker.trackElementImpression(ti.Product),this._metaType=ti.Product,this.handleProductMeta(n))),this.updateLearnMoreButtonAndModal()}}catch(t){t instanceof TypeError&&t.message.match(ed)?console.error(t):e(t,{metadata:{component:this._componentMetadata()}}),this._clearShadowRoot()}var t}_getSellerIdInNumber(){return this._sellerId?Number.parseInt(this._sellerId,10):void 0}updateLearnMoreButtonAndModal(){return a(this,void 0,void 0,(function*(){var e;const t=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("#
        shopify - installments - cta ");if(!this._i18n||!t)return;const n=o(this,zd,"
        a ",Cd);o(this,zd,"
        a ",xd)?t.innerHTML=this._i18n.translate("
        banner.prequal "):this._eligible&&n?t.innerHTML=this._i18n.translate("
        banner.view_sample_plans "):t.innerHTML=this._i18n.translate("
        banner.learn_more "),this._monorailTracker.trackInstallmentsBannerImpression(this._metaType,this._getInstallmentBannerContentType(n),this._eligible,ai.Standard,o(this,zd,"
        a ",xd),this._fullPrice,this._currentVariantId),this._metaType===ti.Cart&&n&&(this._cartDetails=yield this._generateCartDetails()),o(this,zd,"
        m ",jd).call(this,t),o(this,zd,"
        a ",Ld)&&o(this,zd,"
        m ",Ed).call(this)}))}handleProductMeta(e){this._variants=e.variants,this._minPrice=e.min_price,this._minPriceNumber=sd(this._minPrice),this._maxPrice=e.max_price,this._maxPriceNumber=sd(this._maxPrice),this._currentVariantId=Number(this.getAttribute("
        variant - id ")),this._fullPrice=this._getVariantFullPrice(this._currentVariantId),this._numberOfPaymentTerms=this._getNumberOfPaymentTermsForPDPVariant(this._currentVariantId),this._pricePerTerm=this.updatePDPVariant(this._currentVariantId,e.financing_plans),this._sellerId=e.seller_id,this._installmentsBuyerPrequalificationEnabled=e.installments_buyer_prequalification_enabled,this._buildInstallmentPlans(e.financing_plans,this._fullPrice);const t=this._getProductForm();if(t){const n=(i=0)=>{if(i>4)return;const a=rd(t);a&&(this._currentVariantId===a?setTimeout((()=>{n(i+1)}),100):(this._numberOfPaymentTerms=this._getNumberOfPaymentTermsForPDPVariant(a),this._pricePerTerm=this.updatePDPVariant(a,e.financing_plans),this._fullPrice=this._getVariantFullPrice(a),this._buildInstallmentPlans(e.financing_plans,this._fullPrice),this._currentVariantId=a,this.updateLearnMoreButtonAndModal()))};this._hasChangeEventListener||(this._hasChangeEventListener=!0,t.addEventListener("
        change ",(()=>{n()})))}}handleCartOrCheckoutMeta(e){const t=id();this._minPrice=e.min_price,this._minPriceNumber=sd(this._minPrice),this._maxPrice=e.max_price,this._maxPriceNumber=sd(this._maxPrice),this._fullPrice=e.full_price,this._loanTypes=this._getAvailableLoanTypes(this._fullPrice,e.financing_plans),this._eligible=e.eligible,this._financingTermForBanner=this.getFinancingTermForCart(this._fullPrice,e.financing_plans),this._sellerId=e.seller_id,this._installmentsBuyerPrequalificationEnabled=e.installments_buyer_prequalification_enabled,this._pricePerTerm=this._financingTermForBanner?this.getCartPricePerTerm(this._fullPrice,this._financingTermForBanner):e.price_per_term,this._numberOfPaymentTerms=this._financingTermForBanner?this._financingTermForBanner.installments_count:e.number_of_payment_terms,this.updateBannerPrice(this._pricePerTerm),this._loanTypes.length&&this._buildInstallmentPlans(e.financing_plans,e.full_price),t||ad();new MutationObserver((e=>{e.forEach((e=>{if(e.target.nodeType!==Node.ELEMENT_NODE)return;const n=e.target;if((n.matches(" [data - cart - subtotal]
        ")||t&&n.matches(t))&&n.textContent){const e=sd(n.textContent);if(e){this._fullPrice=n.textContent,this._eligible=this._priceEligible(e);const t=this._splitCartPrice(e);if(t){const e=nd(t);this._pricePerTerm=e,this.updateBannerPrice(e)}}}}))})).observe(document,{attributes:!0,childList:!0,subtree:!0})}buildVariantInfo(e){return{idQuantityMapping:`${this._currentVariantId}:${e}`,available:this._variantAvailable}}getCartPricePerTerm(e,t){const n=sd(e);return this.calculatePricePerTerm(n,t)}getFinancingTermForCart(e,t){const n=sd(e),i=this._getFinancingPlanForPrice(n,t);if(i)return this._getFinancingTermForBanner(i)}_getVariantFullPrice(e){var t;const n=null===(t=this._variants)||void 0===t?void 0:t.find((t=>Number(t.id)===e));return null==n?void 0:n.full_price}_getNumberOfPaymentTermsForPDPVariant(e){var t;const n=null===(t=this._variants)||void 0===t?void 0:t.find((t=>Number(t.id)===e));return(null==n?void 0:n.number_of_payment_terms)||4}_generateCartDetails(){return a(this,void 0,void 0,(function*(){const e=O(window.location.origin);if(e)return hl(e)}))}_getLowestLoanTypes(e){const t=e?e[0]:null;if(!t)return[];return t.terms.map((e=>e.loan_type===ei.SplitPay?ei.SplitPay:0===e.apr?ei.ZeroPercent:ei.Interest))}_getFinancingPlanForPrice(e,t){return t.find((t=>{const n=sd(t.min_price),i=sd(t.max_price);return e>=n&&e<=i}))}_getFinancingTermForBanner(e){const t=e.terms.reduce(((e,t)=>t.installments_count>e.installments_count?t:e));if(this._hasZeroInterestLoanType())return t;const n=e.terms.find((e=>e.loan_type===ei.SplitPay));return n&&!this.isInAdaptiveRangeWithoutZeroInterest()?n:t}_buildInstallmentPlans(e,t){if(!t)return;const n=sd(t),i=this._getFinancingPlanForPrice(n,e);i&&(this._installmentPlans=this._getSampleDisplayedTerms(i.terms).map((e=>({pricePerTerm:this.calculatePricePerTerm(n,e),apr:e.apr,numberOfPaymentTerms:e.installments_count,loanType:e.loan_type}))))}_getSampleDisplayedTerms(e){if(e.length<3)return e;if(this.isInAdaptiveRangeWithoutZeroInterest())return[e[0],e[e.length-1]];const t=e.filter((e=>e.loan_type!==ei.SplitPay));return t.length<3?t:[t[0],t[t.length-1]]}_splitCartPrice(e){if(!isNaN(e))return Math.floor(e/this._numberOfPaymentTerms*100)/100}_priceEligible(e){return null!=this._minPriceNumber&&null!=this._maxPriceNumber&&e>=this._minPriceNumber&&e<=this._maxPriceNumber}_instrumentMonorailModalOpenEvent(e,t){e instanceof gd?this._modalMonorailTracker.trackModalOpened(t,e.getModalToken(),e.getModalType(),JSON.stringify([]),this._currentVariantId,this._fullPrice):this._modalMonorailTracker.trackModalOpened(t,e.getModalToken(),e.getModalType(),JSON.stringify(e.getModalSamplePlans()),this._currentVariantId,this._fullPrice,e.getPermalink())}_getInstallmentBannerContentType(e){return e?this.isInAdaptiveRangeWithoutZeroInterest()?ii.PayInFourAsLowAs:ii.AsLowAs:ii.PayInFour}_hasZeroInterestLoanType(){return this._loanTypes.includes(ei.ZeroPercent)}_getAvailableLoanTypes(e,t){if(!t||0===t.length||!e)return[];const n=sd(e),i=this._getFinancingPlanForPrice(n,t);if(!i)return[];const a=new Set;return i.terms.forEach((e=>{e.loan_type===ei.SplitPay?a.add(ei.SplitPay):0===e.apr?a.add(ei.ZeroPercent):a.add(ei.Interest)})),Array.from(a)}_getProductForm(){var e,t,n;return null===(n=null===(t=null===(e=this.shadowRoot)||void 0===e?void 0:e.host.parentNode)||void 0===t?void 0:t.host)||void 0===n?void 0:n.closest("
        form ")}_clearShadowRoot(){this.shadowRoot&&(this.shadowRoot.innerHTML="
        ")}_componentMetadata(){return{name:"
        shop - pay - installments - banner ",shopifyMeta:this.getAttribute("
        shopify - meta "),variantId:this.getAttribute("
        variant - id ")}}}var Od;zd=new WeakSet,jd=function(e){var t;const n=()=>a(this,void 0,void 0,(function*(){const t=x();if(!this._pricePerTerm)return;const n=this._getProductForm(),i=this._metaType===ti.Product?function(e){if(!e)return 1;const t=e.elements.quantity;if(t)return Number(t.value);const n=e.getAttribute("
        id "),i=null==n?void 0:n.replace("
        product - form - installment - ","
        "),a=document.getElementById(`Quantity-${i}`);return a?Number(a.value):1}(n):void 0;if(!this._open){this._open=!0,this._modalMonorailTracker.trackElementImpression(this._metaType);const n={minPrice:this._minPrice,maxPrice:this._maxPrice},a=i?this.buildVariantInfo(i):void 0;let s;this._installmentsBuyerPrequalificationEnabled&&this._eligible?(s=new Id(t,this._modalMonorailTracker,this._loanTypes,this._eligible,this._installmentPlans||[],this._fullPrice||"
        ",this._sellerId,a,this._cartDetails,this._analyticsTraceId),this._modalMonorailTracker.trackInstallmentsBannerPrequalInteraction(this._metaType,this._getInstallmentBannerContentType(!1),this._eligible,this._fullPrice||"
        ",!0)):s=o(this,zd,"
        a ",Cd)?new kd(t,this._modalMonorailTracker,this._installmentPlans||[],this._fullPrice||"
        ",this._metaType,a,this._cartDetails):new gd(this._pricePerTerm,this._eligible,n,this._loanTypes,t,this._modalMonorailTracker,this._fullPrice,this._minIneligibleMessageType,this._numberOfPaymentTerms),yield s.connectedCallback();const r=new td(s.focusLockTarget);s.addEventListener("
        shopify_modal_close ",(()=>{this._open=!1,bd(),r.release(e)})),this._installmentsBuyerPrequalificationEnabled&&this._modalMonorailTracker.trackInstallmentsPrequalPopupPageImpression(this._getSellerIdInNumber(),ni.IntroPageLoaded),fd(s),this._instrumentMonorailModalOpenEvent(s,this._metaType),r.lock()}}));this._lastLearnMoreEventListener.has(e)&&(null===(t=this._lastLearnMoreEventListener.get(e))||void 0===t||t()),this._lastLearnMoreEventListener.set(e,(()=>e.removeEventListener("
        click ",n))),e.addEventListener("
        click ",n)},Cd=function(){var e;const t=1===this._loanTypes.length&&this._loanTypes[0]===ei.Interest,n=(null===(e=this._installmentPlans)||void 0===e?void 0:e.length)&&this._fullPrice&&(this._hasZeroInterestLoanType()||t||this.isInAdaptiveRangeWithoutZeroInterest());return Boolean(n)},xd=function(){return Boolean(this._eligible&&this._installmentsBuyerPrequalificationEnabled)},Ld=function(){return Boolean(this._fullPrice&&this._eligible&&sd(this._fullPrice)>=50)},Ad=function(){return Boolean(this._fullPrice&&sd(this._fullPrice)<150)},Td=function(){const e=this.shadowRoot.querySelector(".shopify - installments__prequal - row ");if(!e)return;const t=window.getComputedStyle(e);return{color:t.color,fontSize:t.fontSize,fontFamily:t.fontFamily,letterSpacing:t.letterSpacing,fontFace:_d(t.fontFamily)}},Ed=function(){var e,t,n,i,a;const s=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("#
        shopify - installments - cta "),r=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector("#
        shopifyPrequalifiedCTA "),l=null===(n=this.shadowRoot)||void 0===n?void 0:n.querySelector("#
        prequalAmountRowWrapper ");let c=null===(i=this.shadowRoot)||void 0===i?void 0:i.querySelector("#
        prequalAmount ");c||(c=document.createElement("
        shop - prequal - amount "),c.setAttribute("
        id ","
        prequalAmount "),null===(a=r.parentNode)||void 0===a||a.insertBefore(c,r)),r&&this._i18n&&(r.innerHTML=o(this,zd,"
        a ",Ad)?this._i18n.translate("
        banner.learn_more "):this._i18n.translate("
        banner.prequal_contents.prequalified_see_plans "),o(this,zd,"
        m ",jd).call(this,r),c.onloaded=()=>null==l?void 0:l.classList.remove("
        stable "),c.styles=()=>o(this,zd,"
        m ",Td).call(this),c.onready=(e,t)=>{var n;if(e){if(!t){const e=null===(n=this.shadowRoot)||void 0===n?void 0:n.querySelector("#
        shopify - installments ");null==e||e.classList.add("
        default -font ")}s.tabIndex=-1,r.tabIndex=0,requestAnimationFrame((()=>{null==l||l.classList.add("
        is - prequalified "),setTimeout((()=>null==l?void 0:l.classList.add("
        stable ")),300)}))}})},function(e){e.Unspecified="
        unspecified ",e.PrequalAmount="
        prequalAmount "}(Od||(Od={}));class Nd extends HTMLElement{constructor(){super();const e=document.createElement("
        template "),t=this.getAttribute("
        size "),n=this.getAttribute("
        background - color ")||"#
        FFF ";e.innerHTML=function(e=36,t){const[n,i,a]=ja(t),o=`rgb(${n}, ${i}, ${a})`,s=1.15,r=e,l=Math.round(r/s);return`\n    <style>\n      .shop-swirl {\n        height: ${r}px;\n        width: ${l}px;\n        vertical-align: middle;\n      }\n    </style>\n    <svg class="
        shop - swirl " viewBox="
        0 0 22 25 " fill="
        none " xmlns="
        http: //www.w3.org/2000/svg">\n      <path d="M9.43 0C4.607 0 2.2 1.63.266 2.952L.21 2.99a.476.476 0 0 0-.146.632l1.91 3.291a.486.486 0 0 0 .327.235.5.5 0 0 0 .398-.104l.15-.127c.995-.832 2.586-1.957 6.441-2.25 2.146-.174 4.005.404 5.372 1.666 1.503 1.386 2.4 3.626 2.4 5.991 0 4.348-2.56 7.084-6.68 7.14-3.391-.02-5.67-1.788-5.67-4.404 0-1.399.651-2.306 1.884-3.216a.437.437 0 0 0 .124-.554L4.995 8.03a.493.493 0 0 0-.685-.193C2.386 8.98.03 11.067.155 15.077c.156 5.111 4.403 9.009 9.921 9.168h.63C17.268 24.034 22 19.166 22 12.576 22.01 6.474 17.6 0 9.43 0z" fill="${o}" />\n    </svg>\n  `}(t?Number.parseInt(t,10):void 0,n),this.attachShadow({mode:"open"}).appendChild(e.content.cloneNode(!0))}}function qd(e){return Rd(e).map((e=>e instanceof Error?e:new Dd(`[${typeof e}] ${function(e){if("string"!=typeof e)try{return JSON.stringify(e)??typeof e}catch{}return`${e}`}(e).slice(0,10240)}`)))}function Rd(e,t=0){return t>=20?[e,"Truncated cause stack"]:e instanceof Error&&e.cause?[e,...Rd(e.cause,t+1)]:[e]}var Dd=class extends Error{name="BugsnagInvalidError"},Bd=/^\s*at .*(\S+:\d+|\(native\))/m,Fd=/^(eval@)?(\[native code])?$/;function Vd(e){return e.stack?e.stack.match(Bd)?function(e){return e.stack.split("\n").filter((e=>!!e.match(Bd))).map((e=>{let t=e.replace(/^\s+/,"").replace(/^.*?\s+/,""),n=t.match(/ (\(.+\)$)/);t=n?t.replace(n[0],""):t;let i=$d(n?n[1]:t);return{method:n&&t||void 0,file:["eval","<anonymous>"].indexOf(i[0])>-1?void 0:i[0],lineNumber:i[1],columnNumber:i[2]}}))}(e):function(e){return e.stack.split("\n").filter((e=>!e.match(Fd))).map((e=>{if(-1===e.indexOf("@")&&-1===e.indexOf(":"))return{method:e};let t=/((.*".+"[^@]*)?[^@]*)(?:@)/,n=e.match(t),i=n&&n[1]?n[1]:void 0,a=$d(e.replace(t,""));return{method:i,file:a[0],lineNumber:a[1],columnNumber:a[2]}}))}(e):[]}function $d(e){if(-1===e.indexOf(":"))return[e];let t=/(.+?)(?::(\d+))?(?::(\d+))?$/.exec(e.replace(/[()]/g,""));return[t[1],t[2]?Number(t[2]):void 0,t[3]?Number(t[3]):void 0]}var Wd=class{breadcrumbs=[];apiKey;plugins;appId;appType;appVersion;releaseStage;locale;userAgent;metadata;persistedMetadata;onError;onPostErrorListeners=[];endpoints;session;constructor(e){this.apiKey=e.apiKey,this.appType=e.appType,this.appId=e.appId,this.appVersion=e.appVersion,this.releaseStage=e.releaseStage,this.locale=e.locale,this.userAgent=e.userAgent,this.metadata=e.metadata,this.onError=e.onError,this.persistedMetadata={},this.endpoints=e.endpoints??{notify:"https://error-analytics-production.shopifysvc.com",sessions:"https://error-analytics-sessions-production.shopifysvc.com/observeonly"},this.plugins=e.plugins??[],this.plugins.forEach((e=>e.load(this))),this.leaveBreadcrumb("Bugsnag started",void 0,"state"),(e.withSessionTracking??1)&&(this.session={id:this.getRandomUUID(),startedAt:(new Date).toISOString(),events:{handled:0,unhandled:0}},this.startSession())}addMetadata(e){for(let t of Object.keys(e))this.persistedMetadata[t]=e[t]}getSessionId(){return this.session?.id}leaveBreadcrumb(e,t,n="manual"){this.breadcrumbs.push({name:e,metaData:t,type:n,timestamp:(new Date).toISOString()})}notify(e,{errorClass:t,severity:n,severityType:i,handled:a=!0,metadata:o,context:s,groupingHash:r}={}){let l=qd(e),c={...this.metadata,...this.persistedMetadata,...o},p=this.buildBugsnagEvent(l,{errorClass:t,severityType:i,handled:a,severity:n,metadata:c,context:s,groupingHash:r});if((this.onError?.(p,e)??1)&&"development"!==this.releaseStage){this.updateAndAppendSessionInformation(p);let e=this.sendToBugsnag(p);return this.onPostErrorListeners.forEach((e=>e(p))),e}return Promise.resolve()}addOnPostError(e){this.onPostErrorListeners.push(e)}updateAndAppendSessionInformation(e){this.session&&(e.unhandled?this.session.events.unhandled++:this.session.events.handled++,e.session=this.session)}buildBugsnagEvent(e,{errorClass:t,severity:n="error",severityType:i="handledException",handled:a,metadata:o={},context:s,groupingHash:r}){let l=(new Date).toISOString(),{breadcrumbs:c,appId:p,appType:d,appVersion:u,releaseStage:m,locale:h,userAgent:_}=this,g=e.map(((e,n)=>({errorClass:0===n?t??e.name:e.name,stacktrace:Ud(p,e),message:e.message,type:"browserjs"})));return{payloadVersion:"5",exceptions:g,severity:n,severityReason:{type:i},unhandled:!a,app:{id:p,type:d,version:u,releaseStage:m},device:{time:l,locale:h,userAgent:_},breadcrumbs:c,context:s,metaData:o,groupingHash:r}}async startSession(){if("development"===this.releaseStage)return void console.log("Skipping error logging session tracking in development mode");let{apiKey:e}=this,t={notifier:{name:"Bugsnag JavaScript",version:"7.22.2",url:"https://github.com/bugsnag/bugsnag-js"},app:{version:this.appVersion,releaseStage:this.releaseStage,type:this.appType},device:{id:this.appId,locale:this.locale,userAgent:this.userAgent},sessions:[this.session]};try{await fetch(this.endpoints.sessions,{method:"POST",headers:{"Content-Type":"application/json","Bugsnag-Api-Key":e,"Bugsnag-Payload-Version":"5","Bugsnag-Sent-At":this.session?.startedAt??(new Date).toISOString()},body:JSON.stringify(t)})}catch(e){console.warn("[bugsnag-light] failed to start session"),console.warn(e)}}async sendToBugsnag(e){let{apiKey:t}=this,n={apiKey:t,notifier:{name:"Bugsnag JavaScript",version:"7.22.2",url:"https://github.com/bugsnag/bugsnag-js"},events:[e]};try{await fetch(this.endpoints.notify,{method:"POST",headers:{"Content-Type":"application/json","Bugsnag-Api-Key":t,"Bugsnag-Payload-Version":"5","Bugsnag-Sent-At":e.device.time},body:JSON.stringify(n)})}catch(e){console.warn("[bugsnag-light] failed to send an event"),console.warn(e)}}getRandomUUID(){try{return crypto.randomUUID()}catch{return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(e=>{let t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)}))}}};function Ud(e,t){let n=Vd(t).map((t=>{let n=t.file?.includes(e);return{method:t.method??"",file:t.file??"",lineNumber:t.lineNumber??0,columnNumber:t.columnNumber,inProject:n}}));if(t instanceof Dd){let e=n.findIndex((e=>e.method.endsWith("notify")));e>-1&&(n=n.slice(e+1))}return n}const Hd="undefined"==typeof document?{activeElement:null,addEventListener:()=>{},appendChild:()=>{},body:{},cookie:"",createElement:()=>{},createTextNode:()=>{},documentElement:{clientHeight:0,clientWidth:0,lang:"",style:{overflow:"",removeProperty:()=>{}}},getElementById:()=>null,head:{appendChild:()=>{}},location:void 0,querySelector:()=>{},querySelectorAll:()=>[],removeEventListener:()=>{},styleSheets:{}}:document,Kd="undefined"==typeof navigator?{languages:[],userAgent:"",userLanguage:"",credentials:{}}:navigator,Zd={addEventListener:()=>{},analytics:{},btoa:()=>"",clearTimeout:()=>{},CSS:{supports:(e,t)=>!1},customElements:{},devicePixelRatio:1,getComputedStyle:e=>({}),HTMLElement:{},innerHeight:0,innerWidth:0,localStorage:{getItem(){throw new Error("localStorage is not available")},setItem(){throw new Error("localStorage is not available")},removeItem(){throw new Error("localStorage is not available")}},sessionStorage:{getItem(){throw new Error("sessionStorage is not available")},setItem(){throw new Error("sessionStorage is not available")},removeItem(){throw new Error("sessionStorage is not available")}},location:{assign:()=>{},hostname:"",href:"",origin:"",pathname:"",search:""},matchMedia:()=>({matches:!1}),open:()=>{},PublicKeyCredential:{isConditionalMediationAvailable:()=>Promise.resolve(!1)},removeEventListener:()=>{},ResizeObserver:void 0,screen:{availWidth:0,height:0,orientation:{type:""},width:0},screenLeft:0,screenTop:0,screenX:0,screenY:0,scrollTo:()=>{},setTimeout:()=>0,Shopify:{},ShopifyAnalytics:{},top:{addEventListener:()=>{},removeEventListener:()=>{}},trekkie:{},URL:URL,visualViewport:{}},Gd="undefined"==typeof window?Zd:window;var Jd="e35d7136cee78d344ccffdbd5ca710fa";function Yd(e,t){if(!{}.hasOwnProperty.call(e,t))throw new TypeError("attempted to use private field on non-instance");return e}var Qd=0;function Xd(e){return"__private_"+Qd+++"_"+e}function eu(e){return Object.entries(e).map((([e,t])=>({key:e,value:{stringValue:String(t)}})))}function tu(e){if(Array.isArray(e))return{arrayValue:{values:e.map((e=>tu(e)))}};switch(typeof e){case"boolean":return{boolValue:Boolean(e)};case"number":return{doubleValue:Number(e)};default:return{stringValue:String(e)}}}const nu=function(e,t,n){const i=[0];for(let a=0;a<n;a++){const n=Math.floor(e*t**a);i.push(n)}return i}(5,2,12);var iu=Xd("exporter"),au=Xd("attributes"),ou=Xd("metrics"),su=Xd("logs");class ru{constructor({exporter:e,attributes:t}){Object.defineProperty(this,iu,{writable:!0,value:void 0}),Object.defineProperty(this,au,{writable:!0,value:void 0}),Object.defineProperty(this,ou,{writable:!0,value:[]}),Object.defineProperty(this,su,{writable:!0,value:[]}),Yd(this,iu)[iu]=e,Yd(this,au)[au]=null!=t?t:{}}addAttributes(e){Yd(this,au)[au]={...Yd(this,au)[au],...e}}histogram({name:e,value:t,unit:n,bounds:i,attributes:a,scale:o}){const s=1e6*Date.now();i?Yd(this,ou)[ou].push({name:e,type:"histogram",value:t,unit:n,timeUnixNano:s,attributes:a,bounds:i}):Yd(this,ou)[ou].push({name:e,type:"exponential_histogram",value:t,unit:n,timeUnixNano:s,attributes:a,scale:o})}counter({name:e,value:t,unit:n,attributes:i}){const a=1e6*Date.now();Yd(this,ou)[ou].push({name:e,type:"counter",value:t,unit:n,timeUnixNano:a,attributes:i})}gauge({name:e,value:t,unit:n,attributes:i}){const a=1e6*Date.now();Yd(this,ou)[ou].push({name:e,type:"gauge",value:t,unit:n,timeUnixNano:a,attributes:i})}log({body:e,attributes:t}){const n=1e6*Date.now();Yd(this,su)[su].push({timeUnixNano:n,body:e,attributes:t})}async exportMetrics(){const e={};Yd(this,ou)[ou].forEach((t=>{switch(t.attributes={...Yd(this,au)[au],...t.attributes},t.type){case"histogram":!function(e,t){var n;const{name:i,value:a,unit:o,timeUnixNano:s,attributes:r}=t,l=null!==(n=t.bounds)&&void 0!==n?n:nu,c=new Array(l.length+1).fill(0);e[i]||={name:i,unit:o||"1",histogram:{aggregationTemporality:1,dataPoints:[]}};for(let e=0;e<c.length;e++){const t=l[e];if(void 0===t)c[e]=1;else if(a<=t){c[e]=1;break}}e[i].histogram.dataPoints.push({startTimeUnixNano:s,timeUnixNano:s,count:1,sum:a,min:a,max:a,bucketCounts:c,explicitBounds:l,attributes:eu(null!=r?r:{})})}(e,t);break;case"exponential_histogram":!function(e,t){const{name:n,value:i,unit:a,timeUnixNano:o,attributes:s,scale:r}=t;e[n]||={name:n,unit:a||"1",exponentialHistogram:{aggregationTemporality:1,dataPoints:[]}};const l=i<=0?0:i,c=r||3,p=2**c/Math.log(2),d=Math.ceil(Math.log(i)*p)-1,u=i<=0?1:0,m={offset:0,bucketCounts:[]},h={offset:i>0?d:0,bucketCounts:i>0?[1]:[]};e[n].exponentialHistogram.dataPoints.push({attributes:eu(null!=s?s:{}),startTimeUnixNano:o,timeUnixNano:o,count:1,sum:l,scale:c,zeroCount:u,positive:h,negative:m,min:l,max:l,zeroThreshold:0})}(e,t);break;case"counter":!function(e,t){const{name:n,value:i,unit:a,timeUnixNano:o,attributes:s}=t;e[n]||={name:n,unit:a||"1",sum:{aggregationTemporality:1,isMonotonic:!0,dataPoints:[]}},e[n].sum.dataPoints.push({startTimeUnixNano:o,timeUnixNano:o,asDouble:i,attributes:eu(null!=s?s:{})})}(e,t);break;case"gauge":!function(e,t){const{name:n,value:i,unit:a,timeUnixNano:o,attributes:s}=t;e[n]||={name:n,unit:a||"1",gauge:{dataPoints:[]}},e[n].gauge.dataPoints.push({startTimeUnixNano:o,timeUnixNano:o,asDouble:i,attributes:eu(null!=s?s:{})})}(e,t)}}));const t=Object.values(e);0!==t.length&&(Yd(this,ou)[ou]=[],await Yd(this,iu)[iu].exportMetrics(t))}async exportLogs(){const e=Yd(this,su)[su].map((e=>{const t={timeUnixNano:e.timeUnixNano,observedTimeUnixNano:e.timeUnixNano,attributes:(n={...Yd(this,au)[au],...e.attributes},Object.entries(n).map((([e,t])=>({key:e,value:tu(t)}))))};var n;return e.body&&(t.body={stringValue:e.body}),t}));0!==e.length&&(Yd(this,su)[su]=[],await Yd(this,iu)[iu].exportLogs(e))}}var lu,cu=Xd("url"),pu=Xd("serviceName"),du=Xd("logger"),uu=Xd("fetchFn");class mu{constructor(e,t,n){Object.defineProperty(this,cu,{writable:!0,value:void 0}),Object.defineProperty(this,pu,{writable:!0,value:void 0}),Object.defineProperty(this,du,{writable:!0,value:void 0}),Object.defineProperty(this,uu,{writable:!0,value:void 0}),Yd(this,cu)[cu]=e.replace(/\/v1\/(logs|metrics|traces)\/?$/,""),Yd(this,pu)[pu]=t,Yd(this,du)[du]=null==n?void 0:n.logger,Yd(this,uu)[uu]=null==n?void 0:n.fetchFn}async exportMetrics(e){const t={resourceMetrics:[{resource:{attributes:[{key:"service.name",value:{stringValue:Yd(this,pu)[pu]}}]},scopeMetrics:[{scope:{name:"open-telemetry-mini-client",version:"1.1.0",attributes:[]},metrics:e}]}]};await this.exportTo(t,"/v1/metrics")}async exportLogs(e){const t={resourceLogs:[{resource:{attributes:[{key:"service.name",value:{stringValue:Yd(this,pu)[pu]}}]},scopeLogs:[{scope:{name:"open-telemetry-mini-client",version:"1.1.0",attributes:[]},logRecords:e}]}]};await this.exportTo(t,"/v1/logs")}async exportTo(e,t){var n;const i=await this.exporterFetch()(`${Yd(this,cu)[cu]}${t}`,{method:"POST",keepalive:!0,headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(null===(n=Yd(this,du)[du])||void 0===n||n.log({status:i.status}),!i.ok){if(400===i.status){const e=await i.text();throw new hu(`Invalid OpenTelemetry Data: ${e}`)}if(429===i.status||503===i.status){const t=await i.text(),n=i.headers.get("Retry-After"),a=n?{seconds:Number(n)}:void 0;throw new hu("Server did not accept data",{errorData:t,retryAfter:a,body:e})}throw new hu(`Server responded with ${i.status}`)}}exporterFetch(){return Yd(this,uu)[uu]||fetch}}class hu extends Error{constructor(e,t){super(e),this.metadata=void 0,this.name="OpenTelemetryClientError",this.metadata=t}}class _u extends ru{counter(e){super.counter(e),this.exportMetrics()}gauge(e){super.gauge(e),this.exportMetrics()}histogram(e){super.histogram(e),this.exportMetrics()}log(e){super.log(e),this.exportLogs()}}class gu{constructor(e){lu.set(this,void 0),s(this,lu,e,"f")}exportMetrics(e){return a(this,void 0,void 0,(function*(){var t;try{yield o(this,lu,"f").exportMetrics(e)}catch(n){if(n instanceof hu){const i=null===(t=n.metadata)||void 0===t?void 0:t.retryAfter;if(i)return void(yield new Promise((t=>{setTimeout((()=>this.exportMetrics(e).finally(t)),1e3*i.seconds)})))}throw n}}))}exportLogs(e){return a(this,void 0,void 0,(function*(){var t;try{yield o(this,lu,"f").exportLogs(e)}catch(n){if(n instanceof hu){const i=null===(t=n.metadata)||void 0===t?void 0:t.retryAfter;if(i)return void(yield new Promise((t=>{setTimeout((()=>this.exportLogs(e).finally(t)),1e3*i.seconds)})))}throw n}}))}}lu=new WeakMap;function fu(){{const e=new mu("https://otlp-http-production.shopifysvc.com/v1/metrics","shop-js");return new gu(e)}}const bu=["Load failed","Failed to fetch","when attempting to fetch resource"],yu=["NotFoundError","NotSupportedError","ReferenceError","SyntaxError","TypeError"],vu=["development","spin"].includes("production");function ku({metadata:e,onNetworkError:t}){return{apiKey:Jd,appId:"shop-js",appVersion:"1.0.32-beta",onError:n=>{var i,a,o,s,r,l;const c=n.exceptions[0];if(!c)return!1;const{errorClass:p,message:d}=c,u="NetworkError"===p||bu.some((e=>null==d?void 0:d.includes(e)))||(m=d,Boolean((null==m?void 0:m.includes("A network failure may have prevented the request from completing"))||(null==m?void 0:m.includes("Backpressure applied"))));var m;const h=c.stacktrace.some((e=>e.inProject));if(u)return t(),!1;if(!h)return!1;if(yu.includes(p))return!1;const _=null===(a=null===(i=Gd.Shopify)||void 0===i?void 0:i.featureAssets)||void 0===a?void 0:a["shop-js"],g=Boolean(_&&Object.keys(_).length>0),f=Array.from(Hd.querySelectorAll('script[src*="/shop-js/"]')).map((e=>e.src));n.device={locale:Kd.userLanguage||Kd.language,userAgent:Kd.userAgent,orientation:null===(s=null===(o=Gd.screen)||void 0===o?void 0:o.orientation)||void 0===s?void 0:s.type,time:(new Date).toISOString()},n.metaData=Object.assign(Object.assign(Object.assign({},n.metaData),e),{custom:Object.assign(Object.assign(Object.assign({},null===(r=n.metaData)||void 0===r?void 0:r.custom),e.custom),{beta:!0,bundleLocale:"",compactUX:!0,domain:null===(l=null==Gd?void 0:Gd.location)||void 0===l?void 0:l.hostname,shopJsUrls:f,shopJsFeatureAssetsExist:g})}),n.request={url:Gd.location.href}},releaseStage:"production"}}class wu{constructor(e){this.opentelClient=new _u({exporter:fu()});const t=ku({metadata:{custom:{feature:e}},onNetworkError:this.handleNetworkError.bind(this)});this.client=new Wd(t),this.feature=e||"",this.leaveBreadcrumb=this.leaveBreadcrumb.bind(this),this.notify=this.notify.bind(this)}leaveBreadcrumb(e,t,n){this.client?vu?console.log("[Bugsnag leaveBreadcrumb called]",e,t,n):this.client.leaveBreadcrumb(e,t,n):console.log("Bugsnag.leaveBreadcrumb() called before client creation.")}notify(e,t){return a(this,void 0,void 0,(function*(){var n;this.client?vu?console.log("[Bugsnag notify called]",e):this.client.notify(e,t):null===(n=console.warn)||void 0===n||n.call(console,"Bugsnag.notify() called before client creation.")}))}handleNetworkError(){this.opentelClient.counter({attributes:{beta:!0,feature:this.feature,error:"NetworkError"},name:"shop_js_network_error",value:1})}}const Pu=["discount-app","login-button","shop-pay-payment-request"];class Su{constructor(e,t,n){this.locale=e,this.deprecatedLoaderFilesEnabled=t,this.loadedFeatures=new Map,this.baseUrl=this.resolveBaseUrl(n)}load(e){if(this.loadedFeatures.has(e))return this.loadedFeatures.get(e);const{loaderAsset:t,featureAssets:n}=this.getAssetsForFeature(e);if(Hd.querySelector(`script[src="${t}"]`))return this.loadedFeatures.set(e,Promise.resolve()),this.loadedFeatures.get(e);const i=n.map((e=>Hd.querySelector(`script[src="${e}"]`))).every(Boolean);if(n.length>0&&i)return this.loadedFeatures.set(e,Promise.resolve()),this.loadedFeatures.get(e);const a=(n.length>0?n:[t]).map((e=>{const t=Hd.createElement("script");return t.src=e,t.type="module",t})),o=Promise.all(a.map((e=>new Promise(((t,n)=>{e.onload=t,e.onerror=n})))));return this.loadedFeatures.set(e,o),a.forEach((e=>Hd.head.appendChild(e))),o}getAssetsForFeature(e){var t,n,i;const a=(null===(i=null===(n=null===(t=Gd.Shopify)||void 0===t?void 0:t.featureAssets)||void 0===n?void 0:n["shop-js"])||void 0===i?void 0:i[e])||[];let o="modules/v2";return(this.deprecatedLoaderFilesEnabled||function(e){return Pu.includes(e)}(e))&&(o="modules"),{loaderAsset:`${this.baseUrl}${o}/loader.${e}.${this.locale}.esm.js`,featureAssets:a.map((e=>`${this.baseUrl}${e}`))}}resolveBaseUrl(e){const t=new Gd.URL("https://cdn.shopify.com/shopifycloud/shop-js");try{if(e){const n=new Gd.URL(`https://${e}`);t.hostname=n.hostname,t.pathname=`${n.pathname}${t.pathname}`}}catch(e){}const n=t.toString();return n.endsWith("/")?n:`${n}/`}}var zu,ju,Cu,xu,Lu,Au,Tu,Eu,Iu,Mu,Ou,Nu,qu={},Ru=[],Du=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,Bu=Array.isArray;function Fu(e,t){for(var n in t)e[n]=t[n];return e}function Vu(e){e&&e.parentNode&&e.parentNode.removeChild(e)}function $u(e,t,n,i,a){var o={type:e,props:t,key:n,ref:i,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:null==a?++Cu:a,__i:-1,__u:0};return null==a&&null!=ju.vnode&&ju.vnode(o),o}function Wu(e){return e.children}function Uu(e,t){this.props=e,this.context=t}function Hu(e,t){if(null==t)return e.__?Hu(e.__,e.__i+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?Hu(e):null}function Ku(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return Ku(e)}}function Zu(e){(!e.__d&&(e.__d=!0)&&xu.push(e)&&!Gu.__r++||Lu!=ju.debounceRendering)&&((Lu=ju.debounceRendering)||Au)(Gu)}function Gu(){for(var e,t,n,i,a,o,s,r=1;xu.length;)xu.length>r&&xu.sort(Tu),e=xu.shift(),r=xu.length,e.__d&&(n=void 0,a=(i=(t=e).__v).__e,o=[],s=[],t.__P&&((n=Fu({},i)).__v=i.__v+1,ju.vnode&&ju.vnode(n),im(t.__P,n,i,t.__n,t.__P.namespaceURI,32&i.__u?[a]:null,o,null==a?Hu(i):a,!!(32&i.__u),s),n.__v=i.__v,n.__.__k[n.__i]=n,am(o,n,s),n.__e!=a&&Ku(n)));Gu.__r=0}function Ju(e,t,n,i,a,o,s,r,l,c,p){var d,u,m,h,_,g,f=i&&i.__k||Ru,b=t.length;for(l=Yu(n,t,f,l,b),d=0;d<b;d++)null!=(m=n.__k[d])&&(u=-1==m.__i?qu:f[m.__i]||qu,m.__i=d,g=im(e,m,u,a,o,s,r,l,c,p),h=m.__e,m.ref&&u.ref!=m.ref&&(u.ref&&rm(u.ref,null,m),p.push(m.ref,m.__c||h,m)),null==_&&null!=h&&(_=h),4&m.__u||u.__k===m.__k?l=Qu(m,l,e):"function"==typeof m.type&&void 0!==g?l=g:h&&(l=h.nextSibling),m.__u&=-7);return n.__e=_,l}function Yu(e,t,n,i,a){var o,s,r,l,c,p=n.length,d=p,u=0;for(e.__k=new Array(a),o=0;o<a;o++)null!=(s=t[o])&&"boolean"!=typeof s&&"function"!=typeof s?(l=o+u,(s=e.__k[o]="string"==typeof s||"number"==typeof s||"bigint"==typeof s||s.constructor==String?$u(null,s,null,null,null):Bu(s)?$u(Wu,{children:s},null,null,null):null==s.constructor&&s.__b>0?$u(s.type,s.props,s.key,s.ref?s.ref:null,s.__v):s).__=e,s.__b=e.__b+1,r=null,-1!=(c=s.__i=Xu(s,n,l,d))&&(d--,(r=n[c])&&(r.__u|=2)),null==r||null==r.__v?(-1==c&&(a>p?u--:a<p&&u++),"function"!=typeof s.type&&(s.__u|=4)):c!=l&&(c==l-1?u--:c==l+1?u++:(c>l?u--:u++,s.__u|=4))):e.__k[o]=null;if(d)for(o=0;o<p;o++)null!=(r=n[o])&&!(2&r.__u)&&(r.__e==i&&(i=Hu(r)),lm(r,r));return i}function Qu(e,t,n){var i,a;if("function"==typeof e.type){for(i=e.__k,a=0;i&&a<i.length;a++)i[a]&&(i[a].__=e,t=Qu(i[a],t,n));return t}e.__e!=t&&(t&&e.type&&!n.contains(t)&&(t=Hu(e)),n.insertBefore(e.__e,t||null),t=e.__e);do{t=t&&t.nextSibling}while(null!=t&&8==t.nodeType);return t}function Xu(e,t,n,i){var a,o,s=e.key,r=e.type,l=t[n];if(null===l&&null==e.key||l&&s==l.key&&r==l.type&&!(2&l.__u))return n;if(i>(null==l||2&l.__u?0:1))for(a=n-1,o=n+1;a>=0||o<t.length;){if(a>=0){if((l=t[a])&&!(2&l.__u)&&s==l.key&&r==l.type)return a;a--}if(o<t.length){if((l=t[o])&&!(2&l.__u)&&s==l.key&&r==l.type)return o;o++}}return-1}function em(e,t,n){"-"==t[0]?e.setProperty(t,null==n?"":n):e[t]=null==n?"":"number"!=typeof n||Du.test(t)?n:n+"px"}function tm(e,t,n,i,a){var o;e:if("style"==t)if("string"==typeof n)e.style.cssText=n;else{if("string"==typeof i&&(e.style.cssText=i=""),i)for(t in i)n&&t in n||em(e.style,t,"");if(n)for(t in n)i&&n[t]==i[t]||em(e.style,t,n[t])}else if("o"==t[0]&&"n"==t[1])o=t!=(t=t.replace(Eu,"$1")),t=t.toLowerCase()in e||"onFocusOut"==t||"onFocusIn"==t?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+o]=n,n?i?n.u=i.u:(n.u=Iu,e.addEventListener(t,o?Ou:Mu,o)):e.removeEventListener(t,o?Ou:Mu,o);else{if("http://www.w3.org/2000/svg"==a)t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("width"!=t&&"height"!=t&&"href"!=t&&"list"!=t&&"form"!=t&&"tabIndex"!=t&&"download"!=t&&"rowSpan"!=t&&"colSpan"!=t&&"role"!=t&&"popover"!=t&&t in e)try{e[t]=null==n?"":n;break e}catch(e){}"function"==typeof n||(null==n||!1===n&&"-"!=t[4]?e.removeAttribute(t):e.setAttribute(t,"popover"==t&&1==n?"":n))}}function nm(e){return function(t){if(this.l){var n=this.l[t.type+e];if(null==t.t)t.t=Iu++;else if(t.t<n.u)return;return n(ju.event?ju.event(t):t)}}}function im(e,t,n,i,a,o,s,r,l,c){var p,d,u,m,h,_,g,f,b,y,v,k,w,P,S,z,j,C=t.type;if(null!=t.constructor)return null;128&n.__u&&(l=!!(32&n.__u),o=[r=t.__e=n.__e]),(p=ju.__b)&&p(t);e:if("function"==typeof C)try{if(f=t.props,b="prototype"in C&&C.prototype.render,y=(p=C.contextType)&&i[p.__c],v=p?y?y.props.value:p.__:i,n.__c?g=(d=t.__c=n.__c).__=d.__E:(b?t.__c=d=new C(f,v):(t.__c=d=new Uu(f,v),d.constructor=C,d.render=cm),y&&y.sub(d),d.props=f,d.state||(d.state={}),d.context=v,d.__n=i,u=d.__d=!0,d.__h=[],d._sb=[]),b&&null==d.__s&&(d.__s=d.state),b&&null!=C.getDerivedStateFromProps&&(d.__s==d.state&&(d.__s=Fu({},d.__s)),Fu(d.__s,C.getDerivedStateFromProps(f,d.__s))),m=d.props,h=d.state,d.__v=t,u)b&&null==C.getDerivedStateFromProps&&null!=d.componentWillMount&&d.componentWillMount(),b&&null!=d.componentDidMount&&d.__h.push(d.componentDidMount);else{if(b&&null==C.getDerivedStateFromProps&&f!==m&&null!=d.componentWillReceiveProps&&d.componentWillReceiveProps(f,v),!d.__e&&null!=d.shouldComponentUpdate&&!1===d.shouldComponentUpdate(f,d.__s,v)||t.__v==n.__v){for(t.__v!=n.__v&&(d.props=f,d.state=d.__s,d.__d=!1),t.__e=n.__e,t.__k=n.__k,t.__k.some((function(e){e&&(e.__=t)})),k=0;k<d._sb.length;k++)d.__h.push(d._sb[k]);d._sb=[],d.__h.length&&s.push(d);break e}null!=d.componentWillUpdate&&d.componentWillUpdate(f,d.__s,v),b&&null!=d.componentDidUpdate&&d.__h.push((function(){d.componentDidUpdate(m,h,_)}))}if(d.context=v,d.props=f,d.__P=e,d.__e=!1,w=ju.__r,P=0,b){for(d.state=d.__s,d.__d=!1,w&&w(t),p=d.render(d.props,d.state,d.context),S=0;S<d._sb.length;S++)d.__h.push(d._sb[S]);d._sb=[]}else do{d.__d=!1,w&&w(t),p=d.render(d.props,d.state,d.context),d.state=d.__s}while(d.__d&&++P<25);d.state=d.__s,null!=d.getChildContext&&(i=Fu(Fu({},i),d.getChildContext())),b&&!u&&null!=d.getSnapshotBeforeUpdate&&(_=d.getSnapshotBeforeUpdate(m,h)),z=p,null!=p&&p.type===Wu&&null==p.key&&(z=om(p.props.children)),r=Ju(e,Bu(z)?z:[z],t,n,i,a,o,s,r,l,c),d.base=t.__e,t.__u&=-161,d.__h.length&&s.push(d),g&&(d.__E=d.__=null)}catch(e){if(t.__v=null,l||null!=o)if(e.then){for(t.__u|=l?160:128;r&&8==r.nodeType&&r.nextSibling;)r=r.nextSibling;o[o.indexOf(r)]=null,t.__e=r}else for(j=o.length;j--;)Vu(o[j]);else t.__e=n.__e,t.__k=n.__k;ju.__e(e,t,n)}else null==o&&t.__v==n.__v?(t.__k=n.__k,t.__e=n.__e):r=t.__e=sm(n.__e,t,n,i,a,o,s,l,c);return(p=ju.diffed)&&p(t),128&t.__u?void 0:r}function am(e,t,n){for(var i=0;i<n.length;i++)rm(n[i],n[++i],n[++i]);ju.__c&&ju.__c(t,e),e.some((function(t){try{e=t.__h,t.__h=[],e.some((function(e){e.call(t)}))}catch(e){ju.__e(e,t.__v)}}))}function om(e){return"object"!=typeof e||null==e||e.__b&&e.__b>0?e:Bu(e)?e.map(om):Fu({},e)}function sm(e,t,n,i,a,o,s,r,l){var c,p,d,u,m,h,_,g=n.props,f=t.props,b=t.type;if("svg"==b?a="http://www.w3.org/2000/svg":"math"==b?a="http://www.w3.org/1998/Math/MathML":a||(a="http://www.w3.org/1999/xhtml"),null!=o)for(c=0;c<o.length;c++)if((m=o[c])&&"setAttribute"in m==!!b&&(b?m.localName==b:3==m.nodeType)){e=m,o[c]=null;break}if(null==e){if(null==b)return document.createTextNode(f);e=document.createElementNS(a,b,f.is&&f),r&&(ju.__m&&ju.__m(t,o),r=!1),o=null}if(null==b)g===f||r&&e.data==f||(e.data=f);else{if(o=o&&zu.call(e.childNodes),g=n.props||qu,!r&&null!=o)for(g={},c=0;c<e.attributes.length;c++)g[(m=e.attributes[c]).name]=m.value;for(c in g)if(m=g[c],"children"==c);else if("dangerouslySetInnerHTML"==c)d=m;else if(!(c in f)){if("value"==c&&"defaultValue"in f||"checked"==c&&"defaultChecked"in f)continue;tm(e,c,null,m,a)}for(c in f)m=f[c],"children"==c?u=m:"dangerouslySetInnerHTML"==c?p=m:"value"==c?h=m:"checked"==c?_=m:r&&"function"!=typeof m||g[c]===m||tm(e,c,m,g[c],a);if(p)r||d&&(p.__html==d.__html||p.__html==e.innerHTML)||(e.innerHTML=p.__html),t.__k=[];else if(d&&(e.innerHTML=""),Ju("template"==t.type?e.content:e,Bu(u)?u:[u],t,n,i,"foreignObject"==b?"http://www.w3.org/1999/xhtml":a,o,s,o?o[0]:n.__k&&Hu(n,0),r,l),null!=o)for(c=o.length;c--;)Vu(o[c]);r||(c="value","progress"==b&&null==h?e.removeAttribute("value"):null!=h&&(h!==e[c]||"progress"==b&&!h||"option"==b&&h!=g[c])&&tm(e,c,h,g[c],a),c="checked",null!=_&&_!=e[c]&&tm(e,c,_,g[c],a))}return e}function rm(e,t,n){try{if("function"==typeof e){var i="function"==typeof e.__u;i&&e.__u(),i&&null==t||(e.__u=e(t))}else e.current=t}catch(e){ju.__e(e,n)}}function lm(e,t,n){var i,a;if(ju.unmount&&ju.unmount(e),(i=e.ref)&&(i.current&&i.current!=e.__e||rm(i,null,t)),null!=(i=e.__c)){if(i.componentWillUnmount)try{i.componentWillUnmount()}catch(e){ju.__e(e,t)}i.base=i.__P=null}if(i=e.__k)for(a=0;a<i.length;a++)i[a]&&lm(i[a],t,n||"function"!=typeof e.type);n||Vu(e.__e),e.__c=e.__=e.__e=void 0}function cm(e,t,n){return this.constructor(e,n)}zu=Ru.slice,ju={__e:function(e,t,n,i){for(var a,o,s;t=t.__;)if((a=t.__c)&&!a.__)try{if((o=a.constructor)&&null!=o.getDerivedStateFromError&&(a.setState(o.getDerivedStateFromError(e)),s=a.__d),null!=a.componentDidCatch&&(a.componentDidCatch(e,i||{}),s=a.__d),s)return a.__E=a}catch(t){e=t}throw e}},Cu=0,Uu.prototype.setState=function(e,t){var n;n=null!=this.__s&&this.__s!=this.state?this.__s:this.__s=Fu({},this.state),"function"==typeof e&&(e=e(Fu({},n),this.props)),e&&Fu(n,e),null!=e&&this.__v&&(t&&this._sb.push(t),Zu(this))},Uu.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),Zu(this))},Uu.prototype.render=Wu,xu=[],Au="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,Tu=function(e,t){return e.__v.__b-t.__v.__b},Gu.__r=0,Eu=/(PointerCapture)$|Capture$/i,Iu=0,Mu=nm(!1),Ou=nm(!0),Nu=0;const pm=["en","bg-BG","cs","da","de","el","es","fi","fr","hi","hr-HR","hu","id","it","ja","ko","lt-LT","ms","nb","nl","pl","pt-BR","pt-PT","ro-RO","ru","sk-SK","sl-SI","sv","th","tr","vi","zh-CN","zh-TW"];!function(e){function t(e){var n,i;return this.getChildContext||(n=new Set,(i={})[t.__c]=this,this.getChildContext=function(){return i},this.componentWillUnmount=function(){n=null},this.shouldComponentUpdate=function(e){this.props.value!=e.value&&n.forEach((function(e){e.__e=!0,Zu(e)}))},this.sub=function(e){n.add(e);var t=e.componentWillUnmount;e.componentWillUnmount=function(){n&&n.delete(e),t&&t.call(e)}}),e.children}t.__c="__cC"+Nu++,t.__=e,t.Provider=t.__l=(t.Consumer=function(e,t){return e.children(t)}).contextType=t}({loading:void 0,locale:"en",translations:void 0});const dm={initCustomerAccounts:"init-customer-accounts",initCustomerAccountsSignUp:"init-customer-accounts-sign-up",initShopCartSync:"init-shop-cart-sync",initShopLoginInput:"init-shop-for-new-customer-accounts",initShopForNewCustomerAccounts:"init-shop-for-new-customer-accounts",initShopEmailLookupCoordinator:"init-shop-email-lookup-coordinator"};function um({onElementFound:e,selector:t}){const n=new WeakSet,i=new MutationObserver((e=>{let t=!1;for(const n of e)if(n.addedNodes.length>0){t=!0;break}t&&o()}));function o(){Hd.querySelectorAll(t).forEach((t=>{n.has(t)||(e(t),n.add(t))}))}return function(){a(this,void 0,void 0,(function*(){yield function(){if(Hd.body)return Promise.resolve();return new Promise((e=>{Gd.addEventListener("DOMContentLoaded",(()=>e()))}))}(),o(),i.observe(Hd.body||Hd.documentElement,{childList:!0,subtree:!0})}))}(),i}const mm={"shop-user-avatar":{feature:"avatar",deprecatedFeature:"avatar"},"shop-checkout-modal":{feature:"checkout-modal"},"shop-discount-auth":{deprecatedFeature:"discount-app"},"form-embed":{deprecatedFeature:"discount-app"},"shop-lead-capture":{feature:"lead-capture"},"shop-login-button":{feature:"shop-login-button",deprecatedFeature:"login-button"},"shop-pay-button":{feature:"pay-button",deprecatedFeature:"pay-button"},"shopify-payment-terms":{feature:"payment-terms",deprecatedFeature:"payment-terms"},"shop-follow-button":{feature:"shop-follow-button",deprecatedFeature:"login-button"},"shop-pay-payment-request":{deprecatedFeature:"shop-pay-payment-request"},"shop-pay-payment-request-button":{feature:"shop-pay-payment-request-button"}};class hm extends Error{constructor(e){super(`Failed to load lazy loaded web component bundle after detecting element: ${e}`)}}function _m(e,{session:t}={}){if(!function(e){const t=e?"sessionStorage":"localStorage";try{const e=Gd[t],n="__storage_test__";return e.setItem(n,n),e.removeItem(n),!0}catch(e){return!1}}(t))return null;return Gd[t?"sessionStorage":"localStorage"].getItem(e)}const gm="signInWithShop:forceNewClientBundle";const{newFullClientBundleEnabled:fm,deprecatedLoaderFilesEnabled:bm}=function(){var e,t,n;const i=Boolean(null===(n=null===(t=null===(e=Gd.Shopify)||void 0===e?void 0:e.featureAssets)||void 0===t?void 0:t["shop-js"])||void 0===n?void 0:n["shop-follow-button"]),a="true"===_m(gm),o=!i&&a,s=i||a;return o&&console.log(`%c[Shop-JS] %cUsing updated client.js implementation with deprecated bundles. Disable with %cwindow.localStorage.removeItem("${gm}")', 'color:darkorange', 'color:black', 'background: lightgrey`),{newFullClientBundleEnabled:s,deprecatedLoaderFilesEnabled:o}}();fm?function({deprecatedLoaderFilesEnabled:e}){var t;if(!Gd.customElements)return;const n=new wu("full"),i=function(e){var t;try{const n=Hd.documentElement.lang||(null===(t=Gd.Shopify)||void 0===t?void 0:t.locale);if(n){const t=new Intl.Locale(n);if(pm.includes(n))return n;if(pm.includes(t.language))return t.language;e.leaveBreadcrumb(`Unsupported locale: "${n}". Falling back to "en".`,{},"log")}for(const e of Kd.languages){if(pm.includes(e))return e;const t=new Intl.Locale(e);if(pm.includes(t.language))return t.language}}catch(e){}return"en"}(n),o=new Su(i,e,null===(t=Gd.Shopify)||void 0===t?void 0:t.cdnHost);!function(e){Gd.Shopify||(Gd.Shopify={}),Gd.Shopify.SignInWithShop||(Gd.Shopify.SignInWithShop={}),Gd.Shopify.SignInWithShop=new Proxy(Gd.Shopify.SignInWithShop,{get(t,n){const i=dm[n];return n in t||!i?t[n]:(...t)=>a(this,void 0,void 0,(function*(){return yield e.load(i),Gd.Shopify.SignInWithShop[n](...t)}))}})}(o),function(e,t,n){um({onElementFound(i){const a=i.tagName.toLowerCase(),{feature:o,deprecatedFeature:s}=mm[a]||{};return t||!o?s?e.load(s):void n(new hm(a)):o?e.load(o):void n(new hm(a))},selector:Object.keys(mm).join(", ")})}(o,e,(e=>n.notify(e)))}({deprecatedLoaderFilesEnabled:bm}):Boolean(window.customElements)&&(t("shop-discount-auth",ol),t("shop-login-button",dl),t("shop-pay-button",bl),t("shop-pay-button-base",ul),t("shop-swirl",Nd),t("shopify-payment-terms",Pl),t("shop-pay-banner",vd),t("shop-pay-installments-banner",Md),t("shop-follow-button",ip),t("shop-login-default",Dp),t("installments-prequal-overlay-modal",Up),window.customElements&&(customElements.get("shop-user-avatar")||customElements.define("shop-user-avatar",Gp)),window.Shopify||(window.Shopify={}),window.Shopify.SignInWithShop||(window.Shopify.SignInWithShop={initCustomerAccounts:ui,initCustomerAccountsSignUp:hi,initShopLoginInput:Ci,initShopForNewCustomerAccounts:ka,initShopEmailLookupCoordinator:_i}));const ym={phone_capture:{consent:{title_discount_saved:"Регистрирайте се за текстови съобщения, за да получавате най-актуалните предложения и новини",title_discount_not_saved:"Почти сте готови. Регистрирайте се за текстови съобщения, за да запишете отстъпката.",confirm_button:"Влизане с {phone}",decline_button:"Не искам текстови съобщения",disclosure_heading:"Разкриване на информация чрез SMS от {merchantName}"},consent_confirmed:{title:"Към текстовите съобщения",description:"Отговорете на текстовото съобщение, изпратено на {phone}, за да се запишете. Вашият код за отстъпка ще бъде приложен автоматично при плащането."},consent_declined:{title:"Няма да получавате текстови съобщения от {merchantName}",description:"Вашият код за отстъпка ще бъде приложен автоматично при плащането."}},personalization_consent:{title:"Ако искате да запазите отстъпката, синхронизирайте вашите дейности при пазаруване"},auth_modal:{login_sms_description:"Въведете кода, който изпратихме на {phoneNumber}",login_email_description:"Въведете кода, изпратен на вашия имейл адрес – {email}",login_webauthn_description:"Влезте с парола, за да използвате безопасно своята записана информация."}};var vm={shop_discount_auth:ym},km=Object.freeze({__proto__:null,default:vm,shop_discount_auth:ym});const wm={phone_capture:{consent:{title_discount_saved:"Přihlaste se k odběru SMS zpráv a získejte nejnovější nabídky a aktualizace",title_discount_not_saved:"Už to skoro je. Přihlaste se k odběru SMS zpráv a získejte slevu.",confirm_button:"Zaregistrovat se s tel. {phone}",decline_button:"Nechci dostávat SMS zprávy",disclosure_heading:"Zpřístupnění SMS zpráv od obchodníka {merchantName}"},consent_confirmed:{title:"Přejděte ke svým textovým zprávám",description:"Udělte souhlas tak, že odpovíte na textovou zprávu odeslanou na telefon {phone}. Slevový kód se automaticky uplatní na pokladně."},consent_declined:{title:"Nebudete dostávat textové zprávy od obchodu {merchantName}",description:"Slevový kód se automaticky uplatní na pokladně."}},personalization_consent:{title:"Pokud chcete uložit slevu, synchronizujte si nákupní aktivitu"},auth_modal:{login_sms_description:"Zadejte kód odeslaný na telefonní číslo {phoneNumber}",login_email_description:"Zadejte kód, který jsme vám poslali na e-mailovou adresu {email}",login_webauthn_description:"Přihlaste se přístupovým klíčem, abyste mohli bezpečně používat uložené informace."}};var Pm={shop_discount_auth:wm},Sm=Object.freeze({__proto__:null,default:Pm,shop_discount_auth:wm});const zm={phone_capture:{consent:{title_discount_saved:"Tilmeld dig sms'er for at få de seneste tilbud og opdateringer.",title_discount_not_saved:"Du er der næsten. Tilmeld dig sms'er for at få din rabat.",confirm_button:"Tilmeld dig med {phone}",decline_button:"Jeg vil ikke modtage sms'er",disclosure_heading:"Sms-aftale for {merchantName}"},consent_confirmed:{title:"Gå til dine sms'er",description:"Besvar tekstbeskeden sendt til {phone} for at tilmelde dig. Din rabatkode anvendes automatisk på betalingssiden."},consent_declined:{title:"Du vil ikke modtage sms'er fra {merchantName}",description:"Din rabatkode anvendes automatisk på betalingssiden."}},personalization_consent:{title:"For at gemme din rabat skal du synkronisere din shoppingaktivitet"},auth_modal:{login_sms_description:"Angiv den kode, der er sendt til {phoneNumber}",login_email_description:"Angiv den kode, der er sendt til din mailadresse {email}",login_webauthn_description:"Log ind med en adgangsnøgle for sikkert at bruge dine gemte oplysninger."}};var jm={shop_discount_auth:zm},Cm=Object.freeze({__proto__:null,default:jm,shop_discount_auth:zm});const xm={phone_capture:{consent:{title_discount_saved:"Registriere dich für Textnachrichten, um aktuelle Angebote und Updates zu erhalten",title_discount_not_saved:"Fast fertig. Registriere dich für Textnachrichten, um den Rabatt zu speichern.",confirm_button:"Mit {phone} registrieren",decline_button:"Ich möchte keine Textnachrichten erhalten",disclosure_heading:"SMS-Auskunft von {merchantName}"},consent_confirmed:{title:"Gehe zu deinen Textnachrichten",description:"Antworte zum Aktivieren auf die Textnachricht, die an {phone} gesendet wurde. Dein Rabattcode wird automatisch beim Checkout angewendet."},consent_declined:{title:"Du erhältst keine SMS-Nachrichten von {merchantName}",description:"Dein Rabattcode wird automatisch beim Checkout angewendet."}},personalization_consent:{title:"Synchronisiere deine Einkaufsaktivität, um deinen Rabatt zu speichern"},auth_modal:{login_sms_description:"Gib den Code ein, der an {phoneNumber} gesendet wurde",login_email_description:"Gib den Code ein, der an deine E-Mail ({email}) gesendet wurde",login_webauthn_description:"Melde dich mit einem Passkey an, um deine gespeicherten Informationen sicher zu nutzen."}};var Lm={shop_discount_auth:xm},Am=Object.freeze({__proto__:null,default:Lm,shop_discount_auth:xm});const Tm={phone_capture:{consent:{title_discount_saved:"Εγγραφείτε για τη λήψη μηνυμάτων, ώστε να λαμβάνετε τις πιο πρόσφατες προσφορές και ενημερώσεις",title_discount_not_saved:"Κοντεύουμε. Εγγραφείτε για τη λήψη μηνυμάτων, ώστε να αποθηκεύσετε την έκπτωση.",confirm_button:"Εγγραφή με {phone}",decline_button:"Δεν θέλω να λαμβάνω μηνύματα",disclosure_heading:"Δήλωση αποποίησης για SMS από {merchantName}"},consent_confirmed:{title:"Μεταβείτε στα μηνύματά σας",description:"Απαντήστε στο μήνυμα που στάλθηκε στον αριθμό {phone} για να δηλώσετε συμμετοχή. Ο κωδικός έκπτωσης θα εφαρμοστεί αυτόματα κατά την ολοκλήρωση της αγοράς."},consent_declined:{title:"Δεν θα λαμβάνετε μηνύματα από τον έμπορο {merchantName}",description:"Ο κωδικός έκπτωσης θα εφαρμοστεί αυτόματα κατά την ολοκλήρωση της αγοράς."}},personalization_consent:{title:"Για να αποθηκεύσετε την έκπτωσή σας, συγχρονίστε τη δραστηριότητα αγορών σας"},auth_modal:{login_sms_description:"Εισαγάγετε τον κωδικό που στάλθηκε στον αριθμό {phoneNumber}",login_email_description:"Εισαγάγετε τον κωδικό που στάλθηκε στη διεύθυνση email {email}",login_webauthn_description:"Συνδεθείτε με κλειδί πρόσβασης για να χρησιμοποιείτε με ασφάλεια τις αποθηκευμένες πληροφορίες σας."}};var Em={shop_discount_auth:Tm},Im=Object.freeze({__proto__:null,default:Em,shop_discount_auth:Tm});const Mm={auth_modal:{login_sms_description:"Enter the code sent to {phoneNumber}",login_email_description:"Enter the code sent to your email, {email}",login_webauthn_description:"Sign in with a passkey to securely use your saved information."},phone_capture:{consent:{title_discount_saved:"Sign up for texts to get the latest offers and updates",title_discount_not_saved:"Almost there. Sign up for texts to save your discount.",confirm_button:"Sign up with {phone}",decline_button:"I don't want texts",disclosure_heading:"SMS Disclosure from {merchantName}"},consent_confirmed:{title:"Head to your texts",description:"Reply to the text sent to {phone} to opt in. Your discount code will be automatically applied at checkout."},consent_declined:{title:"You will not receive texts from {merchantName}",description:"Your discount code will be automatically applied at checkout."}},personalization_consent:{title:"To save your discount, sync your shopping activity"}};var Om={shop_discount_auth:Mm},Nm=Object.freeze({__proto__:null,default:Om,shop_discount_auth:Mm});const qm={phone_capture:{consent:{title_discount_saved:"Regístrate para recibir mensajes que te permitan obtener las ofertas y noticias más recientes",title_discount_not_saved:"Ya casi estás. Regístrate para recibir mensajes que te permitan obtener descuentos.",confirm_button:"Registrarse con {phone}",decline_button:"No quiero mensajes",disclosure_heading:"Información sobre SMS de {merchantName}"},consent_confirmed:{title:"Ir a tus textos",description:"Responde al mensaje de texto enviado a {phone} para suscribirte. El código de descuento se aplicará automáticamente en la pantalla de pago."},consent_declined:{title:"No recibirás textos de {merchantName}",description:"El código de descuento se aplicará automáticamente en la pantalla de pago."}},personalization_consent:{title:"Para guardar tu descuento, sincroniza la actividad de compra"},auth_modal:{login_sms_description:"Ingresa el código enviado a {phoneNumber}.",login_email_description:"Ingresa el código enviado a tu correo electrónico, {email}.",login_webauthn_description:"Inicia sesión con una clave de acceso para usar de forma segura la información guardada."}};var Rm={shop_discount_auth:qm},Dm=Object.freeze({__proto__:null,default:Rm,shop_discount_auth:qm});const Bm={phone_capture:{consent:{title_discount_saved:"Tilaa tekstiviestit, jotta saat tuoreimmat tarjoukset ja päivitykset",title_discount_not_saved:"Melkein valmista. Tilaa tekstiviestit, jotta voit tallentaa alennuksen.",confirm_button:"Kirjaudu käyttämällä palvelua {phone}",decline_button:"En halua tekstiviestejä",disclosure_heading:"Tekstiviesti-ilmoitukset kauppiaalta {merchantName}"},consent_confirmed:{title:"Siirry tekstiviesteihin",description:"Anna suostumuksesi vastaamalla numeroon {phone} lähetettyyn tekstiviestiin. Alennuskoodiasi käytetään automaattisesti kassalla."},consent_declined:{title:"Et saa tekstiviestejä kauppiaalta {merchantName}",description:"Alennuskoodiasi käytetään automaattisesti kassalla."}},personalization_consent:{title:"Tallenna alennus synkronoimalla ostotoimintasi"},auth_modal:{login_sms_description:"Syötä numeroon {phoneNumber} lähetetty koodi",login_email_description:"Syötä sähköpostiisi {email} lähetetty koodi",login_webauthn_description:"Kirjaudu sisään todentamisavaimella, jotta voit käyttää tallennettuja tietojasi turvallisesti."}};var Fm={shop_discount_auth:Bm},Vm=Object.freeze({__proto__:null,default:Fm,shop_discount_auth:Bm});const $m={phone_capture:{consent:{title_discount_saved:"Inscrivez-vous aux SMS pour recevoir les dernières offres et nouvelles",title_discount_not_saved:"Nous y sommes presque. Inscrivez-vous aux SMS pour enregistrer votre réduction",confirm_button:"S’inscrire avec {phone}",decline_button:"Je ne veux pas de SMS",disclosure_heading:"Divulgation de {merchantName} en matière de SMS"},consent_confirmed:{title:"Accédez à vos SMS",description:"Répondez au SMS envoyé au {phone} pour vous abonner. Votre code de réduction sera automatiquement appliqué à l’étape du paiement."},consent_declined:{title:"Vous ne recevrez pas de SMS de {merchantName}",description:"Votre code de réduction sera automatiquement appliqué lors du paiement."}},personalization_consent:{title:"Pour enregistrer votre réduction, synchronisez votre activité d’achat"},auth_modal:{login_sms_description:"Saisissez le code envoyé à {phoneNumber}",login_email_description:"Saisissez le code envoyé à votre adresse e-mail, {email}",login_webauthn_description:"Connectez-vous avec une clé d’accès pour accéder à vos informations enregistrées en toute sécurité."}};var Wm={shop_discount_auth:$m},Um=Object.freeze({__proto__:null,default:Wm,shop_discount_auth:$m});const Hm={phone_capture:{consent:{title_discount_saved:"टेक्स्ट मैसेज के ज़रिए लेटेस्ट ऑफ़र और अपडेट पाने के लिए साइन अप करें",title_discount_not_saved:"बस हो ही गया. टेक्स्ट मैसेज पाने के लिए साइन अप करें ताकि अपनी डिस्काउंट सेव कर सकें.",confirm_button:"{phone} से साइन अप करें",decline_button:"मुझे टेक्स्ट मैसेज नहीं चाहिए",disclosure_heading:"{merchantName} की ओर से SMS डिस्क्लोज़र"},consent_confirmed:{title:"अपने टेक्स्ट मैसेज पर जाएं",description:"शामिल होने के लिए {phone} पर भेजे गए टेक्स्ट मैसेज का जवाब दें. चेकआउट के समय आपका डिस्काउंट कोड अपने आप लागू हो जाएगा."},consent_declined:{title:"आपको {merchantName} की ओर से टेक्स्ट मैसेज नहीं मिलेगा",description:"चेकआउट के समय आपका डिस्काउंट कोड अपने आप लागू हो जाएगा."}},personalization_consent:{title:"अपना डिस्काउंट सेव करने के लिए, अपनी शॉपिंग एक्टिविटी को सिंक करें"},auth_modal:{login_sms_description:"{phoneNumber} पर भेजा गया कोड डालें",login_email_description:"आपके ईमेल, {email} पर भेजा गया कोड डालें",login_webauthn_description:"अपनी सेव की गई जानकारी के सुरक्षित इस्तेमाल के लिए passkey से साइन इन करें."}};var Km={shop_discount_auth:Hm},Zm=Object.freeze({__proto__:null,default:Km,shop_discount_auth:Hm});const Gm={phone_capture:{consent:{title_discount_saved:"Prijavite se za primanje tekstnih poruka kako biste dobivali najnovije ponude i novosti",title_discount_not_saved:"Još malo i gotovo. Prijavite se za primanje tekstnih poruka kako biste spremili popust.",confirm_button:"Prijavite se rabeći {phone}",decline_button:"Ne želim primati tekstne poruke",disclosure_heading:"SMS poruke od trgovine {merchantName}"},consent_confirmed:{title:"Otvorite SMS poruke",description:"Odgovorite na SMS poslan na broj {phone} za potvrdu. Kod za popust automatski će se primijeniti prilikom plaćanja."},consent_declined:{title:"Nećete dobivati SMS-ove iz trgovine {merchantName}",description:"Kod za popust automatski će se primijeniti prilikom plaćanja."}},personalization_consent:{title:"Ako želite spremiti popust, sinkronizirajte svoju aktivnost kupnje"},auth_modal:{login_sms_description:"Unesite kod koji smo poslali na broj {phoneNumber}",login_email_description:"Unesite kod koji ste dobili e-poštom na adresu {email}",login_webauthn_description:"Prijavite se rabeći Passkey ako želite sigurno upotrebljavati spremljene informacije."}};var Jm={shop_discount_auth:Gm},Ym=Object.freeze({__proto__:null,default:Jm,shop_discount_auth:Gm});const Qm={phone_capture:{consent:{title_discount_saved:"Iratkozz fel az SMS-ekre, hogy értesülj az új ajánlatokról és hírekről!",title_discount_not_saved:"Már majdnem elkészültél. Iratkozz az SMS-ekre, hogy megőrizd a kedvezményedet!",confirm_button:"Feliratkozom ezzel a számmal: {phone}",decline_button:"Nem kérek SMS-eket",disclosure_heading:"A(z) {merchantName} tájékoztatója az SMS-ekről"},consent_confirmed:{title:"Az SMS-ek megnyitása",description:"Iratkozz fel az erre a számra küldött SMS megválaszolásával: {phone}. A pénztárnál automatikusan alkalmazza a rendszer a kedvezménykódot."},consent_declined:{title:"Nem fogsz SMS-t kapni tőle: {merchantName}",description:"A pénztárnál automatikusan alkalmazza a rendszer a kedvezménykódot."}},personalization_consent:{title:"A kedvezmény mentéséhez szinkronizáld a vásárlási tevékenységedet"},auth_modal:{login_sms_description:"Írd be a kódot, amit erre a számra küldtünk: {phoneNumber}",login_email_description:"Írd be azt a kódot, amelyet az e-mail-címedre ({email}) küldtünk",login_webauthn_description:"Jelentkezz be passkey kóddal, hogy biztonságosan használhasd a mentett adataidat."}};var Xm={shop_discount_auth:Qm},eh=Object.freeze({__proto__:null,default:Xm,shop_discount_auth:Qm});const th={phone_capture:{consent:{title_discount_saved:"Daftar SMS untuk mendapatkan penawaran dan pembaruan terkini",title_discount_not_saved:"Hampir selesai. Daftar SMS untuk menyimpan diskon Anda.",confirm_button:"Daftar dengan {phone}",decline_button:"Saya tidak menginginkan SMS",disclosure_heading:"Pengungkapan SMS dari {merchantName}"},consent_confirmed:{title:"Lihat SMS Anda",description:"Balas pesan yang dikirim ke {phone} untuk menyetujui. Kode diskon Anda akan otomatis diterapkan saat checkout."},consent_declined:{title:"Anda tidak akan menerima SMS dari {merchantName}",description:"Kode diskon Anda akan otomatis diterapkan saat checkout."}},personalization_consent:{title:"Untuk menyimpan diskon, sinkronkan aktivitas belanja Anda"},auth_modal:{login_sms_description:"Masukkan kode yang dikirim ke {phoneNumber}",login_email_description:"Masukkan kode yang dikirim ke email Anda, {email}",login_webauthn_description:"Masuk dengan passkey untuk menggunakan informasi yang disimpan dengan aman."}};var nh={shop_discount_auth:th},ih=Object.freeze({__proto__:null,default:nh,shop_discount_auth:th});const ah={phone_capture:{consent:{title_discount_saved:"Iscriviti ai messaggi di testo per ricevere le ultime offerte e gli ultimi aggiornamenti",title_discount_not_saved:"Ci sei quasi. Iscriviti ai messaggi di testo per salvare il tuo sconto.",confirm_button:"Iscriviti con il numero {phone}",decline_button:"Non voglio ricevere messaggi",disclosure_heading:"Informativa sugli SMS di {merchantName}"},consent_confirmed:{title:"Titolo dei messaggi",description:"Rispondi all'SMS inviato a {phone} per acconsentire esplicitamente. Il codice sconto verrà applicato automaticamente al momento del check-out."},consent_declined:{title:"Non riceverai messaggi da {merchantName}",description:"Il codice sconto verrà applicato automaticamente al momento del check-out."}},personalization_consent:{title:"Sincronizza l'attività di shopping per salvare lo sconto"},auth_modal:{login_sms_description:"Inserisci il codice inviato a {phoneNumber}",login_email_description:"Inserisci il codice inviato al tuo indirizzo email, {email}",login_webauthn_description:"Accedi con una chiave di accesso per utilizzare le informazioni salvate in sicurezza."}};var oh={shop_discount_auth:ah},sh=Object.freeze({__proto__:null,default:oh,shop_discount_auth:ah});const rh={phone_capture:{consent:{title_discount_saved:"テキストに登録して、最新のオファーとアップデートを入手する",title_discount_not_saved:"もうすぐです。テキストに登録して、ディスカウントを保存します。",confirm_button:"{phone}で登録",decline_button:"テキストは要らない",disclosure_heading:"{merchantName}からのSMS開示"},consent_confirmed:{title:"テキストにアクセスする",description:"{phone}に送信されたテキストに返信してオプトインしてください。チェックアウト時にクーポンコードが自動的に適用されます。"},consent_declined:{title:"{merchantName}からのテキストは届きません",description:"チェックアウト時にクーポンコードが自動的に適用されます。"}},personalization_consent:{title:"ディスカウントを保存するには、ショッピングアクティビティを同期してください"},auth_modal:{login_sms_description:"{phoneNumber}に送信されたコードを入力してください",login_email_description:"メール ({email}) に送信されたコードを入力してください",login_webauthn_description:"保存した情報を安全に使用するには、パスキーを使用してログインします。"}};var lh={shop_discount_auth:rh},ch=Object.freeze({__proto__:null,default:lh,shop_discount_auth:rh});const ph={phone_capture:{consent:{title_discount_saved:"문자에 등록하고 최신 혜택 및 업데이트를 받으세요",title_discount_not_saved:"거의 다 되었습니다. 할인을 저장하려면 문자에 등록하세요.",confirm_button:"{phone}(으)로 등록",decline_button:"문자를 원하지 않습니다",disclosure_heading:"{merchantName}의 SMS 공개 조항"},consent_confirmed:{title:"문자로 이동",description:"옵트인하려면 {phone}(으)로 전송된 문자에 회신하세요. 결제 시 할인 코드가 자동으로 적용됩니다."},consent_declined:{title:"{merchantName}(으)로부터 문자를 받지 않습니다",description:"결제 시 할인 코드가 자동으로 적용됩니다."}},personalization_consent:{title:"할인을 저장하려면 쇼핑 활동을 동기화하세요"},auth_modal:{login_sms_description:"{phoneNumber}(으)로 전송된 코드를 입력하세요",login_email_description:"이메일({email})로 전송된 코드를 입력하세요",login_webauthn_description:"패스키로 로그인하여 저장된 정보를 안전하게 사용하세요."}};var dh={shop_discount_auth:ph},uh=Object.freeze({__proto__:null,default:dh,shop_discount_auth:ph});const mh={phone_capture:{consent:{title_discount_saved:"Užsiprenumeruokite tekstinius pranešimus, kad gautumėte naujausius pasiūlymus ir atnaujinimus",title_discount_not_saved:"Beveik baigta. Užsiprenumeruokite tekstinius pranešimus, kad išsaugotumėte nuolaidą.",confirm_button:"Užsiregistruokite naudodami {phone}",decline_button:"Aš nenoriu tekstinių pranešimų",disclosure_heading:"SMS pranešimo atskleidimas iš {merchantName}"},consent_confirmed:{title:"Eikite į savo tekstinius pranešimus",description:"Atsakykite į žinutę, atsiųstą į {phone}, kad pasirinktumėte. Jūsų nuolaidos kodas bus automatiškai pritaikytas atsiskaitant."},consent_declined:{title:"Tekstinių pranešimų iš {merchantName} negausite",description:"Jūsų nuolaidos kodas bus automatiškai pritaikytas atsiskaitant."}},personalization_consent:{title:"Norėdami išsaugoti savo nuolaidą, sinchronizuokite savo apsipirkimo veiksmus"},auth_modal:{login_sms_description:"Įveskite kodą, išsiųstą {phoneNumber}",login_email_description:"Įveskite kodą, išsiųstą į jūsų el. paštą {email}",login_webauthn_description:"Prisijunkite su prieigos raktu „Passkey“, kad galėtumėte saugiai naudotis savo išsaugota informacija."}};var hh={shop_discount_auth:mh},_h=Object.freeze({__proto__:null,default:hh,shop_discount_auth:mh});const gh={phone_capture:{consent:{title_discount_saved:"Daftar untuk menerima teks bagi menerima tawaran dan kemaskinian terkini",title_discount_not_saved:"Hampir selesai. Daftar untuk menerima teks bagi menyimpan diskaun anda.",confirm_button:"Daftar dengan {phone}",decline_button:"Saya tidak mahu menerima teks.",disclosure_heading:"Pendedahan SMS daripada {merchantName}"},consent_confirmed:{title:"Pergi ke teks anda",description:"Balas mesej teks yang dihantar kepada {phone} untuk memilih masuk. Kod diskaun anda akan digunakan secara automatik semasa daftar keluar."},consent_declined:{title:"Anda tidak akan menerima mesej teks daripada {merchantName}",description:"Kod diskaun anda akan digunakan secara automatik semasa daftar keluar."}},personalization_consent:{title:"Untuk menyimpan diskaun anda, segerakan aktiviti beli-belah anda"},auth_modal:{login_sms_description:"Masukkan kod yang dihantar ke {phoneNumber}",login_email_description:"Masukkan kod yang dihantar ke e-mel anda, {email}",login_webauthn_description:"Daftar masuk dengan passkey untuk menyimpan maklumat anda secara selamat."}};var fh={shop_discount_auth:gh},bh=Object.freeze({__proto__:null,default:fh,shop_discount_auth:gh});const yh={phone_capture:{consent:{title_discount_saved:"Registrer deg for å få siste nytt om tilbud og oppdateringer",title_discount_not_saved:"Nesten i mål. Registrer deg for å få tekstmeldinger og lagre rabatten.",confirm_button:"Registrer deg med {phone}",decline_button:"Jeg ønsker ikke tekstmeldinger",disclosure_heading:"SMS-fremlegging fra {merchantName}"},consent_confirmed:{title:"Gå til tekstmeldinger",description:"Svar på tekstmeldingen som ble sendt til {phone} for å registrere deg. Rabattkoden blir automatisk lagt til i kassen."},consent_declined:{title:"Du får ikke tekstmeldinger fra {merchantName}",description:"Rabattkoden blir automatisk lagt til i kassen."}},personalization_consent:{title:"For å lagre rabatten må du synkronisere handleaktiviteten"},auth_modal:{login_sms_description:"Angi koden som er sendt til {phoneNumber}",login_email_description:"Skriv inn koden som ble sendt til e-posten din, {email}",login_webauthn_description:"Logg inn med en passkey for sikker bruk av lagret informasjon."}};var vh={shop_discount_auth:yh},kh=Object.freeze({__proto__:null,default:vh,shop_discount_auth:yh});const wh={phone_capture:{consent:{title_discount_saved:"Meld je aan voor sms-berichten om de nieuwste aanbiedingen en updates te krijgen",title_discount_not_saved:"Je bent er bijna. Meld je aan voor sms-berichten om je korting op te slaan.",confirm_button:"Aanmelden met {phone}",decline_button:"Ik wil geen sms-berichten ontvangen",disclosure_heading:"Sms-verklaring van {merchantName}"},consent_confirmed:{title:"Naar sms-berichten",description:"Beantwoord de sms die naar {phone} is gestuurd om toestemming te geven. Je kortingscode wordt automatisch toegepast bij de checkout."},consent_declined:{title:"Je ontvangt geen berichten van {merchantName}",description:"De kortingscode wordt automatisch toegepast bij de checkout."}},personalization_consent:{title:"Je winkelactiviteiten synchroniseren om je korting op te slaan"},auth_modal:{login_sms_description:"Voer de code in die naar {phoneNumber} is gestuurd.",login_email_description:"Voer de code in die naar je e-mailadres ({email}) is gestuurd.",login_webauthn_description:"Log in met een passkey om de opgeslagen informatie veilig te gebruiken."}};var Ph={shop_discount_auth:wh},Sh=Object.freeze({__proto__:null,default:Ph,shop_discount_auth:wh});const zh={phone_capture:{consent:{title_discount_saved:"Zapisz się na wiadomości tekstowe, aby otrzymywać najnowsze oferty i aktualizacje",title_discount_not_saved:"Prawie gotowe. Zapisz się na wiadomości tekstowe, aby zachować swój rabat.",confirm_button:"Zarejestruj się za pomocą {phone}",decline_button:"Nie chcę otrzymywać wiadomości tekstowych",disclosure_heading:"Oświadczenie dotyczące wiadomości SMS od {merchantName}"},consent_confirmed:{title:"Idź do wiadomości tekstowych",description:"Odpowiedz na wiadomość tekstową wysłaną na telefon {phone}, aby wyrazić zgodę. Twój kod rabatowy zostanie automatycznie zastosowany podczas realizacji zakupu."},consent_declined:{title:"Nie będziesz otrzymywać wiadomości od {merchantName}",description:"Twój kod rabatowy zostanie automatycznie zastosowany podczas realizacji zakupu."}},personalization_consent:{title:"Aby zapisać rabat, zsynchronizuj swoją aktywność zakupową"},auth_modal:{login_sms_description:"Wprowadź kod wysłany na adres {phoneNumber}.",login_email_description:"Wpisz kod wysłany na Twój adres e-mail: {email}",login_webauthn_description:"Zaloguj się za pomocą klucza dostępu, aby bezpiecznie korzystać z zapisanych informacji."}};var jh={shop_discount_auth:zh},Ch=Object.freeze({__proto__:null,default:jh,shop_discount_auth:zh});const xh={phone_capture:{consent:{title_discount_saved:"Inscreva-se para receber mensagens com as ofertas e atualizações mais recentes",title_discount_not_saved:"Quase lá. Inscreva-se para receber mensagens e salvar seu desconto.",confirm_button:"Inscrever-se com {phone}",decline_button:"Não quero receber mensagens de texto",disclosure_heading:"Divulgação sobre SMS da {merchantName}"},consent_confirmed:{title:"Vá para suas mensagens de texto",description:"Responda à mensagem de texto enviada para {phone} para ativar. O código de desconto será aplicado automaticamente no checkout."},consent_declined:{title:"Você não receberá mensagens de {merchantName}",description:"O código de desconto será aplicado automaticamente no checkout."}},personalization_consent:{title:"Para salvar o desconto, sincronize a atividade de compra"},auth_modal:{login_sms_description:"Insira o código enviado para {phoneNumber}",login_email_description:"Insira o código enviado para o e-mail {email}",login_webauthn_description:"Faça login com uma chave de acesso para usar as informações salvas de forma segura."}};var Lh={shop_discount_auth:xh},Ah=Object.freeze({__proto__:null,default:Lh,shop_discount_auth:xh});const Th={phone_capture:{consent:{title_discount_saved:"Registe-se para mensagens textos e para conseguir as mais recentes ofertas e atualizações",title_discount_not_saved:"Quase lá. Registe-se para mensagens textos para guardar o seu desconto.",confirm_button:"Criar conta com {phone}",decline_button:"Não quero textos",disclosure_heading:"Divulgação de SMS de {merchantName}"},consent_confirmed:{title:"Dirija-se às suas mensagens de texto",description:"Responda à mensagem enviada para {phone} para optar ativamente por participar. O seu código de desconto será automaticamente aplicado na finalização da compra."},consent_declined:{title:"Não receberá mensagens de {merchantName}",description:"O seu código de desconto será automaticamente aplicado na finalização da compra."}},personalization_consent:{title:"Para guardar o seu desconto, sincronize a sua atividade de compra"},auth_modal:{login_sms_description:"Introduza o código enviado para {phoneNumber}",login_email_description:"Introduza o código enviado para o seu e-mail, {email}",login_webauthn_description:"Inicie sessão com uma chave de acesso para utilizar em segurança as suas informações guardadas."}};var Eh={shop_discount_auth:Th},Ih=Object.freeze({__proto__:null,default:Eh,shop_discount_auth:Th});const Mh={phone_capture:{consent:{title_discount_saved:"Înscrie-te pentru mesaje text pentru a primi cele mai recente oferte și actualizări",title_discount_not_saved:"Aproape ai terminat. Înscrie-te pentru mesaje text pentru a salva reducerea.",confirm_button:"Înregistrează-te cu {phone}",decline_button:"Nu vreau mesaje text",disclosure_heading:"Dezvăluire privind mesajele SMS de la {merchantName}"},consent_confirmed:{title:"Accesează secțiunea pentru mesaje text",description:"Răspunde la mesajul text trimis la {phone} pentru a te înscrie. Codul de reducere va fi aplicat automat la finalizarea comenzii."},consent_declined:{title:"Nu vei primi mesaje text de la {merchantName}",description:"Codul de reducere va fi aplicat automat la finalizarea comenzii."}},personalization_consent:{title:"Pentru a salva reducerea, sincronizează activitatea de cumpărături"},auth_modal:{login_sms_description:"Introdu codul trimis la {phoneNumber}",login_email_description:"Introdu codul trimis la adresa ta de e-mail, {email}",login_webauthn_description:"Conectează-te cu o cheie de acces pentru a folosi în siguranță informațiile salvate."}};var Oh={shop_discount_auth:Mh},Nh=Object.freeze({__proto__:null,default:Oh,shop_discount_auth:Mh});const qh={phone_capture:{consent:{title_discount_saved:"Подпишитесь на рассылку с актуальными новостями и предложениями",title_discount_not_saved:"Почти готово. Подпишитесь на рассылку, чтобы сохранить скидку.",confirm_button:"Подписаться с номером {phone}",decline_button:"Я не хочу получать сообщения",disclosure_heading:"Соглашение об SMS-рассылке от {merchantName}"},consent_confirmed:{title:"Откройте сообщения",description:"Ответьте на сообщение, отправленное на номер {phone}, чтобы согласиться. Ваш промокод будет автоматически применен при оформлении заказа."},consent_declined:{title:"Вы не получите сообщение от {merchantName}",description:"Ваш промокод будет автоматически применен при оформлении заказа."}},personalization_consent:{title:"Чтобы сохранить скидку, синхронизируйте свои действия в магазине"},auth_modal:{login_sms_description:"Введите код, отправленный на номер тел.: {phoneNumber}",login_email_description:"Введите код, отправленный на ваш адрес электронной почты {email}",login_webauthn_description:"Войдите с помощью ключа доступа, чтобы безопасно использовать ваши сохраненные данные."}};var Rh={shop_discount_auth:qh},Dh=Object.freeze({__proto__:null,default:Rh,shop_discount_auth:qh});const Bh={phone_capture:{consent:{title_discount_saved:"Zaregistrujte sa na odber najnovších ponúk a aktuálnych informácií",title_discount_not_saved:"Takmer hotovo. Zaregistrujte sa na odber textových správ a ukladajte si zľavy.",confirm_button:"Zaregistrovať sa pomocou telefónu {phone}",decline_button:"Nechcem dostávať textové správy",disclosure_heading:"Sprístupnenie SMS správ od obchodníka {merchantName}"},consent_confirmed:{title:"Prejdite do svojich textových správ",description:"Aktivujte túto možnosť odpoveďou na textovú správu odoslanú na telefónne číslo {phone}. Váš zľavový kód sa automaticky uplatní pri pokladni."},consent_declined:{title:"Nebudete dostávať textové správy od obchodníka {merchantName}",description:"Váš zľavový kód sa automaticky uplatní pri pokladni."}},personalization_consent:{title:"Ak chcete uložiť zľavu, synchronizujte svoju nákupnú aktivitu"},auth_modal:{login_sms_description:"Zadajte kód, ktorý ste dostali na číslo {phoneNumber}",login_email_description:"Zadajte kód, ktorý ste dostali na e-mail {email}",login_webauthn_description:"Prihláste sa pomocou kľúča Passkey, aby ste mohli bezpečne používať uložené informácie."}};var Fh={shop_discount_auth:Bh},Vh=Object.freeze({__proto__:null,default:Fh,shop_discount_auth:Bh});const $h={phone_capture:{consent:{title_discount_saved:"Prijavite se na prejemanje sporočil, da prejmete najnovejše ponudbe in posodobitve",title_discount_not_saved:"Skoraj smo končali. Prijavite se na prejemanje sporočil, da shranite popust.",confirm_button:"Prijavite se s {phone}",decline_button:"Ne želim sporočil",disclosure_heading:"SMS-klavzula trgovine {merchantName}"},consent_confirmed:{title:"Odprite sporočila",description:"Za potrditev odgovorite na besedilno sporočilo, poslano na {phone}. Vaša koda za popust bo ob zaključku nakupa samodejno uporabljena"},consent_declined:{title:"Ne boste prejemali sporočil trgovca {merchantName}",description:"Vaša koda za popust bo ob zaključku nakupa samodejno uporabljena"}},personalization_consent:{title:"Če želite shraniti svoj popust, sinhronizirajte svoje nakupe"},auth_modal:{login_sms_description:"Vnesite kodo, ki je bila poslana na {phoneNumber}",login_email_description:"Vnesite kodo, ki je bila poslana na vaš e-poštni naslov, {email}",login_webauthn_description:"Za varno uporabo svojih shranjenih podatkov se vpišite s ključem."}};var Wh={shop_discount_auth:$h},Uh=Object.freeze({__proto__:null,default:Wh,shop_discount_auth:$h});const Hh={phone_capture:{consent:{title_discount_saved:"Registrera dig för sms-meddelanden för att få senaste de erbjudandena och uppdateringarna",title_discount_not_saved:"Nästan klart. Registrera dig för sms-meddelanden för att spara din rabatt.",confirm_button:"Registrera dig med {phone}",decline_button:"Jag vill inte ha sms",disclosure_heading:"SMS-upplysningar från {merchantName}"},consent_confirmed:{title:"Gå till dina sms",description:"Anmäl dig genom att svara på sms:et som skickades till {phone}. Din rabattkod tillämpas automatiskt i kassan."},consent_declined:{title:"Du kommer inte att få textmeddelanden från {merchantName}",description:"Din rabattkod tillämpas automatiskt i kassan."}},personalization_consent:{title:"Synkronisera din shoppingaktivitet för att spara din rabatt"},auth_modal:{login_sms_description:"Ange koden som skickats till {phoneNumber}",login_email_description:"Ange koden som skickats till din e-postadress, {email}",login_webauthn_description:"Logga in med en huvudnyckel för att använda din sparade information på ett säkert sätt."}};var Kh={shop_discount_auth:Hh},Zh=Object.freeze({__proto__:null,default:Kh,shop_discount_auth:Hh});const Gh={phone_capture:{consent:{title_discount_saved:"ลงทะเบียนรับข้อความเพื่อรับข้อเสนอและการอัปเดตล่าสุด",title_discount_not_saved:"ใกล้เสร็จสิ้นแล้ว ลงทะเบียนรับข้อความเพื่อบันทึกส่วนลดของคุณ",confirm_button:"ลงทะเบียนด้วย {phone}",decline_button:"ฉันไม่ต้องการข้อความ",disclosure_heading:"การเปิดเผย SMS จาก {merchantName}"},consent_confirmed:{title:"หัวเรื่องไปยังข้อความของคุณ",description:"ตอบกลับข้อความที่ส่งไปยัง {phone} เพื่อเลือกใช้ ระบบจะใช้รหัสส่วนลดของคุณโดยอัตโนมัติที่ขั้นตอนการชำระเงิน"},consent_declined:{title:"คุณจะไม่ได้รับข้อความจาก {merchantName}",description:"ระบบจะใช้รหัสส่วนลดของคุณโดยอัตโนมัติที่ขั้นตอนการชำระเงิน"}},personalization_consent:{title:"หากต้องการบันทึกส่วนลด ให้ซิงค์กิจกรรมการเลือกซื้อของคุณ"},auth_modal:{login_sms_description:"ป้อนรหัสที่ส่งไปยัง {phoneNumber}",login_email_description:"ป้อนรหัสที่ส่งไปยังอีเมล {email}",login_webauthn_description:"ลงชื่อเข้าใช้ด้วยพาสคีย์เพื่อใช้ข้อมูลของคุณที่บันทึกไว้อย่างปลอดภัย"}};var Jh={shop_discount_auth:Gh},Yh=Object.freeze({__proto__:null,default:Jh,shop_discount_auth:Gh});const Qh={phone_capture:{consent:{title_discount_saved:"En son teklif ve güncellemeleri almak için mesajlara kaydolun",title_discount_not_saved:"Neredeyse bitti. İndiriminizi kaydetmek için mesajlara kaydolun.",confirm_button:"{phone} ile kaydol",decline_button:"Mesaj almak istemiyorum",disclosure_heading:"{merchantName} adlı satıcıdan SMS ile beyan"},consent_confirmed:{title:"Mesajlarınıza gidin",description:"Etkinleştirmek için {phone} numaralı telefona gönderilen kısa mesajı yanıtlayın. İndirim kodunuz ödeme sırasında otomatik olarak uygulanır."},consent_declined:{title:"{merchantName} satıcısından kısa mesaj almayacaksınız",description:"İndirim kodunuz ödeme sırasında otomatik olarak uygulanır."}},personalization_consent:{title:"İndiriminizi kaydetmek için alışveriş etkinliklerinizi senkronize edin"},auth_modal:{login_sms_description:"{phoneNumber} numaralı telefona gönderilen kodu girin",login_email_description:"E-posta adresinize ({email}) gönderilen kodu girin",login_webauthn_description:"Kayıtlı bilgilerinizi güvenli bir şekilde kullanmak için bir geçiş anahtarıyla giriş yapın."}};var Xh={shop_discount_auth:Qh},e_=Object.freeze({__proto__:null,default:Xh,shop_discount_auth:Qh});const t_={phone_capture:{consent:{title_discount_saved:"Đăng ký nhận tin nhắn để nhận các ưu đãi và thông tin cập nhật mới nhất",title_discount_not_saved:"Sắp hoàn tất. Đăng ký nhận tin nhắn để lưu ưu đãi giảm giá.",confirm_button:"Đăng ký bằng {phone}",decline_button:"Tôi không muốn nhận tin nhắn",disclosure_heading:"Thông tin công khai qua SMS từ {merchantName}"},consent_confirmed:{title:"Kiểm tra tin nhắn của bạn",description:"Phản hồi tin nhắn được gửi đến {phone} để chọn sử dụng. Mã giảm giá của bạn sẽ được tự động áp dụng khi thanh toán."},consent_declined:{title:"Bạn sẽ không nhận được tin nhắn văn bản từ {merchantName}",description:"Mã giảm giá của bạn sẽ được tự động áp dụng khi thanh toán."}},personalization_consent:{title:"Để lưu ưu đãi giảm giá, hãy đồng bộ hóa hoạt động mua sắm"},auth_modal:{login_sms_description:"Nhập mã được gửi đến {phoneNumber}",login_email_description:"Nhập mã bạn nhận được qua email, {email}",login_webauthn_description:"Đăng nhập bằng passkey để sử dụng thông tin đã lưu một cách an toàn."}};var n_={shop_discount_auth:t_},i_=Object.freeze({__proto__:null,default:n_,shop_discount_auth:t_});const a_={phone_capture:{consent:{title_discount_saved:"注册接收短信以获得最新优惠和更新",title_discount_not_saved:"即将成功。注册接收短信以保存您的折扣。",confirm_button:"使用 {phone} 注册",decline_button:"我不想接收短信",disclosure_heading:"来自 {merchantName} 的短信推送"},consent_confirmed:{title:"进入短信界面",description:"回复发送到 {phone} 的短信即可选择加入。您的折扣码将在结账时自动应用。"},consent_declined:{title:"您将不会收到 {merchantName} 发送的短信",description:"您的折扣码将在结账时自动应用。"}},personalization_consent:{title:"若要保存折扣，请同步您的购物活动"},auth_modal:{login_sms_description:"请输入发送到 {phoneNumber} 的代码",login_email_description:"请输入发送到您的邮箱 {email} 的代码",login_webauthn_description:"使用密钥登录以安全地使用您保存的信息。"}};var o_={shop_discount_auth:a_},s_=Object.freeze({__proto__:null,default:o_,shop_discount_auth:a_});const r_={phone_capture:{consent:{title_discount_saved:"訂閱簡訊以取得最新消息與優惠活動",title_discount_not_saved:"快完成了。訂閱簡訊以儲存您的折扣。",confirm_button:"使用 {phone} 訂閱",decline_button:"我不想收到簡訊",disclosure_heading:"{merchantName} 的簡訊揭露聲明"},consent_confirmed:{title:"查看簡訊",description:"回覆發送至 {phone} 的簡訊以加入。系統會在您結帳時自動套用折扣代碼。"},consent_declined:{title:"您將不會收到 {merchantName} 的簡訊",description:"系統會在您結帳時自動套用折扣代碼。"}},personalization_consent:{title:"若要儲存折扣，請同步您的購物活動"},auth_modal:{login_sms_description:"輸入傳送至 {phoneNumber} 的代碼",login_email_description:"請輸入傳送到您電子郵件 ({email}) 的代碼",login_webauthn_description:"使用密碼金鑰登入以安全使用您儲存的詳細資訊。"}};var l_={shop_discount_auth:r_},c_=Object.freeze({__proto__:null,default:l_,shop_discount_auth:r_});const p_={follow:"Последвайте в {shop}",following:"Следвате в {shop}",auth_modal:{title:"Последвайте в Shop",description:"Бъдете информирани – не пропускайте разпродажби, ново зареждане на стоки или актуализация на поръчка."},following_modal:{title:"Посетете {store} в Shop",subtitle:"Всичко нужно за пазаруване, проследяване и плащане – на едно място.",qr_header:"Сканирайте, за да посетите {store} в приложението Shop",qr_alt_text:"QR код от приложението Shop",continue:"Продължи"},completed:{title:"Вие следвате {store}",subtitle:"Изпратихме ви имейл с връзка, от която да изтеглите приложението Shop."},personalization_consent:{title:"За да последвате в Shop, синхронизирайте вашите дейности при пазаруване"}},d_={login:"Влизане с {shop}",auth_modal:{login_title:"Влизане с Shop",login_description:"Най-лесният и сигурен начин да влезете в {store} – без парола.",signup_title:"Създаване на профил",signup_description:"Въведете телефонния си номер, за да създадете профил в Shop.",login_sms_title:"Потвърдете, че това сте вие",login_sms_description:"Въведете кода, който изпратихме на {phoneNumber}",login_email_title:"Потвърдете, че това сте вие",login_email_description:"Въведете кода, изпратен на вашия имейл адрес – {email}",login_title_with_store:"Влезте в {store} с Shop",login_webauthn_title:"Потвърдете, че това сте вие",login_webauthn_description:"Влезте с парола, за да използвате безопасно своята записана информация.",login_webauthn_footer:"С решението си да продължите приемате, че името и имейл адресът ви ще бъдат споделени с/ъс {store}."}},u_={remember_me:"Записване на информацията ми по сигурен начин за по-бързо влизане навсякъде",sign_up_page:{auth_modal:{login_title:"Продължаване с Shop",login_description:"Използвайте своя профил в Shop за влизане навсякъде – няма нужда от парола.",login_sms_description:"Използвайте своя профил в Shop за влизане навсякъде – няма нужда от парола.\r\n\r\nПотвърдете, че сте вие, като въведете кода, който изпратихме на {phoneNumber}",login_email_description:"Използвайте своя профил в Shop за влизане навсякъде – няма нужда от парола.Потвърдете, че сте вие, като въведете кода, който изпратихме на вашия имейл адрес, {email}",login_webauthn_title:"Продължаване с Shop",login_webauthn_description:"Влезте с парола, за да използвате безопасно своята записана информация."}}},m_={auth_modal:{login_title:"Влезте в профила си или се регистрирайте",signup_title:"Продължаване с Shop",signup_description:"Създайте профил в Shop или се влезте в {clientName} – не е нужна парола"}},h_={terms_of_service:"условия за използване на услугата",privacy_policy:"правила за повелителност",terms:"условия",client:"Вижте {termsOfService} и {privacyPolicy} на {clientName}.",shop:"С решението си да продължите, приемате {termsOfService} и {privacyPolicy} на Shop.",authorized_scopes:{email_name:"С решението си да продължите приемате, че името и имейл адресът ви ще бъдат споделени с/ъс {store}."}},__={auth_modal:{login_title:"Плащане с Shop Pay",login_description:"Използвайте записаната информация, за да платите по защитен начин в {store}.",login_sms_title:"Потвърдете, че това сте вие",login_sms_description:"Въведете кода, изпратен на {phoneNumber}, за да използвате безопасно своята записана информация.",login_email_title:"Потвърдете, че това сте вие",login_email_description:"Въведете кода, изпратен на {email}, за да използвате безопасно своята записана информация."}},g_={auth_modal:{login_sms_description:"Въведете кода, изпратен на {phoneNumber}, за да използвате безопасно своята записана информация.",login_email_description:"Въведете кода, изпратен на {email}, за да използвате безопасно своята записана информация."}};var f_={follow_on_shop:p_,login_with_shop:d_,customer_accounts:u_,verified_email_auth:m_,legal:h_,payment_request:__,checkout_modal:g_},b_=Object.freeze({__proto__:null,checkout_modal:g_,customer_accounts:u_,default:f_,follow_on_shop:p_,legal:h_,login_with_shop:d_,payment_request:__,verified_email_auth:m_});const y_={follow:"Sledovat: {shop}",following:"Sledujete: {shop}",auth_modal:{title:"Sledování v aplikaci Shop",description:"Zajistěte si o všem přehled: Nenechte si ujít prodej, vrácení skladových zásob nebo aktualizaci objednávky."},following_modal:{title:"Navštivte obchod {store} v aplikaci Shop",subtitle:"Všechno, co potřebujete k nákupům, sledování a placení, máte k dispozici na jediném místě.",qr_header:"Naskenujte kód a přejděte do obchodu {store} v aplikaci Shop",qr_alt_text:"QR kód aplikace Shop",continue:"Pokračovat"},completed:{title:"Sledujete obchod {store}",subtitle:"Poslali jsme vám e-mail s odkazem ke stažení aplikace Shop."},personalization_consent:{title:"Pokud chcete nastavit sledování v aplikaci Shop, synchronizujte si nákupní aktivitu"}},v_={login:"Přihlásit se přes: {shop}",auth_modal:{login_title:"Přihlášení přes Shop",login_description:"Nejjednodušší a nejbezpečnější způsob přihlášení k obchodu {store} – a bez hesla.",signup_title:"Vytvořte si účet",signup_description:"Zadejte své telefonní číslo, abyste mohli vytvořit účet Shop.",login_sms_title:"Potvrďte, že jde o vás",login_sms_description:"Zadejte kód odeslaný na telefonní číslo {phoneNumber}",login_email_title:"Potvrďte, že jde o vás",login_email_description:"Zadejte kód, který jsme vám poslali na e-mailovou adresu {email}",login_title_with_store:"Přihlaste se k obchodu {store} přes Shop",login_webauthn_title:"Potvrďte, že jde o vás",login_webauthn_description:"Přihlaste se přístupovým klíčem, abyste mohli bezpečně používat uložené informace.",login_webauthn_footer:"Pokud budete pokračovat, nasdílí se vaše jméno a e-mailová adresa s obchodem {store}."}},k_={remember_me:"Uložit bezpečně mé informace v obchodě za účelem rychlejšího přihlašování",sign_up_page:{auth_modal:{login_title:"Pokračovat s účtem Shop",login_description:"Přihlašujte se všude pomocí účtu Shop – bez nutnosti zadávat heslo.",login_sms_description:"Přihlašujte se všude pomocí účtu Shop – bez nutnosti zadávat heslo.\r\n\r\nPotvrďte, že jste to vy – zadejte kód odeslaný na telefonní číslo {phoneNumber}",login_email_description:"Přihlašujte se všude pomocí účtu Shop – bez nutnosti zadávat heslo.\r\n\r\nPotvrďte, že jste to vy – zadejte kód odeslaný na vaši e-mailovou adresu {email}",login_webauthn_title:"Pokračujte s účtem Shop",login_webauthn_description:"Přihlaste se přístupovým klíčem, abyste mohli bezpečně používat uložené informace."}}},w_={auth_modal:{login_title:"Přihlaste se nebo se zaregistrujte",signup_title:"Pokračujte s účtem Shop",signup_description:"Vytvořte si účet Shop umožňující přihlášení k: {clientName} – a nemusíte zadávat heslo."}},P_={terms_of_service:"podmínkami služby",privacy_policy:"zásady ochrany osobních údajů",terms:"podmínky",client:"Prostudujte si {termsOfService} a {privacyPolicy} společnosti {clientName}.",shop:"Pokračováním vyjadřujete souhlas s {termsOfService} aplikace Shop a berete na vědomí {privacyPolicy}.",authorized_scopes:{email_name:"Pokud budete pokračovat, vaše jméno a e-mailová adresa budou sdíleny s obchodem {store}."}},S_={auth_modal:{login_title:"Plaťte na pokladně přes Shop Pay",login_description:"Plaťte bezpečně v obchodě {store} na základě uložených informací.",login_sms_title:"Potvrďte, že jde o vás",login_sms_description:"Zadejte kód odeslaný na číslo {phoneNumber}, který vám umožní bezpečné použití uložených údajů.",login_email_title:"Potvrďte, že jde o vás",login_email_description:"Zadejte kód odeslaný na váš e-mail {email}, který vám umožní bezpečné použití uložených údajů."}},z_={auth_modal:{login_sms_description:"Zadejte kód odeslaný na číslo {phoneNumber}, který vám umožní bezpečné použití uložených údajů.",login_email_description:"Zadejte kód odeslaný na váš e-mail {email}, který vám umožní bezpečné použití uložených údajů."}};var j_={follow_on_shop:y_,login_with_shop:v_,customer_accounts:k_,verified_email_auth:w_,legal:P_,payment_request:S_,checkout_modal:z_},C_=Object.freeze({__proto__:null,checkout_modal:z_,customer_accounts:k_,default:j_,follow_on_shop:y_,legal:P_,login_with_shop:v_,payment_request:S_,verified_email_auth:w_});const x_={follow:"Følg på {shop}",following:"Følger på {shop}",auth_modal:{title:"Følg på Shop",description:"Hold dig ajour – gå aldrig glip af et udsalg, en genopfyldning eller en ordreopdatering."},following_modal:{title:"Gå til {store} på Shop",subtitle:"Alt, du har brug for til at shoppe, spore og betale – alt sammen på ét sted.",qr_header:"Scan for at gå til {store} i Shop-appen",qr_alt_text:"Vis QR-kode for appen",continue:"Fortsæt"},completed:{title:"Du følger {store}",subtitle:"Vi har sendt dig en mail med et link til download af Shop-appen."},personalization_consent:{title:"For at følge på Shop skal du synkronisere din shoppingaktivitet"}},L_={login:"Log ind med {shop}",auth_modal:{login_title:"Log ind med Shop",login_description:"Den nemmeste og sikreste måde at logge på {store} – uden behov for adgangskode.",signup_title:"Opret en konto",signup_description:"Indtast dit telefonnummer for at oprette en Shop-konto.",login_sms_title:"Bekræft, at det er dig",login_sms_description:"Indtast den kode, der er sendt til {phoneNumber}",login_email_title:"Bekræft, at det er dig",login_email_description:"Angiv den kode, der er sendt til din mailadresse {email}",login_title_with_store:"Log ind på {store} med Shop",login_webauthn_title:"Bekræft din identitet",login_webauthn_description:"Log ind med en adgangsnøgle for sikkert at bruge dine gemte oplysninger.",login_webauthn_footer:"Hvis du fortsætter, deles dit navn og din mailadresse med {store}."}},A_={remember_me:"Gem mine oplysninger sikkert med Shop, så jeg kan logge ind hurtigere alle steder",sign_up_page:{auth_modal:{login_title:"Fortsæt med Shop",login_description:"Brug din Shop-konto til at logge på alle steder - ingen adgangskode nødvendig.",login_sms_description:"Brug din Shop-konto til at logge ind overalt - ingen adgangskode nødvendig.Bekræft, at det er dig. Indtast den kode, der er sendt til {phoneNumber}",login_email_description:"Brug din Shop-konto til at logge ind overalt - ingen adgangskode nødvendig.Bekræft, at det er dig. Indtast den kode, der er sendt til din mailadresse {email}",login_webauthn_title:"Fortsæt med Shop",login_webauthn_description:"Log ind med en adgangsnøgle for sikkert at bruge dine gemte oplysninger."}}},T_={auth_modal:{login_title:"Log ind, eller tilmeld dig",signup_title:"Fortsæt med Shop",signup_description:"Opret en Shop-konto til at log ind på {clientName} – ingen adgangskode nødvendig."}},E_={terms_of_service:"servicevilkår",privacy_policy:"politik om beskyttelse af persondata",terms:"vilkår",client:"Se {clientName}s {termsOfService} og {privacyPolicy}.",shop:"Hvis du fortsætter, accepterer du Shops {termsOfService} og {privacyPolicy}.",authorized_scopes:{email_name:"Hvis du fortsætter, deles dit navn og din mailadresse med {store}."}},I_={auth_modal:{login_title:"Betal med Shop Pay",login_description:"Brug dine gemte oplysninger til at betale sikkert i {store}.",login_sms_title:"Bekræft, at det er dig",login_sms_description:"Indtast koden sendt til {phoneNumber} for sikker brug af dine gemte oplysninger.",login_email_title:"Bekræft, at det er dig",login_email_description:"Indtast koden sent til din e-mail, {email} for sikke rbrug af dine gemte oplysninger."}},M_={auth_modal:{login_sms_description:"Indtast koden, der er sendt til {phoneNumber}, for sikkert at bruge dine gemte oplysninger.",login_email_description:"Indtast koden, der er sendt til din mailadresse, {email}, for sikkert at bruge dine gemte oplysninger."}};var O_={follow_on_shop:x_,login_with_shop:L_,customer_accounts:A_,verified_email_auth:T_,legal:E_,payment_request:I_,checkout_modal:M_},N_=Object.freeze({__proto__:null,checkout_modal:M_,customer_accounts:A_,default:O_,follow_on_shop:x_,legal:E_,login_with_shop:L_,payment_request:I_,verified_email_auth:T_});const q_={follow:"In {shop} folgen",following:"In {shop} gefolgt",auth_modal:{title:"In Shop folgen",description:"Bleibe auf dem neuesten Stand und verpasse niemals einen Sale, einen Restock oder ein Bestellupdate."},following_modal:{title:"{store} in Shop besuchen",subtitle:"Alles, was du zum Einkaufen, Verfolgen und Bezahlen brauchst – an einem zentralen Ort.",qr_header:"Scannen, um {store} in der Shop-App aufzurufen",qr_alt_text:"QR-Code für Shop-App",continue:"Fortfahren"},completed:{title:"Du folgst {store}",subtitle:"Wir haben eine E-Mail mit einem Link zum Herunterladen der Shop-App an dich gesendet."},personalization_consent:{title:"Synchronisiere deine Einkaufsaktivität, um in Shop zu folgen"}},R_={login:"Anmelden bei {shop}",auth_modal:{login_title:"Bei Shop anmelden",login_description:"Der einfachste und sicherste Weg, sich bei {store} anzumelden – ohne Passwort.",signup_title:"Konto erstellen",signup_description:"Gib deine Telefonnummer ein, um ein Shop-Konto zu erstellen.",login_sms_title:"Deine Identität bestätigen",login_sms_description:"Gib den Code ein, der an {phoneNumber} gesendet wurde",login_email_title:"Bestätige deine Identität",login_email_description:"Gib den Code ein, der an deine E-Mail ({email}) gesendet wurde",login_title_with_store:"Melde dich mit Shop bei {store} an",login_webauthn_title:"Bestätige deine Identität",login_webauthn_description:"Melde dich mit einem Passkey an, um deine gespeicherten Informationen sicher zu nutzen.",login_webauthn_footer:"Wenn du fortfährst, wird dein Name und deine E-Mail-Adresse mit {store} geteilt."}},D_={remember_me:"Meine Informationen sicher bei Shop abspeichern, um überall ein schnelleres Anmelden zu ermöglichen",sign_up_page:{auth_modal:{login_title:"Mit Shop fortfahren",login_description:"Nutze dein Shop-Konto, um dich überall anzumelden – ohne Passwort.",login_sms_description:"Nutze dein Shop-Konto, um dich überall anzumelden – ohne Passwort.\r\n\r\nBestätige deine Identität, indem du den Code eingibst, der an {phoneNumber} gesendet wurde",login_email_description:"Nutze dein Shop-Konto, um dich überall anzumelden – ohne Passwort.\r\n\r\nBestätige deine Identität, indem du den Code eingibst, der an deine E-Mail-Adresse {email} gesendet wurde",login_webauthn_title:"Mit Shop fortfahren",login_webauthn_description:"Melde dich mit einem Passkey an, um deine gespeicherten Informationen sicher zu nutzen."}}},B_={auth_modal:{login_title:"Einloggen oder registrieren",signup_title:"Mit Shop fortfahren",signup_description:"Erstelle ein Shop-Konto, um dich bei {clientName} anzumelden – kein Passwort erforderlich"}},F_={terms_of_service:"allgemeinen Geschäftsbedingungen",privacy_policy:"Datenschutzerklärung",terms:"allgemeinen",client:"Siehe {termsOfService} und {privacyPolicy} von {clientName}.",shop:"Indem du fortfährst, stimmst du den {termsOfService} von Shop zu und nimmst die {privacyPolicy} zur Kenntnis.",authorized_scopes:{email_name:"Wenn du fortfährst, wird dein Name und deine E-Mail-Adresse mit {store} geteilt."}},V_={auth_modal:{login_title:"Checke mit Shop Pay aus",login_description:"Nutze deine gespeicherten Informationen, um sicher in {store} auszuchecken.",login_sms_title:"Deine Identität bestätigen",login_sms_description:"Gib den Code ein, der an {phoneNumber} gesendet wurde, um in aller Sicherheit deine gespeicherten Informationen zu verwenden.",login_email_title:"Bestätige deine Identität",login_email_description:"Gib den Code ein, der an deine E-Mail-Adresse {email} gesendet wurde, um in aller Sicherheit deine gespeicherten Informationen zu verwenden."}},$_={auth_modal:{login_sms_description:"Gib den Code ein, der an {phoneNumber} gesendet wurde, um in aller Sicherheit deine gespeicherten Informationen zu verwenden.",login_email_description:"Gib den Code ein, der an deine E-Mail-Adresse {email} gesendet wurde, um in aller Sicherheit deine gespeicherten Informationen zu verwenden."}};var W_={follow_on_shop:q_,login_with_shop:R_,customer_accounts:D_,verified_email_auth:B_,legal:F_,payment_request:V_,checkout_modal:$_},U_=Object.freeze({__proto__:null,checkout_modal:$_,customer_accounts:D_,default:W_,follow_on_shop:q_,legal:F_,login_with_shop:R_,payment_request:V_,verified_email_auth:B_});const H_={follow:"Ακολουθήστε στο {shop}",following:"Ακολουθείτε στο {shop}",auth_modal:{title:"Ακολουθήστε στο Shop",description:"Μείνετε ενημερωμένοι—μη χάσετε ούτε μία έκπτωση, ανεφοδιασμό ή ενημέρωση παραγγελίας."},following_modal:{title:"Επισκεφτείτε το κατάστημα {store} στο Shop",subtitle:"Όλα όσα χρειάζεστε για την αγορά, την παρακολούθηση και την πληρωμή—σε ένα μέρος.",qr_header:"Κάντε σάρωση για να επισκεφτείτε το κατάστημα {store} στην εφαρμογή Shop",qr_alt_text:"Κωδικός QR εφαρμογής Shop",continue:"Συνέχεια"},completed:{title:"Ακολουθείτε το κατάστημα {store}",subtitle:"Σας στείλαμε ένα email το οποίο περιέχει έναν σύνδεσμο για τη λήψη της εφαρμογής Shop."},personalization_consent:{title:"Για να ακολουθήσετε στο Shop, συγχρονίστε τη δραστηριότητα αγορών σας"}},K_={login:"Σύνδεση με {shop}",auth_modal:{login_title:"Σύνδεση με Shop",login_description:"Ο πιο εύκολος και ασφαλής τρόπος σύνδεσης στο κατάστημα {store}—δεν απαιτείται κωδικός πρόσβασης.",signup_title:"Δημιουργία λογαριασμού",signup_description:"Εισαγάγετε τον αριθμό τηλεφώνου για να δημιουργήσετε έναν λογαριασμό Shop.",login_sms_title:"Επιβεβαιώστε την ταυτότητά σας",login_sms_description:"Εισαγάγετε τον κωδικό που στάλθηκε στον αριθμό {phoneNumber}",login_email_title:"Επιβεβαιώστε την ταυτότητά σας",login_email_description:"Εισαγάγετε τον κωδικό που στάλθηκε στη διεύθυνση email {email}",login_title_with_store:"Συνδεθείτε στο κατάστημα {store} με το Shop",login_webauthn_title:"Επιβεβαιώστε την ταυτότητά σας",login_webauthn_description:"Συνδεθείτε με κλειδί πρόσβασης για να χρησιμοποιείτε με ασφάλεια τις αποθηκευμένες πληροφορίες σας.",login_webauthn_footer:"Εάν συνεχίσετε, το όνομά σας και η διεύθυνση email σας θα κοινοποιηθούν στο κατάστημα {store}."}},Z_={remember_me:"Να αποθηκευτούν οι πληροφορίες μου με ασφάλεια στο Shop για να συνδέομαι ταχύτερα παντού",sign_up_page:{auth_modal:{login_title:"Συνέχεια στο Shop",login_description:"Χρησιμοποιήστε τον λογαριασμό σας στο Shop για να συνδεθείτε παντού—δεν απαιτείται κωδικός.",login_sms_description:"Χρησιμοποιήστε τον λογαριασμό σας στο Shop για να συνδεθείτε παντού—δεν απαιτείται κωδικός.\r\n\r\nΕπιβεβαιώστε την ταυτότητά σας, εισαγάγετε τον κωδικό που στάλθηκε στον αριθμό {phoneNumber}",login_email_description:"Χρησιμοποιήστε τον λογαριασμό σας στο Shop για να συνδεθείτε παντού—δεν απαιτείται κωδικός.\r\n\r\nΕπιβεβαιώστε την ταυτότητά σας, εισαγάγετε τον κωδικό που στάλθηκε στη διεύθυνση {email}",login_webauthn_title:"Συνέχεια στο Shop",login_webauthn_description:"Συνδεθείτε με κλειδί πρόσβασης για να χρησιμοποιείτε με ασφάλεια τις αποθηκευμένες πληροφορίες σας."}}},G_={auth_modal:{login_title:"Συνδεθείτε ή εγγραφείτε",signup_title:"Συνέχεια στο Shop",signup_description:"Δημιουργήστε έναν λογαριασμό στο Shop για να συνδεθείτε στο {clientName}–δεν απαιτείται κωδικός"}},J_={terms_of_service:"όρους παροχής υπηρεσιών",privacy_policy:"πολιτική απορρήτου",terms:"όροι",client:"Δείτε την {termsOfService} και τους {privacyPolicy} του {clientName}.",shop:"Αν συνεχίσετε, θα αποδεχτείτε τους {termsOfService} του Shop και θα αναγνωρίσετε την {privacyPolicy}.",authorized_scopes:{email_name:"Εάν συνεχίσετε, το όνομά σας και η διεύθυνση email σας θα κοινοποιηθούν στο κατάστημα {store}."}},Y_={auth_modal:{login_title:"Ολοκλήρωση αγοράς με Shop Pay",login_description:"Χρησιμοποιήστε τις αποθηκευμένες πληροφορίες σας για να ολοκληρώσετε την αγορά σας με ασφάλεια στο κατάστημα {store}.",login_sms_title:"Επιβεβαιώστε την ταυτότητά σας",login_sms_description:"Εισαγάγετε τον κωδικό που στάλθηκε στον αριθμό {phoneNumber} για να χρησιμοποιήσετε με ασφάλεια τις αποθηκευμένες πληροφορίες σας.",login_email_title:"Επιβεβαιώστε την ταυτότητά σας",login_email_description:"Εισαγάγετε τον κωδικό που στάλθηκε στο email σας, το {email}, για να χρησιμοποιήσετε με ασφάλεια τις αποθηκευμένες πληροφορίες σας."}},Q_={auth_modal:{login_sms_description:"Εισαγάγετε τον κωδικό που στάλθηκε στον αριθμό {phoneNumber} για να χρησιμοποιήσετε με ασφάλεια τις αποθηκευμένες πληροφορίες σας.",login_email_description:"Εισαγάγετε τον κωδικό που στάλθηκε στο email σας, το {email}, για να χρησιμοποιήσετε με ασφάλεια τις αποθηκευμένες πληροφορίες σας."}};var X_={follow_on_shop:H_,login_with_shop:K_,customer_accounts:Z_,verified_email_auth:G_,legal:J_,payment_request:Y_,checkout_modal:Q_},eg=Object.freeze({__proto__:null,checkout_modal:Q_,customer_accounts:Z_,default:X_,follow_on_shop:H_,legal:J_,login_with_shop:K_,payment_request:Y_,verified_email_auth:G_});const tg={follow:"Follow on {shop}",following:"Following on {shop}",auth_modal:{title:"Follow on Shop",description:"Stay in the know—never miss a sale, restock, or order update."},following_modal:{title:"Visit {store} on Shop",subtitle:"Everything you need to shop, track, and pay—all in one place.",qr_header:"Scan to visit {store} on the Shop app",qr_alt_text:"Shop app QR code",continue:"Continue"},completed:{title:"You're following {store}",subtitle:"We've sent you an email with a link to download the Shop app."},personalization_consent:{title:"To follow on Shop, sync your shopping activity"}},ng={login:"Sign in with {shop}",auth_modal:{login_title:"Sign in with Shop",login_title_with_store:"Sign in to {store} with Shop",login_description:"The easiest and most secure way to sign in to {store}—no password needed.",signup_title:"Create an account",signup_description:"Enter your phone number to create a Shop account.",login_sms_title:"Confirm it's you",login_sms_description:"Enter the code sent to {phoneNumber}",login_email_title:"Confirm it’s you",login_email_description:"Enter the code sent to your email, {email}",login_webauthn_title:"Confirm it’s you",login_webauthn_description:"Sign in with a passkey to securely use your saved information.",login_webauthn_footer:"By continuing, your name and email address will be shared with {store}."}},ig={auth_modal:{login_title:"Log in or sign up",signup_title:"Continue with Shop",signup_description:"Create a Shop account to sign in to {clientName}–no passwords needed"}},ag={terms_of_service:"terms of service",privacy_policy:"privacy policy",terms:"terms",client:"See {clientName}’s {termsOfService} and {privacyPolicy}.",shop:"By continuing, you agree to Shop’s {termsOfService} and acknowledge the {privacyPolicy}.",authorized_scopes:{email_name:"By continuing, your name and email address will be shared with {store}."}},og={auth_modal:{login_sms_description:"Enter the code sent to {phoneNumber} to securely use your saved information.",login_email_description:"Enter the code sent to your email, {email} to securely use your saved information."}},sg={remember_me:"Save my info securely with Shop to sign in faster everywhere",sign_up_page:{auth_modal:{login_title:"Continue with Shop",login_description:"Use your Shop account to sign in everywhere—no password needed.",login_sms_description:"Use your Shop account to sign in everywhere—no password needed.\r\n\r\nConfirm it's you, enter the code sent to {phoneNumber}",login_email_description:"Use your Shop account to sign in everywhere—no password needed.\r\n\r\nConfirm it's you, enter the code sent to your email, {email}",login_webauthn_title:"Continue with Shop",login_webauthn_description:"Sign in with a passkey to securely use your saved information."}}},rg={auth_modal:{login_title:"Check out with Shop Pay",login_description:"Use your saved information to check out securely at {store}.",login_sms_title:"Confirm it's you",login_sms_description:"Enter the code sent to {phoneNumber} to securely use your saved information.",login_email_title:"Confirm it’s you",login_email_description:"Enter the code sent to your email, {email} to securely use your saved information."}};var lg={follow_on_shop:tg,login_with_shop:ng,verified_email_auth:ig,legal:ag,checkout_modal:og,customer_accounts:sg,payment_request:rg},cg=Object.freeze({__proto__:null,checkout_modal:og,customer_accounts:sg,default:lg,follow_on_shop:tg,legal:ag,login_with_shop:ng,payment_request:rg,verified_email_auth:ig});const pg={follow:"Seguir en {shop}",following:"La sigues en {shop}",auth_modal:{title:"Seguir en Shop",description:"Mantente al día: no te pierdas ninguna venta, reposición o actualización de pedido."},following_modal:{title:"Visitar {store} en Shop",subtitle:"Todo lo que necesitas para comprar, hacer seguimientos y efectuar pagos desde un único lugar.",qr_header:"Escanear para visitar {store} en la aplicación Shop",qr_alt_text:"Código QR de la aplicación Shop",continue:"Continuar"},completed:{title:"Sigues a {store}",subtitle:"Te enviamos un correo electrónico con un enlace para descargar la aplicación Shop."},personalization_consent:{title:"Para hacer seguimiento en Shop, sincroniza tu actividad de compra"}},dg={login:"Iniciar sesión con {shop}",auth_modal:{login_title:"Iniciar sesión con Shop",login_description:"La forma más fácil y segura de iniciar sesión en {store} (no requiere contraseña).",signup_title:"Crear una cuenta",signup_description:"Introduce tu número de teléfono para crear una cuenta de Shop.",login_sms_title:"Confirma que eres tú",login_sms_description:"Introduce el código enviado a {phoneNumber}.",login_email_title:"Confirma que eres tú",login_email_description:"Ingresa el código enviado a tu correo electrónico, {email}.",login_title_with_store:"Iniciar sesión en {store} con Shop",login_webauthn_title:"Confirma que eres tú",login_webauthn_description:"Inicia sesión con una clave de acceso para usar de forma segura la información guardada.",login_webauthn_footer:"Al continuar, tu nombre y dirección de correo electrónico se compartirán con {store}."}},ug={remember_me:"Guardar mi información de forma segura con Shop para iniciar sesión rápidamente en cualquier sitio",sign_up_page:{auth_modal:{login_title:"Continuar con Shop",login_description:"Usa tu cuenta de Shop para iniciar sesión en cualquier lugar, sin necesidad de contraseña.",login_sms_description:"Usa tu cuenta de Shop para iniciar sesión en cualquier lugar, sin necesidad de contraseña.\r\n\r\nConfirma que eres tú. Introduce el código enviado a {phoneNumber}.",login_email_description:"Usa tu cuenta de Shop para iniciar sesión en cualquier lugar, sin necesidad de contraseña.\r\n\r\nConfirma que eres tú. Introduce el código enviado a tu correo electrónico, {email}.",login_webauthn_title:"Continuar con Shop",login_webauthn_description:"Inicia sesión con una clave de acceso para usar de forma segura la información guardada."}}},mg={auth_modal:{login_title:"Inicia sesión o regístrate",signup_title:"Continuar con Shop",signup_description:"Crea una cuenta de Shop para iniciar sesión en {clientName}, sin necesidad de contraseña."}},hg={terms_of_service:"Términos del Servicio",privacy_policy:"política de privacidad",terms:"términos",client:"Consulta la {termsOfService} y los {privacyPolicy} de {clientName}.",shop:"Al continuar, aceptas los {termsOfService} y la {privacyPolicy} de Shop.",authorized_scopes:{email_name:"Al continuar, tu nombre y dirección de correo electrónico se compartirán con {store}."}},_g={auth_modal:{login_title:"Pagar con Shop Pay",login_description:"Usa tu información guardada para formalizar el pago de manera segura en {store}.",login_sms_title:"Confirma que eres tú",login_sms_description:"Introduce el código que se envió al {phoneNumber} para usar tu información guardada de forma segura.",login_email_title:"Confirma que eres tú",login_email_description:"Introduce el código que se envió a tu correo electrónico {email} para usar tu información guardada de forma segura."}},gg={auth_modal:{login_sms_description:"Ingresa el código que se envió al {phoneNumber} para usar de forma segura tu información guardada.",login_email_description:"Ingresa el código que se envió a tu correo electrónico ({email}) para usar de forma segura tu información guardada."}};var fg={follow_on_shop:pg,login_with_shop:dg,customer_accounts:ug,verified_email_auth:mg,legal:hg,payment_request:_g,checkout_modal:gg},bg=Object.freeze({__proto__:null,checkout_modal:gg,customer_accounts:ug,default:fg,follow_on_shop:pg,legal:hg,login_with_shop:dg,payment_request:_g,verified_email_auth:mg});const yg={follow:"Seuraa {shop}issa",following:"Seurataan kohteessa {shop}",auth_modal:{title:"Seuraa Shopissa",description:"Pysy ajan tasalla — yksikään myynti, palautus varastoon tai tilauspäivitys ei jää väliin."},following_modal:{title:"Käy kaupassa {store} Shopissa",subtitle:"Kaikki ostosten tekemiseen, seuraamiseen ja maksamiseen tarvitsemasi – yhdessä paikassa.",qr_header:"Skannaa ja käy kaupassa {store} Shop-sovelluksessa",qr_alt_text:"Shop-sovelluksen QR-koodi",continue:"Jatka"},completed:{title:"Seuraat kohdetta {store}",subtitle:"Olemme lähettäneet sinulle sähköpostiviestin, jossa on Shop-sovelluksen latauslinkki."},personalization_consent:{title:"Synkronoi ostotoimintasi, jotta voit seurata Shopissa"}},vg={login:"Kirjaudu sisään käyttämällä palvelua {shop}",auth_modal:{login_title:"Kirjaudu sisään Shop-palvelulla",login_description:"Helpoin ja turvallisin tapa kirjautua sisään kauppaan {store}—et tarvitse salasanaa.",signup_title:"Luo tili",signup_description:"Anna puhelinnumerosi Shop-tilin luomista varten.",login_sms_title:"Vahvista, että se olet sinä",login_sms_description:"Syötä numeroon {phoneNumber} lähetetty koodi",login_email_title:"Vahvista henkilöllisyytesi",login_email_description:"Anna sähköpostiisi {email} lähetetty koodi",login_title_with_store:"Kirjaudu sisään kauppaan {store} Shopilla",login_webauthn_title:"Vahvista henkilöllisyytesi",login_webauthn_description:"Kirjaudu sisään todentamisavaimella, jotta voit käyttää tallennettuja tietojasi turvallisesti.",login_webauthn_footer:"Kun jatkat, {store} saa nimesi ja sähköpostiosoitteesi."}},kg={remember_me:"Tallenna tietoni turvallisesti Shop-palveluun, jotta voin jatkossa kirjautua sisään entistä nopeammin missä tahansa",sign_up_page:{auth_modal:{login_title:"Jatka Shopilla",login_description:"Kirjaudu sisään kaikkialle Shop-tililläsi – salasanaa ei tarvita.",login_sms_description:"Kirjaudu sisään kaikkialle Shop-tililläsi – salasanaa ei tarvita.\r\n\r\nVahvista, että se olet sinä, syöttämällä numeroon {phoneNumber} lähetetty koodi",login_email_description:"Kirjaudu sisään kaikkialle Shop-tililläsi – salasanaa ei tarvita.\r\n\r\nVahvista, että se olet sinä, syöttämällä sähköpostiosoitteeseen {email} lähetetty koodi",login_webauthn_title:"Jatka Shopilla",login_webauthn_description:"Kirjaudu sisään todentamisavaimella, jotta voit käyttää tallennettuja tietojasi turvallisesti."}}},wg={auth_modal:{login_title:"Kirjaudu sisään tai rekisteröidy",signup_title:"Jatka Shopilla",signup_description:"Luo Shop-tili, niin voit kirjautua palveluun {clientName}. Salasanoja ei tarvita"}},Pg={terms_of_service:"käyttöehdot",privacy_policy:"tietosuojakäytäntö",terms:"ehdot",client:"Katso palvelun {clientName} {termsOfService} ja {privacyPolicy}.",shop:"Jatkamalla hyväksyt Shopin {termsOfService} ja {privacyPolicy}.",authorized_scopes:{email_name:"Kun jatkat, nimesi ja sähköpostiosoitteesi jaetaan kaupalle {store}."}},Sg={auth_modal:{login_title:"Maksa kassalla Shop Paylla",login_description:"Maksa turvallisesti kaupassa {store} tallennettuja tietojasi käyttämällä.",login_sms_title:"Vahvista, että se olet sinä",login_sms_description:"Syötä numeroon {phoneNumber} lähetetty koodi, jotta voit käyttää tallennettuja tietojasi turvallisesti.",login_email_title:"Vahvista henkilöllisyytesi",login_email_description:"Syötä sähköpostiisi {email} lähetetty koodi, jotta voit käyttää tallennettuja tietojasi turvallisesti."}},zg={auth_modal:{login_sms_description:"Syötä numeroon {phoneNumber} lähetetty koodi, jotta voit käyttää tallennettuja tietojasi turvallisesti.",login_email_description:"Syötä sähköpostiisi {email} lähetetty koodi, jotta voit käyttää tallennettuja tietojasi turvallisesti."}};var jg={follow_on_shop:yg,login_with_shop:vg,customer_accounts:kg,verified_email_auth:wg,legal:Pg,payment_request:Sg,checkout_modal:zg},Cg=Object.freeze({__proto__:null,checkout_modal:zg,customer_accounts:kg,default:jg,follow_on_shop:yg,legal:Pg,login_with_shop:vg,payment_request:Sg,verified_email_auth:wg});const xg={follow:"Suivre sur {shop}",following:"Suivi sur {shop}",auth_modal:{title:"Suivre sur Shop",description:"Tenez-vous informé(e) : ne manquez aucune promotion, remise en stock ou mise à jour de commande."},following_modal:{title:"Visiter {store} sur Shop",subtitle:"Tout ce dont vous avez besoin pour effectuer des achats, des suivis de commande et des paiements au même endroit.",qr_header:"Scanner pour visiter {store} sur l’application Shop",qr_alt_text:"Code QR de l'application Shop",continue:"Continuer"},completed:{title:"Vous suivez actuellement {store}",subtitle:"Nous vous avons envoyé un e-mail contenant un lien pour télécharger l’application Shop."},personalization_consent:{title:"Pour effectuer le suivi sur Shop, synchronisez votre activité d’achat"}},Lg={login:"Se connecter avec {shop}",auth_modal:{login_title:"Se connecter avec Shop",login_description:"La façon la plus facile et la plus sécurisée de se connecter à {store} – aucun mot de passe requis.",signup_title:"Créer un compte",signup_description:"Saisissez votre numéro de téléphone pour créer un compte Shop.",login_sms_title:"Confirmez qu’il s’agit bien de vous",login_sms_description:"Saisissez le code envoyé à {phoneNumber}",login_email_title:"Confirmez que c’est bien vous",login_email_description:"Saisissez le code envoyé à votre adresse e-mail, {email}",login_title_with_store:"Se connecter à {store} avec Shop",login_webauthn_title:"Confirmez qu’il s’agit bien de vous",login_webauthn_description:"Connectez-vous avec une clé d’accès pour accéder à vos informations enregistrées en toute sécurité.",login_webauthn_footer:"Si vous continuez, votre nom et votre adresse e-mail seront communiqués à {store}."}},Ag={remember_me:"Enregistrer mes informations en toute sécurité avec Shop pour me connecter plus vite partout",sign_up_page:{auth_modal:{login_title:"Continuer avec Shop",login_description:"Utilisez votre compte Shop pour vous connecter partout, sans mot de passe.",login_sms_description:"Utilisez votre compte Shop pour vous connecter partout, sans mot de passe.\n\nConfirmez qu’il s’agit bien de vous, saisissez le code envoyé à {phoneNumber}",login_email_description:"Utilisez votre compte Shop pour vous connecter partout, sans mot de passe.\n\nConfirmez qu’il s’agit bien de vous, saisissez le code envoyé à votre email, {email}",login_webauthn_title:"Continuez avec Shop",login_webauthn_description:"Connectez-vous avec une clé d’accès pour utiliser en toute sécurité vos informations enregistrées."}}},Tg={auth_modal:{login_title:"Se connecter ou s’inscrire",signup_title:"Continuer avec Shop",signup_description:"Créez un compte Shop pour vous inscrire à {clientName} – aucun mot de passe requis"}},Eg={terms_of_service:"conditions de service",privacy_policy:"politique de confidentialité",terms:"conditions",client:"Voir la {termsOfService} et les {privacyPolicy} de {clientName}.",shop:"En poursuivant, vous acceptez les {termsOfService} de Shop et vous vous engagez à respecter la {privacyPolicy}.",authorized_scopes:{email_name:"Si vous continuez, votre nom et votre adresse e-mail seront partagés avec {store}."}},Ig={auth_modal:{login_title:"Payez en utilisant Shop Pay.",login_description:"Utilisez vos informations enregistrées pour payer en toute sécurité sur {store}.",login_sms_title:"Confirmez qu’il s’agit bien de vous",login_sms_description:"Saisissez le code envoyé à {phoneNumber} pour utiliser en toute sécurité vos informations enregistrées.",login_email_title:"Confirmez que c’est bien vous",login_email_description:"Saisissez le code envoyé à votre adresse e-mail {email} pour utiliser en toute sécurité vos informations enregistrées."}},Mg={auth_modal:{login_sms_description:"Saisissez le code envoyé à {phoneNumber} pour utiliser en toute sécurité vos informations enregistrées.",login_email_description:"Saisissez le code envoyé à votre adresse e-mail, {email} pour utiliser en toute sécurité vos informations enregistrées."}};var Og={follow_on_shop:xg,login_with_shop:Lg,customer_accounts:Ag,verified_email_auth:Tg,legal:Eg,payment_request:Ig,checkout_modal:Mg},Ng=Object.freeze({__proto__:null,checkout_modal:Mg,customer_accounts:Ag,default:Og,follow_on_shop:xg,legal:Eg,login_with_shop:Lg,payment_request:Ig,verified_email_auth:Tg});const qg={follow:"{shop} पर फ़ॉलो करें",following:"{shop} में नीचे",auth_modal:{title:"Shop पर फ़ॉलो करें",description:"संपर्क में बने रहें—किसी भी सेल, रिस्टॉक या ऑर्डर अपडेट से न चूकें."},following_modal:{title:"Shop पर {store} में विज़िट करें",subtitle:"सब कुछ जिसकी आपको खरीदारी करनी है, ट्रैक करना है और भुगतान करनी है—सब कुछ एक छत के नीचे.",qr_header:"Shop ऐप पर {store} पर जाने के लिए स्कैन करें",qr_alt_text:"Shop ऐप QR कोड",continue:"जारी रहना"},completed:{title:"आप {store} को फ़ॉलो कर रहे हैं",subtitle:"हमने आपको Shop ऐप डाउनलोड करने के लिए लिंक के साथ एक ईमेल भेजा है."},personalization_consent:{title:"Shop पर फ़ॉलो करने के लिए, अपनी शॉपिंग एक्टिविटी को सिंक करें"}},Rg={login:"{shop} से साइन इन करें",auth_modal:{login_title:"Shop के साथ साइन इन करें",login_description:"{store} में साइन इन करने का सबसे आसान और सुरक्षित तरीका—किसी पासवर्ड की ज़रूरत नहीं.",signup_title:"एक अकाउंट बनाएं",signup_description:"एक Shop अकाउंट बनाने के लिए अपना फ़ोन नंबर डालें.",login_sms_title:"कन्फ़र्म करें कि यह आप ही हैं",login_sms_description:"{phoneNumber} पर भेजा गया कोड डालें",login_email_title:"कन्फ़र्म करें कि यह आप हैं",login_email_description:"आपके ईमेल, {email} पर भेजा गया कोड डालें",login_title_with_store:"Shop के साथ {store} में साइन इन करें",login_webauthn_title:"कन्फ़र्म करें कि यह आप हैं",login_webauthn_description:"अपनी सेव की गई जानकारी के सुरक्षित इस्तेमाल के लिए passkey से साइन इन करें.",login_webauthn_footer:"जारी रखने पर, आपका नाम और ईमेल पता {store} के साथ शेयर किया जाएगा."}},Dg={remember_me:"हर जगह तेजी से साइन इन करने के लिए मेरी जानकारी को Shop के साथ सुरक्षित रूप से सहेजें",sign_up_page:{auth_modal:{login_title:"Shop के साथ जारी रखें",login_description:"कहीं से भी साइन इन करने के लिए अपने Shop अकाउंट का इस्तेमाल करें—किसी पासवर्ड की ज़रूरत नहीं.",login_sms_description:"कहीं से भी साइन इन करने के लिए अपने Shop अकाउंट का इस्तेमाल करें—किसी पासवर्ड की ज़रूरत नहीं.\r\n\r\nकंफ़र्म करें कि यह आप ही हैं, {phoneNumber} पर भेजा गया कोड डालें",login_email_description:"कहीं से भी साइन इन करने के लिए अपने Shop अकाउंट का इस्तेमाल करें—किसी पासवर्ड की ज़रूरत नहीं.\r\n\r\nकंफ़र्म करें कि यह आप ही हैं, आपके ईमेल, {email} पर भेजा गया कोड डालें",login_webauthn_title:"Shop के साथ जारी रखें",login_webauthn_description:"अपनी सेव की गई जानकारी के सुरक्षित इस्तेमाल के लिए passkey से साइन इन करें."}}},Bg={auth_modal:{login_title:"लॉग इन या साइन अप करें",signup_title:"Shop के साथ जारी रखें",signup_description:"{clientName} में साइन इन करने के लिए एक Shop अकाउंट बनाएं–किसी पासवर्ड की ज़रूरत नहीं"}},Fg={terms_of_service:"सेवा की शर्तें",privacy_policy:"गोपनीयता नीति",terms:"शर्तें",client:"{clientName} की {termsOfService} और {privacyPolicy} देखें.",shop:"जारी रखकर, आप शॉप की {termsOfService} से सहमति जताते हैं और {privacyPolicy} को स्वीकार करते हैं.",authorized_scopes:{email_name:"जारी रखने पर, आपका नाम और ईमेल पता {store} के साथ शेयर किया जाएगा."}},Vg={auth_modal:{login_title:"Shop Pay से चेकआउट करें",login_description:"{store} पर सुरक्षित रूप से चेक आउट करने के लिए अपनी सेव की गई जानकारी का इस्तेमाल करें.",login_sms_title:"कन्फ़र्म करें कि यह आप ही हैं",login_sms_description:"अपनी सेव की गई जानकारी का सुरक्षित रूप से इस्तेमाल करने के लिए {phoneNumber} पर भेजा गया कोड डालें.",login_email_title:"कन्फ़र्म करें कि यह आप हैं",login_email_description:"अपनी सेव की गई जानकारी का सुरक्षित रूप से इस्तेमाल करने के लिए, आपके ईमेल {email} पर भेजा गया कोड डालें."}},$g={auth_modal:{login_sms_description:"अपनी सेव की गई जानकारी का सुरक्षित रूप से इस्तेमाल करने के लिए {phoneNumber} पर भेजा गया कोड डालें.",login_email_description:"अपनी सेव की गई जानकारी का सुरक्षित रूप से इस्तेमाल करने के लिए, आपके ईमेल {email} पर भेजा गया कोड डालें."}};var Wg={follow_on_shop:qg,login_with_shop:Rg,customer_accounts:Dg,verified_email_auth:Bg,legal:Fg,payment_request:Vg,checkout_modal:$g},Ug=Object.freeze({__proto__:null,checkout_modal:$g,customer_accounts:Dg,default:Wg,follow_on_shop:qg,legal:Fg,login_with_shop:Rg,payment_request:Vg,verified_email_auth:Bg});const Hg={follow:"Zapratite na servisu {shop}",following:"Pratite na servisu {shop}",auth_modal:{title:"Pratite na servisu Shop",description:"Budite prvi koji će sve saznati – nikad nemojte propustiti rasprodaju, popunjavanje zaliha ni promjenu narudžbe."},following_modal:{title:"Posjetite {store} na servisu Shop",subtitle:"Sve što trebate kupiti, pratiti i platiti na jednom mjestu.",qr_header:"Skenirajte ako želite posjetiti trgovinu {store} u aplikaciji Shop",qr_alt_text:"QR kod za aplikaciju Shop",continue:"Nastavi"},completed:{title:"Pratite {store}",subtitle:"Poslali smo vam poruku e-pošte s poveznicom za preuzimanje aplikacije Shop."},personalization_consent:{title:"Da biste mogli pratiti podatke na usluzi Shop, sinkronizirajte svoju aktivnost kupnje"}},Kg={login:"Prijavite se rabeći {shop}",auth_modal:{login_title:"Prijava uz Shop",login_description:"Najlakši i najsigurniji način za registraciju u trgovini {store}, lozinka nije potrebna.",signup_title:"Izradite račun",signup_description:"Unesite telefonski broj za izradu računa za Shop.",login_sms_title:"Potvrdite da ste to vi",login_sms_description:"Unesite kod koji smo poslali na broj {phoneNumber}",login_email_title:"Potvrdite da ste to vi",login_email_description:"Unesite kod koji ste dobili e-poštom na adresu {email}",login_title_with_store:"Prijavite se u trgovinu {store} uz Shop",login_webauthn_title:"Potvrdite da ste to vi",login_webauthn_description:"Prijavite se rabeći Passkey ako želite sigurno upotrebljavati spremljene informacije.",login_webauthn_footer:"Ako nastavite, trgovina {store} će znati vaše ime i adresu e-pošte."}},Zg={remember_me:"Spremite na siguran način moje podatke za Shop za bržu prijavu u svim trgovinama",sign_up_page:{auth_modal:{login_title:"Nastavi uz Shop",login_description:"Upotrijebite račun Shop za prijavu posvuda, bez lozinke.",login_sms_description:"Upotrijebite račun Shop za prijavu posvuda, bez lozinke.\r\n\r\nPotvrdite da ste to vi, unesite kod koji smo poslali na broj {phoneNumber}",login_email_description:"Upotrijebite račun Shop za prijavu posvuda, bez lozinke.\r\n\r\nPotvrdite da ste to vi, unesite kod koji smo poslali na vašu adresu e-pošte {email}",login_webauthn_title:"Nastavi uz Shop",login_webauthn_description:"Prijavite se rabeći Passkey ako želite sigurno upotrebljavati spremljene informacije."}}},Gg={auth_modal:{login_title:"Prijava ili registracija",signup_title:"Nastavi uz Shop",signup_description:"Kreirajte račun za Shop da biste se prijavili u trgovinu {clientName} bez lozinke"}},Jg={terms_of_service:"uvjete pružanja usluge",privacy_policy:"pravila zaštite privatnosti",terms:"uvjeti",client:"Pogledajte {termsOfService} i {privacyPolicy} trgovine {clientName}.",shop:"Nastavkom pristajete na {termsOfService} trgovine Shop i prihvaćate {privacyPolicy}.",authorized_scopes:{email_name:"Ako nastavite, trgovina {store} će znati vaše ime i adresu e-pošte."}},Yg={auth_modal:{login_title:"Plaćanje uz Shop Pay",login_description:"Upotrijebite spremljene informacije kako biste provjerili sigurnost u trgovini {store}.",login_sms_title:"Potvrdite da ste to vi",login_sms_description:"Za sigurnu upotrebu spremljenih podataka unesite kod koji smo poslali na vaš broj {phoneNumber}.",login_email_title:"Potvrdite da ste to vi",login_email_description:"Za sigurnu upotrebu spremljenih podataka unesite kod koji smo poslali na vašu adresu e-pošte ({email})."}},Qg={auth_modal:{login_sms_description:"Za sigurnu upotrebu spremljenih podataka unesite kod koji smo poslali na vaš broj {phoneNumber}.",login_email_description:"Za sigurnu upotrebu spremljenih podataka unesite kod koji smo poslali na vašu adresu e-pošte ({email})."}};var Xg={follow_on_shop:Hg,login_with_shop:Kg,customer_accounts:Zg,verified_email_auth:Gg,legal:Jg,payment_request:Yg,checkout_modal:Qg},ef=Object.freeze({__proto__:null,checkout_modal:Qg,customer_accounts:Zg,default:Xg,follow_on_shop:Hg,legal:Jg,login_with_shop:Kg,payment_request:Yg,verified_email_auth:Gg});const tf={follow:"Követés itt: {shop}",following:"Követve itt: {shop}",auth_modal:{title:"Kövesd a Shop appban",description:"Ne maradj le semmiről – értesülj minden akcióról, készletfeltöltésről és a rendeléseid állapotáról."},following_modal:{title:"A(z) {store} felkeresése a Shop appban",subtitle:"Minden, ami a vásárláshoz, a csomagkövetéshez és a fizetéshez kell, egy helyen.",qr_header:"Szkenneld be a kódot a(z) {store} áruház felkereséséhez a Shop appban",qr_alt_text:"A Shop app QR-kódja",continue:"Folytatás"},completed:{title:"Követed a(z) {store} áruházat",subtitle:"E-mailben elküldtük a Shop alkalmazás letöltéséhez szükséges hivatkozást."},personalization_consent:{title:"Ha követni szeretnéd a Shop appban, szinkronizáld a vásárlási tevékenységedet"}},nf={login:"Bejelentkezés ezzel: {shop}",auth_modal:{login_title:"Bejelentkezés a Shoppal",login_description:"Ez a legegyszerűbb és legbiztonságosabb módja az áruházba ({store}) való bejelentkezésnek – jelszó nélkül.",signup_title:"Fiók létrehozása",signup_description:"A Shop-fiókod létrehozásához írd be a telefonszámodat.",login_sms_title:"Személyazonosság igazolása",login_sms_description:"Írd be a kódot, amit erre a számra küldtünk: {phoneNumber}",login_email_title:"Személyazonosság igazolása",login_email_description:"Írd be azt a kódot, amelyet az e-mail-címedre ({email}) küldtünk.",login_title_with_store:"Bejelentkezés a(z) {store} áruházba a Shoppal",login_webauthn_title:"Személyazonosság igazolása",login_webauthn_description:"Jelentkezz be passkey kóddal, hogy biztonságosan használhasd a mentett adataidat.",login_webauthn_footer:"Ha továbblépsz, elküldjük a nevedet és az e-mail-címedet a webáruháznak ({store})."}},af={remember_me:"Az adataim biztonságos mentése a Shoppal, hogy mindenhol gyorsabb legyen a bejelentkezés",sign_up_page:{auth_modal:{login_title:"Folytatás a Shoppal",login_description:"Mindenhová a Shop-fiókoddal jelentkezhetsz be – nincs szükség jelszóra.",login_sms_description:"Mindenhová a Shop-fiókoddal jelentkezhetsz be – nincs szükség jelszóra.\r\n\r\nIgazold, hogy te vagy az: írd be a kódot, amit erre a számra küldtünk: {phoneNumber}",login_email_description:"Mindenhová a Shop-fiókoddal jelentkezhetsz be – nincs szükség jelszóra.\r\n\r\nIgazold, hogy te vagy az: írd be a kódot, amit az e-mail-címedre küldtünk ( {email})",login_webauthn_title:"Folytatás a Shoppal",login_webauthn_description:"Jelentkezz be passkey kóddal, hogy biztonságosan használhasd a mentett adataidat."}}},of={auth_modal:{login_title:"Bejelentkezés vagy regisztráció",signup_title:"Folytatás a Shoppal",signup_description:"Hozz létre egy Shop-fiókot, és jelszó nélkül jelentkezhetsz be a(z) {clientName} oldalára"}},sf={terms_of_service:"szolgáltatási feltételekben",privacy_policy:"adatvédelmi szabályzatában",terms:"használati feltételeiben",client:"További információt a(z) {clientName} {termsOfService} és {privacyPolicy} találsz.",shop:"A továbblépéssel elfogadod a Shop {termsOfService} és tudomásul veszed az {privacyPolicy}.",authorized_scopes:{email_name:"Ha továbblépsz, elküldjük a nevedet és az e-mail-címedet a webáruháznak ({store})."}},rf={auth_modal:{login_title:"Fizetés a Shop Payjel",login_description:"Mentett adatok használata a biztonságos fizetéshez a(z) {store} webáruházában.",login_sms_title:"Személyazonosság igazolása",login_sms_description:"Írd be az a(z) {phoneNumber} telefonszámra kapott kódot, hogy biztonságosan használhassuk a mentett adataidat.",login_email_title:"Személyazonosság igazolása",login_email_description:"Írd be az a(z) {email} e-mail-címre kapott kódot, hogy biztonságosan használhassuk a mentett adataidat."}},lf={auth_modal:{login_sms_description:"Írd be a(z) {phoneNumber} telefonszámra kapott kódot, hogy biztonságosan használhassuk a mentett adataidat.",login_email_description:"Írd be a(z) {email} e-mail-címre kapott kódot, hogy biztonságosan használhassuk a mentett adataidat."}};var cf={follow_on_shop:tf,login_with_shop:nf,customer_accounts:af,verified_email_auth:of,legal:sf,payment_request:rf,checkout_modal:lf},pf=Object.freeze({__proto__:null,checkout_modal:lf,customer_accounts:af,default:cf,follow_on_shop:tf,legal:sf,login_with_shop:nf,payment_request:rf,verified_email_auth:of});const df={follow:"Ikuti di {shop}",following:"Mengikuti di {shop}",auth_modal:{title:"Ikuti di Shop",description:"Pantau terus—jangan lewatkan obral, isi ulang stok, atau pembaruan pesanan."},following_modal:{title:"Kunjungi {store} di Shop",subtitle:"Semua yang Anda perlukan untuk belanja, melacak, dan membayar—semuanya dalam satu tempat.",qr_header:"Pindai untuk membuka {store} di aplikasi Shop",qr_alt_text:"Kode QR aplikasi Shop",continue:"Lanjutkan"},completed:{title:"Anda mengikuti {store}",subtitle:"Kami telah mengirimi Anda email berisi tautan untuk mengunduh aplikasi Shop."},personalization_consent:{title:"Untuk mengikuti di Shop, sinkronkan aktivitas berbelanja Anda"}},uf={login:"Masuk dengan {shop}",auth_modal:{login_title:"Masuk menggunakan Shop",login_description:"Cara paling mudah dan aman untuk masuk ke {store}—tidak perlu sandi.",signup_title:"Buat akun",signup_description:"Masukkan nomor telepon atau buat akun Shop.",login_sms_title:"Konfirmasi identitas Anda",login_sms_description:"Masukkan kode yang dikirim ke {phoneNumber}",login_email_title:"Konfirmasi identitas Anda",login_email_description:"Masukkan kode yang dikirim ke email Anda, {email}",login_title_with_store:"Masuk ke {store} dengan Shop",login_webauthn_title:"Konfirmasi identitas Anda",login_webauthn_description:"Masuk dengan passkey untuk menggunakan informasi yang disimpan dengan aman.",login_webauthn_footer:"Dengan melanjutkan, nama dan alamat email Anda akan dibagikan ke {store}."}},mf={remember_me:"Simpan info saya secara aman di Shop untuk masuk lebih cepat di mana saja",sign_up_page:{auth_modal:{login_title:"Lanjutkan dengan Shop",login_description:"Gunakan akun Shop untuk masuk di mana saja—tidak perlu sandi.",login_sms_description:"Gunakan akun Shop untuk masuk di mana saja—tidak perlu sandi.\n\nKonfirmasi identitas Anda, masukkan kode yang dikirim ke {phoneNumber}",login_email_description:"Gunakan akun Shop untuk masuk di mana saja—tidak perlu sandi.\n\nKonfirmasi identitas Anda, masukkan kode yang dikirim ke email {email}",login_webauthn_title:"Lanjutkan dengan Shop",login_webauthn_description:"Masuk dengan passkey untuk menggunakan informasi yang disimpan dengan aman."}}},hf={auth_modal:{login_title:"Login atau daftar",signup_title:"Lanjutkan dengan Shop",signup_description:"Buat akun Shop untuk masuk ke {clientName}–tidak perlu sandi"}},_f={terms_of_service:"ketentuan layanan",privacy_policy:"kebijakan privasi",terms:"ketentuan",client:"Lihat {termsOfService} dan {privacyPolicy} {clientName}.",shop:"Dengan melanjutkan, Anda menyetujui {termsOfService} dan menerima {privacyPolicy} Shop.",authorized_scopes:{email_name:"Dengan melanjutkan, nama dan alamat email Anda akan dibagikan ke {store}."}},gf={auth_modal:{login_title:"Check out dengan Shop Pay",login_description:"Gunakan informasi yang Anda simpan agar proses check out di {store} aman.",login_sms_title:"Konfirmasi identitas Anda",login_sms_description:"Masukkan kode yang dikirim ke {phoneNumber} untuk menggunakan dengan aman informasi Anda yang tersimpan.",login_email_title:"Konfirmasi identitas Anda",login_email_description:"Masukkan kode yang dikirim ke email Anda, {email}, untuk menggunakan dengan aman informasi Anda yang tersimpan."}},ff={auth_modal:{login_sms_description:"Masukkan kode yang dikirim ke {phoneNumber} untuk menggunakan dengan aman informasi Anda yang tersimpan.",login_email_description:"Masukkan kode yang dikirim ke email Anda, {email}, untuk menggunakan dengan aman informasi Anda yang tersimpan."}};var bf={follow_on_shop:df,login_with_shop:uf,customer_accounts:mf,verified_email_auth:hf,legal:_f,payment_request:gf,checkout_modal:ff},yf=Object.freeze({__proto__:null,checkout_modal:ff,customer_accounts:mf,default:bf,follow_on_shop:df,legal:_f,login_with_shop:uf,payment_request:gf,verified_email_auth:hf});const vf={follow:"Segui su {shop}",following:"Segui già su {shop}",auth_modal:{title:"Segui su Shop",description:"Tieni tutto sotto controllo—non perderti neanche una vendita, un rifornimento o un aggiornamento degli ordini."},following_modal:{title:"Visita {store} su Shop",subtitle:"Tutto ciò che ti occorre per fare acquisti, monitorare gli ordini ed effettuare pagamenti, in un unico posto.",qr_header:"Scansiona il codice per visitare {store} sull'app Shop",qr_alt_text:"Codice QR dell'app Shop",continue:"Continua"},completed:{title:"Stai seguendo {store}",subtitle:"Ti abbiamo inviato un'email con il link per scaricare l'app Shop."},personalization_consent:{title:"Sincronizza l'attività di shopping per seguire su Shop"}},kf={login:"Accedi con {shop}",auth_modal:{login_title:"Accedi con Shop",login_description:"Il modo più semplice e sicuro per accedere a {store}, senza bisogno della password.",signup_title:"Crea un account",signup_description:"Inserisci il tuo numero di telefono per creare un account Shop.",login_sms_title:"Conferma la tua identità",login_sms_description:"Inserisci il codice inviato all'indirizzo {phoneNumber}",login_email_title:"Conferma la tua identità",login_email_description:"Inserisci il codice inviato al tuo indirizzo email, {email}",login_title_with_store:"Accedi a {store} con Shop",login_webauthn_title:"Conferma la tua identità",login_webauthn_description:"Accedi con una chiave di accesso per utilizzare le informazioni salvate in sicurezza.",login_webauthn_footer:"Se scegli di proseguire, il tuo nome e il tuo indirizzo email verranno condivisi con {store}."}},wf={remember_me:"Salva le mie informazioni in sicurezza con Shop per accedere velocemente ovunque",sign_up_page:{auth_modal:{login_title:"Continua con Shop",login_description:"Utilizza il tuo account Shop per accedere ovunque, senza bisogno di password.",login_sms_description:"Utilizza il tuo account Shop per accedere ovunque, senza bisogno di password.\r\n\r\nConferma la tua identità, inserisci il codice inviato a {phoneNumber}",login_email_description:"Utilizza il tuo account Shop per accedere ovunque, senza bisogno di password.\r\n\r\nConferma la tua identità, inserisci il codice inviato alla tua email, {email}",login_webauthn_title:"Continua con Shop",login_webauthn_description:"Accedi con una chiave di accesso per utilizzare le informazioni salvate in sicurezza."}}},Pf={auth_modal:{login_title:"Accedi o iscriviti",signup_title:"Continua con Shop",signup_description:"Crea un account Shop per accedere a {clientName}, senza bisogno di password"}},Sf={terms_of_service:"Termini e condizioni del servizio",privacy_policy:"informativa sulla privacy",terms:"termini",client:"Consulta l'{termsOfService} e i {privacyPolicy} di {clientName}.",shop:"Se scegli di proseguire, accetti i {termsOfService} e prendi atto dell'{privacyPolicy}.",authorized_scopes:{email_name:"Se scegli di proseguire, il tuo nome e il tuo indirizzo email verranno condivisi con {store}."}},zf={auth_modal:{login_title:"Check-out con Shop Pay",login_description:"Utilizza i tuoi dati salvati per eseguire il check-out in sicurezza su {store}.",login_sms_title:"Conferma la tua identità",login_sms_description:"Inserisci il codice inviato a {phoneNumber} per utilizzare in sicurezza i dati salvati.",login_email_title:"Conferma la tua identità",login_email_description:"Inserisci il codice inviato al tuo indirizzo email {email} per utilizzare in sicurezza i dati salvati."}},jf={auth_modal:{login_sms_description:"Inserisci il codice inviato a {phoneNumber} per utilizzare in sicurezza i dati salvati.",login_email_description:"Inserisci il codice inviato al tuo indirizzo email {email} per utilizzare in sicurezza i dati salvati."}};var Cf={follow_on_shop:vf,login_with_shop:kf,customer_accounts:wf,verified_email_auth:Pf,legal:Sf,payment_request:zf,checkout_modal:jf},xf=Object.freeze({__proto__:null,checkout_modal:jf,customer_accounts:wf,default:Cf,follow_on_shop:vf,legal:Sf,login_with_shop:kf,payment_request:zf,verified_email_auth:Pf});const Lf={follow:"{shop}でフォロー",following:"{shop}でフォロー中",auth_modal:{title:"Shopでフォロー",description:"最新情報を取得してセール、再入荷、注文の更新を見逃すことがないようにしましょう。"},following_modal:{title:"Shopで{store}を表示",subtitle:"ショッピング、追跡、支払いに必要なものは何でも—すべてが1か所に",qr_header:"スキャンして、Shopアプリで{store}にアクセスする",qr_alt_text:"ShopアプリのQRコード",continue:"続ける"},completed:{title:"{store}をフォロー中",subtitle:"Shopアプリをダウンロードするためのリンクをメールでお送りしました。"},personalization_consent:{title:"Shopでフォローするには、ショッピングアクティビティを同期してください"}},Af={login:"{shop}でログインする",auth_modal:{login_title:"Shopでログイン",login_description:"{store}にログインするための最も簡単で安全な方法—パスワードは必要ありません。",signup_title:"アカウントを作成",signup_description:"電話番号を入力して、Shopアカウントを作成します。",login_sms_title:"本人であることを確認する",login_sms_description:"{phoneNumber}に送信されたコードを入力してください",login_email_title:"本人であることを確認する",login_email_description:"メール ({email}) に送信されたコードを入力してください",login_title_with_store:"Shopで{store}にログインする",login_webauthn_title:"本人であることを確認する",login_webauthn_description:"保存した情報を安全に使用するには、パスキーを使用してログインします。",login_webauthn_footer:"継続することによって、名前とメールアドレスが{store}に提供されます。"}},Tf={remember_me:"Shopを使用して情報を安全に保存して、あらゆる場所ですばやくログインできるようにする",sign_up_page:{auth_modal:{login_title:"Shopで続ける",login_description:"Shopアカウントを使ってどこでもサインインできます。パスワードは必要ありません。",login_sms_description:"Shopアカウントを使ってどこでもサインインできます。パスワードは必要ありません。本人確認を行います。{phoneNumber}に送信されたコードを入力してください。",login_email_description:"Shopアカウントを使ってどこでもサインインできます。パスワードは必要ありません。本人確認を行います。メールアドレス ({email}) に送信されたコードを入力してください。",login_webauthn_title:"Shopで続ける",login_webauthn_description:"保存した情報を安全に使用するには、パスキーを使用してログインします。"}}},Ef={auth_modal:{login_title:"ログインまたはサインアップする",signup_title:"Shopで続ける",signup_description:"{clientName}にサインインするためのShopアカウントを作成してください。パスワードは必要ありません"}},If={terms_of_service:"利用規約",privacy_policy:"プライバシーポリシー",terms:"規約",client:"{clientName}の{termsOfService}と{privacyPolicy}を見る",shop:"続行すると、Shopの{termsOfService}に同意し、{privacyPolicy}を承諾することになります。",authorized_scopes:{email_name:"続行すると、あなたの名前とメールアドレスが{store}に提供されます。"}},Mf={auth_modal:{login_title:"Shop Payを使用してチェックアウトする",login_description:"保存した情報を使用して、{store}で安全にチェックアウトしてください。",login_sms_title:"本人であることを確認する",login_sms_description:"{phoneNumber}に送信されたコードを入力して保存された情報を安全に使用できます。",login_email_title:"本人であることを確認する",login_email_description:"メール{email}に送信されたコードを入力して保存された情報を安全に使用できます。"}},Of={auth_modal:{login_sms_description:"{phoneNumber}に送信されたコードを入力して保存された情報を安全に使用できます。",login_email_description:"メール{email}に送信されたコードを入力して保存された情報を安全に使用できます。"}};var Nf={follow_on_shop:Lf,login_with_shop:Af,customer_accounts:Tf,verified_email_auth:Ef,legal:If,payment_request:Mf,checkout_modal:Of},qf=Object.freeze({__proto__:null,checkout_modal:Of,customer_accounts:Tf,default:Nf,follow_on_shop:Lf,legal:If,login_with_shop:Af,payment_request:Mf,verified_email_auth:Ef});const Rf={follow:"{shop}에서 팔로우",following:"{shop}에서 팔로우 중",auth_modal:{title:"Shop에서 팔로우",description:"최신 정보를 확인하세요. 할인, 재입고, 주문 업데이트를 놓치지 마세요."},following_modal:{title:"Shop에서 {store} 방문",subtitle:"쇼핑, 추적, 결제에 필요한 모든 것이 한 곳에 있습니다.",qr_header:"스캔하여 Shop 앱에서 {store} 방문",qr_alt_text:"Shop 앱 QR 코드",continue:"계속"},completed:{title:"{store} 팔로우 중",subtitle:"Shop 앱을 다운로드할 수 있는 링크가 포함된 이메일을 보내 드렸습니다."},personalization_consent:{title:"Shop에서 팔로우하려면 쇼핑 활동을 동기화하세요"}},Df={login:"{shop}(으)로 로그인",auth_modal:{login_title:"Shop으로 로그인",login_description:"{store}에 로그인하는 가장 쉽고 안전한 방법입니다. 비밀번호가 필요하지 않습니다.",signup_title:"계정 생성",signup_description:"Shop 계정을 생성하려면 전화번호를 입력하세요.",login_sms_title:"본인 확인",login_sms_description:"{phoneNumber}에 전송된 코드 입력",login_email_title:"본인 확인",login_email_description:"귀하의 이메일({email})로 송신된 보안 코드 입력하십시오.",login_title_with_store:"Shop으로 {store}에 로그인",login_webauthn_title:"본인 확인",login_webauthn_description:"패스키로 로그인하여 저장된 정보를 안전하게 사용하세요.",login_webauthn_footer:"계속하면 이름과 이메일 주소가 {store}와(과) 공유됩니다."}},Bf={remember_me:"어디서나 더 빠르게 로그인할 수 있도록 Shop에 내 정보를 안전하게 저장",sign_up_page:{auth_modal:{login_title:"Shop 계속하기",login_description:"Shop 계정을 사용하여 어디서나 로그인할 수 있으며, 암호는 필요하지 않습니다.",login_sms_description:"Shop 계정을 사용하여 어디서나 로그인할 수 있으며, 암호는 필요하지 않습니다.본인 확인을 위해, {phoneNumber}(으)로 전송된 코드를 입력하세요.",login_email_description:"Shop 계정을 사용하여 어디서나 로그인할 수 있으며, 암호는 필요하지 않습니다.본인 확인을 위해, 이메일({email})로 전송된 코드를 입력하세요.",login_webauthn_title:"Shop으로 계속",login_webauthn_description:"패스키로 로그인하여 저장된 정보를 안전하게 사용하세요."}}},Ff={auth_modal:{login_title:"로그인 또는 가입",signup_title:"Shop 계속하기",signup_description:"Shop 계정을 생성하여 {clientName}에 로그인하세요.–비밀번호는 필요하지 않습니다."}},Vf={terms_of_service:"서비스 약관",privacy_policy:"개인정보처리방침",terms:"약관",client:"{clientName} {termsOfService} 및 {privacyPolicy} 보기",shop:"계속하면 Shop의 {termsOfService} 및 {privacyPolicy}에 동의하는 것입니다.",authorized_scopes:{email_name:"계속하면 이름과 이메일 주소가 {store}와(과) 공유됩니다."}},$f={auth_modal:{login_title:"Shop Pay를 사용하여 결제",login_description:"저장된 정보를 사용하여 {store}에서 안전하게 결제하세요.",login_sms_title:"본인 확인",login_sms_description:"저장된 정보를 안전하게 사용하려면 {phoneNumber}로 전송된 코드를 입력하세요.",login_email_title:"본인 확인",login_email_description:"저장된 정보를 안전하게 사용하려면 이메일({email})로 전송된 코드를 입력하세요."}},Wf={auth_modal:{login_sms_description:"저장된 정보를 안전하게 사용하려면 {phoneNumber}(으)로 전송된 코드를 입력하세요.",login_email_description:"저장된 정보를 안전하게 사용하려면 이메일({email})로 전송된 코드를 입력하세요."}};var Uf={follow_on_shop:Rf,login_with_shop:Df,customer_accounts:Bf,verified_email_auth:Ff,legal:Vf,payment_request:$f,checkout_modal:Wf},Hf=Object.freeze({__proto__:null,checkout_modal:Wf,customer_accounts:Bf,default:Uf,follow_on_shop:Rf,legal:Vf,login_with_shop:Df,payment_request:$f,verified_email_auth:Ff});const Kf={follow:"Sekti platformoje „{shop}“",following:"Sekate platformoje „{shop}“",auth_modal:{title:"Sekti platformoje „Shop“",description:"Būkite informuoti – niekada nepraleiskite išpardavimo, atsargų papildymo ar atnaujintos užsakymo informacijos."},following_modal:{title:"Apsilankyti „{store}“ platformoje „Shop“",subtitle:"Viskas, ko reikia apsipirkti, sekti ir sumokėti, – vienoje vietoje.",qr_header:"Nuskenuokite, norėdami apsilankyti „{store}“ „Shop“ programėlėje",qr_alt_text:"„Shop“ programėlės QR kodas",continue:"Tęsti"},completed:{title:"Jūs sekate „{store}“",subtitle:"Išsiuntėme jums el. laišką su nuoroda „Shop“ programėlei atsisiųsti."},personalization_consent:{title:"Norėdami sekti platformoje „Shop“, sinchronizuokite savo apsipirkimo veiksmus"}},Zf={login:"Prisijungti su „{shop}“",auth_modal:{login_title:"Prisijungti prie „Shop“",login_description:"Lengviausias ir saugiausias būdas prisijungti prie {store} – nereikia slaptažodžio.",signup_title:"Kurti paskyrą",signup_description:"Įveskite savo telefono numerį, kad sukurtumėte „Shop“ paskyrą.",login_sms_title:"Patvirtinkite, kad tai jūs",login_sms_description:"Įveskite kodą, kuris buvo atsiųstas {phoneNumber}",login_email_title:"Patvirtinkite, kad tai jūs",login_email_description:"Įveskite kodą, išsiųstą į jūsų el. paštą {email}",login_title_with_store:"Prisijunkite prie {store} su „Shop“",login_webauthn_title:"Patvirtinkite, kad tai jūs",login_webauthn_description:"Prisijunkite su prieigos raktu „Passkey“, kad galėtumėte saugiai naudotis savo išsaugota informacija.",login_webauthn_footer:"Tęsdami sutinkate, kad jūsų vardas, pavardė ir el. pašto adresas būtų perduoti „{store}“."}},Gf={remember_me:"Saugiai išsaugoti mano informaciją „Shop“, kad galėčiau greičiau prisijungti visur",sign_up_page:{auth_modal:{login_title:"Tęsti su „Shop“",login_description:"Naudokite savo „Shop“ paskyrą ir prisijunkite visur – be jokio slaptažodžio.",login_sms_description:"Naudokite savo „Shop“ paskyrą ir prisijunkite visur – be jokio slaptažodžio.\n\nPatvirtinkite, kad tai jūs, įvesdami kodą, kuris buvo atsiųstas {phoneNumber}",login_email_description:"Naudokite savo „Shop“ paskyrą ir prisijunkite visur – be jokio slaptažodžio.\n\nPatvirtinkite, kad tai jūs, įvesdami kodą, išsiųstą į jūsų el. paštą {email}",login_webauthn_title:"Tęsti su „Shop“",login_webauthn_description:"Prisijunkite su prieigos raktu „Passkey“, kad galėtumėte saugiai naudotis savo išsaugota informacija."}}},Jf={auth_modal:{login_title:"Prisijunkite arba prisiregistruokite",signup_title:"Tęsti su „Shop“",signup_description:"Sukurkite „Shop“ paskyrą ir prisijunkite prie {clientName} – be jokių slaptažodžių"}},Yf={terms_of_service:"paslaugos teikimo sąlygomis",privacy_policy:"privatumo politiką",terms:"sąlygas",client:"Žr. {clientName} {termsOfService} ir {privacyPolicy}.",shop:"Tęsdami sutinkate su „Shop“ {termsOfService} ir pripažįstate {privacyPolicy}.",authorized_scopes:{email_name:"Tęsdami sutinkate, kad jūsų vardas ir el. pašto adresas būtų perduoti „{store}“."}},Qf={auth_modal:{login_title:"Atsiskaitykite su „Shop Pay“",login_description:"Naudokitės savo išsaugota informacija, kad saugiai atsiskaitytumėte „{store}“.",login_sms_title:"Patvirtinkite, kad tai jūs",login_sms_description:"Įveskite į {phoneNumber} nusiųstą kodą, kad galėtumėte saugiai naudotis savo išsaugota informacija.",login_email_title:"Patvirtinkite, kad tai jūs",login_email_description:"Įveskite jūsų el. pašto adresu {email} nusiųstą kodą, kad galėtumėte saugiai naudotis savo išsaugota informacija."}},Xf={auth_modal:{login_sms_description:"Įveskite į {phoneNumber} nusiųstą kodą, kad galėtumėte saugiai naudotis savo išsaugota informacija.",login_email_description:"Įveskite jūsų el. pašto adresu {email} nusiųstą kodą, kad galėtumėte saugiai naudotis savo išsaugota informacija."}};var eb={follow_on_shop:Kf,login_with_shop:Zf,customer_accounts:Gf,verified_email_auth:Jf,legal:Yf,payment_request:Qf,checkout_modal:Xf},tb=Object.freeze({__proto__:null,checkout_modal:Xf,customer_accounts:Gf,default:eb,follow_on_shop:Kf,legal:Yf,login_with_shop:Zf,payment_request:Qf,verified_email_auth:Jf});const nb={follow:"Ikuti pada {shop}",following:"Mengikuti pada {shop}",auth_modal:{title:"Ikuti pada Shop",description:"Kekal termaklum—tidak lagi ketinggalan kemaskinian jualan, tambah stok semula atau pesanan."},following_modal:{title:"Lawati {store} pada Shop",subtitle:"Semua yang anda perlukan untuk membeli-belah, menjejak dan membayar—di satu tempat yang sama.",qr_header:"Imbas untuk melawat {store} pada aplikasi Shop",qr_alt_text:"Kod QR aplikasi Shop",continue:"Teruskan"},completed:{title:"Anda sedang mengikuti {store}",subtitle:"Kami telah menghantar e-mel kepada anda dengan pautan untuk memuat turun aplikasi Shop."},personalization_consent:{title:"Untuk mengikuti pada Shop, segerakan aktiviti beli-belah anda"}},ib={login:"Daftar masuk dengan {shop}",auth_modal:{login_title:"Daftar masuk dengan Shop",login_description:"Cara paling mudah dan paling selamat untuk daftar masuk ke {store}—kata laluan tidak diperlukan.",signup_title:"Cipta akaun",signup_description:"Masukkan nombor telefon anda untuk mencipta akaun Shop.",login_sms_title:"Sahkan identiti anda",login_sms_description:"Masukkan kod yang dihantar ke {phoneNumber}",login_email_title:"Sahkan identiti anda",login_email_description:"Masukkan kod yang dihantar ke e-mel anda, {email}",login_title_with_store:"Daftar masuk ke {store} dengan Shop",login_webauthn_title:"Sahkan identiti anda",login_webauthn_description:"Daftar masuk dengan passkey untuk menyimpan maklumat anda secara selamat.",login_webauthn_footer:"Dengan meneruskan, nama dan alamat e-mel anda akan dikongsi dengan {store}."}},ab={remember_me:"Simpan maklumat saya dengan selamat dengan Shop untuk daftar masuk yang lebih pantas di mana-mana sahaja",sign_up_page:{auth_modal:{login_title:"Teruskan dengan Shop",login_description:"Gunakan akaun Shop anda untuk daftar masuk di mana-mana sahaja—kata laluan tidak diperlukan.",login_sms_description:"Gunakan akaun Shop anda untuk daftar masuk di mana-mana sahaja—kata laluan tidak diperlukan.\n\nSahkan identiti anda, masukkan kod yang dihantar ke {phoneNumber}",login_email_description:"Gunakan akaun Shop anda untuk daftar masuk di mana-mana sahaja—kata laluan tidak diperlukan.\n\nSahkan identiti anda, masukkan kod yang dihantar ke e-mel anda, {email}",login_webauthn_title:"Teruskan dengan Shop",login_webauthn_description:"Daftar masuk dengan passkey untuk menggunakan maklumat yang anda simpan secara selamat."}}},ob={auth_modal:{login_title:"Log masuk atau daftar",signup_title:"Teruskan dengan Shop",signup_description:"Cipta akaun Shop untuk daftar masuk ke {clientName}-kata laluan tidak diperlukan"}},sb={terms_of_service:"terma perkhidmatan",privacy_policy:"dasar privasi",terms:"terma",client:"Lihat {termsOfService} dan {privacyPolicy} {clientName}",shop:"Dengan meneruskan, anda bersetuju dengan {termsOfService} dan mengakui {privacyPolicy} Shop.",authorized_scopes:{email_name:"Dengan meneruskan, nama dan alamat e-mel anda akan dikongsi dengan {store}."}},rb={auth_modal:{login_title:"Daftar keluar dengan Shop Pay",login_description:"Gunakan maklumat yang anda simpan untuk mendaftar keluar dengan selamat di {store}.",login_sms_title:"Sahkan identiti anda",login_sms_description:"Masukkan kod yang dihantar ke {phoneNumber} untuk menggunakan maklumat anda yang disimpan dengan cara yang selamat.",login_email_title:"Sahkan identiti anda",login_email_description:"Masukkan kod yang dihantar ke e-mel anda, {email} untuk menggunakan maklumat anda yang disimpan dengan cara yang selamat."}},lb={auth_modal:{login_sms_description:"Masukkan kod yang dihantar ke {phoneNumber} untuk menggunakan maklumat anda yang disimpan dengan cara yang selamat.",login_email_description:"Masukkan kod yang dihantar ke e-mel anda, {email} untuk menggunakan maklumat anda yang disimpan dengan cara yang selamat."}};var cb={follow_on_shop:nb,login_with_shop:ib,customer_accounts:ab,verified_email_auth:ob,legal:sb,payment_request:rb,checkout_modal:lb},pb=Object.freeze({__proto__:null,checkout_modal:lb,customer_accounts:ab,default:cb,follow_on_shop:nb,legal:sb,login_with_shop:ib,payment_request:rb,verified_email_auth:ob});const db={follow:"Følg på {shop}",following:"Følger på {shop}",auth_modal:{title:"Følg på Shop",description:"Hold deg oppdatert – gå aldri glipp av et salg, lagerpåfyllinger eller bestillingsoppdateringer."},following_modal:{title:"Besøk {store} på Shop",subtitle:"Alt du trenger for å handle, spore og betale – alt på ett sted.",qr_header:"Skann for å besøke {store} i Shop-appen",qr_alt_text:"QR-kode for Shop-appen",continue:"Fortsett"},completed:{title:"Du følger {store}",subtitle:"Vi har sendt deg en e-postmelding med en kobling for å laste ned Shop-appen."},personalization_consent:{title:"For å følge på Shop må du synkronisere handleaktiviteten"}},ub={login:"Logg inn med {shop}",auth_modal:{login_title:"Logg på med Shop",login_description:"Den enkleste og sikreste måten å logge på {store} – passord er ikke nødvendig.",signup_title:"Opprett en konto",signup_description:"Angi telefonnummeret ditt for å opprette en Shop-konto.",login_sms_title:"Bekreft at det er deg",login_sms_description:"Angi koden som er sendt til {phoneNumber}",login_email_title:"Bekreft at det er deg",login_email_description:"Skriv inn koden som ble sendt til e-posten din, {email}",login_title_with_store:"Logg på {store} med Shop",login_webauthn_title:"Bekreft at det er deg",login_webauthn_description:"Logg inn med en passkey for sikker bruk av lagret informasjon.",login_webauthn_footer:"Ved å fortsette deles navn og e-postadresse med {store}."}},mb={remember_me:"Lagre informasjonen min sikkert i Shop for å logge på raskere overalt",sign_up_page:{auth_modal:{login_title:"Fortsett med Shop",login_description:"Bruk Shop-kontoen til å logge på overalt – uten passord.",login_sms_description:"Bruk Shop-kontoen til å logge på overalt – uten passord.\r\n\r\nBekreft at det er deg, skriv inn koden som er sendt til {phoneNumber}",login_email_description:"Bruk Shop-kontoen til å logge på overalt – uten passord.\r\n\r\nBekreft at det er deg, skriv inn koden som er sendt til deg på e-postadressen {email}",login_webauthn_title:"Fortsett med Shop",login_webauthn_description:"Logg inn med en passnøkkel for sikker bruk av lagret informasjon."}}},hb={auth_modal:{login_title:"Logg inn eller registrer deg",signup_title:"Fortsett med Shop",signup_description:"Opprett en Shop-konto for å registrere deg på {clientName}. Ingen passord trengs"}},_b={terms_of_service:"vilkår for bruk",privacy_policy:"personvernerklæring",terms:"vilkår",client:"Se {clientName}s {termsOfService} og {privacyPolicy}.",shop:"Ved å fortsette godtar du Shops {termsOfService} og samtykker i {privacyPolicy}.",authorized_scopes:{email_name:"Ved å fortsette deles navnet og e-postadressen din med {store}."}},gb={auth_modal:{login_title:"Betal med Shop Pay",login_description:"Bruk de lagrede opplysningene for trygg betaling hos {store}.",login_sms_title:"Bekreft at det er deg",login_sms_description:"Angi koden som er sendt til {phoneNumber} for å bruke den lagrede informasjonen på en sikker måte.",login_email_title:"Bekreft at det er deg",login_email_description:"Angi koden som ble sendt til e-postadressen din, {email}, for å bruke den lagrede informasjonen på en sikker måte."}},fb={auth_modal:{login_sms_description:"Skriv inn koden som er sendt til {phoneNumber} for å bruke den lagrede informasjonen på en sikker måte.",login_email_description:"Skriv inn koden som ble sendt til e-postadressen din, {email}, for å bruke den lagrede informasjonen på en sikker måte."}};var bb={follow_on_shop:db,login_with_shop:ub,customer_accounts:mb,verified_email_auth:hb,legal:_b,payment_request:gb,checkout_modal:fb},yb=Object.freeze({__proto__:null,checkout_modal:fb,customer_accounts:mb,default:bb,follow_on_shop:db,legal:_b,login_with_shop:ub,payment_request:gb,verified_email_auth:hb});const vb={follow:"Volgen op {shop}",following:"Volgend op {shop}",auth_modal:{title:"Volgen op Shop",description:"Blijf op de hoogte: mis nooit meer een uitverkoop, voorraadaanvulling of update over een bestelling."},following_modal:{title:"Ga naar {store} in Shop",subtitle:"Alles wat je nodig hebt om te shoppen, te volgen en te betalen—allemaal op één plek.",qr_header:"Scan om {store} te bezoeken in de Shop-app",qr_alt_text:"QR-code van Shop-app",continue:"Doorgaan"},completed:{title:"Je volgt {store}",subtitle:"We hebben je een e-mail gestuurd met een downloadlink voor de Shop-app."},personalization_consent:{title:"Je winkelactiviteiten synchroniseren voor volgen in Shop"}},kb={login:"Inloggen met {shop}",auth_modal:{login_title:"Inloggen bij Shop",login_description:"De makkelijkste en veiligste manier om in te loggen bij {store}: geen wachtwoord nodig.",signup_title:"Een account aanmaken",signup_description:"Voer je telefoonnummer in om een Shop-account aan te maken.",login_sms_title:"Bevestig dat jij het bent",login_sms_description:"Voer de code in die naar {phoneNumber} is gestuurd.",login_email_title:"Bevestig dat jij het bent",login_email_description:"Voer de code in die naar je e-mailadres, {email}, is verzonden.",login_title_with_store:"Inloggen bij {store} met Shop",login_webauthn_title:"Bevestig dat jij het bent",login_webauthn_description:"Log in met een passkey om de opgeslagen informatie veilig te gebruiken.",login_webauthn_footer:"Als je doorgaat, delen we je naam en e-mailadres met {store}."}},wb={remember_me:"Sla mijn info veilig op met Shop om overal sneller in te loggen",sign_up_page:{auth_modal:{login_title:"Doorgaan met Shop",login_description:"Gebruik je Shop-account om overal in te loggen. Geen wachtwoord nodig.",login_sms_description:"Gebruik je Shop-account om overal in te loggen. Geen wachtwoord nodig.\r\n\r\nBevestig dat jij het bent: voer de code in die naar {phoneNumber} is gestuurd.",login_email_description:"Gebruik je Shop-account om overal in te loggen. Geen wachtwoord nodig.Bevestig dat jij het bent: voer de code in die naar je e-mail ({email}) is gestuurd.",login_webauthn_title:"Doorgaan met Shop",login_webauthn_description:"Log in met een passkey om de opgeslagen informatie veilig te gebruiken."}}},Pb={auth_modal:{login_title:"Inloggen of aanmelden",signup_title:"Doorgaan met Shop",signup_description:"Maak een Shop-account aan om in te loggen bij {clientName}. Geen wachtwoorden nodig."}},Sb={terms_of_service:"servicevoorwaarden",privacy_policy:"privacybeleid",terms:"voorwaarden",client:"Zie het {termsOfService} en de {privacyPolicy} van {clientName}.",shop:"Als je doorgaat, ga je akkoord met de {termsOfService} van Shop en erken je het {privacyPolicy}.",authorized_scopes:{email_name:"Als je doorgaat, delen we je naam en e-mailadres met {store}."}},zb={auth_modal:{login_title:"Afrekenen met met Shop Pay",login_description:"Gebruik de opgeslagen informatie om veilig af te rekenen bij {store}.",login_sms_title:"Bevestig dat jij het bent",login_sms_description:"Voer de code in die is verzonden naar {phoneNumber} om je opgeslagen informatie veilig te gebruiken.",login_email_title:"Bevestig dat jij het bent",login_email_description:"Voer de code in die naar je e-mailadres is gestuurd, {email}, om je opgeslagen informatie veilig te gebruiken."}},jb={auth_modal:{login_sms_description:"Voer de code in die naar {phoneNumber} is gestuurd om je opgeslagen informatie veilig te gebruiken.",login_email_description:"Voer de code in die naar je e-mailadres ({email}) is gestuurd om je opgeslagen informatie veilig te gebruiken."}};var Cb={follow_on_shop:vb,login_with_shop:kb,customer_accounts:wb,verified_email_auth:Pb,legal:Sb,payment_request:zb,checkout_modal:jb},xb=Object.freeze({__proto__:null,checkout_modal:jb,customer_accounts:wb,default:Cb,follow_on_shop:vb,legal:Sb,login_with_shop:kb,payment_request:zb,verified_email_auth:Pb});const Lb={follow:"Obserwuj w {shop}",following:"Obserwujesz w {shop}",auth_modal:{title:"Obserwuj w Shop",description:"Bądź na bieżąco — nigdy nie przegapisz wyprzedaży, uzupełnienia zapasów lub aktualizacji zamówienia."},following_modal:{title:"Odwiedź {store} w Shop",subtitle:"Wszystko, czego potrzebujesz, aby robić zakupy, śledzić i płacić — wszystko w jednym miejscu.",qr_header:"Zeskanuj, aby odwiedzić {store} w aplikacji Shop",qr_alt_text:"Kod QR aplikacji Shop",continue:"Kontynuuj"},completed:{title:"Obserwujesz {store}",subtitle:"Wysłaliśmy do Ciebie e-mail z linkiem do pobrania aplikacji Shop."},personalization_consent:{title:"Aby skonfigurować śledzenie w aplikacji Shop, zsynchronizuj swoją aktywność zakupową"}},Ab={login:"Zaloguj się za pomocą {shop}",auth_modal:{login_title:"Zaloguj przez Shop",login_description:"Najłatwiejszy i najbezpieczniejszy sposób logowania się do {store} - bez konieczności podawania hasła.",signup_title:"Utwórz konto",signup_description:"Wpisz numer swojego telefonu komórkowego, aby utworzyć konto Shop.",login_sms_title:"Zweryfikuj swoją tożsamość",login_sms_description:"Wprowadź kod wysłany na adres {phoneNumber}.",login_email_title:"Zweryfikuj swoją tożsamość",login_email_description:"Wpisz kod wysłany na Twój e-mail {email}",login_title_with_store:"Zaloguj się do {store} przez Shop",login_webauthn_title:"Zweryfikuj swoją tożsamość",login_webauthn_description:"Zaloguj się za pomocą klucza dostępu, aby bezpiecznie korzystać z zapisanych informacji.",login_webauthn_footer:"Jeśli zdecydujesz się kontynuować, Twoje imię i nazwisko oraz adres e-mail zostaną udostępnione dla: {store}."}},Tb={remember_me:"Zapisz moje informacje bezpiecznie w sklepie w celu szybszego logowania",sign_up_page:{auth_modal:{login_title:"Kontynuuj w aplikacji Shop",login_description:"Używaj swojego konta Shop, aby logować się wszędzie, gdzie chcesz — bez podawania hasła.",login_sms_description:"Używaj swojego konta Shop, aby logować się wszędzie, gdzie chcesz — bez podawania hasła.Potwierdź swoją tożsamość, wprowadzając kod wysłany na numer {phoneNumber}",login_email_description:"Używaj swojego konta Shop, aby logować się wszędzie, gdzie chcesz — bez podawania hasła.Potwierdź swoją tożsamość, wprowadzając kod wysłany na Twój adres e-mail {email}",login_webauthn_title:"Kontynuuj w aplikacji Shop",login_webauthn_description:"Zaloguj się za pomocą klucza dostępu, aby bezpiecznie korzystać z zapisanych informacji."}}},Eb={auth_modal:{login_title:"Zaloguj się albo zarejestruj",signup_title:"Kontynuuj w aplikacji Shop",signup_description:"Utwórz konto Shop, aby zalogować się do {clientName} – bez podawania hasła"}},Ib={terms_of_service:"warunki świadczenia usług",privacy_policy:"politykę prywatności",terms:"warunki",client:"Zobacz {termsOfService} i {privacyPolicy} {clientName}.",shop:"Kontynuując, wyrażasz zgodę na {termsOfService} i akceptujesz {privacyPolicy} Shop.",authorized_scopes:{email_name:"Jeśli zdecydujesz się kontynuować, Twoje imię i nazwisko i adres e-mail zostaną udostępnione sklepowi {store}."}},Mb={auth_modal:{login_title:"Zrealizuj zakup za pomocą opcji Shop Pay",login_description:"Użyj zapisanych informacji, aby bezpiecznie dokonać płatności na stronie {store}.",login_sms_title:"Zweryfikuj swoją tożsamość",login_sms_description:"Wprowadź kod wysłany na {phoneNumber}, aby bezpiecznie korzystać z zapisanych informacji.",login_email_title:"Zweryfikuj swoją tożsamość",login_email_description:"Wprowadź kod wysłany na Twój adres e-mail {email}, aby bezpiecznie korzystać z zapisanych informacji."}},Ob={auth_modal:{login_sms_description:"Wprowadź kod wysłany na numer {phoneNumber}, aby bezpiecznie korzystać z zapisanych informacji.",login_email_description:"Wprowadź kod wysłany na Twój adres e-mail {email}, aby bezpiecznie korzystać z zapisanych informacji."}};var Nb={follow_on_shop:Lb,login_with_shop:Ab,customer_accounts:Tb,verified_email_auth:Eb,legal:Ib,payment_request:Mb,checkout_modal:Ob},qb=Object.freeze({__proto__:null,checkout_modal:Ob,customer_accounts:Tb,default:Nb,follow_on_shop:Lb,legal:Ib,login_with_shop:Ab,payment_request:Mb,verified_email_auth:Eb});const Rb={follow:"Seguir no {shop}",following:"Seguindo no {shop}",auth_modal:{title:"Seguir no Shop",description:"Fique por dentro de tudo e nunca mais perca promoções, reabastecimentos ou atualizações de pedidos."},following_modal:{title:"Acesse a {store} no Shop",subtitle:"Uma plataforma para você comprar, pagar e acompanhar todos os seus pedidos.",qr_header:"Ler para visitar {store} no app Shop",qr_alt_text:"Código QR do app Shop",continue:"Continuar"},completed:{title:"Você está seguindo a {store}",subtitle:"Enviamos um e-mail com um link para você fazer download do app Shop."},personalization_consent:{title:"Para continuar no Shop, sincronize sua atividade de compra"}},Db={login:"Fazer login com {shop}",auth_modal:{login_title:"Fazer login com o Shop",login_description:"A maneira mais segura e fácil de fazer login na loja {store}, sem a necessidade de senha.",signup_title:"Criar uma conta",signup_description:"Insira o número de telefone para criar uma conta do Shop.",login_sms_title:"Confirme que é você",login_sms_description:"Insira o código enviado para {phoneNumber}",login_email_title:"Confirme que é você",login_email_description:"Insira o código enviado para o e-mail {email}",login_title_with_store:"Fazer login na loja {store} com o Shop",login_webauthn_title:"Confirme que é você",login_webauthn_description:"Faça login com uma chave de acesso para usar as informações salvas de forma segura.",login_webauthn_footer:"Se você continuar, seu nome e endereço de e-mail serão compartilhados com {store}."}},Bb={remember_me:"Salve minhas informações com o Shop de forma segura para fazer login com mais rapidez em qualquer lugar",sign_up_page:{auth_modal:{login_title:"Continuar com o Shop",login_description:"Use a conta do Shop para fazer login em vários produtos sem precisar de senha.",login_sms_description:"Use a conta do Shop para fazer login em vários produtos sem precisar de senha.\r\n\r\nConfirme sua identidade: insira o código enviado para {phoneNumber}",login_email_description:"Use a conta do Shop para fazer login em vários produtos sem precisar de senha.\r\n\r\nConfirme sua identidade: insira o código enviado para {email}",login_webauthn_title:"Continuar com o Shop",login_webauthn_description:"Faça login com uma chave de acesso para usar as informações salvas de forma segura."}}},Fb={auth_modal:{login_title:"Faça login ou crie uma conta",signup_title:"Continuar com o Shop",signup_description:"Crie uma conta do Shop para fazer login com {clientName} sem precisar de senha"}},Vb={terms_of_service:"termos de serviço",privacy_policy:"política de privacidade",terms:"termos",client:"Consulte a {termsOfService} e os {privacyPolicy} do {clientName}.",shop:"Se continuar, você concordará com os {termsOfService} e aceitará a {privacyPolicy} da Shop.",authorized_scopes:{email_name:"Se você continuar, seu nome e endereço de e-mail serão compartilhados com {store}."}},$b={auth_modal:{login_title:"Finalizar a compra com o Shop Pay",login_description:"Use suas informações salvas para finalizar a compra com segurança na {store}.",login_sms_title:"Confirme que é você",login_sms_description:"Insira o código enviado a {phoneNumber} para usar as informações salvas com segurança.",login_email_title:"Confirme que é você",login_email_description:"Insira o código enviado ao e-mail {email} para usar as informações salvas com segurança."}},Wb={auth_modal:{login_sms_description:"Insira o código enviado a {phoneNumber} para usar as informações salvas com segurança.",login_email_description:"Insira o código enviado ao e-mail {email} para usar as informações salvas com segurança."}};var Ub={follow_on_shop:Rb,login_with_shop:Db,customer_accounts:Bb,verified_email_auth:Fb,legal:Vb,payment_request:$b,checkout_modal:Wb},Hb=Object.freeze({__proto__:null,checkout_modal:Wb,customer_accounts:Bb,default:Ub,follow_on_shop:Rb,legal:Vb,login_with_shop:Db,payment_request:$b,verified_email_auth:Fb});const Kb={follow:"Seguir no {shop}",following:"A seguir no {shop}",auth_modal:{title:"Seguir na Shop",description:"Mantenha-se atualizado—nunca perca uma venda, um reabastecimento ou uma atualização a uma encomenda."},following_modal:{title:"Visite a {store} no Shop",subtitle:"Tudo o que necessita para comprar, rastrear e pagar num único local.",qr_header:"Efetue leitura para visitar {store} na aplicação Shop",qr_alt_text:"Código QR para aplicação Shop",continue:"Continuar"},completed:{title:"Está a seguir a {store}",subtitle:"Enviamos um e-mail com uma ligação para transferir a aplicação Shop."},personalization_consent:{title:"Para seguir na Shop, sincronize a sua atividade de compra"}},Zb={login:"Iniciar sessão com {shop}",auth_modal:{login_title:"Iniciar sessão com o Shop",login_description:"A forma mais fácil e segura de iniciar sessão na loja {store}— não é necessária palavra-passe.",signup_title:"Criar uma conta",signup_description:"Introduza o seu número de telemóvel para criar uma conta Shop.",login_sms_title:"Confirme que é o utilizador",login_sms_description:"Introduza o código enviado para {phoneNumber}",login_email_title:"Confirme que é você",login_email_description:"Introduza o código enviado para o seu e-mail, {email}",login_title_with_store:"Inicie sessão na loja {store} com o Shop",login_webauthn_title:"Confirme a sua identidade",login_webauthn_description:"Inicie sessão com uma chave de acesso para utilizar em segurança as suas informações guardadas.",login_webauthn_footer:"Ao continuar, o seu nome e endereço de e-mail serão partilhados com {store}."}},Gb={remember_me:"Guardar as minhas informações em segurança com o Shop para iniciar sessão mais rapidamente em todo o lado",sign_up_page:{auth_modal:{login_title:"Continuar com o Shop",login_description:"Utilize a sua conta Shop para iniciar sessão em todo o lado, sem palavra-passe.",login_sms_description:"Utilize a sua conta Shop para iniciar sessão em todo o lado, sem palavra-passe.Confirme a sua identidade ao introduzir o código enviado para {phoneNumber}",login_email_description:"Utilize a sua conta Shop para iniciar sessão em todo o lado, sem palavra-passe.Confirme a sua identidade ao introduzir o código enviado para o seu e-mail, {email}",login_webauthn_title:"Continuar com o Shop",login_webauthn_description:"Inicie sessão com uma chave de acesso para utilizar em segurança as suas informações guardadas."}}},Jb={auth_modal:{login_title:"Iniciar sessão ou registar-se",signup_title:"Continuar com o Shop",signup_description:"Crie uma conta do Shop para iniciar sessão com {clientName}, sem precisar de palavra-passe"}},Yb={terms_of_service:"termos de serviço",privacy_policy:"política de privacidade",terms:"termos",client:"Consulte a {termsOfService} e os {privacyPolicy} de {clientName}.",shop:"Ao continuar, aceita os {termsOfService} da Shop e toma conhecimento da {privacyPolicy}.",authorized_scopes:{email_name:"Ao continuar, o seu nome e endereço de e-mail serão partilhados com a loja {store}."}},Qb={auth_modal:{login_title:"Finalizar a compra com o Shop Pay",login_description:"Utilize as suas informações guardadas para finalizar a compra com segurança na {store}.",login_sms_title:"Confirme a sua identidade",login_sms_description:"Introduza o código enviado para {phoneNumber} para utilizar as suas informações guardadas de forma segura.",login_email_title:"Confirme a sua identidade",login_email_description:"Introduza o código enviado para o seu e-mail, {email}, para utilizar as suas informações guardadas de forma segura."}},Xb={auth_modal:{login_sms_description:"Introduza o código enviado para {phoneNumber} para utilizar as suas informações guardadas de forma segura.",login_email_description:"Introduza o código enviado para o seu e-mail, {email}, para utilizar as suas informações guardadas de forma segura."}};var ey={follow_on_shop:Kb,login_with_shop:Zb,customer_accounts:Gb,verified_email_auth:Jb,legal:Yb,payment_request:Qb,checkout_modal:Xb},ty=Object.freeze({__proto__:null,checkout_modal:Xb,customer_accounts:Gb,default:ey,follow_on_shop:Kb,legal:Yb,login_with_shop:Zb,payment_request:Qb,verified_email_auth:Jb});const ny={follow:"Urmărește în {shop}",following:"Urmărire în {shop}",auth_modal:{title:"Urmărește în Shop",description:"Rămâneți la curent – nu ratați niciodată o reducere, o realimentare a stocului sau o actualizare a comenzilor."},following_modal:{title:"Vizitează {store} în Shop",subtitle:"Tot ce ai nevoie pentru a face cumpărături, a urmări și a plăti – toate într-un singur loc.",qr_header:"Scanează pentru a vizita {store} în aplicația Shop",qr_alt_text:"Cod QR pentru aplicația Shop",continue:"Continuă"},completed:{title:"Urmărești {store}",subtitle:"Ți-am trimis un e-mail cu un link pentru a descărca aplicația Shop."},personalization_consent:{title:"Pentru a urmări pe Shop, sincronizează activitatea de cumpărături"}},iy={login:"Conectează-te folosind {shop}",auth_modal:{login_title:"Conectează-te la Shop",login_description:"Cel mai simplu și mai sigur mod de a te conecta la {store}—nu este necesară nicio parolă.",signup_title:"Creează un cont",signup_description:"Introdu-ți numărul de telefon pentru a crea un cont Shop.",login_sms_title:"Confirmă-ți identitatea",login_sms_description:"Introdu codul trimis la {phoneNumber}",login_email_title:"Confirmă-ți identitatea",login_email_description:"Introdu codul trimis la adresa ta de e-mail, {email}",login_title_with_store:"Conectează-te la {store} folosind Shop",login_webauthn_title:"Confirmă-ți identitatea",login_webauthn_description:"Conectează-te cu o cheie de acces pentru a folosi în siguranță informațiile salvate.",login_webauthn_footer:"Dacă alegi să continui, numele tău și adresa ta de e-mail vor fi partajate cu {store}."}},ay={remember_me:"Doresc să mi se salveze informațiile în mod securizat în relația cu Shop, pentru a mă conecta mai rapid pe toate dispozitivele",sign_up_page:{auth_modal:{login_title:"Continuă la Shop",login_description:"Folosește-ți contul Shop pentru a te conecta oriunde. N-ai nevoie de parolă.",login_sms_description:"Folosește-ți contul Shop pentru a te conecta oriunde. N-ai nevoie de parolă.Confirmă-ți identitatea, apoi introdu codul trimis la {phoneNumber}",login_email_description:"Folosește-ți contul Shop pentru a te conecta oriunde. N-ai nevoie de parolă.Confirmă-ți identitatea, apoi introdu codul trimis la adresa ta de e-mail, {email}",login_webauthn_title:"Continuă la Shop",login_webauthn_description:"Conectează-te cu o cheie de acces pentru a folosi în siguranță informațiile salvate."}}},oy={auth_modal:{login_title:"Conectează-te sau înregistrează-te",signup_title:"Continuă la Shop",signup_description:"Creazã un cont Shop pentru a te conecta la {clientName}–nu sunt necesare parole"}},sy={terms_of_service:"termenii de utilizare",privacy_policy:"politica de confidențialitate",terms:"termenii",client:"Vezi {termsOfService} a {clientName} și {privacyPolicy}.",shop:"Continuând, îți exprimi acordul cu {termsOfService} Shop și iei la cunoștință despre {privacyPolicy}.",authorized_scopes:{email_name:"Dacă alegi să continui, numele tău și adresa ta de e-mail vor fi partajate cu {store}."}},ry={auth_modal:{login_title:"Finalizează comanda cu Shop Pay",login_description:"Folosește informațiile salvate pentru a finaliza în mod securizat comanda la {store}.",login_sms_title:"Confirmă-ți identitatea",login_sms_description:"Introdu codul trimis la {phoneNumber} pentru a folosi în mod securizat informațiile salvate.",login_email_title:"Confirmă-ți identitatea",login_email_description:"Introdu codul trimis la adresa ta de e-mail, {email}, pentru a folosi în mod securizat informațiile salvate."}},ly={auth_modal:{login_sms_description:"Introdu codul trimis la {phoneNumber} pentru a folosi în mod securizat informațiile salvate.",login_email_description:"Introdu codul trimis la adresa ta de e-mail, {email}, pentru a folosi în mod securizat informațiile salvate."}};var cy={follow_on_shop:ny,login_with_shop:iy,customer_accounts:ay,verified_email_auth:oy,legal:sy,payment_request:ry,checkout_modal:ly},py=Object.freeze({__proto__:null,checkout_modal:ly,customer_accounts:ay,default:cy,follow_on_shop:ny,legal:sy,login_with_shop:iy,payment_request:ry,verified_email_auth:oy});const dy={follow:"Подписаться на {shop}",following:"Подписка на {shop}",auth_modal:{title:"Подписаться на Shop",description:"Будьте в курсе событий. Не пропускайте распродажи, пополнение ассортимента или обновления заказов."},following_modal:{title:"Перейти в магазин {store} в Shop",subtitle:"Все, что вам нужно, чтобы совершать покупки, отслеживать товары и оплачивать их, — собрано в одном приложении.",qr_header:"Сканируйте ,чтобы перейти в магазин {store} в приложении Shop",qr_alt_text:"QR-код приложения Shop",continue:"Продолжить"},completed:{title:"Вы подписаны на {store}",subtitle:"Мы отправили вам письмо со ссылкой для скачивания приложения Shop."},personalization_consent:{title:"Чтобы продолжить с помощью Shop, синхронизируйте свои действия в магазине"}},uy={login:"Войти, используя {shop}",auth_modal:{login_title:"Войти в Shop",login_description:"Самый простой и надежный способ войти в {store} — пароль не нужен.",signup_title:"Создать учетную запись",signup_description:"Чтобы создать учетную запись Shop, укажите свой номер телефона.",login_sms_title:"Подтвердите свою личность",login_sms_description:"Введите код, отправленный на номер тел.: {phoneNumber}",login_email_title:"Подтвердите свою личность",login_email_description:"Введите код, отправленный на ваш адрес электронной почты {email}",login_title_with_store:"Войдите в {store} с Shop",login_webauthn_title:"Подтвердите свою личность",login_webauthn_description:"Войдите с помощью ключа доступа, чтобы безопасно использовать ваши сохраненные данные.",login_webauthn_footer:"Если вы продолжите, ваши имя и адрес электронной почты будут предоставлены {store}."}},my={remember_me:"Надежно сохранить мои данные в Shop, чтобы быстрее выполнять вход в любой момент",sign_up_page:{auth_modal:{login_title:"Продолжить с помощью Shop",login_description:"Используйте свою учетную запись Shop, чтобы входить на всех устройствах без введения пароля.",login_sms_description:"Используйте свою учетную запись Shop, чтобы входить на всех устройствах без введения пароля.Введите код, отправленный на номер тел.: {phoneNumber}",login_email_description:"Используйте свою учетную запись Shop, чтобы входить на всех устройствах без введения пароля.Введите код, отправленный на ваш адрес электронной почты: {email}",login_webauthn_title:"Продолжить с помощью Shop",login_webauthn_description:"Войдите с помощью ключа доступа, чтобы безопасно использовать ваши сохраненные данные."}}},hy={auth_modal:{login_title:"Вход или регистрация",signup_title:"Продолжить с помощью Shop",signup_description:"Создайте учетную запись Shop, чтобы входить в {clientName} без введения пароля"}},_y={terms_of_service:"условия обслуживания",privacy_policy:"политикой конфиденциальности",terms:"условиями",client:"Ознакомьтесь с {termsOfService} и {privacyPolicy} {clientName}.",shop:"Продолжая, вы принимаете {termsOfService} и {privacyPolicy} Shop.",authorized_scopes:{email_name:"Если вы продолжите, ваши имя и адрес электронной почты будут предоставлены {store}."}},gy={auth_modal:{login_title:"Оформить заказ с помощью Shop Pay",login_description:"Используйте сохраненные данные, чтобы безопасно совершать покупки в {store}.",login_sms_title:"Подтвердите свою личность",login_sms_description:"Введите код, который был отправлен на номер {phoneNumber}, чтобы безопасно использовать ваши сохраненные данные.",login_email_title:"Подтвердите свою личность",login_email_description:"Введите код, который был отправлен на ваш адрес электронной почты ({email}), чтобы безопасно использовать ваши сохраненные данные."}},fy={auth_modal:{login_sms_description:"Введите код, который был отправлен на номер {phoneNumber}, чтобы безопасно использовать ваши сохраненные данные.",login_email_description:"Введите код, который был отправлен на ваш адрес электронной почты ({email}), чтобы безопасно использовать ваши сохраненные данные."}};var by={follow_on_shop:dy,login_with_shop:uy,customer_accounts:my,verified_email_auth:hy,legal:_y,payment_request:gy,checkout_modal:fy},yy=Object.freeze({__proto__:null,checkout_modal:fy,customer_accounts:my,default:by,follow_on_shop:dy,legal:_y,login_with_shop:uy,payment_request:gy,verified_email_auth:hy});const vy={follow:"Sledujte na: {shop}",following:"Sledujete na: {shop}",auth_modal:{title:"Sledujte v službe Shop",description:"Udržte si prehľad – nezmeškajte aktuálne informácie o výpredaji, naskladnení položky alebo objednávke."},following_modal:{title:"Navštívte obchod {store} v službe Shop",subtitle:"Všetko, čo potrebujete na nakupovanie, sledovanie a platbu – na jednom mieste.",qr_header:"Naskenujte a prejdite do obchodu {store} v aplikácii Shop",qr_alt_text:"QR kód aplikácie Shop",continue:"Pokračovať"},completed:{title:"Sledujete {store}",subtitle:"Odoslali sme vám e-mail s prepojením na stiahnutie aplikácie Shop."},personalization_consent:{title:"Ak chcete zostať v obraze v službe Shop, synchronizujte svoju nákupnú aktivitu"}},ky={login:"Prihlásiť sa cez {shop}",auth_modal:{login_title:"Prihlásenie cez Shop",login_description:"Najjednoduchší a najbezpečnejší spôsob prihlásenia do obchodu {store} – nie je potrebné žiadne heslo.",signup_title:"Vytvorenie konta",signup_description:"Zadajte svoje telefónne číslo a vytvorte konto Shop.",login_sms_title:"Potvrďte, že ste to vy",login_sms_description:"Zadajte kód odoslaný na číslo {phoneNumber}",login_email_title:"Potvrďte, že ste to vy",login_email_description:"Zadajte kód, ktorý ste dostali na e-mail {email}",login_title_with_store:"Prihláste sa do obchodu {store} cez Shop",login_webauthn_title:"Potvrďte, že ste to vy",login_webauthn_description:"Prihláste sa pomocou kľúča Passkey, aby ste mohli bezpečne používať uložené informácie.",login_webauthn_footer:"Ak budete pokračovať, vaše meno a e-mailová adresa sa budú zdieľať s obchodom {store}."}},wy={remember_me:"Uložiť moje informácie pomocou služby Shop na rýchlejšie prihlásenie odkiaľkoľvek",sign_up_page:{auth_modal:{login_title:"Pokračovať cez Shop",login_description:"Používajte svoje konto Shop na prihlasovanie sa odkiaľkoľvek – nie je potrebné žiadne heslo.",login_sms_description:"Používajte svoje konto Shop na prihlasovanie sa odkiaľkoľvek – nie je potrebné žiadne heslo.\r\n\r\nPotvrďte, že ste to vy, a zadajte kód odoslaný na číslo {phoneNumber}",login_email_description:"Používajte svoje konto Shop na prihlasovanie sa odkiaľkoľvek – nie je potrebné žiadne heslo.\r\n\r\nPotvrďte, že ste to vy, a zadajte kód odoslaný na e-mail {email}",login_webauthn_title:"Pokračujte cez Shop",login_webauthn_description:"Prihláste sa pomocou kľúča Passkey, aby ste mohli bezpečne používať uložené informácie."}}},Py={auth_modal:{login_title:"Prihláste sa alebo sa zaregistrujte",signup_title:"Pokračovať cez Shop",signup_description:"Vytvorte si konto Shop na prihlasovanie sa k spoločnosti {clientName} – nie je potrebné žiadne heslo."}},Sy={terms_of_service:"podmienky poskytovania služby",privacy_policy:"pravidlá ochrany súkromia",terms:"podmienky",client:"Pozrite si {termsOfService} a {privacyPolicy} spoločnosti {clientName}.",shop:"Pokračovaním vyjadrujete svoj súhlas s obsahom dokumentov {termsOfService} a {privacyPolicy} aplikácie Shop.",authorized_scopes:{email_name:"Ak budete pokračovať, vaše meno a e-mailová adresa sa budú zdieľať s obchodom {store}."}},zy={auth_modal:{login_title:"Zaplaťte cez Shop Pay",login_description:"Plaťte bezpečne v obchode {store} s použitím uložených údajov.",login_sms_title:"Potvrďte, že ste to vy",login_sms_description:"Zadajte kód odoslaný na číslo {phoneNumber}, aby ste mohli bezpečne použiť uložené informácie.",login_email_title:"Potvrďte, že ste to vy",login_email_description:"Zadajte kód odoslaný na váš e-mail ({email}), aby ste mohli bezpečne použiť uložené informácie."}},jy={auth_modal:{login_sms_description:"Zadajte kód odoslaný na číslo {phoneNumber}, aby ste mohli bezpečne použiť uložené informácie.",login_email_description:"Zadajte kód odoslaný na váš e-mail ({email}), aby ste mohli bezpečne použiť uložené informácie."}};var Cy={follow_on_shop:vy,login_with_shop:ky,customer_accounts:wy,verified_email_auth:Py,legal:Sy,payment_request:zy,checkout_modal:jy},xy=Object.freeze({__proto__:null,checkout_modal:jy,customer_accounts:wy,default:Cy,follow_on_shop:vy,legal:Sy,login_with_shop:ky,payment_request:zy,verified_email_auth:Py});const Ly={follow:"Sledite v trgovini {shop}",following:"Sledenje v trgovini {shop}",auth_modal:{title:"Sledi v trgovini",description:"Ostanite na tekočem – nikoli ne zamudite prodaje, ponovne zaloge ali posodobitve naročila."},following_modal:{title:"V aplikaciji Shop obiščite trgovino {store}",subtitle:"Vse za nakup, sledenje in plačilo na enem mestu.",qr_header:"Optično preberite za obisk trgovine {store} prek aplikacije Shop",qr_alt_text:"Koda QR aplikacije Shop",continue:"Nadaljuj"},completed:{title:"Sledite trgovini {store}",subtitle:"Poslali smo vam e-poštno sporočilo s povezavo za prenos aplikacije Shop."},personalization_consent:{title:"Če želite sledenje v aplikaciji Shop, sinhronizirajte svojo nakupe"}},Ay={login:"Prijavite se s funkcijo {shop}",auth_modal:{login_title:"Prijava z aplikacijo Shop",login_description:"Najbolj preprost in najbolj varen način za vpis v trgovino {store} – geslo ni potrebno.",signup_title:"Ustvari račun",signup_description:"Za ustvarjanje računa v aplikaciji Shop vnesite svojo telefonsko številko.",login_sms_title:"Potrdite, da ste to vi",login_sms_description:"Vnesite kodo, ki je bila poslana na {phoneNumber}",login_email_title:"Potrdite, da ste to vi",login_email_description:"Vnesite kodo, ki je bila poslana na vaš e-poštni naslov, {email}",login_title_with_store:"Prijava v {store} z aplikacijo Shop",login_webauthn_title:"Potrdite, da ste to vi",login_webauthn_description:"Za varno uporabo svojih shranjenih podatkov se vpišite s ključem.",login_webauthn_footer:"Če nadaljujete, bomo vaše ime in e-poštni naslov delili s ponudnikom {store}."}},Ty={remember_me:"Moje podatke varno shrani v aplikacijo Shop za hitrejši vpis",sign_up_page:{auth_modal:{login_title:"Nadaljujte z uporabo aplikacije Shop",login_description:"Uporabljajte svoj račun Shop za vpis povsod – gesla ne boste potrebovali.",login_sms_description:"Uporabljajte svoj račun Shop za vpis povsod – gesla ne boste potrebovali.\n\nPotrdite, da ste to vi, vnesite kodo, poslano na {phoneNumber}",login_email_description:"Uporabljajte svoj račun Shop za vpis povsod – gesla ne boste potrebovali.\n\nPotrdite, da ste to vi, vnesite kodo, poslano na vaš e-poštni naslov ({email})",login_webauthn_title:"Nadaljujte z uporabo aplikacije Shop",login_webauthn_description:"Za varno uporabo svojih shranjenih podatkov se vpišite s ključem."}}},Ey={auth_modal:{login_title:"Prijava ali registracija",signup_title:"Nadaljujte z uporabo aplikacije Shop",signup_description:"Za vpis v {clientName} ustvarite račun Shop – gesel ne boste potrebovali"}},Iy={terms_of_service:"pogoji storitve",privacy_policy:"pravilnik o zasebnosti",terms:"pogoji",client:"Preberite {termsOfService} in {privacyPolicy} ponudnika {clientName}.",shop:"Če nadaljujete, se strinjate z določili, ki jih navajajo {termsOfService} aplikacije Shop, in potrjujete, da ste prebrali {privacyPolicy}.",authorized_scopes:{email_name:"Če nadaljujete, bomo vaše ime in e-poštni naslov delili s ponudnikom {store}."}},My={auth_modal:{login_title:"Zaključek nakupa s funkcijo Shop Pay",login_description:"Uporabite shranjene podatke za varen zaključek nakupa v trgovini {store}.",login_sms_title:"Potrdite, da ste to vi",login_sms_description:"Za varno uporabo svojih shranjenih podatkov vnesite kodo, poslano na telefonsko številko {phoneNumber}.",login_email_title:"Potrdite, da ste to vi",login_email_description:"Za varno uporabo svojih shranjenih podatkov vnesite kodo, poslano na vaš e-poštni naslov {email}."}},Oy={auth_modal:{login_sms_description:"Za varno uporabo svojih shranjenih podatkov vnesite kodo, poslano na telefonsko številko {phoneNumber}.",login_email_description:"Za varno uporabo svojih shranjenih podatkov vnesite kodo, poslano na vaš e-poštni naslov {email}."}};var Ny={follow_on_shop:Ly,login_with_shop:Ay,customer_accounts:Ty,verified_email_auth:Ey,legal:Iy,payment_request:My,checkout_modal:Oy},qy=Object.freeze({__proto__:null,checkout_modal:Oy,customer_accounts:Ty,default:Ny,follow_on_shop:Ly,legal:Iy,login_with_shop:Ay,payment_request:My,verified_email_auth:Ey});const Ry={follow:"Följ på {shop}",following:"Följer på {shop}",auth_modal:{title:"Följ på Shop",description:"Håll dig uppdaterad – missa aldrig en uppdatering om försäljning, lagerpåfyllning eller ordrar igen."},following_modal:{title:"Besök {store} på Shop",subtitle:"Allt du behöver för att shoppa, spåra och betala – på ett och samma ställe.",qr_header:"Skanna för att besöka {store} i Shop-appen",qr_alt_text:"Shop-appens QR-kod",continue:"Fortsätt"},completed:{title:"Du följer {store}",subtitle:"Vi har skickat ett e-postmeddelande med en länk för att ladda ned Shop-appen till dig."},personalization_consent:{title:"Synkronisera din shoppingaktivitet för att följa på Shop"}},Dy={login:"Logga in med {shop}",auth_modal:{login_title:"Logga in med Shop",login_description:"Det enklaste och säkraste sättet att logga in på {store} – utan krav på lösenord.",signup_title:"Skapa ett konto",signup_description:"Ange ditt telefonnummer för att skapa ett Shop-konto.",login_sms_title:"Bekräfta att det är du",login_sms_description:"Ange koden som skickats till {phoneNumber}",login_email_title:"Bekräfta att det är du",login_email_description:"Ange koden som skickats till din e-postadress, {email}",login_title_with_store:"Logga in på {store} med Shop",login_webauthn_title:"Bekräfta att det är du",login_webauthn_description:"Logga in med en huvudnyckel för att använda din sparade information på ett säkert sätt.",login_webauthn_footer:"Om du fortsätter delas ditt namn och din e-postadress med {store}."}},By={remember_me:"Spara min information säkert med Shop för att logga in snabbare överallt",sign_up_page:{auth_modal:{login_title:"Fortsätt med Shop",login_description:"Använd ditt Shop-konto för att logga in överallt–utan behov av lösenord.",login_sms_description:"Använd ditt Shop-konto för att logga in överallt–utan behov av lösenord.Bekräfta att det är du genom att ange koden som har skickats till {phoneNumber}",login_email_description:"Använd ditt Shop-konto för att logga in överallt–utan behov av lösenord.Bekräfta att det är du genom att ange koden som skickats till e-postadressen {email}",login_webauthn_title:"Fortsätt med Shop",login_webauthn_description:"Logga in med en inloggningsnyckel för att använda din sparade information på ett säkert sätt."}}},Fy={auth_modal:{login_title:"Logga in eller registrera dig",signup_title:"Fortsätt med Shop",signup_description:"Skapa ett Shop-konto för att logga in på {clientName} – inget lösenord behövs"}},Vy={terms_of_service:"användarvillkor",privacy_policy:"integritetspolicy",terms:"villkor",client:"Se {termsOfService} och {privacyPolicy} för {clientName}.",shop:"Genom att fortsätta samtycker du till Shops {termsOfService} och bekräftar {privacyPolicy}.",authorized_scopes:{email_name:"Om du fortsätter delas ditt namn och din e-postadress med {store}."}},$y={auth_modal:{login_title:"Betala i kassan med Shop Pay",login_description:"Använd din sparade information för att betala säkert hos {store}.",login_sms_title:"Bekräfta att det är du",login_sms_description:"Ange koden som skickades till {phoneNumber} för att kunna använda din sparade information säkert.",login_email_title:"Bekräfta att det är du",login_email_description:"Ange koden som skickades till din e-postadress {email} för att kunna använda din sparade information säkert."}},Wy={auth_modal:{login_sms_description:"Ange koden som skickades till {phoneNumber} för att kunna använda din sparade information säkert.",login_email_description:"Ange koden som skickades till din e-postadress {email} för att kunna använda din sparade information säkert."}};var Uy={follow_on_shop:Ry,login_with_shop:Dy,customer_accounts:By,verified_email_auth:Fy,legal:Vy,payment_request:$y,checkout_modal:Wy},Hy=Object.freeze({__proto__:null,checkout_modal:Wy,customer_accounts:By,default:Uy,follow_on_shop:Ry,legal:Vy,login_with_shop:Dy,payment_request:$y,verified_email_auth:Fy});const Ky={follow:"ติดตามบน {shop}",following:"กำลังติดตามบน {shop}",auth_modal:{title:"ติดตามบน Shop",description:"รับรู้ข่าวสารได้ตลอดเวลา และไม่พลาดการลดราคา การคืนสินค้ากลับสต็อกหรือการอัปเดตคำสั่งซื้อ"},following_modal:{title:"เข้าชม {store} บนร้านค้า",subtitle:"ทุกสิ่งที่คุณต้องการในร้านค้า ติดตาม และชำระเงิน — ทั้งหมดในที่เดียว",qr_header:"สแกนเพื่อเยี่ยมชม {store} บนแอป Shop",qr_alt_text:"คิวอาร์โค้ดแอป Shop",continue:"ดำเนินการต่อ"},completed:{title:"คุณกำลังติดตาม {store}",subtitle:"เราได้ส่งอีเมลพร้อมลิงก์สำหรับดาวน์โหลดแอปร้านค้าให้คุณแล้ว"},personalization_consent:{title:"หากต้องการติดตามบน Shop ให้ซิงค์กิจกรรมการเลือกซื้อของคุณ"}},Zy={login:"ลงชื่อเข้าใช้ด้วย {shop}",auth_modal:{login_title:"ลงชื่อเข้าใช้ด้วย Shop",login_description:"วิธีที่สะดวกและปลอดภัยที่สุดในการลงชื่อเข้าใช้ {store} โดยไม่จำเป็นต้องใช้รหัสผ่าน",signup_title:"สร้างบัญชีผู้ใช้",signup_description:"ป้อนหมายเลขโทรศัพท์เพื่อสร้างบัญชี Shop",login_sms_title:"โปรดยืนยันว่านี่คือคุณ",login_sms_description:"ป้อนรหัสที่ส่งไปยัง {phoneNumber}",login_email_title:"โปรดยืนยันว่าเป็นคุณ",login_email_description:"ป้อนรหัสที่ส่งไปยังอีเมล {email}",login_title_with_store:"ลงชื่อเข้าใช้ {store} ด้วย Shop",login_webauthn_title:"โปรดยืนยันว่าเป็นคุณ",login_webauthn_description:"ลงชื่อเข้าใช้ด้วยพาสคีย์เพื่อใช้ข้อมูลของคุณที่บันทึกไว้อย่างปลอดภัย",login_webauthn_footer:"เมื่อคุณดำเนินการต่อ ระบบจะแชร์ชื่อและที่อยู่อีเมลของคุณกับ {store}"}},Gy={remember_me:"บันทึกข้อมูลของฉันอย่างปลอดภัยด้วย Shop เพื่อให้ลงชื่อเข้าใช้ได้รวดเร็วยิ่งขึ้นจากทุกที่",sign_up_page:{auth_modal:{login_title:"ดำเนินการต่อด้วย Shop",login_description:"ลงชื่อเข้าใช้ด้วยบัญชีผู้ใช้ Shop ของคุณจากทุกที่โดยไม่จำเป็นต้องใช้รหัสผ่าน",login_sms_description:"ลงชื่อเข้าใช้ด้วยบัญชีผู้ใช้ Shop ของคุณจากทุกที่โดยไม่จำเป็นต้องใช้รหัสผ่าน\r\n\r\nโปรดยืนยันตัวตนด้วยการป้อนรหัสที่ส่งไปยัง {phoneNumber}",login_email_description:"ลงชื่อเข้าใช้ด้วยบัญชีผู้ใช้ Shop ของคุณจากทุกที่โดยไม่จำเป็นต้องใช้รหัสผ่าน\r\n\r\nโปรดยืนยันตัวตนด้วยการป้อนรหัสที่ส่งไปยังอีเมล {email} ของคุณ",login_webauthn_title:"ดำเนินการต่อด้วย Shop",login_webauthn_description:"ลงชื่อเข้าใช้ด้วยพาสคีย์เพื่อใช้ข้อมูลของคุณที่บันทึกไว้อย่างปลอดภัย"}}},Jy={auth_modal:{login_title:"เข้าสู่ระบบหรือลงทะเบียน",signup_title:"ดำเนินการต่อด้วย Shop",signup_description:"สร้างบัญชี Shop เพื่อลงชื่อเข้าใช้ {clientName}– โดยไม่ต้องใช้รหัส"}},Yy={terms_of_service:"ข้อกำหนดในการใช้บริการ",privacy_policy:"นโยบายความเป็นส่วนตัว",terms:"เงื่อนไข",client:"ดู{termsOfService}ของ{clientName}และ{privacyPolicy}",shop:"เมื่อคุณดำเนินการต่อ จะถือว่าคุณยอมรับ {termsOfService} ของ Shop และรับทราบ {privacyPolicy} แล้ว",authorized_scopes:{email_name:"เมื่อคุณดำเนินการต่อ ระบบจะแชร์ชื่อและที่อยู่อีเมลของคุณกับ {store}"}},Qy={auth_modal:{login_title:"ชำระเงินด้วย Shop Pay",login_description:"ใช้ข้อมูลที่บันทึกไว้เพื่อชำระเงินอย่างปลอดภัยที่ {store}",login_sms_title:"โปรดยืนยันว่าเป็นคุณ",login_sms_description:"ป้อนรหัสที่ส่งไปยัง {phoneNumber} เพื่อใช้ข้อมูลที่บันทึกไว้อย่างปลอดภัยของคุณ",login_email_title:"โปรดยืนยันว่าเป็นคุณ",login_email_description:"ป้อนรหัสที่ส่งไปยังอีเมล {email} เพื่อใช้ข้อมูลที่บันทึกไว้อย่างปลอดภัยของคุณ"}},Xy={auth_modal:{login_sms_description:"ป้อนรหัสที่ส่งไปยัง {phoneNumber} เพื่อใช้ข้อมูลที่บันทึกไว้อย่างปลอดภัยของคุณ",login_email_description:"ป้อนรหัสที่ส่งไปยังอีเมล {email} เพื่อใช้ข้อมูลที่บันทึกไว้อย่างปลอดภัยของคุณ"}};var ev={follow_on_shop:Ky,login_with_shop:Zy,customer_accounts:Gy,verified_email_auth:Jy,legal:Yy,payment_request:Qy,checkout_modal:Xy},tv=Object.freeze({__proto__:null,checkout_modal:Xy,customer_accounts:Gy,default:ev,follow_on_shop:Ky,legal:Yy,login_with_shop:Zy,payment_request:Qy,verified_email_auth:Jy});const nv={follow:"{shop} üzerinden takip et",following:"{shop} üzerinden takip ediliyor",auth_modal:{title:"Shop'ta takip edin",description:"Haberdar olun - Hiçbir satış, stoka geri ekleme veya sipariş güncellemesini kaçırmayın."},following_modal:{title:"{store} mağazasını Shop'ta ziyaret edin",subtitle:"Alışveriş yapmak, takip etmek ve ödeme yapmak için ihtiyaç duyduklarınızın tümü tek bir yerde.",qr_header:"{store} mağazasını Shop'ta ziyaret etmek için tarayın",qr_alt_text:"Shop uygulaması QR kodu",continue:"Devam"},completed:{title:"{store} mağazasını takip ediyorsunuz",subtitle:"Size Shop uygulamasını indirebileceğiniz bağlantının bulunduğu bir e-posta gönderdik."},personalization_consent:{title:"Shop'ta takip etmek için alışveriş etkinliklerinizi senkronize edin"}},iv={login:"{shop} ile giriş yapın",auth_modal:{login_title:"Shop ile Giriş Yapın",login_description:"{store} adlı mağazaya giriş yapmanın en kolay ve en güvenli yolu. Parola gerekmez.",signup_title:"Hesap oluşturun",signup_description:"Bir Shop hesabı oluşturmak için telefon numaranızı girin.",login_sms_title:"Kimliğinizi doğrulayın",login_sms_description:"{phoneNumber} numaralı telefona gönderilen kodu girin",login_email_title:"Kimliğinizi doğrulayın",login_email_description:"E-posta adresinize ({email}) gönderilen kodu girin",login_title_with_store:"{store} mağazasına Shop ile giriş yapın",login_webauthn_title:"Kimliğinizi doğrulayın",login_webauthn_description:"Kayıtlı bilgilerinizi güvenli bir şekilde kullanmak için bir geçiş anahtarıyla giriş yapın.",login_webauthn_footer:"Devam etmeniz halinde adınız ve e-posta adresiniz {store} ile paylaşılır."}},av={remember_me:"Her yerde daha hızlı giriş yapmak için bilgilerimi Shop'a güvenli bir şekilde kaydet",sign_up_page:{auth_modal:{login_title:"Shop ile Devam Edin",login_description:"Parola gerekmeden her yere giriş yapmak için Shop hesabınızı kullanın.",login_sms_description:"Parola gerekmeden her yere giriş yapmak için Shop hesabınızı kullanın.\r\n\r\nKimliğinizi doğrulayın; {phoneNumber} numaralı telefona gönderilen kodu girin",login_email_description:"Parola gerekmeden her yere giriş yapmak için Shop hesabınızı kullanın.\r\n\r\nKimliğinizi doğrulayın; e-posta adresinize ({email}) gönderilen kodu girin",login_webauthn_title:"Shop ile devam edin",login_webauthn_description:"Kayıtlı bilgilerinizi güvenli bir şekilde kullanmak için bir geçiş anahtarıyla giriş yapın."}}},ov={auth_modal:{login_title:"Oturum açın veya kaydolun",signup_title:"Shop ile Devam Edin",signup_description:"Parola gerekmeden {clientName} öğesine giriş yapmak için kullanacağınız Shop hesabınızı oluşturun."}},sv={terms_of_service:"hizmet şartlarını",privacy_policy:"gizlilik politikasını",terms:"şartlarını",client:"{clientName} {termsOfService} ve {privacyPolicy} gözden geçirin.",shop:"Devam ettiğinizde, Shop'un {termsOfService} ve {privacyPolicy} hükümlerini kabul etmiş olursunuz.",authorized_scopes:{email_name:"Devam ettiğinizde, adınız ve e-posta adresiniz {store} ile paylaşılır."}},rv={auth_modal:{login_title:"Shop Pay ile ödeme yapın",login_description:"{store}mağazasında güvenle ödeme yapmak için kayıtlı bilgilerinizi kullanın.",login_sms_title:"Kimliğinizi doğrulayın",login_sms_description:"Kayıtlı bilgilerinizi güvenli şekilde kullanmak için {phoneNumber} numaralı telefona gönderilen kodu girin.",login_email_title:"Kimliğinizi doğrulayın",login_email_description:"Kayıtlı bilgilerinizi güvenli şekilde kullanmak için e-postanıza ({email}) gönderilen kodu girin."}},lv={auth_modal:{login_sms_description:"Kayıtlı bilgilerinizi güvenli bir şekilde kullanmak için {phoneNumber} numaralı telefona gönderilen kodu girin.",login_email_description:"Kayıtlı bilgilerinizi güvenli bir şekilde kullanmak için e-postanıza ({email}) gönderilen kodu girin."}};var cv={follow_on_shop:nv,login_with_shop:iv,customer_accounts:av,verified_email_auth:ov,legal:sv,payment_request:rv,checkout_modal:lv},pv=Object.freeze({__proto__:null,checkout_modal:lv,customer_accounts:av,default:cv,follow_on_shop:nv,legal:sv,login_with_shop:iv,payment_request:rv,verified_email_auth:ov});const dv={follow:"Theo dõi trên {shop}",following:"Đang theo dõi trên {shop}",auth_modal:{title:"Theo dõi trên Shop",description:"Luôn cập nhật—không bỏ lỡ thông tin nào về đợt giảm giá, bổ sung hàng hoặc đơn hàng."},following_modal:{title:"Truy cập {store} trên Shop",subtitle:"Mọi thứ bạn cần để mua sắm, theo dõi và thanh toán—tất cả ở cùng một nơi.",qr_header:"Quét để truy cập {store} trên ứng dụng Shop",qr_alt_text:"Mã QR của ứng dụng Shop",continue:"Tiếp tục"},completed:{title:"Bạn đang theo dõi {store}",subtitle:"Chúng tôi đã gửi cho bạn email chứa liên kết tải xuống ứng dụng Shop."},personalization_consent:{title:"Để theo dõi trên Shop, hãy đồng bộ hóa hoạt động mua sắm"}},uv={login:"Đăng nhập bằng {shop}",auth_modal:{login_title:"Đăng nhập bằng Shop",login_description:"Cách đơn giản và an toàn nhất để đăng nhập vào {store}—không cần mật khẩu.",signup_title:"Tạo tài khoản",signup_description:"Nhập số điện thoại để tạo tài khoản Shop.",login_sms_title:"Xác nhận đó chính là bạn",login_sms_description:"Nhập mã được gửi đến {phoneNumber}",login_email_title:"Xác nhận đó chính là bạn",login_email_description:"Nhập mã bạn nhận được qua email, {email}",login_title_with_store:"Đăng nhập vào {store} bằng Shop",login_webauthn_title:"Xác nhận đó chính là bạn",login_webauthn_description:"Đăng nhập bằng passkey để sử dụng thông tin đã lưu một cách an toàn.",login_webauthn_footer:"Nếu chọn tiếp tục, tên và địa chỉ email của bạn sẽ được chia sẻ với {store}."}},mv={remember_me:"Lưu thông tin của tôi một cách an toàn bằng Shop để đăng nhập ở mọi nơi nhanh hơn",sign_up_page:{auth_modal:{login_title:"Tiếp tục với Shop",login_description:"Sử dụng tài khoản Shop để đăng nhập vào bất cứ đâu—không cần mật khẩu.",login_sms_description:"Sử dụng tài khoản Shop để đăng nhập vào bất cứ đâu—không cần mật khẩu.\r\n\r\nXác nhận đó chính là bạn, nhập mã được gửi đến {phoneNumber}",login_email_description:"Sử dụng tài khoản Shop để đăng nhập vào bất cứ đâu—không cần mật khẩu.\r\n\r\nXác nhận đó chính là bạn, nhập mã được gửi đến email {email} của bạn",login_webauthn_title:"Tiếp tục với Shop",login_webauthn_description:"Đăng nhập bằng khóa xác thực để sử dụng thông tin đã lưu một cách an toàn."}}},hv={auth_modal:{login_title:"Đăng nhập hoặc đăng ký",signup_title:"Tiếp tục với Shop",signup_description:"Tạo tài khoản Shop để đăng nhập vào {clientName}–không cần mật khẩu"}},_v={terms_of_service:"điều khoản dịch vụ",privacy_policy:"chính sách quyền riêng tư",terms:"điều khoản",client:"Xem {termsOfService} và {privacyPolicy} của {clientName}.",shop:"Nếu chọn tiếp tục, bạn đồng ý với {termsOfService} của Shop và xác nhận {privacyPolicy}.",authorized_scopes:{email_name:"Nếu chọn tiếp tục, tên và địa chỉ email của bạn sẽ được chia sẻ với {store}."}},gv={auth_modal:{login_title:"Thanh toán bằng Shop Pay",login_description:"Sử dụng thông tin đã lưu để thanh toán an toàn tại {store}.",login_sms_title:"Xác nhận đó chính là bạn",login_sms_description:"Nhập mã được gửi đến {phoneNumber} để sử dụng thông tin đã lưu một cách bảo mật.",login_email_title:"Xác nhận đó chính là bạn",login_email_description:"Nhập mã được gửi đến email của bạn {email} để sử dụng thông tin đã lưu một cách bảo mật."}},fv={auth_modal:{login_sms_description:"Nhập mã được gửi đến {phoneNumber} để sử dụng thông tin đã lưu một cách bảo mật.",login_email_description:"Nhập mã được gửi đến email của bạn {email} để sử dụng thông tin đã lưu một cách bảo mật."}};var bv={follow_on_shop:dv,login_with_shop:uv,customer_accounts:mv,verified_email_auth:hv,legal:_v,payment_request:gv,checkout_modal:fv},yv=Object.freeze({__proto__:null,checkout_modal:fv,customer_accounts:mv,default:bv,follow_on_shop:dv,legal:_v,login_with_shop:uv,payment_request:gv,verified_email_auth:hv});const vv={follow:"在 {shop} 中关注",following:"在 {shop} 中关注",auth_modal:{title:"在 Shop 中关注",description:"了解最新动态—绝不错过任何促销、补货或订单更新消息。"},following_modal:{title:"在 Shop 中访问 {store}",subtitle:"提供您购物、跟踪和支付所需的一切资源—全部在一个位置。",qr_header:"扫描以在 Shop 应用中访问 {store}",qr_alt_text:"Shop 应用二维码",continue:"继续"},completed:{title:"您即将关注 {store}",subtitle:"我们已向您发送电子邮件，其中包含下载 Shop 应用的链接。"},personalization_consent:{title:"若要在 Shop 上进行关注，请同步您的购物活动"}},kv={login:"使用 {shop} 登录",auth_modal:{login_title:"使用 Shop 登录",login_description:"登录 {store} 的最简单和最安全的方式—无需密码。",signup_title:"创建账户",signup_description:"请输入您的电话号码以创建 Shop 账户。",login_sms_title:"确认这是您本人",login_sms_description:"输入发送到 {phoneNumber} 的代码",login_email_title:"确认这是您本人",login_email_description:"请输入发送到您的邮箱 {email} 的代码",login_title_with_store:"使用 Shop 登录 {store}",login_webauthn_title:"确认这是您本人",login_webauthn_description:"使用密钥登录以安全地使用您保存的信息。",login_webauthn_footer:"如果继续，您的姓名和邮箱将被分享给 {store}。"}},wv={remember_me:"使用 Shop 安全地保存我的信息，以便随处快速登录",sign_up_page:{auth_modal:{login_title:"继续使用 Shop",login_description:"使用您的 Shop 账户在各处登录—无需密码。",login_sms_description:"使用您的 Shop 账户在各处登录—无需密码。\r\n\r\n请确认这是您本人，输入发送到 {phoneNumber} 的代码",login_email_description:"使用您的 Shop 账户在各处登录—无需密码。\r\n\r\n请确认这是您本人，输入发送到邮箱 {email} 的代码",login_webauthn_title:"继续使用 Shop",login_webauthn_description:"使用密钥登录以安全地使用您保存的信息。"}}},Pv={auth_modal:{login_title:"登录或注册",signup_title:"继续使用 Shop",signup_description:"创建 Shop 账户以登录 {clientName}–无需密码"}},Sv={terms_of_service:"服务条款",privacy_policy:"隐私政策",terms:"条款",client:"请查看 {clientName} 的{termsOfService}和{privacyPolicy}。",shop:"继续即表示您同意 Shop 的 {termsOfService} 且认可 {privacyPolicy}。",authorized_scopes:{email_name:"如果继续，您的姓名和邮箱将被分享给 {store}。"}},zv={auth_modal:{login_title:"使用 Shop Pay 结账",login_description:"使用您已保存的信息在 {store} 安全地结账。",login_sms_title:"确认这是您本人",login_sms_description:"输入发送到 {phoneNumber} 的代码以安全地使用您保存的信息。",login_email_title:"确认这是您本人",login_email_description:"输入发送到您邮箱 {email} 的代码以安全地使用您保存的信息。"}},jv={auth_modal:{login_sms_description:"输入发送到 {phoneNumber} 的代码以安全地使用您保存的信息。",login_email_description:"输入发送到您邮箱 {email} 的代码以安全地使用您保存的信息。"}};var Cv={follow_on_shop:vv,login_with_shop:kv,customer_accounts:wv,verified_email_auth:Pv,legal:Sv,payment_request:zv,checkout_modal:jv},xv=Object.freeze({__proto__:null,checkout_modal:jv,customer_accounts:wv,default:Cv,follow_on_shop:vv,legal:Sv,login_with_shop:kv,payment_request:zv,verified_email_auth:Pv});const Lv={follow:"在 {shop} 上追蹤",following:"正在 {shop} 上追蹤",auth_modal:{title:"在 Shop 上追蹤",description:"隨時掌握最新狀況，從不錯過銷售、重新入庫或訂單更新消息。"},following_modal:{title:"造訪 Shop 上的 {store}",subtitle:"透過單一平台，取得購物、追蹤和付款的一切所需。",qr_header:"掃描以前往 Shop 應用程式上的 {store}",qr_alt_text:"Shop 應用程式 QR 碼",continue:"繼續"},completed:{title:"您正在追蹤 {store}",subtitle:"我們已傳送一封已附上 Shop 應用程式下載連結的電子郵件。"},personalization_consent:{title:"若要在 Shop 上追蹤，請同步您的購物活動"}},Av={login:"以 {shop} 登入",auth_modal:{login_title:"以 Shop 登入",login_description:"登入 {store} 最簡單且安全的方式，無需使用密碼。",signup_title:"建立帳號",signup_description:"輸入您的電話號碼以建立 Shop 帳號。",login_sms_title:"確認是您",login_sms_description:"輸入傳送至 {phoneNumber} 的代碼",login_email_title:"確認是您",login_email_description:"請輸入傳送到您電子郵件 ({email}) 的代碼",login_title_with_store:"以 Shop 登入 {store}",login_webauthn_title:"確認是您",login_webauthn_description:"使用密碼金鑰登入以安全使用您儲存的詳細資訊。",login_webauthn_footer:"若繼續進行，您的姓名和電子郵件地址將與 {store} 分享。"}},Tv={remember_me:"使用 Shop 安全地儲存我的資訊，以加速各平台的登入速度",sign_up_page:{auth_modal:{login_title:"繼續使用 Shop",login_description:"運用 Shop 帳號登入各處，而無需使用密碼。",login_sms_description:"運用 Shop 帳號登入各處，而無需使用密碼。\r\n\r\n確認這是您本人，並輸入傳送至 {phoneNumber} 的代碼",login_email_description:"運用 Shop 帳號登入各處，而無需使用密碼。\r\n\r\n確認這是您本人，並輸入傳送至電子郵件 ({email}) 的代碼",login_webauthn_title:"繼續使用 Shop",login_webauthn_description:"使用密碼金鑰登入以安全使用您儲存的詳細資訊。"}}},Ev={auth_modal:{login_title:"登入或註冊",signup_title:"繼續使用 Shop",signup_description:"建立 Shop 帳號登入 {clientName}，而無需使用密碼"}},Iv={terms_of_service:"服務條款",privacy_policy:"隱私權政策",terms:"條款",client:"查看 {clientName} 的{termsOfService}和{privacyPolicy}。",shop:"繼續進行即表示您同意 Shop 的{termsOfService}並確認{privacyPolicy}。",authorized_scopes:{email_name:"若繼續進行，您的姓名和電子郵件地址將與 {store} 分享。"}},Mv={auth_modal:{login_title:"使用 Shop Pay 結帳",login_description:"使用您儲存的資訊在 {store} 安全結帳。",login_sms_title:"確認是您",login_sms_description:"輸入傳送到 {phoneNumber} 的代碼，以安全使用您儲存的資訊。",login_email_title:"確認是您",login_email_description:"輸入傳送到 {email} 的代碼，以安全使用儲存的資訊。"}},Ov={auth_modal:{login_sms_description:"輸入傳送到 {phoneNumber} 的代碼，以安全使用您儲存的資訊。",login_email_description:"輸入傳送到 {email} 的代碼，以安全使用儲存的資訊。"}};var Nv={follow_on_shop:Lv,login_with_shop:Av,customer_accounts:Tv,verified_email_auth:Ev,legal:Iv,payment_request:Mv,checkout_modal:Ov},qv=Object.freeze({__proto__:null,checkout_modal:Ov,customer_accounts:Tv,default:Nv,follow_on_shop:Lv,legal:Iv,login_with_shop:Av,payment_request:Mv,verified_email_auth:Ev});const Rv="Affirm",Dv="Shop Pay",Bv={learn_more:"Научете повече",view_sample_plans:"Преглед на примерни планове",prequal:"Проверете какви покупки можете да направите",split_pay_eligible:"Платете с 4 вноски от <b>{price}</b> с {shopPayLogo}",interest_only_eligible:"Разделете покупката на месечни вноски с {shopPayLogo}",dynamic_interest_only_eligible:"От <b>{price}</b>/месец с {shopPayLogo}",pay_in_4_or_as_low_as_eligible:"4 вноски без лихва, или от <b>{price}</b> на месец с {shopPayLogo}",zero_interest_eligible:"От <b>{price}</b>/месец или 0% ГПР с {shopPayLogo}",zero_interest_eligible_zero_apr:"От <b>{price}</b>/месец, 0% ГПР с {shopPayLogo}",non_eligible_min:"Платете с 4 вноски без лихва за поръчки над <b>{minPrice}</b> с {shopPayLogo}",non_eligible_monthly_payments_min:"Разделете покупката на месечни вноски за поръчки над <b>{minPrice}</b> с {shopPayLogo}",non_eligible_max:"Разделете покупката на месечни вноски за поръчки до <b>{maxPrice}</b> с {shopPayLogo}",prequal_contents:{not_prequalified_see_plans:"Проверете какви покупки можете да направите",prequalified_see_plans:"Преглед на плановете",purchasing_power_a:"Можете да направите покупки за ",purchasing_power_b:"Можете да използвате сума до "},split_pay_eligible_2:"Платете на 2 безлихвени вноски от <b>{price}</b> с {shopPayLogo}",split_pay_eligible_30:"Платете <b>{price}</b> в рамките на 30 дни без лихва с {shopPayLogo}",non_eligible_min_over_time:"Платете разсрочено за поръчки над <b>{minPrice}</b> с {shopPayLogo}",non_eligible_min_over_time_30:"Платете в рамките на 30 дни без лихва за поръчки над <b>{minPrice}</b> с {shopPayLogo}"},Fv={title:"Вземете сега, платете по-късно",subtitle:{interest_and_split_pay:'Изберете график за вноски при плащането &#8211; започнете с 4 безлихвени вноски от <span class="tagline__bold">{splitPayLoanRepayment}</span> на всеки 2 седмици.',interest_only:"Изберете график за вноски при плащането, за да разделите покупката на месечни вноски.",split_pay_only:'Изберете вноски при плащането, за да разделите покупката на 4 безлихвени вноски от <span class="tagline__bold">{splitPayLoanRepayment}</span> на всеки 2 седмици.',ineligible_min:"За поръчки над {minPrice} изберете вноски при плащането, за да разделите покупката на 4 безлихвени плащания.",ineligible_monthly_payments_min:"За поръчки над {minPrice} изберете график за вноски при плащането, за да разделите покупката на месечни вноски.",ineligible_max:"За поръчки до {maxPrice} изберете вноски при плащането, за да разделите покупката на няклоко плащания.",dynamic_pdp:{one:"Примерен план за покупка за <b>{priceWithoutInterest}</b>",other:"Примерни планове за покупка за <b>{priceWithoutInterest}</b>"},split_pay_only_2:'Изберете вноски при плащането, за да разделите покупката на 2 безлихвени вноски от <span class="tagline__bold">{splitPayLoanRepayment}</span> на всеки 15 дни.',split_pay_only_30:"Изберете вноски при плащането, за да платите покупката си за <b>{price}</b> без лихва в рамките на 30 дни.",ineligible_min_over_time:"За поръчки над {minPrice} изберете вноски при плащането, за да разсрочите покупката."},close:"Затваряне",new_window:"Отваря се в нов прозорец.",partnership:"Възможност за вноски в партньорство с {affirmLogo}",partnership_disclaimer:"Възможност за вноски в партньорство с {affirmLogo}. Affirm не предлага услуги за превод. За Affirm и техните предложения има поддръжка само на английски език.",split_pay_contents:{interest_fees:"Без скрити такси, никога.",interest_credit:"Кандидатстването няма ефект върху вашия кредитен рейтинг.",no_interest_fees:"Без такси, никога.",no_interest_credit:"Кандидатстването няма ефект върху вашия кредитен рейтинг."},sample_plan_contents:{continue_to_checkout:"Напред към плащането",unavailable:"Неналично",check_eligibility:"С решението си да продължите приемате, че имейл информацията ви ще бъде споделена с Affirm. <br/> Проверката дали сте квалифицирани няма да повлияе на кредитния ви рейтинг. ",apr:"ГПР",interest:"Лихва",total:"Обща сума",processing:"Заявката ви се обработва",processing_time:"Това може да отнеме до 1 минута…",split_pay_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> на всеки 2 седмици</span>',other_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> всеки месец</span>',split_pay_number_of_terms:"&nbsp;за {numberOfTerms} седмици",other_number_of_terms:"&nbsp;за {numberOfTerms} месеца"},prequal_contents:{unavailable:"Неналично",check:"Проверете дали изпълнявате условията"},legal:{ca_residents_notice:"Жители на Калифорния: Заемите от Affirm Loan Services, LLC направени или уредени в съответствие с лиценз на Калифорнийски финансов кредитор.",rates_from_apr:'Тарифи 0 – 36% ГПР. Вариантите за плащане с Affirm подлежат на проверка за пригодност и се предлагат от следните партньори за кредитиране: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Вариантите зависят от сумата на покупка и може да е нужна първоначална вноска.',interest_and_split_pay:"Очакваната сума за плащане не включва данъци и доставка.",split_pay_only:"Очакваната сума за плащане не включва данъци и доставка. Вариантите за плащане се предлагат от Affirm, като за тях се извършва проверка за пригодност и може да не се предлагат във всички щати.",ineligible:"Вариантите за плащане се предлагат от Affirm, като за тях се извършва проверка за пригодност и може да не се предлагат във всички щати.",dynamic_pdp:'Очакваната сума за плащане не включва данъци и доставка. Тарифите са в диапазона 0 – 36% ГПР. Вариантите за плащане с Shop Pay Installments подлежат на проверка за пригодност и се предлагат от следните партньори за кредитиране: <a class="help_text__link" href="https://www.affirm.com/lenders" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>.  Вариантите зависят от сумата на покупка и може да е нужна първоначална вноска. При получаване на одобрение може да се предлагат повече варианти. Известие към потребителите от страна на щата: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/licenses</a>.'}};var Vv={affirm:Rv,shopPay:Dv,banner:Bv,modal:Fv},$v=Object.freeze({__proto__:null,affirm:Rv,banner:Bv,default:Vv,modal:Fv,shopPay:Dv});const Wv="Affirm",Uv="Shop Pay",Hv={learn_more:"Zjistit více",view_sample_plans:"Zobrazit ukázkové plány",prequal:"Zjistěte své možnosti nákupu",split_pay_eligible:"Zaplaťte přes {shopPayLogo} ve 4 bezúročných splátkách ve výši <b>{price}</b>",interest_only_eligible:"Rozdělte si díky {shopPayLogo} nákup do měsíčních splátek",dynamic_interest_only_eligible:"Od <b>{price}</b> / měsíc přes {shopPayLogo}",pay_in_4_or_as_low_as_eligible:"4 bezúročné splátky ve výši <b>{price}</b> / měsíc přes {shopPayLogo}",zero_interest_eligible:"Od <b>{price}</b> / měsíc nebo 0% RPSN přes {shopPayLogo}",zero_interest_eligible_zero_apr:"Od <b>{price}</b> / měsíc při 0% RPSN přes {shopPayLogo}",non_eligible_min:"Zaplaťte přes {shopPayLogo} ve 4 bezúročných splátkách za objednávky přesahující <b>{minPrice}</b>",non_eligible_monthly_payments_min:"Rozdělte si díky {shopPayLogo} nákup do měsíčních splátek u objednávek přesahujících <b>{minPrice}</b>",non_eligible_max:"Rozdělte si u objednávek nepřesahujících <b>{maxPrice}</b> nákup do splátek díky {shopPayLogo}",prequal_contents:{not_prequalified_see_plans:"Zjistěte své možnosti nákupu",prequalified_see_plans:"Zobrazit plány",purchasing_power_a:"Můžete nakoupit za: ",purchasing_power_b:"Můžete utratit libovolnou částku až do výše: "},split_pay_eligible_2:"Zaplaťte přes {shopPayLogo} ve 2 bezúročných splátkách ve výši <b>{price}</b>.",split_pay_eligible_30:"Díky {shopPayLogo} můžete částku <b>{price}</b> zaplatit během 30 dnů bez úroků.",non_eligible_min_over_time:"Zaplaťte díky {shopPayLogo} za objednávky přesahující <b>{minPrice}</b> postupně v průběhu času.",non_eligible_min_over_time_30:"Objednávky přesahující <b>{minPrice}</b> můžete díky {shopPayLogo}zaplatit během 30 dnů bez úroků."},Kv={title:"Nakupte hned, zaplaťte později",subtitle:{interest_and_split_pay:'Zvolte si harmonogram plateb na pokladně: už od 4 bezúročných plateb ve výši <span class="tagline__bold">{splitPayLoanRepayment}</span> splácených co 2 týdny.',interest_only:"Zvolte si harmonogram plateb na pokladně a rozdělte částku za nákup do měsíčních splátek.",split_pay_only:'Vyberte si na pokladně splátky, ať se váš nákup rozdělí do 4 bezúročných plateb <span class="tagline__bold">{splitPayLoanRepayment}</span> splácených co 2 týdny.',ineligible_min:"Vyberte si u objednávek přesahujících {minPrice} na pokladně splátky, ať se váš nákup rozdělí do 4 bezúročných plateb.",ineligible_monthly_payments_min:"Vyberte si u objednávek přesahujících {minPrice} na pokladně splátky, ať se váš nákup rozdělí do měsíčních plateb.",ineligible_max:"Vyberte si u objednávek nepřesahujících {maxPrice} na pokladně splátky, ať se váš nákup rozdělí do několika plateb.",dynamic_pdp:{one:"Ukázkový plán pro nákup ve výši <b>{priceWithoutInterest}</b>",other:"Ukázkové plány pro nákup ve výši <b>{priceWithoutInterest}</b>",few:"Ukázkové plány pro nákup ve výši <b>{priceWithoutInterest}</b>",many:"Ukázkové plány pro nákup ve výši <b>{priceWithoutInterest}</b>"},split_pay_only_2:'Vyberte si na pokladně splátky, ať se váš nákup rozdělí do 2 bezúročných plateb <span class="tagline__bold">{splitPayLoanRepayment}</span> splácených co 15 dnů.',split_pay_only_30:"Vyberte si na pokladně splátky a můžete za nákup zaplatit bez úroků <b>{price}</b> během 30 dnů.",ineligible_min_over_time:"Vyberte si u objednávek přesahujících {minPrice} na pokladně splátky, ať se placení za váš nákup rozloží v průběhu času."},close:"Zavřít",new_window:"Otevře se v novém okně.",partnership:"Splátky provozujeme v partnerství se společností {affirmLogo}.",partnership_disclaimer:"Splátky provozujeme v partnerství se společností {affirmLogo}. Společnost Affirm neposkytuje překladatelské služby. Společnost Affirm a její nabídky podporují jen angličtinu.",split_pay_contents:{interest_fees:"Vůbec žádné skryté poplatky",interest_credit:"Žádný vliv na vaše kreditní skóre",no_interest_fees:"Vůbec žádné poplatky",no_interest_credit:"Žádný vliv na vaše kreditní skóre"},sample_plan_contents:{continue_to_checkout:"Pokračovat k pokladně",unavailable:"Není k dispozici",check_eligibility:"Jestliže budete pokračovat, nasdílí se vaše údaje se společností Affirm.<br/> Zjišťování vaší způsobilosti neovlivní váš kredit. ",apr:"RPSN",interest:"Úrok",total:"Celkem",processing:"Vaše žádost se zpracovává",processing_time:"Tento proces může chvíli trvat...",split_pay_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency">každé k 2 týdny</span>',other_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency">každý měsíc</span>',split_pay_number_of_terms:"&nbsp;po dobu {numberOfTerms} týdnů",other_number_of_terms:"&nbsp;po dobu {numberOfTerms} měsíců"},prequal_contents:{unavailable:"Není k dispozici",check:"Zjistěte, jestli splňujete kritéria"},legal:{ca_residents_notice:"Obyvatelé Kalifornie: Půjčky společnosti Affirm Loan Services, LLC se uzavírají nebo zřizují v souladu s licencí California Finance Lender.",rates_from_apr:'Sazby se pohybují mezi 0% až 36% RPSN. Platební možnosti přes společnost Affirm jsou dostupné jen pro uživatele, kteří projdou kontrolou splnění příslušných kritérií, nemusí být k dispozici ve všech státech a jsou poskytovány následujícími úvěrovými partnery: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Možnosti závisí na částce nákupu a může se stát, že bude vyžadována akontace.',interest_and_split_pay:"Odhadovaná částka platby nezahrnuje daně a dopravu.",split_pay_only:"Odhadovaná částka platby nezahrnuje daně a dopravu. Platební možnosti nabízené společností Affirm jsou dostupné jen pro uživatele, kteří projdou kontrolou splnění příslušných kritérií, a nemusí být k dispozici ve všech státech.",ineligible:"Platební možnosti nabízené společností Affirm jsou dostupné jen pro uživatele, kteří projdou kontrolou splnění příslušných kritérií, a nemusí být k dispozici ve všech státech.",dynamic_pdp:'Odhadovaná částka platby nezahrnuje daně a dopravu. Sazby se pohybují mezi 0% až 36% RPSN. Platební možnosti přes Splátky Shop Pay jsou dostupné jen pro uživatele, kteří projdou kontrolou splnění příslušných kritérií, a jsou poskytovány následujícími úvěrovými partnery: <a class="help_text__link" href="https://www.affirm.com/lenders" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Možnosti závisí na částce nákupu a může se stát, že bude vyžadována akontace. Po schválení můžou být k dispozici další možnosti. Oznámení spotřebitelům pro jednotlivé státy najdete na adrese: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/licenses</a>.'}};var Zv={affirm:Wv,shopPay:Uv,banner:Hv,modal:Kv},Gv=Object.freeze({__proto__:null,affirm:Wv,banner:Hv,default:Zv,modal:Kv,shopPay:Uv});const Jv="Affirm",Yv="Shop Pay",Qv={learn_more:"Få mere at vide",view_sample_plans:"Se eksempler på betalingsplaner",prequal:"Tjek din købekraft",split_pay_eligible:"Betal i 4 rentefri rater på <b>{price}</b> med {shopPayLogo}",interest_only_eligible:"Del dit køb i månedlige rater med {shopPayLogo}",dynamic_interest_only_eligible:"Fra <b>{price}</b>/måned med {shopPayLogo}",pay_in_4_or_as_low_as_eligible:"4 rentefri rater, eller fra <b>{price}</b> om måneden med {shopPayLogo}",zero_interest_eligible:"Fra <b>{price}</b>/måned eller 0 % ÅOP med {shopPayLogo}",zero_interest_eligible_zero_apr:"Fra <b>{price}</b>/måned til 0 % ÅOP med {shopPayLogo}",non_eligible_min:"Betal i 4 rentefri rater for ordrer over <b>{minPrice}</b> med {shopPayLogo}",non_eligible_monthly_payments_min:"Del dit køb i månedlige rater for ordrer på over <b>{minPrice}</b> med {shopPayLogo}",non_eligible_max:"Del dit køb i rater for ordrer op til <b>{maxPrice}</b> med {shopPayLogo}",prequal_contents:{not_prequalified_see_plans:"Tjek din købekraft",prequalified_see_plans:"Se abonnementer",purchasing_power_a:"Din købekraft er ",purchasing_power_b:"Brug ethvert beløb op til "},split_pay_eligible_2:"Betal i 2 rentefri rater på <b>{price}</b> med {shopPayLogo}",split_pay_eligible_30:"Betal <b>{price}</b> rentefrit inden for 30 dage med {shopPayLogo}",non_eligible_min_over_time:"Betal over tid for ordrer på mere end <b>{minPrice}</b> med {shopPayLogo}",non_eligible_min_over_time_30:"Betal rentefrit inden for 30 dage for ordrer over <b>{minPrice}</b> med {shopPayLogo}"},Xv={title:"Få det nu, betal senere",subtitle:{interest_and_split_pay:'Vælg din betalingplan, når du betaler &#8211; fra 4 rentefri betalinger på <span class="tagline__bold">{splitPayLoanRepayment}</span> hver 2. uge.',interest_only:"Vælg din betalingsplan, når du betaler, for at dele dit køb i månedelige rater.",split_pay_only:'Vælg rater, når du betaler, for at dele dit køb i 4 rentefri betalinger på <span class="tagline__bold">{splitPayLoanRepayment}</span> hver 2. uge.',ineligible_min:"For ordrer over {minPrice} vælger du rater, når du betaler, for at dele dit køb i 4 rentefri betalinger.",ineligible_monthly_payments_min:"For ordrer over {minPrice} vælger du rater, når du betaler, for at dele dit køb i månedlige betalinger.",ineligible_max:"For ordrer op til {maxPrice} vælger du rater, når du betaler, for at dele dit køb i flere betalinger.",dynamic_pdp:{one:"Eksempel på betalingsplan ved køb på <b>{priceWithoutInterest}</b>",other:"Eksempler på betalingsplaner ved køb på <b>{priceWithoutInterest}</b>"},split_pay_only_2:'Vælg rater, når du betaler, for at dele dit køb i 2 rentefri betalinger på <span class="tagline__bold">{splitPayLoanRepayment}</span> hver 15. dag.',split_pay_only_30:"Vælg rater, når du betaler, for at betale for dit køb på <b>{price}</b> uden renter inden for 30 dage.",ineligible_min_over_time:"For ordrer på mere end {minPrice} vælger du rater, når du betaler, for at dele dit køb over tid."},close:"Luk",new_window:"Åbner i et nyt vindue.",partnership:"Afbetaling i samarbejde med {affirmLogo}",partnership_disclaimer:"Afbetaling i samarbejde med {affirmLogo}. Oversættelsestjenester leveres ikke af Affirm. Affirm og dets tilbud understøttes kun på engelsk.",split_pay_contents:{interest_fees:"Ingen skjulte gebyr, nogensinde.",interest_credit:"Ansøgning har ingen indvirkning på din kreditvurdering.",no_interest_fees:"Ingen gebyrer, nogensinde.",no_interest_credit:"Ansøgning har ingen indvirkning på din kreditvurdering."},sample_plan_contents:{continue_to_checkout:"Fortsæt til betaling",unavailable:"Ikke tilgængelig",check_eligibility:"Hvis du fortsætter, deles dine oplysninger med Affirm. <br/> Din kredit påvirkes ikke, når du får tjekket din kvalificering. ",apr:"ÅOP",interest:"Rente",total:"I alt",processing:"Behandling af din anmodning",processing_time:"Dette kan tage op til et minut ...",split_pay_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> hver 2. uge</span>',other_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> hver måned</span>',split_pay_number_of_terms:"&nbsp;i {numberOfTerms} uger",other_number_of_terms:"&nbsp;i {numberOfTerms} måneder"},prequal_contents:{unavailable:"Ikke tilgængelig",check:"Tjek, om du er kvalificeret"},legal:{ca_residents_notice:"Personer bosiddende i Californien: Lån fra Affirm Loan Services, LLC udstedes eller arrangeres i henhold til en California Finance Lender-licens.",rates_from_apr:'Rater fra 0-36 % ÅOP. Betalingsmulighederne via Affirm er underlagt et kvalificeringstjek, er muligvis ikke tilgængelige i alle stater og leveres af disse udlånspartnere: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenderes</a>. Mulighederne afhænger af købsbeløbet, og en forudbetaling kan være påkrævet.',interest_and_split_pay:"Det forventede betalingsbeløb er eksklusiv skatter og levering.",split_pay_only:"Det forventede betalingsbeløb er eksklusiv skatter og levering. Betalingsmuligheder udbydes af Affirm og er underlagt et kvalificeringstjek. De er muligvis ikke tilgængelige i alle stater.",ineligible:"Betalingsmuligheder udbydes af Affirm og er underlagt et kvalificeringstjek. De er muligvis ikke tilgængelige i alle stater.",dynamic_pdp:'Det forventede betalingsbeløb er eksklusiv skatter og levering. Satser fra 0-36 % ÅOP. Betalingsmuligheder via Shop Pay Afbetaling er underlagt kontrol af berettigelse og leveres af disse lånepartnere: <a class="help_text__link" href="https://www.affirm.com/lenders" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Mulighederne afhænger af købsbeløbet, og en forudbetaling kan være påkrævet. Flere muligheder kan være tilgængelige efter godkendelse. Statsspecifikke oplysninger til forbrugere: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/licenses</a>.'}};var ek={affirm:Jv,shopPay:Yv,banner:Qv,modal:Xv},tk=Object.freeze({__proto__:null,affirm:Jv,banner:Qv,default:ek,modal:Xv,shopPay:Yv});const nk="Affirm",ik="Shop Pay",ak={learn_more:"Mehr erfahren",view_sample_plans:"Beispielpläne anzeigen",prequal:"Kaufkraft ermitteln",split_pay_eligible:"Mit {shopPayLogo} in 4 zinsfreien Raten über <b>{price}</b> bezahlen",interest_only_eligible:"Kauf mit {shopPayLogo} in monatlichen Ratenzahlungen begleichen",dynamic_interest_only_eligible:"Ab <b>{price}</b>/Monat mit {shopPayLogo}",pay_in_4_or_as_low_as_eligible:"4 zinsfreie Ratenzahlungen oder ab <b>{price}</b>/Monat mit {shopPayLogo}",zero_interest_eligible:"Ab <b>{price}</b>/Monat oder 0 % effektiver Jahreszins mit {shopPayLogo}",zero_interest_eligible_zero_apr:"Ab <b>{price}</b>/Monat bei einem effektiven Jahreszins von 0 % mit {shopPayLogo}",non_eligible_min:"Mit {shopPayLogo} in 4 zinsfreien Raten für Bestellungen über <b>{minPrice}</b> bezahlen",non_eligible_monthly_payments_min:"Kauf von Bestellungen über <b>{minPrice}</b> mit {shopPayLogo} in monatlichen Ratenzahlungen begleichen",non_eligible_max:"Kauf von Bestellungen bis zu <b>{maxPrice}</b> mit {shopPayLogo} in Ratenzahlungen begleichen",prequal_contents:{not_prequalified_see_plans:"Kaufkraft ermitteln",prequalified_see_plans:"Pläne anzeigen",purchasing_power_a:"Deine Kaufkraft liegt bei ",purchasing_power_b:"Gib einen beliebigen Betrag aus bis zu "},split_pay_eligible_2:"Zahle in zwei zinsfreien Raten von <b>{price}</b> mit {shopPayLogo}",split_pay_eligible_30:"Mit {shopPayLogo} zinsfrei <b>{price}</b> innerhalb von 30 Tagen bezahlen",non_eligible_min_over_time:"Bezahle für Bestellungen über <b>{minPrice}</b> im Laufe der Zeit mit {shopPayLogo}",non_eligible_min_over_time_30:"Mit {shopPayLogo} zinsfrei innerhalb von 30 Tagen für Bestellungen über <b>{minPrice}</b> bezahlen"},ok={title:"Jetzt kaufen, später bezahlen",subtitle:{interest_and_split_pay:'Wähle deinen Zahlungsplan im Checkout aus &#8211; beginnend mit 4 zinsfreien Zahlungen in Höhe von <span class="tagline__bold">{splitPayLoanRepayment}</span> alle 2 Wochen.',interest_only:"Wähle deinen Zahlungsplan im Checkout aus, um deinen Kauf in monatliche Raten aufzuteilen.",split_pay_only:'Wähle im Checkout Ratenzahlungen aus, um den Kauf in 4 zinsfreien Zahlungen über <span class="tagline__bold">{splitPayLoanRepayment}</span> alle 2 Wochen zu begleichen.',ineligible_min:"Wähle bei Bestellungen über {minPrice} Ratenzahlungen im Checkout aus, um deinen Kauf in 4 zinsfreie Zahlungen aufzuteilen.",ineligible_monthly_payments_min:"Wähle bei Bestellungen über {minPrice} Ratenzahlungen im Checkout aus, um deinen Kauf in monatliche Zahlungen aufzuteilen.",ineligible_max:"Wähle bei Bestellungen bis zu {maxPrice} Ratenzahlungen im Checkout aus, um deinen Kauf in mehrere Zahlungen aufzuteilen.",dynamic_pdp:{one:"Beispielplan für einen Kauf in Höhe von <b>{priceWithoutInterest}</b>",other:"Beispielpläne für einen Kauf in Höhe von <b>{priceWithoutInterest}</b>"},split_pay_only_2:'Wähle beim Checkout Raten aus, um deinen Kauf in zwei zinsfreie Zahlungen von <span class="tagline__bold">{splitPayLoanRepayment}</span> im Abstand von 15 Tagen aufzuteilen.',split_pay_only_30:"Wähle beim Checkout Raten aus, um deinen Kauf über <b>{price}</b> zinsfrei innerhalb von 30 Tagen zu bezahlen.",ineligible_min_over_time:"Wähle bei Bestellungen über {minPrice} Ratenzahlungen im Checkout aus, um deinen Kauf im Laufe der Zeit aufzuteilen."},close:"Schließen (Esc)",new_window:"Öffnet ein neues Fenster.",partnership:"Ratenzahlungen in Zusammenarbeit mit {affirmLogo}",partnership_disclaimer:"Ratenzahlungen in Zusammenarbeit mit {affirmLogo}. Übersetzungsdienste werden nicht von Affirm bereitgestellt. Affirm und die entsprechenden Angebote werden nur auf Englisch unterstützt.",split_pay_contents:{interest_fees:"Keinerlei versteckte Gebühren",interest_credit:"Keine Auswirkungen auf deine Kreditwürdigkeit durch die Beantragung",no_interest_fees:"Keinerlei Gebühren",no_interest_credit:"Die Beantragung hat keinen Einfluss auf deine Kreditwürdigkeit."},sample_plan_contents:{continue_to_checkout:"Weiter zum Checkout",unavailable:"Nicht verfügbar",check_eligibility:"Wenn du fortfährst, werden deine Informationen mit Affirm geteilt. Die Prüfung deiner Qualifizierung hat keine Auswirkungen auf deine Kreditwürdigkeit. ",apr:"Jahreszinssatz",interest:"Zinsen",total:"Gesamtsumme",processing:"Anfrage wird verarbeitet",processing_time:"Das kann bis zu 1 Minute dauern ...",split_pay_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> alle zwei Wochen</span>',other_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> jeden Monat</span>',split_pay_number_of_terms:"&nbsp;für {numberOfTerms} Wochen",other_number_of_terms:"&nbsp;für {numberOfTerms} Monate"},prequal_contents:{unavailable:"Nicht verfügbar",check:"Berechtigung überprüfen"},legal:{ca_residents_notice:"Einwohner Kaliforniens: Darlehen von Affirm Loan Services, LLC werden gemäß einer California Finance Lender-Lizenz erteilt oder geregelt.",rates_from_apr:'Tarife mit einem effektiven Jahreszins von 0–36 %. Die Zahlungsoptionen von Affirm sind abhängig von einer Berechtigungsprüfung. Sie sind möglicherweise nicht in allen Staaten verfügbar und werden von diesen Kreditpartnern bereitgestellt: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Die Optionen hängen von deinem Kaufbetrag ab. Möglicherweise ist eine Anzahlung erforderlich.',interest_and_split_pay:"Der geschätzte Zahlungsbetrag enthält keine Steuern und Versandkosten.",split_pay_only:"Der geschätzte Zahlungsbetrag enthält keine Steuern und Versandkosten. Zahlungsoptionen werden von Affirm angeboten und unterliegen einer Berechtigungsprüfung. Sie sind möglicherweise nicht in allen Bundesstaaten verfügbar.",ineligible:"Zahlungsoptionen werden von Affirm angeboten und unterliegen einer Berechtigungsprüfung. Sie sind möglicherweise nicht in allen Bundesstaaten verfügbar.",dynamic_pdp:'Der geschätzte Zahlungsbetrag enthält keine Steuern und Versandkosten. Tarife mit einem effektiven Jahreszins von 0–36 %. Zahlungsoptionen von Shop Pay Installments unterliegen einer Berechtigungsprüfung und werden von diesen Kreditpartnern bereitgestellt: <a class="help_text__link" href="https://www.affirm.com/lenders" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Die Optionen hängen von deinem Kaufbetrag ab. Möglicherweise ist eine Anzahlung erforderlich. Nach der Genehmigung stehen möglicherweise weitere Optionen zur Verfügung. Bundesstaatliche Hinweise für Verbraucher: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/licenses</a>.'}};var sk={affirm:nk,shopPay:ik,banner:ak,modal:ok},rk=Object.freeze({__proto__:null,affirm:nk,banner:ak,default:sk,modal:ok,shopPay:ik});const lk="Affirm",ck="Shop Pay",pk={learn_more:"Μάθετε περισσότερα",view_sample_plans:"Προβολή ίδιων προγραμμάτων",prequal:"Ελέγξτε την αγοραστική σας ισχύ",split_pay_eligible:"Πληρώστε σε 4 άτοκες δόσεις των <b>{price}</b> με το {shopPayLogo}",interest_only_eligible:"Χωρίστε την αγορά σας σε μηνιαίες δόσεις με το {shopPayLogo}",dynamic_interest_only_eligible:"Από <b>{price}</b>/μήνα με το {shopPayLogo}",pay_in_4_or_as_low_as_eligible:"4 άτοκες δόσεις ή από <b>{price}</b>/μήνα με το {shopPayLogo}",zero_interest_eligible:"Από <b>{price}</b>/μήνα ή με 0% APR με το {shopPayLogo}",zero_interest_eligible_zero_apr:"Από <b>{price}</b>/μήνα με 0% APR με το {shopPayLogo}",non_eligible_min:"Πληρώστε σε 4 άτοκες δόσεις για παραγγελίες άνω των <b>{minPrice}</b> με το {shopPayLogo}",non_eligible_monthly_payments_min:"Χωρίστε την αγορά σας σε μηνιαίες δόσεις για παραγγελίες άνω των <b>{minPrice}</b> με το {shopPayLogo}",non_eligible_max:"Χωρίστε την αγορά σας σε δόσεις για αγορές έως <b>{maxPrice}</b> με το {shopPayLogo}",prequal_contents:{not_prequalified_see_plans:"Ελέγξτε την αγοραστική σας ισχύ",prequalified_see_plans:"Προβολή προγραμμάτων",purchasing_power_a:"Η αγοραστική ισχύς σας είναι ",purchasing_power_b:"Δαπανήστε ένα ποσό έως "},split_pay_eligible_2:"Πληρώστε σε 2 άτοκες δόσεις των <b>{price}</b> με {shopPayLogo}",split_pay_eligible_30:"Πληρώστε <b>{price}</b> άτοκα εντός 30 ημερών με το {shopPayLogo}",non_eligible_min_over_time:"Αποπληρώστε σταδιακά παραγγελίες πάνω από <b>{minPrice}</b> με {shopPayLogo}",non_eligible_min_over_time_30:"Πληρώστε άτοκα εντός 30 ημερών για παραγγελίες άνω των <b>{minPrice}</b> με το {shopPayLogo}"},dk={title:"Αποκτήστε το τώρα, πληρώστε το αργότερα",subtitle:{interest_and_split_pay:'Επιλέξτε το πρόγραμμα πληρωμών σας κατά την ολοκλήρωση της αγοράς &#8211; ξεκινάτε με 4 άτοκες πληρωμές των <span class="tagline__bold">{splitPayLoanRepayment}</span> ανά 2 εβδομάδες.',interest_only:"Επιλέξτε το πρόγραμμα πληρωμών σας κατά την ολοκλήρωση της αγοράς για να χωρίσετε την αγορά σας σε μηνιαίες δόσεις.",split_pay_only:'Επιλέξτε τις δόσεις κατά την ολοκλήρωση της αγοράς σας για να χωρίσετε την αγορά σε 4 άτοκες δόσεις των <span class="tagline__bold">{splitPayLoanRepayment}</span> ανά 2 εβδομάδες.',ineligible_min:"Για παραγγελίες άνω των {minPrice}, επιλέξτε τις δόσεις κατά την ολοκλήρωση της αγοράς για να χωρίσετε την αγορά σας σε 4 άτοκες πληρωμές.",ineligible_monthly_payments_min:"Για παραγγελίες άνω των {minPrice}, επιλέξτε τις δόσεις κατά την ολοκλήρωση της αγοράς για να χωρίσετε την αγορά σας σε μηνιαίες πληρωμές.",ineligible_max:"Για παραγγελίες έως {maxPrice}, επιλέξτε τις δόσεις κατά την ολοκλήρωση της αγοράς για να χωρίσετε την αγορά σας σε πολλαπλές πληρωμές.",dynamic_pdp:{one:"Δοκιμαστικό πρόγραμμα για μια αγορά <b>{priceWithoutInterest}</b>",other:"Δοκιμαστικά προγράμματα για μια αγορά <b>{priceWithoutInterest}</b>"},split_pay_only_2:'Επιλέξτε τις δόσεις κατά την ολοκλήρωση της αγοράς σας για να χωρίσετε την αγορά σε 2 άτοκες δόσεις των <span class="tagline__bold">{splitPayLoanRepayment}</span> ανά 15 ημέρες.',split_pay_only_30:"Επιλέξτε τις δόσεις κατά την ολοκλήρωση της αγοράς για να πληρώσετε άτοκα για την αγορά σας ύψους <b>{price}</b> μέσα σε 30 ημέρες.",ineligible_min_over_time:"Για παραγγελίες άνω των {minPrice}, επιλέξτε τις δόσεις κατά την ολοκλήρωση της αγοράς για να χωρίσετε την αγορά σας δόσεις."},close:"Κλείσιμο",new_window:"Ανοίγει σε νέο παράθυρο.",partnership:"Δυνατότητα για δόσεις σε συνεργασία με την {affirmLogo}",partnership_disclaimer:"Δυνατότητα για δόσεις σε συνεργασία με την {affirmLogo}. Η Affirm δεν παρέχει υπηρεσίες μετάφρασης. Η Affirm και οι προσφορές της υποστηρίζονται μόνο στα αγγλικά.",split_pay_contents:{interest_fees:"Χωρίς κρυφές χρεώσεις, για πάντα.",interest_credit:"Χωρίς αντίκτυπο στην πιστοληπτική ικανότητά σας για αίτηση δανείων.",no_interest_fees:"Χωρίς χρεώσεις, για πάντα.",no_interest_credit:"Χωρίς αντίκτυπο στην πιστοληπτική ικανότητά σας για αίτηση δανείων."},sample_plan_contents:{continue_to_checkout:"Συνέχεια στην ολοκλήρωση αγοράς",unavailable:"Μη διαθέσιμο",check_eligibility:"Αν συνεχίσετε, οι πληροφορίες σας θα κοινοποιηθούν στην Affirm. <br /> Ο έλεγχος καταλληλότητας δεν θα επηρεάσει την πίστωσή σας. ",apr:"APR",interest:"Τόκος",total:"Σύνολο",processing:"Επεξεργασία του αιτήματός σας",processing_time:"Η διαδικασία μπορεί να διαρκέσει έως και ένα λεπτό…",split_pay_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> ανά 2 εβδομάδες</span>',other_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> κάθε μήνα</span>',split_pay_number_of_terms:"&nbsp;για {numberOfTerms} εβδομάδες",other_number_of_terms:"&nbsp;για {numberOfTerms} μήνες"},prequal_contents:{unavailable:"Μη διαθέσιμο",check:"Δείτε αν πληροίτε τις προϋποθέσεις"},legal:{ca_residents_notice:"Κάτοικοι της Καλιφόρνια: Η χορήγηση ή η συμφωνία των δανείων της Affirm Loan Services LLC γίνεται σύμφωνα με την άδεια δανεισμού χρηματοδότησης της Καλιφόρνια.",rates_from_apr:'Χρεώσεις από 0% έως 36% APR. Οι επιλογές πληρωμής μέσω της Affirm υπόκεινται σε έλεγχο καταλληλότητας, ενδέχεται να μην είναι διαθέσιμες σε όλες τις πολιτείες και παρέχονται από τους εξής συνεργάτες: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Οι επιλογές εξαρτώνται από το ποσό αγοράς και ενδέχεται να απαιτείται προκαταβολή.',interest_and_split_pay:"Το εκτιμώμενο ποσό πληρωμής δεν περιλαμβάνει φόρους και έξοδα αποστολής.",split_pay_only:"Το εκτιμώμενο ποσό πληρωμής δεν περιλαμβάνει φόρους και έξοδα αποστολής. Οι επιλογές πληρωμής προσφέρονται από την Affirm, υπόκεινται σε έλεγχο καταλληλότητας και ενδέχεται να μην είναι διαθέσιμες σε όλες τις πολιτείες.",ineligible:"Οι επιλογές πληρωμής προσφέρονται από την Affirm, υπόκεινται σε έλεγχο καταλληλότητας και ενδέχεται να μην είναι διαθέσιμες σε όλες τις πολιτείες.",dynamic_pdp:'Το εκτιμώμενο ποσό πληρωμής δεν περιλαμβάνει φόρους και έξοδα αποστολής. Οι χρεώσεις ποικίλλουν από 0% έως 36% APR. Οι επιλογές πληρωμής με Δόσεις Shop Pay υπόκεινται σε έλεγχο καταλληλότητας και παρέχονται από τους εξής συνεργάτες: <a class="help_text__link" href="https://www.affirm.com/lenders" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Οι επιλογές εξαρτώνται από το ποσό αγοράς και ενδέχεται να απαιτείται προκαταβολή. Μετά την έγκριση ενδέχεται να διατεθούν περισσότερες επιλογές. Πολιτειακές ειδοποιήσεις προς καταναλωτές: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/licenses</a>.'}};var uk={affirm:lk,shopPay:ck,banner:pk,modal:dk},mk=Object.freeze({__proto__:null,affirm:lk,banner:pk,default:uk,modal:dk,shopPay:ck});const hk="Affirm",_k="Shop Pay",gk={learn_more:"Learn more",view_sample_plans:"View sample plans",prequal:"Check your purchasing power",split_pay_eligible:"Pay in 4 interest-free installments of <b>{price}</b> with {shopPayLogo}",split_pay_eligible_2:"Pay in 2 interest-free installments of <b>{price}</b> with {shopPayLogo}",split_pay_eligible_30:"Pay <b>{price}</b> within 30 days interest-free with {shopPayLogo}",interest_only_eligible:"Split your purchase into monthly installments with {shopPayLogo}",dynamic_interest_only_eligible:"From <b>{price}</b>/mo with {shopPayLogo}",pay_in_4_or_as_low_as_eligible:"4 interest-free installments, or from <b>{price}</b>/mo with {shopPayLogo}",zero_interest_eligible:"From <b>{price}</b>/mo or 0% APR with {shopPayLogo}",zero_interest_eligible_zero_apr:"From <b>{price}</b>/mo at 0% APR with {shopPayLogo}",non_eligible_min:"Pay in 4 interest-free installments for orders over <b>{minPrice}</b> with {shopPayLogo}",non_eligible_min_over_time:"Pay over time for orders over <b>{minPrice}</b> with {shopPayLogo}",non_eligible_min_over_time_30:"Pay within 30 days interest-free for orders over <b>{minPrice}</b> with {shopPayLogo}",non_eligible_monthly_payments_min:"Split your purchase into monthly installments for orders over <b>{minPrice}</b> with {shopPayLogo}",non_eligible_max:"Split your purchase into installments for orders up to <b>{maxPrice}</b> with {shopPayLogo}",prequal_contents:{not_prequalified_see_plans:"Check your purchasing power",prequalified_see_plans:"See plans",purchasing_power_a:"Your purchasing power is ",purchasing_power_b:"Spend any amount up to "}},fk={title:"Get it now, pay later",subtitle:{interest_and_split_pay:'Choose your payment schedule at checkout &#8211; starting at 4 interest-free payments of <span class="tagline__bold">{splitPayLoanRepayment}</span> every 2 weeks.',interest_only:"Choose your payment schedule at checkout to split your purchase into monthly installments.",split_pay_only:'Select installments at checkout to split your purchase into 4 interest-free payments of <span class="tagline__bold">{splitPayLoanRepayment}</span> every 2 weeks.',split_pay_only_2:'Select installments at checkout to split your purchase into 2 interest-free payments of <span class="tagline__bold">{splitPayLoanRepayment}</span> every 15 days.',split_pay_only_30:"Select installments at checkout to pay for your purchase of <b>{price}</b> interest-free within 30 days.",ineligible_min:"For orders over {minPrice}, select installments at checkout to split your purchase into 4 interest-free payments.",ineligible_min_over_time:"For orders over {minPrice}, select installments at checkout to split your purchase over time.",ineligible_monthly_payments_min:"For orders over {minPrice}, select installments at checkout to split your purchase into monthly payments.",ineligible_max:"For orders up to {maxPrice}, select installments at checkout to split your purchase into multiple payments.",dynamic_pdp:{one:"Sample plan for <b>{priceWithoutInterest}</b> purchase",other:"Sample plans for <b>{priceWithoutInterest}</b> purchase"}},close:"Close",new_window:"Opens in a new window.",partnership:"Installments in partnership with {affirmLogo}",partnership_disclaimer:"Installments in partnership with {affirmLogo}. Translation services are not provided by Affirm. Affirm and its offerings are only supported in English.",split_pay_contents:{interest_fees:"No hidden fees, ever.",interest_credit:"No impact on your credit score to apply.",no_interest_fees:"No fees, ever.",no_interest_credit:"No impact on your credit score to apply."},sample_plan_contents:{continue_to_checkout:"Continue to checkout",unavailable:"Unavailable",check_eligibility:"By continuing, your information will be shared with Affirm. <br/> Checking your qualification won’t affect your credit. ",apr:"APR",interest:"Interest",total:"Total",processing:"Processing your request",processing_time:"This can take up to a minute...",split_pay_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> every 2 weeks</span>',other_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> every month</span>',split_pay_number_of_terms:"&nbsp;for {numberOfTerms} weeks",other_number_of_terms:"&nbsp;for {numberOfTerms} months"},prequal_contents:{unavailable:"Unavailable",check:"Check if you qualify"},legal:{ca_residents_notice:"CA Residents: Loans by Affirm Loan Services, LLC are made or arranged pursuant to a California Finance Lender license.",rates_from_apr:'Rates from 0-36% APR. Payment options through Affirm are subject to an eligibility check, may not be available in all states, and are provided by these lending partners: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Options depend on your purchase amount, and a down payment may be required.',interest_and_split_pay:"The estimated payment amount excludes taxes and shipping.",split_pay_only:"The estimated payment amount excludes taxes and shipping. Payment options are offered by Affirm and are subject to an eligibility check and might not be available in all states.",ineligible:"Payment options are offered by Affirm and are subject to an eligibility check and might not be available in all states.",dynamic_pdp:'The estimated payment amount excludes taxes and shipping. Rates range from 0-36% APR. Payment options through Shop Pay Installments are subject to an eligibility check and are provided by these lending partners: <a class="help_text__link" href="https://www.affirm.com/lenders" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Options depend on your purchase amount, and a down payment may be required. More options may be available upon approval. State notices to consumers: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/licenses</a>.'}};var bk={affirm:hk,shopPay:_k,banner:gk,modal:fk},yk=Object.freeze({__proto__:null,affirm:hk,banner:gk,default:bk,modal:fk,shopPay:_k});const vk="Affirm",kk="Shop Pay",wk={learn_more:"Más información",view_sample_plans:"Ver planes de ejemplo",prequal:"Comprobar tu poder adquisitivo",split_pay_eligible:"Pagar en cuatro cuotas sin intereses de <b>{price}</b> con {shopPayLogo}",interest_only_eligible:"Dividir la compra en cuotas mensuales con {shopPayLogo}",dynamic_interest_only_eligible:"A partir de <b>{price}</b> al mes con {shopPayLogo}",pay_in_4_or_as_low_as_eligible:"Cuatro cuotas sin intereses o a partir de <b>{price}</b> al mes con {shopPayLogo}",zero_interest_eligible:"A partir de <b>{price}</b> al mes con 0% TAE con {shopPayLogo}",zero_interest_eligible_zero_apr:"A partir de <b>{price}</b> al mes a un 0% TAE con {shopPayLogo}",non_eligible_min:"Pagar en cuatro cuotas sin intereses para pedidos de más de <b>{minPrice}</b> con {shopPayLogo}",non_eligible_monthly_payments_min:"Dividir tu compra en cuotas mensuales para pedidos de más de <b>{minPrice}</b> con {shopPayLogo}",non_eligible_max:"Dividir tu compra en cuotas para pedidos de hasta <b>{maxPrice}</b> con {shopPayLogo}",prequal_contents:{not_prequalified_see_plans:"Comprobar tu poder adquisitivo",prequalified_see_plans:"Ver planes",purchasing_power_a:"Tu poder adquisitivo es de ",purchasing_power_b:"Gasta cualquier monto hasta "},split_pay_eligible_2:"Paga en dos cuotas sin intereses de <b>{price}</b> con {shopPayLogo}.",split_pay_eligible_30:"Paga <b>{price}</b> en 30 días sin intereses con {shopPayLogo}",non_eligible_min_over_time:"Paga a lo largo del tiempo para pedidos de más de <b>{minPrice}</b> con {shopPayLogo}.",non_eligible_min_over_time_30:"Paga los pedidos de más de <b>{minPrice}</b> en 30 días sin intereses con {shopPayLogo}"},Pk={title:"Obtenlo ahora, paga más tarde",subtitle:{interest_and_split_pay:'Elige la programación de pago en la pantalla de pago: a partir de cuatro pagos sin intereses de <span class="tagline__bold">{splitPayLoanRepayment}</span> cada dos semanas.',interest_only:"Elige la programación de pago en la pantalla de pago para dividir la compra en cuotas mensuales.",split_pay_only:'Selecciona las cuotas en la pantalla de pago para dividir la compra en cuatro pagos sin intereses de <span class="tagline__bold">{splitPayLoanRepayment}</span> cada dos semanas.',ineligible_min:"Para pedidos de más de {minPrice}, selecciona las cuotas en la pantalla de pago para dividir la compra en cuatro pagos sin intereses.",ineligible_monthly_payments_min:"Para pedidos de más de {minPrice}, selecciona las cuotas en la pantalla de pago para dividir la compra en pagos mensuales.",ineligible_max:"Para pedidos de más de {maxPrice}, selecciona las cuotas en la pantalla de pago para dividir la compra en varios pagos.",dynamic_pdp:{one:"Plan de ejemplo para la compra de <b>{priceWithoutInterest}</b>.",other:"Planes de ejemplo para la compra de <b>{priceWithoutInterest}</b>.",many:"Planes de ejemplo para la compra de <b>{priceWithoutInterest}</b>."},split_pay_only_2:'Selecciona las cuotas en la pantalla de pago para dividir la compra en dos pagos sin intereses de <span class="tagline__bold">{splitPayLoanRepayment}</span> cada 15 días.',split_pay_only_30:"Selecciona las cuotas en la pantalla de pago para pagar tu compra por valor de <b>{price}</b> sin intereses en un plazo de 30 días.",ineligible_min_over_time:"Para pedidos de más de {minPrice}, selecciona las cuotas en la pantalla de pago para dividir la compra a lo largo del tiempo."},close:"Cerrar",new_window:"Se abre en una nueva ventana.",partnership:"Cuotas en colaboración con {affirmLogo}",partnership_disclaimer:"Cuotas en colaboración con {affirmLogo}. Affirm no proporciona servicios de traducción. Affirm y sus ofertas solo se muestran en inglés.",split_pay_contents:{interest_fees:"Sin cargos ocultos, en ningún momento.",interest_credit:"La solicitud no tiene ningún impacto sobre tu puntuación crediticia.",no_interest_fees:"Sin cargos, en ningún momento.",no_interest_credit:"La solicitud no tiene ningún impacto sobre tu puntuación crediticia."},sample_plan_contents:{continue_to_checkout:"Continuar con el proceso de pago",unavailable:"No disponible",check_eligibility:"Si continúas, tu información se compartirá con Affirm. <br/> La verificación de tu idoneidad no afectará a tu crédito. ",apr:"TAE",interest:"Interés",total:"Total",processing:"Procesando tu solicitud",processing_time:"Este proceso puede tardar como máximo un minuto...",split_pay_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> cada 2 semanas</span>',other_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> cada mes</span>',split_pay_number_of_terms:"&nbsp;durante {numberOfTerms} semanas",other_number_of_terms:"&nbsp;durante {numberOfTerms} meses"},prequal_contents:{unavailable:"No disponible",check:"Verificar si eres elegible"},legal:{ca_residents_notice:"Residentes de California: los préstamos de Affirm Loan Services, LLC se otorgan o se tramitan conforme a una licencia de prestamista financiero de California.",rates_from_apr:'Tarifas a partir del 0% hasta el 36% TAE. Las opciones de pago a través de Affirm están sujetas a una verificación de elegibilidad, pueden no estar disponibles en todos los estados y las ofrecen estos socios prestamistas: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Las opciones dependen del monto de la compra y es posible que se requiera un pago inicial.',interest_and_split_pay:"El monto estimado del pago no incluye impuestos ni gastos de envío.",split_pay_only:"El monto estimado del pago no incluye impuestos ni gastos de envío. Affirm ofrece opciones de pago que están sujetas a una verificación de elegibilidad y podrían no estar disponibles en todos los estados.",ineligible:"Affirm ofrece opciones de pago que están sujetas a una verificación de elegibilidad y podrían no estar disponibles en todos los estados.",dynamic_pdp:'El monto estimado del pago no incluye impuestos ni gastos de envío. Las tarifas oscilan entre el 0% y el 36% TAE. Las opciones de pago a través de Cuotas de Shop Pay están sujetas a una verificación de elegibilidad y las ofrecen estos socios prestamistas: <a class="help_text__link" href="https://www.affirm.com/lenders" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Las opciones dependen del monto de la compra y es posible que se requiera un pago inicial. Puede que haya más opciones disponibles después de la aprobación. Notificaciones del estado para los consumidores: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/licenses</a>.'}};var Sk={affirm:vk,shopPay:kk,banner:wk,modal:Pk},zk=Object.freeze({__proto__:null,affirm:vk,banner:wk,default:Sk,modal:Pk,shopPay:kk});const jk="Affirm",Ck="Shop Pay",xk={learn_more:"Lisätietoja",view_sample_plans:"Näytä esimerkkisopimukset",prequal:"Tarkista ostovoimasi",split_pay_eligible:"Maksa neljässä korottomassa <b>{price}</b>:n suuruisessa maksuerässä {shopPayLogo}:tä käyttäen",interest_only_eligible:"Jaa ostoksesi kuukausittaisiin maksueriin {shopPayLogo}:tä käyttäen",dynamic_interest_only_eligible:"Alkaen <b>{price}</b>/kk {shopPayLogo}:tä käyttäen",pay_in_4_or_as_low_as_eligible:"Neljä korotonta <b>{price}</b>:n suuruista maksuerää {shopPayLogo}:tä käyttäen",zero_interest_eligible:"Alkaen <b>{price}</b>/kk tai 0 %:n vuosikorolla {shopPayLogo}:tä käyttäen",zero_interest_eligible_zero_apr:"Alkaen <b>{price}</b>/kk 0 %:n vuosikorolla {shopPayLogo}:tä käyttäen",non_eligible_min:"Maksa arvoltaan <b>{minPrice}</b> ylittävät tilaukset neljässä korottomassa maksuerässä {shopPayLogo}:n kautta",non_eligible_monthly_payments_min:"Jaa arvoltaan <b>{minPrice}</b> ylittävä ostos kuukausittaisiin maksueriin {shopPayLogo}:tä käyttäen",non_eligible_max:"Jaa arvoltaan enintään <b>{maxPrice}</b>:n suuruinen ostos maksueriin {shopPayLogo}:tä käyttäen",prequal_contents:{not_prequalified_see_plans:"Tarkista ostovoimasi",prequalified_see_plans:"Katso sopimukset",purchasing_power_a:"Ostovoimasi on ",purchasing_power_b:"Käytä mikä tahansa summa, joka on enintään "},split_pay_eligible_2:"{shopPayLogo}: Maksa kahdessa korottomassa <b>{price}</b>:n erässä",split_pay_eligible_30:"Maksa <b>{price}</b> 30 päivän kuluessa ilman korkoa {shopPayLogo}:lla",non_eligible_min_over_time:"{shopPayLogo}: maksa ajan mittaan tilaukset, joiden summa on vähintään <b>{minPrice}</b>",non_eligible_min_over_time_30:"Maksa <b>{minPrice}</b>:n päivän korottomat tilaukset {shopPayLogo}:n kautta"},Lk={title:"Hanki nyt, maksa myöhemmin",subtitle:{interest_and_split_pay:'Valitse maksuvaiheessa maksuaikataulu alkaen neljästä korottomasta <span class="tagline__bold">{splitPayLoanRepayment}</span>:n suuruisesta lyhennyksestä kahden viikon välein.',interest_only:"Jaa ostos kuukausittaisiin maksueriin valitsemalla sille maksuaikataulu maksuvaiheessa.",split_pay_only:'Jaa ostos neljään korottomaan <span class="tagline__bold">{splitPayLoanRepayment}</span>:n suuruiseen kahden viikon välein suoritettavaan lyhennykseen valitsemalla maksuerät kassavaiheessa.',ineligible_min:"Jaa arvoltaan {minPrice} suuremmat tilaukset neljään korottomaan lyhennykseen valitsemalla niille maksuerät maksuvaiheessa.",ineligible_monthly_payments_min:"Jaa arvoltaan {minPrice} suuremmat tilaukset kuukausittaisiin lyhennyksiin valitsemalla niille maksuerät maksuvaiheessa.",ineligible_max:"Jaa arvoltaan {maxPrice} suuremmat tilaukset useampiin lyhennyksiin valitsemalla niille maksuerät maksuvaiheessa.",dynamic_pdp:{one:"Näytesopimukset <b>{priceWithoutInterest}</b>:n ostoksesta",other:"Näytesopimukset <b>{priceWithoutInterest}</b>:n ostoksesta"},split_pay_only_2:'Jaa ostos kahteen korottomaan <span class="tagline__bold">{splitPayLoanRepayment}</span>:n suuruiseen 15 päivän välein suoritettavaan erään valitsemalla maksuerät kassavaiheessa.',split_pay_only_30:"Maksa <b>{price}</b>:n suuruinen ostoksesi 30 päivän kuluessa ilman korkoja valitsemalla maksuerät kassavaiheessa.",ineligible_min_over_time:"Jaa yli {minPrice}:n tilausten maksu pidemmälle aikavälille valitsemalla maksuerät kassavaiheessa."},close:"Sulje",new_window:"Avaa uuden ikkunan.",partnership:"Maksuerät yhteistyössä {affirmLogo}in kanssa",partnership_disclaimer:"Maksuerät yhteistyössä {affirmLogo}in kanssa. Affirm ei tarjoa käännöspalveluita. Affirm ja sen tarjonta ovat tuettuja vain englanniksi.",split_pay_contents:{interest_fees:"Ei koskaan piilokuluja.",interest_credit:"Ei vaikutusta luottopisteisiisi.",no_interest_fees:"Ei koskaan palvelumaksuja.",no_interest_credit:"Ei sovellettavaa vaikutusta luottopisteisiisi."},sample_plan_contents:{continue_to_checkout:"Jatka kassalle",unavailable:"Ei saatavilla",check_eligibility:"Kun jatkat, tietosi jaetaan Affirmille. <br/> Kelpoisuutesi tarkistaminen ei vaikuta luottoosi. ",apr:"APR",interest:"Korko",total:"Yhteensä",processing:"Pyyntöäsi käsitellään",processing_time:"Tämä voi kestää viisi minuuttia...",split_pay_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> joka toinen viikko</span>',other_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> joka kuukausi</span>',split_pay_number_of_terms:"&nbsp; {numberOfTerms} viikoksi",other_number_of_terms:"&nbsp; {numberOfTerms} kuukaudeksi"},prequal_contents:{unavailable:"Ei saatavilla",check:"Tarkista, täytätkö vaatimukset"},legal:{ca_residents_notice:"Kaliforniassa asuvat: Affirm Loan Services, LLC:n antamat lainat myönnetään tai järjestetään California Finance Lenderin (Kalifornian rahoituksen lainanantajan) lisenssin nojalla.",rates_from_apr:'Todellinen vuosikorko alkaen 0–36 %. Affirmin kautta tarjottavat maksuvaihtoehdot edellyttävät kelpoisuustarkistusta, eivät välttämättä ole saatavilla kaikissa osavaltioissa ja ne ovat seuraavien lainakumppanien tarjoamia: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Vaihtoehdot riippuvat ostoksen summasta, ja käsiraha saattaa olla pakollinen.',interest_and_split_pay:"Arvioitu hinta ei sisällä veroja eikä toimituskuluja.",split_pay_only:"Arvioitu hinta ei sisällä veroja eikä toimituskuluja. Maksuvaihtoehtojen tarjoaja on Affirm, niihin sovelletaan kelpoisuustarkistusta, eivätkä ne välttämättä ole saatavilla kaikissa osavaltioissa.",ineligible:"Maksuvaihtoehtojen tarjoaja on Affirm, niihin sovelletaan kelpoisuustarkistusta, eivätkä ne välttämättä ole saatavilla kaikissa osavaltioissa.",dynamic_pdp:'Arvioitu hinta ei sisällä veroja eikä toimituskuluja. Todellisen vuosikoron hintahaarukka on alkaen 0–36 %. Shop Pay -maksuerien maksutapoihin sovelletaan kelpoisuustarkistusta, ja ne ovat seuraavien lainakumppanien tarjoamia: <a class="help_text__link" href="https://www.affirm.com/lenders" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Vaihtoehdot riippuvat ostoksen summasta, ja käsiraha saattaa olla pakollinen. Vaihtoehtoja saattaa tulla lisää hyväksynnän yhteydessä. Osavaltion tietoa kuluttajille: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/licenses</a>.'}};var Ak={affirm:jk,shopPay:Ck,banner:xk,modal:Lk},Tk=Object.freeze({__proto__:null,affirm:jk,banner:xk,default:Ak,modal:Lk,shopPay:Ck});const Ek="Affirm",Ik="Shop Pay",Mk={learn_more:"En savoir plus",view_sample_plans:"Voir les exemples de forfaits",prequal:"Vérifiez votre pouvoir d’achat",split_pay_eligible:"Payez en 4 versements de <b>{price}</b> sans intérêts avec {shopPayLogo}",interest_only_eligible:"Divisez votre achat en plusieurs versements mensuels avec {shopPayLogo}",dynamic_interest_only_eligible:"Dès <b>{price}</b>/mois avec {shopPayLogo}",pay_in_4_or_as_low_as_eligible:"4 versements sans intérêts, ou dès <b>{price}</b>/mois avec {shopPayLogo}",zero_interest_eligible:"Dès <b>{price}</b>/mois ou un TAEG de 0 % avec {shopPayLogo}",zero_interest_eligible_zero_apr:"Dès <b>{price}</b>/mois à un TAEG de 0 % avec {shopPayLogo}",non_eligible_min:"Payez les commandes de plus de <b>{minPrice}</b> en 4 versements sans intérêts avec {shopPayLogo}",non_eligible_monthly_payments_min:"Divisez votre achat en plusieurs versements mensuels pour les commandes de plus de <b>{minPrice}</b> avec {shopPayLogo}",non_eligible_max:"Divisez votre achat en plusieurs versements pour les commandes d’un montant maximum de <b>{maxPrice}</b> avec {shopPayLogo}",prequal_contents:{not_prequalified_see_plans:"Vérifiez votre pouvoir d’achat",prequalified_see_plans:"Voir les forfaits",purchasing_power_a:"Votre pouvoir d’achat est ",purchasing_power_b:"Dépensez tout montant jusqu’à "},split_pay_eligible_2:"Payer en 2 versements de <b>{price}</b> sans intérêts avec {shopPayLogo}",split_pay_eligible_30:"Payer <b>{price}</b> sans intérêt dans un délai de 30 jours avec {shopPayLogo}",non_eligible_min_over_time:"Payer en plusieurs fois pour les commandes de plus de <b>{minPrice}</b> avec {shopPayLogo}",non_eligible_min_over_time_30:"Payez sans intérêt dans un délai de 30 jours pour les commandes de plus de <b>{minPrice}</b> avec {shopPayLogo}"},Ok={title:"Achetez maintenant, payez plus tard",subtitle:{interest_and_split_pay:'Choisissez votre calendrier de paiement à l’étape du paiement &#8211; à partir de 4 paiements de <span class="tagline__bold">{splitPayLoanRepayment}</span> sans intérêts toutes les 2 semaines.',interest_only:"Choisissez votre calendrier de paiement à l’étape du paiement pour diviser votre achat en plusieurs versements mensuels.",split_pay_only:'Sélectionnez le règlement en plusieurs versements à l’étape du paiement pour diviser votre achat en 4 paiements de <span class="tagline__bold">{splitPayLoanRepayment}</span> sans intérêts toutes les 2 semaines.',ineligible_min:"Pour les commandes de plus de {minPrice}, sélectionnez des versements échelonnés à l’étape du paiement afin de répartir votre achat sur 4 paiements sans intérêts.",ineligible_monthly_payments_min:"Pour les commandes de plus de {minPrice}, sélectionnez des versements échelonnés à l’étape du paiement afin de répartir votre achat sur plusieurs paiements mensuels.",ineligible_max:"Pour les commandes d’un montant maximum de {maxPrice}, sélectionnez des versements échelonnés à l’étape du paiement afin de répartir votre achat sur plusieurs paiements.",dynamic_pdp:{one:"Exemple de forfait pour un achat de <b>{priceWithoutInterest}</b>",other:"Exemples de forfaits pour un achat de <b>{priceWithoutInterest}</b>",many:"Exemples de forfaits pour un achat de <b>{priceWithoutInterest}</b>"},split_pay_only_2:'Sélectionnez le paiement en plusieurs versements à l’étape du paiement pour diviser votre achat en 2 paiements de <span class="tagline__bold">{splitPayLoanRepayment}</span> sans intérêts tous les 15 jours.',split_pay_only_30:"Sélectionnez le paiement en plusieurs versements à l’étape du paiement pour payer votre achat de <b>{price}</b> sans intérêt dans un délai de 30 jours.",ineligible_min_over_time:"Pour les commandes de plus de {minPrice}, sélectionnez le paiement en plusieurs versement à l’étape du paiement pour payer votre achat en plusieurs fois."},close:"Fermer",new_window:"S’ouvre dans une nouvelle fenêtre.",partnership:"Versements échelonnés en partenariat avec {affirmLogo}",partnership_disclaimer:"Paiement en plusieurs versements en partenariat avec {affirmLogo}. Les services de traduction ne sont pas fournis par Affirm. Affirm et ses offres ne sont accessibles qu’en anglais.",split_pay_contents:{interest_fees:"Jamais aucuns frais cachés.",interest_credit:"Aucun impact sur votre cote de solvabilité si vous postulez.",no_interest_fees:"Jamais aucuns frais.",no_interest_credit:"Aucun impact sur votre cote de solvabilité."},sample_plan_contents:{continue_to_checkout:"Continuer vers la page de paiement",unavailable:"Indisponible",check_eligibility:"Si vous continuez, vos informations seront partagées avec Affirm. <br/> La vérification de votre qualification n’affectera pas votre crédit. ",apr:"TAEG",interest:"Intérêt",total:"Total",processing:"Traitement de votre demande en cours",processing_time:"Cette opération peut prendre jusqu’à une minute...",split_pay_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> toutes les 2&nbsp;semaines</span>',other_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> tous les mois</span>',split_pay_number_of_terms:"&nbsp;pendant {numberOfTerms}&nbsp;semaines",other_number_of_terms:"&nbsp;pendant {numberOfTerms}&nbsp;mois"},prequal_contents:{unavailable:"Indisponible",check:"Vérifiez si vous répondez aux critères"},legal:{ca_residents_notice:"Pour les résident(e)s de Californie : les prêts d’Affirm Loan Services, LLC sont consentis ou établis en vertu d’une licence California Finance Lender.",rates_from_apr:'Taux annuel effectif global (TAEG) compris entre 0 et 36 %. Les options de paiement proposées par le biais d’Affirm sont soumises à un contrôle d’admissibilité, peuvent ne pas être disponibles dans tous les États et sont fournies par les partenaires de prêt d’Affirm : <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Les options proposées dépendent du montant de votre achat. Le versement d’un acompte peut être requis.',interest_and_split_pay:"Le montant estimé du paiement exclut les taxes et les frais d’expédition.",split_pay_only:"Le montant estimé du paiement exclut les taxes et les frais d’expédition. Les options de paiement sont offertes par Affirm. Elles sont soumises à un contrôle d’admissibilité et peuvent ne pas être proposées dans tous les États.",ineligible:"Les options de paiement sont offertes par Affirm. Elles sont soumises à un contrôle d’admissibilité et peuvent ne pas être proposées dans tous les États.",dynamic_pdp:'Le montant estimé du paiement exclut les taxes et les frais d’expédition. Taux annuel effectif global (TAEG) compris entre 0 et 36 %. Les options de paiement proposées par le biais du Paiement en plusieurs fois avec Shop Pay sont soumises à un contrôle d’admissibilité et sont fournies par les partenaires de prêt suivants : <a class="help_text__link" href="https://www.affirm.com/lenders" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Les options proposées dépendent du montant de votre achat. Le versement d’un acompte peut être requis. D’autres options peuvent être disponibles pour autant qu’elles soient approuvées. Avis des États aux consommateurs : <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/licenses</a>.'}};var Nk={affirm:Ek,shopPay:Ik,banner:Mk,modal:Ok},qk=Object.freeze({__proto__:null,affirm:Ek,banner:Mk,default:Nk,modal:Ok,shopPay:Ik});const Rk="Affirm",Dk="Shop Pay",Bk={learn_more:"अधिक जानें",view_sample_plans:"सैम्पल प्लान देखें",prequal:"अपनी खरीदने की शक्ति जांचें",split_pay_eligible:"{shopPayLogo} के साथ <b>{price}</b> की 4 ब्याज-मुक्त किस्तों में भुगतान करें",interest_only_eligible:"{shopPayLogo} के साथ अपनी खरीदारी को मासिक किस्तों में बदलें",dynamic_interest_only_eligible:"{shopPayLogo} के साथ <b>{price}</b>/माह से शुरू",pay_in_4_or_as_low_as_eligible:"{shopPayLogo} के साथ 4 ब्याज-मुक्त किस्तें या <b>{price}</b>/माह से शुरू",zero_interest_eligible:"{shopPayLogo} के साथ <b>{price}</b>/माह या 0% APR से शुरू",zero_interest_eligible_zero_apr:"{shopPayLogo} के साथ 0% APR पर <b>{price}</b>/माह से शुरू",non_eligible_min:"{shopPayLogo} के साथ <b>{minPrice}</b> से ज़्यादा की कीमत के ऑर्डर के लिए 4 ब्याज-मुक्त किस्तों में भुगतान करें",non_eligible_monthly_payments_min:"{shopPayLogo} के साथ <b>{minPrice}</b> से ज़्यादा की कीमत के ऑर्डर के लिए अपनी खरीदारी को मासिक किस्तों में बदलें",non_eligible_max:"{shopPayLogo} के साथ <b>{maxPrice}</b> तक की कीमत के ऑर्डर के लिए अपनी खरीदारी को किस्तों में बदलें",prequal_contents:{not_prequalified_see_plans:"अपनी खरीदने की शक्ति जांचें",prequalified_see_plans:"योजनाएं देखें",purchasing_power_a:"आपकी खरीदने की शक्ति है ",purchasing_power_b:"तक की कोई भी राशि खर्च करें "},split_pay_eligible_2:"{shopPayLogo} के साथ <b>{price}</b> की 2 ब्याज-मुक्त किस्तों में भुगतान करें",split_pay_eligible_30:"{shopPayLogo} के साथ बिना ब्याज चुकाए 30 दिनों के भीतर <b>{price}</b> का भुगतान करें",non_eligible_min_over_time:"{shopPayLogo} के साथ <b>{minPrice}</b> से ज़्यादा की कीमत के ऑर्डर के लिए समय के साथ भुगतान करें",non_eligible_min_over_time_30:"{shopPayLogo} के साथ <b>{minPrice}</b> से ज़्यादा कीमत के ऑर्डर के लिए बिना ब्याज चुकाए 30 दिनों के भीतर भुगतान करें"},Fk={title:"अभी पाएं, बाद में भुगतान करें",subtitle:{interest_and_split_pay:'चेकआउट के समय अपने भुगतान का शेड्यूल चुनें &#8211; हर 2 हफ़्ते में अदा की जाने वाली <span class="tagline__bold">{splitPayLoanRepayment}</span> की 4 ब्याज-मुक्त भुगतानों से शुरू.',interest_only:"अपनी खरीदारी को मासिक किस्तों में बदलने के लिए चेकआउट के समय अपने भुगतान का शेड्यूल चुनें.",split_pay_only:"अपनी खरीदारी को हर 2 हफ़्ते में अदा की जाने वाली <span class=\"tagline__bold\">{splitPayLoanRepayment}</span> की 4 ब्याज-मुक्त भुगतानों में बदलने के लिए चेकआउट के समय 'किस्तें' चुनें.",ineligible_min:"{minPrice} से ज़्यादा की कीमत के ऑर्डर के लिए, अपनी खरीदारी को 4 ब्याज-मुक्त भुगतानों में बदलने के लिए चेकआउट के समय 'किस्तें' चुनें.",ineligible_monthly_payments_min:"{minPrice} से ज़्यादा की कीमत के ऑर्डर के लिए, अपनी खरीदारी को मासिक भुगतानों में बदलने के लिए चेकआउट के समय 'किस्तें' चुनें.",ineligible_max:"{maxPrice} तक की कीमत के ऑर्डर के लिए, अपनी खरीदारी को एक से अधिक भुगतानों में बदलने के लिए चेकआउट के समय 'किस्तें' चुनें.",dynamic_pdp:{one:"<b>{priceWithoutInterest}</b> वाली खरीदारी के लिए सैम्पल प्लान",other:"<b>{priceWithoutInterest}</b> वाली खरीदारी के लिए सैम्पल प्लान"},split_pay_only_2:"अपनी खरीदारी को हर 15 दिनों में अदा की जाने वाली <span class=\"tagline__bold\">{splitPayLoanRepayment}</span> की 2 ब्याज-मुक्त भुगतानों में बदलने के लिए चेकआउट के समय 'किस्तें' चुनें.",split_pay_only_30:"<b>{price}</b> की अपनी खरीदारी के लिए, 30 दिनों के भीतर ब्याज-मुक्त भुगतान करने के लिए चेकआउट के समय किस्त चुनें.",ineligible_min_over_time:"{minPrice} से ज़्यादा की कीमत के ऑर्डर के लिए, अपनी खरीदारी को 'समय के साथ भुगतान' में बदलने के लिए चेकआउट के समय 'किस्तें' चुनें."},close:"बंद करे",new_window:"नए विंडो में खोलें.",partnership:"{affirmLogo} के साथ पार्टनरशिप में किस्तें",partnership_disclaimer:"{affirmLogo} के साथ पार्टनरशिप में किस्तें. Affirm अनुवादन सेवाएं मुहैया नहीं कराता है. Affirm और इसके द्वारा पेश किए जाने वाले ऑफ़र सिर्फ़ अंग्रेज़ी भाषा में समर्थित हैं.",split_pay_contents:{interest_fees:"कभी भी कोई छुपी हुई फ़ीस नहीं.",interest_credit:"आपके लागू क्रेडिट स्कोर पर कोई असर नहीं.",no_interest_fees:"कभी भी कोई फ़ीस नहीं.",no_interest_credit:"आपके लागू होने वाले क्रेडिट स्कोर पर कोई असर नहीं."},sample_plan_contents:{continue_to_checkout:"चेकआउट के लिए आगे बढ़ें",unavailable:"अनुपलब्ध",check_eligibility:"जारी रखने से, आपकी जानकारी Affirm के साथ शेयर की जाएगी. <br/> अपनी योग्यता जांचने से आपके क्रेडिट पर कोई असर नहीं पड़ेगा. ",apr:"APR",interest:"ब्याज",total:"कुल योग",processing:"आपका अनुरोध प्रोसेस किया जा रहा है",processing_time:"इसमें एक मिनट तक लग सकते हैं...",split_pay_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> हर 2 हफ़्ते में</span>',other_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> हर महीने</span>',split_pay_number_of_terms:"&nbsp;{numberOfTerms} हफ़्तों के लिए",other_number_of_terms:"&nbsp;{numberOfTerms} महीनों के लिए"},prequal_contents:{unavailable:"अनुपलब्ध",check:"जांचें कि आप क्वालिफ़ाई करते हैं या नहीं"},legal:{ca_residents_notice:"कैलिफ़ोर्निया के निवासी: Affirm Loan Services, LLC द्वारा ऋण कैलिफ़ोर्निया फ़ाइनेंस लेंडर लाइसेंस के अनुसार दिए या व्यवस्थित किए जाते हैं.",rates_from_apr:'0 से 36% APR के बीच की रेट. Affirm के ज़रिए मिलने वाले भुगतान के विकल्प पात्रता की जांच के अधीन होते हैं, हो सकता है कि सभी राज्यों में उपलब्ध न हों और इन लेंडिंग पार्टनर्स द्वारा मुहैया कराए जाते हैं: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. विकल्प आपकी खरीदारी की रकम पर निर्भर करते हैं और डाउन पेमेंट करना पड़ सकता है.',interest_and_split_pay:"भुगतान की अनुमानित रकम में टैक्स और शिपिंग शामिल नहीं है.",split_pay_only:"भुगतान की अनुमानित रकम में टैक्स और शिपिंग शामिल नहीं है. भुगतान के विकल्प Affirm द्वारा ऑफ़र किए जाते हैं और पात्रता की जांच के अधीन होते हैं और हो सकता है कि सभी राज्यों में उपलब्ध न हों.",ineligible:"भुगतान के विकल्प Affirm द्वारा ऑफ़र किए जाते हैं और पात्रता की जांच के अधीन होते हैं और हो सकता है कि सभी राज्यों में उपलब्ध न हों.",dynamic_pdp:'भुगतान की अनुमानित रकम में टैक्स और शिपिंग शामिल नहीं है. रेट 0-36% APR के बीच हो सकती है. Shop Pay Installments के ज़रिए उपलब्ध भुगतान के विकल्प पात्रता की जांच के अधीन होते हैं और इन लेंडिंग पार्टनर्स द्वारा मुहैया कराए जाते हैं: <a class="help_text__link" href="https://www.affirm.com/lenders" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. विकल्प आपकी खरीदारी की रकम पर निर्भर करते हैं और डाउन पेमेंट करना पड़ सकता है. मंजूरी मिलने पर और विकल्प उपलब्ध हो सकते हैं. उपभोक्ताओं के लिए राज्य की ओर से जारी नोटिस: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/licenses</a>.'}};var Vk={affirm:Rk,shopPay:Dk,banner:Bk,modal:Fk},$k=Object.freeze({__proto__:null,affirm:Rk,banner:Bk,default:Vk,modal:Fk,shopPay:Dk});const Wk="Affirm",Uk="Shop Pay",Hk={learn_more:"Saznajte više",view_sample_plans:"Prikaži primjer otplatnog plana",prequal:"Provjerite svoju kupovnu moć",split_pay_eligible:"Platite u 4 obroka bez kamata u iznosu od <b>{price}</b> uz {shopPayLogo}",interest_only_eligible:"Podijelite iznos kupnje u mjesečne obroke uz {shopPayLogo}",dynamic_interest_only_eligible:"Od <b>{price}</b>/mj. uz {shopPayLogo}",pay_in_4_or_as_low_as_eligible:"Samo 4 obroka bez kamata ili od <b>{price}</b>/mj uz {shopPayLogo}",zero_interest_eligible:"Od <b>{price}</b>/mj ili 0 % APR uz {shopPayLogo}",zero_interest_eligible_zero_apr:"Od <b>{price}</b>/mj. uz APR od 0 % uz {shopPayLogo}",non_eligible_min:"Sve narudžbe veće od <b>{minPrice}</b> platite u 4 obroka bez kamata uz {shopPayLogo}",non_eligible_monthly_payments_min:"Sve iznose kupnje koji su veći od <b>{minPrice}</b> podijelite u mjesečne obroke uz {shopPayLogo}",non_eligible_max:"Sve iznose kupnje do najviše <b>{maxPrice}</b> podijelite u mjesečne obroke uz {shopPayLogo}",prequal_contents:{not_prequalified_see_plans:"Provjerite svoju platnu sposobnost",prequalified_see_plans:"Pogledajte dostupne otplatne planove",purchasing_power_a:"Vaša platna sposobnost: ",purchasing_power_b:"Možete potrošiti bilo koji iznos do "},split_pay_eligible_2:"Platite u 2 obroka bez kamata u iznosu od <b>{price}</b> uz {shopPayLogo}",split_pay_eligible_30:"Platite <b>{price}</b> u roku od 30 dana bez kamata uz {shopPayLogo}",non_eligible_min_over_time:"Narudžbe veće od <b>{minPrice}</b> platite u više obroka uz {shopPayLogo}",non_eligible_min_over_time_30:"Sve narudžbe veće od <b>{minPrice}</b> platite u roku od 30 dana bez kamata uz {shopPayLogo}"},Kk={title:"Uzmite odmah, platite kasnije",subtitle:{interest_and_split_pay:'Sami odaberite tempo plaćanja, počevši od plaćanja u 4 obroka bez kamata uz iznosu od <span class="tagline__bold">{splitPayLoanRepayment}</span> i plaćanjem svaka 2 tjedna.',interest_only:"Sami odaberite tempo plaćanja i podijelite iznos kupnje u mjesečne obroke.",split_pay_only:'Odaberite plaćanje na rate prilikom plaćanja i podijelite iznos kupnje u 4 obroka bez kamata u iznosu od <span class="tagline__bold">{splitPayLoanRepayment}</span>, koja ćete platiti svaka 2 tjedna.',ineligible_min:"Za narudžbe veće od {minPrice}, prilikom plaćanja odaberite plaćanje na rate i iznos kupnje podijelite u 4 obroka bez kamata.",ineligible_monthly_payments_min:"Za narudžbe veće od {minPrice}, prilikom plaćanja odaberite plaćanje na rate i iznos kupnje podijelite mjesečne obroke.",ineligible_max:"Za narudžbe do najviše {maxPrice}, prilikom plaćanja odaberite plaćanje na rate i iznos kupnje podijelite u više mjesečnih obroka.",dynamic_pdp:{one:"Primjeri planova za kupnju za iznos od <b>{priceWithoutInterest}</b>",other:"Primjeri otplatnog plana za kupnju u iznosu od <b>{priceWithoutInterest}</b>",few:"Primjeri otplatnog plana za kupnju u iznosu od <b>{priceWithoutInterest}</b>"},split_pay_only_2:'Odaberite plaćanje na rate prilikom plaćanja i podijelite iznos kupnje u 2 obroka bez kamata u iznosu od <span class="tagline__bold">{splitPayLoanRepayment}</span>, koja ćete platiti svakih 15 dana.',split_pay_only_30:"Odaberite plaćanje u ratama za kupnju u iznosu od <b>{price}</b> bez kamata i platite u roku od 30 dana.",ineligible_min_over_time:"Za narudžbe veće od {minPrice}, prilikom plaćanja odaberite plaćanje na rate i podijelite iznos kupnje u više obroka."},close:"Zatvori",new_window:"Otvara se u novom prozoru.",partnership:"Obročno plaćanje u partnerstvu sa {affirmLogo}",partnership_disclaimer:"Plaćanje na rate u suradnji s tvrtkom {affirmLogo}. Affirm ne osigurava prijevod. Tvrtka Affirm i njezine ponude dostupne su samo na engleskom jeziku.",split_pay_contents:{interest_fees:"Bez ikakvih skrivenih troškova i naknada.",interest_credit:"Bez utjecaja na vaš kreditni rejting.",no_interest_fees:"Bez ikakvih naknada.",no_interest_credit:"Bez utjecaja na vaš kreditni rejting."},sample_plan_contents:{continue_to_checkout:"Idite na plaćanje",unavailable:"Nedostupno",check_eligibility:"Ako nastavite, vaše ćemo podatke podijeliti s tvrtkom Affirm. <br/> Ako želite provjeriti svoju kvalifikaciju, to neće utjecati na vaš kredit. ",apr:"APR",interest:"Kamata",total:"Ukupno",processing:"Obrada zahtjeva u tijeku",processing_time:"Može potrajati do jedne minute...",split_pay_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> svaka 2 tjedna</span>',other_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> svaki mjesec</span>',split_pay_number_of_terms:"&nbsp;za više tjedana ({numberOfTerms})",other_number_of_terms:"&nbsp;za više mjeseci ({numberOfTerms})"},prequal_contents:{unavailable:"Nedostupno",check:"Provjerite ispunjavate li uvjete"},legal:{ca_residents_notice:"Državljani Kalifornije: pozajmice koje daje tvrtka Affirm Loan Service izdaju se u uređuju u skladu s kalifornijskim pravilima za dobivanje dozvole za zajmodavca.",rates_from_apr:'Stope APR-a variraju od 0 do 36 %. Za opcije plaćanja putem tvrtke Affirm potrebno je ispuniti određene uvjete i dobiti odobrenje, a usluga nije dostupna u svim državama i pružaju je sljedeći partneri u ulozi zajmodavca: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a> Opcije ovise o iznosu kupnje i može biti potreban polog.',interest_and_split_pay:"Procijenjeni iznos plaćanja je bez poreza i troškova dostave.",split_pay_only:"Procijenjeni iznos plaćanja je bez poreza i troškova dostave. Načine plaćanja nudi Affirm, a pritom moraju biti zadovoljeni određeni uvjeti i načini plaćanja nisu nužno dostupni u svim američkim saveznim državama.",ineligible:"Načine plaćanja nudi Affirm, a pritom moraju biti zadovoljeni određeni uvjeti i načini plaćanja nisu nužno dostupni u svim američkim saveznim državama.",dynamic_pdp:'Procijenjeni iznos plaćanja je bez poreza i troškova dostave. Stope APR-a variraju od 0 do 36 %. Za odabir neke od opcija plaćanja putem usluge obročnog plaćanja Shop Pay obavlja potrebno je ispuniti određene uvjete i dobiti odobrenje, a uslugu pružaju sljedeći partneri u ulozi zajmodavaca: <a class="help_text__link" href="https://www.affirm.com/lenders" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Opcije ovise o iznosu kupnje i može biti potreban polog. Više opcija bit će dostupno nakon odobrenja. Državne obavijesti za potrošače: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/licenses</a>.'}};var Zk={affirm:Wk,shopPay:Uk,banner:Hk,modal:Kk},Gk=Object.freeze({__proto__:null,affirm:Wk,banner:Hk,default:Zk,modal:Kk,shopPay:Uk});const Jk="Affirm",Yk="Shop Pay",Qk={learn_more:"További információ",view_sample_plans:"Mintacsomagok megtekintése",prequal:"Ellenőrizd a vásárlóerődet",split_pay_eligible:"Fizesd ki 4 kamatmentes részletben a(z) <b>{price}</b> összegű vételárat a {shopPayLogo} segítségével",interest_only_eligible:"Oszd fel a vételárat havi részletekre a {shopPayLogo} segítségével",dynamic_interest_only_eligible:"Már <b>{price}</b>/hó ellenében is a {shopPayLogo} segítségével",pay_in_4_or_as_low_as_eligible:"4 kamatmentes részlet (vagy <b>{price}</b>/hó) a {shopPayLogo} segítségével",zero_interest_eligible:"<b>{price}</b>/hó vagy 0% THM a {shopPayLogo} segítségével",zero_interest_eligible_zero_apr:"<b>{price}</b>/hó 0% THM-mel a {shopPayLogo} segítségével",non_eligible_min:"<b>{minPrice}</b> felett 4 kamatmentes részletben fizetheted ki a rendeléseket a {shopPayLogo} segítségével",non_eligible_monthly_payments_min:"<b>{minPrice}</b> felett havi részletekre oszthatod fel a vételárat a {shopPayLogo} segítségével",non_eligible_max:"<b>{maxPrice}</b> vételárig részletekben fizethetsz a {shopPayLogo} segítségével",prequal_contents:{not_prequalified_see_plans:"Ellenőrizd a vásárlóerődet",prequalified_see_plans:"Csomagok megjelenítése",purchasing_power_a:"A vásárlóerőd ",purchasing_power_b:"Bármekkora összeget költhetsz eddig: "},split_pay_eligible_2:"Fizesd ki 2 kamatmentes részletben a(z) <b>{price}</b> összegű vételárat a {shopPayLogo} segítségével",split_pay_eligible_30:"Fizess <b>{price}</b> összeget 30 napon belül kamatmentesen {shopPayLogo} logóval",non_eligible_min_over_time:"<b>{minPrice}</b> felett részletben is fizethetsz a rendelésekért a {shopPayLogo} segítségével",non_eligible_min_over_time_30:"Fizess 30 napon belül <b>{minPrice}</b> feletti rendelésekért {shopPayLogo} logóval kamatmentesen"},Xk={title:"Vásárolj most, fizess később!",subtitle:{interest_and_split_pay:'A fizetéskor kiválaszthatod a törlesztés ütemtervét &#8211; a kezdő lehetőség 4 kamatmentes <span class="tagline__bold">{splitPayLoanRepayment}</span> összegű részlet 2 hetente.',interest_only:"A fizetéskor választhatod ki a törlesztés ütemtervét, havi részletekre felosztva ezzel a vételárat.",split_pay_only:'A fizetéskor kiválaszthatod a törlesztőrészleteket, így 4 kamatmentes, 2 hetente teljesítendő <span class="tagline__bold">{splitPayLoanRepayment}</span> összegű részletre oszthatod fel a vételárat.',ineligible_min:"Ha a rendelés végösszege nagyobb, mint {minPrice}, a fizetéskor 4 kamatmentes törlesztőrészletre oszthatod fel a vételárat.",ineligible_monthly_payments_min:"Ha a rendelés végösszege nagyobb, mint {minPrice}, a fizetéskor havi törlesztőrészletekre oszthatod fel a vételárat.",ineligible_max:"Ha a rendelés végösszege kisebb, mint {maxPrice}, a fizetéskor havi törlesztőrészletekre oszthatod fel a vételárat.",dynamic_pdp:{one:"Mintacsomag <b>{priceWithoutInterest}</b> összegű vásárlás esetére",other:"Mintacsomagok <b>{priceWithoutInterest}</b> összegű vásárlás esetére"},split_pay_only_2:'A fizetéskor kiválaszthatod a törlesztőrészleteket, így 2 kamatmentes, 15 naponta teljesítendő <span class="tagline__bold">{splitPayLoanRepayment}</span> összegű részletre oszthatod fel a vételárat.',split_pay_only_30:"A fizetéskor kiválaszthatod a törlesztőrészleteket, így 30 napon belül kamatmentesen fizethetsz a vásárlásodért <b>{price}</b> összeget.",ineligible_min_over_time:"Ha a rendelés végösszege nagyobb, mint {minPrice}, a fizetéskor törlesztőrészletekre oszthatod fel a vételárat."},close:"Bezárás",new_window:"Új ablakban nyílik meg.",partnership:"Részletfizetési partnerünk az {affirmLogo}",partnership_disclaimer:"Részletfizetési partnerünk az {affirmLogo}. Az Affirm nem kínál fordítási szolgáltatásokat. Az Affirm és az általa kínált ajánlatok kizárólag angol nyelven érhetők el.",split_pay_contents:{interest_fees:"Sosincs rejtett díj.",interest_credit:"Az igénylés nem befolyásolja a hitelpontszámodat.",no_interest_fees:"Sosincs díj.",no_interest_credit:"Az igénylés nem befolyásolja a hitelpontszámodat."},sample_plan_contents:{continue_to_checkout:"Tovább a pénztárba",unavailable:"Nem áll rendelkezésre",check_eligibility:"Ha továbblépsz, az adataidat megosztjuk az Affirmmel.<br/> A feltételeknek való megfelelésed ellenőrzése nincs hatással a hitelképességre ",apr:"THM",interest:"Kamat",total:"Végösszeg",processing:"A kérelem feldolgozása folyamatban",processing_time:"Akár egy percig is eltarthat...",split_pay_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> 2 hetente</span>',other_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> havonta</span>',split_pay_number_of_terms:"&nbsp;{numberOfTerms} hétig",other_number_of_terms:"&nbsp;{numberOfTerms} hónapig"},prequal_contents:{unavailable:"Nem áll rendelkezésre",check:"Ellenőrizd a jogosultságod"},legal:{ca_residents_notice:"Kaliforniai lakosok: Az Affirm Loan Services, LLC a kölcsöneit kaliforniai pénzügyi hitelezési engedély (California Finance Lender license) birtokában nyújtja vagy szervezi meg.",rates_from_apr:'A kamatláb 0–36% (THM) között változik. Az Affirm által kínált fizetési lehetőségek jogosultság-ellenőrzéshez vannak kötve, nem feltétlenül vehetők igénybe minden államban, és a következő hitelező partnereink biztosítják őket: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. A lehetőségek függenek a vásárlás összegétől, és előfordulhat, hogy a vételár egy részét azonnal ki kell fizetned.',interest_and_split_pay:"A becsült fizetendő összeg nem tartalmazza az adót és a szállítási költséget.",split_pay_only:"A becsült fizetendő összeg nem tartalmazza az adót és a szállítási költséget. A fizetési lehetőségeket az Affirm biztosítja, és csak jogosultság-ellenőrzés után vehetők igénybe, de nem minden államban.",ineligible:"A fizetési lehetőségeket az Affirm biztosítja, és csak jogosultság-ellenőrzés után vehetők igénybe, de nem minden államban.",dynamic_pdp:'A becsült fizetendő összeg nem tartalmazza az adót és a szállítási költséget. A kamatláb 0–36% (THM) között változik. A Shop Pay-részletfizetéssel igénybe vehető fizetési lehetőségek a jogosultság ellenőrzéséhez vannak kötve. A következő hitelező partnereink biztosítják őket: <a class="help_text__link" href="https://www.affirm.com/lenders" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. A lehetőségek függenek a vásárlás összegétől, és előfordulhat, hogy a vételár egy részét azonnal ki kell fizetned. A jóváhagyást követően további lehetőségek válhatnak elérhetővé. Államokkal kapcsolatos tájékoztatók a fogyasztóknak: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/licenses</a>.'}};var ew={affirm:Jk,shopPay:Yk,banner:Qk,modal:Xk},tw=Object.freeze({__proto__:null,affirm:Jk,banner:Qk,default:ew,modal:Xk,shopPay:Yk});const nw="Affirm",iw="Shop Pay",aw={learn_more:"Pelajari selengkapnya",view_sample_plans:"Lihat contoh paket",prequal:"Periksa daya beli Anda",split_pay_eligible:"Bayar dalam 4x cicilan bebas bunga sebesar <b>{price}</b> dengan {shopPayLogo}",interest_only_eligible:"Bagi pembelian ke dalam cicilan bulanan dengan {shopPayLogo}",dynamic_interest_only_eligible:"Mulai <b>{price}</b>/bln dengan {shopPayLogo}",pay_in_4_or_as_low_as_eligible:"4x cicilan bebas bunga, atau mulai <b>{price}</b>/bln dengan {shopPayLogo}",zero_interest_eligible:"Mulai <b>{price}</b>/bln atau 0% APR dengan {shopPayLogo}",zero_interest_eligible_zero_apr:"Mulai <b>{price}</b>/bln dengan 0% APR dengan {shopPayLogo}",non_eligible_min:"Bayar dalam 4x cicilan bebas bunga untuk pesanan bernilai lebih dari <b>{minPrice}</b> dengan {shopPayLogo}",non_eligible_monthly_payments_min:"Bagi pembelian ke dalam cicilan bulanan untuk pesanan bernilai lebih dari <b>{minPrice}</b> dengan {shopPayLogo}",non_eligible_max:"Bagi pembelian ke dalam cicilan bulanan untuk pesanan bernilai hingga <b>{maxPrice}</b> dengan {shopPayLogo}",prequal_contents:{not_prequalified_see_plans:"Periksa daya beli Anda",prequalified_see_plans:"Lihat paket",purchasing_power_a:"Daya beli Anda adalah ",purchasing_power_b:"Belanjakan berapa pun hingga "},split_pay_eligible_2:"Bayar dalam 2x cicilan bebas bunga sebesar <b>{price}</b> dengan {shopPayLogo}",split_pay_eligible_30:"Bayar <b>{price}</b> selama waktu 30 hari bebas bunga dengan {shopPayLogo}",non_eligible_min_over_time:"Bayar secara bertahap untuk pesanan yang bernilai lebih dari <b>{minPrice}</b> dengan {shopPayLogo}",non_eligible_min_over_time_30:"Bayar selama waktu 30 hari bebas bunga untuk pesanan bernilai lebih dari <b>{minPrice}</b> dengan {shopPayLogo}"},ow={title:"Dapatkan sekarang, bayar nanti",subtitle:{interest_and_split_pay:'Pilih jadwal pembayaran saat checkout &#8211; mulai dari 4x pembayaran bebas bunga sebesar <span class="tagline__bold">{splitPayLoanRepayment}</span> setiap 2 minggu.',interest_only:"Pilih jadwal pembayaran saat checkout untuk membagi pembelian Anda ke dalam cicilan bulanan.",split_pay_only:'Pilihan metode cicilan saat checkout untuk membagi pembelian Anda ke dalam 4x pembayaran bebas bunga sebesar <span class="tagline__bold">{splitPayLoanRepayment}</span> setiap 2 minggu.',ineligible_min:"Untuk pesanan bernilai lebih dari {minPrice}, pilih metode cicilan saat checkout untuk membagi pembelian Anda ke dalam 4x pembayaran bebas bunga.",ineligible_monthly_payments_min:"Untuk pesanan bernilai lebih dari {minPrice}, pilih metode pembayaran di checkout untuk membagi pembelian Anda ke dalam pembayaran bulanan.",ineligible_max:"Untuk pesanan bernilai hingga {maxPrice}, pilih metode cicilan saat checkout untuk membagi pembelian Anda ke dalam beberapa kali pembayaran.",dynamic_pdp:{one:"Contoh paket untuk pembelian senilai <b>{priceWithoutInterest}</b>",other:"Contoh paket untuk pembelian senilai <b>{priceWithoutInterest}</b>"},split_pay_only_2:'Pilih metode cicilan saat checkout untuk membagi pembelian Anda ke dalam 2x pembayaran bebas bunga sebesar <span class="tagline__bold">{splitPayLoanRepayment}</span> setiap 15 hari.',split_pay_only_30:"Pilih metode cicilan saat checkout untuk membayar pembelian Anda seharga <b>{price}</b> dengan bebas bunga dalam waktu 30 hari.",ineligible_min_over_time:"Untuk pesanan yang bernilai lebih dari {minPrice}, pilih metode cicilan saat checkout untuk membagi pembelian Anda secara bertahap."},close:"Tutup",new_window:"Membuka di jendela baru.",partnership:"Cicilan bekerja sama dengan {affirmLogo}",partnership_disclaimer:"Cicilan bekerja sama dengan {affirmLogo}. Affirm tidak menyediakan layanan penerjemahan. Affirm dan semua penawarannya hanya tersedia dalam bahasa Inggris.",split_pay_contents:{interest_fees:"Tanpa biaya tersembunyi, selamanya.",interest_credit:"Mendaftar program ini tidak akan memengaruhi skor kredit Anda.",no_interest_fees:"Bebas biaya, selamanya.",no_interest_credit:"Mendaftar ke program ini tidak akan memengaruhi skor kredit Anda."},sample_plan_contents:{continue_to_checkout:"Lanjutkan ke checkout",unavailable:"Tidak Tersedia",check_eligibility:"Dengan melanjutkan, informasi Anda akan dibagikan kepada Affirm. <br/> Pemeriksaan kelayakan tidak akan memengaruhi kredit Anda. ",apr:"APR",interest:"Bunga",total:"Total",processing:"Memproses permintaan Anda",processing_time:"Proses ini memerlukan waktu hingga satu menit...",split_pay_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> setiap 2 minggu</span>',other_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> setiap bulan</span>',split_pay_number_of_terms:"&nbsp;selama {numberOfTerms} minggu",other_number_of_terms:"&nbsp;selama {numberOfTerms} bulan"},prequal_contents:{unavailable:"Tidak Tersedia",check:"Periksa kelayakan Anda"},legal:{ca_residents_notice:"Penduduk CA: Pinjaman dari Affirm Loan Services, LLC diberikan atau diatur sesuai dengan lisensi California Finance Lender.",rates_from_apr:'Ongkos bervariasi mulai 0-36% APR. Opsi pembayaran melalui Affirm akan dikenai pemeriksaan kelayakan, mungkin hanya tersedia di negara bagian tertentu, dan disediakan oleh mitra pemberi pinjaman berikut: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Opsi disesuaikan dengan jumlah pembelian Anda dan mungkin memerlukan uang muka.',interest_and_split_pay:"Perkiraan jumlah pembayaran belum termasuk pajak dan pengiriman.",split_pay_only:"Perkiraan jumlah pembayaran belum termasuk pajak dan pengiriman. Opsi pembayaran disediakan oleh Affirm dan masih menunggu hasil pemeriksaan kelayakan, serta mungkin tidak tersedia di semua negara bagian.",ineligible:"Opsi pembayaran disediakan oleh Affirm dan masih menunggu hasil pemeriksaan kelayakan, serta mungkin tidak tersedia di semua negara bagian.",dynamic_pdp:'Perkiraan jumlah pembayaran belum termasuk pajak dan pengiriman. Ongkos bervariasi dari 0 sampai 36% APR. Opsi pembayaran melalui Cicilan Shop Pay akan dikenai pemeriksaan kelayakan dan disediakan oleh mitra pemberi pinjaman berikut: <a class="help_text__link" href="https://www.affirm.com/lenders" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Opsi disesuaikan dengan jumlah pembelian Anda dan mungkin memerlukan uang muka. Setelah persetujuan didapatkan, opsi yang tersedia dapat bertambah. Pemberitahuan negara bagian kepada pelanggan: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/licenses</a>.'}};var sw={affirm:nw,shopPay:iw,banner:aw,modal:ow},rw=Object.freeze({__proto__:null,affirm:nw,banner:aw,default:sw,modal:ow,shopPay:iw});const lw="Affirm",cw="Shop Pay",pw={learn_more:"Maggiori informazioni",view_sample_plans:"Visualizza esempi di piani",prequal:"Verifica il tuo potere d'acquisto",split_pay_eligible:"Paga in quattro rate a tasso zero da <b>{price}</b> con {shopPayLogo}",interest_only_eligible:"Suddividi il tuo acquisto in rate mensili con {shopPayLogo}",dynamic_interest_only_eligible:"Da <b>{price}</b>/mese con {shopPayLogo}",pay_in_4_or_as_low_as_eligible:"Quattro rate a tasso zero o da <b>{price}</b>/mese con {shopPayLogo}",zero_interest_eligible:"Da <b>{price}</b>/mese o TAEG 0% con {shopPayLogo}",zero_interest_eligible_zero_apr:"Da <b>{price}</b>/mese al TAEG 0% con {shopPayLogo}",non_eligible_min:"Paga in quattro rate a tasso zero per gli ordini superiori a <b>{minPrice}</b> con {shopPayLogo}",non_eligible_monthly_payments_min:"Suddividi il tuo acquisto in rate mensili per gli ordini superiori a <b>{minPrice}</b> con {shopPayLogo}",non_eligible_max:"Suddividi il tuo acquisto in rate per gli ordini fino a <b>{maxPrice}</b> con {shopPayLogo}",prequal_contents:{not_prequalified_see_plans:"Verifica il tuo potere d'acquisto",prequalified_see_plans:"Vedi piani",purchasing_power_a:"Il tuo potere d'acquisto è ",purchasing_power_b:"Spendi qualsiasi importo fino a "},split_pay_eligible_2:"Paga in due rate a tasso zero da <b>{price}</b> con {shopPayLogo}",split_pay_eligible_30:"Paga <b>{price}</b> entro 30 giorni a tasso zero con {shopPayLogo}",non_eligible_min_over_time:"Paga a rate per gli ordini superiori a <b>{minPrice}</b> con {shopPayLogo}",non_eligible_min_over_time_30:"Paga entro 30 giorni a tasso zero per gli ordini superiori a <b>{minPrice}</b> con {shopPayLogo}"},dw={title:"Ricevilo ora, paga dopo",subtitle:{interest_and_split_pay:'Scegli il tuo programma di pagamento al check-out, a partire da quattro rate a tasso zero da <span class="tagline__bold">{splitPayLoanRepayment}</span> ogni due settimane.',interest_only:"Scegli il tuo programma di pagamento al check-out per suddividere l'acquisto in rate mensili.",split_pay_only:'Seleziona le rate al check-out per suddividere il tuo acquisto in quattro rate a tasso zero da <span class="tagline__bold">{splitPayLoanRepayment}</span> ogni due settimane.',ineligible_min:"Per gli ordini superiori a {minPrice}, seleziona le rate al check-out per suddividere il tuo acquisto in quattro rate a tasso zero.",ineligible_monthly_payments_min:"Per gli ordini superiori a {minPrice}, seleziona le rate al check-out per suddividere il tuo acquisto in rate mensili.",ineligible_max:"Per gli ordini fino a {maxPrice}, seleziona le rate al check-out per suddividere il tuo acquisto in più rate.",dynamic_pdp:{one:"Esempio di piano per un acquisto da <b>{priceWithoutInterest}</b>",other:"Esempi di piani per un acquisto da <b>{priceWithoutInterest}</b>",many:"Esempi di piani per un acquisto da <b>{priceWithoutInterest}</b>"},split_pay_only_2:'Seleziona le rate al check-out per suddividere il tuo acquisto in due rate a tasso zero da <span class="tagline__bold">{splitPayLoanRepayment}</span> ogni 15 giorni.',split_pay_only_30:"Seleziona le rate al check-out per pagare l'acquisto di <b>{price}</b> a tasso zero entro 30 giorni.",ineligible_min_over_time:"Per gli ordini superiori a {minPrice}, seleziona le rate al check-out per suddividere il tuo acquisto in rate."},close:"Chiudi",new_window:"Si apre in una nuova finestra.",partnership:"Servizio di rateizzazione in collaborazione con {affirmLogo}",partnership_disclaimer:"Servizio di rateizzazione in collaborazione con {affirmLogo}. Affirm non fornisce servizi di traduzione. Affirm e le sue offerte sono supportate solo in inglese.",split_pay_contents:{interest_fees:"Niente costi nascosti, mai.",interest_credit:"Nessun impatto sul tuo merito di credito.",no_interest_fees:"Nessuna commissione, mai.",no_interest_credit:"Nessun impatto sul tuo merito di credito."},sample_plan_contents:{continue_to_checkout:"Passa al check-out",unavailable:"Non disponibile",check_eligibility:"Se continui, le tue informazioni verranno condivise con Affirm. <br/> Il controllo dei requisiti non influirà sul tuo credito. ",apr:"TAEG",interest:"Interesse",total:"Totale",processing:"Elaborazione della richiesta",processing_time:"Questa operazione può richiedere fino a un minuto...",split_pay_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> ogni 2 settimane</span>',other_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> ogni mese</span>',split_pay_number_of_terms:"&nbsp;per {numberOfTerms} settimane",other_number_of_terms:"&nbsp;per {numberOfTerms} mesi"},prequal_contents:{unavailable:"Non disponibile",check:"Controlla se hai i requisiti"},legal:{ca_residents_notice:"Residenti in California: i prestiti sono concessi o concordati da Affirm Loan Services, SRL in base alla California Finance Lender license.",rates_from_apr:'Tariffe a partire da TAEG 0-36%. Le opzioni di pagamento tramite Affirm sono soggette a una verifica di idoneità, potrebbero non essere disponibili in tutti gli stati e sono offerte dai seguenti partner di credito: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Le opzioni variano in base all\'importo dell\'acquisto e potrebbe essere richiesto un acconto.',interest_and_split_pay:"L'importo da pagare stimato non include le imposte e la spedizione.",split_pay_only:"L'importo da pagare stimato non include le imposte e la spedizione. Le opzioni di pagamento sono offerte da Affirm, sono soggette a controllo di idoneità e potrebbero non essere disponibili in tutti gli stati.",ineligible:"Le opzioni di pagamento sono offerte da Affirm, sono soggette a controllo di idoneità e potrebbero non essere disponibili in tutti gli stati.",dynamic_pdp:'L\'importo da pagare stimato non include le imposte e la spedizione. Le tariffe variano da TAEG 0-36%. Le opzioni di pagamento con Shop Pay Installments sono soggette a una verifica dell\'idoneità e sono offerte dai seguenti partner di credito: <a class="help_text__link" href="https://www.affirm.com/lenders" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Le opzioni variano in base all\'importo dell\'acquisto e potrebbe essere richiesto un acconto. Altre opzioni possono essere disponibili su approvazione. Avvisi per i consumatori in base ai diversi stati: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/licenses</a>.'}};var uw={affirm:lw,shopPay:cw,banner:pw,modal:dw},mw=Object.freeze({__proto__:null,affirm:lw,banner:pw,default:uw,modal:dw,shopPay:cw});const hw="Affirm",_w="Shop Pay",gw={learn_more:"詳しくはこちら",view_sample_plans:"プランの例を表示",prequal:"購買力を確認する",split_pay_eligible:"{shopPayLogo}を使用して無利息分割払いで<b>{price}</b>を4回支払う",interest_only_eligible:"{shopPayLogo}を使用すると購入額の支払いを毎月の分割払いにすることができます",dynamic_interest_only_eligible:"{shopPayLogo}を使用して月額<b>{price}</b>から支払う",pay_in_4_or_as_low_as_eligible:"{shopPayLogo}を使用して4回の無利息分割払いで、または月額<b>{price}</b>から支払う",zero_interest_eligible:"{shopPayLogo}を使用して月額<b>{price}</b>から、または実質年率0%で支払う",zero_interest_eligible_zero_apr:"{shopPayLogo}を使用して月額<b>{price}</b>から実質年率0%で支払う",non_eligible_min:"{shopPayLogo}を使用して<b>{minPrice}</b>以上の注文の支払いを4回の無利息分割払いにする",non_eligible_monthly_payments_min:"{shopPayLogo}を使用すると購入額<b>{minPrice}</b>以上の注文の支払いを毎月の分割払いにすることができます",non_eligible_max:"{shopPayLogo}を使用すると購入額<b>{maxPrice}</b>以下の注文の支払いを毎月の分割払いにすることができます",prequal_contents:{not_prequalified_see_plans:"購買力を確認する",prequalified_see_plans:"プランを表示する",purchasing_power_a:"購買力は ",purchasing_power_b:"最大利用額 "},split_pay_eligible_2:"{shopPayLogo}を使用して、無利息分割払いで<b>{price}</b>を2回支払いましょう",split_pay_eligible_30:"{shopPayLogo}で30日以内に<b>{price}</b>を無利息で支払う",non_eligible_min_over_time:"{shopPayLogo}を使用して、<b>{minPrice}</b>以上の注文を分割払いしましょう",non_eligible_min_over_time_30:"{shopPayLogo}で<b>{minPrice}</b>を超える注文を30日以内に無利息支払う"},fw={title:"今すぐ獲得、後で支払う",subtitle:{interest_and_split_pay:'チェックアウト時に支払いスケジュールを選択してください - 2週間ごとに<span class="tagline__bold">{splitPayLoanRepayment}</span>の無利息4回払いから選択できます。',interest_only:"チェックアウト時に支払いスケジュールを選択して、購入額の支払いを毎月の分割払いにすることができます。",split_pay_only:'チェックアウト時に分割払いを選択して、購入額の支払いを2週間ごとに<span class="tagline__bold">{splitPayLoanRepayment}</span>の無利息4回払いにすることができます。',ineligible_min:"{minPrice}以上の注文については、チェックアウト時に分割払いを選択して、購入額の支払いを無利息4回払いにすることができます。",ineligible_monthly_payments_min:"{minPrice}以上の注文については、チェックアウト時に分割払いを選択して、購入額の支払いを月額払いにすることができます。",ineligible_max:"{maxPrice}以下の注文については、チェックアウト時に分割払いを選択して、購入額の支払いを複数回払いにすることができます。",dynamic_pdp:{one:"購入額<b>{priceWithoutInterest}</b>に対するプランの例",other:"購入額<b>{priceWithoutInterest}</b>に対するプランの例"},split_pay_only_2:'チェックアウト時に分割払いを選択して、購入額の支払いを15日ごとに<span class="tagline__bold">{splitPayLoanRepayment}</span>の無利息2回払いにすることができます。',split_pay_only_30:"チェックアウト時に分割払いを選択して、30日以内であれば無利息で<b>{price}</b>の購入額をお支払いいただけます。",ineligible_min_over_time:"{minPrice}以上の注文については、チェックアウト時に分割払いを選択して、購入額の支払いを分割払いにすることができます。"},close:"閉じる",new_window:"新しいウィンドウで開く",partnership:"{affirmLogo}との提携による分割払い",partnership_disclaimer:"{affirmLogo}との提携による分割払いです。翻訳サービスはAffirmが提供するものではありません。Affirmとその提供物は英語のみでサポートされています。",split_pay_contents:{interest_fees:"隠された手数料は一切ありません。",interest_credit:"申し込みによるクレジットスコアへの影響はありません。",no_interest_fees:"手数料は一切かかりません。",no_interest_credit:"申し込みによるクレジットスコアへの影響はありません。"},sample_plan_contents:{continue_to_checkout:"チェックアウトを続行する",unavailable:"利用できません",check_eligibility:"続行すると、あなたの情報がAffirmに共有されます。 <br/> 対象かどうかを確認しても信用には影響しません。 ",apr:"実質年率",interest:"利息",total:"合計",processing:"リクエストの処理中",processing_time:"これには最大1分かかります...",split_pay_frequency:'<span class="list-item__frequency">2週間ごと</span>に<b class="list-item__price-per-term">{pricePerTerm}</b>',other_frequency:'<span class="list-item__frequency">毎月</span><b class="list-item__price-per-term">{pricePerTerm}</b>',split_pay_number_of_terms:"&nbsp;({numberOfTerms}週間)",other_number_of_terms:"&nbsp;({numberOfTerms}か月間)"},prequal_contents:{unavailable:"利用できません",check:"対象かどうかを確認"},legal:{ca_residents_notice:"カリフォルニア州の居住者：Affirm Loan Services, LLCによるローンは、カリフォルニア州金融業ライセンス (California Finance Lender license) に従って作成また締結されます。",rates_from_apr:'実質年率は0%～36%です。Affirmによる決済オプションは、資格確認を必要とし、一部の州で利用できない場合があります。また、<a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>に記載されている融資パートナーによって提供されます。決済オプションは購入金額によって異なり、頭金を必要とする場合があります。',interest_and_split_pay:"お支払いの見積もり金額に、税金と配送料は含まれません。",split_pay_only:"お支払いの見積もり金額に、税金と配送料は含まれません。決済オプションはAffirmによって提供され、資格確認を必要とします。また、一部の州で利用できない場合があります。",ineligible:"決済オプションはAffirmによって提供され、資格確認を必要とします。また、一部の州で利用できない場合があります。",dynamic_pdp:'お支払いの見積もり金額に、税金と配送料は含まれません。実質年率は0%～36%です。Shop Payの分割払いの決済オプションは、資格確認を必要とし、<a class="help_text__link" href="https://www.affirm.com/lenders" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>に記載されている融資パートナーによって提供されます。決済オプションは購入金額によって異なり、頭金を必要とする場合があります。承認されると、さらに多くのオプションが利用可能になる場合があります。<a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/licenses</a>から、消費者に対する州の通知を確認できます。'}};var bw={affirm:hw,shopPay:_w,banner:gw,modal:fw},yw=Object.freeze({__proto__:null,affirm:hw,banner:gw,default:bw,modal:fw,shopPay:_w});const vw="Affirm",kw="Shop Pay",ww={learn_more:"자세히 알아보기",view_sample_plans:"샘플 플랜 보기",prequal:"구매력 확인하기",split_pay_eligible:"{shopPayLogo}에서 <b>{price}</b>씩 4회 무이자 할부로 결제하세요",interest_only_eligible:"{shopPayLogo}에서 구매 금액을 월 할부로 결제하세요",dynamic_interest_only_eligible:"{shopPayLogo}에서 월 <b>{price}</b>부터",pay_in_4_or_as_low_as_eligible:"{shopPayLogo}에서 4회 무이자 할부 또는 월 <b>{price}</b>씩 결제",zero_interest_eligible:"{shopPayLogo}에서 월 <b>{price}</b>부터 또는 연이율 0%",zero_interest_eligible_zero_apr:"{shopPayLogo}에서 연이율 0%로 월 <b>{price}</b>부터",non_eligible_min:"{shopPayLogo}에서 <b>{minPrice}</b>이(가) 넘는 주문에 대해 4회 무이자 할부로 결제하세요",non_eligible_monthly_payments_min:"{shopPayLogo}에서 <b>{minPrice}</b>이(가) 넘는 주문의 구매 금액을 월 할부로 결제하세요",non_eligible_max:"{shopPayLogo}에서 최대 <b>{maxPrice}</b>의 주문의 구매 금액을 월 할부로 결제하세요",prequal_contents:{not_prequalified_see_plans:"구매력 확인하기",prequalified_see_plans:"플랜 보기",purchasing_power_a:"귀하의 구매력: ",purchasing_power_b:"최대 지출 금액: "},split_pay_eligible_2:"{shopPayLogo}로 <b>{price}</b>씩 2회 무이자 할부로 결제하세요",split_pay_eligible_30:"{shopPayLogo}로 30일 이내에 <b>{price}</b>의 금액을 무이자로 결제하세요",non_eligible_min_over_time:"{shopPayLogo}로 <b>{minPrice}</b>가 넘는 주문을 천천히 결제하세요",non_eligible_min_over_time_30:"{shopPayLogo}에서 <b>{minPrice}</b>이(가) 넘는 주문에 대해 30일 이내에 무이자로 결제하세요"},Pw={title:"지금 얻고, 나중에 결제",subtitle:{interest_and_split_pay:'결제 시 결제 일정을 선택하세요 &#8211; 2주마다 <span class="tagline__bold">{splitPayLoanRepayment}</span>씩 4회 무이자 할부부터 시작합니다.',interest_only:"결제 시 결제 일정을 선택하여 구매 금액을 월 할부로 결제하세요.",split_pay_only:'결제 시 할부를 선택하여 구매 금액을 4회 무이자 할부로 나누어 2주마다 <span class="tagline__bold">{splitPayLoanRepayment}</span>을(를) 결제합니다.',ineligible_min:"{minPrice}이(가) 넘는 주문에 대해서는 결제 시 할부를 선택하여 구매 금액을 4회 무이자 할부로 결제합니다.",ineligible_monthly_payments_min:"{minPrice}이(가) 넘는 주문에 대해서는 결제 시 할부를 선택하여 구매 금액을 월간 결제로 나누어 결제합니다.",ineligible_max:"최대 {maxPrice}의 주문에 대해서는 결제 시 할부를 선택하여 구매 금액을 다중 결제로 나누어 결제합니다.",dynamic_pdp:{one:"<b>{priceWithoutInterest}</b> 구매에 대한 샘플 플랜",other:"<b>{priceWithoutInterest}</b> 구매에 대한 샘플 플랜"},split_pay_only_2:'결제 시 할부를 선택하여 구매 금액을 2회 무이자 할부로 나누어 15일마다 <span class="tagline__bold">{splitPayLoanRepayment}</span>을(를) 결제합니다.',split_pay_only_30:"결제 시 할부를 선택하여 구매 금액(<b>{price}</b>)을 무이자로 30일 이내에 결제합니다.",ineligible_min_over_time:"{minPrice}이(가) 넘는 주문에 대해서는 결제 시 할부를 선택하여 구매 금액을 천천히 결제합니다."},close:"닫기",new_window:"새 창에서 열립니다.",partnership:"{affirmLogo} 제휴 할부",partnership_disclaimer:"{affirmLogo} 제휴 할부입니다. 번역 서비스는 Affirm에서 제공하지 않습니다. Affirm과 그 혜택은 영어로만 지원됩니다.",split_pay_contents:{interest_fees:"숨겨진 수수료가 없습니다.",interest_credit:"신용 점수에 미치는 영향이 없습니다.",no_interest_fees:"수수료가 없습니다.",no_interest_credit:"신용 점수에 미치는 영향이 없습니다."},sample_plan_contents:{continue_to_checkout:"결제 계속 진행",unavailable:"사용할 수 없음",check_eligibility:"계속하면 정보가 Affirm과 공유됩니다. <br/> 자격 확인은 신용에 영향을 미치지 않습니다. ",apr:"연이율",interest:"이자",total:"총계",processing:"요청을 처리하는 중입니다",processing_time:"이 작업은 최대 1분 정도 걸릴 수 있습니다...",split_pay_frequency:'<span class="list-item__frequency">2주마다</span>&nbsp;<b class="list-item__price-per-term">{pricePerTerm}</b>',other_frequency:'<span class="list-item__frequency">매월</span>&nbsp;<b class="list-item__price-per-term">{pricePerTerm}</b>',split_pay_number_of_terms:"({numberOfTerms}주 동안)",other_number_of_terms:"({numberOfTerms}개월 동안)"},prequal_contents:{unavailable:"사용할 수 없음",check:"자격이 있는지 확인"},legal:{ca_residents_notice:"캘리포니아 거주자: Affirm Loan Services, LLC의 대출금은 California Finance Lender에 따라 지급되거나 조정됩니다.",rates_from_apr:'연이율은 0~36%부터입니다. Affirm을 통한 결제 옵션은 자격을 갖추어야 하며, 일부 주에서는 제공되지 않을 수 있으며, 다음 대출 협력사인 <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>에 의해 제공됩니다. 옵션은 구매 금액에 따라 달라지며 일부 선불 결제가 필요할 수 있습니다.',interest_and_split_pay:"예상 결제 금액에는 세금과 배송료가 포함되지 않습니다.",split_pay_only:"예상 결제 금액에는 세금과 배송료가 포함되지 않습니다. 결제 옵션은 Affirm에서 제공하고 자격 대상을 확인하며 일부 주에서는 사용하지 못할 수도 있습니다.",ineligible:"결제 옵션은 Affirm에서 제공하고 자격 대상을 확인하며 일부 주에서는 사용하지 못할 수도 있습니다.",dynamic_pdp:'예상 결제 금액에는 세금과 배송료가 포함되지 않습니다. 연이율 범위는 0~36%부터입니다. Shop Pay 할부를 통한 결제 옵션은 자격 확인을 받아야 하며 대출 협력사인 <a class="help_text__link" href="https://www.affirm.com/lenders" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>에서 서비스를 제공합니다. 옵션은 구매 금액에 따라 달라지며 일부 선불 결제가 필요할 수 있습니다. 승인 시 추가 옵션이 제공될 수도 있습니다. 소비자에 대한 주 고지 사항은 <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/licenses</a>에서 확인하세요.'}};var Sw={affirm:vw,shopPay:kw,banner:ww,modal:Pw},zw=Object.freeze({__proto__:null,affirm:vw,banner:ww,default:Sw,modal:Pw,shopPay:kw});const jw="„Affirm“",Cw="„Shop Pay“",xw={learn_more:"Sužinokite daugiau",view_sample_plans:"Žiūrėti planų pavyzdžius",prequal:"Patikrinkite savo perkamąją galią",split_pay_eligible:"Mokėkite 4 įmokomis po <b>{price}</b> be palūkanų su {shopPayLogo}",interest_only_eligible:"Padalinkite pirkimo sumą į mėnesines įmokas su {shopPayLogo}",dynamic_interest_only_eligible:"Nuo <b>{price}</b>/mėn. su {shopPayLogo}",pay_in_4_or_as_low_as_eligible:"4 įmokos be palūkanų, arba nuo <b>{price}</b>/mėn. su {shopPayLogo}",zero_interest_eligible:"Nuo <b>{price}</b>/mėn. arba 0 % MPN su {shopPayLogo}",zero_interest_eligible_zero_apr:"Nuo <b>{price}</b>/mėn. arba 0 % MPN su {shopPayLogo}",non_eligible_min:"Mokėkite 4 įmokomis be palūkanų už užsakymus, kurių suma viršija <b>{minPrice}</b>, su {shopPayLogo}",non_eligible_monthly_payments_min:"Padalinkite pirkimo sumą į mėnesines įmokas už užsakymus, kurių suma viršija <b>{minPrice}</b>, su {shopPayLogo}",non_eligible_max:"Padalinkite pirkimo sumą į įmokas už užsakymus, kurių suma neviršija <b>{maxPrice}</b>, su {shopPayLogo}",prequal_contents:{not_prequalified_see_plans:"Patikrinkite savo perkamąją galią",prequalified_see_plans:"Žr. planus",purchasing_power_a:"Jūsų perkamoji galia yra ",purchasing_power_b:"Išleiskite bet kokią sumą iki "},split_pay_eligible_2:"Mokėkite 2 įmokomis po <b>{price}</b> be palūkanų su {shopPayLogo}",split_pay_eligible_30:"Sumokėkite <b>{price}</b> per 30 dienų be palūkanų su {shopPayLogo}",non_eligible_min_over_time:"Mokėkite dalimis už užsakymus, viršijančius <b>{minPrice}</b> su {shopPayLogo}",non_eligible_min_over_time_30:"Sumokėkite per 30 dienų be palūkanų už užsakymus, kurių suma viršija <b>{minPrice}</b> su {shopPayLogo}"},Lw={title:"Gaukite dabar, mokėkite vėliau",subtitle:{interest_and_split_pay:'Pasirinkite mokėjimų grafiką atsiskaitydami &#8211; pradedant nuo 4 mokėjimų po <span class="tagline__bold">{splitPayLoanRepayment}</span> be palūkanų kas 2 savaites.',interest_only:"Pasirinkite mokėjimų grafiką atsiskaitydami ir padalinkite pirkimo sumą į mėnesines įmokas.",split_pay_only:'Atsiskaitydami pasirinkite įmokas ir padalinkite visą pirkimo sumą į 4 mokėjimus po <span class="tagline__bold">{splitPayLoanRepayment}</span> be palūkanų kas 2 savaites.',ineligible_min:"Jei užsakymų suma viršija {minPrice}, pasirinkite įmokas atsiskaitydami ir padalinkite pirkimo sumą į 4 mokėjimus be palūkanų.",ineligible_monthly_payments_min:"Jei užsakymų suma viršija {minPrice}, pasirinkite įmokas atsiskaitydami ir padalinkite pirkimo sumą į mėnesinius mokėjimus.",ineligible_max:"Jei užsakymų suma neviršija {maxPrice}, pasirinkite įmokas atsiskaitydami ir padalinkite pirkimo sumą į keletą mokėjimų.",dynamic_pdp:{one:"Plano pavyzdys už <b>{priceWithoutInterest}</b> sumos pirkinius",other:"Planų pavyzdžiai už <b>{priceWithoutInterest}</b> pirkimo sumą",few:"Planų pavyzdžiai už <b>{priceWithoutInterest}</b> pirkimo sumą",many:"Planų pavyzdžiai už <b>{priceWithoutInterest}</b> pirkimo sumą"},split_pay_only_2:'Atsiskaitydami pasirinkite įmokas ir padalinkite visą pirkimo sumą į 2 mokėjimus po <span class="tagline__bold">{splitPayLoanRepayment}</span> be palūkanų kas 15 dienų.',split_pay_only_30:"Atsiskaitydami pasirinkite įmokas ir sumokėkite <b>{price}</b> už pirkinį be palūkanų per 30 dienų.",ineligible_min_over_time:"Jei užsakymų suma viršija {minPrice}, atsiskaitydami pasirinkite įmokas ir padalinkite pirkimo sumą, kad galėtumėte mokėti dalimis."},close:"Uždaryti",new_window:"Atidaroma naujame lange.",partnership:"Įmokos bendradarbiaujant su {affirmLogo}",partnership_disclaimer:"Įmokos bendradarbiaujant su {affirmLogo}. „Affirm“ neteikia vertimo paslaugų. „Affirm“ ir jos pasiūlymai palaikomi tik anglų kalba.",split_pay_contents:{interest_fees:"Jokių paslėptų mokesčių.",interest_credit:"Jokios įtakos jūsų kredito reitingui.",no_interest_fees:"Jokių mokesčių.",no_interest_credit:"Jokios įtakos jūsų kredito reitingui."},sample_plan_contents:{continue_to_checkout:"Atsiskaityti",unavailable:"Negalima",check_eligibility:"Tęsdami sutinkate, kad jūsų informacija būtų perduota „Affirm“. <br/> Tinkamumo patikrinimas neturės įtakos jūsų kreditui. ",apr:"MPN (metinė procentinė norma)",interest:"Palūkanos",total:"Iš viso",processing:"Jūsų užklausa vykdoma",processing_time:"Tai gali užtrukti iki minutės...",split_pay_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> kas 2 savaites</span>',other_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> kas mėnesį</span>',split_pay_number_of_terms:"&nbsp;{numberOfTerms} sav.",other_number_of_terms:"&nbsp;{numberOfTerms} mėn."},prequal_contents:{unavailable:"Negalima",check:"Patikrinkite, ar atitinkate reikalavimus"},legal:{ca_residents_notice:"Kalifornijos gyventojams: „Affirm Loan Services, LLC“ paskolos teikiamos arba organizuojamos pagal Kalifornijos finansų skolintojo licenciją.",rates_from_apr:'Įkainiai nuo 0 iki 36 % MPN. Mokėjimo variantams su „Affirm“ taikomas tinkamumo patikrinimas, jie gali būti prieinami ne visose valstijose ir juos teikia šie skolinimo partneriai: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Variantai priklauso nuo jūsų pirkimo sumos; gali būti reikalaujama pradinio įnašo.',interest_and_split_pay:"Į apskaičiuotą mokėjimo sumą neįtraukti mokesčiai ir siuntimo išlaidos.",split_pay_only:"Į apskaičiuotą mokėjimo sumą neįtraukti mokesčiai ir siuntimo išlaidos. Mokėjimo variantus siūlo „Affirm“, jiems gali būti taikomas tinkamumo patikrinimas ir jie gali būti prieinami ne visose valstijose.",ineligible:"Mokėjimo variantus siūlo „Affirm“, jiems gali būti taikomas tinkamumo patikrinimas ir jie gali būti prieinami ne visose valstijose.",dynamic_pdp:'Į apskaičiuotą mokėjimo sumą neįtraukti mokesčiai ir siuntimo išlaidos. Įkainiai svyruoja nuo 0 iki 36 % MPN. Mokėjimo variantams „Shop Pay“ įmokomis taikomas tinkamumo patikrinimas ir juos teikia šie skolinimo partneriai: <a class="help_text__link" href="https://www.affirm.com/lenders" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Variantai priklauso nuo jūsų pirkimo sumos; gali būti reikalaujama pradinio įnašo. Patvirtinus gali būti pateikta daugiau variantų. Valstijų pranešimai vartotojams: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/licenses</a>.'}};var Aw={affirm:jw,shopPay:Cw,banner:xw,modal:Lw},Tw=Object.freeze({__proto__:null,affirm:jw,banner:xw,default:Aw,modal:Lw,shopPay:Cw});const Ew="Affirm",Iw="Shop Pay",Mw={learn_more:"Ketahui lebih lanjut",view_sample_plans:"Lihat pelan sampel",prequal:"Semak kuasa pembelian anda",split_pay_eligible:"Bayar dalam 4 ansuran tanpa faedah sebanyak {price} dengan {shopPayLogo}",interest_only_eligible:"Pisahkan pembelian anda kepada ansuran bulanan dengan {shopPayLogo}",dynamic_interest_only_eligible:"Daripada <b>{price}</b>/bulan dengan {shopPayLogo}",pay_in_4_or_as_low_as_eligible:"4 ansuran tanpa faedah atau daripada <b>{price}</b>//bulan dengan {shopPayLogo}",zero_interest_eligible:"Daripada <b>{price}</b>/bulan atau 0% APR dengan {shopPayLogo}",zero_interest_eligible_zero_apr:"Daripada <b>{price}</b>/bulan pada 0% APR dengan {shopPayLogo}",non_eligible_min:"Bayar dalam 4 ansuran tanpa faedah untuk pesanan melebihi <b>{minPrice}</b> dengan {shopPayLogo}",non_eligible_monthly_payments_min:"Pisahkan pembelian anda kepada ansuran bulanan untuk pesanan melebihi <b>{minPrice}</b> dengan {shopPayLogo}",non_eligible_max:"Pisahkan pembelian anda kepada ansuran untuk pesanan hingga <b>{maxPrice}</b> dengan {shopPayLogo}",prequal_contents:{not_prequalified_see_plans:"Semak kuasa pembelian anda",prequalified_see_plans:"Lihat pelan",purchasing_power_a:"Kuasa pembelian anda ialah ",purchasing_power_b:"Berbelanja sebarang jumlah hingga "},split_pay_eligible_2:"Bayar dalam 2 ansuran tanpa faedah sebanyak <b>{price}</b> dengan {shopPayLogo}",split_pay_eligible_30:"Bayar <b>{price}</b> dalam tempoh 30 hari tanpa faedah dengan {shopPayLogo}",non_eligible_min_over_time:"Bayar seiring dengan masa untuk pesanan melebihi <b>{minPrice}</b> dengan {shopPayLogo}",non_eligible_min_over_time_30:"Bayar dalam tempoh 30 hari tanpa faedah untuk pesanan melebihi <b>{minPrice}</b> dengan {shopPayLogo}"},Ow={title:"Dapatkan sekarang, bayar kemudian",subtitle:{interest_and_split_pay:'Pilih jadual pembayaran anda semasa daftar keluar &#8211; bermula pada 4 pembayaran tanpa ansuran sebanyak <span class="tagline__bold">{splitPayLoanRepayment}</span> setiap 2 minggu.',interest_only:"Pilih jadual pembayaran anda semasa daftar keluar untuk memisahkan pembelian anda kepada ansuran bulanan.",split_pay_only:'Pilih ansuran semasa daftar keluar untuk memisahkan pembelian anda kepada 4 pembayaran tanpa faedah sebanyak <span class="tagline__bold">{splitPayLoanRepayment}</span> setiap 2 minggu.',ineligible_min:"Untuk pesanan melebihi {minPrice}, pilih ansuran semasa daftar keluar untuk memisahkan pembelian anda kepada 4 pembayaran tanpa faedah.",ineligible_monthly_payments_min:"Untuk pesanan melebihi {minPrice}, pilih ansuran semasa daftar keluar untuk memisahkan pembelian anda kepada pembayaran bulanan.",ineligible_max:"Untuk pesanan melebihi {maxPrice}, pilih ansuran semasa daftar keluar untuk memisahkan pembelian anda kepada berbilang pembayaran.",dynamic_pdp:{one:"Pelan sampel untuk pembelian <b>{priceWithoutInterest}</b>",other:"Pelan sampel untuk pembelian <b>{priceWithoutInterest}</b>"},split_pay_only_2:'Pilih ansuran semasa daftar keluar untuk memisahkan pembelian anda kepada 2 pembayaran tanpa faedah sebanyak <span class="tagline__bold">{splitPayLoanRepayment}</span> setiap 15 minggu.',split_pay_only_30:"Pilih ansuran semasa daftar keluar untuk membayar pembelian tanpa faedah anda sebanyak <b>{price}</b> dalam tempoh 30 hari.",ineligible_min_over_time:"Untuk pesanan melebihi {minPrice}, pilih ansuran semasa daftar keluar untuk memisahkan pembelian anda seiring dengan masa."},close:"Tutup",new_window:"Akan dibuka dalam tetingkap baharu.",partnership:"Ansuran secara kerjasama dengan {affirmLogo}",partnership_disclaimer:"Ansuran secara kerjasama dengan {affirmLogo}. Perkhidmatan terjemahan tidak disediakan oleh Affirm. Affirm dan penawarannya hanya disokong dalam bahasa Inggeris.",split_pay_contents:{interest_fees:"Tiada yuran tersembunyi.",interest_credit:"Permohonan tidak akan memberikan impak kepada skor kredit anda.",no_interest_fees:"Tiada yuran.",no_interest_credit:"Permohonan tidak akan memberikan impak kepada skor kredit anda."},sample_plan_contents:{continue_to_checkout:"Teruskan ke daftar keluar",unavailable:"Tidak tersedia",check_eligibility:"Dengan meneruskan, maklumat anda akan dikongsi dengan Affirm. <br/> Menyemak kelayakan anda tidak akan menjejaskan kredit anda. ",apr:"APR",interest:"Faedah",total:"Jumlah",processing:"Memproses permintaan anda",processing_time:"Ini boleh mengambil masa hingga satu minit...",split_pay_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> setiap 2 minggu</span>',other_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> setiap bulan</span>',split_pay_number_of_terms:"&nbsp;untuk {numberOfTerms} minggu",other_number_of_terms:"&nbsp;untuk {numberOfTerms} bulan"},prequal_contents:{unavailable:"Tidak tersedia",check:"Semak kelayakan anda"},legal:{ca_residents_notice:"Penduduk CA: Pinjaman oleh Affirm Loan Services, LLC dibuat atau diaturkan menurut lesen California Finance Lender.",rates_from_apr:'Kadar daripada 0-36% APR. Pilihan pembayaran melalui Affirm tertakluk pada semakan kelayakan, mungkin tidak tersedia di semua negeri dan disediakan oleh rakan kongsi pinjaman ini: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Pilihan bergantung pada amaun pembayaran anda dan bayaran pendahuluan mungkin diperlukan.',interest_and_split_pay:"Anggaran amaun pembayaran tidak termasuk cukai dan penghantaran.",split_pay_only:"Anggaran amaun pembayaran tidak termasuk cukai dan penghantaran. Pilihan pembayaran ditawarkan oleh Affirm dan tertakluk pada pemeriksaan kelayakan dan mungkin tidak tersedia di semua negeri.",ineligible:"Pilihan pembayaran ditawarkan oleh Affirm dan tertakluk pada pemeriksaan kelayakan dan mungkin tidak tersedia di semua negeri.",dynamic_pdp:'Anggaran amaun pembayaran tidak termasuk cukai dan penghantaran. Kadar adalah daripada 0-36% APR. Pilihan pembayaran melalui Ansuran Shop Pay tertakluk pada semakan kelayakan dan disediakan oleh rakan kongsi pinjaman ini: <a class="help_text__link" href="https://www.affirm.com/lenders" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Pilihan bergantung pada amaun pembayaran anda dan bayaran pendahuluan mungkin diperlukan. Pilihan lain mungkin tersedia selepas kelulusan. Notis negeri kepada pengguna: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/licenses</a>.'}};var Nw={affirm:Ew,shopPay:Iw,banner:Mw,modal:Ow},qw=Object.freeze({__proto__:null,affirm:Ew,banner:Mw,default:Nw,modal:Ow,shopPay:Iw});const Rw="Affirm",Dw="Shop Pay",Bw={learn_more:"Finn ut mer",view_sample_plans:"Vis eksempler på abonnementer",prequal:"Sjekk kjøpekraften din",split_pay_eligible:"Betal i fire rentefrie avdrag på <b>{price}</b> med {shopPayLogo}",interest_only_eligible:"Del kjøpet i månedlige avdrag med {shopPayLogo}",dynamic_interest_only_eligible:"Fra <b>{price}</b> med {shopPayLogo}",pay_in_4_or_as_low_as_eligible:"Fire rentefrie avdrag, eller fra <b>{price}</b>/mnd. med {shopPayLogo}",zero_interest_eligible:"Fra <b>{price}</b>/mnd. eller 0 % årlig rente med {shopPayLogo}",zero_interest_eligible_zero_apr:"Fra <b>{price}</b>/mnd. til 0 % årlig rente med {shopPayLogo}",non_eligible_min:"Betal i fire rentefrie avdrag for bestillinger over <b>{minPrice}</b> med {shopPayLogo}",non_eligible_monthly_payments_min:"Del kjøpet i månedlige avdrag for bestillinger over <b>{minPrice}</b> med {shopPayLogo}",non_eligible_max:"Del kjøpet i avdrag for bestillinger inntil <b>{maxPrice}</b> med {shopPayLogo}",prequal_contents:{not_prequalified_see_plans:"Sjekk kjøpekraften din",prequalified_see_plans:"Se abonnementer",purchasing_power_a:"Kjøpekraften din er ",purchasing_power_b:"Bruk et hvilket som helst beløp inntil "},split_pay_eligible_2:"Betal i to rentefrie avdrag på <b>{price}</b> med {shopPayLogo}",split_pay_eligible_30:"Betal <b>{price}</b> rentefritt innen 30 dager med {shopPayLogo}",non_eligible_min_over_time:"Betal over tid for bestillinger over <b>{minPrice}</b> med {shopPayLogo}",non_eligible_min_over_time_30:"Betal rentefritt innen 30 dager for bestillinger over 2<b>{minPrice}</b> med {shopPayLogo}"},Fw={title:"Få det nå, betal senere",subtitle:{interest_and_split_pay:'Velg betalingsplan i kassen &#8211; fra fire rentefrie avdrag på <span class="tagline__bold">{splitPayLoanRepayment}</span> hver andre uke.',interest_only:"Velg betalingsplan i kassen for å dele kjøpet i månedlige avdrag.",split_pay_only:'Velg avdrag i kassen for å dele kjøpet i fire rentefrie betalinger på <span class="tagline__bold">{splitPayLoanRepayment}</span> hver andre uke.',ineligible_min:"For bestillinger over {minPrice}, kan du velge avdrag i kassen for å dele kjøpet i fire rentefrie betalinger.",ineligible_monthly_payments_min:"For bestillinger over {minPrice}, kan du velge avdrag i kassen for å dele kjøpet i månedlige betalinger.",ineligible_max:"For bestillinger inntil {maxPrice}, kan du velge avdrag i kassen for å dele kjøpet i flere betalinger.",dynamic_pdp:{one:"Eksempelplan for et kjøp på <b>{priceWithoutInterest}</b>",other:"Eksempelplaner for et kjøp på <b>{priceWithoutInterest}</b>"},split_pay_only_2:'Velg avdrag i kassen for å dele kjøpet i to rentefrie betalinger på <span class="tagline__bold">{splitPayLoanRepayment}</span> hver 15. dag.',split_pay_only_30:"Velg avdrag i kassen for å betale for kjøpet på <b>{price}</b> rentefritt innen 30 dager.",ineligible_min_over_time:"For bestillinger over {minPrice}, kan du velge avdrag i kassen for å dele opp kjøpet over tid."},close:"Lukk",new_window:"Åpnes i et nytt vindu.",partnership:"Avdrag i samarbeid med {affirmLogo}",partnership_disclaimer:"Avdrag i samarbeid med {affirmLogo}. Oversettelsestjenester leveres ikke av Affirm. Affirm og deres tilbud støttes bare på engelsk.",split_pay_contents:{interest_fees:"Ingen skjulte avgifter, noensinne.",interest_credit:"Søknader påvirker ikke kredittrapporten din.",no_interest_fees:"Ingen avgifter, noensinne.",no_interest_credit:"Søknader påvirker ikke kredittrapporten din."},sample_plan_contents:{continue_to_checkout:"Fortsett til kassen",unavailable:"Utilgjengelig",check_eligibility:"Hvis du fortsetter, deles opplysningene dine med Affirm. <br /> Kredittvurderingen din påvirkes ikke når du sjekker om du er kvalifisert. ",apr:"Årlig rente",interest:"Rente",total:"Total",processing:"Behandler forespørselen din",processing_time:"Dette kan ta et øyeblikk …",split_pay_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> hver andre uke</span>',other_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> hver måned</span>',split_pay_number_of_terms:"&nbsp;i {numberOfTerms} uker",other_number_of_terms:"&nbsp;i {numberOfTerms} måneder"},prequal_contents:{unavailable:"Utilgjengelig",check:"Se om du kvalifiserer"},legal:{ca_residents_notice:"Innbyggere i California: Lån fra Affirm Loan Services, LLC utbetales eller avtales underlagt en California Finance Lender-lisens.",rates_from_apr:'Satser fra 0–36 % årlig rente. Betalingsalternativer gjennom Affirm er underlagt kvalifikasjonskrav, er ikke nødvendigvis tilgjengelig i alle stater, og leveres av disse lånepartnerne: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Alternativene avhenger av kjøpsbeløpet, og det kan være nødvendig med en avdragsbetaling.',interest_and_split_pay:"Beregnet betalingsbeløp ekskluderer avgifter og frakt.",split_pay_only:"Beregnet betalingsbeløp ekskluderer avgifter og frakt. Betalingsalternativene tilbys av Affirm, er underlagt kvalifikasjonskrav og er ikke nødvendigvis tilgjengelig i alle stater.",ineligible:"Betalingsalternativene tilbys av Affirm, er underlagt kvalifikasjonskrav og er ikke nødvendigvis tilgjengelig i alle stater.",dynamic_pdp:'Beregnet betalingsbeløp ekskluderer avgifter og frakt. Prisene varierer fra 0–36 % årlig rente. Betalingsalternativer gjennom Shop Pay Avdrag er underlagt kvalifikasjonskrav og leveres av disse lånepartnerne: <a class="help_text__link" href="https://www.affirm.com/lenders" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Alternativene avhenger av kjøpsbeløpet, og det kan være nødvendig med en avdragsbetaling. Flere alternativer blir kanskje tilgjengelig ved godkjenning. Statlige varsler til forbrukere: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/licenses</a>.'}};var Vw={affirm:Rw,shopPay:Dw,banner:Bw,modal:Fw},$w=Object.freeze({__proto__:null,affirm:Rw,banner:Bw,default:Vw,modal:Fw,shopPay:Dw});const Ww="Affirm",Uw="Shop Pay",Hw={learn_more:"Meer informatie",view_sample_plans:"Voorbeeldplannen bekijken",prequal:"Controleer je koopkracht",split_pay_eligible:"Betaal in vier renteloze termijnbetalingen van <b>{price}</b> met {shopPayLogo}",interest_only_eligible:"Splits je aankoop in maandelijkse termijnbetalingen op met {shopPayLogo}",dynamic_interest_only_eligible:"Vanaf <b>{price}</b> per maand met {shopPayLogo}",pay_in_4_or_as_low_as_eligible:"Vier renteloze termijnbetalingen, of vanaf <b>{price}</b> per maand met {shopPayLogo}",zero_interest_eligible:"Vanaf <b>{price}</b> per maand of 0% op jaarbasis met {shopPayLogo}",zero_interest_eligible_zero_apr:"Vanaf <b>{price}</b> per maand of 0% rente op jaarbasis met {shopPayLogo}",non_eligible_min:"Betaal in vier renteloze termijnen voor bestellingen van meer dan <b>{minPrice}</b> met {shopPayLogo}",non_eligible_monthly_payments_min:"Splits je aankoop in maandelijkse termijnbetalingen op bij bestellingen van meer dan <b>{minPrice}</b> met {shopPayLogo}",non_eligible_max:"Splits je aankoop op in termijnen voor bestellingen tot maximaal <b>{maxPrice}</b> met {shopPayLogo}",prequal_contents:{not_prequalified_see_plans:"Bekijk je koopkracht",prequalified_see_plans:"Zie abonnementen",purchasing_power_a:"Je koopkracht is  ",purchasing_power_b:"Je kunt elk gewenst bedrag uitgeven tot  "},split_pay_eligible_2:"Betaal in twee renteloze termijnbetalingen van <b>{price}</b> met {shopPayLogo}",split_pay_eligible_30:"Betaal binnen 30 dagen renteloos <b>{price}</b> met {shopPayLogo}.",non_eligible_min_over_time:"Betaal in termijnen voor bestellingen van meer dan <b>{minPrice}</b> met {shopPayLogo}",non_eligible_min_over_time_30:"Betaal binnen 30 dagen renteloos voor bestellingen van meer dan <b>{minPrice}</b> met {shopPayLogo}."},Kw={title:"Koop nu, betaal later",subtitle:{interest_and_split_pay:'Kies je betaalschema bij de checkout &#8211; vanaf vier tweewekelijkse renteloze betalingen van <span class="tagline__bold">{splitPayLoanRepayment}</span>.',interest_only:"Kies je betaalschema bij de checkout en splits je aankoop op in maandelijkse termijnen.",split_pay_only:'Selecteer termijnbetalingen bij de checkout om je aankoop in vier tweewekelijkse renteloze betalingen van <span class="tagline__bold">{splitPayLoanRepayment}</span> op te splitsen.',ineligible_min:"Selecteer termijnbetalingen bij de checkout voor bestellingen van meer dan {minPrice} en splits je aankoop op in vier renteloze termijnen.",ineligible_monthly_payments_min:"Selecteer termijnbetalingen bij de checkout voor bestellingen van meer dan {minPrice} en splits je aankoop op in maandelijkse termijnen.",ineligible_max:"Selecteer termijnbetalingen bij de checkout voor bestellingen tot maximaal {maxPrice} en splits je aankoop op in meerdere termijnen.",dynamic_pdp:{one:"Voorbeeldplan voor een aankoop van <b>{priceWithoutInterest}</b>",other:"Voorbeeldplannen voor een aankoop van <b>{priceWithoutInterest}</b>"},split_pay_only_2:'Selecteer termijnbetalingen bij de checkout om je aankoop in twee tweewekelijkse renteloze betalingen van <span class="tagline__bold">{splitPayLoanRepayment}</span> op te splitsen.',split_pay_only_30:"Selecteer termijnbetalingen bij de checkout om je aankoop van <b>{price}</b> binnen 30 dagen in renteloze termijnen te betalen.",ineligible_min_over_time:"Selecteer termijnbetalingen bij de checkout voor bestellingen van meer dan {minPrice} en splits je aankoop op in termijnen."},close:"Sluiten",new_window:"Wordt geopend in een nieuw venster.",partnership:"Termijnbetalingen in samenwerking met {affirmLogo}",partnership_disclaimer:"Termijnbetalingen in samenwerking met {affirmLogo}. Affirm biedt geen vertaaldiensten. Affirm en zijn aanbod wordt uitsluitend in het Engels ondersteund.",split_pay_contents:{interest_fees:"Geen verborgen kosten, ooit.",interest_credit:"Je aanvraag heeft geen gevolgen voor je kredietscore.",no_interest_fees:"Geen extra kosten, ooit.",no_interest_credit:"Je aanvraag heeft geen impact op je kredietscore."},sample_plan_contents:{continue_to_checkout:"Doorgaan naar checkout",unavailable:"Niet beschikbaar",check_eligibility:"Als je doorgaat, worden je gegevens gedeeld met Affirm. <br/> Voor je krediet maakt het niets uit of je bekijkt of je gekwalificeerd bent. ",apr:"Jaarlijks percentage",interest:"Rente",total:"Totaal",processing:"Je aanvraag wordt verwerkt",processing_time:"Dit kan ongeveer een minuut duren...",split_pay_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> elke 2 weken</span>',other_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> elke maand</span>',split_pay_number_of_terms:"&nbsp;gedurende {numberOfTerms} weken",other_number_of_terms:"&nbsp;gedurende {numberOfTerms} maanden"},prequal_contents:{unavailable:"Niet beschikbaar",check:"Bekijk of je in aanmerking komt"},legal:{ca_residents_notice:"Inwoners van Californië: leningen van Affirm Loan Services, LLC worden uitgevoerd of geregeld volgens een California Finance Lender-licentie.",rates_from_apr:'Tarieven van 0-36% rente op jaarbasis. Er gelden voorwaarden om in aanmerking te komen voor betaalopties via Affirm. Ze zijn mogelijk niet in alle staten beschikbaar en worden aangeboden door deze kredietverleningspartners: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Welke opties mogelijk zijn, is afhankelijk van het aankoopbedrag. Een aanbetaling kan vereist zijn.',interest_and_split_pay:"Het geschatte betalingsbedrag is exclusief belastingen en verzendkosten.",split_pay_only:"Het geschatte betalingsbedrag is exclusief belastingen en verzendkosten. Betaalopties worden door Affirm aangeboden. Er kan worden gecontroleerd of ze in aanmerking komen en ze zijn mogelijk niet in alle staten beschikbaar.",ineligible:"Betaalopties worden door Affirm aangeboden. Er kan worden gecontroleerd of ze in aanmerking komen en ze zijn mogelijk niet in alle staten beschikbaar.",dynamic_pdp:'Het geschatte betalingsbedrag is exclusief belastingen en verzendkosten. Tarieven variëren van 0-36% op jaarbasis. Betaalopties via Shop Pay-termijnbetalingen zijn onderworpen aan geschiktheidscontroles en worden aangeboden door deze kredietverleningspartners: <a class="help_text__link" href="https://www.affirm.com/lenders" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Welke opties mogelijk zijn, is afhankelijk van het aankoopbedrag. Een aanbetaling kan vereist zijn. Er kunnen meer opties beschikbaar zijn na goedkeuring. Kennisgevingen van de staat aan consumenten: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/licenses</a>.'}};var Zw={affirm:Ww,shopPay:Uw,banner:Hw,modal:Kw},Gw=Object.freeze({__proto__:null,affirm:Ww,banner:Hw,default:Zw,modal:Kw,shopPay:Uw});const Jw="Affirm",Yw="Shop Pay",Qw={learn_more:"Dowiedz się więcej",view_sample_plans:"Wyświetl przykładowe plany",prequal:"Sprawdź swoją siłę nabywczą",split_pay_eligible:"Płatność w 4 ratach bez odsetek po <b>{price}</b> za pomocą {shopPayLogo}",interest_only_eligible:"Podziel kwotę zakupu na miesięczne raty za pomocą {shopPayLogo}",dynamic_interest_only_eligible:"Od <b>{price}</b>/mies. za pomocą {shopPayLogo}",pay_in_4_or_as_low_as_eligible:"4 raty bez odsetek lub od <b>{price}</b>/mies. za pomocą {shopPayLogo}",zero_interest_eligible:"Od <b>{price}</b>/mies. lub 0% RRSO poprzez {shopPayLogo}",zero_interest_eligible_zero_apr:"Od <b>{price}</b>/mies. z 0% RRSO poprzez {shopPayLogo}",non_eligible_min:"Płatność w 4 ratach bez odsetek dla zamówień powyżej <b>{minPrice}</b> za pomocą {shopPayLogo}",non_eligible_monthly_payments_min:"Podziel kwotę zakupu na miesięczne raty dla zamówień powyżej <b>{minPrice}</b> za pomocą {shopPayLogo}",non_eligible_max:"Podziel kwotę zakupu na raty dla zamówień powyżej <b>{maxPrice}</b> za pomocą {shopPayLogo}",prequal_contents:{not_prequalified_see_plans:"Sprawdź swoją siłę nabywczą",prequalified_see_plans:"Zobacz plany",purchasing_power_a:"Twoja siła nabywcza to ",purchasing_power_b:"Wydaj kwotę do "},split_pay_eligible_2:"Zapłać w 2 ratach bez odsetek po <b>{price}</b> za pomocą {shopPayLogo}",split_pay_eligible_30:"Zapłać <b>{price}</b> w ciągu 30 dni za pomocą {shopPayLogo}",non_eligible_min_over_time:"Płać w ratach za zamówienia powyżej <b>{minPrice}</b> za pomocą {shopPayLogo}",non_eligible_min_over_time_30:"Płatność w ciągu 30 dni bez odsetek dla zamówień powyżej <b>{minPrice}</b> za pomocą {shopPayLogo}"},Xw={title:"Odbierz teraz, zapłać później",subtitle:{interest_and_split_pay:'Wybierz harmonogram płatności przy kasie &#8211; od 4 nieoprocentowanych płatności w wysokości <span class="tagline__bold">{splitPayLoanRepayment}</span> co 2 tygodnie.',interest_only:"Wybierz harmonogram płatności przy kasie, aby podzielić zakup na miesięczne raty.",split_pay_only:'Wybierz raty przy kasie, aby spłacać zakup w 4 nieoprocentowanych ratach w wysokości <span class="tagline__bold">{splitPayLoanRepayment}</span> co 2 tygodnie.',ineligible_min:"Dla zamówień powyżej {minPrice} wybierz raty przy kasie, aby podzielić zakup na 4 nieoprocentowane raty.",ineligible_monthly_payments_min:"Dla zamówień powyżej {minPrice} wybierz raty przy kasie, aby podzielić zakup na płatności miesięczne.",ineligible_max:"Dla zamówień powyżej {maxPrice} wybierz raty przy kasie, aby podzielić zakup na więcej płatności.",dynamic_pdp:{one:"Przykładowy plan dla zakupu <b>{priceWithoutInterest}</b>",other:"Przykładowe plany dla zakupu <b>{priceWithoutInterest}</b>",few:"Przykładowe plany dla zakupu <b>{priceWithoutInterest}</b>",many:"Przykładowe plany dla zakupu <b>{priceWithoutInterest}</b>"},split_pay_only_2:'Wybierz raty przy kasie, aby spłacić zakup w 2 nieoprocentowanych ratach w wysokości <span class="tagline__bold">{splitPayLoanRepayment}</span> w odstępie 15 dni.',split_pay_only_30:"Wybierz raty przy kasie, aby spłacić zakup w wysokości <b>{price}</b> w nieoprocentowanych ratach co 30 dni.",ineligible_min_over_time:"Dla zamówień powyżej {minPrice} wybierz raty przy kasie, aby podzielić zakup na kilka płatności rozłożonych w czasie."},close:"Zamknij",new_window:"Otwiera się w nowym oknie.",partnership:"Raty we współpracy z {affirmLogo}",partnership_disclaimer:"Raty we współpracy z {affirmLogo}. Affirm nie świadczy usług tłumaczeniowych. Affirm i jego oferty są obsługiwane wyłącznie w języku angielskim.",split_pay_contents:{interest_fees:"Brak ukrytych opłat.",interest_credit:"Brak wpływu na Twoją ocenę kredytową.",no_interest_fees:"Bez opłat, bez względu na okoliczności.",no_interest_credit:"Brak wpływu na Twoją ocenę kredytową."},sample_plan_contents:{continue_to_checkout:"Kontynuuj, aby zrealizować zakup",unavailable:"Niedostępne",check_eligibility:"Jeśli zdecydujesz się kontynuować, Twoje dane zostaną udostępnione Affirm. Sprawdzenie kwalifikacji nie wpłynie na kredyt. ",apr:"RRSO",interest:"Odsetki",total:"Suma",processing:"Przetwarzanie żądania",processing_time:"Może to potrwać do minuty...",split_pay_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> co 2 tygodnie</span>',other_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> co miesiąc</span>',split_pay_number_of_terms:"&nbsp;przez {numberOfTerms} tyg.",other_number_of_terms:"&nbsp;przez {numberOfTerms} mies."},prequal_contents:{unavailable:"Niedostępne",check:"Sprawdź, czy się kwalifikujesz"},legal:{ca_residents_notice:"Mieszkańcy CA: Pożyczki udzielane przez Affirm Loan Services, LLC są dokonywane lub uzgadniane na podstawie licencji California Finance Lender.",rates_from_apr:'RRSO od 0% do 36%. Opcje płatności w ramach Affirm podlegają kontroli kwalifikowalności, mogą nie być dostępne we wszystkich krajach i są oferowane przez następujących partnerów kredytowych: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Opcje zależą od kwoty zakupu. Może być wymagana płatność zaliczkowa.',interest_and_split_pay:"Szacowana kwota płatności nie obejmuje podatków i kosztów wysyłki.",split_pay_only:"Szacowana kwota płatności nie obejmuje podatków i kosztów wysyłki. Opcje płatności są oferowane przez Affirm. Podlegają one kontroli kwalifikowalności i mogą nie być dostępne we wszystkich stanach.",ineligible:"Opcje płatności są oferowane przez Affirm. Podlegają one kontroli kwalifikowalności i mogą nie być dostępne we wszystkich stanach.",dynamic_pdp:'Szacowana kwota płatności nie obejmuje podatków i kosztów wysyłki. RRSO waha się między 0% a 36%. Opcje płatności w ramach Rat Shop Pay podlegają kontroli kwalifikowalności i są oferowane przez następujących partnerów kredytowych: <a class="help_text__link" href="https://www.affirm.com/lenders" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Opcje zależą od kwoty zakupu. Może być wymagana płatność zaliczkowa. Więcej opcji może być dostępnych po zatwierdzeniu. Informacje dla konsumentów w różnych stanach: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/licenses</a>.'}};var eP={affirm:Jw,shopPay:Yw,banner:Qw,modal:Xw},tP=Object.freeze({__proto__:null,affirm:Jw,banner:Qw,default:eP,modal:Xw,shopPay:Yw});const nP="Affirm",iP="Shop Pay",aP={learn_more:"Saiba mais",view_sample_plans:"Ver exemplos de planos",prequal:"Verifique seu poder de compra",split_pay_eligible:"Pague em quatro parcelas sem juros de <b>{price}</b> com o {shopPayLogo}",interest_only_eligible:"Divida a compra em parcelas mensais com o {shopPayLogo}",dynamic_interest_only_eligible:"De <b>{price}</b>/mês com o {shopPayLogo}",pay_in_4_or_as_low_as_eligible:"Quatro parcelas sem juros ou <b>{price}</b>/mês com o {shopPayLogo}",zero_interest_eligible:"De <b>{price}</b>/mês ou taxa percentual anual de 0% com o {shopPayLogo}",zero_interest_eligible_zero_apr:"De <b>{price}</b>/mês a uma taxa percentual anual de 0% com o {shopPayLogo}",non_eligible_min:"Pague pedidos acima de <b>{minPrice}</b> em quatro parcelas sem juros com o {shopPayLogo}",non_eligible_monthly_payments_min:"Divida a compra em parcelas mensais nos pedidos acima de <b>{minPrice}</b> com o {shopPayLogo}",non_eligible_max:"Parcele a compra em pedidos acima de <b>{maxPrice}</b> com o {shopPayLogo}",prequal_contents:{not_prequalified_see_plans:"Verifique seu poder de compra",prequalified_see_plans:"Ver os planos",purchasing_power_a:"Seu poder de compra é ",purchasing_power_b:"Gaste qualquer quantia até "},split_pay_eligible_2:"Pague em duas parcelas sem juros de <b>{price}</b> com o {shopPayLogo}",split_pay_eligible_30:"Pague <b>{price}</b> em até 30 dias sem juros com o {shopPayLogo}",non_eligible_min_over_time:"Parcele pedidos acima de <b>{minPrice}</b> com o {shopPayLogo}",non_eligible_min_over_time_30:"Pague pedidos acima de <b>{minPrice}</b> em até 30 dias sem juros com o {shopPayLogo}"},oP={title:"Compre agora, pague depois",subtitle:{interest_and_split_pay:'Escolha o cronograma de pagamento no checkout, começando com quatro pagamentos sem juros de <span class="tagline__bold">{splitPayLoanRepayment}</span> a cada duas semanas.',interest_only:"Escolha o cronograma de pagamento no checkout para dividir a compra em parcelas mensais.",split_pay_only:'Selecione as parcelas no checkout para dividir a compra em quatro pagamentos sem juros de <span class="tagline__bold">{splitPayLoanRepayment}</span> a cada duas semanas.',ineligible_min:"Para pedidos acima de {minPrice}, selecione as parcelas no checkout para dividir a compra em quatro pagamentos sem juros.",ineligible_monthly_payments_min:"Para pedidos acima de {minPrice}, selecione as parcelas no checkout para dividir a compra em pagamentos mensais.",ineligible_max:"Para pedidos acima de {maxPrice}, selecione as parcelas no checkout para dividir a compra em vários pagamentos.",dynamic_pdp:{one:"Exemplo de plano para uma compra de <b>{priceWithoutInterest}</b>",other:"Exemplos de planos para uma compra de <b>{priceWithoutInterest}</b>",many:"Exemplos de planos para uma compra de <b>{priceWithoutInterest}</b>"},split_pay_only_2:'Selecione as parcelas no checkout para dividir a compra em dois pagamentos sem juros de <span class="tagline__bold">{splitPayLoanRepayment}</span> a cada 15 dias.',split_pay_only_30:"Selecione as parcelas no checkout para pagar a compra de <b>{price}</b> sem juros em até 30 dias.",ineligible_min_over_time:"Para pedidos acima de {minPrice}, selecione as parcelas no checkout para dividir a compra."},close:"Fechar",new_window:"Abrirá numa nova janela.",partnership:"Parcelamento em parceria com {affirmLogo}",partnership_disclaimer:"Parcelamento em parceria com a {affirmLogo}. A empresa não fornece serviços de tradução. A Affirm e suas ofertas estão disponíveis somente em inglês.",split_pay_contents:{interest_fees:"Sem taxas ocultas.",interest_credit:"Sem impacto em seu score de crédito.",no_interest_fees:"Sem taxas.",no_interest_credit:"Sem impacto sobre seu score de crédito."},sample_plan_contents:{continue_to_checkout:"Seguir para o checkout",unavailable:"Indisponível",check_eligibility:"Ao continuar, suas informações serão compartilhadas com a Affirm. <br/> A verificação de qualificação não afeta seu crédito. ",apr:"Taxa percentual anual",interest:"Juros",total:"Total",processing:"Estamos processando a solicitação",processing_time:"Esse processo pode levar até um minuto…",split_pay_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> a cada duas semanas </span>',other_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> todo mês</span>',split_pay_number_of_terms:"&nbsp;por {numberOfTerms} semanas",other_number_of_terms:"&nbsp;por {numberOfTerms} meses"},prequal_contents:{unavailable:"Indisponível",check:"Verifique se você se qualifica"},legal:{ca_residents_notice:"Residentes da Califórnia: os empréstimos pela Affirm Loan Services, LLC são realizados ou concedidos de acordo com uma autorização da Lei de Financiamento da Califórnia.",rates_from_apr:'Taxas percentuais anuais de 0% a 36%. As opções de pagamento da Affirm estão sujeitas a uma verificação de qualificação, podem não estar disponíveis em todos os estados e são oferecidas por estes Parceiros de empréstimo: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Vale lembrar que as opções dependem do valor da compra, e pode ser necessário um adiantamento do pagamento.',interest_and_split_pay:"A estimativa de valor do pagamento exclui tributos e frete.",split_pay_only:"A estimativa de valor do pagamento exclui tributos e frete. As opções de pagamento são oferecidas pela Affirm, estão sujeitas à verificação da qualificação e podem não estar disponíveis em todos os estados.",ineligible:"As opções de pagamento são oferecidas pela Affirm, estão sujeitas à verificação da qualificação e podem não estar disponíveis em todos os estados.",dynamic_pdp:'A estimativa de valor do pagamento exclui tributos e frete. As taxas percentuais anuais variam entre 0% e 36%. As opções de pagamento do Parcelamento do Shop Pay estão sujeitas a uma verificação de qualificação e são oferecidas por estes Parceiros de empréstimo: <a class="help_text__link" href="https://www.affirm.com/lenders" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Vale lembrar que as opções dependem do valor da compra, e pode ser necessário um adiantamento do pagamento. Além disso, outras opções podem ser disponibilizadas após a aprovação. Avisos para consumidores por estado dos EUA: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/licenses</a>.'}};var sP={affirm:nP,shopPay:iP,banner:aP,modal:oP},rP=Object.freeze({__proto__:null,affirm:nP,banner:aP,default:sP,modal:oP,shopPay:iP});const lP="Affirm",cP="Shop Pay",pP={learn_more:"Saber mais",view_sample_plans:"Ver exemplos de planos",prequal:"Descubra o seu poder de compra",split_pay_eligible:"Pague em 4 prestações sem juros de <b>{price}</b> com {shopPayLogo}",interest_only_eligible:"Divida a sua compra em prestações mensais com {shopPayLogo}",dynamic_interest_only_eligible:"A partir de <b>{price}</b>/mês com {shopPayLogo}",pay_in_4_or_as_low_as_eligible:"4 prestações sem juros ou a partir de <b>{price}</b>/mês com {shopPayLogo}",zero_interest_eligible:"A partir de <b>{price}</b>/mês ou taxa percentual anual de 0% com {shopPayLogo}",zero_interest_eligible_zero_apr:"A partir de <b>{price}</b>/mês à taxa percentual anual de 0% com {shopPayLogo}",non_eligible_min:"Pague em 4 prestações sem juros em encomendas de valor superior a <b>{minPrice}</b> com {shopPayLogo}",non_eligible_monthly_payments_min:"Divida a sua compra em prestações mensais em encomendas de valor superior a <b>{minPrice}</b> com {shopPayLogo}",non_eligible_max:"Divida a sua compra em prestações em encomendas até <b>{maxPrice}</b> com {shopPayLogo}",prequal_contents:{not_prequalified_see_plans:"Verifique o seu poder de compra",prequalified_see_plans:"Ver os planos",purchasing_power_a:"O seu poder de compra é ",purchasing_power_b:"Gaste qualquer montante até "},split_pay_eligible_2:"Pague em 2 prestações sem juros de <b>{price}</b> com o {shopPayLogo}",split_pay_eligible_30:"Pague <b>{price}</b> em até 30 dias sem juros com o {shopPayLogo}",non_eligible_min_over_time:"Pague ao longo do tempo em encomendas acima de <b>{minPrice}</b> com o {shopPayLogo}",non_eligible_min_over_time_30:"Pague em 30 dias sem juros em encomendas de valor superior a <b>{minPrice}</b> com {shopPayLogo}"},dP={title:"Compre agora, pague mais tarde",subtitle:{interest_and_split_pay:'Selecione a sua agenda de pagamento na finalização da compra &#8211; a partir de 4 pagamentos sem juros de <span class="tagline__bold">{splitPayLoanRepayment}</span> a cada 2 semanas.',interest_only:"Selecione a sua agenda de pagamento na finalização da compra para dividir a sua compra em prestações mensais.",split_pay_only:'Selecione prestações na finalização da compra para dividir a sua compra em 4 pagamentos sem juros de <span class="tagline__bold">{splitPayLoanRepayment}</span> a cada 2 semanas.',ineligible_min:"Para encomendas acima de {minPrice}, selecione prestações na finalização da compra para dividir a sua compra em 4 pagamentos sem juros.",ineligible_monthly_payments_min:"Para encomendas acima de {minPrice}, selecione prestações na finalização da compra para dividir a sua compra em prestações mensais.",ineligible_max:"Para encomendas até {maxPrice}, selecione prestações na finalização da compra para dividir a sua compra em múltiplos pagamentos.",dynamic_pdp:{one:"Exemplo de plano para uma compra <b>{priceWithoutInterest}</b>",other:"Exemplos de planos para uma compra <b>{priceWithoutInterest}</b>",many:"Exemplos de planos para uma compra <b>{priceWithoutInterest}</b>"},split_pay_only_2:'Selecione as prestações na finalização da compra para dividir a compra em 2 pagamentos sem juros de <span class="tagline__bold">{splitPayLoanRepayment}</span> a cada 15 dias.',split_pay_only_30:"Selecione prestações na finalização da compra para pagar a sua compra de <b>{price}</b> sem juros dentro de 30 dias.",ineligible_min_over_time:"Para encomendas acima de {minPrice}, selecione as prestações na finalização da compra para pagar a compra ao longo do tempo."},close:"Encerrar",new_window:"Abrirá numa nova janela.",partnership:"Prestações em parceria com {affirmLogo}",partnership_disclaimer:"Prestações em parceria com {affirmLogo}. A Affirm não fornece serviços de tradução. A Affirm e as suas ofertas são suportados apenas em inglês.",split_pay_contents:{interest_fees:"Sem quaisquer tarifas ocultas.",interest_credit:"Sem impacto no seu perfil de crédito.",no_interest_fees:"Sem quaisquer tarifas.",no_interest_credit:"Sem impacto no seu perfil de crédito."},sample_plan_contents:{continue_to_checkout:"Continuar para a finalização da compra",unavailable:"Indisponível",check_eligibility:"Ao continuar, as suas informações serão partilhadas com a Affirm. <br/> Verificar a sua qualificação não afetará o seu crédito. ",apr:"APR",interest:"Juros",total:"Total",processing:"A processar o seu pedido",processing_time:"Esta ação pode demorar até um minuto...",split_pay_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> de 2 em 2 semanas</span>',other_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> todos os meses</span>',split_pay_number_of_terms:"&nbsp;durante {numberOfTerms} semanas",other_number_of_terms:"&nbsp;durante {numberOfTerms} meses"},prequal_contents:{unavailable:"Indisponível",check:"Verifique se é elegível"},legal:{ca_residents_notice:"Residentes da Califórnia: os empréstimos através da Affirm Loan Services, LLC são efetuados ou providenciados em conformidade com uma licença de Fornecedor de financiamento da Califórnia.",rates_from_apr:'Taxas de 0-36% (taxa percentual anual). As opções de apagamento através da Affirm estão sujeitas a uma verificação de elegibilidade, podem não estar disponíveis em todos os estados e são disponibilizadas pelos seguintes parceiros de empréstimo: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. As opções dependem do valor da compra e pode ser necessária uma amortização do pagamento.',interest_and_split_pay:"O montante de pagamento estimado exclui impostos e envio.",split_pay_only:"O montante de pagamento estimado exclui impostos e envio. As opções de pagamento são oferecidas pela Affirm, estão sujeitas a uma verificação de elegibilidade e podem não estar disponíveis em todos os estados.",ineligible:"As opções de pagamento são oferecidas pela Affirm, estão sujeitas a uma verificação de elegibilidade e podem não estar disponíveis em todos os estados.",dynamic_pdp:'O montante de pagamento estimado exclui impostos e envio. As taxas vão de 0 a 36% da taxa percentual anual. As opções de pagamento das Prestações do Shop Pay estão sujeitas a uma verificação de elegibilidade e são disponibilizadas pelos seguintes parceiros de empréstimo: <a class="help_text__link" href="https://www.affirm.com/lenders" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. As opções dependem do valor da compra e pode ser necessária uma amortização do pagamento. Podem estar disponíveis mais opções mediante aprovação. Avisos de estado para os consumidores: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/licenses</a>.'}};var uP={affirm:lP,shopPay:cP,banner:pP,modal:dP},mP=Object.freeze({__proto__:null,affirm:lP,banner:pP,default:uP,modal:dP,shopPay:cP});const hP="Affirm",_P="Shop Pay",gP={learn_more:"Află mai multe",view_sample_plans:"Vezi exemple de planuri",prequal:"Află care este puterea ta de cumpărare",split_pay_eligible:"Plătește în 4 rate fără dobândă, în valoare de <b>{price}</b>, cu {shopPayLogo}",interest_only_eligible:"Împarte achiziția în rate lunare cu {shopPayLogo}",dynamic_interest_only_eligible:"Începând cu <b>{price}</b>/lună cu {shopPayLogo}",pay_in_4_or_as_low_as_eligible:"4 rate fără dobândă sau începând cu <b>{price}</b>/lună cu {shopPayLogo}",zero_interest_eligible:"Începând cu <b>{price}</b>/lună sau 0% APR cu {shopPayLogo}",zero_interest_eligible_zero_apr:"Începând cu <b>{price}</b>/lună la 0% APR cu {shopPayLogo}",non_eligible_min:"Plătește în 4 rate fără dobândă pentru comenzile mai mari de <b>{minPrice}</b>, cu {shopPayLogo}",non_eligible_monthly_payments_min:"Împarte achiziția în rate lunare pentru comenzile mai mari de <b>{minPrice}</b> with {shopPayLogo}",non_eligible_max:"Împarte achiziția în rate pentru comenzile de până la <b>{maxPrice}</b>, cu {shopPayLogo}",prequal_contents:{not_prequalified_see_plans:"Află care este puterea ta de cumpărare",prequalified_see_plans:"Vezi planurile",purchasing_power_a:"Puterea ta de cumpărare este ",purchasing_power_b:"Cheltuiește orice sumă, până la "},split_pay_eligible_2:"Plătește în 2 rate fără dobândă, în valoare de <b>{price}</b>, cu {shopPayLogo}",split_pay_eligible_30:"Plătește <b>{price}</b> în cel mult 30 de zile fără dobândă, cu {shopPayLogo}",non_eligible_min_over_time:"Plătește în rate pentru comenzile de peste <b>{minPrice}</b>, cu {shopPayLogo}",non_eligible_min_over_time_30:"Plătește în cel mult 30 de zile fără dobândă pentru comenzile mai mari de <b>{minPrice}</b>, cu {shopPayLogo}"},fP={title:"Obține acum, plătește mai târziu",subtitle:{interest_and_split_pay:'Alege programul de plată la finalizarea comenzii &#8211; începând cu 4 rate fără dobândă, în valoare de <span class="tagline__bold">{splitPayLoanRepayment}</span>, la fiecare 2 săptămâni.',interest_only:"Alege programul de plată la finalizarea comenzii pentru a împărți achiziția în rate lunare.",split_pay_only:'Selectează plata în rate la finalizarea comenzii pentru a împărți achiziția în 4 plăți fără dobândă, în valoare de <span class="tagline__bold">{splitPayLoanRepayment}</span> la fiecare 2 săptămâni.',ineligible_min:"Pentru comenzi mai mari de {minPrice}, selectează opțiunea de plată rate la finalizarea comenzii pentru a împărți achiziția în 4 plăți fără dobândă.",ineligible_monthly_payments_min:"Pentru comenzi mai mari de {minPrice}, selectează opțiunea de plată rate la finalizarea comenzii pentru a împărți achiziția în plăți lunare.",ineligible_max:"Pentru comenzi de până la {maxPrice}, selectează opțiunea de plată rate la finalizarea comenzii pentru a împărți achiziția în mai multe plăți.",dynamic_pdp:{one:"Exemplu de plan pentru o achiziție <b>{priceWithoutInterest}</b>",other:"Exemple de planuri pentru o achiziție <b>{priceWithoutInterest}</b>",few:"Exemple de planuri pentru o achiziție <b>{priceWithoutInterest}</b>"},split_pay_only_2:'Selectează plata în rate la finalizarea comenzii pentru a împărți achiziția în 2 plăți fără dobândă, în valoare de <span class="tagline__bold">{splitPayLoanRepayment}</span> la fiecare 15 zile.',split_pay_only_30:"Selectează plata în rate la finalizarea comenzii pentru a plăti pentru achiziția de <b>{price}</b> în decurs de 30 de zile, fără dobândă.",ineligible_min_over_time:"Pentru comenzi mai mari de {minPrice}, selectează opțiunea de plată rate la finalizarea comenzii pentru a împărți achiziția în rate."},close:"Închide",new_window:"Se deschide într-o fereastră nouă.",partnership:"Rate în parteneriat cu {affirmLogo}",partnership_disclaimer:"Rate în parteneriat cu {affirmLogo}. Affirm nu furnizează servicii de traducere. Affirm și ofertele sale sunt disponibile numai în limba engleză.",split_pay_contents:{interest_fees:"Fără comisioane ascunse.",interest_credit:"Fără impact asupra scorului tău de credit pentru solicitări.",no_interest_fees:"Fără comisioane.",no_interest_credit:"Fără impact asupra scorului tău de credit pentru solicitări."},sample_plan_contents:{continue_to_checkout:"Continuă la finalizarea comenzii",unavailable:"Indisponibil",check_eligibility:"Dacă alegi să continui, informațiile tale vor fi partajate cu Affirm. Verificarea eligibilității nu-ți va afecta creditul. ",apr:"APR",interest:"Dobândă",total:"Total",processing:"Îți procesăm solicitarea",processing_time:"Procesul poate dura până la un minut...",split_pay_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> la fiecare 2 săptămâni</span>',other_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> în fiecare lună</span>',split_pay_number_of_terms:"&nbsp;timp de {numberOfTerms} săptămâni",other_number_of_terms:"&nbsp;timp de {numberOfTerms} luni"},prequal_contents:{unavailable:"Indisponibil",check:"Află dacă ești eligibil"},legal:{ca_residents_notice:"Pentru rezidenții din California: împrumuturile acordate de Affirm Loan Services, LLC sunt acordate în conformitate cu o licență de creditare financiară din California.",rates_from_apr:'Ratele variază între 0 și 36% APR. Opțiunile de plată prin intermediul Affirm sunt supuse unei verificări de eligibilitate, este posibil să nu fie disponibile în toate statele și sunt oferite de următorii parteneri de creditare: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Opțiunile depind de suma achiziției. Ar putea fi necesară efectuarea unei plăți în avans.',interest_and_split_pay:"Suma estimată de plată exclude taxele și expedierea.",split_pay_only:"Suma estimată de plată exclude taxele și expedierea. Opțiunile legate de plată sunt oferite de Affirm, sunt sub incidența verificării eligibilității și este posibil să nu fie disponibile în toate statele.",ineligible:"Opțiunile legate de plată sunt oferite de Affirm, sunt sub incidența verificării eligibilității și este posibil să nu fie disponibile în toate statele.",dynamic_pdp:'Suma estimată de plată exclude taxele și expedierea. Ratele variază între 0 și 36% APR. Opțiunile de plată prin Shop Pay rate sunt supuse unei verificări de eligibilitate și sunt oferite de acești parteneri de împrumuturi: <a class="help_text__link" href="https://www.affirm.com/lenders" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Opțiunile depind de suma achiziției. Ar putea fi necesară efectuarea unei plăți în avans. După aprobare este posibil să devină disponibile mai multe opțiuni. Notificări din partea statului pentru consumatori: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/licenses</a>.'}};var bP={affirm:hP,shopPay:_P,banner:gP,modal:fP},yP=Object.freeze({__proto__:null,affirm:hP,banner:gP,default:bP,modal:fP,shopPay:_P});const vP="Affirm",kP="Shop Pay",wP={learn_more:"Подробнее",view_sample_plans:"Просмотреть типовые планов",prequal:"Проверьте свою покупательскую способность",split_pay_eligible:"Оплатите 4 беспроцентными платежами в размере <b>{price}</b> с {shopPayLogo}",interest_only_eligible:"Разделите оплату на ежемесячные платежи с {shopPayLogo}",dynamic_interest_only_eligible:"От <b>{price}</b> / мес. с {shopPayLogo}",pay_in_4_or_as_low_as_eligible:"4 беспроцентных платежа или от <b>{price}</b> / мес. с {shopPayLogo}",zero_interest_eligible:"От <b>{price}</b> / мес. или 0 % ГПС с {shopPayLogo}",zero_interest_eligible_zero_apr:"От <b>{price}</b> / мес. или 0 % ГПС с {shopPayLogo}",non_eligible_min:"Оплачивайте заказы стоимостью более <b>{minPrice}</b> 4 беспроцентными платежами с {shopPayLogo}",non_eligible_monthly_payments_min:"Разделите оплату заказов стоимостью более <b>{minPrice}</b> на ежемесячные периодические платежи с {shopPayLogo}",non_eligible_max:"Разделите оплату заказов стоимостью не более <b>{maxPrice}</b> на периодические платежи с {shopPayLogo}",prequal_contents:{not_prequalified_see_plans:"Проверьте свою покупательную способность",prequalified_see_plans:"Открыть планы",purchasing_power_a:"Ваша покупательная способность: ",purchasing_power_b:"Потратьте любую сумму до "},split_pay_eligible_2:"Оплатите 2 беспроцентными платежами в размере <b>{price}</b> с {shopPayLogo}",split_pay_eligible_30:"Оплатите <b>{price}</b> без процентов в течение 30 дней с {shopPayLogo}",non_eligible_min_over_time:"Оплачивайте заказы стоимостью более <b>{minPrice}</b> в рассрочку с {shopPayLogo}",non_eligible_min_over_time_30:"Оплачивайте заказы стоимостью более <b>{minPrice}</b> беспроцентными платежами в течение 30 дней с {shopPayLogo}"},PP={title:"Получите сейчас, оплатите позже",subtitle:{interest_and_split_pay:'Выберите график платежей во время оформления заказа — начните с 4 беспроцентных платежей в размере <span class="tagline__bold">{splitPayLoanRepayment}</span> с выплатами каждые 2 недели.',interest_only:"Выберите график платежей во время оформления заказа, чтобы разделить оплату на ежемесячные периодические платежи.",split_pay_only:'Выберите рассрочку при оформлении заказа, чтобы разделить оплату на 4 беспроцентных платежа в размере <span class="tagline__bold">{splitPayLoanRepayment}</span> с выплатами каждые 2 недели.',ineligible_min:"При оформление заказа стоимостью более {minPrice} выберите рассрочку, чтобы разделить оплату на 4 беспроцентных платежа.",ineligible_monthly_payments_min:"При оформление заказа стоимостью более {minPrice} выберите рассрочку, чтобы разделить оплату на ежемесячные платежи.",ineligible_max:"При оформление заказа стоимостью не более {maxPrice} выберите рассрочку, чтобы разделить оплату на несколько платежей.",dynamic_pdp:{one:"Типовые планы для покупки на сумму <b>{priceWithoutInterest}</b>",other:"Типовые планы для покупки на сумму <b>{priceWithoutInterest}</b>",few:"Типовые планы для покупки на сумму <b>{priceWithoutInterest}</b>",many:"Типовые планы для покупки на сумму <b>{priceWithoutInterest}</b>"},split_pay_only_2:'Выберите рассрочку при оформлении заказа, чтобы разделить оплату на 2 беспроцентных платежа в размере <span class="tagline__bold">{splitPayLoanRepayment}</span> с выплатами каждые 15 дней.',split_pay_only_30:"Выберите рассрочку при оформлении заказа, чтобы оплатить заказ стоимостью <b>{price}</b> без процентов в течение 30 дней.",ineligible_min_over_time:"При оформлении заказа стоимостью более {minPrice} выберите рассрочку, чтобы разделить оплату на несколько платежей."},close:"Закрыть",new_window:"Открывается в новом окне.",partnership:"Рассрочка при поддержке {affirmLogo}",partnership_disclaimer:"Периодические платежи при поддержке {affirmLogo}. Affirm не предоставляет перевод. Affirm и его предложения поддерживаются только на английском.",split_pay_contents:{interest_fees:"Никаких скрытых комиссий.",interest_credit:"Никакого влияния на кредитную оценку.",no_interest_fees:"Никаких комиссий.",no_interest_credit:"Никакого влияния на кредитную оценку."},sample_plan_contents:{continue_to_checkout:"Перейти к оформлению заказа",unavailable:"Недоступно",check_eligibility:"Если вы продолжите, ваши данные будут предоставлены компании Affirm. <br/> Проверка ваших данных не повлияет на ваш счет. ",apr:"ГПС",interest:"Выгода",total:"Всего",processing:"Запрос обрабатывается",processing_time:"Это займет не более минуты...",split_pay_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> кажд. 2&nbsp;нед.</span>',other_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> кажд. мес.</span>',split_pay_number_of_terms:"&nbsp;в {numberOfTerms}&nbsp;нед.",other_number_of_terms:"&nbsp;в {numberOfTerms}&nbsp;мес."},prequal_contents:{unavailable:"Недоступно",check:"Проверьте, соответствуете ли вы"},legal:{ca_residents_notice:"Жителям штата Калифорния: Кредиты, предоставляемые Affirm Loan Services, LLC, выдаются или формируются в соответствии с лицензией финансового кредитора штата Калифорния.",rates_from_apr:'Комиссия может составлять от 0 до 36nbsp% годовой процентной ставки. Оплата в рассрочку с помощью Affirm возможна после проверки на соответствие требованиям, может быть недоступна в некоторых штатах и предоставляется такими партнерами: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Варианты зависят от суммы вашей покупки. Может потребоваться первоначальный взнос.',interest_and_split_pay:"Ориентировочная сумма платежа не включает налоги и стоимость доставки.",split_pay_only:"Ориентировочная сумма платежа не включает налоги и стоимость доставки. Варианты оплаты предлагаются Affirm и могут быть доступны не во всех странах. Возможна проверка соответствия требованиям.",ineligible:"Варианты оплаты предлагаются Affirm и могут быть доступны не во всех странах. Возможна проверка соответствия требованиям.",dynamic_pdp:'Ориентировочная сумма платежа не включает налоги и стоимость доставки. Комиссия может составлять от 0 до 36 % годовой процентной ставки. Оплата в рассрочку с помощью Shop Pay Installments доступна после проверки на соответствие требованиям и предоставляется такими партнерами: <a class="help_text__link" href="https://www.affirm.com/lenders" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Варианты зависят от суммы вашей покупки. Может потребоваться первоначальный взнос. После одобрения вам могут быть доступны новые варианты. Уведомления для клиентов: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>.'}};var SP={affirm:vP,shopPay:kP,banner:wP,modal:PP},zP=Object.freeze({__proto__:null,affirm:vP,banner:wP,default:SP,modal:PP,shopPay:kP});const jP="Affirm",CP="Shop Pay",xP={learn_more:"Ďalšie informácie",view_sample_plans:"Zobraziť vzorové plány",prequal:"Overte svoje možnosti nakupovať",split_pay_eligible:"{shopPayLogo} vám umožní sumu uhradiť v 4 bezúročných splátkach po <b>{price}</b>",interest_only_eligible:"{shopPayLogo} vám umožní úhradu nákupu rozdeliť do mesačných splátok",dynamic_interest_only_eligible:"Od <b>{price}</b>/mesiac použitím služby {shopPayLogo}",pay_in_4_or_as_low_as_eligible:"{shopPayLogo} vám umožní sumu uhradiť v 4 bezúročných splátkach alebo za <b>{price}</b>/mesiac",zero_interest_eligible:"Od <b>{price}</b>/mesiac alebo 0 % RPMN použitím služby {shopPayLogo}",zero_interest_eligible_zero_apr:"Od <b>{price}</b> mesačne s 0 % RPMN cez {shopPayLogo}",non_eligible_min:"{shopPayLogo} vám umožní objednávky nad <b>{minPrice}</b> uhradiť v 4 bezúročných splátkach",non_eligible_monthly_payments_min:"{shopPayLogo} vám umožní úhradu za objednávky nad <b>{minPrice}</b> rozdeliť do mesačných splátok",non_eligible_max:"{shopPayLogo} vám umožní úhradu za objednávky do maximálnej sumy <b>{maxPrice}</b> rozdeliť do splátok",prequal_contents:{not_prequalified_see_plans:"Overte svoju kúpnu silu",prequalified_see_plans:"Zobraziť plány",purchasing_power_a:"Vaša kúpna sila je ",purchasing_power_b:"Utraťte ľubovoľnú sumu až do výšky "},split_pay_eligible_2:"{shopPayLogo} vám umožní sumu uhradiť v 2 bezúročných splátkach po <b>{price}</b>",split_pay_eligible_30:"{shopPayLogo} vám umožní sumu vo výške <b>{price}</b> uhradiť do 30 dní bez úrokov",non_eligible_min_over_time:"{shopPayLogo} vám umožní objednávky nad <b>{minPrice}</b> uhradiť po čase",non_eligible_min_over_time_30:"{shopPayLogo} vám umožní objednávky nad <b>{minPrice}</b> uhradiť do 30 dní bez úrokov"},LP={title:"Získajte to teraz, plaťte neskôr.",subtitle:{interest_and_split_pay:'Vyberte si harmonogram platieb pri platbe &#8211; už od 4 bezúročných platieb vo výške <span class="tagline__bold">{splitPayLoanRepayment}</span> hradených každé 2 týždne.',interest_only:"Pri platbe si môžete vybrať harmonogram platieb tak, aby ste úhradu rozdelili do mesačných splátok.",split_pay_only:'Pri platbe vyberte možnosť úhrady na splátky a rozdeľte svoj nákup do 4 bezúročných platieb <span class="tagline__bold">{splitPayLoanRepayment}</span> hradených každé 2 týždne.',ineligible_min:"V prípade objednávok nad {minPrice} si môžete pri platbe vybrať možnosť splátok a rozdeliť tak úhradu nákupu do 4 bezúročných platieb.",ineligible_monthly_payments_min:"V prípade objednávok nad {minPrice} si môžete pri platbe vybrať možnosť splátok a rozdeliť tak úhradu nákupu do mesačných platieb.",ineligible_max:"V prípade objednávok do maximálnej sumy {maxPrice} si môžete pri platbe vybrať možnosť splátok a rozdeliť tak úhradu nákupu do viacerých platieb.",dynamic_pdp:{one:"Vzorový plán pre nákup za <b>{priceWithoutInterest}</b>",other:"Vzorové plány pre nákup za <b>{priceWithoutInterest}</b>",few:"Vzorové plány pre nákup za <b>{priceWithoutInterest}</b>",many:"Vzorové plány pre nákup za <b>{priceWithoutInterest}</b>"},split_pay_only_2:'Pri platbe vyberte možnosť úhrady na splátky a rozdeľte svoj nákup do 2 bezúročných platieb <span class="tagline__bold">{splitPayLoanRepayment}</span> hradených každých 15 dní.',split_pay_only_30:"Vyberte si splátky pri platbe a zaplaťte svoj nákup vo výške <b>{price}</b> bez úrokov do 30 dní.",ineligible_min_over_time:"V prípade objednávok nad {minPrice} si môžete pri platbe vybrať možnosť splátok a rozdeliť tak úhradu nákupu do viacerých platieb."},close:"Zavrieť",new_window:"Otvorí sa v novom okne.",partnership:"Splátky v spolupráci so spoločnosťou {affirmLogo}",partnership_disclaimer:"Splátky v spolupráci so spoločnosťou {affirmLogo}. Spoločnosť Affirm prekladateľské služby nezabezpečuje. Spoločnosť Affirm a jej ponuky sú podporované len v angličtine.",split_pay_contents:{interest_fees:"Nikdy žiadne skryté poplatky.",interest_credit:"Žiadny vplyv na vaše úverové skóre.",no_interest_fees:"Žiadne poplatky, nikdy.",no_interest_credit:"Žiadny vplyv na vaše úverové skóre."},sample_plan_contents:{continue_to_checkout:"Pokračovať na platbu",unavailable:"Nedostupné",check_eligibility:"Ak budete pokračovať, vaše informácie sa budú zdieľať so spoločnosťou Affirm.<br/> Kontrola vašej oprávnenosti neovplyvní vaše kredity. ",apr:"RPMN",interest:"Úrok",total:"Celkove",processing:"Vaša žiadosť sa spracováva",processing_time:"Môže to trvať minútu...",split_pay_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> každé 2 týždne</span>',other_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> každý mesiac</span>',split_pay_number_of_terms:"&nbsp;počas {numberOfTerms} týždňov",other_number_of_terms:"&nbsp;počas {numberOfTerms} mesiacov"},prequal_contents:{unavailable:"Nedostupné",check:"Overte si, či spĺňate podmienky"},legal:{ca_residents_notice:"Obyvatelia Kalifornie: Úvery od spoločnosti Affirm Loan Services, LLC sa nastavujú alebo riadia licenciou California Finance Lender.",rates_from_apr:'Sadzby sa pohybujú od 0 do 36 % RPMN. Možnosti platby na splátky cez Affirm podliehajú kontrole oprávnenosti, nemusia byť k dispozícii vo všetkých štátoch a poskytujú ich títo poskytovatelia úverov: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Možnosti závisia od objemu nákupu, môže sa vyžadovať aj záloha.',interest_and_split_pay:"Odhadovaná suma platby nezahŕňa dane a dopravu.",split_pay_only:"Odhadovaná suma platby nezahŕňa dane a dopravu. Možnosti platby poskytuje spoločnosť Affirm. Podliehajú kontrole overenia nároku a nemusia byť k dispozícii vo všetkých štátoch.",ineligible:"Možnosti platby poskytuje spoločnosť Affirm. Podliehajú kontrole overenia nároku a nemusia byť k dispozícii vo všetkých štátoch.",dynamic_pdp:'Odhadovaná suma platby nezahŕňa dane a dopravu. Sadzby sa pohybujú od 0 do 36 % RPMN. Možnosti platby na splátky cez Shop Pay podliehajú kontrole oprávnenosti a poskytujú ich títo poskytovatelia úverov: <a class="help_text__link" href="https://www.affirm.com/lenders" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Možnosti závisia od objemu nákupu, môže sa vyžadovať aj záloha. Po schválení môžu byť k dispozícii aj ďalšie možnosti. Výzvy štátu voči spotrebiteľom: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/licenses</a>.'}};var AP={affirm:jP,shopPay:CP,banner:xP,modal:LP},TP=Object.freeze({__proto__:null,affirm:jP,banner:xP,default:AP,modal:LP,shopPay:CP});const EP="Affirm",IP="Shop Pay",MP={learn_more:"Več o tem",view_sample_plans:"Prikaži vzorčne pakete",prequal:"Preverite svojo kupno moč",split_pay_eligible:"Plačilo v 4 obrokih brez obresti v znesku <b>{price}</b> s storitvijo {shopPayLogo}",interest_only_eligible:"Razdelite nakup na mesečne obroke s storitvijo {shopPayLogo}",dynamic_interest_only_eligible:"Od <b>{price}</b>/mes. s storitvijo {shopPayLogo}",pay_in_4_or_as_low_as_eligible:"4 obroki brez obresti ali od <b>{price}</b>/mes. s storitvijo {shopPayLogo}",zero_interest_eligible:"Od <b>{price}</b>/mes. ali 0 % EOM s storitvijo {shopPayLogo}",zero_interest_eligible_zero_apr:"Od <b>{price}</b>/mes. z 0-% EOM s storitvijo {shopPayLogo}",non_eligible_min:"Naročila nad <b>{minPrice}</b> lahko plačate v 4 obrokih brez obresti s storitvijo {shopPayLogo}",non_eligible_monthly_payments_min:"Pri naročilih nad <b>{minPrice}</b> lahko svoj nakup razdelite na mesečne obroke s storitvijo {shopPayLogo}",non_eligible_max:"Pri naročilih do <b>{maxPrice}</b> lahko svoj nakup razdelite na obroke s storitvijo {shopPayLogo}",prequal_contents:{not_prequalified_see_plans:"Preverite svojo kupno moč",prequalified_see_plans:"Glej načrte",purchasing_power_a:"Vaša nakupna moč je ",purchasing_power_b:"Porabite katerikoli znesek do "},split_pay_eligible_2:"Plačilo v 2 obrokih brez obresti v znesku <b>{price}</b> s storitvijo {shopPayLogo}",split_pay_eligible_30:"S storitvijo {shopPayLogo} plačajte <b>{price}</b> v 30 dneh brez obresti",non_eligible_min_over_time:"Naročila nad <b>{minPrice}</b> lahko plačate s storitvijo {shopPayLogo} v daljšem časovnem obdobju",non_eligible_min_over_time_30:"Naročila nad <b>{minPrice}</b> lahko plačate v 30 dneh brez obresti s storitvijo {shopPayLogo}"},OP={title:"Kupite zdaj, plačajte pozneje",subtitle:{interest_and_split_pay:'Urnik plačil izberete ob zaključku nakupa &#8211; začne se s štirimi obroki brez obresti po <span class="tagline__bold">{splitPayLoanRepayment}</span> vsaka dva tedna.',interest_only:"Ob zaključku nakupa izberite urnik plačil in nakup razdelite na mesečne obroke.",split_pay_only:'Ob zaključku nakupa izberite možnost plačila na obroke in nakup razdelite na 4 obroke brez obresti v znesku <span class="tagline__bold">{splitPayLoanRepayment}</span>, ki jih plačujete vsaka dva tedna.',ineligible_min:"Pri naročilih nad {minPrice} lahko ob zaključku nakupa izberete možnost plačila na obroke in nakup razdelite na 4 obroke brez obresti.",ineligible_monthly_payments_min:"Pri naročilih nad {minPrice} lahko ob zaključku nakupa izberete možnost plačila na obroke in nakup razdelite na mesečne obroke.",ineligible_max:"Pri naročilih do {maxPrice} lahko ob zaključku nakupa izberete možnost plačila na obroke in nakup razdelite na več obrokov.",dynamic_pdp:{one:"Vzorčni paket za nakup <b>{priceWithoutInterest}</b>",other:"Vzorčni paketi za nakup <b>{priceWithoutInterest}</b>",few:"Vzorčni paketi za nakup <b>{priceWithoutInterest}</b>",two:"Vzorčni paketi za nakup <b>{priceWithoutInterest}</b>"},split_pay_only_2:'Ob zaključku nakupa izberite možnost plačila na obroke in nakup razdelite na 2 obroka brez obresti v znesku <span class="tagline__bold">{splitPayLoanRepayment}</span>, ki ju poravnate v razmiku 15 dni.',split_pay_only_30:"Ob zaključku nakupa v rednosti <b>{price}</b> izberite možnost plačila na obroke brez obresti v 30 dneh.",ineligible_min_over_time:"Pri naročilih nad {minPrice} ob zaključku nakupa izberete možnost plačila na obroke in plačilo razdelite na daljše časovno obdobje."},close:"Zapri",new_window:"Odpre se v novem oknu.",partnership:"Plačilo na obroke v partnerstvu s podjetjem {affirmLogo}",partnership_disclaimer:"Plačilo na obroke v partnerstvu s podjetjem {affirmLogo}. Podjetje Affirm ne nudi prevajalskih storitev. Podjetje Affirm in njegove storitve so podprti samo v angleščini.",split_pay_contents:{interest_fees:"Brez skitih provizij.",interest_credit:"Se ne upošteva pri izračunu bonitetne ocene.",no_interest_fees:"Brez provizij.",no_interest_credit:"Se ne upošteva pri izračunu bonitetne ocene."},sample_plan_contents:{continue_to_checkout:"Nadaljuj na zaključek nakupa",unavailable:"Ni na voljo",check_eligibility:"Če nadaljujete, bomo vaše podatke delili s ponudnikom Affirm.<br/> Preverjanje kvalifikacije ne bo vplivalo na vaše dobroimetje. ",apr:"EOM",interest:"Obresti",total:"Skupaj",processing:"Obdelovanje vaše zahteve",processing_time:"To lahko traja do ene minute ...",split_pay_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> vsaka 2 tedna</span>',other_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> vsak mesec</span>',split_pay_number_of_terms:"&nbsp;za toliko tednov: {numberOfTerms}",other_number_of_terms:"&nbsp;za toliko mesecev: {numberOfTerms}"},prequal_contents:{unavailable:"Ni na voljo",check:"Preverite svojo upravičenost"},legal:{ca_residents_notice:"Prebivalci Kalifornije: Posojila družbe Affirm Loan Services, LLC so odobrena ali sklenjena v skladu z licenco za posojilodajalca v Kaliforniji.",rates_from_apr:'EOM znaša od 0 do 36 %. Za možnosti plačila prek storitve Affirm je treba preveriti vašo upravičenost in morda niso na voljo v vseh državah, zagotavljajo pa jih naslednji partnerji za posojila: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Možnosti so odvisne od končnega zneska nakupa, mogoče bo zahtevan polog.',interest_and_split_pay:"Ocenjeni znesek plačila ne vključuje davkov in stroškov dostave.",split_pay_only:"Ocenjeni znesek plačila ne vključuje davkov in stroškov dostave. Možnosti plačila ponuja družba Affirm, ki mora preveriti vašo upravičenost do njihove uporabe. Možnosti plačila morda niso na voljo v vseh zveznih državah.",ineligible:"Možnosti plačila ponuja družba Affirm, ki mora preveriti vašo upravičenost do njihove uporabe. Možnosti plačila morda niso na voljo v vseh zveznih državah.",dynamic_pdp:'Ocenjeni znesek plačila ne vključuje davkov in stroškov dostave. EOM znaša od 0 do 36 %. Za možnosti plačila na obroke Shop Pay je treba preveriti vašo upravičenost, zagotavljajo pa jih naslednji partnerji za posojila: <a class="help_text__link" href="https://www.affirm.com/lenders" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Možnosti so odvisne od končnega zneska nakupa, mogoče bo zahtevan polog. Mogoče bo po odobritvi na voljo več možnosti. Obvestila za potrošnike iz posameznih zveznih držav: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/licenses</a>.'}};var NP={affirm:EP,shopPay:IP,banner:MP,modal:OP},qP=Object.freeze({__proto__:null,affirm:EP,banner:MP,default:NP,modal:OP,shopPay:IP});const RP="Affirm",DP="Shop Pay",BP={learn_more:"Mer information",view_sample_plans:"Visa provplaner",prequal:"Kolla din köpkraft",split_pay_eligible:"Fyra räntefria avbetalningar om <b>{price}</b> med {shopPayLogo}",interest_only_eligible:"Dela upp köpet i månadsavbetalningar med {shopPayLogo}",dynamic_interest_only_eligible:"Från <b>{price}</b>/månad med {shopPayLogo}",pay_in_4_or_as_low_as_eligible:"Fyra räntefria avbetalningar, eller från <b>{price}</b>/månad med {shopPayLogo}",zero_interest_eligible:"Från <b>{price}</b>/månad eller 0 % effektiv ränta med {shopPayLogo}",zero_interest_eligible_zero_apr:"Från <b>{price}</b>/månad och 0 % effektiv ränta med {shopPayLogo}",non_eligible_min:"Fyra räntefria avbetalningar för ordrar över <b>{minPrice}</b> med {shopPayLogo}",non_eligible_monthly_payments_min:"Dela upp köpet i månadsavbetalningar för ordrar över <b>{minPrice}</b> med {shopPayLogo}",non_eligible_max:"Dela upp köpet i månadsavbetalningar för ordrar över <b>{maxPrice}</b> med {shopPayLogo}",prequal_contents:{not_prequalified_see_plans:"Kolla din köpkraft",prequalified_see_plans:"Se planer",purchasing_power_a:"Din köpkraft är ",purchasing_power_b:"Spendera upp till "},split_pay_eligible_2:"Två räntefria avbetalningar om <b>{price}</b> med {shopPayLogo}",split_pay_eligible_30:"Betala <b>{price}</b> räntefritt inom 30 dagar med {shopPayLogo}",non_eligible_min_over_time:"Betala över tid för ordrar som kostar mer än <b>{minPrice}</b> med {shopPayLogo}",non_eligible_min_over_time_30:"Räntefri betalning inom 30 dagar för ordrar över <b>{minPrice}</b> med {shopPayLogo}"},FP={title:"Skaffa nu, betala senare",subtitle:{interest_and_split_pay:'Välj ditt betalschema i kassan &#8211; från fyra räntefria betalningar på <span class="tagline__bold">{splitPayLoanRepayment}</span> varannan vecka.',interest_only:"Välj ditt betalschema i kassan för att dela upp köpet i månadsavbetalningar.",split_pay_only:'Välj avbetalningar i kassan för att dela upp köpet i fyra räntefria betalningar på <span class="tagline__bold">{splitPayLoanRepayment}</span> varannan vecka.',ineligible_min:"För ordrar över {minPrice} kan köpet delas upp i fyra räntefria avbetalningar. Välj avbetalningar i kassan.",ineligible_monthly_payments_min:"För ordrar över {minPrice} kan köpet delas upp i månadsbetalningar. Välj avbetalningar i kassan.",ineligible_max:"För ordrar upp till {maxPrice} kan köpet delas upp i flera betalningar. Välj avbetalningar i kassan.",dynamic_pdp:{one:"Provplan för ett köp på <b>{priceWithoutInterest}</b>",other:"Provplaner för ett köp på <b>{priceWithoutInterest}</b>"},split_pay_only_2:'Välj avbetalningar i kassan för att dela upp köpet i två räntefria betalningar på <span class="tagline__bold">{splitPayLoanRepayment}</span> var femtonde dag.',split_pay_only_30:"Välj avbetalningar i kassan för att betala ditt köp på <b>{price}</b> räntefritt inom 30 dagar.",ineligible_min_over_time:"Välj avbetalningar i kassan för att dela upp ditt köp och betala det över tid om ordern kostar mer än {minPrice}."},close:"Stäng",new_window:"Öppnas i ett nytt fönster.",partnership:"Avbetalning i partnerskap med {affirmLogo}",partnership_disclaimer:"Avbetalning i partnerskap med {affirmLogo}. Affirm tillhandahåller inte översättningstjänster. Affirm och dess erbjudanden stöds endast på engelska.",split_pay_contents:{interest_fees:"Inga dolda avgifter, någonsin.",interest_credit:"Det påverkar inte din kreditvärdighet att ansöka.",no_interest_fees:"Inga avgifter, någonsin.",no_interest_credit:"Att ansöka påverkar inte din kreditvärdighet."},sample_plan_contents:{continue_to_checkout:"Fortsätt till kassan",unavailable:"Inte tillgängliga",check_eligibility:"Om du fortsätter delas din information med Affirm. <br/> Din kredit påverkas inte av behörighetskontroller. ",apr:"Effektiv ränta",interest:"Ränta",total:"Totalt",processing:"Din begäran behandlas",processing_time:"Det kan ta upp till en minut...",split_pay_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> varannan vecka</span>',other_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> varje månad</span>',split_pay_number_of_terms:"&nbsp;i {numberOfTerms} veckor",other_number_of_terms:"&nbsp;i {numberOfTerms} månader"},prequal_contents:{unavailable:"Inte tillgängliga",check:"Kontrollera om du är berättigad"},legal:{ca_residents_notice:"CA-invånare: Lån från Affirm Loan Services, LLC, genomförs eller ordnas enligt en Kalifornisk ekonomisk lånelicens.",rates_from_apr:'Effektiv ränta från 0–36 %. Betalningsalternativ via Affirm genomgår en behörighetskontroll, är kanske inte tillgängliga i alla stater och tillhandahålls av dessa lånepartner: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Alternativen är beroende av ditt inköpsbelopp och en handpenning kan krävas.',interest_and_split_pay:"Det uppskattade betalningsbeloppet är exklusive skatter och frakt.",split_pay_only:"Det uppskattade betalningsbeloppet är exklusive skatter och frakt. Betalningsalternativ erbjuds av Affirm och genomgår behörighetskontroll och är kanske inte tillgängliga i alla stater.",ineligible:"Betalningsalternativ erbjuds av Affirm och genomgår behörighetskontroll och är kanske inte tillgängliga i alla stater.",dynamic_pdp:'Det uppskattade betalningsbeloppet är exklusive skatter och frakt. Effektiv ränta från 0–36 %. Betalningsalternativ genom avbetalningar med Shop Pay genomgår behörighetskontroll och tillhandahålls av dessa lånepartner: <a class="help_text__link" href="https://www.affirm.com/lenders" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Alternativen är beroende av ditt inköpsbelopp och en handpenning kan krävas. Fler alternativ kan vara tillgängliga efter godkännande. Delstatliga meddelanden till konsumenter: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/licenses</a>.'}};var VP={affirm:RP,shopPay:DP,banner:BP,modal:FP},$P=Object.freeze({__proto__:null,affirm:RP,banner:BP,default:VP,modal:FP,shopPay:DP});const WP="Affirm",UP="Shop Pay",HP={learn_more:"ดูข้อมูลเพิ่มเติม",view_sample_plans:"ดูแผนตัวอย่าง",prequal:"ตรวจสอบกำลังซื้อของคุณ",split_pay_eligible:"ผ่อนชำระ 4 งวดโดยไม่เสียดอกเบี้ยเป็นจำนวน <b>{price}</b> กับ {shopPayLogo}",interest_only_eligible:"แบ่งยอดซื้อออกเป็นการผ่อนชำระรายเดือนกับ {shopPayLogo}",dynamic_interest_only_eligible:"ตั้งแต่ <b>{price}</b>/เดือนกับ {shopPayLogo}",pay_in_4_or_as_low_as_eligible:"ผ่อนชำระ 4 งวดโดยไม่เสียดอกเบี้ย หรือตั้งแต่ <b>{price}</b>/เดือนกับ {shopPayLogo}",zero_interest_eligible:"ตั้งแต่ <b>{price}</b>/เดือน หรืออัตราร้อยละต่อปีที่ 0% กับ {shopPayLogo}",zero_interest_eligible_zero_apr:"ตั้งแต่ <b>{price}</b>/เดือน ที่อัตราร้อยละต่อปีที่ 0% กับ {shopPayLogo}",non_eligible_min:"ผ่อนชำระ 4 งวดโดยไม่เสียดอกเบี้ยสำหรับยอดสั่งซื้อสูงกว่า <b>{minPrice}</b> กับ {shopPayLogo}",non_eligible_monthly_payments_min:"แบ่งยอดซื้อออกเป็นการผ่อนชำระรายเดือนสำหรับยอดสั่งซื้อสูงกว่า <b>{minPrice}</b> กับ {shopPayLogo}",non_eligible_max:"แบ่งยอดซื้อออกเป็นการผ่อนชำระสำหรับยอดสั่งซื้อสูงสุด <b>{maxPrice}</b> กับ {shopPayLogo}",prequal_contents:{not_prequalified_see_plans:"ตรวจสอบกำลังซื้อของคุณ",prequalified_see_plans:"ดูแผนต่างๆ",purchasing_power_a:"กำลังซื้อของคุณคือ ",purchasing_power_b:"ใช้จ่ายเท่าใดก็ได้ไม่เกิน "},split_pay_eligible_2:"ผ่อนชำระ 2 งวดโดยไม่เสียดอกเบี้ยเป็นจำนวน <b>{price}</b> กับ {shopPayLogo}",split_pay_eligible_30:"ชำระเงิน <b>{price}</b> ภายใน 30 วันโดยไม่เสียดอกเบี้ยด้วย {shopPayLogo}",non_eligible_min_over_time:"ค่อยๆ ทยอยจ่ายคำสั่งซื้อที่มีราคาสูงกว่า <b>{minPrice}</b> ด้วย {shopPayLogo}",non_eligible_min_over_time_30:"ชำระเงินภายใน 30 วันโดยไม่เสียดอกเบี้ยสำหรับคำสั่งซื้อที่มียอดมากกว่า <b>{minPrice}</b> ด้วย {shopPayLogo}"},KP={title:"รับสินค้าก่อน จ่ายทีหลัง",subtitle:{interest_and_split_pay:'เลือกกำหนดเวลาการชำระเงินได้ในขั้นตอนการชำระเงิน โดยเริ่มต้นที่ 4 งวดโดยไม่เสียดอกเบี้ยเป็นจำนวนเงิน <span class="tagline__bold">{splitPayLoanRepayment}</span> ทุก 2 สัปดาห์',interest_only:"เลือกกำหนดเวลาการชำระเงินได้ในขั้นตอนการชำระเงิน เพื่อแบ่งยอดซื้อออกเป็นการผ่อนชำระรายเดือน",split_pay_only:'เลือกการผ่อนชำระในขั้นตอนการชำระเงินเพื่อแบ่งการซื้อของคุณเป็นการชำระเงิน 4 งวดโดยไม่เสียดอกเบี้ยเป็นจำนวนเงิน <span class="tagline__bold">{splitPayLoanRepayment}</span> ทุก 2 สัปดาห์',ineligible_min:"สำหรับยอดสั่งซื้อสูงกว่า {minPrice} โปรดเลือกการผ่อนชำระที่ขั้นตอนการชำระเงิน เพื่อแบ่งยอดซื้อออกเป็นการชำระเงิน 4 งวดโดยไม่เสียดอกเบี้ย",ineligible_monthly_payments_min:"สำหรับยอดสั่งซื้อสูงกว่า {minPrice} โปรดเลือกการผ่อนชำระที่ขั้นตอนการชำระเงิน เพื่อแบ่งยอดซื้อออกเป็นการชำระเงินรายเดือน",ineligible_max:"สำหรับยอดสั่งซื้อสูงสุด {maxPrice} โปรดเลือกการผ่อนชำระที่ขั้นตอนการชำระเงิน เพื่อแบ่งยอดซื้อออกเป็นการชำระเงินหลายครั้ง",dynamic_pdp:{one:"ตัวอย่างแผนสำหรับการซื้อที่จำนวน <b>{priceWithoutInterest}</b>",other:"ตัวอย่างแผนสำหรับการซื้อที่จำนวน <b>{priceWithoutInterest}</b>"},split_pay_only_2:'เลือกการผ่อนชำระในขั้นตอนการชำระเงินเพื่อแบ่งการซื้อของคุณเป็นการชำระเงิน 2 งวดโดยไม่เสียดอกเบี้ยเป็นจำนวนเงิน <span class="tagline__bold">{splitPayLoanRepayment}</span> ทุก 15 วัน',split_pay_only_30:"เลือกการผ่อนชำระในขั้นตอนการชำระเงินเพื่อผ่อนชำระการซื้อของคุณที่ <b>{price}</b> โดยไม่เสียดอกเบี้ยภายใน 30 วัน",ineligible_min_over_time:"สำหรับยอดสั่งซื้อสูงกว่า {minPrice} โปรดเลือกการผ่อนชำระที่ขั้นตอนการชำระเงินเพื่อแบ่งยอดซื้อออกเป็นงวดๆ"},close:"ปิด",new_window:"เปิดในหน้าต่างใหม่",partnership:"การผ่อนชำระด้วยความร่วมมือจาก {affirmLogo}",partnership_disclaimer:"การผ่อนชำระในความร่วมมือกับ {affirmLogo} Affirm ไม่ได้เป็นผู้ให้บริการการแปล Affirm และข้อเสนอของบริษัทจะรองรับเป็นภาษาอังกฤษเท่านั้น",split_pay_contents:{interest_fees:"ไม่มีค่าธรรมเนียมแอบแฝงแน่นอน",interest_credit:"ไม่มีผลกระทบต่อคะแนนเครดิตของคุณในการสมัคร",no_interest_fees:"ไม่มีค่าธรรมเนียมแน่นอน",no_interest_credit:"การสมัครจะไม่มีผลกระทบต่อคะแนนเครดิตของคุณ"},sample_plan_contents:{continue_to_checkout:"ดำเนินการชำระเงินต่อ",unavailable:"ไม่พร้อมให้บริการ",check_eligibility:"เมื่อคุณดำเนินการต่อ ข้อมูลของคุณจะถูกแชร์กับ Affirm <br/> การตรวจสอบคุณสมบัติจะไม่ส่งผลต่อเครดิตของคุณ ",apr:"อัตราร้อยละต่อปี",interest:"ดอกเบี้ย",total:"ยอดรวม",processing:"กำลังประมวลผลคำขอของคุณ",processing_time:"การดำเนินการนี้จะใช้เวลาไม่เกิน 1 นาที...",split_pay_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> ทุก 2 สัปดาห์</span>',other_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> ทุกเดือน</span>',split_pay_number_of_terms:"&nbsp;เป็นเวลา {numberOfTerms} สัปดาห์",other_number_of_terms:"&nbsp;เป็นเวลา {numberOfTerms} เดือน"},prequal_contents:{unavailable:"ไม่พร้อมให้บริการ",check:"ตรวจสอบว่าคุณมีคุณสมบัติเหมาะสมหรือไม่"},legal:{ca_residents_notice:"ผู้ที่อาศัยอยู่ในแคลิฟอร์เนีย: เงินกู้ที่ให้บริการโดย Affirm Loan Services, LLC ได้จัดทำหรือจัดการตามใบอนุญาตตามกฎหมายผู้ให้กู้ยืมเงินของแคลิฟอร์เนีย (California Finance Lender)",rates_from_apr:'อัตราเริ่มต้นอยู่ที่ 0-36% ต่อปี ตัวเลือกการชำระเงินผ่าน Affirm นั้นขึ้นอยู่กับการตรวจสอบสิทธิ์ อาจไม่สามารถใช้งานได้ในทุกรัฐ และให้บริการโดยพาร์ทเนอร์ผู้ให้กู้ยืมเงินเหล่านี้: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a> โดยตัวเลือกเหล่านี้จะขึ้นอยู่กับยอดการซื้อของคุณ และอาจต้องมีการชำระเงินดาวน์',interest_and_split_pay:"จำนวนเงินที่ชำระโดยประมาณไม่รวมภาษีและค่าจัดส่ง",split_pay_only:"จำนวนเงินที่ชำระโดยประมาณไม่รวมภาษีและค่าจัดส่ง ตัวเลือกการชำระเงินจะให้บริการโดย Affirm และต้องได้รับการตรวจสอบสิทธิ์การใช้งานก่อน ทั้งนี้ อาจไม่สามารถใช้งานได้ในทุกรัฐ",ineligible:"ตัวเลือกการชำระเงินจะให้บริการโดย Affirm และต้องได้รับการตรวจสอบสิทธิ์การใช้งานก่อน ทั้งนี้ อาจไม่สามารถใช้งานได้ในทุกรัฐ",dynamic_pdp:'จำนวนเงินที่ชำระโดยประมาณไม่รวมภาษีและค่าจัดส่ง โดยอัตราอยู่ในช่วง 0-36% ต่อปี ตัวเลือกการชำระเงินผ่านการผ่อนชำระผ่าน Shop Pay นั้นขึ้นอยู่กับการตรวจสอบสิทธิ์ และให้บริการโดยพาร์ทเนอร์สำหรับการผ่อนชำระเหล่านี้: <a class="help_text__link" href="https://www.affirm.com/lenders" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a> โดยตัวเลือกเหล่านี้จะขึ้นอยู่กับยอดการซื้อของคุณ และอาจต้องมีการชำระเงินดาวน์ ทั้งนี้อาจมีตัวเลือกเพิ่มเติมให้ใช้งานเมื่อได้รับการอนุมัติ ประกาศของรัฐสำหรับแจ้งแก่ผู้บริโภค: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/licenses</a>'}};var ZP={affirm:WP,shopPay:UP,banner:HP,modal:KP},GP=Object.freeze({__proto__:null,affirm:WP,banner:HP,default:ZP,modal:KP,shopPay:UP});const JP="Affirm",YP="Shop Pay",QP={learn_more:"Daha fazla bilgi edinin",view_sample_plans:"Örnek planları görüntüle",prequal:"Satın alma gücünüzü kontrol edin",split_pay_eligible:"{shopPayLogo} ile <b>{price}</b> tutarında faizsiz 4 taksitle ödeyin",interest_only_eligible:"{shopPayLogo} ile satın alımınızı aylık taksitlere bölün",dynamic_interest_only_eligible:"{shopPayLogo} ile ayda <b>{price}</b> tutarından başlayan taksitlerle",pay_in_4_or_as_low_as_eligible:"{shopPayLogo} ile faizsiz 4 taksitle veya ayda <b>{price}</b> tutarından başlayan fiyatlarla",zero_interest_eligible:"{shopPayLogo} ile ayda <b>{price}</b> tutarından başlayan fiyatlarla veya %0 yıllık yüzdesel oranla",zero_interest_eligible_zero_apr:"{shopPayLogo} ile %0 faiz ve ayda <b>{price}</b> tutarından başlayan fiyatlarla",non_eligible_min:"<b>{minPrice}</b> tutarını aşan siparişler için {shopPayLogo} ile faizsiz 4 taksitle ödeyin",non_eligible_monthly_payments_min:"<b>{minPrice}</b> tutarını aşan siparişler için {shopPayLogo} ile satın alımınızı aylık taksitlere bölün",non_eligible_max:"<b>{maxPrice}</b> tutarını aşmayan siparişler için {shopPayLogo} ile satın alımınızı taksitlere bölün",prequal_contents:{not_prequalified_see_plans:"Satın alma gücünüzü kontrol edin",prequalified_see_plans:"Planları görüntüle",purchasing_power_a:"Satın alma gücünüz: ",purchasing_power_b:"Şu tutara kadar herhangi bir harcama yapabilirsiniz: "},split_pay_eligible_2:"{shopPayLogo} ile <b>{price}</b> tutarında faizsiz 2 taksitle ödeyin",split_pay_eligible_30:"{shopPayLogo} ile <b>{price}</b> tutarını faizsiz 30 gün içinde ödeyin",non_eligible_min_over_time:"{shopPayLogo} ile <b>{minPrice}</b> tutarının üzerindeki siparişlerin ödemesini zamana yayın",non_eligible_min_over_time_30:"<b>{minPrice}</b> tutarını aşan siparişler için {shopPayLogo} ile faizsiz 30 gün içinde ödeme yapın"},XP={title:"Şimdi alın, daha sonra ödeyin",subtitle:{interest_and_split_pay:'Ödeme planınızı ödeme sırasında seçin; 2 haftada bir <span class="tagline__bold">{splitPayLoanRepayment}</span> tutarından başlayan 4 faizsiz ödeme yapabilirsiniz.',interest_only:"Satın alımınızı aylık taksitlere bölmek için ödeme sırasında ödeme planınızı seçin.",split_pay_only:'Satın alımınızı 2 haftada bir <span class="tagline__bold">{splitPayLoanRepayment}</span> tutarında 4 faizsiz ödemeye bölmek için ödeme sırasında taksitli ödemeyi seçin.',ineligible_min:"{minPrice} tutarını aşan siparişlerde, satın alımınızı 4 faizsiz ödemeye bölmek için ödeme sırasında taksitli ödemeyi seçin.",ineligible_monthly_payments_min:"{minPrice} tutarını aşan siparişlerde, satın alımınızı aylık ödemelere bölmek için ödeme sırasında taksitli ödemeyi seçin.",ineligible_max:"{maxPrice} tutarını aşmayan siparişlerde, satın alımınızı birden fazla ödemeye bölmek için ödeme sırasında taksitli ödemeyi seçin.",dynamic_pdp:{one:"<b>{priceWithoutInterest}</b> tutarında bir satın alım için örnek plan",other:"<b>{priceWithoutInterest}</b> tutarında bir satın alım için örnek planlar"},split_pay_only_2:'Satın alımınızı 15 günde bir <span class="tagline__bold">{splitPayLoanRepayment}</span> tutarında 2 faizsiz ödemeye bölmek için ödeme sayfasında taksitli ödemeyi seçin.',split_pay_only_30:"<b>{price}</b> tutarındaki satın alımınızı 30 gün içinde faizsiz olarak ödemek için ödeme sayfasında taksitli ödemeyi seçin.",ineligible_min_over_time:"{minPrice} tutarının üzerindeki siparişlerde, satın alımınızın ödemesini zamana yaymak için ödeme sayfasında taksitli ödemeyi seçin."},close:"Kapat",new_window:"Yeni bir pencerede açılır.",partnership:"{affirmLogo} ortaklığıyla sunulan taksitler",partnership_disclaimer:"{affirmLogo} ortaklığıyla sunulan taksitler. Affirm tarafından çeviri hizmeti sunulmaz. Affirm ve teklifleri için İngilizce dilinde destek sağlanır.",split_pay_contents:{interest_fees:"Hiçbir zaman gizli ücretler yoktur.",interest_credit:"Başvuru yapmanın kredi puanınıza hiçbir etkisi yoktur.",no_interest_fees:"Hiçbir zaman ücret alınmaz.",no_interest_credit:"Başvuru yapmanın kredi puanınıza hiçbir etkisi yoktur."},sample_plan_contents:{continue_to_checkout:"Ödeme sayfasına git",unavailable:"Kullanılamıyor",check_eligibility:"Devam etmeniz halinde bilgileriniz Affirm ile paylaşılır.<br/> Uygunluk durumunuzun kontrol edilmesi, kredi durumunuzu etkilemez. ",apr:"Yılık yüzdesel oran",interest:"Faiz",total:"Toplam",processing:"Talebiniz işleniyor",processing_time:"Bu işlem bir dakika kadar sürebilir...",split_pay_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> her iki haftada</span>',other_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> her iki ayda</span>',split_pay_number_of_terms:"&nbsp;{numberOfTerms} hafta boyunca",other_number_of_terms:"&nbsp;{numberOfTerms} ay boyunca"},prequal_contents:{unavailable:"Kullanılamıyor",check:"Şartları karşılayıp karşılamadığınızı kontrol edin"},legal:{ca_residents_notice:"Kaliforniya'da İkamet Edenler: Affirm Loan Services, LLC şirketi tarafından verilen krediler Kaliforniya Finans Borç Veren lisansı uyarınca oluşturulur veya düzenlenir.",rates_from_apr:'%0-36 arasında değişen yıllık oranlar. Affirm aracılığıyla sunulan ödeme seçenekleri uygunluk kontrolüne tabidir, tüm eyaletlerde kullanılamayabilir ve borç veren şu iş ortakları tarafından sağlanmaktadır: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Seçenekler, satın alım tutarına bağlıdır ve ön ödeme gerekli olabilir.',interest_and_split_pay:"Ödenecek tahmini miktara vergiler ve kargo dahil değildir.",split_pay_only:"Ödenecek tahmini miktara vergiler ve kargo dahil değildir. Ödeme seçenekleri Affirm tarafından sunulur, bir uygunluk kontrolüne tabidir ve her eyalette kullanılamayabilir.",ineligible:"Ödeme seçenekleri Affirm tarafından sunulur, bir uygunluk kontrolüne tabidir ve her eyalette kullanılamayabilir.",dynamic_pdp:'Ödenecek tahmini miktara vergiler ve kargo dahil değildir. Faiz oranları %0-%36 arasında değişir. Shop Pay Installments aracılığıyla sunulan ödeme seçenekleri, uygunluk kontrolüne tabidir ve borç veren şu iş ortakları tarafından sağlanır: <a class="help_text__link" href="https://www.affirm.com/lenders" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Seçenekler, satın alım tutarına bağlıdır ve ön ödeme gerekli olabilir. Onay verilmesi halinde daha fazla seçenek sunulabilir. Tüketicilere yönelik eyalet bildirimleri: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/licenses</a>.'}};var eS={affirm:JP,shopPay:YP,banner:QP,modal:XP},tS=Object.freeze({__proto__:null,affirm:JP,banner:QP,default:eS,modal:XP,shopPay:YP});const nS="Affirm",iS="Shop Pay",aS={learn_more:"Tìm hiểu thêm",view_sample_plans:"Xem gói mẫu",prequal:"Kiểm tra sức mua của bạn",split_pay_eligible:"Thanh toán thành 4 đợt trả góp không lãi suất <b>{price}</b> qua {shopPayLogo}",interest_only_eligible:"Chia giao dịch mua thành các đợt trả góp hằng tháng với {shopPayLogo}",dynamic_interest_only_eligible:"Từ <b>{price}</b>/tháng với {shopPayLogo}",pay_in_4_or_as_low_as_eligible:"4 đợt trả góp không lãi suất hoặc từ <b>{price}</b>/tháng với {shopPayLogo}",zero_interest_eligible:"Từ <b>{price}</b>/tháng hoặc 0% APR với {shopPayLogo}",zero_interest_eligible_zero_apr:"Từ <b>{price}</b>/tháng ở mức 0% APR với {shopPayLogo}",non_eligible_min:"Thanh toán thành 4 đợt trả góp không lãi suất cho đơn hàng trên <b>{minPrice}</b> với {shopPayLogo}",non_eligible_monthly_payments_min:"Chia giao dịch mua thành các đợt trả góp hằng tháng cho đơn hàng trên <b>{minPrice}</b> với {shopPayLogo}",non_eligible_max:"Chia giao dịch mua thành các đợt trả góp cho đơn hàng lên tới <b>{maxPrice}</b> với {shopPayLogo}",prequal_contents:{not_prequalified_see_plans:"Kiểm tra sức mua của bạn",prequalified_see_plans:"Xem gói",purchasing_power_a:"Sức mua của bạn là ",purchasing_power_b:"Chi tiêu số tiền bất kỳ lên tới "},split_pay_eligible_2:"Thanh toán thành 2 đợt trả góp không lãi suất <b>{price}</b> qua {shopPayLogo}",split_pay_eligible_30:"Thanh toán <b>{price}</b> miễn lãi trong vòng 30 ngày bằng {shopPayLogo}",non_eligible_min_over_time:"Trả góp cho đơn hàng trên <b>{minPrice}</b> qua {shopPayLogo}",non_eligible_min_over_time_30:"Thanh toán miễn lãi trong vòng 30 ngày cho đơn hàng trên <b>{minPrice}</b> bằng {shopPayLogo}"},oS={title:"Nhận hàng ngay, thanh toán sau",subtitle:{interest_and_split_pay:'Chọn lịch trả góp khi thanh toán &#8211; bắt đầu với 4 đợt thanh toán không lãi suất <span class="tagline__bold">{splitPayLoanRepayment}</span> 2 tuần một lần.',interest_only:"Chọn lịch trả góp khi thanh toán để chia giao dịch mua của bạn thành các đợt trả góp hằng tháng.",split_pay_only:'Chọn trả góp khi thanh toán để chia giao dịch mua của bạn thành 4 đợt thanh toán không lãi suất <span class="tagline__bold">{splitPayLoanRepayment}</span> 2 tuần một lần.',ineligible_min:"Đối với các đơn hàng trên {minPrice}, hãy chọn trả góp khi thanh toán để chia giao dịch mua của bạn thành 4 đợt thanh toán không lãi suất.",ineligible_monthly_payments_min:"Đối với các đơn hàng trên {minPrice}, hãy chọn trả góp khi thanh toán để chia giao dịch mua của bạn thành các đợt thanh toán hằng tháng.",ineligible_max:"Đối với các đơn hàng lên tới {maxPrice}, hãy chọn trả góp khi thanh toán để chia giao dịch mua của bạn thành nhiều đợt thanh toán.",dynamic_pdp:{one:"Gói mẫu cho giao dịch mua trị giá <b>{priceWithoutInterest}</b>",other:"Gói mẫu cho giao dịch mua trị giá <b>{priceWithoutInterest}</b>"},split_pay_only_2:'Chọn trả góp khi thanh toán để chia giao dịch mua của bạn thành 2 đợt thanh toán không lãi suất <span class="tagline__bold">{splitPayLoanRepayment}</span> cách nhau 15 ngày.',split_pay_only_30:"Chọn trả góp khi thanh toán để thanh toán không lãi suất cho giao dịch mua trị giá <b>{price}</b> của bạn trong vòng 30 ngày.",ineligible_min_over_time:"Đối với các đơn hàng trên {minPrice}, hãy chọn trả góp khi thanh toán để chia giao dịch mua của bạn thành nhiều đợt thanh toán."},close:"Đóng",new_window:"Mở trong cửa sổ mới.",partnership:"Dịch vụ Trả góp hợp tác cùng {affirmLogo}",partnership_disclaimer:"Trả góp theo hợp tác với {affirmLogo}. Affirm không cung cấp dịch vụ dịch thuật. Affirm và các dịch vụ của mình chỉ hỗ trợ tiếng Anh.",split_pay_contents:{interest_fees:"Không bao giờ có phí ẩn.",interest_credit:"Không ảnh hưởng đến điểm tín dụng khi áp dụng.",no_interest_fees:"Không mất phí, tùy chọn trước nay chưa từng có.",no_interest_credit:"Không ảnh hưởng đến điểm tín dụng khi áp dụng."},sample_plan_contents:{continue_to_checkout:"Tiếp tục thanh toán",unavailable:"Không khả dụng",check_eligibility:"Khi chọn tiếp tục, thông tin của bạn sẽ được chia sẻ với Affirm. <br/> Kiểm tra tính đủ điều kiện sẽ không ảnh hưởng đến điểm tín dụng của bạn. ",apr:"APR",interest:"Lãi",total:"Tổng",processing:"Đang xử lý yêu cầu của bạn",processing_time:"Quá trình này có thể mất tối đa một phút...",split_pay_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> 2 tuần một lần</span>',other_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> mỗi tháng</span>',split_pay_number_of_terms:"&nbsp;trong {numberOfTerms} tuần",other_number_of_terms:"&nbsp;trong {numberOfTerms} tháng"},prequal_contents:{unavailable:"Không khả dụng",check:"Kiểm tra xem bạn có đủ điều kiện không"},legal:{ca_residents_notice:"Cư dân California: Các khoản vay từ Affirm Loan Services, LLC được lập hoặc bố trí theo giấy phép Cho vay tài chính California.",rates_from_apr:'Mức phí từ 0-36% APR. Phương thức thanh toán qua Affirm được xác định theo kiểm tra tính hợp lệ, có thể không được hỗ trợ tại tất cả các tiểu bang và do các đối tác cho vay sau cung cấp: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Các phương thức phụ thuộc vào số tiền mua hàng của bạn và có thể yêu cầu một khoản tiền trả trước.',interest_and_split_pay:"Số tiền thanh toán ước tính chưa bao gồm thuế và phí vận chuyển.",split_pay_only:"Số tiền thanh toán ước tính chưa bao gồm thuế và phí vận chuyển. Phương thức thanh toán do Affirm cung cấp và phụ thuộc vào kiểm tra tư cách hợp lệ cũng như có thể không được hỗ trợ tại tất cả các tiểu bang.",ineligible:"Phương thức thanh toán do Affirm cung cấp và phụ thuộc vào kiểm tra tư cách hợp lệ cũng như có thể không được hỗ trợ tại tất cả các tiểu bang.",dynamic_pdp:'Số tiền thanh toán ước tính chưa bao gồm thuế và phí vận chuyển. Mức phí từ 0-36% APR. Phương thức thanh toán qua Shop Pay Trả góp phụ thuộc vào việc kiểm tra tư cách hợp lệ và được các đối tác cho vay sau đây cung cấp: <a class="help_text__link" href="https://www.affirm.com/lenders" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>. Các phương thức phụ thuộc vào số tiền mua hàng của bạn và có thể yêu cầu một khoản tiền trả trước. Các phương thức khác có thể hiển thị sau khi được phê duyệt. Thông báo của tiểu bang tới khách hàng: <a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/licenses</a>.'}};var sS={affirm:nS,shopPay:iS,banner:aS,modal:oS},rS=Object.freeze({__proto__:null,affirm:nS,banner:aS,default:sS,modal:oS,shopPay:iS});const lS="Affirm",cS="Shop Pay",pS={learn_more:"详细了解",view_sample_plans:"查看示例计划",prequal:"查看您的购买能力",split_pay_eligible:"使用 {shopPayLogo} 支付 4 期免息分期付款，每期 <b>{price}</b>",interest_only_eligible:"使用 {shopPayLogo} 将您的购买金额拆分为按月分期付款",dynamic_interest_only_eligible:"使用 {shopPayLogo} 支付 <b>{price}</b>/月起",pay_in_4_or_as_low_as_eligible:"使用 {shopPayLogo} 支付 4 笔免息付款，或支付 <b>{price}</b>/月起",zero_interest_eligible:"使用 {shopPayLogo} 支付 <b>{price}</b>/月或 0% APR 起",zero_interest_eligible_zero_apr:"使用 {shopPayLogo} 支付 <b>{price}</b>/月(0% APR) 起",non_eligible_min:"使用 {shopPayLogo} 为超过 <b>{minPrice}</b> 的订单支付 4 笔免息分期付款",non_eligible_monthly_payments_min:"使用 {shopPayLogo} 将超过 <b>{minPrice}</b> 的订单购买金额拆分为按月分期付款",non_eligible_max:"使用 {shopPayLogo} 将不超过 <b>{maxPrice}</b> 的订单购买金额拆分为分期付款",prequal_contents:{not_prequalified_see_plans:"查看您的购买力",prequalified_see_plans:"查看套餐",purchasing_power_a:"您的购买力为 ",purchasing_power_b:"最高消费金额为 "},split_pay_eligible_2:"使用 {shopPayLogo} 支付 2 期免息分期付款，每期 <b>{price}</b>",split_pay_eligible_30:"使用 {shopPayLogo} 在 30 天内免息支付 <b>{price}</b>",non_eligible_min_over_time:"使用 {shopPayLogo} 分期支付超过 <b>{minPrice}</b> 的订单",non_eligible_min_over_time_30:"使用 {shopPayLogo} 对超过 <b>{minPrice}</b> 的订单在 30 天内免息付款"},dS={title:"现在购买，以后支付",subtitle:{interest_and_split_pay:'在结账时选择付款安排 &#8211; 起付标准：4 笔免息付款，每 2 周支付 <span class="tagline__bold">{splitPayLoanRepayment}</span>。',interest_only:"在结账时选择付款安排以将购买金额拆分为按月分期付款。",split_pay_only:'在结账时选择分期付款以将您的购买金额拆分为 4 笔免息付款，每 2 周支付 <span class="tagline__bold">{splitPayLoanRepayment}</span>。',ineligible_min:"对于超过 {minPrice} 的订单，请在结账时选择分期付款，以将购买金额拆分为 4 笔免息付款。",ineligible_monthly_payments_min:"对于超过 {minPrice} 的订单，请在结账时选择分期付款，以将购买金额拆分为按月付款。",ineligible_max:"对于不超过 {maxPrice} 的订单，请在结账时选择分期付款，以将购买金额拆分为多笔付款。",dynamic_pdp:{one:"<b>{priceWithoutInterest}</b> 购买金额的示例计划",other:"<b>{priceWithoutInterest}</b> 购买金额的示例计划"},split_pay_only_2:'在结账时选择分期付款以将您的购买金额拆分为 2 笔免息付款，每 15 天支付 <span class="tagline__bold">{splitPayLoanRepayment}</span>。',split_pay_only_30:"在结账时选择分期付款以在 30 天内支付购买金额 <b>{price}</b> 且没有利息。",ineligible_min_over_time:"对于超过 {minPrice} 的订单，请在结账时选择分期付款，以便分期支付购买金额。"},close:"关闭",new_window:"在新窗口中打开。",partnership:"与 {affirmLogo} 合作提供分期付款",partnership_disclaimer:"与 {affirmLogo} 合作提供分期付款。Affirm 不提供翻译服务。Affirm 及其产品/服务仅提供英文支持。",split_pay_contents:{interest_fees:"没有隐藏费用，自始至终。",interest_credit:"申请不会影响信用评分。",no_interest_fees:"没有费用，自始至终。",no_interest_credit:"申请不会影响信用评分。"},sample_plan_contents:{continue_to_checkout:"继续结账",unavailable:"不可用",check_eligibility:"如果继续，您的信息将被分享给 Affirm。<br/>检查资格情况不会影响您的信用评分。 ",apr:"APR",interest:"利息",total:"总计",processing:"正在处理您的申请",processing_time:"这可能最多需要 1 分钟...",split_pay_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> 每 2 周</span>',other_frequency:'<b class="list-item__price-per-term">{pricePerTerm}</b>&nbsp;<span class="list-item__frequency"> 每月</span>',split_pay_number_of_terms:"x {numberOfTerms} 周",other_number_of_terms:"x {numberOfTerms} 个月"},prequal_contents:{unavailable:"不可用",check:"查看您是否符合条件"},legal:{ca_residents_notice:"加利福尼亚州居民：Affirm Loan Services 有限责任公司的贷款根据加利福尼亚金融借贷许可 (California Finance Lender license) 进行或安排。",rates_from_apr:'费率为 0-36% APR。Affirm 的支付选项需要进行资格检查，可能并非在所有州都可用，并且支付选项由这些贷款合作伙伴提供：<a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>。选项取决于您的购买金额，并且可能需要支付首付款。',interest_and_split_pay:"预计支付金额中不含税费和运费。",split_pay_only:"预计支付金额中不含税费和运费。支付选项由 Affirm 提供，并需要资格检查，可能并非在所有州都可用。",ineligible:"支付选项由 Affirm 提供，并需要资格检查，可能并非在所有州都可用。",dynamic_pdp:'预计支付金额中不含税费和运费。费率为 0-36% APR。Shop Pay 分期付款的支付选项需要进行资格检查，支付选项由这些借贷合作伙伴提供：<a class="help_text__link" href="https://www.affirm.com/lenders" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>。选项取决于您的购买金额，并且可能需要支付首付款。获得批准后可能可以使用更多选项。美国面向消费者的声明：<a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/licenses</a>。'}};var uS={affirm:lS,shopPay:cS,banner:pS,modal:dS},mS=Object.freeze({__proto__:null,affirm:lS,banner:pS,default:uS,modal:dS,shopPay:cS});const hS="Affirm",_S="Shop Pay",gS={learn_more:"瞭解詳情",view_sample_plans:"檢視範例方案",prequal:"檢視您的購買力",split_pay_eligible:"使用 {shopPayLogo} 分 4 期零利率支付 <b>{price}</b>",interest_only_eligible:"使用 {shopPayLogo} 按月分期支付購買金額",dynamic_interest_only_eligible:"使用 {shopPayLogo} 每月支付 <b>{price}</b> 起",pay_in_4_or_as_low_as_eligible:"使用 {shopPayLogo} 分 4 期零利率付款，或每月支付 <b>{price}</b> 起",zero_interest_eligible:"使用 {shopPayLogo} 每月支付 <b>{price}</b> 起或享 0% APR",zero_interest_eligible_zero_apr:"使用 {shopPayLogo} 每月支付 <b>{price}</b> 起即享 0% APR",non_eligible_min:"使用 {shopPayLogo}，分 4 期零利率支付超過 <b>{minPrice}</b> 的訂單款項",non_eligible_monthly_payments_min:"使用 {shopPayLogo}，按月分期支付金額超過 <b>{minPrice}</b> 的訂單款項",non_eligible_max:"使用 {shopPayLogo}，分期支付金額最高 <b>{maxPrice}</b> 的訂單款項",prequal_contents:{not_prequalified_see_plans:"檢視您的購買力",prequalified_see_plans:"查看方案",purchasing_power_a:"您的購買力為 ",purchasing_power_b:"消費金額上限 "},split_pay_eligible_2:"使用 {shopPayLogo} 分 2 期零利率支付 <b>{price}</b>",split_pay_eligible_30:"使用 {shopPayLogo} 在 30 天內零利率支付 <b>{price}</b>",non_eligible_min_over_time:"使用 {shopPayLogo} 為超過 <b>{minPrice}</b> 的訂單後續付款",non_eligible_min_over_time_30:"使用 {shopPayLogo}，在 30 天內零利率支付 <b>{minPrice}</b> 的訂單"},fS={title:"先下單，後付款",subtitle:{interest_and_split_pay:'結帳時選擇付款排程：從分 4 期零利率支付 <span class="tagline__bold">{splitPayLoanRepayment}</span> (隔週付款) 開始。',interest_only:"結帳時選擇付款排程，按月分期支付您的購買金額。",split_pay_only:'結帳時選取分期付款，分 4 期零利率支付購買金額 <span class="tagline__bold">{splitPayLoanRepayment}</span> (隔週付款)。',ineligible_min:"針對超過 {minPrice} 的訂單款項在結帳時選取分期付款，並分 4 期零利率支付此筆購買金額。",ineligible_monthly_payments_min:"針對超過 {minPrice} 的訂單款項在結帳時選取分期付款，按月分期支付此筆購買金額。",ineligible_max:"針對最高 {maxPrice} 的訂單款項在結帳時選取分期付款，以便分期支付此筆購買金額。",dynamic_pdp:{one:"購買金額 <b>{priceWithoutInterest}</b> 的範例方案",other:"購買金額 <b>{priceWithoutInterest}</b> 的範例方案"},split_pay_only_2:'結帳時選取分期付款，分 2 期零利率支付購買金額 <span class="tagline__bold">{splitPayLoanRepayment}</span> (每 15 天付款)。',split_pay_only_30:"結帳時選取分期付款，在 30 天內零利率支付此筆購買金額 <b>{price}</b>。",ineligible_min_over_time:"針對超過 {minPrice} 的訂單款項在結帳時選取分期付款，後續支付此筆購買金額。"},close:"關閉",new_window:"在新視窗中開啟。",partnership:"{affirmLogo} 是分期付款服務合作夥伴",partnership_disclaimer:"{affirmLogo} 是分期付款服務合作夥伴。Affirm 未提供翻譯服務。Affirm 及其服務只提供英文支援。",split_pay_contents:{interest_fees:"絕對沒有隱藏費用。",interest_credit:"不會影響您申請時的信用評分。",no_interest_fees:"絕對不收取額外費用。",no_interest_credit:"不會影響您申請時的信用評分。"},sample_plan_contents:{continue_to_checkout:"繼續結帳流程",unavailable:"無可用資料",check_eligibility:"若繼續進行，您的資訊將與 Affirm 分享。<br/>確認資格並不會影響您的信用。 ",apr:"總費用年百分率 (APR)",interest:"利息",total:"總計",processing:"正在處理您的要求",processing_time:"最多可能需要 5 分鐘...",split_pay_frequency:'<span class="list-item__frequency">每 2 週</span>&nbsp;<b class="list-item__price-per-term">{pricePerTerm}</b>',other_frequency:'<span class="list-item__frequency">每月</span>&nbsp;<b class="list-item__price-per-term">{pricePerTerm}</b>',split_pay_number_of_terms:"&nbsp;共 {numberOfTerms} 週",other_number_of_terms:"&nbsp;共 {numberOfTerms} 個月"},prequal_contents:{unavailable:"無可用資料",check:"確認您是否符合資格"},legal:{ca_residents_notice:"加州居民：Affirm Loan Services, LLC 提供的貸款是根據加州金融貸款機構許可來核發或安排。",rates_from_apr:'總費用年百分率 (APR) 為 0-36%。Affirm 支援的付款選項必須通過資格檢查，並非所有州別皆適用，且由貸款合作夥伴提供：<a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>。可用選項視購買金額而定，可能須支付頭期款。',interest_and_split_pay:"預估的付款金額不含稅金與運費。",split_pay_only:"預估的付款金額不含稅金與運費。付款選項由 Affirm 提供且必須通過資格檢查，並非所有州別皆適用。",ineligible:"付款選項由 Affirm 提供且必須通過資格檢查，並非所有州別皆適用。",dynamic_pdp:'預估的付款金額不含稅金與運費。總費用年百分率 (APR) 為 0-36%。Shop Pay 分期付款選項必須通過資格檢查，且由貸款合作夥伴提供：<a class="help_text__link" href="https://www.affirm.com/lenders" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/lenders</a>。可用選項視購買金額而定，可能須支付頭期款。通過核准後，即可使用更多選項。州政府給消費者的通知事項：<a class="help_text__link" href="https://www.affirm.com/licenses" target="_blank" aria-describedby="shopify-payment-terms-modal-warning-text">affirm.com/licenses</a>。'}};var bS={affirm:hS,shopPay:_S,banner:gS,modal:fS},yS=Object.freeze({__proto__:null,affirm:hS,banner:gS,default:bS,modal:fS,shopPay:_S})}();
        //# sourceMappingURL=client.js.map