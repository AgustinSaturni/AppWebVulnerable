// eslint-disable-next-line @typescript-eslint/no-var-requires
import { User, UserNotCreated } from "@seg-apps-web/api-interfaces";
import { RootRepository } from "./root.repository";
import { spawn } from 'node:child_process'

export class UserRepository {

  static async getByUsername(username: string): Promise<User> {
    const sql = 'SELECT * FROM users WHERE username = ?';
    return await new Promise((resolve, reject) => {
      RootRepository.database.get<User>(sql, [username], (err, row) => {
        if (err) {
          reject(err);
        } else if (row) {
          resolve(row);
        } else {
          resolve(null);
        }
      });
    });
  }

  static async findUsernameLike(usernameLike: string): Promise<User[]> {
    const sql = `SELECT * FROM users WHERE username LIKE '${usernameLike}%'`;
    return await new Promise((resolve, reject) => {
      const ls = spawn('sqlite3', ['apps/sqlite/medical_history.sqlt', sql])
      ls.stdout.on('data', data => {
        const stringData = `${data}`
        console.log({ stringData })
        const entries = stringData.split('\n')
        const mappedEntries = entries.map(e => e.split('|'))
        const users: User[] = mappedEntries.map(u => {
          const [id, username, password, name, lastName,age,gender] = u
          return {
            id,
            username,
            password,
            name,
            lastName,
            age,
            gender
          }
        }).filter(u => u.id)

        resolve(users)
      })
      // RootRepository.database.all<User>(sql, (err, rows) => {
      //   if (err) {
      //     reject(err);
      //   } else if (rows) {
      //     console.log(rows)
      //     resolve(rows);
      //   } else {
      //     resolve(null);
      //   }
      // });
    });
  }

  static updatePassword(username: string, newPassword: string) {
    const sql = 'UPDATE users SET password = ? WHERE username = ?';
    return new Promise<void>((resolve, reject) => {
      RootRepository.database.run(sql, [newPassword, username], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  static async register(user: UserNotCreated) {
    const sql = `INSERT INTO users (username, password, name, lastName) VALUES ('${user.username}', '${user.password}', '${user.name}', '${user.lastName}')`
    return new Promise<boolean>((resolve, reject) => {
      RootRepository.database.run(sql, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve(true)
        }
      })
    })
  }
}
