import React, { useContext} from 'react'
import { AppContext } from '../pages/MainApp'
import { SiTicktick } from 'react-icons/si';
import { FaRegCircleXmark } from 'react-icons/fa6';

export default function DeleteCard() {
  const {deleteCard, setDeleteCard, setShowOverlay} = useContext(AppContext);

  const deleteContainer={
    boxShadow:"1px 2px 25px rgb(10,10,10)",
    padding:"20px 15px",
    backgroundColor:"white",
    display:"flex",
    flexDirection:"column",
    gap:"17px",
    width:'calc(100vw - 15px)',
    maxWidth:"500px",
    position: "fixed",
    top: deleteCard ? "50%" : "100%",
    left: deleteCard ? "50%" : "40%",
    scale: deleteCard ? 1 : 0,
    opacity: deleteCard ? 1 : 0,
    transform: "translate(-50%, -50%)",
    transition: "all 0.5s ease",
    zIndex:3,
  }
  const button={
    border:"0px solid rgb(0,0,0)",
  }
  return (
    <div>
      {
        <div style={deleteContainer}>
          <div className='flex-Column gap7px centered' style={{textAlign:"center"}}>
            <span className='h4'>You are about to delete this row</span>
            <span style={{fontSize:"15px"}}>You can't undo this process</span>
          </div>
          <div className='flex-Row spaceBetween h3 gap10px'>
            <button onClick={()=>{setDeleteCard(false); setShowOverlay(false)}} 
              type='button' className='centered gap7px p1 p10px link' 
              style={{backgroundColor:"rgba(189, 54, 31, 0.36)",color:"darkred",...button}}> 
              <SiTicktick className='h4'/> Yes, Delete
            </button>
            <button onClick={()=>{setDeleteCard(false); setShowOverlay(false)}}
              type='button' className='centered gap7px p1 p10px link'
              style={{backgroundColor:"rgba(40, 153, 40, 0.35)",color:"darkgreen",...button}}> 
              <FaRegCircleXmark  className='h4'/> No, Cancel
            </button>
          </div>
        </div>
      }
    </div>
  )
}
