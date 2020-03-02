import React from 'react';
export default class AddATP extends React.Component{
  constructor(props){
    super(props);
    this.state={
      externalref:[],
      Name: "",
      url: "",
      error: false
    };
    this.add = this.add.bind(this);
    this.extnameinput=React.createRef();
    this.exturlinput=React.createRef();

  }

  render(){
    return(
      <div>
        <h1>Add new Attack pattern</h1>
        <label htmlFor="require"> Name of the Attack Pattern* :</label>
        <input type="text" placeholder="name"/>
        <br></br>
        <label>Alternate name:</label>
        <input type="text" placeholder="Optioonal"></input>
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
          <option>Example Type</option>
          <option>Example Type</option>
          <option>Example Type</option>
        </select>
        <br></br>
        <label>Platform: </label><br></br>
        <input type="checkbox"/>Linux<br></br>
        <input type="checkbox"/>Mac<br></br>
        <input type="checkbox"/>Windows<br></br>
        <label>Description</label>
        <br></br>
        <textarea placeholder="Brief description"></textarea>
        <h4>Add External Referece</h4><br></br>
        <table id='extternal' ref={this.tableref}>
          <thead>
            <tr>
              <th>Name</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="text" onChange={this.setname}  value={this.state.Name}></input></td>
              <td><input type="text" onChange={this.seturl}  value={this.state.location}></input></td>
            </tr>
            <tr style={this.state.error?{}:{display:'none'}} ><font color={'red'}>Please enter something</font></tr>
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
        <button onClick={this.add}>Add</button><br></br>
        <button>Submit</button>

      </div>
    );
  }
  setname=(e)=>{
    this.setState({
      Name:e.target.value
    });

  }
  seturl=(e)=>{
    this.setState({
      location:e.target.value
    });

  }
  add=()=>{
    if (this.state.Name && this.state.location){
      const copyarray= Object.assign([],this.state.externalref);
      copyarray.push({Name: this.state.Name, location: this.state.location});
      this.setState({externalref:copyarray, Name:"",location:"",error: false});
    }
    else{
      this.setState({error: true});
    }
  }
}
