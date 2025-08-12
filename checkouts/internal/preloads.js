(function() {
    var cdnOrigin = "https://cdn.shopify.com";
    var scripts = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1/polyfills.i4n1wfLs.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1/app.DelmFtvb.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1/en.DYQnO5kM.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1/page-OnePage.DaA15XJe.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1/DeliveryMethodSelectorSection.B5FzNBy0.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1/useUiComponentsColorContrast.CW7cDDfx.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1/VaultedPayment.CpNLaVRB.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1/LocalizationExtensionField.CU3HGp42.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1/ShopPayOptInDisclaimer.BIhtBbBP.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1/ShipmentBreakdown.nQaFs6Fx.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1/MerchandiseModal.fkQVrh-w.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1/StackedMerchandisePreview.DzSd0Skr.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1/PayButtonSection.Ck9wEVSc.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1/component-ShopPayVerificationSwitch.CvmhpTR2.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1/useSubscribeMessenger.CylCak1i.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1/index.Ditf5Ivg.js"];
    var styles = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1/assets/app.BXY75vvS.css", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1/assets/OnePage.PMX4OSBO.css", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1/assets/DeliveryMethodSelectorSection.Cx21oFfE.css", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1/assets/VaultedPayment.OxMVm7u-.css", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1/assets/StackedMerchandisePreview.CKAakmU8.css", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1/assets/ShopPayVerificationSwitch.DW7NMDXG.css"];
    var fontPreconnectUrls = [];
    var fontPrefetchUrls = [];
    var imgPrefetchUrls = ["https://cdn.shopify.com/s/files/1/0572/8685/2744/files/Lagorii_Website_Logo-01_x320.png?v=1668261355"];

    function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
    }

    function preconnectAssets() {
        var resources = [cdnOrigin].concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
            var res = resources[index++];
            if (res) preconnect(res, next);
        })();
    }

    function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
            link.rel = 'prefetch';
            link.fetchPriority = 'low';
            link.as = as;
            if (as === 'font') link.type = 'font/woff2';
            link.href = url;
            link.crossOrigin = '';
            link.onload = link.onerror = callback;
            document.head.appendChild(link);
        } else {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onloadend = callback;
            xhr.send();
        }
    }

    function prefetchAssets() {
        var resources = [].concat(
            scripts.map(function(url) {
                return [url, 'script'];
            }),
            styles.map(function(url) {
                return [url, 'style'];
            }),
            fontPrefetchUrls.map(function(url) {
                return [url, 'font'];
            }),
            imgPrefetchUrls.map(function(url) {
                return [url, 'image'];
            })
        );
        var index = 0;

        function run() {
            var res = resources[index++];
            if (res) prefetch(res[0], res[1], next);
        }
        var next = (self.requestIdleCallback || setTimeout).bind(self, run);
        next();
    }

    function onLoaded() {
        try {
            if (parseFloat(navigator.connection.effectiveType) > 2 && !navigator.connection.saveData) {
                preconnectAssets();
                prefetchAssets();
            }
        } catch (e) {}
    }

    if (document.readyState === 'complete') {
        onLoaded();
    } else {
        addEventListener('load', onLoaded);
    }
})();