import "../CSS/Modal.css";
import { RiCloseLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { collectionAssignation, onInsert } from "../CRUD/app";
import { useState } from "react";



export const AddProducts = ({ isOpen, onClose }) => {

    const initialValues = {
        category: '',
        description: '',
        name: '',
        price: '',
        size: '',
        img: '',
        stock: '',
        vendor: 'j'
    }

    const [values, setValues] = useState(initialValues);

    const onChangeValues = ({ target }) => {
        const { name, value } = target;
        setValues({ ...values, [name]: value });
        console.log(values);
    }


    const addProduct = async ev => {
        ev.preventDefault();
        console.log(values);

        if (Object.values(values).some(value => value.trim() === '')) {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, completa todos los campos.',
                icon: 'error'
            });
            return;
        }

        console.log(values);
        Swal.fire({
            title: "¿Estas Seguro?",
            text: "Estas seguro que quieres agregar producto",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Agregar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                collectionAssignation('Products');
                await onInsert(values);
                onClose()
                Swal.fire({
                    title: "Producto Agregado",
                    text: "Gracias por agregar tu producto",
                    icon: "success"
                })
            }
        });
    }


    if (!isOpen) return null
    return (
        <>
            <div className="overlay" />
            <div className="modalbox m-2">
                <button className={"closeBtn"} onClick={onClose}>
                    <RiCloseLine style={{ marginBottom: "-3px" }} />
                </button>
                <h3>Agrega tu producto</h3>
                <form>
                    <div className="text-start m-0">Categoria </div>
                    <input required="required" className='form-control ' type="text" name="category" value={values.category} onChange={onChangeValues} placeholder='Categoria' />
                    <div className="text-start" >Producto </div>
                    <input required="required" className='form-control ' type="text" name="name" value={values.name} onChange={onChangeValues} placeholder='Producto' />

                    <div className="text-start" >Imagen </div>
                    <input required="required" className='form-control ' type="text" name="img" value={values.img} onChange={onChangeValues} placeholder='Imagen' />

                    <div className="text-start m-0">Descripcion </div>
                    <textarea className="form-control p-4" type="text" name="description" value={values.description} onChange={onChangeValues} placeholder='Descripcion' />

                    <div className="text-start m-0">Precio </div>
                    <input required="required" className='form-control  ' type="text" name="price" value={values.price} onChange={onChangeValues} placeholder='Precio' />

                    <div className="text-start m-0">Talla </div>
                    <input required="required" className='form-control  ' type="text" name="size" value={values.size} onChange={onChangeValues} placeholder='Talla' />

                    <div className="text-start m-0">Cantidad </div>
                    <input required="required" className='form-control  ' type="text" name="stock" value={values.stock} onChange={onChangeValues} placeholder='Cantidad' />

                    <div className="container-fluid text-center">
                        <button className="btn btn-info m-2" type="sumbit" onClick={addProduct}>Agregar</button>
                        <button className="btn btn-danger m-2" onClick={onClose}>Cerrar</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddProducts;