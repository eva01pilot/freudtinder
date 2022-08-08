import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import { auth, firestore } from "../lib/firebase"

export const setMatch = (uid:string) =>{
    const authUser = doc(firestore, `users/${auth?.currentUser?.uid}`)
    const targetUser = doc(firestore, `users/${uid}`)
    updateDoc(authUser,{
        matches:arrayUnion(uid)
    })
    updateDoc(targetUser,{
        matches:arrayUnion(auth?.currentUser?.uid)
    })
    console.log(targetUser,authUser)

}