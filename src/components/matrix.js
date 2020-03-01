import './matrix.scss';
import React from 'react';
import _ from 'lodash';
import { data } from '../attack_matrix.js';

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
      <select onChange={(evt) => {
        this.setState({ query_criteria: evt.target.value })
      }}>
        <option value="id" selected> ID </option>
        <option value="name"> Name </option>
        <option value="created"> Created </option>
        <option value="x_mitre_version"> X Mitre Version </option>
        <option value="type"> Type </option>
        <option value="description"> Description </option>
      </select>
      <input
        type="text"
        placeholder="Search APT"
        onChange={(evt) => {
          this.setState({ query: evt.target.value });
        }}
      />
      <table>
        <tr key={"atp_type_header"}>
          {_.map(processed_data, (atp_data, atp_type) => 
            <td style={{fontWeight: "bold"}}> {atp_type} </td>
          )}
        </tr>
        {_.map(zipped_data, (row) => 
          <tr>
            { _.map(row, (data) =>
              data &&
              <td key={data.id}> { data.name ? data.name : data.id } </td>
            )}
          </tr>
          )}
      </table>
    </div>;
  }
}