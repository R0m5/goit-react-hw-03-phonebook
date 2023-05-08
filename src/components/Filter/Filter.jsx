import PropTypes from 'prop-types';
import css from './Filter.module.css';

export const Filter = ({ handleChange, value }) => {
  return (
    <label className={css.contactLabel}>
      Find contacts by name
      <input
        className={css.contactInput}
        name="filter"
        type="text"
        value={value}
        onChange={handleChange}
      />
    </label>
  );
};

Filter.propTypes = {
  filter: PropTypes.string,
  value: PropTypes.string,
};
