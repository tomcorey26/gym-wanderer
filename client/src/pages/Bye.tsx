import React from 'react';
import { useByeQuery } from '../generated/graphql';

interface ByeProps {}

export const Bye: React.FC<ByeProps> = ({}) => {
  const { data, error, loading } = useByeQuery({
    fetchPolicy: 'network-only'
  });

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    console.log(error);
    return <div>err</div>;
  }
  if (!data) {
    return <div>no Data</div>;
  }
  return <div>{data.bye}</div>;
};
