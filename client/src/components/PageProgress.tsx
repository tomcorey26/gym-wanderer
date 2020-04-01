import React from 'react';
import Box from '@material-ui/core/Box';

interface PageProgressProps {
  pageNum: number;
  pageCount: number;
}

export const PageProgress: React.FC<PageProgressProps> = ({
  pageNum,
  pageCount
}) => {
  var bars: JSX.Element[] = [];
  for (var i = 0; i < pageCount; i++) {
    bars.push(
      <div
        key={i}
        style={{ background: i < pageNum ? 'green' : 'white', height: 10 }}
        className="progress_bar_piece"
      ></div>
    );
  }

  return (
    <div style={{ width: '100%', marginBottom: 10 }}>
      <h1>
        {pageNum} of {pageCount} completed
      </h1>
      <Box display="flex" alignItems="strech">
        {bars}
      </Box>
    </div>
  );
};
