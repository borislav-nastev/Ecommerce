import React, { useState } from 'react';
import styles from './SingleOrder.module.css';

import { useUserContext } from '../../../context/userContext';
import { useOrderContext } from '../../../context/orderContext';

const SingleOrder = ({ createdAt, orders, _id, status }) => {
  const [state, setState] = useState(status);

  const { isAdmin } = useUserContext();
  const { editOrder, removeOrder, findSingleOrder } = useOrderContext();

  const totalSum = orders.reduce((acc, curr) => {
    acc += Number(curr.price) * Number(curr.quantity);
    return acc;
  }, 0);

  const handleChange = (e) => {
    setState(e.target.value);
    editOrder(_id, orders, e.target.value);
  };

  return (
    <tr className={styles.row}>
      <td>{createdAt.slice(0, 10)}</td>
      <td className={styles.price_td}>${totalSum.toFixed(2)}</td>
      <td
        className={
          isAdmin
            ? `${styles.status_td} ${styles.status_td_admin}`
            : styles.status_td
        }
      >
        {isAdmin ? (
          <select name='status' value={state} onChange={handleChange}>
            {status === 'in progress' ? (
              <option value='in progress'>in progress</option>
            ) : null}
            <option value='completed'>completed</option>
          </select>
        ) : (
          status
        )}
      </td>
      <td className={styles.actions}>
        {isAdmin && status === 'completed' ? (
          <button
            className={styles.delete_order}
            onClick={() => removeOrder(_id)}
          >
            delete
          </button>
        ) : (
          <button
            className={styles.details_btn}
            onClick={() => findSingleOrder(_id)}
          >
            view
          </button>
        )}
      </td>
    </tr>
  );
};

export default SingleOrder;
