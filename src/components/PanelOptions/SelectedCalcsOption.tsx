import React from 'react';
import { fieldReducers, SelectableValue, StandardEditorProps } from '@grafana/data';
import { MultiSelect } from '@grafana/ui';
import { CalcsMutation, OptionsInterface } from 'types';
import _ from 'lodash';

interface Props extends StandardEditorProps<string[], any, OptionsInterface> {}

export const SelectedCalcsOption: React.FC<Props> = ({ value, item, onChange, context }) => {
  const isCustom = context.options?.calcsMutation === CalcsMutation.Custom;

  const options = (isCustom
    ? fieldReducers.list().filter((reducer) => reducer.reduce)
    : fieldReducers.list()
  ).map((reducer) => ({ value: reducer.id, label: reducer.name, description: reducer.description }));

  const onSelectChange = (e: Array<SelectableValue<string>>) => {
    if (isCustom) {
      onChange(e.map((e) => e.value ?? ''));
    }
  };

  return <MultiSelect value={value} onChange={onSelectChange} options={options} disabled={!isCustom}></MultiSelect>;
};
