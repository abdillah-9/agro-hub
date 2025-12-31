import React, { createContext, useEffect, useState } from 'react'
import LoadingSpinner from './components/LoadingSpinner';

export const AuthContext = createContext();

export default function AuthProvider({children}) {
  const [userData, setUserData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [refetchAuthContext, setRefetchAuthContext] = useState(false);

  useEffect(()=>{
    async function fetchCookie(){
        try{
          const res = await fetch('http://localhost:4000/get_user_from_cookie',{
            method:"POST",
            credentials: 'include',
          });

          if(res.ok){
            const data = await res.json();
            console.log('user_data '+userData);
            setUserData(data);
            console.log(userData);
          }
          else{
            console.log('cannot fetch cookie');
          }
        }
        catch(e){
          console.log("Cookie fetch err: "+e);
        }
        finally{
        setLoading(false);
      }
      };
      fetchCookie();
  },[refetchAuthContext]);

  if(loading || userData === undefined){
    return <LoadingSpinner/>
  }

  return (
    <AuthContext.Provider value={{userData, setUserData, refetchAuthContext, setRefetchAuthContext}}>
      { 
        children
      }
    </AuthContext.Provider>
  )
}
