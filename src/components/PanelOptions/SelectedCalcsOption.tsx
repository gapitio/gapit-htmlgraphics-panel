import React from 'react';
import { fieldReducers, ReducerID, StandardEditorProps } from '@grafana/data';
import { MultiSelect } from '@grafana/ui';

interface Props extends StandardEditorProps<string[]> {}

export const SelectedCalcsOption: React.FC<Props> = ({ value, item, onChange, context }) => {
  const options = fieldReducers
    .list()
    .filter((reducer) => reducer.reduce)
    .map((reducer) => ({ value: reducer.id, label: reducer.name, description: reducer.description }));

  /*
    If any of the standard calcs are selected, set the selected to an empty array.

    If one of the standard calcs are selected, then all standard calcs are selected.
    Only check against 'max' since it's one of the standard calcs.
   */
  if (value.includes('max')) {
    onChange([ReducerID.last]);
  }

  return (
    <MultiSelect value={value} onChange={(e) => onChange(e.map((e) => e.value ?? ''))} options={options}></MultiSelect>
  );
};
