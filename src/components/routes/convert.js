import React, { useState } from 'react';
import SuccessModal from '../elements/SuccessModal/SuccessModal';

const Convert = () => {
  const [successVisible, setSuccessVisible] = useState(false);

  return (<div>
    <SuccessModal visible={successVisible} onClose={() => setSuccessVisible(false)}/>
  </div>)
}

export default Convert;
