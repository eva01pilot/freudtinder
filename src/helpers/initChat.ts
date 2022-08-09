import { collection, doc, setDoc } from "firebase/firestore"
import { auth, firestore } from "../lib/firebase"

export const initChat =(uid:string)=>{
    const chatsRef=doc(firestore, `chats/${auth?.currentUser?.uid}-X-${uid}`)
    setDoc(chatsRef,{
        users:[auth?.currentUser?.uid, uid]
    }
)
}