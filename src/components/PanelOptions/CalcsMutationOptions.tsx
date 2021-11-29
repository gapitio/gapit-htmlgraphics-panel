import React from 'react';
import { fieldReducers, ReducerID, StandardEditorProps } from '@grafana/data';
import { RadioButtonGroup } from '@grafana/ui';
import { CalcsMutation, OptionsInterface } from 'types';
import _ from 'lodash';

interface Props extends StandardEditorProps<CalcsMutation, any, OptionsInterface> {}

export const CalcsMutationOption: React.FC<Props> = ({ value, item, onChange, context }) => {
  const calcsMutations = [
    { value: CalcsMutation.None, label: 'No mutation', calcs: [] },
    { value: CalcsMutation.Custom, label: 'Custom', calcs: [ReducerID.last] },
    {
      value: CalcsMutation.Standard,
      label: 'Standard calcs',
      calcs: fieldReducers
        .list()
        .filter(({ standard }) => standard)
        .map(({ id }) => id),
    },
    { value: CalcsMutation.All, label: 'All calcs', calcs: fieldReducers.list().map(({ id }) => id) },
  ];

  const options = calcsMutations.map(({ value, label }) => ({ value, label }));

  const onSelectChange = (v: CalcsMutation) => {
    if (context.options) {
      context.options.reduceOptions.calcs = calcsMutations.find(({ value }) => value === v)?.calcs ?? [];
      onChange(v);
    }
  };

  return <RadioButtonGroup value={value} onChange={onSelectChange} options={options} />;
};
