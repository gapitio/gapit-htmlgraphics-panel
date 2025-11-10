import { css } from '@emotion/css';

function registerFonts() {
  css([
    {
      '@font-face': {
        fontFamily: 'Open Sans',
        src: `url('${__webpack_public_path__}static/fonts/OpenSans-Light.woff2') format('woff2')`,
        fontWeight: '300',
        fontStyle: 'normal',
        fontDisplay: 'swap',
      },
    },
    {
      '@font-face': {
        fontFamily: 'Open Sans',
        src: `url('${__webpack_public_path__}static/fonts/OpenSans-Regular.woff2') format('woff2')`,
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontDisplay: 'swap',
      },
    },
    {
      '@font-face': {
        fontFamily: 'Open Sans',
        src: `url('${__webpack_public_path__}static/fonts/OpenSans-SemiBold.woff2') format('woff2')`,
        fontWeight: '600',
        fontStyle: 'normal',
        fontDisplay: 'swap',
      },
    },
    {
      '@font-face': {
        fontFamily: 'Open Sans',
        src: `url('${__webpack_public_path__}static/fonts/OpenSans-Bold.woff2') format('woff2')`,
        fontWeight: 'bold',
        fontStyle: 'normal',
        fontDisplay: 'swap',
      },
    },
  ]);
}

// Register fonts when module is loaded
registerFonts();
