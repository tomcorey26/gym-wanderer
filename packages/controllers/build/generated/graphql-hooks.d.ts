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
export declare type Alert = {
    __typename?: 'Alert';
    message: Scalars['String'];
    link: Scalars['String'];
    isActive: Scalars['Boolean'];
    user: User;
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
    reviews?: Maybe<Array<Reviews>>;
    memberships?: Maybe<Array<Membership>>;
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
export declare type Membership = {
    __typename?: 'Membership';
    id: Scalars['String'];
    isAutoRenewalActive: Scalars['Boolean'];
    end_date: Scalars['Float'];
    payment: Scalars['Float'];
    begin_date: Scalars['String'];
    member: User;
    gym: Gyms;
};
export declare type Mutation = {
    __typename?: 'Mutation';
    deleteUser: Scalars['Boolean'];
    updateUser: Scalars['Boolean'];
    register: Scalars['Boolean'];
    login: LoginResponse;
    logout: Scalars['Boolean'];
    createGym: Scalars['Boolean'];
    joinGym: Scalars['Boolean'];
    createReview: Scalars['Boolean'];
};
export declare type MutationUpdateUserArgs = {
    email?: Maybe<Scalars['String']>;
    first_name?: Maybe<Scalars['String']>;
    last_name?: Maybe<Scalars['String']>;
    username?: Maybe<Scalars['String']>;
    password?: Maybe<Scalars['String']>;
    birthday?: Maybe<Scalars['String']>;
    photo_url?: Maybe<Scalars['String']>;
    preferences?: Maybe<PreferencesInput>;
};
export declare type MutationRegisterArgs = {
    photo_url?: Maybe<Scalars['String']>;
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
    username: Scalars['String'];
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
export declare type MutationJoinGymArgs = {
    payment: Scalars['Float'];
    auto_renewal: Scalars['Boolean'];
    end_date: Scalars['Float'];
    gymId: Scalars['String'];
};
export declare type MutationCreateReviewArgs = {
    text: Scalars['String'];
    rating: Scalars['Float'];
    gymId: Scalars['String'];
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
    getUser?: Maybe<User>;
    me?: Maybe<User>;
    myGym?: Maybe<Gyms>;
    gymDetails?: Maybe<User>;
    gyms: Array<Gyms>;
    myMemberships?: Maybe<Array<Membership>>;
    userMemberships?: Maybe<Array<Membership>>;
    gymMemberships?: Maybe<Array<Membership>>;
    gymReviews?: Maybe<Array<Reviews>>;
    userReviews?: Maybe<Array<Reviews>>;
};
export declare type QueryGetUserArgs = {
    id: Scalars['String'];
};
export declare type QueryGymDetailsArgs = {
    id?: Maybe<Scalars['String']>;
};
export declare type QueryUserMembershipsArgs = {
    userId: Scalars['String'];
};
export declare type QueryGymMembershipsArgs = {
    gymId?: Maybe<Scalars['String']>;
};
export declare type QueryGymReviewsArgs = {
    gymId?: Maybe<Scalars['String']>;
};
export declare type QueryUserReviewsArgs = {
    userId: Scalars['String'];
};
export declare type Reviews = {
    __typename?: 'Reviews';
    rating: Scalars['Int'];
    text: Scalars['String'];
    date_created: Scalars['String'];
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
    photo_url: Scalars['String'];
    preferences: Preferences;
    gym?: Maybe<Gyms>;
    reviews?: Maybe<Array<Reviews>>;
    memberships?: Maybe<Array<Membership>>;
    alerts?: Maybe<Array<Alert>>;
};
export declare type DeleteMyAccountMutationVariables = {};
export declare type DeleteMyAccountMutation = ({
    __typename?: 'Mutation';
} & Pick<Mutation, 'deleteUser'>);
export declare type MyAnalyticsQueryVariables = {};
export declare type MyAnalyticsQuery = ({
    __typename?: 'Query';
} & {
    myGym: Maybe<({
        __typename?: 'Gyms';
    } & Pick<Gyms, 'id' | 'gym_name' | 'membership_cost'> & {
        memberships: Maybe<Array<({
            __typename?: 'Membership';
        } & Pick<Membership, 'id' | 'payment' | 'begin_date' | 'end_date'> & {
            member: ({
                __typename?: 'User';
            } & Pick<User, 'first_name' | 'last_name' | 'id' | 'photo_url'>);
        })>>;
    })>;
    myMemberships: Maybe<Array<({
        __typename?: 'Membership';
    } & Pick<Membership, 'id' | 'payment' | 'begin_date' | 'end_date'> & {
        gym: ({
            __typename?: 'Gyms';
        } & Pick<Gyms, 'id' | 'gym_name' | 'photo_urls' | 'membership_cost'>);
    })>>;
});
export declare type MyProfileQueryVariables = {};
export declare type MyProfileQuery = ({
    __typename?: 'Query';
} & {
    myProfile: Maybe<({
        __typename?: 'User';
    } & {
        preferences: ({
            __typename?: 'Preferences';
        } & Pick<Preferences, 'yoga' | 'crossfit' | 'bodybuilding' | 'parkour' | 'general' | 'boxing'>);
    } & ProfileFragment)>;
});
export declare type UpdateUserMutationVariables = {
    last_name?: Maybe<Scalars['String']>;
    first_name?: Maybe<Scalars['String']>;
    birthday?: Maybe<Scalars['String']>;
    username?: Maybe<Scalars['String']>;
    password?: Maybe<Scalars['String']>;
    email?: Maybe<Scalars['String']>;
    preferences?: Maybe<PreferencesInput>;
    photo_url?: Maybe<Scalars['String']>;
};
export declare type UpdateUserMutation = ({
    __typename?: 'Mutation';
} & Pick<Mutation, 'updateUser'>);
export declare type UserMembershipsInfoQueryVariables = {};
export declare type UserMembershipsInfoQuery = ({
    __typename?: 'Query';
} & {
    myMemberships: Maybe<Array<({
        __typename?: 'Membership';
    } & {
        memberId: Membership['id'];
    } & {
        myGymMemberships: ({
            __typename?: 'Gyms';
        } & Pick<Gyms, 'id'>);
    })>>;
    myGym: Maybe<({
        __typename?: 'Gyms';
    } & Pick<Gyms, 'id'>)>;
});
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
export declare type CreateReviewMutationVariables = {
    text: Scalars['String'];
    rating: Scalars['Float'];
    gymId: Scalars['String'];
};
export declare type CreateReviewMutation = ({
    __typename?: 'Mutation';
} & Pick<Mutation, 'createReview'>);
export declare type FetchGymsQueryVariables = {};
export declare type FetchGymsQuery = ({
    __typename?: 'Query';
} & {
    gyms: Array<({
        __typename?: 'Gyms';
    } & GymInfoFragment)>;
});
export declare type AlertsFragment = ({
    __typename?: 'User';
} & {
    alerts: Maybe<Array<({
        __typename?: 'Alert';
    } & Pick<Alert, 'message' | 'isActive' | 'link'>)>>;
});
export declare type GymInfoFragment = ({
    __typename?: 'Gyms';
} & Pick<Gyms, 'id' | 'gym_name' | 'description' | 'membership_cost' | 'location' | 'equipment' | 'photo_urls' | 'type'> & {
    coordinates: ({
        __typename?: 'Coordinates';
    } & Pick<Coordinates, 'lat' | 'lng'>);
});
export declare type ProfileFragment = ({
    __typename?: 'User';
} & Pick<User, 'id' | 'email' | 'first_name' | 'last_name' | 'username' | 'birthday' | 'photo_url'>);
export declare type GymDetailsQueryVariables = {
    id?: Maybe<Scalars['String']>;
};
export declare type GymDetailsQuery = ({
    __typename?: 'Query';
} & {
    gymDetails: Maybe<({
        __typename?: 'User';
    } & Pick<User, 'email'> & {
        owner_id: User['id'];
        owner_first_name: User['first_name'];
        owner_last_name: User['last_name'];
        owner_photo_url: User['photo_url'];
    } & {
        gym: Maybe<({
            __typename?: 'Gyms';
        } & GymInfoFragment)>;
    })>;
    gymReviews: Maybe<Array<({
        __typename?: 'Reviews';
    } & Pick<Reviews, 'rating' | 'text' | 'date_created'> & {
        creator: ({
            __typename?: 'User';
        } & Pick<User, 'id' | 'first_name' | 'last_name' | 'photo_url'>);
    })>>;
    gymMemberships: Maybe<Array<({
        __typename?: 'Membership';
    } & {
        member: ({
            __typename?: 'User';
        } & Pick<User, 'id' | 'first_name' | 'last_name' | 'photo_url'>);
    })>>;
    me: Maybe<({
        __typename?: 'User';
    } & Pick<User, 'id'>)>;
});
export declare type HelloQueryVariables = {};
export declare type HelloQuery = ({
    __typename?: 'Query';
} & Pick<Query, 'hello'>);
export declare type JoinGymMutationVariables = {
    gymId: Scalars['String'];
    auto_renewal: Scalars['Boolean'];
    end_date: Scalars['Float'];
    payment: Scalars['Float'];
};
export declare type JoinGymMutation = ({
    __typename?: 'Mutation';
} & Pick<Mutation, 'joinGym'>);
export declare type LoginMutationVariables = {
    username: Scalars['String'];
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
        } & {
            preferences: ({
                __typename?: 'Preferences';
            } & Pick<Preferences, 'yoga' | 'crossfit' | 'bodybuilding' | 'parkour' | 'general' | 'boxing'>);
            gym: Maybe<({
                __typename?: 'Gyms';
            } & Pick<Gyms, 'id' | 'gym_name'>)>;
        } & ProfileFragment & AlertsFragment);
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
    } & ProfileFragment & AlertsFragment)>;
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
    photo_url?: Maybe<Scalars['String']>;
};
export declare type RegisterMutation = ({
    __typename?: 'Mutation';
} & Pick<Mutation, 'register'>);
export declare type UserProfileQueryVariables = {
    userId: Scalars['String'];
};
export declare type UserProfileQuery = ({
    __typename?: 'Query';
} & {
    getUser: Maybe<({
        __typename?: 'User';
    } & {
        preferences: ({
            __typename?: 'Preferences';
        } & Pick<Preferences, 'yoga' | 'crossfit' | 'bodybuilding' | 'parkour' | 'general' | 'boxing'>);
        gym: Maybe<({
            __typename?: 'Gyms';
        } & Pick<Gyms, 'id' | 'gym_name'>)>;
    } & ProfileFragment)>;
    userMemberships: Maybe<Array<({
        __typename?: 'Membership';
    } & {
        gym: ({
            __typename?: 'Gyms';
        } & Pick<Gyms, 'id' | 'gym_name' | 'location' | 'type' | 'photo_urls'>);
    })>>;
    userReviews: Maybe<Array<({
        __typename?: 'Reviews';
    } & Pick<Reviews, 'rating' | 'text'> & {
        gym: ({
            __typename?: 'Gyms';
        } & Pick<Gyms, 'id' | 'gym_name'>);
    })>>;
});
export declare type UsersQueryVariables = {};
export declare type UsersQuery = ({
    __typename?: 'Query';
} & {
    users: Array<({
        __typename?: 'User';
    } & ProfileFragment)>;
});
export declare const AlertsFragmentDoc: import("graphql").DocumentNode;
export declare const GymInfoFragmentDoc: import("graphql").DocumentNode;
export declare const ProfileFragmentDoc: import("graphql").DocumentNode;
export declare const DeleteMyAccountDocument: import("graphql").DocumentNode;
export declare type DeleteMyAccountMutationFn = ApolloReactCommon.MutationFunction<DeleteMyAccountMutation, DeleteMyAccountMutationVariables>;
/**
 * __useDeleteMyAccountMutation__
 *
 * To run a mutation, you first call `useDeleteMyAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMyAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMyAccountMutation, { data, loading, error }] = useDeleteMyAccountMutation({
 *   variables: {
 *   },
 * });
 */
