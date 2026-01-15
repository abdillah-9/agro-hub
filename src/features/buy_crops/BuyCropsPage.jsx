import React, { createContext, useContext, useEffect, useState } from 'react'
import Sort from '../../components/Sort'
import Search from '../../components/Search'
import Form from './Form';
import MoreDetails from './MoreDetails';
import OnSalesTable from './OnSalesTable';
import { AuthContext } from '../../AuthProvider';
import PurchasesTable from './PurchasesTable';

export const HandleBuyCropsFormContext = createContext();

export default function BuyCropsPage({calcWidth}) {
  const [shownData, setShownData] = useState("onsale");
  const [crops_transactions, setCrops_transactions] = useState(null);
  const [buy_crop_form, setBuy_crop_form] = useState(null);
  const [more_details, setMore_details] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const {userData} = useContext(AuthContext);
  const {user_id} = userData;

  //fetch data from crops_sales table
  useEffect(()=>{
    async function fetchFromCropsTable(){
      try{
        //form formData
        const formData = new FormData();
        formData.append('status',shownData);
        formData.append('user_id',user_id);

        const res = await fetch('https://agrohub-backend.onrender.com/get_crops_purchases',{
          method:"POST",
          body:formData
        });

        if(res.ok){
          const data = await res.json();
          setCrops_transactions(data);
          console.log(data.message);
        }
        else{
          console.log('failed to fetch crops sales');
        }
      }
      catch(e){
        console.log("catched error: "+e);
      }
    }
    fetchFromCropsTable();
  },[shownData, refresh]);

  return (
    <HandleBuyCropsFormContext value={{buy_crop_form, setBuy_crop_form, more_details, setMore_details}}>
      <div className='midWhiteBody flex-Column-Grow h80vh' style={{width:'100%'}}>
        <div className='flex-Row-Wrap midWhiteBody borderB paleWhiteBorder p3'>
          <div className='p10px link flex-Row gap4px centered' onClick={()=>setShownData("purchased")}
          style={shownData == "purchased"? {borderBottom:"4px solid rgb(120,120,120)",
          backgroundColor:"rgb(240,240,240)"} : {}}>
            Crops purchased 
            <span className='midGreenBody pureWhiteText p5_15px bRad20'>
              {
                crops_transactions?.sales_length?.purchase_length  || 0           
              }
            </span>
          </div>
          <div className='p10px link flex-Row gap4px centered' onClick={()=>setShownData("onsale")}
          style={shownData == "onsale"? {borderBottom:"4px solid rgb(120,120,120)",
          backgroundColor:"rgb(240,240,240)"} : {}}>
            Crops onsale 
            <span className='midGreenBody pureWhiteText p5_15px bRad20'>
              {
                crops_transactions?.sales_length?.onsale_length || 0           
              }
            </span>
          </div>
          <div className='p10px link flex-Row gap4px centered' onClick={()=>setShownData("pending")}
          style={shownData == "pending"? {borderBottom:"4px solid rgb(120,120,120)",
          backgroundColor:"rgb(240,240,240)"} : {}}>
            Crops pending purchase 
            <span className='midGreenBody pureWhiteText p5_15px bRad20'>
              {
                crops_transactions?.sales_length?.pending_length || 0             
              }
            </span>
          </div>
        </div>
        <div className='flex-Row-Wrap-Gap spaceBetween midWhiteBody p10px p2'>
          <Search/>
          <Sort/>
        </div>
        <div className='flex-Row-Grow-Wrap-Gap pureWhiteBody p10px' 
          style={{overflow:"auto", maxWidth: calcWidth, minHeight:"400px"}}>
          <OnSalesTable shownData={shownData} crops={crops_transactions}/>
          <PurchasesTable shownData={shownData} crops={crops_transactions}/>
          <Form crops_transactions={crops_transactions} setRefresh={setRefresh}/>
          <MoreDetails/>
        </div>
      </div>
    </HandleBuyCropsFormContext>
  )
}
