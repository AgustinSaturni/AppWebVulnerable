// eslint-disable-next-line @typescript-eslint/no-var-requires
import { MedicalHistory, MedicalHistoryCreation, Role, UserRole } from "@seg-apps-web/api-interfaces";
import { RootRepository } from "./root.repository";
import { spawn } from 'node:child_process'

export class MedicalHistoryRepository {

  static async getAll(): Promise<MedicalHistory[]> {
    const sql = 'SELECT * FROM historial';
    return await new Promise((resolve, reject) => {
      RootRepository.database.all<MedicalHistory>(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        } else if (rows) {
          resolve(rows);
        } else {
          resolve(null);
        }
      });
    });
  }


  static async getByUserId(userId: number, doctorId?: number): Promise<MedicalHistory[]> {
    const sql = `SELECT h.*, u.name as doctorName, u.lastName as doctorLastName FROM historial h JOIN users u on u.id=h.doctorId WHERE userId = ${userId}${doctorId ? ` AND doctorId = ${doctorId}` : ''}`;
    return await new Promise((resolve, reject) => {
      RootRepository.database.all<MedicalHistory>(sql, (err, rows) => {
        if (err) {
          reject(err);
        } else if (rows) {
          resolve(rows);
        } else {
          resolve(null);
        }
      });
    });
  }

  static async update(data: MedicalHistory): Promise<MedicalHistory[]> {
    return await new Promise((resolve, reject) => {
      const sql = `UPDATE historial SET observaciones='${data.observation}' WHERE id=${parseInt(data.id)}`;
      RootRepository.database.run(sql,
        (err, result) => {
          console.log({ result, err })
          if (err) {
            console.log(1)
            reject(err);
          } else if (result) {
            console.log(2)
          } else {
            console.log(3)
          }
        });
      resolve([]);
    });
  }

  static async create(data: MedicalHistoryCreation): Promise<MedicalHistory[]> {
    console.log("agus", data);
    return await new Promise((resolve, reject) => {
      const sql = `INSERT INTO historial(doctorId, userId, creationDate, attentionType, observation)
                        VALUES ('${data.doctorId}','${data.userId}', '${data.creationDate}', '${data.attentionType}', '${data.observation}')`;
      RootRepository.database.run(sql,
        (err, result) => {
          console.log({ result, err })
          if (err) {
            console.log('agus: error creating history', err)
            reject(err);
          } else if (result) {
            console.log("agus", result)
          } else {
            console.log("agus", 3)
          }
        });
      resolve([]);
    });
  }
}
