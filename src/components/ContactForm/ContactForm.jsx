import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Component } from 'react';
import css from './ContactForm.module.css';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const isContactExsist = this.props.addContact({
      id: nanoid(6),
      ...this.state,
    });

    if (!isContactExsist) {
      this.reset();
    }
  };

  // this.props.props.propOnSubmit(this.state);

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
    // this.setState({ [evt.target.name]: evt.target.value });
  };

  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={css.form}>
        <label htmlFor="" className={css.formLabel}>
          Name
          <input
            value={name}
            onChange={this.handleChange}
            className={css.formInput}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>

        <label htmlFor="" className={css.formLabel}>
          Number
          <input
            value={number}
            onChange={this.handleChange}
            className={css.formInput}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>

        <button type="submit" className={css.addContactBtn}>
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  propOnSubmit: PropTypes.func,
};
