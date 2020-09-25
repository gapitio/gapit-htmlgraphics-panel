export default `
declare enum GrafanaThemeType {
  Light = "light",
  Dark = "dark"
}
interface GrafanaThemeCommons {
  name: string;
  breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
  };
  typography: {
      fontFamily: {
          sansSerif: string;
          monospace: string;
      };
      size: {
          base: string;
          xs: string;
          sm: string;
          md: string;
          lg: string;
      };
      weight: {
          light: number;
          regular: number;
          semibold: number;
          bold: number;
      };
      lineHeight: {
          xs: number;
          sm: number;
          md: number;
          lg: number;
      };
      heading: {
          h1: string;
          h2: string;
          h3: string;
          h4: string;
          h5: string;
          h6: string;
      };
      link: {
          decoration: string;
          hoverDecoration: string;
      };
  };
  spacing: {
      insetSquishMd: string;
      d: string;
      xxs: string;
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      gutter: string;
      formSpacingBase: number;
      formMargin: string;
      formFieldsetMargin: string;
      formInputHeight: number;
      formButtonHeight: number;
      formInputPaddingHorizontal: string;
      formInputAffixPaddingHorizontal: string;
      formInputMargin: string;
      formLabelPadding: string;
      formLabelMargin: string;
      formValidationMessagePadding: string;
      formValidationMessageMargin: string;
      inlineFormMargin: string;
  };
  border: {
      radius: {
          sm: string;
          md: string;
          lg: string;
      };
      width: {
          sm: string;
      };
  };
  height: {
      sm: number;
      md: number;
      lg: number;
  };
  panelPadding: number;
  panelHeaderHeight: number;
  zIndex: {
      dropdown: number;
      navbarFixed: number;
      sidemenu: number;
      tooltip: number;
      modalBackdrop: number;
      modal: number;
      typeahead: number;
  };
}
interface GrafanaTheme extends GrafanaThemeCommons {
  type: GrafanaThemeType;
  isDark: boolean;
  isLight: boolean;
  palette: {
      black: string;
      white: string;
      dark1: string;
      dark2: string;
      dark3: string;
      dark4: string;
      dark5: string;
      dark6: string;
      dark7: string;
      dark8: string;
      dark9: string;
      dark10: string;
      gray1: string;
      gray2: string;
      gray3: string;
      gray4: string;
      gray5: string;
      gray6: string;
      gray7: string;
      gray98: string;
      gray95: string;
      gray85: string;
      gray70: string;
      gray60: string;
      gray33: string;
      gray25: string;
      gray15: string;
      gray10: string;
      gray05: string;
      blue95: string;
      blue85: string;
      blue80: string;
      blue77: string;
      red88: string;
      redBase: string;
      redShade: string;
      greenBase: string;
      greenShade: string;
      red: string;
      yellow: string;
      purple: string;
      orange: string;
      orangeDark: string;
      queryRed: string;
      queryGreen: string;
      queryPurple: string;
      queryOrange: string;
      brandPrimary: string;
      brandSuccess: string;
      brandWarning: string;
      brandDanger: string;
      online: string;
      warn: string;
      critical: string;
  };
  colors: {
      bg1: string;
      bg2: string;
      bg3: string;
      border1: string;
      border2: string;
      border3: string;
      bgBlue1: string;
      bgBlue2: string;
      dashboardBg: string;
      bodyBg: string;
      panelBg: string;
      panelBorder: string;
      pageHeaderBg: string;
      pageHeaderBorder: string;
      dropdownBg: string;
      dropdownShadow: string;
      dropdownOptionHoverBg: string;
      link: string;
      linkDisabled: string;
      linkHover: string;
      linkExternal: string;
      textStrong: string;
      textHeading: string;
      text: string;
      textSemiWeak: string;
      textWeak: string;
      textFaint: string;
      textBlue: string;
      formLabel: string;
      formDescription: string;
      formInputBg: string;
      formInputBgDisabled: string;
      formInputBorder: string;
      formInputBorderHover: string;
      formInputBorderActive: string;
      formInputBorderInvalid: string;
      formFocusOutline: string;
      formInputText: string;
      formInputDisabledText: string;
      formInputPlaceholderText: string;
      formValidationMessageText: string;
      formValidationMessageBg: string;
      formSwitchBg: string;
      formSwitchBgActive: string;
      formSwitchBgActiveHover: string;
      formSwitchBgHover: string;
      formSwitchBgDisabled: string;
      formSwitchDot: string;
      formCheckboxBgChecked: string;
      formCheckboxBgCheckedHover: string;
      formCheckboxCheckmark: string;
  };
  shadows: {
      listItem: string;
  };
}

/**
 * Grafana theme.
 * Here you can get the current theme, colors, sizes, ETC.
 *
 * https://grafana.com/docs/grafana/latest/packages_api/data/grafanatheme/
 */
declare const theme: GrafanaTheme;
`;
