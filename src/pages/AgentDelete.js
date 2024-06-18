import React, { useEffect, useState } from "react";
import { deleteTrash_api, restoreTrash_api, viewTrash_api } from "../Utils/service/apiService";



const AgentDelete = () => {
 
  const [viewAgentDelete, setViewAgentDelete] = useState([]);

  async function viewApprovedDelete() {
    const response = await viewTrash_api();
    console.log("======>>> response", response);
    setViewAgentDelete(response.data);
  }

  useEffect(() => {
    viewApprovedDelete();
  }, []);
  async function handleDeleteAgent(id) {
    console.log("onclick user trash id", id);

    const response = await deleteTrash_api({ trashId: id });

    alert("Agent Deleted From Trash Successfully!");
    window.location.reload();
  }

  async function handleRestore (adminId){
    console.log('onclick adminId ===== >>',adminId)
const data ={
  adminId:adminId
}
const response = await restoreTrash_api(data)
alert("Agent Restore From Trash Successfully!");
window.location.reload();
  }
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
                        onClick={(e) => {
                          handleDeleteAgent(data.trashId);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-info text-dark rounded"
                          onClick={(e) => handleRestore(data.adminId)}
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
