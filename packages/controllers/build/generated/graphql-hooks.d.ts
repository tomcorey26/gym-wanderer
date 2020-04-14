import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export declare type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};
export declare type Gyms = {
    __typename?: 'Gyms';
    id: Scalars['String'];
    gym_name: Scalars['String'];
    description: Scalars['String'];
    membership_cost: Scalars['Int'];
    isOpen: Scalars['Boolean'];
    date_created: Scalars['String'];
    ownerId: Scalars['String'];
    owners: Array<User>;
    members: Array<User>;
    reviews: Array<Reviews>;
};
export declare type LoginResponse = {
    __typename?: 'LoginResponse';
    accessToken: Scalars['String'];
    user: User;
};
export declare type Mutation = {
    __typename?: 'Mutation';
    register: Scalars['Boolean'];
    login: LoginResponse;
    logout: Scalars['Boolean'];
    createGym: Scalars['Boolean'];
};
export declare type MutationRegisterArgs = {
    birthday?: Maybe<Scalars['String']>;
    preferences: PreferencesInput;
    last_name: Scalars['String'];
    first_name: Scalars['String'];
    password: Scalars['String'];
    email: Scalars['String'];
    username: Scalars['String'];
};
export declare type MutationLoginArgs = {
    password: Scalars['String'];
    email: Scalars['String'];
};
export declare type MutationCreateGymArgs = {
    title: Scalars['String'];
};
export declare type Preferences = {
    __typename?: 'Preferences';
    yoga: Scalars['Boolean'];
    crossfit: Scalars['Boolean'];
    bodybuilding: Scalars['Boolean'];
    parkour: Scalars['Boolean'];
    general: Scalars['Boolean'];
    boxing: Scalars['Boolean'];
};
export declare type PreferencesInput = {
    yoga: Scalars['Boolean'];
    crossfit: Scalars['Boolean'];
    bodybuilding: Scalars['Boolean'];
    parkour: Scalars['Boolean'];
    general: Scalars['Boolean'];
    boxing: Scalars['Boolean'];
};
export declare type Query = {
    __typename?: 'Query';
    hello: Scalars['String'];
    bye: Scalars['String'];
    users: Array<User>;
    me?: Maybe<User>;
};
export declare type Reviews = {
    __typename?: 'Reviews';
    rating: Scalars['Int'];
    text: Scalars['String'];
    creator: User;
    gym: Gyms;
};
export declare type User = {
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
export declare type ByeQueryVariables = {};
export declare type ByeQuery = ({
    __typename?: 'Query';
} & Pick<Query, 'bye'>);
export declare type HelloQueryVariables = {};
export declare type HelloQuery = ({
    __typename?: 'Query';
} & Pick<Query, 'hello'>);
export declare type LoginMutationVariables = {
    email: Scalars['String'];
    password: Scalars['String'];
};
export declare type LoginMutation = ({
    __typename?: 'Mutation';
} & {
    login: ({
        __typename?: 'LoginResponse';
    } & Pick<LoginResponse, 'accessToken'> & {
        user: ({
            __typename?: 'User';
        } & Pick<User, 'id' | 'email'>);
    });
});
export declare type LogoutMutationVariables = {};
export declare type LogoutMutation = ({
    __typename?: 'Mutation';
} & Pick<Mutation, 'logout'>);
export declare type MeQueryVariables = {};
export declare type MeQuery = ({
    __typename?: 'Query';
} & {
    me: Maybe<({
        __typename?: 'User';
    } & Pick<User, 'id' | 'email'>)>;
});
export declare type RegisterMutationVariables = {
    last_name: Scalars['String'];
    first_name: Scalars['String'];
    birthday?: Maybe<Scalars['String']>;
    username: Scalars['String'];
    password: Scalars['String'];
    email: Scalars['String'];
    preferences: PreferencesInput;
};
export declare type RegisterMutation = ({
    __typename?: 'Mutation';
} & Pick<Mutation, 'register'>);
export declare type UsersQueryVariables = {};
export declare type UsersQuery = ({
    __typename?: 'Query';
} & {
    users: Array<({
        __typename?: 'User';
    } & Pick<User, 'id' | 'email' | 'birthday' | 'first_name' | 'last_name'>)>;
});
export declare const ByeDocument: import("graphql").DocumentNode;
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
export declare function useByeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ByeQuery, ByeQueryVariables>): ApolloReactCommon.QueryResult<ByeQuery, ByeQueryVariables>;
export declare function useByeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ByeQuery, ByeQueryVariables>): ApolloReactHooks.QueryTuple<ByeQuery, ByeQueryVariables>;
export declare type ByeQueryHookResult = ReturnType<typeof useByeQuery>;
export declare type ByeLazyQueryHookResult = ReturnType<typeof useByeLazyQuery>;
export declare type ByeQueryResult = ApolloReactCommon.QueryResult<ByeQuery, ByeQueryVariables>;
export declare const HelloDocument: import("graphql").DocumentNode;
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
export declare function useHelloQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<HelloQuery, HelloQueryVariables>): ApolloReactCommon.QueryResult<HelloQuery, HelloQueryVariables>;
export declare function useHelloLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>): ApolloReactHooks.QueryTuple<HelloQuery, HelloQueryVariables>;
export declare type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export declare type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export declare type HelloQueryResult = ApolloReactCommon.QueryResult<HelloQuery, HelloQueryVariables>;
export declare const LoginDocument: import("graphql").DocumentNode;
export declare type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;
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
export declare function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>): ApolloReactHooks.MutationTuple<LoginMutation, LoginMutationVariables>;
export declare type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export declare type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export declare type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export declare const LogoutDocument: import("graphql").DocumentNode;
export declare type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;
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
export declare function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>): ApolloReactHooks.MutationTuple<LogoutMutation, LogoutMutationVariables>;
export declare type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export declare type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export declare type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export declare const MeDocument: import("graphql").DocumentNode;
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
export declare function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>): ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export declare function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>): ApolloReactHooks.QueryTuple<MeQuery, MeQueryVariables>;
export declare type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export declare type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export declare type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export declare const RegisterDocument: import("graphql").DocumentNode;
export declare type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;
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
export declare function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>): ApolloReactHooks.MutationTuple<RegisterMutation, RegisterMutationVariables>;
export declare type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export declare type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export declare type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export declare const UsersDocument: import("graphql").DocumentNode;
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
export declare function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>): ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;
export declare function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>): ApolloReactHooks.QueryTuple<UsersQuery, UsersQueryVariables>;
export declare type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export declare type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export declare type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;
