import { collection, getDocs, doc, getDoc, addDoc, deleteDoc, updateDoc, where, query } from "firebase/firestore"
import { db } from "./firebase_conection";

/* ***************************** GENERAL METHODS ***************************** */

/* 1. CREAR LA CONSTANTE DE LA COLECCION */
let collectionStr = '';

export const collectionAssignation = (assignedCollection) => {
    collectionStr = assignedCollection;
}

/* 2. CREAR & EXPORTAR TODOS LOS METODOS DEL CRUD */
export const onFindAll = async () => {
    const result = await getDocs((collection(db, collectionStr)));
    return result;
};

/* 3. EXTRAER OBJETO */
export const onFindById = async (paramId) => {
    const result = await getDoc(doc(db, collectionStr, paramId));
    return result.data;
};

export const onFindByVendor = async (email) => {
    const result = await getDocs(query(collection(db, collectionStr), where("email", "==", email)));
    return result
};


/* 4. INSERTAR OBJETO */
export const onInsert = async obj => {
    await addDoc(collection(db, collectionStr), obj);
}

/* 4.2 Insertar nuevo Chat y su subcolleccion con mensaje  */
export const onInsertNewChat = async(chat,message) => {
    const newChatCollection = await addDoc(collection(db,"Chat"),chat);
    const subCollectionMessage = collection(newChatCollection,"Messages");
    await addDoc(subCollectionMessage,message);
}

//*4.3 Insertar en un chat existente *//
/* Inserta objecto en colleccion dentro de doc */
export const onInsertMessageDoc = async(refChatId, obj) => {
    const chatDoc =  doc(db,"Chat",refChatId);
    const subCollection = collection(chatDoc,'Messages');
    const messagesData = await getDocs(subCollection);
    const messagesLength = messagesData.docs.length;
    obj.order = messagesLength + 1;
    await addDoc(subCollection, obj);
}

/**4.4 Get Messages del Chat */

export const onGetMessages = async(refChatId) => {
    const chatDoc =  doc(db,"Chat",refChatId);
    const subCollection = collection(chatDoc,'Messages');
    const messages = await getDocs(subCollection);
    return messages;
}


/* 5. MODIFICAR OBJETO */
export const onUpdate = async (paramId, newObj) => {
    await updateDoc(doc(db, collectionStr, paramId), newObj);
};

/* 6. Modificar todos los vendors */

export const onUpdateAllVendors = async (vendors) => {
    try {
        vendors.forEach(async (vendor) => {
            await updateDoc(doc(db, collectionStr, vendor.id), vendor);
        });
    } catch (error) {
        throw error;
    }
};


/* 7. ELIMINAR OBJETO */
export const onDelete = async paramId => {
    await deleteDoc(doc(db, collectionStr, paramId));
}

/* 9. ENCONTRAR OBJETO EN COLECCIÓN POR EMAIL */
export const onFindbyEmail = async (email) => {
    const result = await getDocs(query(collection(db, collectionStr), where("userEmail", "==", email)));
    return result.docs;
};

/* 10. ELIMINAR PRODUCTO DEL CARRITO */
export const onDeleteFromCart = async (cartCollectionName, paramId) => {
    try {
        await deleteDoc(doc(db, cartCollectionName, paramId));
    } catch (error) {
        console.error('Error al eliminar producto del carrito:', error);
    }
};

/* 11. LIMPIAR CARRITO */
export const onClearCart = async (cartCollectionName, email) => {
    const cartRef = collection(db, cartCollectionName);
    try {
        const querySnapshot = await getDocs(query(cartRef, where('userEmail', '==', email)));
        console.log(querySnapshot.docs);
        querySnapshot.docs.map(async (product) => {
            await deleteDoc(doc(db, cartCollectionName, product.id));
        });

    } catch (error) {
        console.error('Error al limpiar el carrito:', error);
        throw error;
    }
};

/* ***************************** ORDER METHODS ***************************** */

/* 12. INSERTAR ORDEN  */
export const onInsertOrder = async (obj) => {
    await addDoc(collection(db, 'OrderPlaced'), obj);
}


/* 13. OBTENER ORDEN POR ID CON MÚLTIPLES PRODUCTOS */
export const onFindOrderById = async (orderId) => {
    try {
        const orderCollectionRef = collection(db, collectionStr);
        const querySnapshot = await getDocs(query(orderCollectionRef, where('orderId', '==', orderId)));
        return querySnapshot.docs
    } catch (error) {
        console.error("Error al obtener la orden por ID:", error);
        throw error;
    }
};

/* 14. ENCONTRAR REVIEWS DEL PRODUCTO EN LA COLECCIÓN DE REVIEWS POR ID DEL PRODUCTO */
export const onFindProductinReviews = async (product_id) => {
    const result = await getDocs(query(collection(db, collectionStr), where("product_id", "==", product_id)));
    return result.docs;
};

/* 14. ENCONTRAR REVIEWS DEL PRODUCTO EN LA COLECCIÓN DE REVIEWS POR ID DEL PRODUCTO */
export const onFindVendorinReviews = async (vendor) => {
    const result = await getDocs(query(collection(db, collectionStr), where("vendor_name", "==", vendor)));
    return result.docs;
};