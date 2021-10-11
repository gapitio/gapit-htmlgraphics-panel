export default `
declare type TimeZoneUtc = 'utc';
declare type TimeZoneBrowser = 'browser';
declare type TimeZone = TimeZoneBrowser | TimeZoneUtc | string;
`;
