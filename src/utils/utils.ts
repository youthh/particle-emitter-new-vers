const MATH_FUNCS = [
  'E', 'LN2', 'LN10', 'LOG2E', 'LOG10E', 'PI', 'SQRT1_2', 'SQRT2',
  'abs', 'acos', 'acosh', 'asin', 'asinh', 'atan', 'atanh', 'atan2',
  'cbrt', 'ceil', 'cos', 'cosh', 'exp', 'expm1', 'floor', 'fround',
  'hypot', 'log', 'log1p', 'log10', 'log2', 'max', 'min', 'pow',
  'random', 'round', 'sign', 'sin', 'sinh', 'sqrt', 'tan', 'tanh',
];

const WHITELISTER = new RegExp(
  ['[01234567890\\.\\*\\-\\+\\/\\(\\)x ,]'].concat(MATH_FUNCS).join('|'),
  'g',
);

/**
 * Validates a math expression for path behavior and returns a function if valid.
 * @param {string} pathString
 * @returns {(x: number) => number | null}
 */
export function parsePath(pathString) {
  const matches = pathString.match(WHITELISTER);

  if (!matches) return null;

  for (let i = matches.length - 1; i >= 0; --i) {
    if (MATH_FUNCS.includes(matches[i])) {
      matches[i] = `Math.${matches[i]}`;
    }
  }

  try {
    const body = matches.join('');
    // eslint-disable-next-line no-new-func
    return new Function('x', `return ${body};`);
  } catch (e) {
    console.warn('Invalid path function:', e);
    return null;
  }
}
