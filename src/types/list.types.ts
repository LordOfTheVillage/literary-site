import {
  ApplicationType,
  BlogCommentType,
  BlogType,
  BookCommentType,
  BookmarkType,
  BookType,
  ChapterType,
  ContestCommentType,
  ContestType,
  GenreType,
  ModerationType,
  ProducerApplicationType,
  RatingType,
  UserType,
  WinnerType,
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

export interface ContestListType {
  rows: ContestType[];
  count: number;
}

export interface WinnerListType {
  rows: WinnerType[];
  count: number;
}

export interface ApplicationListType {
  rows: ApplicationType[];
  count: number;
}

export interface ProducerApplicationListType {
  rows: ProducerApplicationType[];
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
