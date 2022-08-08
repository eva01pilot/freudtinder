import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import { auth, firestore } from "../lib/firebase"

export const setLikes = (uid:string) =>{
    const authUser = doc(firestore, `users/${auth?.currentUser?.uid}`)
    updateDoc(authUser,{
        likes:arrayUnion(uid)
    })
}