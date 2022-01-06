import { fieldReducers, ReducerID } from '@grafana/data';
import { CalcsMutation } from 'types';

export const calcsMutations = [
  { value: CalcsMutation.None, label: 'No mutation', getReducerIDs: () => [] },
  { value: CalcsMutation.Custom, label: 'Custom', getReducerIDs: () => [ReducerID.last] },
  {
    value: CalcsMutation.Standard,
    label: 'Standard calcs',
    getFieldReducerList: () => fieldReducers.list().filter(({ standard }) => standard),
    getReducerIDs() {
      return this.getFieldReducerList().map(({ id }) => id);
    },
  },
  {
    value: CalcsMutation.All,
    label: 'All calcs',
    getFieldReducerList: () => fieldReducers.list(),
    getReducerIDs() {
      return this.getFieldReducerList().map(({ id }) => id);
    },
  },
];
