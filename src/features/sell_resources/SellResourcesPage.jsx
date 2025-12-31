import React, { useContext, useEffect, useState } from 'react'
import Table from './Purchase_Pending_Table'
import Sort from '../../components/Sort'
import { IoAddCircleOutline } from 'react-icons/io5'
import Form from './Form'
import { AppContext } from '../../pages/MainApp'
import DeleteCard from './DeleteCard'
import { AuthContext } from '../../AuthProvider'
import Sells_Table from './Sells_Table'
import Purchase_Pending_Table from './Purchase_Pending_Table'
import LoadingSpinner from '../../components/LoadingSpinner'

export default function SellResourcesPage({calcWidth}) {
  const { sellResourceForm, setSellResourceForm, setShowOverlay } = useContext(AppContext);
  const {userData} = useContext(AuthContext);
  const {user_id} = userData;
  const [shownData, setShownData] = useState("onsale");
  const [loading, setLoading] = useState(true);
  const [resources_data, setResources_data] = useState(null);
  const [formData, setFormData] = useState(null);
  const [deleteCard, setDeleteCard] = useState(false);
  const [refresh, setRefresh] = useState(false);

  console.log('Resources_data '+JSON.stringify(resources_data));

    //create formData
    const formDataResources = new FormData();
    formDataResources.append('status', shownData);
    formDataResources.append('user_id', user_id);

    useEffect(()=>{
      async function fetchResources(){
        try{
          const res = await fetch('http://localhost:4000/get_resources_sales', {
            method: "POST",
            body: formDataResources,
          });

          if(res.ok){
            const data = await res.json();
            console.log('received resources :'+console.log(data));
            setResources_data(data);
          }
        }
        catch(err){
          alert("Catched err is "+err);
        }
        finally{
          setLoading(false);
        }
      }
      fetchResources();
    }, [shownData, refresh]);

  return (
    <div className='midWhiteBody flex-Column-Grow h80vh'>
      <div className='flex-Row-Wrap midWhiteBody borderB paleWhiteBorder p3'>
        <div className='p10px link flex-Row gap4px centered' onClick={()=>setShownData("purchased")}
        style={shownData == "purchased"? {borderBottom:"4px solid rgb(120,120,120)",
        backgroundColor:"rgb(240,240,240)"} : {}}>
          Resources purchased 
          <span className='midGreenBody pureWhiteText p5_15px bRad20'>
            {
              resources_data?.resources_length?.purchased_length || 0
            }
          </span>
        </div>
        <div className='p10px link flex-Row gap4px centered' onClick={()=>setShownData("onsale")}
        style={shownData == "onsale"? {borderBottom:"4px solid rgb(120,120,120)",
        backgroundColor:"rgb(240,240,240)"} : {}}>
          Resources onsale 
          <span className='midGreenBody pureWhiteText p5_15px bRad20'>
            {
              resources_data?.resources_length?.onsale_length || 0
            }
          </span>
        </div>
        <div className='p10px link flex-Row gap4px centered' onClick={()=>setShownData("pending")}
        style={shownData == "pending"? {borderBottom:"4px solid rgb(120,120,120)",
        backgroundColor:"rgb(240,240,240)"} : {}}>
          Resources pending 
          <span className='midGreenBody pureWhiteText p5_15px bRad20'>
            {
              resources_data?.resources_length?.pending_length || 0
            }
          </span>
        </div>
      </div>
      <div className='flex-Row-Wrap-Gap spaceBetween midWhiteBody p10px p2'>
        <div className='flex-Row-Wrap centered pureBlackText gap4px bRad5 p10px paleOrangeBody hoverChangeSize link'
              onClick={()=>{setSellResourceForm(true); setShowOverlay(true); setFormData(null)}}>
          <IoAddCircleOutline style={{fontSize:"16px", fontWeight:100}}/> 
          <span style={{fontSize:"13px",fontWeight:400}}>Upload Resources to sell</span>
        </div>
        <Sort/>
      </div>
      <div className='flex-Row-Grow-Wrap-Gap pureWhiteBody p10px' style={{overflow:"auto", maxWidth: calcWidth}}>
        {
          loading == true ? <LoadingSpinner/> :
          shownData == 'onsale' ? <Sells_Table resources={resources_data.resources} shownData={shownData} 
            formData={formData} setFormData={setFormData} deleteCard={deleteCard} setDeleteCard={setDeleteCard}
          /> : 
          shownData == "pending" ? <Purchase_Pending_Table resources={resources_data.resources} 
            formData={formData} setFormData={setFormData} deleteCard={deleteCard} setDeleteCard={setDeleteCard}
          /> :
          <Purchase_Pending_Table resources={resources_data.resources} formData={formData} 
            setFormData={setFormData} deleteCard={deleteCard} setDeleteCard={setDeleteCard}
          />
        }
        <Form formData={formData} setFormData={setFormData} refresh={refresh} setRefresh={setRefresh}
          loading={loading} setLoading={setLoading} setResources_data={setResources_data}
        />
        <DeleteCard shownData={shownData} resources={resources_data} loading={loading} setLoading={setLoading}
          deleteCard={deleteCard} setDeleteCard={setDeleteCard} setRefresh={setRefresh} refresh={refresh}
        />
      </div>
    </div>
  )
}