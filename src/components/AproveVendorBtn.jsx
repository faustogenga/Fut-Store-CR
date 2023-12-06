import {AproveVendors} from './AproveVendors'
import "../CSS/Modal.css";
import { useEffect, useState } from 'react';
import { collectionAssignation, onFindAll } from '../CRUD/app';

export const AproveVendorBtn = ({user}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const handleAprove = async () => {
      collectionAssignation('Vendors');
      const docsSnapshot = await onFindAll();
      let filterData = docsSnapshot.docs.map((doc, index) => ({
        key: index,
        id: doc.id,
        ...doc.data(),
      }));
      setVendors(filterData.sort((a, b) => a.email.localeCompare(b.email)));
    };

    handleAprove();

  }, []);

  const onClose = () => {
    setIsOpen(false);
  }


  return (
    <>
      <button onClick={() => setIsOpen(true)} type="button" className={"btn btn-success mt-2"}>
        Aprovar Nuevos Vendedores
      </button>
      <AproveVendors isOpen={isOpen} onClose={onClose} vendors={vendors} setVendors={setVendors} user={user}/>
    </>
  );
};
