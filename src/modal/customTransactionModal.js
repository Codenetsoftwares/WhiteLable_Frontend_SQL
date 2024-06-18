import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { addCash, transferAmount, updateCreditRef, updatePartnership } from '../Utils/service/apiService';
import { useAppContext } from '../contextApi/context';
const CustomTransactionModal = (props) => {
  const [formData, setFormData] = useState({
    amount: 0,
    password: '',
    remarks: '',
  });
  const { store } = useAppContext();
  console.log('store from modal', store);
  console.log('from modal=>>>>', props?.differentiate);
  console.log('from modal adminId=>>>>', props?.adminId);
  console.log('from modal adminName=>>>>', props?.adminName);
  console.log('from modal adminName=>>>>', props?.role);

  // Setting Modal Title
  let modalTitle = '';
  if (props.differentiate === 'creditRefProvider') {
    modalTitle = 'Provide Edit Credit ref. Amount';
  } else if (props.differentiate === 'partnershipProvider') {
    modalTitle = 'Provide Edit PartnerShip Amount';
  } else if (props.differentiate === 'walletAmountProvider') {
    modalTitle = 'Provide Transfer Amount';
  } else if (props.differentiate === 'addCashProvider') {
    modalTitle = 'Add Cash';
  }

  // API Hitting for creditRef and Partnership provider
  async function handelSave() {
    switch (props.differentiate) {
      case 'creditRefProvider':
        const creditRefData = {
          creditRef: formData.amount,
          password: formData.password,
        };
        const creditRefResponse = await updateCreditRef(
          {
            id: props?.adminId,
            data: creditRefData,
          },
          true,
        );
        if (creditRefResponse) {
          props.onHide();
          console.log(creditRefResponse);
          props.setRefresh(creditRefResponse);
        }
        break;

      case 'partnershipProvider':
        const partnershipData = {
          partnership: formData.amount,
          password: formData.password,
        };
        const partnershipResponse = await updatePartnership(
          {
            id: props?.adminId,
            data: partnershipData,
          },
          true,
        );
        if (partnershipResponse) {
          props.onHide();
          console.log(partnershipResponse);
          props.setRefresh(partnershipResponse);
        }
        break;
      case 'addCashProvider':
        const addCashData = {
          amount: formData.amount,
        };
        const addCashResponse = await addCash(
          {
            adminId: store.admin.id,
            data: addCashData,
          },
          true,
        );
        if (addCashResponse) {
          props.onHide();
          console.log(addCashResponse);
          props.setRefresh(addCashResponse);
        }
        break;

      default:
    }

    console.log('formData', formData);
  }
  // API Hitting for Wallet provider
  async function handelDepositAndWithdraw(modeOfTransaction) {
    if (modeOfTransaction === 'Withdraw') {
      const WithdrawData = {
        withdrawalAmt: formData.amount,
        password: formData.password,
        remarks: formData.remarks,
        receiveUserId: props?.adminId,
      };
      const creditRefResponse = await transferAmount(
        {
          adminId: store.admin.id,
          data: WithdrawData,
        },
        true,
      );
      if (creditRefResponse) {
        props.onHide();
        console.log(creditRefResponse);
        props.setRefresh(creditRefResponse);
      }
    } else {
      const DepositData = {
        transferAmount: formData.amount,
        password: formData.password,
        remarks: formData.remarks,
        receiveUserId: props?.adminId,
      };
      const creditRefResponse = await transferAmount(
        {
          adminId: store.admin.id,
          data: DepositData,
        },
        true,
      );
      if (creditRefResponse) {
        props.onHide();
        console.log(creditRefResponse);
        props.setRefresh(creditRefResponse);
      }
    }
  }

  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header
        closeButton
        style={{
          height: '5px',
          backgroundColor: '#006699',
          color: 'white',
        }}
      >
        <Modal.Title className="fs-6">{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="my-2">
          {props?.differentiate !== 'addCashProvider' ? (
            <React.Fragment>
              <span style={{ fontWeight: 'bold', color: '#6ae635' }}>{props?.role}</span>
              <br />
              <span>{props?.adminName}</span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Alert variant="primary">Transaction By — {store.admin.adminName}</Alert>
            </React.Fragment>
          )}
        </div>
        <form>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Enter Amount</span>
            </div>
            <input
              type="number"
              className="form-control"
              placeholder="Amount *"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  amount: Number(e.target.value),
                })
              }
            />
          </div>
          {props.differentiate === 'walletAmountProvider' ? (
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Remarks"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  remarks: e.target.value,
                })
              }
            />
          ) : null}
          {props?.differentiate !== 'addCashProvider' ? (
            <input
              type="password"
              className="form-control"
              placeholder="Password *"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
            />
          ) : null}
        </form>
      </Modal.Body>
      <Modal.Footer>
        {props.differentiate !== 'walletAmountProvider' ? (
          <>
            <Button onClick={props?.onHide} variant="secondary">
              Close
            </Button>
            <Button onClick={handelSave}>Save</Button>
          </>
        ) : (
          <>
            <Button onClick={() => handelDepositAndWithdraw('Deposit')} variant="success">
              Deposit
            </Button>
            <Button onClick={() => handelDepositAndWithdraw('Withdraw')} variant="danger">
              Withdraw
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CustomTransactionModal;
