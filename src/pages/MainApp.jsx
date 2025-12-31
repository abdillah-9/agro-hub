import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import TopNavBar from '../components/TopNavBar'
import SideNavBar from '../components/SideNavBar'
import MiniMainApp from '../components/MiniMainApp'
import Overlay from '../components/Overlay';
import { AuthContext } from '../AuthProvider';

//create Context here
export const AppContext = createContext();

function overlayReducer(init, final){
 return final;
}
export default function MainApp() {
  const {userData, setUserData} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  async function fetchCookie() {
    try {
      const res = await fetch('http://localhost:4000/get_user_from_cookie', {
        method: "POST",
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();
        setUserData(data);
      } else {
        console.log('cannot fetch cookie');
      }
    } catch (e) {
      console.log("Cookie fetch err: " + e);
    } finally {
      setLoading(false);
    }
  }

  fetchCookie();
}, []); 

  const [showSideBar, setshowSidebar] = useState(false);
  const [activeMenu,setActiveMenu] = useState("dashboard");
  const [showOverlay, setShowOverlay] = useReducer(overlayReducer,false); //I need state that do not cause rerender
  const [buyResourceForm, setBuyResourceForm] = useState(false);
  const [resourceMoreDetails, setResourceMoreDetails] = useState(false);
  const [buyCropsForm, setBuyCropsForm] = useState(false);
  const [sellResourceForm, setSellResourceForm] = useState(false);
  const [sellCropsForm, setSellCropsForm] = useState(false);
  const [searchItem, setSearchItem] = useState(false); 
  const [sortItem, setSortItem] = useState(false);
  const [deleteCard,setDeleteCard] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(false);
  const [rowToRemove, setRowToRemove] = useState(null);
  const [selectedFile, setSelectedFile] = useState(false);

  useEffect(()=>{
    if(window.innerWidth > 720){
      setshowSidebar(true)
    }
  },[])

  return (
    <AppContext.Provider value={
      {
        showSideBar, setshowSidebar, 
        showOverlay, setShowOverlay, 
        activeMenu, setActiveMenu,
        buyResourceForm, setBuyResourceForm,
        buyCropsForm, setBuyCropsForm,
        sellResourceForm, setSellResourceForm,
        sellCropsForm, setSellCropsForm,
        resourceMoreDetails, setResourceMoreDetails,
        searchItem, setSearchItem,
        sortItem, setSortItem,
        profilePhoto, setProfilePhoto,
        editProfile, setEditProfile,
        rowToRemove, setRowToRemove,
        selectedFile, setSelectedFile,
      }
      }>
      <div className='flex-Row-Grow-Wrap'>
        <TopNavBar/>
        <SideNavBar/>
        <Overlay/>
        <MiniMainApp/>
      </div>
    </AppContext.Provider>
  )
}
