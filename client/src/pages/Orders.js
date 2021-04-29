import React, { useEffect } from 'react';
import Title from '../components/Title/Title';
import SingleOrder from '../components/Order/SingleOrder/SingleOrder';
import OrderDetails from '../components/Order/OrderDetails/OrderDetails';
import Loading from '../components/Loading/Loading';

import { useOrderContext } from '../context/orderContext';
import { useUserContext } from '../context/userContext';

const Orders = () => {
  const { orders, loadOrders } = useOrderContext();
  const { isLoading } = useUserContext();

  useEffect(() => {
    loadOrders();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className='orders_section'>
      <Title text='Orders' />

      {orders.length === 0 ? (
        <h2 className='no_orders'>No Active Orders</h2>
      ) : (
        <table className='orders_table'>
          <thead>
            <tr>
              <th>time</th>
              <th>total price</th>
              <th>status</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return <SingleOrder key={order._id} {...order} />;
            })}
          </tbody>
        </table>
      )}

      <OrderDetails />
    </section>
  );
};

export default Orders;
