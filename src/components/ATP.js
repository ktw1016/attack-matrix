import React from 'react';
import _ from 'lodash';
import './ATP.scss';

export default class ATP extends React.Component {
  render() {
    const ATP = this.props.location.data;
    console.log(ATP);
    const formatted_map = (data) => _.map(data, (value, index) => index + 1 === data.length ? `${value}` : `${value}, `)

    return (
      <div className="column-container">
        <span className="header" dangerouslySetInnerHTML={{ __html: ATP.name || ATP.id }} />
        {ATP.description && <span className="sub-header" dangerouslySetInnerHTML={{ __html: "Description" }} />}
        <div className="row-container">
          <span className="left" dangerouslySetInnerHTML={{__html: ATP.description}}/>
          <div className= "right">
            <div className="column-container">
              <div className="row-container">
                <span className="mini-header"> ID: </span>
                <span> {ATP.id} </span>
              </div>
              <div className="row-container">
                <span className="mini-header"> Type: </span>
                <span> {ATP.type} </span>
              </div>
              { ATP.kill_chain_phases && <div className="row-container">
                <span className="mini-header"> Tactic: </span>
                <span> {_.map(ATP.kill_chain_phases, (value, index) => index + 1 === ATP.kill_chain_phases.length ? `${value.phase_name}` : `${value.phase_name}, `)} </span>
              </div> }
              { ATP.x_mitre_platforms && <div className="row-container">
                <span className="mini-header"> Platform: </span>
                <span> {formatted_map(ATP.x_mitre_platforms)} </span>
              </div> }
              { ATP.x_mitre_permissions_required && <div className="row-container">
                <span className="mini-header"> Permissions Required: </span>
                <span> {formatted_map(ATP.x_mitre_permissions_required)} </span>
              </div> }
              { ATP.x_mitre_data_sources && <div className="row-container">
                <span className="mini-header"> Data Sources: </span>
                <span> {formatted_map(ATP.x_mitre_data_sources)} </span>
              </div> }
              { ATP.x_mitre_version && <div className="row-container">
                <span className="mini-header"> Version: </span>
                <span> {ATP.x_mitre_version} </span>
              </div> }
              { ATP.created && <div className="row-container">
                <span className="mini-header"> Created: </span>
                <span> {ATP.created} </span>
              </div> }
              { ATP.modified && <div className="row-container">
                <span className="mini-header"> Last Modified: </span>
                <span> {ATP.modified} </span>
              </div> }

            </div>
          </div>
        </div>
        { ATP.x_mitre_detection && <span className="sub-header" dangerouslySetInnerHTML={{ __html: "Detection" }} />}
        <span style={{ margin: "0px 20px 20px 20px" }} dangerouslySetInnerHTML={{__html: ATP.x_mitre_detection}}/>
        
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