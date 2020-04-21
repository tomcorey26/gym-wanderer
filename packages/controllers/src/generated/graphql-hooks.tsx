import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Coordinates = {
   __typename?: 'Coordinates';
  lat: Scalars['Float'];
  lng: Scalars['Float'];
};

export type CoordinatesInput = {
  lat: Scalars['Float'];
  lng: Scalars['Float'];
};

export type Gyms = {
   __typename?: 'Gyms';
  id: Scalars['String'];
  gym_name: Scalars['String'];
  description: Scalars['String'];
  membership_cost: Scalars['Int'];
  ownerId: Scalars['String'];
  location: Scalars['String'];
  equipment: Array<Scalars['String']>;
  photo_urls: Array<Scalars['String']>;
  coordinates: Coordinates;
  type: GymTypes;
  isOpen: Scalars['Boolean'];
  date_created: Scalars['String'];
  owners: Array<User>;
  members: Array<User>;
  reviews: Array<Reviews>;
};

/** The types of gyms available on gym wanderer */
export enum GymTypes {
  Yoga = 'yoga',
  Crossfit = 'crossfit',
  Bodybuilding = 'bodybuilding',
  Parkour = 'parkour',
  General = 'general',
  Boxing = 'boxing'
}

export type LoginResponse = {
   __typename?: 'LoginResponse';
  user: User;
  accessToken: Scalars['String'];
};

export type Mutation = {
   __typename?: 'Mutation';
  register: Scalars['Boolean'];
  login: LoginResponse;
  logout: Scalars['Boolean'];
  createGym: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  birthday?: Maybe<Scalars['String']>;
  preferences: PreferencesInput;
  last_name: Scalars['String'];
  first_name: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationCreateGymArgs = {
  gym_name: Scalars['String'];
  description: Scalars['String'];
  type: GymTypes;
  membership_cost: Scalars['Float'];
  ownerId: Scalars['String'];
  location: Scalars['String'];
  coordinates: CoordinatesInput;
  equipment: Array<Scalars['String']>;
  photo_urls: Array<Scalars['String']>;
};

export type Preferences = {
   __typename?: 'Preferences';
  yoga: Scalars['Boolean'];
  crossfit: Scalars['Boolean'];
  bodybuilding: Scalars['Boolean'];
  parkour: Scalars['Boolean'];
  general: Scalars['Boolean'];
  boxing: Scalars['Boolean'];
};

export type PreferencesInput = {
  yoga: Scalars['Boolean'];
  crossfit: Scalars['Boolean'];
  bodybuilding: Scalars['Boolean'];
  parkour: Scalars['Boolean'];
  general: Scalars['Boolean'];
  boxing: Scalars['Boolean'];
};

export type Query = {
   __typename?: 'Query';
  hello: Scalars['String'];
  bye: Scalars['String'];
  users: Array<User>;
  me?: Maybe<User>;
  myGym?: Maybe<Gyms>;
  gyms: Array<Gyms>;
};

export type Reviews = {
   __typename?: 'Reviews';
  rating: Scalars['Int'];
  text: Scalars['String'];
  creator: User;
  gym: Gyms;
};

export type User = {
   __typename?: 'User';
  id: Scalars['ID'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
  birthday?: Maybe<Scalars['String']>;
  preferences: Preferences;
  gym?: Maybe<Gyms>;
};

export type ByeQueryVariables = {};


export type ByeQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'bye'>
);

export type CreateGymMutationVariables = {
  gym_name: Scalars['String'];
  description: Scalars['String'];
  membership_cost: Scalars['Float'];
  ownerId: Scalars['String'];
  location: Scalars['String'];
  coordinates: CoordinatesInput;
  type: GymTypes;
  equipment: Array<Scalars['String']>;
  photo_urls: Array<Scalars['String']>;
};


export type CreateGymMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createGym'>
);

export type HelloQueryVariables = {};


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);

export type LoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'first_name' | 'last_name' | 'username' | 'birthday'>
      & { preferences: (
        { __typename?: 'Preferences' }
        & Pick<Preferences, 'yoga' | 'crossfit' | 'bodybuilding' | 'parkour' | 'general' | 'boxing'>
      ), gym: Maybe<(
        { __typename?: 'Gyms' }
        & Pick<Gyms, 'id' | 'gym_name'>
      )> }
    ) }
  ) }
);

export type LogoutMutationVariables = {};


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'first_name' | 'last_name' | 'username' | 'birthday'>
    & { preferences: (
      { __typename?: 'Preferences' }
      & Pick<Preferences, 'yoga' | 'crossfit' | 'bodybuilding' | 'parkour' | 'general' | 'boxing'>
    ), gym: Maybe<(
      { __typename?: 'Gyms' }
      & Pick<Gyms, 'id' | 'gym_name'>
    )> }
  )> }
);

export type MyGymQueryVariables = {};


export type MyGymQuery = (
  { __typename?: 'Query' }
  & { myGym: Maybe<(
    { __typename?: 'Gyms' }
    & Pick<Gyms, 'ownerId' | 'gym_name' | 'description' | 'membership_cost' | 'location' | 'isOpen' | 'date_created'>
    & { coordinates: (
      { __typename?: 'Coordinates' }
      & Pick<Coordinates, 'lat' | 'lng'>
    ) }
  )> }
);

