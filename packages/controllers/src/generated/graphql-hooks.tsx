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

export type Alert = {
   __typename?: 'Alert';
  message: Scalars['String'];
  link: Scalars['String'];
  isActive: Scalars['Boolean'];
  user: User;
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
  membership_cost: Scalars['String'];
  ownerId: Scalars['String'];
  location: Scalars['String'];
  equipment: Array<Scalars['String']>;
  photo_urls: Array<Scalars['String']>;
  coordinates: Coordinates;
  type: GymTypes;
  isOpen: Scalars['Boolean'];
  date_created: Scalars['String'];
  reviews?: Maybe<Array<Reviews>>;
  memberships?: Maybe<Array<Membership>>;
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

export type Membership = {
   __typename?: 'Membership';
  id: Scalars['String'];
  isAutoRenewalActive: Scalars['Boolean'];
  end_date: Scalars['Float'];
  member: User;
  gym: Gyms;
};

export type Mutation = {
   __typename?: 'Mutation';
  register: Scalars['Boolean'];
  login: LoginResponse;
  logout: Scalars['Boolean'];
  createGym: Scalars['Boolean'];
  joinGym: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  photo_url?: Maybe<Scalars['String']>;
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
  membership_cost: Scalars['String'];
  ownerId: Scalars['String'];
  location: Scalars['String'];
  coordinates: CoordinatesInput;
  equipment: Array<Scalars['String']>;
  photo_urls: Array<Scalars['String']>;
};


export type MutationJoinGymArgs = {
  auto_renewal: Scalars['Boolean'];
  end_date: Scalars['Float'];
  gymId: Scalars['String'];
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
  getUser?: Maybe<User>;
  deleteUser: Scalars['Boolean'];
  me?: Maybe<User>;
  myGym?: Maybe<Gyms>;
  gymDetails?: Maybe<User>;
  gyms: Array<Gyms>;
  myMemberships?: Maybe<Array<Membership>>;
  userMemberships?: Maybe<Array<Membership>>;
  gymMemberships?: Maybe<Array<Membership>>;
};


export type QueryGetUserArgs = {
  id: Scalars['String'];
};


export type QueryGymDetailsArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryUserMembershipsArgs = {
  userId: Scalars['String'];
};


export type QueryGymMembershipsArgs = {
  gymId?: Maybe<Scalars['String']>;
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
  photo_url?: Maybe<Scalars['String']>;
  preferences: Preferences;
  gym?: Maybe<Gyms>;
  reviews?: Maybe<Array<Reviews>>;
  memberships?: Maybe<Array<Membership>>;
  alerts?: Maybe<Array<Alert>>;
};

export type UserMembershipsInfoQueryVariables = {};


export type UserMembershipsInfoQuery = (
  { __typename?: 'Query' }
  & { myMemberships: Maybe<Array<(
    { __typename?: 'Membership' }
    & { memberId: Membership['id'] }
    & { myGymMemberships: (
      { __typename?: 'Gyms' }
      & Pick<Gyms, 'id'>
    ) }
  )>>, myGym: Maybe<(
    { __typename?: 'Gyms' }
    & Pick<Gyms, 'id'>
  )> }
);

export type ByeQueryVariables = {};


export type ByeQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'bye'>
);

export type CreateGymMutationVariables = {
  gym_name: Scalars['String'];
  description: Scalars['String'];
  membership_cost: Scalars['String'];
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

export type FetchGymsQueryVariables = {};


export type FetchGymsQuery = (
  { __typename?: 'Query' }
  & { gyms: Array<(
    { __typename?: 'Gyms' }
    & GymInfoFragment
  )> }
);

export type AlertsFragment = (
  { __typename?: 'User' }
  & { alerts: Maybe<Array<(
    { __typename?: 'Alert' }
    & Pick<Alert, 'message' | 'isActive' | 'link'>
  )>> }
);

export type GymInfoFragment = (
  { __typename?: 'Gyms' }
  & Pick<Gyms, 'id' | 'gym_name' | 'description' | 'membership_cost' | 'location' | 'equipment' | 'photo_urls' | 'type'>
  & { coordinates: (
    { __typename?: 'Coordinates' }
    & Pick<Coordinates, 'lat' | 'lng'>
  ) }
);

export type ProfileFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'email' | 'first_name' | 'last_name' | 'username' | 'birthday' | 'photo_url'>
);

export type GymDetailsQueryVariables = {
  id?: Maybe<Scalars['String']>;
};


export type GymDetailsQuery = (
  { __typename?: 'Query' }
  & { gymDetails: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'email'>
    & { owner_first_name: User['first_name'], owner_last_name: User['last_name'] }
    & { gym: Maybe<(
      { __typename?: 'Gyms' }
      & GymInfoFragment
    )> }
  )> }
);

export type HelloQueryVariables = {};


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);

