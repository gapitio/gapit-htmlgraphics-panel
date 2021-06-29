export enum contentType {
  json = 'application/json;charset=utf-8;',
}

export function exportFile(string: string, filename: string, contentType: contentType) {
  const a = document.createElement('a');
  a.download = filename;
  a.href = 'data:' + contentType + ',' + encodeURIComponent(string);
  a.target = '_blank';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
