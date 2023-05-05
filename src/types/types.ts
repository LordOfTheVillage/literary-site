export interface ErrorResponse {
  message: string;
}

export interface BookElementType {
  id?: string | number;
  img: string;
  title: string;
  author: string;
  authorId?: string;
  categories: string[];
  annotation: string;
  commentAmount?: number;
  readAmount?: number;
  rating: string | number;
}

export interface ChapterType {
  title: string;
  text: string;
  bookId: string;
}

export interface BookType {
  id: number;
  title: string;
  rating: string;
  description: string;
  user: { name: string };
  userId: string;
  img: string;
  genres: GenreType[];
  chapters?: ChapterType[];
  comments?: BookCommentType[];
  createdAt?: string;
  ratings?: RatingType[];
  bookmarks?: BookmarkType[];
}

export type DetailedBookType = {
  user: UserType;
  ratings: RatingType[];
  chapters: ChapterType[];
} & BookType;

export interface ContestType {
  id: string;
  title: string;
  description: string;
  prize: number | string;
  img: string;
  date: string;
  status: boolean;
  countCharacters: number;
  userId: string;
  createdAt: string;
  contestApplications: ApplicationType[];
  contestWinner: WinnerType | null;
  contestModerations: ModerationType[];
  genres: GenreType[];
}

export interface WinnerType {
  id: string;
  contestId: string;
  bookId: string;
  contest: {
    title: string;
  };
}

export interface ApplicationType {
  id: string;
  status: boolean;
  contestId: string;
  bookId: string;
  book: BookType;
}

export interface ContestBook {
  id: string;
  bookId: string;
}

export interface ModerationType {
  id: string;
  contestId: string;
  userId: string;
  user: UserType;
}

export interface GenreType {
  id: number;
  name: string;
}

export interface UserType {
  id: number;
  email: string;
  name: string;
  autobiography: string;
  readingView: string | null;
  bookmarks: BookmarkType[];
  img: string | null;
  role: RoleType;
  producerApplication: null | ProducerApplicationType;
}

export interface ProducerApplicationType {
  id: number;
  userId: number;
  text: string;
  user: UserType;
}

export interface RoleType {
  id: string;
  value: string;
}

export interface BlogType {
  id: string;
  userId: string;
  title: string;
  text: string;
  createdAt: string;
  blogComments?: BlogCommentType[];
}

export type UserStateType = UserType | null | undefined;

export interface AccountType extends UserType {
  createdAt: string;
  updatedAt: string;
  contestId?: number | null;
  contest?: ContestType | null;
  role: RoleType;
  blogs?: BlogType[];
  ratings?: RatingType[];
  bookComments?: BookCommentType[];
  blogComments?: BlogCommentType[];
  contestComments?: ContestCommentType[];
}

export interface CommentType {
  id: string;
  userId: string;
  text: string;
  createdAt: string;
  user?: {
    id: string;
    name: string;
    image: string;
  };
}

export interface BlogCommentType extends CommentType {
  blogId: string;
}

export interface BookCommentType extends CommentType {
  bookId: string;
}

export interface ContestCommentType extends CommentType {
  contestId: string;
}

export interface ChapterType {
  id: number;
  bookId: string;
  title: string;
  number: number;
  pages?: PageType[];
}

export interface PageType {
  id: number;
  chapterId: number;
  number: number;
  text: string;
}

export interface RatingType {
  id: number;
  bookId: number;
  userId: number;
  rating: number;
}

export interface BookmarkType {
  id: number;
  bookId: number;
  userId: number;
  progressId: number;
  progress?: ProgressType;
}

export interface ProgressType {
  id: number;
  chapterId: number;
  pageId: number;
}
