import { render } from '@testing-library/react';
import TransferWiseCalculator from './TransferWiseCalculator';

var sourceCurrencyCode = 'GBP';
var targetCurrencyCode = 'INR';
var sourceAmount = 900;
var callToActionLabel = 'Get a quote';
var hideCta = false;
var hideDetails = false;
var affiliateLink = 'https://wise.prf.hn/click/camref:11001XXXX';
var lang = 'en';
var width = '580px';
var height = '470px';

test('renders', () => {
    render(
        <TransferWiseCalculator
            sourceCurrencyCode={sourceCurrencyCode}
            targetCurrencyCode={targetCurrencyCode}
            sourceAmount={sourceAmount}
            callToActionLabel={callToActionLabel}
            hideCta={hideCta}
            hideDetails={hideDetails}
            affiliateLink={affiliateLink}
            lang={lang}
            width={width}
            height={height}
        />
    );
});