export type JoinGymMutationVariables = {
  gymId: Scalars['String'];
  auto_renewal: Scalars['Boolean'];
  end_date: Scalars['Float'];
};


export type JoinGymMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'joinGym'>
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
      & { preferences: (
        { __typename?: 'Preferences' }
        & Pick<Preferences, 'yoga' | 'crossfit' | 'bodybuilding' | 'parkour' | 'general' | 'boxing'>
      ), gym: Maybe<(
        { __typename?: 'Gyms' }
        & Pick<Gyms, 'id' | 'gym_name'>
      )> }
      & ProfileFragment
      & AlertsFragment
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
    & { preferences: (
      { __typename?: 'Preferences' }
      & Pick<Preferences, 'yoga' | 'crossfit' | 'bodybuilding' | 'parkour' | 'general' | 'boxing'>
    ), gym: Maybe<(
      { __typename?: 'Gyms' }
      & Pick<Gyms, 'id' | 'gym_name'>
    )> }
    & ProfileFragment
    & AlertsFragment
  )> }
);

export type MyGymQueryVariables = {};


export type MyGymQuery = (
  { __typename?: 'Query' }
  & { myGym: Maybe<(
    { __typename?: 'Gyms' }
    & GymInfoFragment
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
  photo_url?: Maybe<Scalars['String']>;
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'register'>
);

export type UserProfileQueryVariables = {
  userId: Scalars['String'];
};


export type UserProfileQuery = (
  { __typename?: 'Query' }
  & { getUser: Maybe<(
    { __typename?: 'User' }
    & { preferences: (
      { __typename?: 'Preferences' }
      & Pick<Preferences, 'yoga' | 'crossfit' | 'bodybuilding' | 'parkour' | 'general' | 'boxing'>
    ), gym: Maybe<(
      { __typename?: 'Gyms' }
      & Pick<Gyms, 'id' | 'gym_name'>
    )> }
    & ProfileFragment
  )>, userMemberships: Maybe<Array<(
    { __typename?: 'Membership' }
    & { gym: (
      { __typename?: 'Gyms' }
      & Pick<Gyms, 'id' | 'gym_name' | 'location' | 'type'>
    ) }
  )>> }
);

export type UsersQueryVariables = {};


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & ProfileFragment
  )> }
);

export const AlertsFragmentDoc = gql`
    fragment alerts on User {
  alerts {
    message
    isActive
    link
  }
}
    `;
export const GymInfoFragmentDoc = gql`
    fragment gymInfo on Gyms {
  id
  gym_name
  description
  membership_cost
  location
  equipment
  photo_urls
  coordinates {
    lat
    lng
  }
  type
}
    `;
export const ProfileFragmentDoc = gql`
    fragment profile on User {
  id
  email
  first_name
  last_name
  username
  birthday
  photo_url
}
    `;
export const UserMembershipsInfoDocument = gql`
    query UserMembershipsInfo {
  myMemberships {
    memberId: id
    myGymMemberships: gym {
      id
    }
  }
  myGym {
    id
  }
}
    `;

