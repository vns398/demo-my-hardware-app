import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState } from 'react'
import ReactDOM from 'react-dom/client';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'

class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="5">
          {category}
        </th>
      </tr>
    );
  }
}

class ProjectRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        textFieldInput: '',
        HW1availability: 0,
        HW2availability: 0,
    };
  }

  handleTextFieldChange(event) {
    event.preventDefault();
    this.setState({
      textFieldInput: event.target.value,
    });
  }

  doSomethingWithInput(event, check, set) {
    event.preventDefault();
    const {textFieldInput,} = this.state;
    const newAva = 0;
    if (typeof(textFieldInput) ==! 'number' || (textFieldInput === '')){
        return;
    }

    const num = parseInt(textFieldInput);
    if((set === 1) && (check == true)) {
        this.setState({
            HW1availability: this.state.HW1availability+num,
        });
    }
    else if((set === 1) && (check == false)) {
        this.setState({
            HW1availability: this.state.HW1availability-num,
        });
    }
    else if((set === 2) && (check == true)) {
        this.setState({
            HW2availability: this.state.HW2availability+num,
        });
    }
    else if((set === 2) && (check == false)) {
        this.setState({
            HW2availability: this.state.HW2availability-num,
        });
    }
  }
  state = { textflag: false,}

  ToggleButton() {
        this.setState(
            {textflag : !this.state.textflag}
        );
    }

  render() {
    const project= this.props.project;
     const member = project.member ? 'Leave' : 'Join'

    return (
      <tr>
        <td>{this.state.HW1availability}/100</td>
        <td>
            <TextField
                id="standard-basic"
                label="Quantity"
                variant="standard"
                onChange={(e) => this.handleTextFieldChange(e)}
            />
            <Button variant="contained" onClick={(e) => this.doSomethingWithInput(e, true, 1)}>
                Check-in
            </Button>
            <Button variant="contained" onClick={(e) => this.doSomethingWithInput(e, false, 1)}>
                Check-out
            </Button>
        </td>
        <td>{this.state.HW2availability}/100</td>
        <td>
            <TextField
                id="standard-basic"
                label="Quantity"
                variant="standard"
                onChange={(e) => this.handleTextFieldChange(e)}
            />
            <Button variant="contained" onClick={(e) => this.doSomethingWithInput(e, true, 2)}>
                Check-in
            </Button>
            <Button variant="contained" onClick={(e) => this.doSomethingWithInput(e, false, 2)}>
                Check-out
            </Button>

        </td>
        <td>
            <Button variant="contained"
            onClick={() => this.ToggleButton()}>
                {this.state.textflag === false ? "Join":"Leave"}
            </Button>
        </td>
      </tr>
    );
  }
}

class ProjectTable extends React.Component {
    render() {
        const rows = [];
        let lastCategory = null;
        this.props.projects.forEach((project) => {
            rows.push(
                <ProductCategoryRow
                    category={project.Name}
                    key={project.Name}
                />
            );
            rows.push(
                <ProjectRow
                    project={project}
                    key={project.Name}
                />
            );
        }
        );
        return (
          <table>
            <thead>
              <tr>
                <th>Hardware Set 1 Availability</th>
                <th>Check-in/Check-out</th>
                <th>Hardware Set 2 Availability</th>
                <th>Check-in/Check-out</th>
                <th>Member</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        );
    }
}

class Projects extends React.Component {
    render() {
        const projects = [{Name: 'Project 1', HW1qty: 100, HW2qty: 100, member: "Join"},
                         {Name: 'Project 2',HW1qty: 100, HW2qty: 100, member: "Leave"},
                         {Name: 'Project 3',HW1qty: 100, HW2qty: 100, member: "Join"}
        ]
        return (
            <div>
                <ProjectTable projects = {projects} />
            </div>
        );
    }
}

function App() {
  return (
    <div className="App">
        <Projects/>
    </div>
  );
}

export default App;
