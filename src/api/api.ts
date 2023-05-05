import axios from "axios";
import { QueryParams } from "../types/api.types";
import { LocalStorage } from "../components/storage";

export enum API_URLS {
  BASE_URL = "https://litnet.herokuapp.com",
  BOOKS = "/books",
  BOOKS_BY_ID = "/books/:id",
  BOOKS_BY_GENRE_NAME = "books/genre",
  VERIFY_BOOK = "/books/verify/:id",
  RATING_BY_BOOK_ID = "/books/:id/ratings",
  CHAPTERS_BY_BOOK_ID = "/books/:id/chapters",
  BOOKS_COMMENT_BY_BOOK_ID = "/books/:id/comments",
  BOOKS_COMMENT_BY_ID = "/books/:bookId/comments/:id",
  BOOKMARK_BY_BOOK_ID = "/books/:id/bookmark",
  CONTEST_WINNER_BY_BOOK_ID = "/books/:id/winner",
  USERS = "/users",
  USERS_BY_ID = "/users/:id",
  USERS_AVATAR = "/users/avatar/:id",
  BOOKS_BY_USER_ID = "/users/:id/books",
  USER_LIBRARY = "/users/:id/library",
  RATING_BY_USER_ID = "/users/:id/ratings",
  CONTEST_BY_USER_ID = "/contest/user/:id",
  BLOGS_BY_USER_ID = "/users/:id/blog",
  BOOKMARK_BY_USER_ID = "/users/:id/bookmark",
  BOOKS_COMMENT_BY_USER_ID = "/users/:id/book-comments",
  CONTEST_COMMENT_BY_USER_ID = "/users/:id/contest-comments",
  BLOG_COMMENT_BY_USER_ID = "/users/:id/blog-comments",
  BAN_USER = "/users/ban",
  USER_REGISTER = "/auth/registration",
  USER_LOGIN = "/auth/login",
  USER_PASSWORD = "/auth/password",
  USER_REFRESH_TOKEN = "/auth/refresh",
  GENRE = "/genre",
  GENRE_BY_NAME = "/genre/:name",
  GENRE_BY_ID = "/genre/:id",
  RATING = "/ratings",
  RATING_BY_ID = "/ratings/:id",
  RATING_BY_BOOK_USER_ID = "/ratings/user/:userId/book/:bookId",
  CONTEST = "/contest",
  CONTEST_BY_ID = "/contest/:id",
  CONTEST_COMMENT_BY_CONTEST_ID = "/contest/:id/comments",
  CONTEST_COMMENT_BY_ID = "/contest/:contestId/comments/:id",
  CONTEST_APPLICATION = "/contest/:id/application",
  CONTEST_APPLICATION_BY_ID = "/contest/:contestId/application/:id",
  CONTEST_WINNER = "/contest/:id/winner",
  MODERATOR = "/contest/:contestId/moderation/:id",
  MODERATORS_BY_CONTEST = "/contest/:id/moderation",
  PRODUCER_APPLICATION = "/producer-applications",
  PRODUCER_APPLICATION_BY_ID = "/producer-applications/:id",
  PRODUCER_APPLICATION_CONFIRM = "/producer-applications/:id/confirm",
  PAGE = "/pages",
  PAGE_BY_ID = "/pages/:id",
  CHAPTER = "/chapters",
  CHAPTER_BY_ID = "/chapters/:id",
  PAGE_BY_CHAPTER_ID = "/chapters/:id/pages",
  BOOKMARK = "/bookmark",
  BOOKMARK_BY_ID = "/bookmark/:id",
  BLOG = "/blog",
  BLOG_BY_ID = "/blog/:id",
  BLOG_COMMENT_BY_BLOG_ID = "/blog/:id/comments",
  BLOG_COMMENT_BY_ID = "/blog/:blogId/comments/:id",
}

export class API {
  private static URLS = API_URLS;
  private static client = axios.create({
    baseURL: API_URLS.BASE_URL,
    headers: {
      Authorization: `Bearer ${LocalStorage.getUserToken()}`,
    },
  });

  private static createQueryString = (params: QueryParams) => {
    const paramsString = Object.keys(params);
    if (!paramsString.length) return "";
    const queryString = paramsString
      .map((key) => `${key}=${params[key]}`)
      .join("&");
    return `?${queryString}`;
  };

