type JSONObject = {
  [key in string]: JSONValue;
};
type JSONValue = string | number | boolean | null | JSONObject | JSONValue[];
type JSONType = JSONObject | JSONValue[];

export type CustomProperties = JSONType;
