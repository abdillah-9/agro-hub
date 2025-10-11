import React, { createContext, useEffect, useState } from 'react'

const AuthContext = createContext();

export default function AuthProvider({children}) {
  const [userData, setUserData] = useState({user_id:null,user_role:null});

  useEffect(()=>{
    async function fetchCookie(){
        try{
          const res = await fetch('http://localhost:4000/get_user_from_cookie',{
            method:"POST",
            credentials: 'include',
          });

          if(res.ok){
            const data = await res.json();
            setUserData(data);
            console.log("userData: "+JSON.stringify(userData));
            console.log("data: "+JSON.stringify(data));
          }
          else{
            console.log('cannot fetch cookie');
          }

        }
        catch(e){
          console.log("Cookie fetch err: "+e);
        }
      };
      fetchCookie();
  },[]);


  return (
    <AuthContext value={userData}>
      {
        userData?.user_id != null ? children : <></> 
      }
    </AuthContext>
  )
}
