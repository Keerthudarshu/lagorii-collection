(function() {
    const API_URL =
        "https://storage.googleapis.com/lagorii-exchange-rates/exchange-rates.json";
    const currencySelector = document.getElementById("CurrencySelectorSelect");

    if (!currencySelector) return;

    const getCurrencySymbol = (code) =>
        ({
            INR: "₹",
            USD: "$",
            EUR: "€",
            GBP: "£",
            CAD: "CA$",
            SAR: "﷼",
            AED: "د.إ",
            AUD: "A$",
            NZD: "NZ$",
            QAR: "ر.ق",
            SGD: "S$",
            ZAR: "R",
            LKR: "Rs",
            MYR: "RM",
        }[code] || code);

    let exchangeRates = {};

    function updateAllMoneyElements() {
        const selectedCurrency = currencySelector.value || "INR";
        const symbol = getCurrencySymbol(selectedCurrency);
        const rate =
            selectedCurrency === "INR" ? 1 : exchangeRates[selectedCurrency];

        if (!rate) return;

        document.querySelectorAll(".money").forEach((el) => {
            // Skip empty or invalid money tags
            if (!el.textContent || el.textContent.trim() === "") return;

            // Store original price if not yet stored
            if (!el.dataset.originalPrice) {
                const match = el.textContent.match(/([\d,]+\.\d{2})/);
                if (match) {
                    el.dataset.originalPrice = parseFloat(match[1].replace(/,/g, ""));
                }
            }

            const base = parseFloat(el.dataset.originalPrice);
            if (!isFinite(base)) return;

            const converted = selectedCurrency === "INR" ? base : base * rate;
            const formatted = `${symbol}${Math.round(converted).toLocaleString(
        "en-US"
      )}`;

            if (el.textContent !== formatted) {
                el.textContent = formatted;
            }
        });
    }

    function observeMutations(selector) {
        const target = document.querySelector(selector);
        if (!target) return;
        const observer = new MutationObserver(updateAllMoneyElements);
        observer.observe(target, {
            childList: true,
            subtree: true
        });
    }

    // Event: Currency changed
    currencySelector.addEventListener("change", () => {
        localStorage.setItem("selectedCurrency", currencySelector.value);
        updateAllMoneyElements();
    });

    // Fetch exchange rates and kick off price updates
    fetch(API_URL)
        .then((res) => res.json())
        .then((data) => {
            exchangeRates = data.conversion_rates;
            updateAllMoneyElements();
        })
        .catch(() => {});

    // Watch price-related DOM areas
    observeMutations(".productView-price");
    observeMutations(".qsc2-drawer-wrapper");

    // Fallback periodic updates
    setInterval(updateAllMoneyElements, 2000);
})();