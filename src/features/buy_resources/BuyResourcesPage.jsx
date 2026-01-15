import React, { createContext, useContext, useEffect, useState } from 'react'
import Sort from '../../components/Sort'
import Search from '../../components/Search'
import Form from './Form';
import MoreDetails from './MoreDetails';
import OnSalesTable from './OnSalesTable';
import { AuthContext } from '../../AuthProvider';
import PurchasesTable from './PurchasesTable';

export const BuyResourcesContext = createContext();

export default function BuyResourcesPage({calcWidth}) {
  const [shownData, setShownData] = useState("onsale");
  const [resources_data, setResources_data] = useState(null);
  const [buy_resource_form, setBuy_resource_form] = useState(null);
  const [more_details, setMore_details] = useState(null);
  const {userData} = useContext(AuthContext);
  const {user_id} = userData;
  const [refresh, setRefresh] = useState(false);

  //fetch data from Resources_sales table
  useEffect(()=>{
    async function fetchFromResourcesTable(){
      try{
        //form formData
        const formDataBody = new FormData();
        formDataBody.append('status',shownData);
        formDataBody.append('user_id',user_id);

        const res = await fetch('https://agrohub-backend.onrender.com/get_resources_purchases',{
          method:"POST",
          body:formDataBody
        });

        if(res.ok){
          const data = await res.json();
          setResources_data(data);
          console.log(data);
        }
        else{
          console.log('failed to fetch Resources sales');
        }
      }
      catch(e){
        console.log("catched error: "+e);
      }
    }
    fetchFromResourcesTable();
  },[shownData, refresh]);

  console.log("resource_data "+JSON.stringify(resources_data));
  return (
    <BuyResourcesContext value={{buy_resource_form, setBuy_resource_form, more_details, setMore_details}}>
     <div className='midWhiteBody flex-Column-Grow h80vh' style={{width:'100%'}}>
        <div className='flex-Row-Wrap midWhiteBody borderB paleWhiteBorder p3'>
          <div className='p10px link flex-Row gap4px centered' onClick={()=>setShownData("purchased")}
          style={shownData == "purchased"? {borderBottom:"4px solid rgb(120,120,120)",
          backgroundColor:"rgb(240,240,240)"} : {}}>
            Purchased products 
            <span className='midGreenBody pureWhiteText p5_15px bRad20'>
              {
                resources_data?.resources_length?.purchase_length || 0           
              }
            </span>
          </div>
          <div className='p10px link flex-Row gap4px centered' onClick={()=>setShownData("onsale")}
          style={shownData == "onsale"? {borderBottom:"4px solid rgb(120,120,120)",
          backgroundColor:"rgb(240,240,240)"} : {}}>
            Onsale products 
            <span className='midGreenBody pureWhiteText p5_15px bRad20'>
              {
                resources_data?.resources_length?.onsale_length || 0        
              }
            </span>
          </div>
          <div className='p10px link flex-Row gap4px centered' onClick={()=>setShownData("pending")}
          style={shownData == "pending"? {borderBottom:"4px solid rgb(120,120,120)",
          backgroundColor:"rgb(240,240,240)"} : {}}>
            Pending products 
            <span className='midGreenBody pureWhiteText p5_15px bRad20'>
              {                
                resources_data?.resources_length?.pending_length || 0            
              }
            </span>
          </div>
        </div>
        <div className='flex-Row-Wrap-Gap spaceBetween midWhiteBody p10px p2'>
          <Search/>
          <Sort/>
        </div>
        <div className='flex-Row-Grow-Wrap-Gap pureWhiteBody p10px' 
          style={{ overflow:"auto", maxWidth: calcWidth, minHeight:"400px" }}>
          <OnSalesTable shownData={shownData} resources={resources_data}/>
          <PurchasesTable shownData={shownData} resources={resources_data}/>
          <Form resources={resources_data} setRefresh={setRefresh} refresh={refresh}/>
          <MoreDetails/>
        </div>
      </div>    
    </BuyResourcesContext>
  )
}