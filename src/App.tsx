import './App.css';
import { UserContext } from './lib/context';
import { useGetUser } from './hooks/useGetUser';
import { auth } from './lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect, useState } from 'react';
import Router from './Router';

function App() {
  const [user] = useAuthState(auth);
  const userdata = useGetUser(auth.currentUser?.uid)
  const [username, setUsername] = useState('')

  useEffect(()=>{
    setUsername(userdata?.username)
  },[userdata?.username])

  return (
    <UserContext.Provider value={{user, username}}>
      <Router/>
    </UserContext.Provider>
  );
}

export default App;
