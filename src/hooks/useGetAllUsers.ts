import { collection,  getDocs, query, where } from "firebase/firestore"
import { useCallback, useEffect, useState } from "react"
import { firestore } from "../lib/firebase"

export const useGetAllUsers = (id:string|undefined) =>{
    const [userArray, setUserArray] = useState<Array<any>>([])
    useEffect(()=>{
        const getUsers = async() => {
            const ref=collection(firestore, 'users')
            const q = query(ref, where('uid','!=',id))
            const querySnapshot = await getDocs(q);
            const users = querySnapshot.docs.filter(doc=>doc.data().matches.indexOf(id)===-1).map((doc)=>{
                return doc.data()
            })
            setUserArray(users)
        }
        getUsers()
        

},[id])
const updateUserArray = useCallback((userArray:any)=>setUserArray(userArray),[])
return {userArray, updateUserArray}
}

    
