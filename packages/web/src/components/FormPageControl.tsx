import React, { Dispatch, SetStateAction } from 'react';
import { usePageControl } from '../hooks';
import { Button } from '@material-ui/core';
import { isObjectEmpty } from '../utils';

interface FormPageControlProps {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  length: number;
  isSubmitting: boolean;
  errors: any;
}

export const FormPageControl: React.FC<FormPageControlProps> = ({
  currentPage,
  length,
  errors,
  isSubmitting,
  setCurrentPage,
}) => {
  const { positionCSS, showNext, showPrevious, showSubmit } = usePageControl(
    currentPage,
    length
  );

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: positionCSS,
          width: '100%',
        }}
      >
        {showPrevious && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setCurrentPage((page) => (page -= 1))}
          >
            Prev Page
          </Button>
        )}

        {showNext && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setCurrentPage((page) => (page += 1))}
          >
            next Page
          </Button>
        )}
      </div>
      {showSubmit && (
        <Button
          disabled={isSubmitting || !isObjectEmpty(errors)}
          type="submit"
          variant="contained"
          color="secondary"
        >
          Register
        </Button>
      )}
    </>
  );
};
