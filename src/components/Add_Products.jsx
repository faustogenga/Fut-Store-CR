import React, { useState } from 'react'
import { onInsert } from '../CRUD/app'
import swal from 'sweetalert';
import { collectionAssignation } from '../CRUD/app'

import '../CSS/Add_Products.css'

import imagenAP from "../images/agregar_producto_formcomplement-v5.png";

const collectionDB_Name= 'Products';

const Add_Products = () => {
    const initialValues = {
        name : "",
        category : "",
        price : "",
        stock : "",
        description : ""
    }


// UseSatate
const [values, setValues] = useState(initialValues);


// UseEffect


// Métodos
const handleInputChange = ( { target } )=>{
    const { name, value } = target;
    //console.log(name, value);
    setValues({...values, [name]:value});
    console.log(values);
}


// CRUD
const onSubmit = async ev =>{
    ev.preventDefault();
    if (values.name === "" || values.category === "" || values.category === "valor_nulo" || values.price === "" || values.stock === "" || values.description === ""){
        console.log("No se puede Sapo");
        swal("Error", "All fields must be completed.", "error");   
    }
    else{
        try {
            collectionAssignation(collectionDB_Name);
            await onInsert(values);
            swal("Good job!", "Registro ingresado correctamente.", "success");    
        } catch (error) {
            swal("Error", "Error: " + error, "error");    
        }
    }
}



  return (
    <>
        <div className='page_head'></div>


        <div className="container" style={{display:'grid', gridTemplateColumns:'1fr 1fr'}}>
            <div className="rightsite-image" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={imagenAP} alt='No im' />
            </div>
            <div className="row">
                {/* DETALLE */}
                <div >
                    <form className="col-4" onSubmit={ onSubmit /* DETERMINA EL MÉTODO A EJECUTAR */ }>
                        
                        <p className='title' style={{fontFamily:'Century Gothic'}}> Agregar Producto </p>
                        
                        <p className='form_product_options_text' style={{fontFamily:'Century Gothic'}}>Producto</p>
                        <div>
                            <input
                                type="text"
                                name="name" 
                                value={ values.name } 
                                onChange={ handleInputChange } 
                                placeholder='' 
                                className='form_product_options'
                            />
                        </div>

                        <p className='form_product_options_text' style={{fontFamily:'Century Gothic'}}>Categoría</p>
                        <div>
                            <select 
                                name="category"
                                value={ values.category } 
                                onChange={ handleInputChange }
                                placeholder=''
                                className='form_product_options'
                            >
                                <option value="valor_nulo"> - - - Seleccionar - - -</option>
                                <option value="Camisetas"> Camisetas </option>
                                <option value="Tenis"> Tenis </option>
                                <option value="Gorras"> Gorras </option>
                                <option value="Accesorios"> Accesorios </option>
                            </select>
                        </div>

                        <p className='form_product_options_text' style={{fontFamily:'Century Gothic'}}>Precio</p>
                        <div className="form-group">
                            <input 
                                type="number"
                                min="0"
                                name="price" 
                                value={ values.price } 
                                onChange={ handleInputChange } 
                                placeholder='' 
                                className='form_product_options' 
                            />
                        </div>

                        <p className='form_product_options_text' style={{fontFamily:'Century Gothic'}}>Cantidad de stock</p>
                        <div className="form-group">
                            <input 
                                type="number" 
                                name="stock" 
                                value={ values.stock } 
                                onChange={ handleInputChange } 
                                placeholder='' 
                                className='form_product_options' 
                            />
                        </div>

                        <p className='form_product_options_text' style={{fontFamily:'Century Gothic'}}>Descripción</p>
                        <div className="form-group">
                            <input 
                                type="text"
                                maxLength="300"
                                name="description" 
                                value={ values.description } 
                                onChange={ handleInputChange } 
                                placeholder=''
                                style={{paddingBottom: 100}}
                                
                                className='form_product_options' 
                            />
                        </div>   

                        <button className='btn_save_product'>Guardar</button>
                    
                    </form>
                </div>
            </div>
        </div>

    </>
  )
}

export default Add_Products