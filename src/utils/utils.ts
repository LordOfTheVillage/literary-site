import defaultImage from "../common/assets/images/avatar.png";
import React from "react";

import { BookType, ChapterType } from "../types/types";

export const baseUrl = "https://litnet.herokuapp.com";

export const createDate = (string: string) => {
  const date = new Date(string);
  const day = addZero(date.getDate());
  const month = addZero(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export const addZero = (number: number) => {
  return number < 10 && number > 0 ? `0${number}` : number;
};

export const getImagePath = (img: string) => {
  return `${baseUrl}${img}`;
};

export const processImage = (image: string | null | undefined) => {
  return image ? image : defaultImage;
};

export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>
) => {
  (e.target as HTMLImageElement).src = defaultImage;
};

export const getBooksByRating = (
  books: BookType[],
  count: number = books.length
) => {
  if (count > books.length) count = books.length;
  const result = [...books].sort((a, b) => Number(b.rating) - Number(a.rating));
  return result.splice(0, count);
};

export const getBooksByComments = (
  books: BookType[],
  count: number = books.length
) => {
  if (count > books.length) count = books.length;
  const result = [...books].sort(
    (a, b) => Number(b.comments!.length) - Number(a.comments!.length)
  );
  return result.splice(0, count);
};

export const getLastPathWord = () =>
  window.location.pathname.split("/").splice(-1, 1)[0];

export const getBooksByReadings = (
  books: BookType[],
  count: number = books.length
) => {
  if (count > books.length) count = books.length;
  const result = [...books].sort(
    (a, b) => Number(b.bookmarks!.length) - Number(a.bookmarks!.length)
  );
  return result.splice(0, count);
};

export const getChapterText = (chapter: ChapterType) => {
  return chapter.pages?.reduce((text, page) => (text += `${page.text}`), "");
};
