import React, { Component } from 'react';
import {
  Container,
  Input,
  InputLabel,
  FormControl,
  IconButton
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import './App.css';
import List from './List';

export default class App extends Component {
  constructor(props) {
    super(props);
    const data = JSON.parse(window.localStorage.getItem('Lists'));
    this.state = {
      listName: '',
      listDescription: '',
      Lists: data || [],
      terms: (data || []).map(() => ({ value: '' }))
    };
  }

  onChangeName = (event) => {
    this.setState({ listName: event.target.value });
  };
  onChangeDescription = (event) => {
    this.setState({ listDescription: event.target.value });
  };
  onCreateList = (event) => {
    event.preventDefault();
    const list = [
      ...this.state.Lists,
      {
        name: this.state.listName,
        description: this.state.listDescription,
        items: []
      }
    ];
    window.localStorage.setItem('Lists', JSON.stringify(list));
    const data = JSON.parse(window.localStorage.getItem('Lists'));
    this.state.terms.push({ value: '' });
    this.setState({
      Lists: data,
      terms: this.state.terms,
      listName: '',
      listDescription: ''
    });
  };
  onChecked = (event) => {
    event.target.getAttribute('data-key');
    // this.state.terms.splice(index, 1, {
    //   value: event.target.value
    // });
    // this.setState({ terms: this.state.terms });
  };
  onChange = (event) => {
    const index = event.target.getAttribute('data-key');
    this.state.terms.splice(index, 1, {
      value: event.target.value
    });
    this.setState({ terms: this.state.terms });
  };

  onSubmit = (event) => {
    event.preventDefault();

    const index = event.target.getAttribute('data-key');
    const list = [
      ...this.state.Lists[index].items,
      this.state.terms[index].value
    ];
    this.state.Lists.splice(index, 1, {
      name: this.state.Lists[index].name,
      description: this.state.Lists[index].description,
      items: list
    });
    window.localStorage.setItem('Lists', JSON.stringify(this.state.Lists));
    const data = JSON.parse(window.localStorage.getItem('Lists'));
    this.state.terms.splice(index, 1, {
      value: ''
    });
    this.setState({
      Lists: data,
      terms: this.state.terms
    });
  };

  onDelete = (event) => {
    event.preventDefault();

    const index = event.target.getAttribute('data-key');
    const confirmDelete = confirm('Do you really want to delete this List');
    if (confirmDelete) {
      this.state.Lists.splice(index, 1);
      window.localStorage.setItem('Lists', JSON.stringify(this.state.Lists));
      const data = JSON.parse(window.localStorage.getItem('Lists'));
      this.setState({
        Lists: data
      });
    }
  };
  render() {
    return (
      <Container maxWidth="sm">
        <form className="Multi" onSubmit={this.onCreateList}>
          <FormControl>
            <InputLabel htmlFor="formatted-text-mask-input">
              List Name
            </InputLabel>
            <Input value={this.state.listName} onChange={this.onChangeName} />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="formatted-text-mask-input">
              Description
            </InputLabel>
            <Input
              value={this.state.listDescription}
              onChange={this.onChangeDescription}
            />
          </FormControl>
          <FormControl>
            <IconButton
              disabled={!this.state.listName.length}
              variant="contained"
              color="primary"
              type="submit"
              size="small"
              style={{ marginTop: '17px' }}
              title="Create new list"
            >
              <SaveIcon />
            </IconButton>
          </FormControl>
        </form>
        <div>
          {this.state.Lists.map((list, ind) => (
            <div key={ind} className="list">
              <form onSubmit={this.onSubmit} data-key={ind}>
                <div>
                  <span className="listName">{list.name}</span>
                  <IconButton
                    onClick={this.onDelete}
                    data-key={ind}
                    aria-label="delete"
                    color="secondary"
                    size="small"
                    style={{ float: 'right' }}
                    title="Delete list"
                  >
                    <DeleteIcon />
                  </IconButton>

                  <div className="description">{list.description}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <FormControl>
                    <InputLabel htmlFor="formatted-text-mask-input">
                      Enter To Do Item
                    </InputLabel>
                    <Input
                      value={this.state.terms[ind].value}
                      onChange={this.onChange}
                      data-key={ind}
                      inputProps={{ 'data-key': ind }}
                    />
                  </FormControl>
                  <FormControl>
                    <IconButton
                      disabled={!this.state.terms[ind].value.length}
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="small"
                      style={{ marginTop: '17px' }}
                    >
                      <AddIcon />
                    </IconButton>
                  </FormControl>
                </div>
              </form>

              <List list={list} onChange={this.onChecked} />
            </div>
          ))}
        </div>
      </Container>
    );
  }
}
