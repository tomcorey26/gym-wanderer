import React from 'react';
import { CircularProgress } from '@material-ui/core';

export const LoaderBlock = () => (
  <div
    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
  >
    <CircularProgress />
  </div>
);
