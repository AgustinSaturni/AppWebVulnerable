import { ROLES, USER_ROLES } from './mockData';
import { Database } from "sqlite3";

export function setupRoles(db: Database) {
  createRoles(db)
  createUserRoles(db)
}

function createRoles(db: Database) {
  db.serialize(async function () {
    await db.run("CREATE TABLE roles (id TEXT PRIMARY KEY, title TEXT)");

    for (let i = 0; i < ROLES.length; i++) {
      const stmt = db.prepare("INSERT INTO roles VALUES (?, ?)");
      const role = ROLES[i]
      stmt.run(role.id, role.title);
      stmt.finalize();
    }

    // db.each("SELECT * FROM roles", function (err, row) {
    //   console.log(row);
    // });
  });
}

function createUserRoles(db: Database) {
  db.serialize(async function () {
    await db.run("CREATE TABLE user_roles (id TEXT PRIMARY KEY, userId TEXT, roleId TEXT)");

    for (let i = 0; i < USER_ROLES.length; i++) {
      const stmt = db.prepare("INSERT INTO user_roles VALUES (?, ?, ?)");
      const userRole = USER_ROLES[i]
      stmt.run(userRole.id, userRole.userId, userRole.roleId);
      stmt.finalize();
    }

    // db.each("SELECT * FROM user_roles", function (err, row) {
    //   console.log(row);
    // });
  });
}