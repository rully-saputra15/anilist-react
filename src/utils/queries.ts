import { gql } from "../__generated__/gql";
export const GET_ANIME_LIST = gql(` 
query GetAnimeList($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME) {
        id
        title {
          native
          romaji
          english
        }
        coverImage {
          large
          medium
        }
        bannerImage
        averageScore
      }
    }
  }`);

export const GET_ANIME_DETAIL = gql(`
query GetAnimeDetail($id: Int) {
  Media (id: $id, type: ANIME) {
    id
    title {
      romaji
      english
      native
    }
    coverImage {
      large
    }
    bannerImage
    description
    genres
    episodes
    duration
    chapters
    averageScore
    startDate {
      year
      month
      day
    }
    endDate {
      year
      month
      day
    }
    popularity
    trending
    studios{
      nodes {
        id
        siteUrl
        name
      }
    }
    recommendations {
      nodes {
        id
        rating
        mediaRecommendation {
          id
          title {
            english
          }
          coverImage {
            medium
          }
          averageScore
          popularity
          trending
        }
      }
    }
  }
}`);
