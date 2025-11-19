import React, { useEffect } from 'react';

const Widget101 = () => {

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
        script.async = true;
        script.innerHTML = JSON.stringify({
            symbols: [
                { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
                { proName: "FOREXCOM:NSXUSD", title: "US 100" },
                { proName: "FX_IDC:EURUSD", title: "EUR to USD" },
                { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
                { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
            ],
            showSymbolLogo: true,
            colorTheme: "dark",
            isTransparent: true,
            displayMode: "adaptive",
            locale: "en",
        });
        document.querySelector('.tradingview-widget-container__widget').appendChild(script);
    }, []);

    return (
        <div className="tradingview-widget-container bg-dark" style={{marginTop: "60px"}}>
            <div className="tradingview-widget-container__widget"></div>
        </div>
    )
}

export default Widget101
