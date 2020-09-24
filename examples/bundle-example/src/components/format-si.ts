const UNIT_PREFIXES = {
  '24': 'Y',
  '21': 'Z',
  '18': 'E',
  '15': 'P',
  '12': 'T',
  '9': 'G',
  '6': 'M',
  '3': 'k',
  '0': '',
  '-3': 'm',
  '-6': 'µ',
  '-9': 'n',
  '-12': 'p',
  '-15': 'f',
  '-18': 'a',
  '-21': 'z',
  '-24': 'y'
};

/**
 * Formats num into SI metric prefixes
 * https://en.wikipedia.org/wiki/Metric_prefix
 */

const formatSI = (
  num: string | number,
  digits = 1,
  unit = codeData.unit,
  precision = false
) => {
  if ([0, '0'].includes(num)) {
    return ['0', unit];
  } else if (num == 'No data' || !num) {
    return ['No data', ''];
  }

  let sig = Math.abs(Number(num)); // Significant figure
  let exponent = 0;

  while (sig >= 1000 && exponent < 24) {
    sig /= 1000;
    exponent += 3;
  }
  while (sig < 1 && exponent > -24) {
    sig *= 1000;
    exponent -= 3;
  }

  const signPrefix = num < 0 ? '-' : '';

  // If the Significant figure is more than 1000 Y (10^27)
  if (sig > 1000) {
    return [signPrefix + sig.toExponential(1), UNIT_PREFIXES[exponent] + unit];
  }

  const formattedSig = precision
    ? sig.toPrecision(digits)
    : sig.toFixed(digits);
  return [signPrefix + formattedSig, UNIT_PREFIXES[exponent] + unit];
};

export default formatSI;
