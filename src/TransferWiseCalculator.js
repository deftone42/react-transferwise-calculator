// https://github.com/transferwise/public-widgets
/**
 * Tenemos un componente que usa un sdk de transferwise, para renderizar una calculadora suya de precios,
 * El componente debe ser totalmente agnostico a lo que ocurre fuera y configurable en todos los sentidos
 * Con este test, se busca analizar y revisar un codigo para hacerlo lo mas...
 * Eficiente, modular y legible posible
 */
import React, { useEffect } from 'react';

const IFRAME_ELEMENT_ID = 'wise-calc-widget';
const DEFAULT_ACTION_LABEL = 'Get started';
const DEFAULT_DIMENSIONS = {
    width: '580px',
    height: '470px',
};

function buildIframeUrl({
    sourceCurrencyCode,
    targetCurrencyCode,
    sourceAmount,
    callToActionLabel,
    hideCta,
    hideDetails,
    lang,
    redirectUrl,
}) {
    return 'https://wise.com/widget/calculator?sourceCurrencyCode=' + sourceCurrencyCode +
    '&targetCurrencyCode=' + targetCurrencyCode +
    '&amount=' + sourceAmount +
    '&cta=' + callToActionLabel +
    '&hideCta=' + hideCta +
    '&hideDetails=' + hideDetails +
    '&redirectUrl=' + redirectUrl +
    '&lang=' + lang +
    '&theme=light'
}

const getRedirectUrlParams = (sourceCurrencyCode, targetCurrencyCode, sourceAmount) => {
    return encodeURIComponent(
        'https://wise.com?sourceCurrency=' + sourceCurrencyCode +
        '&targetCurrency=' + targetCurrencyCode +
        '&fromCalcWidget=true&sourceAmount=' + sourceAmount
    );
};

function buildIframe(width, height, iframeUrl) {
    const wiseIframe = document.createElement('iframe');
    wiseIframe.frameBorder = 0;
    wiseIframe.width = width;
    wiseIframe.height = height;
    wiseIframe.id = 'wise-calc';
    wiseIframe.scrolling = 'no';
    wiseIframe.setAttribute('allowtransparency', 'true');
    wiseIframe.setAttribute('src', iframeUrl);
    return wiseIframe;
}

const TransferWiseCalculator = ({
    sourceCurrencyCode,
    targetCurrencyCode,
    sourceAmount,
    callToActionLabel = DEFAULT_ACTION_LABEL,
    hideCta = false,
    hideDetails = false,
    affiliateLink,
    lang,
    width = DEFAULT_DIMENSIONS.width,
    height = DEFAULT_DIMENSIONS.height,
}) => {
    useEffect(() => {
        const redirectParamsUrl = getRedirectUrlParams(sourceCurrencyCode, targetCurrencyCode, sourceAmount);
        const redirectUrl = encodeURIComponent(affiliateLink + '?u=' + redirectParamsUrl);
        const iframeUrl = buildIframeUrl({
            sourceCurrencyCode,
            targetCurrencyCode,
            sourceAmount,
            callToActionLabel,
            hideCta,
            hideDetails,
            lang,
            redirectUrl
        });

        const wiseIframe = buildIframe(height, width, iframeUrl);
        document.getElementById(IFRAME_ELEMENT_ID).appendChild(wiseIframe);

        return () => {
            // Borrar iframe
            // document.removeChild()
        }
    }, [
        sourceCurrencyCode,
        targetCurrencyCode,
        sourceAmount,
        callToActionLabel,
        hideCta,
        hideDetails,
        affiliateLink,
        lang,
        width,
        height,
    ]);

    return (
        <div id={IFRAME_ELEMENT_ID}></div>
    );
};

export default TransferWiseCalculator;
