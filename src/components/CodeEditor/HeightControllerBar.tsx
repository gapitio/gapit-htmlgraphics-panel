import React, { useEffect, type RefObject } from 'react';
import { css } from '@emotion/css';
import { IconButton, useStyles2 } from '@grafana/ui';
import type { GrafanaTheme2 } from '@grafana/data';

function getShrinkIcon(
  editorHeight: number | undefined,
  containerHeight: number | undefined,
  viewHeight33InPx: number
) {
  if (editorHeight === undefined || containerHeight === undefined) {
    return 'arrow-up';
  }
  if (editorHeight === 64) {
    return 'arrow-left';
  }
  if (editorHeight < 64) {
    return 'arrow-down';
  }
  if (viewHeight33InPx < Math.round(containerHeight)) {
    return 'angle-double-up';
  }
  return 'arrow-up';
}

function getExpandIcon(
  editorHeight: number | undefined,
  containerHeight: number | undefined,
  viewHeight33InPx: number
) {
  if (editorHeight === undefined || containerHeight === undefined) {
    return 'arrow-down';
  }
  if (viewHeight33InPx === Math.round(containerHeight)) {
    return 'arrow-left';
  }
  if (viewHeight33InPx < Math.round(containerHeight)) {
    return 'arrow-up';
  }
  if (editorHeight < 64) {
    return 'angle-double-down';
  }
  return 'arrow-down';
}

export function HeightControllerBar({
  containerRef,
  editorHeight,
  containerHeight,
}: {
  containerRef: RefObject<HTMLDivElement>;
  editorHeight: number | undefined;
  containerHeight: number | undefined;
}) {
  const styles = useStyles2(getStyles);

  const viewHeight33InPx = Math.round(window.innerHeight * 0.33);
  const editorHeightOffset = (containerHeight && editorHeight && containerHeight - editorHeight) ?? 0;

  const shrinkIcon = getShrinkIcon(editorHeight, containerHeight, viewHeight33InPx);
  const expandIcon = getExpandIcon(editorHeight, containerHeight, viewHeight33InPx);

  const actuallySetContainerHeight = (height: string) => {
    if (!containerRef.current) {
      return;
    }
    containerRef.current.style.height = height;
  };

  return (
    <div className={styles.bar}>
      <div className={styles.heightButtons}>
        {editorHeight !== undefined && <HeightText editorHeight={editorHeight} />}
        <IconButton
          aria-label="Set editor height to 64px"
          tooltip="Set editor height to 64px"
          tooltipPlacement="bottom"
          name={shrinkIcon}
          size="md"
          onClick={() => actuallySetContainerHeight(`${64 + editorHeightOffset}px`)}
        />
        <IconButton
          aria-label="Set editor height to 33vh"
          tooltip={`Set editor height to 33vh (${viewHeight33InPx - editorHeightOffset}px)`}
          tooltipPlacement="bottom"
          name={expandIcon}
          size="md"
          onClick={() => actuallySetContainerHeight('33vh')}
        />
      </div>
    </div>
  );
}

function HeightText({ editorHeight }: { editorHeight: number | undefined }) {
  const [show, setShow] = React.useState(false);
  const mounted = React.useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      return;
    }

    setShow(true);

    const timeout = setTimeout(() => {
      setShow(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [editorHeight]);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <div style={{ display: show ? 'block' : 'none' }}>
      <span>
        {editorHeight === 5 ? '(min) ' : ''}
        {editorHeight === 64 ? '(default) ' : ''}
        {editorHeight !== undefined ? editorHeight.toFixed() + 'px' : ''}
      </span>
    </div>
  );
}

function getStyles(theme: GrafanaTheme2) {
  return {
    bar: css`
      display: flex;
      align-items: center;
      justify-content: end;
      padding-right: 14px;
      gap: 8px;
      border: 1px solid ${theme.colors.border.weak};
      border-top: none;
    `,
    heightButtons: css`
      height: 24px;
      display: flex;
      align-items: center;
      gap: 4px;
    `,
  };
}