export declare function useDeleteMyAccountMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteMyAccountMutation, DeleteMyAccountMutationVariables>): ApolloReactHooks.MutationTuple<DeleteMyAccountMutation, DeleteMyAccountMutationVariables>;
export declare type DeleteMyAccountMutationHookResult = ReturnType<typeof useDeleteMyAccountMutation>;
export declare type DeleteMyAccountMutationResult = ApolloReactCommon.MutationResult<DeleteMyAccountMutation>;
export declare type DeleteMyAccountMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteMyAccountMutation, DeleteMyAccountMutationVariables>;
export declare const MyAnalyticsDocument: import("graphql").DocumentNode;
/**
 * __useMyAnalyticsQuery__
 *
 * To run a query within a React component, call `useMyAnalyticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyAnalyticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyAnalyticsQuery({
 *   variables: {
 *   },
 * });
 */
export declare function useMyAnalyticsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyAnalyticsQuery, MyAnalyticsQueryVariables>): ApolloReactCommon.QueryResult<MyAnalyticsQuery, MyAnalyticsQueryVariables>;
export declare function useMyAnalyticsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyAnalyticsQuery, MyAnalyticsQueryVariables>): ApolloReactHooks.QueryTuple<MyAnalyticsQuery, MyAnalyticsQueryVariables>;
export declare type MyAnalyticsQueryHookResult = ReturnType<typeof useMyAnalyticsQuery>;
export declare type MyAnalyticsLazyQueryHookResult = ReturnType<typeof useMyAnalyticsLazyQuery>;
export declare type MyAnalyticsQueryResult = ApolloReactCommon.QueryResult<MyAnalyticsQuery, MyAnalyticsQueryVariables>;
export declare const MyProfileDocument: import("graphql").DocumentNode;
/**
 * __useMyProfileQuery__
 *
 * To run a query within a React component, call `useMyProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyProfileQuery({
 *   variables: {
 *   },
 * });
 */
