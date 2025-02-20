import React from "react";
import "./index.css";
const InforTab = ({ title, data }) => {
  return (
    <div className="container flex flex-col">
      <div className="title-tab">{title}</div>
      <table className="table-info">
        <tbody>
          {data.map((d, index) => (
            <tr key={index}>
              <td>
                <h6>{d.key}</h6>
              </td>
              <td>
                <p>{d.value}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InforTab;
