import { collection,   onSnapshot, query } from "firebase/firestore"
import {  useEffect,  useRef,  useState } from "react"
import { auth, firestore } from "../lib/firebase"

export const useGetAllMessages = (id:string|undefined) =>{
    const [msgArray, setMsgArray] = useState<Array<any>>([])
    const prevMessagesRef = useRef<any>([])
    useEffect(()=>{
        prevMessagesRef.current = msgArray
        const chatRef1 = collection(firestore,`chats/${id}-X-${auth?.currentUser?.uid}/messages`)
        const chatRef2 = collection(firestore, `chats/${auth?.currentUser?.uid}-X-${id}/messages`)
        const q1 = query(chatRef1)
        const q2 = query(chatRef2)
        const unsub1 = onSnapshot(q1, (snapshot)=>{ 
            const messages = snapshot.docs.map(doc => doc.data())
            prevMessagesRef.current.length!==messages.length && setMsgArray(messages)
        })
        const unsub2 = onSnapshot(q2, (snapshot)=>{
            const messages = snapshot.docs.map(doc => doc.data())
            prevMessagesRef.current.length!==messages.length && setMsgArray(messages)
        }) 
        return unsub1
},[]) 
return msgArray
}