import React from 'react';
import classNames from 'classnames';
import styles from './TextArea.module.css';

const TextArea = ({className, ...props}) => {
  return <textarea className={classNames(styles.textarea, className)} {...props} />;
};

export default TextArea;
