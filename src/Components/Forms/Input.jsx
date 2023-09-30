import React from 'react';
import styles from './Input.module.css';

const Input = ({
  label,
  type,
  name,
  value,
  onChange,
  onBlur,
  onInvalid,
  error,
  required,
  autofocus,
  pattern,
  title,
}) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className={styles.input}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onInvalid={onInvalid}
        required={required}
        autoFocus={autofocus}
        pattern={pattern}
        title={title}
      />
      <p className={styles.error}>{error}</p>
    </div>
  );
};

export default Input;
