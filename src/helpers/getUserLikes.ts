import { doc, getDoc } from "firebase/firestore"
import { firestore } from "../lib/firebase"

export const getUserLikes = async(id:string|undefined) =>{
    const userRef = doc(firestore, `users/${id}`)
    const userData = await getDoc(userRef)
    const userlikes = userData?.data()
    return userlikes
}