export declare function useMyProfileQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyProfileQuery, MyProfileQueryVariables>): ApolloReactCommon.QueryResult<MyProfileQuery, MyProfileQueryVariables>;
export declare function useMyProfileLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyProfileQuery, MyProfileQueryVariables>): ApolloReactHooks.QueryTuple<MyProfileQuery, MyProfileQueryVariables>;
export declare type MyProfileQueryHookResult = ReturnType<typeof useMyProfileQuery>;
export declare type MyProfileLazyQueryHookResult = ReturnType<typeof useMyProfileLazyQuery>;
export declare type MyProfileQueryResult = ApolloReactCommon.QueryResult<MyProfileQuery, MyProfileQueryVariables>;
export declare const UpdateUserDocument: import("graphql").DocumentNode;
export declare type UpdateUserMutationFn = ApolloReactCommon.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;
/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
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
export declare function useUpdateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>): ApolloReactHooks.MutationTuple<UpdateUserMutation, UpdateUserMutationVariables>;
export declare type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export declare type UpdateUserMutationResult = ApolloReactCommon.MutationResult<UpdateUserMutation>;
export declare type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export declare const UserMembershipsInfoDocument: import("graphql").DocumentNode;
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
export declare function useUserMembershipsInfoQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserMembershipsInfoQuery, UserMembershipsInfoQueryVariables>): ApolloReactCommon.QueryResult<UserMembershipsInfoQuery, UserMembershipsInfoQueryVariables>;
export declare function useUserMembershipsInfoLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserMembershipsInfoQuery, UserMembershipsInfoQueryVariables>): ApolloReactHooks.QueryTuple<UserMembershipsInfoQuery, UserMembershipsInfoQueryVariables>;
export declare type UserMembershipsInfoQueryHookResult = ReturnType<typeof useUserMembershipsInfoQuery>;
export declare type UserMembershipsInfoLazyQueryHookResult = ReturnType<typeof useUserMembershipsInfoLazyQuery>;
export declare type UserMembershipsInfoQueryResult = ApolloReactCommon.QueryResult<UserMembershipsInfoQuery, UserMembershipsInfoQueryVariables>;
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
export declare const CreateReviewDocument: import("graphql").DocumentNode;
export declare type CreateReviewMutationFn = ApolloReactCommon.MutationFunction<CreateReviewMutation, CreateReviewMutationVariables>;
/**
 * __useCreateReviewMutation__
 *
 * To run a mutation, you first call `useCreateReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReviewMutation, { data, loading, error }] = useCreateReviewMutation({
 *   variables: {
 *      text: // value for 'text'
 *      rating: // value for 'rating'
 *      gymId: // value for 'gymId'
 *   },
 * });
 */
