import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../Utils/Auth";
import AccountServices from "../../Services/AccountServices";
import { Modal, Button } from "react-bootstrap";

const SingleExistingUserRoleView = () => {
  const [singleHierarchydata, setSinglehierarchyData] = useState([]);
  const [permission, setPermission] = useState([]);
  const auth = useAuth();
  const { id } = useParams();
  const [showModalPartnership, setShowModalPartnership] = useState(false);

  useEffect(() => {
    AccountServices.getSingleViewSubUserRole(id, auth.user).then((res) => {
      setSinglehierarchyData(res.data);
      setPermission(res.data.roles[0].permission);
    });
  }, [id,auth]);

  const handleShowModalPartnership = (partnership) => {
    setShowModalPartnership(true);
   
  };

  const handleCloseModalPartnership = () => setShowModalPartnership(false);

  console.log("==========>SingleData", singleHierarchydata);
  return (
    <div className="main_content_iner ">
      <div className="container-fluid p-0">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="white_card card_height_100 mb_30">
              <div className="white_card_header">
                <div className="box_header m-0">
                  <div className="main-title">
                    <h3 className="m-0">PERMISSION DETAILS</h3>
                  </div>
                </div>
              </div>
              <div className="white_card_body">
                <div className="QA_section">
                  <div className="white_box_tittle list_header">
                  <h4>Username: {singleHierarchydata?.userName}</h4>
                </div>
                  <div className="QA_table mb_30">
                    
                    <table className="table lms_table_active3 ">
                      <thead>
                        <tr>
                          <th scope="col">PERMISSIONS ACCESSED</th>
                        </tr>
                      </thead>
                      <tbody>
                        {permission&&
                          permission.map((user, index) => (
                            <tr key={user._id}>
                              <th >{user}</th>
                            </tr>
                          ))}
                      </tbody>
                      <button className="btn btn-info" onClick={handleShowModalPartnership}> 
                        Renew permission
                      </button>
                    </table>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={showModalPartnership}
        onHide={handleCloseModalPartnership}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalPartnership}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseModalPartnership}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SingleExistingUserRoleView;
