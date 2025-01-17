import React from "react";
import styles from "./index.css";
const InforTab = ({ title, data }) => {
  return (
    <div className="container flex flex-col">
      <div className="title-tab">{title}</div>
      <table className="table-info">
        {data.map((d, index) => (
          <tr key={index} className="">
            <td>
              <h6>{d.key}</h6>
            </td>
            <td>
              <p>{d.value}</p>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default InforTab;