export declare function useCreateReviewMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateReviewMutation, CreateReviewMutationVariables>): ApolloReactHooks.MutationTuple<CreateReviewMutation, CreateReviewMutationVariables>;
export declare type CreateReviewMutationHookResult = ReturnType<typeof useCreateReviewMutation>;
export declare type CreateReviewMutationResult = ApolloReactCommon.MutationResult<CreateReviewMutation>;
export declare type CreateReviewMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateReviewMutation, CreateReviewMutationVariables>;
export declare const FetchGymsDocument: import("graphql").DocumentNode;
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
export declare function useFetchGymsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FetchGymsQuery, FetchGymsQueryVariables>): ApolloReactCommon.QueryResult<FetchGymsQuery, FetchGymsQueryVariables>;
export declare function useFetchGymsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FetchGymsQuery, FetchGymsQueryVariables>): ApolloReactHooks.QueryTuple<FetchGymsQuery, FetchGymsQueryVariables>;
export declare type FetchGymsQueryHookResult = ReturnType<typeof useFetchGymsQuery>;
export declare type FetchGymsLazyQueryHookResult = ReturnType<typeof useFetchGymsLazyQuery>;
export declare type FetchGymsQueryResult = ApolloReactCommon.QueryResult<FetchGymsQuery, FetchGymsQueryVariables>;
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
export declare const JoinGymDocument: import("graphql").DocumentNode;
export declare type JoinGymMutationFn = ApolloReactCommon.MutationFunction<JoinGymMutation, JoinGymMutationVariables>;
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
 *      payment: // value for 'payment'
 *   },
 * });
 */
