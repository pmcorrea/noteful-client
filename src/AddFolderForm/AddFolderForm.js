import React, { Component } from 'react'
import './AddFolderForm.css'
import {MainContext} from '../MainContext.js'

export default class AddFolderForm extends Component {
  static contextType = MainContext;

	constructor(props) {
    super(props);
	this.state = {
		id: '',
		folder_id: Math.random().toString(36).substr(2, 9),
		folder_name: '',
    }
  }

	updateFolderName(input) {
		this.setState({
			id: this.context.folders.length + 1,
			folder_name: input,
		});
	}

	handleSubmit(event) {
    	event.preventDefault();
		const folder  = this.state;
		this.context.addFolder(folder);
		// this.props.history.push('/');

		fetch('http://localhost:5000/folders', {
			method: 'POST',
			headers: {
					'content-type': 'application/json'
			},
			body: JSON.stringify({
				folder
			})
		})
			.then(response => {
				if (!response.ok) {
					throw new Error(response.status)
				}
				return response.json()
			})
			.then(this.props.history.push('/'))
			.catch(error => this.setState({error}))
	}

	validateLength() {
		const folderName = this.state.name

		if (this.state.name.trim().length === 0) {
			return 'Name can not be blank'
		}

		if (folderName.length === 0) {
			return 'Name can not be blank'
		}

		if ((folderName.length < 3)&&(folderName.length > 0)) {
			return 'Name must be longer than 3 characters'
		}
	}

	validateExistingName() {
		const folderName = this.state.name
		const folders = this.context.folders.map(folder => folder.name)

		if (folders.find(folder => folder === folderName)) {
			return 'Folder name already exists'
		}
	}
  
  render(){  
    return (
    <>
    
      <form className={['Noteful-form'].join(' ')} onSubmit={e => this.handleSubmit(e)}>
        <label htmlFor='note_input_field'>Folder Name</label>
        <input id='note_input_field' type='text' onChange={e => this.updateFolderName(e.target.value)}></input>

        <button type='submit'>Submit</button>
      </form>
    </>
  )
  }
  
}
