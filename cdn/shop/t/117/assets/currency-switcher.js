document.addEventListener("DOMContentLoaded", () => {
    const dropdown = document.getElementById("currencySelected");
    const options = document.getElementById("currencyOptions");
    const nativeSelect = document.getElementById("CurrencySelectorSelect");

    if (!dropdown || !options || !nativeSelect) return;

    // Restore from localStorage or fallback to select value
    const initialCode =
        localStorage.getItem("selectedCurrency") || nativeSelect.value;
    const initialOption = options.querySelector(`li[data-code="${initialCode}"]`);
    if (initialOption) {
        const initialFlag = initialOption.dataset.flag;
        nativeSelect.value = initialCode;
        dropdown.innerHTML = `<img src="${initialFlag}" alt="${initialCode}"><span>${initialCode}</span>`;
    }

    dropdown.style.visibility = "visible";

    // Toggle options
    dropdown.addEventListener("click", (e) => {
        e.stopPropagation();
        options.style.display =
            options.style.display === "block" ? "none" : "block";
    });

    // Handle selection
    options.querySelectorAll("li").forEach((item) => {
        item.addEventListener("click", () => {
            const code = item.dataset.code;
            const flag = item.dataset.flag;

            dropdown.innerHTML = `<img src="${flag}" alt="${code}"><span>${code}</span>`;
            nativeSelect.value = code;
            localStorage.setItem("selectedCurrency", code);
            nativeSelect.dispatchEvent(new Event("change"));
            options.style.display = "none";
        });
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".currency-dropdown")) {
            options.style.display = "none";
        }
    });
});