export declare function useJoinGymMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<JoinGymMutation, JoinGymMutationVariables>): ApolloReactHooks.MutationTuple<JoinGymMutation, JoinGymMutationVariables>;
export declare type JoinGymMutationHookResult = ReturnType<typeof useJoinGymMutation>;
export declare type JoinGymMutationResult = ApolloReactCommon.MutationResult<JoinGymMutation>;
export declare type JoinGymMutationOptions = ApolloReactCommon.BaseMutationOptions<JoinGymMutation, JoinGymMutationVariables>;
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
 *      username: // value for 'username'
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
 *      photo_url: // value for 'photo_url'
 *   },
 * });
 */
export declare function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>): ApolloReactHooks.MutationTuple<RegisterMutation, RegisterMutationVariables>;
export declare type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export declare type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export declare type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export declare const UserProfileDocument: import("graphql").DocumentNode;
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
export declare function useUserProfileQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserProfileQuery, UserProfileQueryVariables>): ApolloReactCommon.QueryResult<UserProfileQuery, UserProfileQueryVariables>;
export declare function useUserProfileLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserProfileQuery, UserProfileQueryVariables>): ApolloReactHooks.QueryTuple<UserProfileQuery, UserProfileQueryVariables>;
export declare type UserProfileQueryHookResult = ReturnType<typeof useUserProfileQuery>;
export declare type UserProfileLazyQueryHookResult = ReturnType<typeof useUserProfileLazyQuery>;
export declare type UserProfileQueryResult = ApolloReactCommon.QueryResult<UserProfileQuery, UserProfileQueryVariables>;
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
