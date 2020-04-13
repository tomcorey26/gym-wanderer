"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = __importDefault(require("graphql-tag"));
var ApolloReactHooks = __importStar(require("@apollo/react-hooks"));
exports.ByeDocument = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    query Bye {\n  bye\n}\n    "], ["\n    query Bye {\n  bye\n}\n    "])));
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
function useByeQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.ByeDocument, baseOptions);
}
exports.useByeQuery = useByeQuery;
function useByeLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.ByeDocument, baseOptions);
}
exports.useByeLazyQuery = useByeLazyQuery;
exports.HelloDocument = graphql_tag_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    query Hello {\n  hello\n}\n    "], ["\n    query Hello {\n  hello\n}\n    "])));
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
function useHelloQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.HelloDocument, baseOptions);
}
exports.useHelloQuery = useHelloQuery;
function useHelloLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.HelloDocument, baseOptions);
}
exports.useHelloLazyQuery = useHelloLazyQuery;
exports.LoginDocument = graphql_tag_1.default(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    mutation Login($email: String!, $password: String!) {\n  login(email: $email, password: $password) {\n    accessToken\n    user {\n      id\n      email\n    }\n  }\n}\n    "], ["\n    mutation Login($email: String!, $password: String!) {\n  login(email: $email, password: $password) {\n    accessToken\n    user {\n      id\n      email\n    }\n  }\n}\n    "])));
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
function useLoginMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.LoginDocument, baseOptions);
}
exports.useLoginMutation = useLoginMutation;
exports.LogoutDocument = graphql_tag_1.default(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    mutation Logout {\n  logout\n}\n    "], ["\n    mutation Logout {\n  logout\n}\n    "])));
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
function useLogoutMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.LogoutDocument, baseOptions);
}
exports.useLogoutMutation = useLogoutMutation;
exports.MeDocument = graphql_tag_1.default(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    query Me {\n  me {\n    id\n    email\n  }\n}\n    "], ["\n    query Me {\n  me {\n    id\n    email\n  }\n}\n    "])));
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
function useMeQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.MeDocument, baseOptions);
}
exports.useMeQuery = useMeQuery;
function useMeLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.MeDocument, baseOptions);
}
exports.useMeLazyQuery = useMeLazyQuery;
exports.RegisterDocument = graphql_tag_1.default(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    mutation Register($last_name: String!, $first_name: String!, $birthday: String, $password: String!, $email: String!, $preferences: PreferencesInput!) {\n  register(email: $email, password: $password, first_name: $first_name, last_name: $last_name, preferences: $preferences, birthday: $birthday)\n}\n    "], ["\n    mutation Register($last_name: String!, $first_name: String!, $birthday: String, $password: String!, $email: String!, $preferences: PreferencesInput!) {\n  register(email: $email, password: $password, first_name: $first_name, last_name: $last_name, preferences: $preferences, birthday: $birthday)\n}\n    "])));
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
 *      password: // value for 'password'
 *      email: // value for 'email'
 *      preferences: // value for 'preferences'
 *   },
 * });
 */
function useRegisterMutation(baseOptions) {
    return ApolloReactHooks.useMutation(exports.RegisterDocument, baseOptions);
}
exports.useRegisterMutation = useRegisterMutation;
exports.UsersDocument = graphql_tag_1.default(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    query Users {\n  users {\n    id\n    email\n    birthday\n    first_name\n    last_name\n  }\n}\n    "], ["\n    query Users {\n  users {\n    id\n    email\n    birthday\n    first_name\n    last_name\n  }\n}\n    "])));
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
function useUsersQuery(baseOptions) {
    return ApolloReactHooks.useQuery(exports.UsersDocument, baseOptions);
}
exports.useUsersQuery = useUsersQuery;
function useUsersLazyQuery(baseOptions) {
    return ApolloReactHooks.useLazyQuery(exports.UsersDocument, baseOptions);
}
exports.useUsersLazyQuery = useUsersLazyQuery;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;