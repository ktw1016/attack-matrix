import React from 'react';
import _ from 'lodash';
import './ATP.scss';

export default class ATP extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editing: false,
    };
  }
  render() {
    const { editing } = this.state;
    let ATP = this.props.location.data;
    const formatted_map = (data) => _.map(data, (value, index) => index + 1 === data.length ? `${value}` : `${value}, `);
    const format_arr_str = (str) => _.map(_.split(str, ","), (s) => _.trim(s));

    return (
      <div className="column-container">
        <div className="row-container">
          { editing ? <textarea className="header" id={ATP.name ? "name" : "id"} defaultValue={ATP.name || ATP.id}/>  : <span className="header" dangerouslySetInnerHTML={{ __html: ATP.name || ATP.id }} /> }
          <button className="edit" onClick={ () => {
            if(editing) {
              const fields = _.map(document.getElementsByTagName("TEXTAREA"));
              _.forEach(fields, (field) => {
                const multi = field.id==="x_mitre_platforms" || field.id==="x_mitre_permissions_required" || field.id==="x_mitre_data_sources";
                if(field.id==="kill_chain_phases"){
                } else {
                  ATP[`${field.id}`] = multi ? format_arr_str(field.value) : field.value;
                }
              });
            }
            this.setState({ editing: !editing });
            }}>
              { editing ? "APPLY" : "EDIT THIS PAGE"}
          </button>
        </div>
        {ATP.description && <span className="sub-header" dangerouslySetInnerHTML={{ __html: "Description" }} />}
        <div className="row-container">
          { editing ? <textarea className="left" id="description" defaultValue={ATP.description}/> : <span className="left" dangerouslySetInnerHTML={{__html: ATP.description}}/> }
          <div className= "right">
            <div className="column-container">
              <div className="row-container">
                <span className="mini-header"> ID: </span>
                { editing ? <textarea id="id" defaultValue={ATP.id}/>: <span> {ATP.id} </span> }
              </div>
              <div className="row-container">
                <span className="mini-header"> Type: </span>
                { editing ? <textarea id="type" defaultValue={ATP.type}/> : <span> {ATP.type} </span> }
              </div>
              { ATP.kill_chain_phases && <div className="row-container">
                <span className="mini-header"> Tactic: </span>
                { editing ? <textarea id="kill_chain_phases" defaultValue={_.map(ATP.kill_chain_phases, (value, index) => index + 1 === ATP.kill_chain_phases.length ? `${value.phase_name}` : `${value.phase_name}, `)}/> : <span> {_.map(ATP.kill_chain_phases, (value, index) => index + 1 === ATP.kill_chain_phases.length ? `${value.phase_name}` : `${value.phase_name}, `)} </span> }
              </div> }
              { ATP.x_mitre_platforms && <div className="row-container">
                <span className="mini-header"> Platform: </span>
                { editing ? <textarea id="x_mitre_platforms" defaultValue={ATP.x_mitre_platforms}/> : <span> {formatted_map(ATP.x_mitre_platforms)} </span> }
              </div> }
              { ATP.x_mitre_permissions_required && <div className="row-container">
                <span className="mini-header"> Permissions Required: </span>
                { editing ? <textarea id="x_mitre_permissions_required" defaultValue={ATP.x_mitre_permissions_required}/> : <span> {formatted_map(ATP.x_mitre_permissions_required)} </span> }
              </div> }
              { ATP.x_mitre_data_sources && <div className="row-container">
                <span className="mini-header"> Data Sources: </span>
                { editing ? <textarea id="x_mitre_data_sources" defaultValue={ATP.x_mitre_data_sources}/> : <span> {formatted_map(ATP.x_mitre_data_sources)} </span> }
              </div> }
              { ATP.x_mitre_version && <div className="row-container">
                <span className="mini-header"> Version: </span>
                { editing ? <textarea id="x_mitre_version" defaultValue={ATP.x_mitre_version}/> : <span> {ATP.x_mitre_version} </span> }
              </div> }
              { ATP.created && <div className="row-container">
                <span className="mini-header"> Created: </span>
                { editing ? <textarea id="created" defaultValue={ATP.created}/> : <span> {ATP.created} </span> }
              </div> }
              { ATP.modified && <div className="row-container">
                <span className="mini-header"> Last Modified: </span>
                { editing ? <textarea id="modified" defaultValue={ATP.modified}/> : <span> {ATP.modified} </span> }
              </div> }

            </div>
          </div>
        </div>
        { ATP.x_mitre_detection && <span className="sub-header" dangerouslySetInnerHTML={{ __html: "Detection" }} />}
        { editing ? <textarea id="x_mitre_detection" defaultValue={ATP.x_mitre_detection}/> : <span style={{ margin: "0px 20px 20px 20px" }} dangerouslySetInnerHTML={{__html: ATP.x_mitre_detection}}/> }

        { ATP.external_references && <span className="sub-header" dangerouslySetInnerHTML={{ __html: "References" }} />}
        {_.map(ATP.external_references, (ref, index) =>
          <a
          style={{ margin: "0px 0px 0px 20px" }}
          key={index}
          href={ref.url}
          dangerouslySetInnerHTML={{
            __html:
              (ref.description ? `${index}. ${ref.description}` : `${index} ${ref.source_name}`)
          }} />
        )}
      </div>
    );
  }
}
