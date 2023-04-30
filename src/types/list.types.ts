import {
  ApplicationType,
  BlogCommentType,
  BlogType,
  BookCommentType,
  BookmarkType,
  BookType,
  ChapterType,
  ContestCommentType,
  GenreType,
  ModerationType,
  RatingType,
  UserType,
} from "./types";

export interface BookmarkListType {
  rows: BookmarkType[];
  count: number;
}

export interface UserListType {
  rows: UserType[];
  count: number;
}

export interface BookListType {
  rows: BookType[];
  count: number;
}

export interface ApplicationListType {
  rows: ApplicationType[];
  count: number;
}

export interface BlogListType {
  rows: BlogType[];
  count: number;
}

export interface ChaptersListType {
  rows: ChapterType[];
  count: number;
}

export interface RatingListType {
  rows: RatingType[];
  count: number;
}

export interface GenreListType {
  rows: GenreType[];
  count: number;
}

export interface BookCommentListType {
  rows: BookCommentType[];
  count: number;
}

export interface ContestCommentListType {
  rows: ContestCommentType[];
  count: number;
}

export interface ModerationListType {
  rows: ModerationType[];
  count: number;
}

export interface BlogCommentListType {
  rows: BlogCommentType[];
  count: number;
}

export type CommentTypeList =
  | BlogCommentListType
  | ContestCommentListType
  | BookCommentListType;
