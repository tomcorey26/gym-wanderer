import React, { Dispatch, SetStateAction } from 'react';
import { Button } from '@material-ui/core';
import { isObjectEmpty } from '../utils';

interface FormPageControlProps {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  length: number;
  isSubmitting: boolean;
  errors: any;
  buttonTitle?: string;
}

export const FormPageControl: React.FC<FormPageControlProps> = ({
  currentPage,
  length,
  errors,
  isSubmitting,
  setCurrentPage,
  buttonTitle,
}) => {
  let positionCSS;
  if (currentPage === 0) {
    positionCSS = 'flex-end';
  } else if (currentPage === length - 1) {
    positionCSS = 'flex-start';
  } else {
    positionCSS = 'space-between';
  }

  return (
    <>
      <div
        style={{
          marginTop: 30,
          display: 'flex',
          justifyContent: positionCSS,
          width: '100%',
        }}
      >
        {currentPage !== 0 && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setCurrentPage((page) => (page -= 1))}
          >
            Prev Page
          </Button>
        )}

        {currentPage !== length - 1 && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setCurrentPage((page) => (page += 1))}
          >
            next Page
          </Button>
        )}
      </div>
      <div
        style={{
          marginTop: 30,
        }}
      >
        {currentPage === length - 1 && (
          <div>
            <div style={{ color: 'red' }}>
              {!isObjectEmpty(errors) && 'You are missing fields'}{' '}
            </div>
            <Button
              disabled={isSubmitting || !isObjectEmpty(errors)}
              type="submit"
              variant="contained"
              color="secondary"
            >
              {buttonTitle ? buttonTitle : 'Register'}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
