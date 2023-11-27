import { collection, getDocs, doc, getDoc, addDoc, deleteDoc, updateDoc, where, query } from "firebase/firestore"
import { db } from "./firebase_conection";


/* 1. CREAR LA CONSTANTE DE LA COLECCION */
let collectionStr = '';

export const collectionAssignation = (assignedCollection) => {
    collectionStr = assignedCollection;
}


/* 2. CREAR & EXPORTAR TODOS LOS METODOS DEL CRUD */
export const onFindAll = async () => {
    console.log("Query FindALL");
    const result = await getDocs((collection(db, collectionStr)));
    return result;
};

/* 3. EXTRAER OBJETO */
export const onFindById = async (paramId) => {
    console.log("Query FindbyID");
    const result = await getDoc(doc(db, collectionStr, paramId));
    return result.data;
};

export const onFindByVendor = async (email) => {
    console.log("Query FindbyVendor");
    const result = await getDocs(query(collection(db, collectionStr), where("email", "==", email)));
    return result.empty
};


/* 4. INSERTAR OBJETO */
export const onInsert = async obj => {
    console.log("Query Insert");
    await addDoc(collection(db, collectionStr), obj);
}


/* 5. MODIFICAR OBJETO */
export const onUpdate = async (paramId, newObj) => {
    console.log("Query Update");
    await updateDoc(doc(db, collectionStr, paramId), newObj);
}


/* 6. ELIMINAR OBJETO */
export const onDelete = async paramId => {
    console.log("Query onDelete");
    await deleteDoc(doc(db, collectionStr, paramId));
}

/* 7. ENCONTRAR PRODUCTO EN CARRITO */
export const onFindinCart = async (email) => {
    console.log("Query FindinCart");
    const result = await getDocs(collection(db, collectionStr), where("customer_email", "==", email));
    return result.docs;
};