import './App.css';
import { UserContext } from './lib/context';
import { auth, firestore } from './lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect, useLayoutEffect, useState } from 'react';
import Router from './Router';
import { doc, onSnapshot } from 'firebase/firestore';

function App() {
  const [user]:any = useAuthState(auth)
  const [username, setUsername]:any = useState(null)
  useLayoutEffect(()=>{
    let unsubscribe
    if (user){
      const ref = doc(firestore, `users/${auth?.currentUser?.uid}`)
      unsubscribe =  onSnapshot(ref,(doc)=>{
        setUsername(doc.data()?.username)
      })
    } else {
      setUsername(null)
    }
    return unsubscribe
  },[user])


  return (
    <UserContext.Provider value={{user:user, username:username}} >
      <Router/>
    </UserContext.Provider>
  );
}

export default App;
