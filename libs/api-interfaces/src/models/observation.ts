export type MedicalHistory = {
    id: string
    userId: string
    doctorId: string
    doctorLastName: string
    doctorName: string
    attentionType: string
    observation: string
    creationDate: string
  }

export type MedicalHistoryCreation=Omit<MedicalHistory,"id"|"doctorLastName"|"doctorName">
  