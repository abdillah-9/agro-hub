import React, { useContext } from 'react'
import { useWindowWidth } from '../hooks/useWindowWidth';
import { AppContext } from '../pages/MainApp';

export default function Overlay(){
    const {
        setShowOverlay, setshowSidebar, setBuyCropsForm, setBuyResourceForm,setDeleteCard,setProfilePhoto,
        setSellCropsForm, setSellResourceForm,setResourceMoreDetails, showOverlay, setEditProfile, 
    } = useContext(AppContext);

    const {scWidth} = useWindowWidth();
    let indexValue = 2;
    scWidth > 720 ? indexValue = 3 : indexValue = 2;
    const overlay={
        position:"fixed",
        height:"100vh",
        width:"100vw",
        top:0, 
        left:0,
        zIndex: indexValue,
    }
    function restoreAllStates(){
        setShowOverlay(false);
        scWidth < 720 ? setshowSidebar(false): "";
        setBuyCropsForm(false);
        setBuyResourceForm(false);
        setSellCropsForm(false);
        setSellResourceForm(false);
        setResourceMoreDetails(false);
        setDeleteCard(false);
        setEditProfile(false);
        setProfilePhoto(false);
    }

  return (
    <div>
        {
            showOverlay ? <div onClick={restoreAllStates} className='blur' style={overlay}></div> : ""
        }
    </div>
  )
}
