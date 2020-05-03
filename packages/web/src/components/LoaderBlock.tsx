import React from 'react';
import { CircularProgress } from '@material-ui/core';

interface LoaderBlockProps {
  width?: number | string;
  height?: number | string;
}

export const LoaderBlock: React.FC<LoaderBlockProps> = ({ width, height }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: width,
      height: height,
    }}
  >
    <CircularProgress />
  </div>
);