/**
 * __useUserMembershipsInfoQuery__
 *
 * To run a query within a React component, call `useUserMembershipsInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserMembershipsInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserMembershipsInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserMembershipsInfoQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserMembershipsInfoQuery, UserMembershipsInfoQueryVariables>) {
        return ApolloReactHooks.useQuery<UserMembershipsInfoQuery, UserMembershipsInfoQueryVariables>(UserMembershipsInfoDocument, baseOptions);
      }
export function useUserMembershipsInfoLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserMembershipsInfoQuery, UserMembershipsInfoQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserMembershipsInfoQuery, UserMembershipsInfoQueryVariables>(UserMembershipsInfoDocument, baseOptions);
        }
export type UserMembershipsInfoQueryHookResult = ReturnType<typeof useUserMembershipsInfoQuery>;
export type UserMembershipsInfoLazyQueryHookResult = ReturnType<typeof useUserMembershipsInfoLazyQuery>;
export type UserMembershipsInfoQueryResult = ApolloReactCommon.QueryResult<UserMembershipsInfoQuery, UserMembershipsInfoQueryVariables>;
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
    mutation CreateGym($gym_name: String!, $description: String!, $membership_cost: String!, $ownerId: String!, $location: String!, $coordinates: CoordinatesInput!, $type: GymTypes!, $equipment: [String!]!, $photo_urls: [String!]!) {
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
export const FetchGymsDocument = gql`
    query FetchGyms {
  gyms {
    ...gymInfo
  }
}
    ${GymInfoFragmentDoc}`;

/**
 * __useFetchGymsQuery__
 *
 * To run a query within a React component, call `useFetchGymsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchGymsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchGymsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchGymsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FetchGymsQuery, FetchGymsQueryVariables>) {
        return ApolloReactHooks.useQuery<FetchGymsQuery, FetchGymsQueryVariables>(FetchGymsDocument, baseOptions);
      }
export function useFetchGymsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FetchGymsQuery, FetchGymsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FetchGymsQuery, FetchGymsQueryVariables>(FetchGymsDocument, baseOptions);
        }
export type FetchGymsQueryHookResult = ReturnType<typeof useFetchGymsQuery>;
export type FetchGymsLazyQueryHookResult = ReturnType<typeof useFetchGymsLazyQuery>;
export type FetchGymsQueryResult = ApolloReactCommon.QueryResult<FetchGymsQuery, FetchGymsQueryVariables>;
export const GymDetailsDocument = gql`
    query gymDetails($id: String) {
  gymDetails(id: $id) {
    owner_first_name: first_name
    owner_last_name: last_name
    email
    gym {
      ...gymInfo
    }
  }
}
    ${GymInfoFragmentDoc}`;

/**
 * __useGymDetailsQuery__
 *
 * To run a query within a React component, call `useGymDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGymDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGymDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGymDetailsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GymDetailsQuery, GymDetailsQueryVariables>) {
        return ApolloReactHooks.useQuery<GymDetailsQuery, GymDetailsQueryVariables>(GymDetailsDocument, baseOptions);
      }
export function useGymDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GymDetailsQuery, GymDetailsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GymDetailsQuery, GymDetailsQueryVariables>(GymDetailsDocument, baseOptions);
        }
export type GymDetailsQueryHookResult = ReturnType<typeof useGymDetailsQuery>;
export type GymDetailsLazyQueryHookResult = ReturnType<typeof useGymDetailsLazyQuery>;
export type GymDetailsQueryResult = ApolloReactCommon.QueryResult<GymDetailsQuery, GymDetailsQueryVariables>;
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
export const JoinGymDocument = gql`
    mutation joinGym($gymId: String!, $auto_renewal: Boolean!, $end_date: Float!) {
  joinGym(auto_renewal: $auto_renewal, end_date: $end_date, gymId: $gymId)
}
    `;
export type JoinGymMutationFn = ApolloReactCommon.MutationFunction<JoinGymMutation, JoinGymMutationVariables>;

/**
 * __useJoinGymMutation__
 *
 * To run a mutation, you first call `useJoinGymMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinGymMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinGymMutation, { data, loading, error }] = useJoinGymMutation({
 *   variables: {
 *      gymId: // value for 'gymId'
 *      auto_renewal: // value for 'auto_renewal'
 *      end_date: // value for 'end_date'
 *   },
 * });
 */
export function useJoinGymMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<JoinGymMutation, JoinGymMutationVariables>) {
        return ApolloReactHooks.useMutation<JoinGymMutation, JoinGymMutationVariables>(JoinGymDocument, baseOptions);
      }
export type JoinGymMutationHookResult = ReturnType<typeof useJoinGymMutation>;
export type JoinGymMutationResult = ApolloReactCommon.MutationResult<JoinGymMutation>;
export type JoinGymMutationOptions = ApolloReactCommon.BaseMutationOptions<JoinGymMutation, JoinGymMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    user {
      ...profile
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
      ...alerts
    }
  }
}
    ${ProfileFragmentDoc}
${AlertsFragmentDoc}`;
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
    ...profile
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
    ...alerts
  }
}
    ${ProfileFragmentDoc}
${AlertsFragmentDoc}`;

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
    ...gymInfo
  }
}
    ${GymInfoFragmentDoc}`;

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
    mutation Register($last_name: String!, $first_name: String!, $birthday: String, $username: String!, $password: String!, $email: String!, $preferences: PreferencesInput!, $photo_url: String) {
  register(username: $username, email: $email, password: $password, first_name: $first_name, last_name: $last_name, preferences: $preferences, birthday: $birthday, photo_url: $photo_url)
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
 *      photo_url: // value for 'photo_url'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UserProfileDocument = gql`
    query userProfile($userId: String!) {
  getUser(id: $userId) {
    ...profile
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
  userMemberships(userId: $userId) {
    gym {
      id
      gym_name
      location
      type
    }
  }
}
    ${ProfileFragmentDoc}`;

/**
 * __useUserProfileQuery__
 *
 * To run a query within a React component, call `useUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProfileQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserProfileQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserProfileQuery, UserProfileQueryVariables>) {
        return ApolloReactHooks.useQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, baseOptions);
      }
export function useUserProfileLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserProfileQuery, UserProfileQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, baseOptions);
        }
export type UserProfileQueryHookResult = ReturnType<typeof useUserProfileQuery>;
export type UserProfileLazyQueryHookResult = ReturnType<typeof useUserProfileLazyQuery>;
export type UserProfileQueryResult = ApolloReactCommon.QueryResult<UserProfileQuery, UserProfileQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    ...profile
  }
}
    ${ProfileFragmentDoc}`;

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