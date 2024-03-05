// ButtonWithModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import { HTTP, deleteCookie, getCookie, setCookie } from '../../services';
import { MedicalHistoryCreation, User } from '@seg-apps-web/api-interfaces';

// Initialize the modal
Modal.setAppElement('#root'); // Set the app root element for accessibility

const http = new HTTP('http://localhost:3333')

// @ts-ignore
function AddHistoryEntry({ userId, selectedPatientId,openModal,closeModal,isModalOpen,fetchMedicalHistory }) {

  const [date, setDate] = useState('');
  const [attentionType, setAttentionType] = useState('');
  const [observation, setObservation] = useState('');


  const handleSave = (userId: string, selectedPatientId: string) => {

    // Perform your save logic here with the 'infoToSave' state
    // For simplicity, we're just displaying the saved info in the console
    console.log('Info saved:');


    const body: MedicalHistoryCreation = {
      userId: selectedPatientId,
      attentionType: attentionType,
      doctorId: userId,
      observation: observation,
      creationDate: date
    };
    console.log(body);

    http.post<boolean>('/medicalHistory/create', body).then(async (res) => {
      console.log("history saved", res)
      await fetchMedicalHistory();
  }).catch(err => console.log("failed to save history", err));
    // Close the modal

    closeModal();

  };


  const bottomMargin = { margin: '16px' };


  return (
    <div>
      <button onClick={openModal} style={{ margin: '36px' }}>Agregar entrada</button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <div style={bottomMargin}>
          <h2 style={{ color: 'black' }}>Historial medico</h2>
        </div>
        <div style={bottomMargin}>
          <span>Fecha de la consulta</span>
          <input
            type="date"
            placeholder="Fecha"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={bottomMargin}
          />
        </div>

        <input
          type="text"
          placeholder="Tipo de atención"
          value={attentionType}
          onChange={(e) => setAttentionType(e.target.value)}
          style={bottomMargin}
        />
        <input
          type="text"
          placeholder="Observaciones"
          value={observation}
          onChange={(e) => setObservation(e.target.value)}
          style={bottomMargin}
        />
        <div style={bottomMargin}>
          <button onClick={() => handleSave(userId, selectedPatientId)} style={{ margin: '4px 16px' }}>Guardar</button>
          <button onClick={closeModal} style={{ margin: '4px 16px' }}>Cerrar</button>
        </div>
      </Modal>
    </div>
  );
}

export default AddHistoryEntry;
