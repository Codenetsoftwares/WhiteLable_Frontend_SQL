import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CustomTransactionModal from '../modal/customTransactionModal';

const Temp = () => {
  const [modalShow, setModalShow] = useState(false);
  const [differentiate, setDifferentiate] = useState('');
  const handelOpenTransactionModal = (boolParam, differentiateParam) => {
    setModalShow(boolParam);
    setDifferentiate(differentiateParam);
  };
  return (
    <div className="mt-5">
      <h6>Hiiii</h6>
      <>
        <div className="d-flex gap-2">
          <Button variant="primary" onClick={() => handelOpenTransactionModal(true, 'creditRefProvider')}>
            Launch CreditRef modal
          </Button>
          <Button variant="primary" onClick={() => handelOpenTransactionModal(true, 'partnershipProvider')}>
            Launch Partnership modal
          </Button>
          <Button variant="primary" onClick={() => handelOpenTransactionModal(true, 'walletAmountProvider')}>
            Launch Wallet Amount
          </Button>
          <Button variant="primary" onClick={() => handelOpenTransactionModal(true, 'addCashProvider')}>
            Launch Add Cash
          </Button>
        </div>

        <CustomTransactionModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          message="Hi this is msg"
          differentiate={differentiate}
          individualAdminName="Admin name will be Provided by Props Later"
        />
      </>
    </div>
  );
};

export default Temp;
