import { collection, getDocs, query, doc, getDoc, addDoc, deleteDoc, updateDoc } from "firebase/firestore"
import { db } from "./firebase_conection";


/* 1. CREAR LA CONSTANTE DE LA COLECCION */
let collectionStr = 'Products';

export const collectionAssignation = (assignedCollection)=> {
    collectionStr = assignedCollection;
}


/* 2. CREAR & EXPORTAR TODOS LOS METODOS DEL CRUD */
export const onFindAll = async () =>{
    const result = await getDocs((collection(db, collectionStr )));
    return result;
};

/* 3. EXTRAER OBJETO */
export const onFindById = async paramId => {
    const result = await getDoc(doc(db, collectionStr, paramId));
    return result.data();
};


/* 4. INSERTAR OBJETO */
export const onInsert =  async obj => {
    await addDoc(collection(db, collectionStr), obj);
}


/* 5. MODIFICAR OBJETO */
export const onUpdate = async (paramId, newObj) => {
    await updateDoc(doc(db, collectionStr, paramId), newObj);
}


/* 6. ELIMINAR OBJETO */
export const onDelete = async paramId => {
    await deleteDoc(doc(db, collectionStr, paramId));
}
