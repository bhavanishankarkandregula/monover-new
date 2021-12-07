import React, { useState } from "react";
import { render } from "react-dom";

const Add=()=> {
  const [state,setState]=useState({rows:[]})
const handleChange = idx => e => {
    const { name, value } = e.target;
    const rows = [...this.state.rows];
    rows[idx] = {
      [name]: value
    };
    setState({
      rows
    });
  };
  const handleAddRow = () => {
    const item = {
      name: "",
      mobile: ""
    };
    this.setState({
      rows: [...this.state.rows, item]
    });
  }
 const  handleRemoveRow = () => {
    this.setState({
      rows: this.state.rows.slice(0, -1)
    });
  };
  const handleRemoveSpecificRow = (idx) => () => {
    const rows = [...this.state.rows]
    rows.splice(idx, 1)
    this.setState({ rows })
  }
  
    return (
      <div>
        <div className="container">
          <div className="row clearfix">
            <div className="col-md-12 column">
              <table
                className="table table-bordered table-hover"
                id="tab_logic"
              >
                <thead>
                  <tr>
                    <th className="text-center"> # </th>
                    <th className="text-center"> Name </th>
                    <th className="text-center"> Mobile </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {state.rows.map((item, idx) => (
                    <tr id="addr0" key={idx}>
                      <td>{idx}</td>
                      <td>
                        <input
                          type="text"
                          name="name"
                          value={state.rows[idx].name}
                          onChange={handleChange(idx)}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="mobile"
                          value={state.rows[idx].mobile}
                          onChange={handleChange(idx)}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={handleRemoveSpecificRow(idx)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={handleAddRow} className="btn btn-primary">
                Add Row
              </button>
              <button
                onClick={handleRemoveRow}
                className="btn btn-danger float-right"
              >
                Delete Last Row
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  

}
export default Add