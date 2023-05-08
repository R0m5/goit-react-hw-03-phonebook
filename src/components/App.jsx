import React, { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import css from './App.module.css';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleAddContact = contact => {
    if (this.state.contacts.some(item => item.name === contact.name)) {
      toast.error('Contact already exists');
      return true;
    }
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, contact],
      };
    });
    return false;
  };

  handleDeleteContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  handleChangeOfFilter = evt => {
    this.setState({ filter: evt.target.value });
  };

  handleFilterContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name
        .toLowerCase()
        .includes(this.state.filter.toLocaleLowerCase().trim())
    );
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '480px',
          margin: '20px auto',
          // marginTop: '50px',
          // marginBottom: '50px',
          backgroundColor: ' rgb(187, 187, 187)',
          borderRadius: '10px',
          padding: '40px 20px',
        }}
      >
        <h1 className={css.phohebookTitle}>Phonebook</h1>
        <ContactForm addContact={this.handleAddContact} />
        <h2 className={css.phohebookTitle}>Contacts</h2>
        <Filter
          value={this.state.filter}
          handleChange={this.handleChangeOfFilter}
        />
        <ContactList
          contacts={this.handleFilterContacts()}
          deleteContact={this.handleDeleteContact}
        />
        <Toaster />
      </div>
    );
  }
}
