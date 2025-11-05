import React from 'react';
import { css } from '@emotion/css';
import type { GrafanaTheme2 } from '@grafana/data';
import { useStyles2 } from '@grafana/ui';

interface Props {
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
}

export const FileUpload = ({ onFileUpload, accept }: Props) => {
  const styles = useStyles2(getStyles());

  return (
    <>
      <input
        type="file"
        style={{
          // Use css styles instead of emotion classes to override the styles set by Grafana (for some reason they have higher priority)
          height: 'auto', // override: https://github.com/grafana/grafana/blob/563109b696e9c1cbaf345f2ab7a11f7f78422982/packages/grafana-ui/src/themes/GlobalStyles/forms.ts#L39
          lineHeight: '1', // override: https://github.com/grafana/grafana/blob/563109b696e9c1cbaf345f2ab7a11f7f78422982/packages/grafana-ui/src/themes/GlobalStyles/forms.ts#L42
          width: '100%', // override: https://github.com/grafana/grafana/blob/563109b696e9c1cbaf345f2ab7a11f7f78422982/packages/grafana-ui/src/themes/GlobalStyles/forms.ts#L66
        }}
        onChange={onFileUpload}
        accept={accept}
        className={styles.input}
      />
    </>
  );
};

const getStyles = () => (theme: GrafanaTheme2) => {
  return {
    input: css({
      padding: theme.spacing(2),
    }),
  };
};
