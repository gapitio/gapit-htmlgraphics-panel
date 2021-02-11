export interface LoggingOptions {
  /**
   * The namespace for where the code is used
   * Also used when logging errors
   *
   * @default "JSON"
   */
  namespace?: string;

  /**
   * Should an error be logged in the console
   *
   * @default true
   */
  logError?: boolean;
}

export interface ParsedOutput<Output> {
  json: Output | null;
  isError: boolean;
}

/**
 * Parses a json string
 *
 * @param {string | undefined | null} jsonString - String to be parsed
 * @param {LoggingOptions} LoggingOptions
 *
 * @returns {ParsedOutput} A dictionary with json and isError
 */
export function parseJSON<Output = {}>(
  jsonString: string | undefined | null,
  { namespace = 'JSON', logError = true }: LoggingOptions = {}
): ParsedOutput<Output> {
  if (jsonString) {
    try {
      return { json: JSON.parse(jsonString), isError: false };
    } catch (e) {
      if (logError) {
        console.error(`${namespace}:`, e);
      }
      return { json: null, isError: true };
    }
  }
  return { json: null, isError: false };
}
