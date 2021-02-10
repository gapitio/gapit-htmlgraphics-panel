import { SVGBaseFix } from './SVGBaseFix';

const svgData = `
<svg version="1.1" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
 <defs>
  <linearGradient id="linearGradient875">
   <stop offset="0"/>
   <stop stop-opacity="0" offset="1"/>
  </linearGradient>
  <linearGradient id="linearGradient861" x1="200" x2="400" y1="100" y2="100" gradientUnits="userSpaceOnUse" xlink:href="#linearGradient875"/>
  <linearGradient id="linearGradient869" x2="200" y1="300" y2="300" gradientUnits="userSpaceOnUse" xlink:href="#linearGradient875"/>
  <linearGradient id="linearGradient877" x1="200" x2="400" y1="300" y2="300" gradientUnits="userSpaceOnUse" xlink:href="#linearGradient875"/>
  <linearGradient id="linearGradient887" x2="200" y1="100" y2="100" gradientUnits="userSpaceOnUse" xlink:href="#linearGradient875"/>
 </defs>
 <rect width="200" height="200" fill="url(#linearGradient887)"/>
 <rect x="200" width="200" height="200" fill="url(#linearGradient861)"/>
 <rect y="200" width="200" height="200" fill="url(#linearGradient869)"/>
 <rect x="200" y="200" width="200" height="200" fill="url(#linearGradient877)"/>
</svg>
`;

const expectedSvgData = `
<svg version="1.1" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
 <defs>
  <linearGradient id="linearGradient875">
   <stop offset="0"/>
   <stop stop-opacity="0" offset="1"/>
  </linearGradient>
  <linearGradient id="linearGradient861" x1="200" x2="400" y1="100" y2="100" gradientUnits="userSpaceOnUse" xlink:href="http://localhost/#linearGradient875"/>
  <linearGradient id="linearGradient869" x2="200" y1="300" y2="300" gradientUnits="userSpaceOnUse" xlink:href="http://localhost/#linearGradient875"/>
  <linearGradient id="linearGradient877" x1="200" x2="400" y1="300" y2="300" gradientUnits="userSpaceOnUse" xlink:href="http://localhost/#linearGradient875"/>
  <linearGradient id="linearGradient887" x2="200" y1="100" y2="100" gradientUnits="userSpaceOnUse" xlink:href="http://localhost/#linearGradient875"/>
 </defs>
 <rect width="200" height="200" fill="url(#linearGradient887)"/>
 <rect x="200" width="200" height="200" fill="url(#linearGradient861)"/>
 <rect y="200" width="200" height="200" fill="url(#linearGradient869)"/>
 <rect x="200" y="200" width="200" height="200" fill="url(#linearGradient877)"/>
</svg>
`;

describe('SVGBaseFix', () => {
  describe('When there is a single xlink:href', () => {
    it('returns expected string', () => {
      expect(SVGBaseFix('xlink:href="#something"')).toBe('xlink:href="http://localhost/#something"');
    });
  });
  describe('When there are multiple xlink:href', () => {
    it('returns expected string', () => {
      expect(SVGBaseFix('xlink:href="#a" xlink:href="#b"')).toBe(
        'xlink:href="http://localhost/#a" xlink:href="http://localhost/#b"'
      );
    });
  });
  describe('When there is svg content', () => {
    it('returns expected string', () => {
      expect(SVGBaseFix(svgData)).toBe(expectedSvgData);
    });
  });
});
