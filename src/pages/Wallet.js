import React, { useState, useEffect, useCallback } from 'react';
import { getAllCreateState } from '../Utils/service/initiateState';
import { permissionObj } from '../Utils/constant/permission';
import { getAllCreate, viewBalance } from '../Utils/service/apiService';
import { useAppContext } from '../contextApi/context';
import Card from '../components/common/Card';
import Pagination from '../components/common/Pagination';
import CustomTransactionModal from '../modal/customTransactionModal';
import strings from '../Utils/constant/stringConstant';
import { debounce } from 'lodash';
import FullScreenLoader from '../components/FullScreenLoader';
import { useNavigate } from 'react-router-dom';


const Wallet = () => {
  const { dispatch, store } = useAppContext();
  const navigate = useNavigate()
  const [balance, setBalance] = useState(0);
  const [walletCard, setWalletCard] = useState(getAllCreateState());
  const [modalShow, setModalShow] = useState(false);
  const [differentiate, setDifferentiate] = useState('');
  const [refresh, setRefresh] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [adminDelete, setAdminDelete] = useState('');

  //  debounced search handler
  const debouncedGetAllCreate = useCallback(
    debounce((searchName) => {
      getAll_Create(searchName);
    }, 1500),
    []
  );

  const handleChange = (name, value) => {
    console.log('=====>>>> values onchange', name, value);
    setWalletCard((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'name') {
      debouncedGetAllCreate(value);
    }
  };

  const handelOpenTransactionModal = (boolParam, differentiateParam) => {
    setModalShow(boolParam);
    setDifferentiate(differentiateParam);
  };
  const navigateToAddCash = () => {
    navigate("/View_AddCash_history")
  }

  useEffect(() => {
    if (store?.admin) {
      if (permissionObj.allAdmin.includes(store?.admin?.roles[0].role) ||
        permissionObj.allSubAdmin.includes(store?.admin?.roles[0].role)) {
        getAll_Create();
      }
    }
  }, [store?.admin, walletCard.currentPage, walletCard.totalEntries, refresh, adminDelete]);

  useEffect(() => {
    if (store?.admin) {
      if (permissionObj.allAdmin.includes(store?.admin?.roles[0].role) ||
        permissionObj.allSubAdmin.includes(store?.admin?.roles[0].role)) {
        view_Balance();
      }
    }
  }, [refresh]);

  async function getAll_Create(searchName = walletCard.name) {
    const response = await getAllCreate({
      _id: store?.admin?.id,
      pageNumber: walletCard.currentPage,
      dataLimit: walletCard.totalEntries,
      name: searchName,
    });

    if (response) {
      setWalletCard((prevData) => ({
        ...prevData,
        userList: response?.data,
        totalPages: response?.pagination?.totalPages,
        totalData: response?.pagination?.totalRecords,
      }));
    }
  }

  async function view_Balance() {
    const response = await viewBalance({
      _id: store?.admin?.id,
    });

    if (response) {
      setBalance(response.data.balance);
    }
  }

  let startIndex = Math.min((Number(walletCard.currentPage) - 1) * Number(walletCard.totalEntries) + 1);
  let endIndex = Math.min(
    Number(walletCard.currentPage) * Number(walletCard.totalEntries),
    Number(walletCard.totalData),
  );

  const handlePageChange = (page) => {
    console.log('Changing to page:', page);
    handleChange('currentPage', page);
  };

  return (
    <div >
      <FullScreenLoader show={isLoading} />
      <div className="row ">
        <h2
          className="text-center font-weight-bold mb-4"
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            marginBottom: '4px',
          }}
        >
          USER LIST
        </h2>
      </div>
      <div className="text-center mt-10">
        <p style={{ fontWeight: 'bold' }}>Total Balance</p>
        <h4 className="mb-1">₹{balance}</h4>
        {store?.admin?.roles && store?.admin?.roles.length > 0 && store?.admin?.roles[0].role === strings.superAdmin && (
          <div className='row'>
            <div className='col-4'></div>
            <div className='col-4 '>
              <button
                className="btn btn-danger "
                aria-label="Close"
                onClick={() => handelOpenTransactionModal(true, 'addCashProvider')}
              >
                ADD CASH
              </button>
              <button
                className="btn btn-success ms-2"
                onClick={() => navigateToAddCash()}
              >
                CASH HISTORY
              </button>
            </div>
            <div className='col-4'></div>
          </div>

        )}
      </div>
      <div className="white_card_body m-3">
        <div className="QA_section">
          <div className="white_box_tittle list_header">
            <div className="col-2 text-center">
              <select
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
                onChange={(e) => handleChange('totalEntries', e.target.value)}
                value={walletCard.totalEntries}
              >
                <option value="5">Show 5 Entries</option>
                <option value="10">10 Entries</option>
                <option value="15">15 Entries</option>
                <option value="25">25 Entries</option>
                <option value="50">50 Entries</option>
                <option value="75">75 Entries</option>
              </select>
            </div>

            <div className="serach_field_2 ms-auto" style={{ marginLeft: '-10px' }}>
              <div className="search_inner">
                <form>
                  <div className="search_field">
                    <input
                      value={walletCard.name}
                      onChange={(e) => {
                        console.log('Input changed'); // Confirm onChange is firing
                        handleChange('name', e.target.value);
                      }}
                      type="text"
                      placeholder="Search content here..."
                    />
                  </div>
                  <button type="submit">
                    <i className="ti-search"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="QA_table mb_30" style={{ overflow: 'y-scroll' }}>
            {walletCard?.userList?.length > 0 ? (
              <>
                <table className="table lms_table_active3 table-bordered table-sm">
                  <thead
                    style={{
                      height: '10px',
                      backgroundColor: '#006699',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    <tr>
                      <th scope="col" className="text-bolder fs-6" style={{ fontWeight: 'bold', color: 'white' }}>
                        Username
                      </th>
                      <th
                        scope="col"
                        className="text-bolder fs-6 text-center"
                        style={{ fontWeight: 'bold', color: 'white' }}
                      >
                        Credit Ref.
                      </th>
                      <th
                        scope="col"
                        className="text-bolder fs-6 text-center"
                        style={{ fontWeight: 'bold', color: 'white' }}
                      >
                        Partnership
                      </th>
                      <th
                        scope="col"
                        className="text-bolder fs-6 text-center"
                        style={{ fontWeight: 'bold', color: 'white' }}
                      >
                        Balance
                      </th>
                      <th
                        scope="col"
                        className="text-bolder fs-6 text-center"
                        style={{ fontWeight: 'bold', color: 'white' }}
                      >
                        Exposure
                      </th>
                      <th
                        scope="col"
                        className="text-bolder fs-6 text-center"
                        style={{ fontWeight: 'bold', color: 'white' }}
                      >
                        Avail. Bal.
                      </th>
                      <th
                        scope="col"
                        className="text-bolder fs-6 text-center"
                        style={{ fontWeight: 'bold', color: 'white' }}
                      >
                        Ref. P/L
                      </th>
                      <th
                        scope="col"
                        className="text-bolder fs-6 text-center"
                        style={{ fontWeight: 'bold', color: 'white' }}
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="text-bolder fs-6 text-center"
                        style={{ fontWeight: 'bold', color: 'white' }}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  {walletCard.userList.map((data, i) => {
                    console.log("dtttta", data)
                    const creditRefLength = data.creditRefs.length;
                    const partnershipLength = data.partnerships.length;
                    return (
                      <Card
                        userName={data.userName}
                        role={data.roles[0].role}
                        key={data.id}
                        creditRef={data?.creditRefs[creditRefLength - 1]?.value}
                        balance={data.balance}
                        loadBalance={data.loadBalance}
                        refProfitLoss={data.refProfitLoss}
                        adminId={data.adminId}
                        userId={data.adminId} // pending for decision TOM
                        partnership={
                          data?.partnerships[partnershipLength - 1]?.value
                        }
                        Status={data.Status}
                        creditRefLength={creditRefLength}
                        partnershipLength={partnershipLength}
                        callingParent="Wallet"
                        setRefresh={setRefresh}
                        adminDelete={setAdminDelete}
                        setIsLoading={setIsLoading}
                      />
                    );
                  })}
                </table>
                <div>
                  <Pagination
                    currentPage={walletCard.currentPage}
                    totalPages={walletCard.totalPages}
                    handlePageChange={handlePageChange}
                    startIndex={startIndex}
                    endIndex={endIndex}
                    totalData={walletCard.totalData}
                  />
                </div>
              </>
            ) : (
              <div className="alert text-dark bg-light" role="alert">
                <div className="alert-text d-flex justify-content-center">
                  <b> &#128680; No Data Found !! </b>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <CustomTransactionModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        message="Hi this is msg"
        differentiate={differentiate}
        setRefresh={setRefresh}
      />
    </div>
  );
};

export default Wallet;
