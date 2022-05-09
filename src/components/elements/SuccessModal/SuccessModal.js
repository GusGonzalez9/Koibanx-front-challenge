import React from 'react';
import './SuccessModal.css';
import successLogo from '../../../assets/Success.png';

const SuccessModal = ({visible, onClose}) => {


  return (
    <div id="myModal" className="modal" style={{display: visible ? 'block' : 'none'}}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <div className={'modal-success'}>
          <img src={successLogo} alt={'Exito'}/>
          <p>Conversión realizada con éxito.</p>
        </div>
      </div>

    </div>
  )
}

export default SuccessModal;
