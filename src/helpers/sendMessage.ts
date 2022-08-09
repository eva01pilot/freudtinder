import {  collection,  doc, getDocs, query, setDoc } from "firebase/firestore"
import { auth, firestore } from "../lib/firebase"

export const sendMessage = async(uid:string, input:string) =>{
    const authed = auth?.currentUser?.uid
    const chatRef1 = collection(firestore,`chats/${uid}-X-${auth?.currentUser?.uid}/messages`)
    //const chatRef2 = collection(firestore,`chats/${auth?.currentUser?.uid}-X-${uid}/messages`)

    const q1 = query(chatRef1)
   

    //getDocs(q1).then((doc)=>{
    //    doc.empty ? null : 
    //})
    const docs1 = await getDocs(q1)
    if(!docs1.empty){
        setDoc(doc(firestore, `chats/${uid}-X-${auth?.currentUser?.uid}/messages/${new Date().getTime()}`), {
            sender:authed,
            text:input,
            createdAt: new Date().getTime()
        })
    } else {
        setDoc(doc(firestore, `chats/${auth?.currentUser?.uid}-X-${uid}/messages/${new Date().getTime()}`), {
            sender:authed,
            text:input,
            createdAt: new Date().getTime()
        })

    }
    
}