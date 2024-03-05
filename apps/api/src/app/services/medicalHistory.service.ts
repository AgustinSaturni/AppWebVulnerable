import { MedicalHistory, MedicalHistoryCreation } from "@seg-apps-web/api-interfaces";
import { RoleRepository } from "../repositories";
import { MedicalHistoryRepository } from "../repositories/medicalHistory.repository";

export class MedicalHistoryService {

  static async getAll() {
    return MedicalHistoryRepository.getAll()
      .then(medicalHistory => medicalHistory)
      .catch((error) => {
        throw new Error(`Error fetching Medical History: ${error.message}`);
      });
  }


  static async getByUserId(userId: string, doctorId?: string) {
    const intUserId = parseInt(userId);
    const intDoctorId = doctorId ? parseInt(doctorId) : undefined;
    return MedicalHistoryRepository.getByUserId(intUserId, intDoctorId)
      .then(medicalHistory => medicalHistory)
      .catch((error) => {
        throw new Error(`Error fetching Medical History by userId: ${error.message}`);
      });
  }

  static async create(data: MedicalHistory) {
    return MedicalHistoryRepository.create(data)
      .then(medicalHistory => medicalHistory)
      .catch((error) => {
        throw new Error(`Error creating Medical History: ${error.message}`);
      });
  }


}