import { collection,   doc,   getDoc,   onSnapshot, query, where } from "firebase/firestore"
import {  useEffect, useState } from "react"
import { auth, firestore } from "../lib/firebase"

export const useGetAllChats = () =>{
    const [chatsArray, setChatsArray] = useState<Array<any>>([])

    useEffect(()=>{
        const ref=collection(firestore, 'chats')
        const q = query(ref, where('users','array-contains', auth?.currentUser?.uid))
        const unsub = onSnapshot(q, (snapshot)=>{            
            const chats = snapshot.docs.map(doc => doc.data().users)
            let uid:Array<string>=[]
            chats.forEach((chat:any) => {
                chat.forEach((ch:any)=>{
                    ch!==auth?.currentUser?.uid && uid.push(ch)
                })
                
            });
            uid && console.log(uid)
            let users:Array<any>=[]
            uid && uid.forEach((uid)=>{
                const tref=doc(firestore, `users/${uid}`)
                getDoc(tref).then((doc)=>{
                    console.log(doc.data())
                    users.push(doc.data())
                })
            })
            console.log(users)
            setChatsArray(users)
        })

        
        return unsub
},[]) 
return {chatsArray}
}