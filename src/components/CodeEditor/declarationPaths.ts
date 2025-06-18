import declGrafanaData from './declarations/@grafana/data.d.ts?raw';
import declGrafanaRuntime from './declarations/@grafana/runtime.d.ts?raw';
import declCustomProperties from './declarations/customProperties.d.ts?raw';
import declGlobal from './declarations/global.d.ts?raw';
import declIndex from './declarations/index.d.ts?raw';

export const declarationPaths = [
  { declarationFilePath: declGrafanaData, declarationImportPath: '@grafana/data.d.ts' },
  { declarationFilePath: declGrafanaRuntime, declarationImportPath: '@grafana/runtime.d.ts' },
  { declarationFilePath: declCustomProperties, declarationImportPath: 'customProperties.d.ts' },
  { declarationFilePath: declGlobal, declarationImportPath: 'index.d.ts' },
  { declarationFilePath: declIndex, declarationImportPath: 'global.d.ts' },
];
