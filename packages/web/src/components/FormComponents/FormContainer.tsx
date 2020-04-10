import React from 'react';
import { Container } from '@material-ui/core';
import { Form } from 'formik';
import { PageProgress } from '../PageProgress';

interface FormContainerProps {
  children: React.ReactNode;
  pageProgress?: true;
  pageNum?: number;
  pageCount?: number;
}

export const FormContainer: React.FC<FormContainerProps> = ({
  children,
  pageProgress,
  pageCount,
  pageNum,
}) => {
  if (pageProgress && (typeof pageNum === 'undefined' || !pageCount)) {
    throw Error('Must provide page Count and Current page ');
  }

  return (
    <Container maxWidth="sm">
      <Form>
        <div className="register-form-container">
          {pageProgress && (
            <PageProgress pageNum={pageNum!} pageCount={pageCount!} />
          )}
          <div className="register-form">{children}</div>
        </div>
      </Form>
    </Container>
  );
};
