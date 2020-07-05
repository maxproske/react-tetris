import { createGlobalStyle } from 'styled-components'
import PixelFont from '../fonts/Pixel.woff'

export const GlobalStyle = createGlobalStyle`
body {
    margin: 0;
}

@font-face {
    font-family: 'Pixel';
    src: url(${PixelFont}) format('woff');
}
`
