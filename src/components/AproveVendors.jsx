import Switch from '@mui/material/Switch';
import React from 'react'
import { RiCloseLine } from 'react-icons/ri'
import Swal from "sweetalert2";
import { collectionAssignation, onUpdateAllVendors } from '../CRUD/app';

export const AproveVendors = ({vendors, setVendors, isOpen, onClose }) => {

    const handleChange = (target, vendor) => {
        const newStatus = target.checked ? "true" : "false";
        setVendors((prevVendors) =>
            prevVendors.map((prevVendor) =>
                prevVendor.id === vendor.id ? { ...prevVendor, estatus: newStatus } : prevVendor
        )
    );
        console.log(vendors);
    };

    const handleUpdateVendor = async (vendors) => {
        collectionAssignation('Vendors');
        await onUpdateAllVendors(vendors);
    };

    const updateVendors = async ev => {
        ev.preventDefault();
        Swal.fire({
          title: "¿Estas Seguro?",
          text: "Estas seguro que quieres modificar estos vendor",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Modificar"
        }).then(async (result) => {
          if (result.isConfirmed) {
            handleUpdateVendor(vendors);
            onClose();
            console.log("Vendors Actualizado");
            Swal.fire({
              title: "Vendors Modificado",
              text: "Gracias por actualizar los Vendors",
              icon: "success"
            })
          }
        });
      }

    if (!isOpen) return null
    return (
        <>
            <div className="vendorBox">
                <button className={"closeBtn"} onClick={onClose}>
                    <RiCloseLine style={{ marginBottom: "-3px" }} />
                </button>
                <h3 className='mb-4'>Aprovar Vendedores</h3>
                {vendors && vendors.map((vendor) => (
                        <div key={vendor.id} className='container-fluid d-flex justify-content-center' style={{ width: "20vw" }}>
                            <h5 className='m-1'>{vendor.email}</h5>
                            <Switch
                                disabled={vendor.email === "admin@gmail.com"}
                                checked={ vendor.estatus.toLowerCase() === 'true' ? true : false}
                                
                                name={vendor.email}
                                onChange={(event) => handleChange(event.target, vendor)}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </div>
                    ))
                }
            <button className='btn btn-success container d-flex justify-content-center col-4'
            onClick={updateVendors}
            >Guardar</button>
            </div>
        </>
    )
}
