import React, { useEffect, useState } from 'react'
import { collectionAssignation, onFindAll } from '../CRUD/app';

export const Inbox = ({ user }) => {
  const [orders, setOrders] = useState([])
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDataOrders();
    }
  }, [user]);

  const fetchDataOrders = async (email) => {
    collectionAssignation('OrderPlaced');
    try {
      const docsSnapshot = await onFindAll();
      let filterData = docsSnapshot.docs.map((doc, index) => (
        {
          key: index,
          id: doc.id,
          ...doc.data(),
        }
      ));
      filterData = filterData.filter(item => item.userEmail === user.email);
      console.log(filterData);
      setOrders(filterData);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div style={{
      backgroundImage: "url(https://i.pinimg.com/originals/cb/e8/23/cbe8230004b895b545b61337f8d0ff99.jpg)",
      backgroundSize: "cover"
    }}
      className='d-flex justify-content-center py-4'>
      <div style={{ width: "40%" }} className=''>
        <h3 className='text-center mt-3 bg-white rounded-pill opacity-75'>Mensajes</h3>
        <div className='text-center'>
          <button className='btn btn-info m-3' onClick={() => setIsOpen(true)}>Nuevo</button>
          <button className='btn btn-success m-3' onClick={() => setIsOpen(false)}>Inbox</button>
        </div>
        <div className='p-5 bg-white rounded'>
          {isOpen ? (
            <div className='d-flex'>
               <div className='mx-3'>vendedor : </div>
               <select>
                  {orders.map((order) => {
                    return <option>{order.vendor}</option>
                  }
                  )}
                </select>
            </div>
          ) : (
            <div className='text-center'>
              is closed
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
