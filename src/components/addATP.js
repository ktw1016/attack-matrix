import React from 'react';

import './addATP.scss';

export default class AddATP extends React.Component{
  constructor(props){
    super(props);
    this.state={
      externalref:[],
      name:"",
      extname: "",
      extlocation: "",
      error: false
    };

  }

  render(){

    return(
      <div>
        <div className="topbar">
          <h1>Add new Attack pattern</h1>
        </div>
        <div className='generalinfo'>
          <h4>General Information</h4>
          <label> Name of the Attack Pattern* :</label>
          <input type="text" onChange={this.setname} name='aptname'placeholder="name"/>
          <br></br>
          <label>Alternate name:</label>
          <input type="text" placeholder="Optional"></input>
          <br></br>
          <label>Type: </label>
          <select>
            <option>Example Type</option>
            <option>Example Type</option>
            <option>Example Type</option>
          </select>
          <br></br>
          <label>Tactic: </label>
          <select>
            <option>Example Tactic</option>
            <option>Example Tactic</option>
            <option>Example Tactic</option>
          </select>
        </div>
        <div className='containers'>
          <h4>Platform: </h4>
          <input type="checkbox"/>Linux<br></br>
          <input type="checkbox"/>Mac<br></br>
          <input type="checkbox"/>Windows<br></br>
        </div>
        <div className='containers'>
          <h4>Permissions Required: </h4>
          <input type="checkbox"/>User<br></br>
          <input type="checkbox"/>Admin<br></br>
          <input type="checkbox"/>System<br></br>
        </div>
        <div className='containers'>
          <h4>Description</h4>
          <textarea placeholder="Brief description"></textarea>
        </div>
        <div className='containers'>
          <h4>Detection</h4>
          <textarea placeholder="Brief expalin how it's detected"></textarea>
        </div>
        <div className='containers'>
        <h4>Add External Referece</h4>
        <table id='extternal' ref={this.tableref}>
          <thead>
            <tr>
              <th>Name</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="text" onChange={this.setextname}  value={this.state.extname}></input></td>
              <td><input type="url" onChange={this.seturl}  value={this.state.extlocation}></input></td>
              <td name='errormsg' style={this.state.error?{}:{display:'none'}} ><font color={'red'}>Please enter something for both Name and url</font></td>

            </tr>
            {
              this.state.externalref.map((ref,i)=>{
                return(
                  <tr key={i}>
                    <td >{ref.Name}</td>
                    <td >{ref.location}</td>
                  </tr>

                );
            })}
          </tbody>
        </table>
        <button name='extrefadd' onClick={this.add}>Add</button><br></br>
        </div>
        <div className='submit'>
          <button name='submit' onClick={this.submit}>Submit</button>
          <button name='cancel'onClick={this.cancel}>Cancel</button>
        </div>
      </div>

    );
  }
  setname=(e)=>{
    this.setState({
      name:e.target.value
    });
  }
  setextname=(e)=>{
    this.setState({
      extname:e.target.value
    });

  }
  seturl=(e)=>{
    this.setState({
      extlocation:e.target.value
    });

  }
  add=()=>{
    if (this.state.extname && this.state.extlocation){
      const copyarray= Object.assign([],this.state.externalref);
      copyarray.push({Name: this.state.extname, location: this.state.extlocation});
      this.setState({externalref:copyarray, extname:"",extlocation:"",error: false});
    }
    else{
      this.setState({error: true});
    }
  }
  cancel=()=>{
    if(window.confirm("Are you sure to cancel")){
      window.location="/";
    }
  }
  submit=()=>{
    if(this.state.name){
      if(window.confirm("Are you ready to submit?")){
        window.location="/";
      }
    }
    else {
      document.getElementsByName('atpname').color='red';
    }
  }
}
