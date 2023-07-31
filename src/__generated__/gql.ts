/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    " \nquery GetAnimeList($page: Int, $perPage: Int) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        total\n        currentPage\n        lastPage\n        hasNextPage\n        perPage\n      }\n      media(type: ANIME) {\n        id\n        title {\n          native\n          romaji\n          english\n        }\n        coverImage {\n          large\n          medium\n        }\n        bannerImage\n        averageScore\n      }\n    }\n  }": types.GetAnimeListDocument,
    "\nquery GetAnimeDetail($id: Int) {\n  Media (id: $id, type: ANIME) {\n    id\n    title {\n      romaji\n      english\n      native\n    }\n    coverImage {\n      large\n    }\n    bannerImage\n    description\n    genres\n    episodes\n    duration\n    chapters\n    averageScore\n    startDate {\n      year\n      month\n      day\n    }\n    endDate {\n      year\n      month\n      day\n    }\n    popularity\n    trending\n    studios{\n      nodes {\n        id\n        siteUrl\n        name\n      }\n    }\n    recommendations {\n      nodes {\n        id\n        rating\n        mediaRecommendation {\n          id\n          title {\n            english\n          }\n          coverImage {\n            medium\n          }\n          averageScore\n          popularity\n          trending\n        }\n      }\n    }\n  }\n}": types.GetAnimeDetailDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: " \nquery GetAnimeList($page: Int, $perPage: Int) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        total\n        currentPage\n        lastPage\n        hasNextPage\n        perPage\n      }\n      media(type: ANIME) {\n        id\n        title {\n          native\n          romaji\n          english\n        }\n        coverImage {\n          large\n          medium\n        }\n        bannerImage\n        averageScore\n      }\n    }\n  }"): (typeof documents)[" \nquery GetAnimeList($page: Int, $perPage: Int) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        total\n        currentPage\n        lastPage\n        hasNextPage\n        perPage\n      }\n      media(type: ANIME) {\n        id\n        title {\n          native\n          romaji\n          english\n        }\n        coverImage {\n          large\n          medium\n        }\n        bannerImage\n        averageScore\n      }\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetAnimeDetail($id: Int) {\n  Media (id: $id, type: ANIME) {\n    id\n    title {\n      romaji\n      english\n      native\n    }\n    coverImage {\n      large\n    }\n    bannerImage\n    description\n    genres\n    episodes\n    duration\n    chapters\n    averageScore\n    startDate {\n      year\n      month\n      day\n    }\n    endDate {\n      year\n      month\n      day\n    }\n    popularity\n    trending\n    studios{\n      nodes {\n        id\n        siteUrl\n        name\n      }\n    }\n    recommendations {\n      nodes {\n        id\n        rating\n        mediaRecommendation {\n          id\n          title {\n            english\n          }\n          coverImage {\n            medium\n          }\n          averageScore\n          popularity\n          trending\n        }\n      }\n    }\n  }\n}"): (typeof documents)["\nquery GetAnimeDetail($id: Int) {\n  Media (id: $id, type: ANIME) {\n    id\n    title {\n      romaji\n      english\n      native\n    }\n    coverImage {\n      large\n    }\n    bannerImage\n    description\n    genres\n    episodes\n    duration\n    chapters\n    averageScore\n    startDate {\n      year\n      month\n      day\n    }\n    endDate {\n      year\n      month\n      day\n    }\n    popularity\n    trending\n    studios{\n      nodes {\n        id\n        siteUrl\n        name\n      }\n    }\n    recommendations {\n      nodes {\n        id\n        rating\n        mediaRecommendation {\n          id\n          title {\n            english\n          }\n          coverImage {\n            medium\n          }\n          averageScore\n          popularity\n          trending\n        }\n      }\n    }\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;