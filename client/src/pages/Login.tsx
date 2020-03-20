import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useLoginMutation, MeDocument, MeQuery } from '../generated/graphql';
import { setAccessToken } from '../accessToken';

//we get route props because this component is passed
// as a prop to the react-router-dom <Route/> component
export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useLoginMutation();
  const handleSubmit = e => {
    e.preventDefault();
    return;
  };

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        console.log('form submitted');
        const response = await login({
          variables: {
            email,
            password
          },
          update: (store, { data }) => {
            if (!data) {
              return null;
            }
            store.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                me: data.login.user
              }
            });
          }
        });

        console.log(response);

        if (response && response.data) {
          console.log('setting token', response.data.login.accessToken);
          setAccessToken(response.data.login.accessToken);
        }
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
        <button type="submit"> login</button>
      </div>
    </form>
  );
};
