import { createGlobalStyle } from 'styled-components';
import GmarketSansOtfBold from './GmarketSansBold.otf';
import GmarketSansOtfLight from './GmarketSansLight.otf';
import GmarketSansOtfMedium from './GmarketSansMedium.otf';

const GlobalFonts = createGlobalStyle`
    @font-face {
        font-family: 'GmarketSansTTFBold';
        src: local('GmarketSansTTFBold'), local('GmarketSansTTFBold');
        font-style: normal;
        src: url(${GmarketSansOtfBold}) format('truetype');
    }
    @font-face {
        font-family: 'GmarketSansTTFMedium';
        src: local('GmarketSansTTFMedium'), local('GmarketSansTTFMedium');
        font-style: normal;
        src: url(${GmarketSansOtfMedium}) format('truetype');
    }
    @font-face {
        font-family: 'GmarketSansTTFLight';
        src: local('GmarketSansTTFLight'), local('GmarketSansTTFLight');
        font-style: normal;
        src: url(${GmarketSansOtfLight}) format('truetype');
        }
    @font-face {
    font-family: 'EF_jejudoldam';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2210-EF@1.0/EF_jejudoldam.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}
`;

export default GlobalFonts;
