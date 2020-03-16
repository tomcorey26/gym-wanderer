import React, { useState } from 'react';
import { useRegisterMutation } from '../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';

//we get route props because this component is passed
// as a prop to the react-router-dom <Route/> component
export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register] = useRegisterMutation();
  const handleSubmit = e => {
    e.preventDefault();
    return;
  };

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        console.log('form submitted');
        const response = await register({
          variables: {
            email,
            password
          }
        });

        console.log(response);
        history.push('/');
      }}
    >
      <div>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">login </button>
      </div>
    </form>
  );
};
