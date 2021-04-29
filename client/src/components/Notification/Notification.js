import React from 'react';
import styles from './Notification.module.css';

import { useUserContext } from '../../context/userContext';

const Notification = () => {
  const { notification } = useUserContext();
  const { msg, isShowing } = notification;

  return (
    <div className={`${styles.notification} ${isShowing ? styles.show : null}`}>
      {msg}
    </div>
  );
};

export default Notification;
