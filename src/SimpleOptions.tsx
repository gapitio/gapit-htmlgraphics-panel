import React, { PureComponent } from 'react';
import { Switch, Input, ControlledCollapse, Label } from '@grafana/ui';

interface SimpleOptionProps {
  dict: { [key: string]: any };
  newDict: { [key: string]: any };
  update: Function;
  itemKey: string | number;
}

class SimpleOption extends PureComponent<SimpleOptionProps> {
  boolean = () => (
    <Switch
      value={this.props.newDict[this.props.itemKey]}
      onChange={() => {
        this.props.newDict[this.props.itemKey] = !this.props.newDict[this.props.itemKey];
        this.props.update(this.props.dict);
      }}
      css={{}}
    ></Switch>
  );

  number = () => (
    <Input
      defaultValue={this.props.newDict[this.props.itemKey]}
      onChange={e => {
        this.props.newDict[this.props.itemKey] = parseFloat(e.currentTarget.value) || 0;
        this.props.update(this.props.dict);
      }}
      css={{}}
      type={'number'}
    ></Input>
  );

  string = () => (
    <Input
      defaultValue={this.props.newDict[this.props.itemKey]}
      onChange={e => {
        this.props.newDict[this.props.itemKey] = e.currentTarget.value || '';
        this.props.update(this.props.dict);
      }}
      css={{}}
      type={'string'}
    ></Input>
  );

  array = () => (
    <ControlledCollapse label={`Click to toggle (items: ${this.props.newDict[this.props.itemKey].length})`}>
      {this.props.newDict[this.props.itemKey].map((value: string, index: number) => {
        return (
          <SimpleOption
            dict={this.props.dict}
            newDict={this.props.newDict[this.props.itemKey]}
            update={this.props.update}
            itemKey={index}
          ></SimpleOption>
        );
      })}
    </ControlledCollapse>
  );

  dict = () => (
    <ControlledCollapse
      label={`Click to toggle (items: ${Object.keys(this.props.newDict[this.props.itemKey]).length})`}
    >
      <SimpleOptions
        dict={this.props.dict}
        newDict={this.props.newDict[this.props.itemKey]}
        update={this.props.update}
      ></SimpleOptions>
    </ControlledCollapse>
  );

  render() {
    const value = this.props.newDict[this.props.itemKey];
    return (
      <>
        {value === null ? (
          'This value is null'
        ) : value.constructor === Boolean ? (
          <this.boolean />
        ) : value.constructor === Number ? (
          <this.number />
        ) : value.constructor === String ? (
          <this.string />
        ) : Array.isArray(value) ? (
          <this.array />
        ) : value.constructor === Object ? (
          <this.dict />
        ) : (
          'Type not implemented'
        )}
      </>
    );
  }
}

const SimpleOptions = ({
  dict,
  newDict,
  update,
}: {
  dict: { [key: string]: any };
  newDict: { [key: string]: any };
  update: Function;
}) => {
  return (
    <>
      {Object.keys(newDict).map((key: string, index: number) => {
        return (
          <div>
            <Label>{key}</Label>
            <SimpleOption dict={dict} newDict={newDict} update={update} itemKey={key}></SimpleOption>
            {/* Add a newline between each options */}
            {Object.keys(newDict).length > index + 1 ? <br /> : null}
          </div>
        );
      })}
    </>
  );
};

export { SimpleOption, SimpleOptions };
