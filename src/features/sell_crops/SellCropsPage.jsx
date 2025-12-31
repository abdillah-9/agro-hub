import React, { useContext, useEffect, useState } from 'react'
import Sort from '../../components/Sort'
import { IoAddCircleOutline } from 'react-icons/io5'
import Form from './Form'
import { AppContext } from '../../pages/MainApp'
import DeleteCard from './DeleteCard'
import { AuthContext } from '../../AuthProvider'
import OnSalesTable from './OnSalesTable'
import TransactionsTable from './TransactionsTable'

export default function SellCropsPage({calcWidth}) {
  const { sellCropsForm, setSellCropsForm, setShowOverlay, setSelectedFile } = useContext(AppContext);
  const {userData} = useContext(AuthContext);
  const {user_id} = userData;
  const [shownData, setShownData] = useState("onsale");
  const [crops_data, setCrops_data] = useState(false);
  const [formData, setFormData] = useState(null);
  const [activateRefresh, setActivateRefresh] = useState(false);

  useEffect( ()=>{
    async function fetchCropsSalesUploaded(){
      const formData = new FormData();
      formData.append('user_id', user_id);
      formData.append('status', shownData);
      try{
        const res = await fetch('http://localhost:4000/get_crops_sales',{
          method:"POST",
          body: formData,
        });

        if(res.ok){
          const data = await res.json();
          setCrops_data(data);
        }
        else{
          alert('cant fetch the crops uploaded');
        }
      }
      catch(e){
      alert("catched err "+e); 
      }
      finally{
        setActivateRefresh(false);
      }
    }
    fetchCropsSalesUploaded();
  },[shownData, activateRefresh]);

  return (
    <div className='midWhiteBody flex-Column-Grow h80vh'>
      <div className='flex-Row-Wrap midWhiteBody borderB paleWhiteBorder p3'>
        <div className='p10px link flex-Row gap4px centered' onClick={()=>setShownData("purchased")}
        style={shownData == "purchased"? {borderBottom:"4px solid rgb(120,120,120)",
        backgroundColor:"rgb(240,240,240)"} : {}}>
          Crops purchased 
          <span className='midGreenBody pureWhiteText p5_15px bRad20'>
            {crops_data?.sales_length?.purchase_length || 0}
          </span>
        </div>
        <div className='p10px link flex-Row gap4px centered' onClick={()=>setShownData("onsale")}
        style={shownData == "onsale"? {borderBottom:"4px solid rgb(120,120,120)",
        backgroundColor:"rgb(240,240,240)"} : {}}>
          Crops onsale 
          <span className='midGreenBody pureWhiteText p5_15px bRad20'>
            {crops_data?.sales_length?.onsale_length || 0}
          </span>
        </div>
        <div className='p10px link flex-Row gap4px centered' onClick={()=>setShownData("pending")}
        style={shownData == "pending"? {borderBottom:"4px solid rgb(120,120,120)",
        backgroundColor:"rgb(240,240,240)"} : {}}>
          Crops with pending transactions 
          <span className='midGreenBody pureWhiteText p5_15px bRad20'>
            {crops_data?.sales_length?.pending_length || 0}
          </span>
        </div>
      </div>
      <div className='flex-Row-Wrap-Gap spaceBetween midWhiteBody p10px p2'>
        <div className='flex-Row-Wrap centered pureBlackText gap4px bRad5 p10px paleOrangeBody hoverChangeSize link'
              onClick={()=>{setSellCropsForm(true); setShowOverlay(true); 
              setFormData(null); setSelectedFile(null);}}>
          <IoAddCircleOutline style={{fontSize:"16px", fontWeight:100}}/> 
          <span style={{fontSize:"13px",fontWeight:400}}>Upload crops to sell</span>
        </div>
        <Sort/>
      </div>
      <div className='flex-Row-Grow-Wrap-Gap pureWhiteBody p10px' style={{overflow:"auto", maxWidth: calcWidth}}>
        {
          crops_data?.onsale_crops ?  
          <OnSalesTable shownData={shownData} crops={crops_data.onsale_crops}
            activateRefresh={activateRefresh} setActivateRefresh={setActivateRefresh}
            formData={formData} setFormData={setFormData}/> 
            : 
            crops_data.purchased_crops ? <TransactionsTable shownData={shownData} crops={crops_data.purchased_crops}
            activateRefresh={activateRefresh} setActivateRefresh={setActivateRefresh} /> 
            :
            crops_data.pending_crops && <TransactionsTable shownData={shownData} crops={crops_data.pending_crops}
            activateRefresh={activateRefresh} setActivateRefresh={setActivateRefresh}/> 
            
        }
        <Form formData={formData} setFormData={setFormData} 
        activateRefresh={activateRefresh} setActivateRefresh={setActivateRefresh}/>
        <DeleteCard crops={crops_data} activateRefresh={activateRefresh} 
        setActivateRefresh={setActivateRefresh} shownData={shownData}/>
      </div>
    </div>
  )
}