import { MedicalHistory,User } from "@seg-apps-web/api-interfaces"
import { getCookie } from "../../services"

interface MedicalHistoryEntryProps {
  medicalHistoryEntry: MedicalHistory
  onClick: (id: MedicalHistory['id']) => void
}

export const MedicalHistoryEntry = ({ medicalHistoryEntry, onClick }: MedicalHistoryEntryProps) => {
  const user = getCookie<User & { roles: string[] }>("user");

  return (
    <tr>
      <td>{new Date(medicalHistoryEntry.creationDate).toLocaleDateString()}</td>
      <td>{medicalHistoryEntry.attentionType}</td>
      {/* <td>{getDoctorById(medicalHistoryEntry.doctorId)}</td> */}
      <td>{medicalHistoryEntry.doctorLastName +","+medicalHistoryEntry.doctorName }</td>
      <td>
        <span>{medicalHistoryEntry.observation}
        </span>
       {/*user?.roles.includes('Doctor')?  <i onClick={() => onClick(medicalHistoryEntry.id)} className="bi bi-pencil-square"></i>:null*/}
      
      </td>
    </tr>
  )
}