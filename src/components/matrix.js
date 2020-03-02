import './matrix.scss';
import React from 'react';
import _ from 'lodash';
import { NavLink } from 'react-router-dom'
import { data } from '../attack_matrix.js';
import {Link} from "react-router-dom";


export default class Matrix extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query_criteria: "id",
      query: ""
    }
  }
  render() {
    const {
      query,
      query_criteria,
    } = this.state;

    const processed_data = _.chain(data.objects)
      .reduce((result, row) => {
        if (_.includes(row[`${query_criteria}`], query)) {
          if (result[row.type]) {
            result[row.type].push(row)
          } else {
            result[row.type] = [row]
          }
        }
        return result;
      }, {})
      .value();
    const zipped_data = _.zip(..._.map(processed_data));

    return <div>
      <label> Search APT by: </label>
      <select onChange={(evt) =>  this.setState({ query_criteria: evt.target.value }) }>
        <option value="id" defaultValue> ID </option>
        <option value="name"> Name </option>
        <option value="created"> Created </option>
        <option value="x_mitre_version"> Version </option>
        <option value="type"> Type </option>
        <option value="description"> Description </option>
      </select>
      <input
        type="text"
        placeholder="Search APT"
        onChange={ (evt) => this.setState({ query: evt.target.value }) }
      />
      <Link to="/addatp">
        <button>Add new ATP</button>
      </Link>
      <br></br>
      <span style={{ fontWeight: 100, fontSize: 12 }}>
        Showing {zipped_data.length} rows of data
      </span>
      <table>
        <tbody>
          <tr key={"atp_type_header"}>
            {_.map(processed_data, (atp_data, atp_type) =>
              <td key={atp_type} style={{fontWeight: "bold"}}> {atp_type} </td>
            )}
          </tr>
          {_.map(zipped_data, (row) =>
            <tr key={_.uniqueId()}>
              { _.map(row, (data) =>
                data &&
                <td key={data.id}>
                  <NavLink exact to={{pathname: `/${data.id}`, data: data}}>
                    {data.name ? data.name : data.id}
                    </NavLink>
                </td>
              )}
            </tr>
            )}
        </tbody>
      </table>
    </div>;
  }

}
