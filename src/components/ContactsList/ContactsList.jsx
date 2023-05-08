import React from 'react';
import PropTypes from 'prop-types';
import css from './ContactList.module.css';

export const ContactList = ({ contacts, deleteContact }) => {
  return (
    <ul className={css.contactList}>
      {contacts.map(contact => {
        return (
          <li key={contact.id} className={css.contactItem}>
            <p className={css.contactText}>
              {contact.name} : {contact.number}
            </p>
            <button
              className={css.contactListBtn}
              type="button"
              onClick={() => deleteContact(contact.id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

ContactList.protoTypes = {
  contacts: PropTypes.arrayOf(PropTypes.string),
};
