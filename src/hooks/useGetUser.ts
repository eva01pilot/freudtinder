import { doc, getDoc } from "firebase/firestore"
import { useCallback, useEffect, useState } from "react"
import { firestore } from "../lib/firebase"


export const useGetUser = (id:string|undefined) =>{
    const [userr,setUser] = useState<any>({})

    useEffect(()=>{
        const userRef = doc(firestore, `users/${id}`)
        const getUser = async()=>{
            const userData = await getDoc(userRef)
            return userData.data()
        }
        getUser().then(user=>setUser(user))
        
    },[id])
    const updateUser = useCallback((user:any)=>setUser(user),[])
    return {userr, updateUser}
}


    
