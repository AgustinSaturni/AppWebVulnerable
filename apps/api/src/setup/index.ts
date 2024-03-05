import * as express from 'express';
import * as cors from 'cors'
import { setupUsers } from './users';
import { setupRoles } from './roles';
import { RootRepository } from '../app/repositories';
import { OPEN_READWRITE } from 'sqlite3';
import path = require('path');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const sqlite3 = require('sqlite3').verbose();

export function setup() {
  const app = express();
  app.use(cors())
  app.use(express.json())

  
  const db = new sqlite3.Database(path.resolve('apps/sqlite/medical_history.sqlt'));

  // setupUsers(db)
  // setupRoles(db)

  RootRepository.setDatabase(db)

  return app
}