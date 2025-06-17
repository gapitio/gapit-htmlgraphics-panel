import React, { type RefObject } from 'react';
import { css } from '@emotion/css';
import { IconButton, Tooltip, useStyles2 } from '@grafana/ui';
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
      <Tooltip content={'Height of the code editor'}>
        <div>
          <span>
            {editorHeight === 5 ? '(min) ' : ''}
            {editorHeight === 64 ? '(default) ' : ''}
            {editorHeight !== undefined ? editorHeight.toFixed() + 'px' : ''}
          </span>
        </div>
      </Tooltip>
      <div className={styles.heightButtons}>
        <IconButton
          aria-label="Set editor height to 64px"
          tooltip="Set editor height to 64px"
          name={shrinkIcon}
          size="md"
          onClick={() => actuallySetContainerHeight(`${64 + editorHeightOffset}px`)}
        />
        <IconButton
          aria-label="Set editor height to 33vh"
          tooltip={`Set editor height to 33vh (${viewHeight33InPx - editorHeightOffset}px)`}
          name={expandIcon}
          size="md"
          onClick={() => actuallySetContainerHeight('33vh')}
        />
      </div>
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