  private static get = async (url: string, params: QueryParams = {}) => {
    try {
      const response = await API.client.get(
        `${url}${API.createQueryString(params)}`
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  };

  private static post = async (url: string, data: any) => {
    try {
      const response = await API.client.post(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  private static update = async (url: string, data: any) => {
    try {
      const response = await API.client.patch(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  private static delete = async (url: string) => {
    try {
      const response = await API.client.delete(url);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  };

  public static getImage = (url: string) => {
    return `${API.URLS.BASE_URL}/${url}`;
  };

  public static getBooks = async (params: QueryParams = {}) => {
    const url = API.URLS.BOOKS;
    return await API.get(url, params);
  };

  public static addBook = async (data) => {
    const url = API.URLS.BOOKS;
    return await API.post(url, data);
  };

  public static getBookById = async (id: string) => {
    const url = API.URLS.BOOKS_BY_ID.replace(":id", id);
    return await API.get(url);
  };

  public static getBooksByUserId = async (
    id: string,
    params: QueryParams = {}
  ) => {
    const url = API.URLS.BOOKS_BY_USER_ID.replace(":id", id);
    return await API.get(url, params);
  };

  public static getBooksByGenreName = async (params: QueryParams = {}) => {
    const url = API.URLS.BOOKS_BY_GENRE_NAME;
    return await API.get(url, params);
  };

  public static deleteBookById = async (id: string) => {
    const url = API.URLS.BOOKS_BY_ID.replace(":id", id);
    return await API.delete(url);
  };

  public static updateBookById = async (id: string, body: any) => {
    const url = API.URLS.BOOKS_BY_ID.replace(":id", id);
    return await API.update(url, body);
  };

  public static verifyBook = async (id: string) => {
    const url = API.URLS.VERIFY_BOOK.replace(":id", id);
    return await API.post(url, {});
  };

  public static getUserLibrary = async (
    id: string,
    params: QueryParams = {}
  ) => {
    const url = API.URLS.USER_LIBRARY.replace(":id", id);
    return await API.get(url, params);
  };

  public static getUsers = async (params: QueryParams = {}) => {
    const url = API.URLS.USERS;
    return await API.get(url, params);
  };

  public static banUser = async (body = {}) => {
    const url = API.URLS.BAN_USER;
    return await API.post(url, body);
  };

  public static getUserById = async (id: string) => {
    const url = API.URLS.USERS_BY_ID.replace(":id", id);
    return await API.get(url);
  };

  public static deleteUserById = async (id: string) => {
    const url = API.URLS.USERS_BY_ID.replace(":id", id);
    return await API.delete(url);
  };

  public static updateUserById = async (id: string, body: any) => {
    const url = API.URLS.USERS_BY_ID.replace(":id", id);
    return await API.update(url, body);
  };

  public static getUserAvatar = async (id: string) => {
    const url = API.URLS.USERS_AVATAR.replace(":id", id);
    return await API.get(url);
  };

  public static registerUser = async (body: any) => {
    const url = API.URLS.USER_REGISTER;
    return await API.post(url, body);
  };

  public static checkUser = async (body: any) => {
    const url = API.URLS.USER_REFRESH_TOKEN;
    return await API.post(url, body);
  };

  public static updateUserPassword = async (body: any) => {
    const url = API.URLS.USER_PASSWORD;
    return await API.update(url, body);
  };

  public static loginUser = async (body: any) => {
    const url = API.URLS.USER_LOGIN;
    return await API.post(url, body);
  };

  public static getGenres = async (params: QueryParams = {}) => {
    const url = API.URLS.GENRE;
    return await API.get(url, params);
  };

  public static getGenreByName = async (name: string) => {
    const url = API.URLS.GENRE_BY_NAME.replace(":name", name);
    return await API.get(url);
  };

  public static createGenre = async (body: any) => {
    const url = API.URLS.GENRE;
    return await API.post(url, body);
  };

  public static deleteGenreById = async (id: string) => {
    const url = API.URLS.GENRE_BY_ID.replace(":id", id);
    return await API.delete(url);
  };

  public static updateGenreById = async (id: string, body: any) => {
    const url = API.URLS.GENRE_BY_ID.replace(":id", id);
    return await API.update(url, body);
  };

  public static getRatings = async (params: QueryParams = {}) => {
    const url = API.URLS.RATING;
    return await API.get(url, params);
  };

  public static getRatingById = async (id: string) => {
    const url = API.URLS.RATING_BY_ID.replace(":id", id);
    return await API.get(url);
  };

  public static getRatingByBookUserId = async (
    userId: string,
    bookId: string
  ) => {
    const url = API.URLS.RATING_BY_BOOK_USER_ID.replace(
      ":userId",
      userId
    ).replace(":bookId", bookId);
    return await API.get(url);
  };

  public static getRatingByUserId = async (id: string) => {
    const url = API.URLS.RATING_BY_USER_ID.replace(":id", id);
    return await API.get(url);
  };

  public static getRatingByBookId = async (id: string) => {
    const url = API.URLS.RATING_BY_BOOK_ID.replace(":id", id);
    return await API.get(url);
  };

  public static createRating = async (body: any) => {
    const url = API.URLS.RATING;
    return await API.post(url, body);
  };

  public static updateRatingById = async (id: string, body: any) => {
    const url = API.URLS.RATING_BY_ID.replace(":id", id);
    return await API.update(url, body);
  };

  public static deleteRatingById = async (id: string) => {
    const url = API.URLS.RATING_BY_ID.replace(":id", id);
    return await API.delete(url);
  };

  public static getContestComments = async (
    id: string,
    params: QueryParams = {}
  ) => {
    const url = API.URLS.CONTEST_COMMENT_BY_CONTEST_ID.replace(":id", id);
    return await API.get(url, params);
  };

  public static getContestCommentById = async (
    id: string,
    contestId: string
  ) => {
    const url = API.URLS.CONTEST_COMMENT_BY_ID.replace(":id", id).replace(
      ":contestId",
      contestId
    );
    return await API.get(url);
  };

  public static getContestCommentByContestId = async (
    id: string,
    params: QueryParams = {}
  ) => {
    const url = API.URLS.CONTEST_COMMENT_BY_CONTEST_ID.replace(":id", id);
    return await API.get(url, params);
  };

  public static getContestCommentByUserId = async (
    id: string,
    params: QueryParams = {}
  ) => {
    const url = API.URLS.CONTEST_COMMENT_BY_USER_ID.replace(":id", id);
    return await API.get(url, params);
  };

  public static createContestComment = async (id: string, body: any) => {
    const url = API.URLS.CONTEST_COMMENT_BY_CONTEST_ID.replace(":id", id);
    return await API.post(url, body);
  };

  public static updateContestCommentById = async (
    id: string,
    contestId: string,
    body: any
  ) => {
    const url = API.URLS.CONTEST_COMMENT_BY_ID.replace(":id", id).replace(
      ":contestId",
      contestId
    );
    return await API.update(url, body);
  };

  public static deleteContestCommentById = async (
    id: string,
    contestId: string
  ) => {
    const url = API.URLS.CONTEST_COMMENT_BY_ID.replace(":id", id).replace(
      ":contestId",
      contestId
    );
    return await API.delete(url);
  };

  public static getContests = async (params: QueryParams = {}) => {
    const url = API.URLS.CONTEST;
    return await API.get(url, params);
  };

  public static getContestById = async (id: string) => {
    const url = API.URLS.CONTEST_BY_ID.replace(":id", id);
    return await API.get(url);
  };

  public static getContestByUserId = async (id: string) => {
    const url = API.URLS.CONTEST_BY_USER_ID.replace(":id", id);
    return await API.get(url);
  };

  public static createContest = async (body: any) => {
    const url = API.URLS.CONTEST;
    return await API.post(url, body);
  };

  public static updateContestById = async (id: string, body: any) => {
    const url = API.URLS.CONTEST_BY_ID.replace(":id", id);
    return await API.update(url, body);
  };

  public static deleteContestById = async (id: string) => {
    const url = API.URLS.CONTEST_BY_ID.replace(":id", id);
    return await API.delete(url);
  };

  public static addWinner = async (body: any) => {
    const url = API.URLS.CONTEST_WINNER;
    return await API.post(url, body);
  };

  public static getWinnersByBook = async (
    id: string,
    params: QueryParams = {}
  ) => {
    const url = API.URLS.CONTEST_WINNER_BY_BOOK_ID.replace(":id", id);
    return await API.get(url, params);
  };

  public static getProducerApplications = async (params: QueryParams = {}) => {
    const url = API.URLS.PRODUCER_APPLICATION;
    return await API.get(url, params);
  };

  public static createProducerApplication = async (body: any) => {
    const url = API.URLS.PRODUCER_APPLICATION;
    return await API.post(url, body);
  };

  public static confirmProducerApplication = async (id: string) => {
    const url = API.URLS.PRODUCER_APPLICATION_CONFIRM.replace(":id", id);
    return await API.post(url, {});
  };

  public static removeProducerApplication = async (id: string) => {
    const url = API.URLS.PRODUCER_APPLICATION_BY_ID.replace(":id", id);
    return await API.delete(url);
  };

  public static getApplications = async (params: QueryParams = {}) => {
    const url = API.URLS.CONTEST_APPLICATION;
    return await API.get(url, params);
  };

  public static getApplicationsByContestId = async (
    id: string,
    params: QueryParams = {}
  ) => {
    const url = API.URLS.CONTEST_APPLICATION.replace(":id", id);
    return await API.get(url, params);
  };

  public static addBookToContest = async (body: any = {}) => {
    const url = API.URLS.CONTEST_APPLICATION;
    return await API.post(url, body);
  };

  public static updateApplication = async (
    id: string,
    contestId: string,
    body: any = {}
  ) => {
    const url = API.URLS.CONTEST_APPLICATION_BY_ID.replace(":id", id).replace(
      ":contestId",
      contestId
    );
    return await API.update(url, body);
  };

  public static removeApplication = async (id: string, contestId: string) => {
    const url = API.URLS.CONTEST_APPLICATION_BY_ID.replace(":id", id).replace(
      ":contestId",
      contestId
    );
    return await API.delete(url);
  };

  public static getModerators = async (
    id: string,
    params: QueryParams = {}
  ) => {
    const url = API.URLS.MODERATORS_BY_CONTEST.replace(":id", id);
    return await API.get(url, params);
  };

  public static addModerator = async (id: string, body: any) => {
    const url = API.URLS.MODERATORS_BY_CONTEST.replace(":id", id);
    return await API.post(url, body);
  };

  public static removeModerator = async (id: string, contestId: string) => {
    const url = API.URLS.MODERATOR.replace(":id", id).replace(
      ":contestId",
      contestId
    );
    return await API.delete(url);
  };

  public static getPages = async (params: QueryParams = {}) => {
    const url = API.URLS.PAGE;
    return await API.get(url, params);
  };

  public static getPageById = async (id: string) => {
    const url = API.URLS.PAGE_BY_ID.replace(":id", id);
    return await API.get(url);
  };

  public static createPage = async (body: any) => {
    const url = API.URLS.PAGE;
    return await API.post(url, body);
  };

  public static updatePageById = async (id: string, body: any) => {
    const url = API.URLS.PAGE_BY_ID.replace(":id", id);
    return await API.update(url, body);
  };

  public static deletePageById = async (id: string) => {
    const url = API.URLS.PAGE_BY_ID.replace(":id", id);
    return await API.delete(url);
  };

  public static getChapters = async (params: QueryParams = {}) => {
    const url = API.URLS.CHAPTER;
    return await API.get(url, params);
  };

  public static getChapterById = async (id: string) => {
    const url = API.URLS.CHAPTER_BY_ID.replace(":id", id);
    return await API.get(url);
  };

  public static getChaptersByBookId = async (id: string) => {
    const url = API.URLS.CHAPTERS_BY_BOOK_ID.replace(":id", id);
    return await API.get(url);
  };

  public static createChapter = async (body: any) => {
    const url = API.URLS.CHAPTER;
    return await API.post(url, body);
  };

  public static updateChapterById = async (id: string, body: any) => {
    const url = API.URLS.CHAPTER_BY_ID.replace(":id", id);
    return await API.update(url, body);
  };

  public static deleteChapterById = async (id: string) => {
    const url = API.URLS.CHAPTER_BY_ID.replace(":id", id);
    return await API.delete(url);
  };

  public static getBookComments = async (
    id: string,
    params: QueryParams = {}
  ) => {
    const url = API.URLS.BOOKS_COMMENT_BY_BOOK_ID.replace(":id", id);
    return await API.get(url, params);
  };

  public static getBookCommentById = async (
    id: string,
    bookId: string,
    params: QueryParams = {}
  ) => {
    const url = API.URLS.BOOKS_COMMENT_BY_ID.replace(":id", id).replace(
      ":bookId",
      bookId
    );
    return await API.get(url, params);
  };

  public static getBookCommentByBookId = async (
    id: string,
    params: QueryParams = {}
  ) => {
    const url = API.URLS.BOOKS_COMMENT_BY_BOOK_ID.replace(":id", id);
    return await API.get(url, params);
  };

  public static getBookCommentByUserId = async (
    id: string,
    params: QueryParams = {}
  ) => {
    const url = API.URLS.BOOKS_COMMENT_BY_USER_ID.replace(":id", id);
    return await API.get(url, params);
  };

  public static createBookComment = async (id: string, body: any) => {
    const url = API.URLS.BOOKS_COMMENT_BY_BOOK_ID.replace(":id", id);
    return await API.post(url, body);
  };

  public static updateBookCommentById = async (
    id: string,
    bookId: string,
    body: any
  ) => {
    const url = API.URLS.BOOKS_COMMENT_BY_ID.replace(":id", id).replace(
      ":bookId",
      bookId
    );
    return await API.update(url, body);
  };

  public static deleteBookCommentById = async (id: string, bookId: string) => {
    const url = API.URLS.BOOKS_COMMENT_BY_ID.replace(":id", id).replace(
      ":bookId",
      bookId
    );
    return await API.delete(url);
  };

  public static getBookmarks = async (params: QueryParams = {}) => {
    const url = API.URLS.BOOKMARK;
    return await API.get(url, params);
  };

  public static getBookmarkById = async (id: string) => {
    const url = API.URLS.BOOKMARK_BY_ID.replace(":id", id);
    return await API.get(url);
  };

  public static getBookmarkByUserId = async (id: string) => {
    const url = API.URLS.BOOKMARK_BY_USER_ID.replace(":id", id);
    return await API.get(url);
  };

  public static createBookmark = async (body: any) => {
    const url = API.URLS.BOOKMARK;
    return await API.post(url, body);
  };

  public static updateBookmarkById = async (id: string, body: any) => {
    const url = API.URLS.BOOKMARK_BY_ID.replace(":id", id);
    return await API.update(url, body);
  };

  public static deleteBookmarkById = async (id: string) => {
    const url = API.URLS.BOOKMARK_BY_ID.replace(":id", id);
    return await API.delete(url);
  };

  public static getBlogComments = async (
    id: string,
    params: QueryParams = {}
  ) => {
    const url = API.URLS.BLOG_COMMENT_BY_BLOG_ID.replace(":id", id);
    return await API.get(url, params);
  };

  public static getBlogCommentById = async (
    id: string,
    params: QueryParams = {}
  ) => {
    const url = API.URLS.BLOG_COMMENT_BY_ID.replace(":id", id);
    return await API.get(url, params);
  };

  public static getBlogCommentByBlogId = async (
    id: string,
    params: QueryParams = {}
  ) => {
    const url = API.URLS.BLOG_COMMENT_BY_BLOG_ID.replace(":id", id);
    return await API.get(url, params);
  };

  public static getBlogCommentByUserId = async (
    id: string,
    params: QueryParams = {}
  ) => {
    const url = API.URLS.BLOG_COMMENT_BY_USER_ID.replace(":id", id);
    return await API.get(url, params);
  };

  public static createBlogComment = async (id: string, body: any) => {
    const url = API.URLS.BLOG_COMMENT_BY_BLOG_ID.replace(":id", id);
    return await API.post(url, body);
  };

  public static updateBlogCommentById = async (id: string, body: any) => {
    const url = API.URLS.BLOG_COMMENT_BY_ID.replace(":id", id);
    return await API.update(url, body);
  };

  public static deleteBlogCommentById = async (id: string) => {
    const url = API.URLS.BLOG_COMMENT_BY_ID.replace(":id", id);
    return await API.delete(url);
  };

  public static getBlogs = async (params: QueryParams = {}) => {
    const url = API.URLS.BLOG;
    return await API.get(url, params);
  };

  public static getBlogById = async (id: string) => {
    const url = API.URLS.BLOG_BY_ID.replace(":id", id);
    return await API.get(url);
  };

  public static getBlogsByUserId = async (id: string) => {
    const url = API.URLS.BLOGS_BY_USER_ID.replace(":id", id);
    return await API.get(url);
  };

  public static createBlog = async (body: any) => {
    const url = API.URLS.BLOG;
    return await API.post(url, body);
  };

  public static updateBlogById = async (id: string, body: any) => {
    const url = API.URLS.BLOG_BY_ID.replace(":id", id);
    return await API.update(url, body);
  };

  public static deleteBlogById = async (id: string) => {
    const url = API.URLS.BLOG_BY_ID.replace(":id", id);
    return await API.delete(url);
  };
}