export type RegisterMutationVariables = {
  last_name: Scalars['String'];
  first_name: Scalars['String'];
  birthday?: Maybe<Scalars['String']>;
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
  preferences: PreferencesInput;
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'register'>
);

export type UsersQueryVariables = {};


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'birthday' | 'first_name' | 'last_name'>
  )> }
);


export const ByeDocument = gql`
    query Bye {
  bye
}
    `;

/**
 * __useByeQuery__
 *
 * To run a query within a React component, call `useByeQuery` and pass it any options that fit your needs.
 * When your component renders, `useByeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useByeQuery({
 *   variables: {
 *   },
 * });
 */
export function useByeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ByeQuery, ByeQueryVariables>) {
        return ApolloReactHooks.useQuery<ByeQuery, ByeQueryVariables>(ByeDocument, baseOptions);
      }
export function useByeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ByeQuery, ByeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ByeQuery, ByeQueryVariables>(ByeDocument, baseOptions);
        }
export type ByeQueryHookResult = ReturnType<typeof useByeQuery>;
export type ByeLazyQueryHookResult = ReturnType<typeof useByeLazyQuery>;
export type ByeQueryResult = ApolloReactCommon.QueryResult<ByeQuery, ByeQueryVariables>;
export const CreateGymDocument = gql`
    mutation CreateGym($gym_name: String!, $description: String!, $membership_cost: Float!, $ownerId: String!, $location: String!, $coordinates: CoordinatesInput!, $type: GymTypes!, $equipment: [String!]!, $photo_urls: [String!]!) {
  createGym(gym_name: $gym_name, description: $description, membership_cost: $membership_cost, ownerId: $ownerId, location: $location, coordinates: $coordinates, type: $type, equipment: $equipment, photo_urls: $photo_urls)
}
    `;
export type CreateGymMutationFn = ApolloReactCommon.MutationFunction<CreateGymMutation, CreateGymMutationVariables>;

/**
 * __useCreateGymMutation__
 *
 * To run a mutation, you first call `useCreateGymMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGymMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGymMutation, { data, loading, error }] = useCreateGymMutation({
 *   variables: {
 *      gym_name: // value for 'gym_name'
 *      description: // value for 'description'
 *      membership_cost: // value for 'membership_cost'
 *      ownerId: // value for 'ownerId'
 *      location: // value for 'location'
 *      coordinates: // value for 'coordinates'
 *      type: // value for 'type'
 *      equipment: // value for 'equipment'
 *      photo_urls: // value for 'photo_urls'
 *   },
 * });
 */
export function useCreateGymMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateGymMutation, CreateGymMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateGymMutation, CreateGymMutationVariables>(CreateGymDocument, baseOptions);
      }
export type CreateGymMutationHookResult = ReturnType<typeof useCreateGymMutation>;
export type CreateGymMutationResult = ApolloReactCommon.MutationResult<CreateGymMutation>;
export type CreateGymMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateGymMutation, CreateGymMutationVariables>;
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        return ApolloReactHooks.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
      }
export function useHelloLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = ApolloReactCommon.QueryResult<HelloQuery, HelloQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    user {
      id
      email
      first_name
      last_name
      username
      birthday
      preferences {
        yoga
        crossfit
        bodybuilding
        parkour
        general
        boxing
      }
      gym {
        id
        gym_name
      }
    }
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    first_name
    last_name
    username
    birthday
    preferences {
      yoga
      crossfit
      bodybuilding
      parkour
      general
      boxing
    }
    gym {
      id
      gym_name
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const MyGymDocument = gql`
    query MyGym {
  myGym {
    ownerId
    gym_name
    description
    membership_cost
    location
    coordinates {
      lat
      lng
    }
    isOpen
    date_created
  }
}
    `;

/**
 * __useMyGymQuery__
 *
 * To run a query within a React component, call `useMyGymQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyGymQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyGymQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyGymQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyGymQuery, MyGymQueryVariables>) {
        return ApolloReactHooks.useQuery<MyGymQuery, MyGymQueryVariables>(MyGymDocument, baseOptions);
      }
export function useMyGymLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyGymQuery, MyGymQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MyGymQuery, MyGymQueryVariables>(MyGymDocument, baseOptions);
        }
export type MyGymQueryHookResult = ReturnType<typeof useMyGymQuery>;
export type MyGymLazyQueryHookResult = ReturnType<typeof useMyGymLazyQuery>;
export type MyGymQueryResult = ApolloReactCommon.QueryResult<MyGymQuery, MyGymQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($last_name: String!, $first_name: String!, $birthday: String, $username: String!, $password: String!, $email: String!, $preferences: PreferencesInput!) {
  register(username: $username, email: $email, password: $password, first_name: $first_name, last_name: $last_name, preferences: $preferences, birthday: $birthday)
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      last_name: // value for 'last_name'
 *      first_name: // value for 'first_name'
 *      birthday: // value for 'birthday'
 *      username: // value for 'username'
 *      password: // value for 'password'
 *      email: // value for 'email'
 *      preferences: // value for 'preferences'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    id
    email
    birthday
    first_name
    last_name
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;