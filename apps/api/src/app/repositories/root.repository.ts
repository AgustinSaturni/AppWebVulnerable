import { Database } from "sqlite3";

export class RootRepository {
  private static db: Database;

  static setDatabase(db: Database) {
    RootRepository.db = db;
  }

  static get database() {
    return this.db
  }
}
