import { USERS } from "./mockData";

export function setupUsers(db) {
  db.serialize(async function () {
    await db.run("CREATE TABLE users (id TEXT PRIMARY KEY, username TEXT, password TEXT)");

    for (let i = 0; i < USERS.length; i++) {
      const stmt = db.prepare("INSERT INTO users VALUES (?, ?, ?)");
      const user = USERS[i]
      stmt.run(user.id, user.username, user.password);
      stmt.finalize();
    }

    // db.each("SELECT * FROM users", function (err, row) {
    //   console.log(row);
    // });
  });
}