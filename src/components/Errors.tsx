import { Alert } from '@grafana/ui';
import React from 'react';

interface ErrorsProps {
  errors: { [key: string]: string };
}

export const Errors = ({ errors }: ErrorsProps) => (
  <div>
    {Object.entries(errors)
      .filter(([, value]) => value !== '')
      .map(([scope, value]) => (
        <Alert title={`Error executing ${scope}`}>{value}</Alert>
      ))}
  </div>
);
