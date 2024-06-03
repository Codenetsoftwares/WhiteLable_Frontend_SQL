import React, { useEffect, useState } from "react";
import { useAuth } from "../Utils/Auth";
import AccountServices from "../Services/AccountServices";

const AgentDelete = () => {
  const auth = useAuth();

  const [viewAgentDelete, setViewAgentDelete] = useState([]);
  // const [isApproved, setIsApproved] = useState();
  var EditData = [];

  useEffect(() => {
    if (auth.user) {
      AccountServices.ViewAgentDelete(auth.user).then(
        (res) => (console.log(res), setViewAgentDelete(res.data.data))
      );
    }
  }, [auth]);

  console.log(viewAgentDelete);

  for (let i = 0; i < alert.length; i++) {
    EditData[i] = alert[i].changedFields;
  }
  console.log(viewAgentDelete);

  const handleDelete = (e, id) => {
    e.preventDefault();
    console.log("=============....>>>>>", id);
    const flag = true;

    const data = {
      isApproved: flag,
    };
    AccountServices.IsAgentDeleteApprove(id, auth.user)
      .then((response) => {
        alert("Agent Deleted From Trash Successfully!");
        window.location.reload();
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRestore = (e, id) => {
    e.preventDefault();
    console.log("=============....>>>>>", id);
    const data = {
      adminId: id,
    };
    AccountServices.restoreAgent(data, auth.user)
      .then((response) => {
        alert("Agent Restore From Trash Successfully!");
        window.location.reload();
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {viewAgentDelete.length > 0 ? (
        <div className="container d-flex justify-content-center ">
          <div className=" p-2">
            <div>
              <table className="table  m-2">
                <thead
                  style={{
                    height: "10px",
                    backgroundColor: "#006699",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  <tr>
                    <th scope="col">SL. NO.</th>
                    <th
                      scope="col"
                      style={{ fontWeight: "bold", color: "white" }}
                    >
                      AGENT NAME
                    </th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                {viewAgentDelete.map((data, index) => (
                  <tr key={data.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{data.userName}</td>
                    <td>
                      <button
                        className="btn  btn-danger text-dark rounded"
                        onClick={(e) => handleDelete(e, data.trashId)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-info text-dark rounded"
                        onClick={(e) => handleRestore(e, data.adminId)}
                      >
                        Restore
                      </button>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div class="container alert alert-warning mt-1" role="alert">
          <p className="d-flex justify-content-center">
            No Delete Request Found
          </p>
        </div>
      )}
    </>
  );
};

export default AgentDelete;
