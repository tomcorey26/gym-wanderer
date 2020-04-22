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
export declare type Coordinates = {
    __typename?: 'Coordinates';
    lat: Scalars['Float'];
    lng: Scalars['Float'];
};
export declare type CoordinatesInput = {
    lat: Scalars['Float'];
    lng: Scalars['Float'];
};
export declare type Gyms = {
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
    owners: Array<User>;
    members: Array<User>;
    reviews: Array<Reviews>;
};
/** The types of gyms available on gym wanderer */
export declare enum GymTypes {
    Yoga = "yoga",
    Crossfit = "crossfit",
    Bodybuilding = "bodybuilding",
    Parkour = "parkour",
    General = "general",
    Boxing = "boxing"
}
export declare type LoginResponse = {
    __typename?: 'LoginResponse';
    user: User;
    accessToken: Scalars['String'];
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
    myGym?: Maybe<Gyms>;
    gymDetails?: Maybe<User>;
    gyms: Array<Gyms>;
};
export declare type QueryGymDetailsArgs = {
    id?: Maybe<Scalars['String']>;
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
export declare type CreateGymMutationVariables = {
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
export declare type CreateGymMutation = ({
    __typename?: 'Mutation';
} & Pick<Mutation, 'createGym'>);
export declare type GymInfoFragment = ({
    __typename?: 'Gyms';
} & Pick<Gyms, 'gym_name' | 'description' | 'membership_cost' | 'location' | 'equipment' | 'photo_urls' | 'type'> & {
    coordinates: ({
        __typename?: 'Coordinates';
    } & Pick<Coordinates, 'lat' | 'lng'>);
});
export declare type ProfileFragment = ({
    __typename?: 'User';
} & Pick<User, 'id' | 'email' | 'first_name' | 'last_name' | 'username' | 'birthday'>);
export declare type GymDetailsQueryVariables = {
    id?: Maybe<Scalars['String']>;
};
export declare type GymDetailsQuery = ({
    __typename?: 'Query';
} & {
    gymDetails: Maybe<({
        __typename?: 'User';
    } & Pick<User, 'first_name' | 'last_name' | 'email'> & {
        gym: Maybe<({
            __typename?: 'Gyms';
        } & GymInfoFragment)>;
    })>;
});
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
        } & Pick<User, 'id' | 'email' | 'first_name' | 'last_name' | 'username' | 'birthday'> & {
            preferences: ({
                __typename?: 'Preferences';
            } & Pick<Preferences, 'yoga' | 'crossfit' | 'bodybuilding' | 'parkour' | 'general' | 'boxing'>);
            gym: Maybe<({
                __typename?: 'Gyms';
            } & Pick<Gyms, 'id' | 'gym_name'>)>;
        });
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
    } & {
        preferences: ({
            __typename?: 'Preferences';
        } & Pick<Preferences, 'yoga' | 'crossfit' | 'bodybuilding' | 'parkour' | 'general' | 'boxing'>);
        gym: Maybe<({
            __typename?: 'Gyms';
        } & Pick<Gyms, 'id' | 'gym_name'>)>;
    } & ProfileFragment)>;
});
export declare type MyGymQueryVariables = {};
export declare type MyGymQuery = ({
    __typename?: 'Query';
} & {
    myGym: Maybe<({
        __typename?: 'Gyms';
    } & GymInfoFragment)>;
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
    } & ProfileFragment)>;
});
export declare const GymInfoFragmentDoc: import("graphql").DocumentNode;
export declare const ProfileFragmentDoc: import("graphql").DocumentNode;
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
export declare const CreateGymDocument: import("graphql").DocumentNode;
export declare type CreateGymMutationFn = ApolloReactCommon.MutationFunction<CreateGymMutation, CreateGymMutationVariables>;
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
export declare function useCreateGymMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateGymMutation, CreateGymMutationVariables>): ApolloReactHooks.MutationTuple<CreateGymMutation, CreateGymMutationVariables>;
export declare type CreateGymMutationHookResult = ReturnType<typeof useCreateGymMutation>;
export declare type CreateGymMutationResult = ApolloReactCommon.MutationResult<CreateGymMutation>;
export declare type CreateGymMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateGymMutation, CreateGymMutationVariables>;
export declare const GymDetailsDocument: import("graphql").DocumentNode;
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
export declare function useGymDetailsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GymDetailsQuery, GymDetailsQueryVariables>): ApolloReactCommon.QueryResult<GymDetailsQuery, GymDetailsQueryVariables>;
export declare function useGymDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GymDetailsQuery, GymDetailsQueryVariables>): ApolloReactHooks.QueryTuple<GymDetailsQuery, GymDetailsQueryVariables>;
export declare type GymDetailsQueryHookResult = ReturnType<typeof useGymDetailsQuery>;
export declare type GymDetailsLazyQueryHookResult = ReturnType<typeof useGymDetailsLazyQuery>;
export declare type GymDetailsQueryResult = ApolloReactCommon.QueryResult<GymDetailsQuery, GymDetailsQueryVariables>;
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
export declare const MyGymDocument: import("graphql").DocumentNode;
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
export declare function useMyGymQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyGymQuery, MyGymQueryVariables>): ApolloReactCommon.QueryResult<MyGymQuery, MyGymQueryVariables>;
export declare function useMyGymLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyGymQuery, MyGymQueryVariables>): ApolloReactHooks.QueryTuple<MyGymQuery, MyGymQueryVariables>;
export declare type MyGymQueryHookResult = ReturnType<typeof useMyGymQuery>;
export declare type MyGymLazyQueryHookResult = ReturnType<typeof useMyGymLazyQuery>;
export declare type MyGymQueryResult = ApolloReactCommon.QueryResult<MyGymQuery, MyGymQueryVariables>;
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
