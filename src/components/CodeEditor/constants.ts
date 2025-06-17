export const EDITOR_BORDER_SIZE = 2; // Grafana has a 1px border on the editor container
export const EDITOR_MIN_HEIGHT = 5; // The inner height, the height with the border is 7px
export const EDITOR_DEFAULT_HEIGHT = 64;

const BAR_HEIGHT = 24;
const BAR_BORDER_SIZE = 1; // The bar only has a bottom border

export const EDITOR_HEIGHT_OFFSET = EDITOR_BORDER_SIZE + BAR_HEIGHT + BAR_BORDER_SIZE; // 2px + 24px + 1px = 27px
export const CONTAINER_MIN_HEIGHT = EDITOR_MIN_HEIGHT + EDITOR_HEIGHT_OFFSET; // 5px + 27px = 32px
export const CONTAINER_DEFAULT_HEIGHT = EDITOR_DEFAULT_HEIGHT + EDITOR_HEIGHT_OFFSET; // 64px + 27px = 91px
