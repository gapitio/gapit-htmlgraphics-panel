export default `
declare type VariableType = 'query' | 'adhoc' | 'constant' | 'datasource' | 'interval' | 'textbox' | 'custom' | 'system';

interface VariableModel {
    type: VariableType;
    name: string;
    label: string | null;
}

/**
 * Via the TemplateSrv consumers get access to all the available template variables
 * that can be used within the current active dashboard.
 *
 * For a more in-depth description visit: https://grafana.com/docs/grafana/latest/reference/templating
 * @public
 */
interface TemplateSrv {
    /**
     * List the dashboard variables
     */
    getVariables(): VariableModel[];
    /**
     * Replace the values within the target string.  See also {@link InterpolateFunction}
     */
    replace(target?: string, scopedVars?: ScopedVars, format?: string | Function): string;
}

/**
 * Used to retrieve the {@link TemplateSrv} that can be used to fetch available
 * template variables.
 *
 * @public
 */
declare const getTemplateSrv: () => TemplateSrv;
`;
