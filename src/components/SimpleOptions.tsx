import React from 'react';
import { Switch, Input, ControlledCollapse, Label } from '@grafana/ui';
import { getType } from 'utils/getType';

interface SimpleOptionsProps {
  dict: { [key: string]: any };
  update: Function;
}

interface SimpleOptionProps extends SimpleOptionsProps {
  itemKey: string | number;
}

export const BooleanOption = ({ dict, update, itemKey }: SimpleOptionProps) => {
  return (
    <Switch
      value={dict[itemKey]}
      onChange={() => {
        dict[itemKey] = !dict[itemKey];
        update();
      }}
      css={{}}
    ></Switch>
  );
};

export const NumberOption = ({ dict, update, itemKey }: SimpleOptionProps) => {
  return (
    <Input
      value={dict[itemKey]}
      onChange={(e) => {
        dict[itemKey] = parseFloat(e.currentTarget.value) || 0;
        update();
      }}
      css={{}}
      type={'number'}
    ></Input>
  );
};

export const StringOption = ({ dict, update, itemKey }: SimpleOptionProps) => {
  return (
    <Input
      value={dict[itemKey]}
      onChange={(e) => {
        dict[itemKey] = e.currentTarget.value || '';
        update();
      }}
      css={{}}
      type={'string'}
    ></Input>
  );
};

export const ArrayOption = ({ dict, update, itemKey }: SimpleOptionProps) => {
  return (
    <ControlledCollapse collapsible={true} label={`Click to toggle (items: ${dict[itemKey].length})`}>
      {dict[itemKey].map((_value: string, index: number) => {
        return <SimpleOption dict={dict[itemKey]} update={update} itemKey={index}></SimpleOption>;
      })}
    </ControlledCollapse>
  );
};

export const ObjectOption = ({ dict, update, itemKey }: SimpleOptionProps) => {
  return (
    <ControlledCollapse collapsible={true} label={`Click to toggle (items: ${Object.keys(dict[itemKey]).length})`}>
      <SimpleOptions dict={dict[itemKey]} update={update}></SimpleOptions>
    </ControlledCollapse>
  );
};

export const SimpleOption = ({ dict, update, itemKey }: SimpleOptionProps) => {
  const value = dict[itemKey];
  const optionParams = { dict, update, itemKey };
  const valueType = getType(value);

  const options = {
    Null: <p>Value is null</p>,
    Boolean: <BooleanOption {...optionParams} />,
    Number: <NumberOption {...optionParams} />,
    String: <StringOption {...optionParams} />,
    Array: <ArrayOption {...optionParams} />,
    Object: <ObjectOption {...optionParams} />,
  };

  if (!(valueType in options)) return <p>'Type not implemented'</p>;

  return options[valueType as keyof typeof options];
};

export const SimpleOptions = ({ dict, update }: SimpleOptionsProps) => {
  return (
    <>
      {Object.keys(dict).map((itemKey: string, index: number) => {
        return (
          <div>
            <Label>{itemKey}</Label>
            <SimpleOption dict={dict} update={update} itemKey={itemKey}></SimpleOption>
            {/* Add a newline between each options */}
            {Object.keys(dict).length > index + 1 ? <br /> : null}
          </div>
        );
      })}
    </>
  );
};
