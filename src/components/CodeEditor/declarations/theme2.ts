export default `
declare type ThemeSpacingOptions = {
  gridSize?: number;
};
/** @internal */
declare type ThemeSpacingArgument = number | string;
/**
* @beta
* The different signatures imply different meaning for their arguments that can't be expressed structurally.
* We express the difference with variable names.
* tslint:disable:unified-signatures */
interface ThemeSpacing {
  (): string;
  (value: number): string;
  (topBottom: ThemeSpacingArgument, rightLeft: ThemeSpacingArgument): string;
  (top: ThemeSpacingArgument, rightLeft: ThemeSpacingArgument, bottom: ThemeSpacingArgument): string;
  (top: ThemeSpacingArgument, right: ThemeSpacingArgument, bottom: ThemeSpacingArgument, left: ThemeSpacingArgument): string;
  gridSize: number;
}

declare const easing: {
  easeInOut: string;
  easeOut: string;
  easeIn: string;
  sharp: string;
};
declare const duration: {
  shortest: number;
  shorter: number;
  short: number;
  standard: number;
  complex: number;
  enteringScreen: number;
  leavingScreen: number;
};
/** @alpha */
interface CreateTransitionOptions {
  duration?: number | string;
  easing?: string;
  delay?: number | string;
}
/** @alpha */
declare function create(props?: string | string[], options?: CreateTransitionOptions): string;
declare function getAutoHeightDuration(height: number): number;
/** @alpha */
interface ThemeTransitions {
  create: typeof create;
  duration: typeof duration;
  easing: typeof easing;
  getAutoHeightDuration: typeof getAutoHeightDuration;
}

interface ThemeVisualizationColors {
  /** Only for internal use by color schemes */
  palette: string[];
  /** Lookup the real color given the name */
  getColorByName: (color: string) => string;
  /** Colors organized by hue */
  hues: ThemeVizHue[];
}
/**
* @alpha
*/
interface ThemeVizColor {
  color: string;
  name: string;
  aliases?: string[];
  primary?: boolean;
}
/**
* @alpha
*/
interface ThemeVizHue {
  name: string;
  shades: ThemeVizColor[];
}

interface ThemeShadows {
  z1: string;
  z2: string;
  z3: string;
}

declare const zIndex: {
  navbarFixed: number;
  sidemenu: number;
  dropdown: number;
  typeahead: number;
  tooltip: number;
  modalBackdrop: number;
  modal: number;
  portal: number;
};
/** @beta */
declare type ThemeZIndices = typeof zIndex;

interface ThemeTypography {
  fontFamily: string;
  fontFamilyMonospace: string;
  fontSize: number;
  fontWeightLight: number;
  fontWeightRegular: number;
  fontWeightMedium: number;
  fontWeightBold: number;
  htmlFontSize?: number;
  h1: ThemeTypographyVariant;
  h2: ThemeTypographyVariant;
  h3: ThemeTypographyVariant;
  h4: ThemeTypographyVariant;
  h5: ThemeTypographyVariant;
  h6: ThemeTypographyVariant;
  body: ThemeTypographyVariant;
  bodySmall: ThemeTypographyVariant;
  /**
   * @deprecated
   * from legacy old theme
   * */
  size: {
      base: string;
      xs: string;
      sm: string;
      md: string;
      lg: string;
  };
  pxToRem: (px: number) => string;
}
interface ThemeTypographyVariant {
  fontSize: string;
  fontWeight: number;
  lineHeight: number;
  fontFamily: string;
  letterSpacing?: string;
}

interface ThemeComponents {
  /** Applies to normal buttons, inputs, radio buttons, etc */
  height: {
      sm: number;
      md: number;
      lg: number;
  };
  input: {
      background: string;
      borderColor: string;
      borderHover: string;
      text: string;
  };
  tooltip: {
      text: string;
      background: string;
  };
  panel: {
      padding: number;
      headerHeight: number;
      borderColor: string;
      boxShadow: string;
      background: string;
  };
  dropdown: {
      background: string;
  };
  overlay: {
      background: string;
  };
  dashboard: {
      background: string;
      padding: number;
  };
  sidemenu: {
      width: number;
  };
}

interface ThemeShape {
  borderRadius: (amount?: number) => string;
}

/** @beta */
interface ThemeBreakpointValues {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
}
/** @beta */
declare type ThemeBreakpointsKey = keyof ThemeBreakpointValues;
/** @beta */
interface ThemeBreakpoints {
    values: ThemeBreakpointValues;
    keys: string[];
    unit: string;
    up: (key: ThemeBreakpointsKey) => string;
    down: (key: ThemeBreakpointsKey) => string;
}
/** @internal */

declare type ThemeColorsMode = 'light' | 'dark';

interface ThemeColorsBase<TColor> {
  mode: ThemeColorsMode;
  primary: TColor;
  secondary: TColor;
  info: TColor;
  error: TColor;
  success: TColor;
  warning: TColor;
  text: {
      primary: string;
      secondary: string;
      disabled: string;
      link: string;
      /** Used for auto white or dark text on colored backgrounds */
      maxContrast: string;
  };
  background: {
      /** Dashboard and body background */
      canvas: string;
      /** Primary content pane background (panels etc) */
      primary: string;
      /** Cards and elements that need to stand out on the primary background */
      secondary: string;
  };
  border: {
      weak: string;
      medium: string;
      strong: string;
  };
  gradients: {
      brandVertical: string;
      brandHorizontal: string;
  };
  action: {
      /** Used for selected menu item / select option */
      selected: string;
      /** Used for hovered menu item / select option */
      hover: string;
      /** Used for button/colored background hover opacity */
      hoverOpacity: number;
      /** Used focused menu item / select option */
      focus: string;
      /** Used for disabled buttons and inputs */
      disabledBackground: string;
      /** Disabled text */
      disabledText: string;
      /** Disablerd opacity */
      disabledOpacity: number;
  };
  hoverFactor: number;
  contrastThreshold: number;
  tonalOffset: number;
}

interface ThemeColors extends ThemeColorsBase<ThemeRichColor> {
  /** Returns a text color for the background */
  getContrastText(background: string, threshold?: number): string;
  emphasize(color: string, amount?: number): string;
}

interface ThemeRichColor {
  /** color intent (primary, secondary, info, error, etc) */
  name: string;
  /** Main color */
  main: string;
  /** Used for hover */
  shade: string;
  /** Used for text */
  text: string;
  /** Used for borders */
  border: string;
  /** Used subtly colored backgrounds */
  transparent: string;
  /** Text color for text ontop of main */
  contrastText: string;
}

/**
 * @beta
 * Next gen theme model introduced in Grafana v8.
 */
interface GrafanaTheme2 {
  name: string;
  isDark: boolean;
  isLight: boolean;
  colors: ThemeColors;
  breakpoints: ThemeBreakpoints;
  spacing: ThemeSpacing;
  shape: ThemeShape;
  components: ThemeComponents;
  typography: ThemeTypography;
  zIndex: ThemeZIndices;
  shadows: ThemeShadows;
  visualization: ThemeVisualizationColors;
  transitions: ThemeTransitions;
  v1: GrafanaTheme;
}

/**
 * @beta
 * Next gen theme model introduced in Grafana v8.
 */
declare const theme2: GrafanaTheme2;
`;
