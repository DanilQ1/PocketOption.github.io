document.addEventListener("DOMContentLoaded", () => {
    if (window.Telegram && Telegram.WebApp) {
        Telegram.WebApp.expand();
    }

    // Получаем элементы
    const startBtn = document.getElementById("start-btn");
    const restartBtn = document.getElementById("restart-btn");
    const signalInfo = document.getElementById("signal-info");
    const waitingText = document.getElementById("waiting-text");
    const soonText = document.getElementById("soon-text");
    const signalImage = document.getElementById("signal-image");
    const signalText = document.getElementById("signal-text");

    if (!startBtn || !restartBtn || !signalInfo) {
        console.error("Error: One or more elements are missing in the HTML.");
        return;
    }

    // Скрываем экран загрузки
    setTimeout(() => {
        document.getElementById("loading-screen").style.display = "none";
        document.getElementById("main-content").classList.remove("hidden");
    }, 2500);

    // Валютные пары
    const currencyPairs = [
        "EUR/USD", "USD/JPY", "GBP/USD", "USD/CHF", "AUD/USD", "USD/CAD",
        "NZD/USD", "EUR/GBP", "EUR/JPY", "GBP/JPY", "AUD/JPY", "CHF/JPY",
        "Cardano OTC", "Bitcoin ETF OTC", "Bitcoin OTC", "Polkadot OTC", "Solana OTC",
        "Toncoin OTC", "Litecoin OTC", "Ethereum OTC", "TRON OTC", "Polygon OTC", "Avalanche OTC",
        "Dogecoin OTC", "Chainlink OTC", "Brent Oil OTC", "WTI Crude Oil OTC", "Silver OTC",
        "Gold OTC", "Natural Gas OTC", "Palladium spot OTC", "Platinum spot OTC"
    ];

    const expirationTimes = ["5 sec", "15 sec", "1 min", "2 min", "3 min", "5 min", "15 min", "30 min"];

    let selectedPair = "";
    let selectedTime = "";

    const currencyList = document.getElementById("currency-list");
    const expirationList = document.getElementById("expiration-list");

    // Заполняем валютные пары
    currencyPairs.forEach(pair => {
        const btn = document.createElement("button");
        btn.textContent = pair;
        btn.onclick = () => selectCurrency(pair);
        currencyList.appendChild(btn);
    });

    // Выбор валютной пары
    function selectCurrency(pair) {
        selectedPair = pair;
        currencyList.innerHTML = "";
        document.getElementById("pair-title").textContent = `✅ Selected: ${selectedPair}`;
        expirationList.classList.remove("hidden");

        expirationList.innerHTML = "";
        expirationTimes.forEach(time => {
            const btn = document.createElement("button");
            btn.textContent = time;
            btn.onclick = () => selectTime(time);
            expirationList.appendChild(btn);
        });
    }

    // Выбор времени
    function selectTime(time) {
        selectedTime = time;
        expirationList.innerHTML = "";
        document.getElementById("time-title").textContent = `✅ Selected: ${selectedTime}`;
        startBtn.classList.remove("hidden");
    }

    // Запуск поиска сигнала
    startBtn.addEventListener("click", () => {
        startBtn.classList.add("hidden");
        signalInfo.classList.remove("hidden");
        restartBtn.classList.add("hidden");

        // Сбрасываем старый сигнал перед началом поиска
        signalImage.classList.add("hidden");
        signalText.classList.add("hidden");
        signalText.innerHTML = "";
        signalImage.src = ""; // Очищаем путь изображения

        waitingText.classList.remove("hidden");

        setTimeout(() => {
            waitingText.classList.add("hidden");
            soonText.classList.remove("hidden");
        }, 5000);

        setTimeout(() => {
            const direction = Math.random() > 0.5 ? "up" : "down";
            const directionText = direction === "up" ? "📈 FOR PROMOTION" : "📉 ON A DOWNGRADE";
            const photoPath = `photos/${direction}.jpg`;

            soonText.classList.add("hidden");

            // Показываем фото сигнала и текст
            signalImage.src = photoPath;
            signalImage.classList.remove("hidden");

            signalText.innerHTML = `
                💹 Trading pair: <b>${selectedPair}</b><br>
                ⌛ Trade time: <b>${selectedTime}</b><br><br>
                ⚡ The bot recommends opening a trade:<br>
                <b>${directionText}</b><br>
                <b>Open the trade immediately❗</b>
            `;
            signalText.classList.remove("hidden");

            restartBtn.classList.remove("hidden");
        }, 8000);
    });

    // Перезапуск (возвращаем к выбору валютной пары и сбрасываем всё)
    restartBtn.addEventListener("click", () => {
        signalInfo.classList.add("hidden");
        restartBtn.classList.add("hidden");

        selectedPair = "";
        selectedTime = "";

        document.getElementById("pair-title").textContent = "📊 Select a currency pair";
        document.getElementById("time-title").textContent = "";

        currencyList.innerHTML = "";
        expirationList.innerHTML = "";
        expirationList.classList.add("hidden");

        waitingText.classList.add("hidden");
        soonText.classList.add("hidden");
        signalImage.classList.add("hidden");
        signalText.classList.add("hidden");

        // Обновляем список валютных пар
        currencyPairs.forEach(pair => {
            const btn = document.createElement("button");
            btn.textContent = pair;
            btn.onclick = () => selectCurrency(pair);
            currencyList.appendChild(btn);
        });
    });
});


