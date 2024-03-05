import * as express from 'express';
import { Query } from 'express-serve-static-core';

export type ResponseError = {
  message: string
}

export interface TypedRequestBody<T> extends Express.Request {
  body: T
}

export interface TypedRequestQuery<T extends Query> extends Express.Request {

  query: T

}
