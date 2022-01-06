import React from 'react';
import { StandardEditorProps } from '@grafana/data';
import { RadioButtonGroup } from '@grafana/ui';
import { CalcsMutation, OptionsInterface } from 'types';
import _ from 'lodash';
import { calcsMutations } from 'utils/calcsMutations';

interface Props extends StandardEditorProps<CalcsMutation, any, OptionsInterface> {}

export const CalcsMutationOption: React.FC<Props> = ({ value, item, onChange, context }) => {
  const options = calcsMutations.map(({ value, label }) => ({ value, label }));

  const onSelectChange = (v: CalcsMutation) => {
    if (context.options) {
      context.options.reduceOptions.calcs = calcsMutations.find(({ value }) => value === v)?.getReducerIDs() ?? [];
      onChange(v);
    }
  };

  return <RadioButtonGroup value={value} onChange={onSelectChange} options={options} />;
};
