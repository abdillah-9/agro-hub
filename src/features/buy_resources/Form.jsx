import React, { useContext, useState } from 'react'
import { AppContext } from '../../pages/MainApp';
import { AuthContext } from '../../AuthProvider';
import { BuyResourcesContext } from './BuyResourcesPage';

export default function Form({resources, setRefresh}) {
  const {buyResourceForm, setShowOverlay, setBuyResourceForm} = useContext(AppContext);
  const {userData} = useContext(AuthContext);
  const {user_id} = userData;
  const {buy_resource_form, setBuy_resource_form} = useContext(BuyResourcesContext);
  const [resource_ordered,setResource_ordered] = useState(0);

  const calcHeight = buyResourceForm ? "100vh" : "0vh";
  console.log('resources transactions '+JSON.stringify(resources));

  if(!resources || !buy_resource_form){
    return
  }
  const inputs = buy_resource_form;

  inputs.created_at = new Date(inputs?.created_at).toLocaleDateString('en-Us',{
    day:'2-digit',
    month:'short',
    year:'numeric'
  });

  const formBody={
      zIndex:3,
      fontSize:"14px",
      overflow:"auto",
      position:"fixed",
      top:buyResourceForm ? 0: "-100vh",
      right: 0,
      opacity:buyResourceForm ? 1: 1,
      padding:"15px",
      boxShadow:"1px 2px 15px rgb(20,20,20)",
      backgroundColor:"white",
      maxWidth:"300px",
      width:"100vw",
      height: calcHeight,
      transition: "all 0.5s ease",
      display:"flex",
      flexDirection:"column",
      gap:"15px",
  }

  async function purchaseresource(e){
    try{
      e.preventDefault();

      //formulate formData
      const form = e.target;
      const formData = new FormData(form);
      formData.append('price_per_minimum_sellable_quantity',inputs?.price_per_minimum_sellable_quantity);
      
      const res = await fetch('http://localhost:4000/make_resources_order',{
        method:"POST",
        body:formData
      });

      if(res.ok){
        const data = await res.json();
        console.log("make resource order: "+data);
        alert(data.message);
        setRefresh((prev)=>!prev);
        restoration();
      }
      else{
        alert("Shiiit")
        console.log('cant insert resource order');
      }
    }
    catch(e){
      console.log('Error during making resource order: '+e);
    }
  }

  function restoration(){
    setShowOverlay(false);
    setBuyResourceForm(false);
  }
     function restoration(){
    setShowOverlay(false);
    setBuyResourceForm(false);
    setFormData(null);
    setSelectedFile(false);
  }

  return (
    <form onSubmit={purchaseresource} style={formBody}>
      <div>        
        <img src={"aa"} height={100} width={"100%"}/>
      </div>
      <div style={{...purchaseInputs,  borderBottom: "1px solid rgb(180,180,180)",paddingBottom:"15px"}}>
        <label style={detail}>Set quantity</label>
        <input type="number" step={inputs?.minimum_sellable_quantity} 
          onInput={(e)=>{setResource_ordered(e.target.value)}} style={{...detail2, cursor:"pointer"}}
          min={inputs?.minimum_sellable_quantity} max={inputs?.total_quantity}
          value={resource_ordered} name='ordered_resource_quantity' 
        />
        <label style={detail}>Expected cost</label>
        <span style={{...detail2, cursor:"not-allowed"}}>
          {inputs?.price_per_minimum_sellable_quantity * (resource_ordered/inputs?.minimum_sellable_quantity)}
        </span>    
        <input type='number' name='paid_amount' style={{display:'none'}} readOnly
          value={inputs?.price_per_minimum_sellable_quantity * (resource_ordered/inputs?.minimum_sellable_quantity)} 
        />
        <input type='text' name='public_id' 
          defaultValue={Math.random()+"_"+user_id} style={{display:'none'}}/>
        <input type='text' name='buyer_id' defaultValue={user_id} style={{display:'none'}}/>
        <input type='text' name='status' defaultValue={"pending"} style={{display:'none'}}/>
        <input type='text' name='purchase_receipt' defaultValue={"N/A"} style={{display:'none'}}/>
        <input type='text' name='ordered_resource_id' defaultValue={inputs?.ordered_resource_id} style={{display:'none'}}/>
        <input type='number' name='total_quantity' defaultValue={inputs?.total_quantity} style={{display:'none'}}/>              
      </div>
      <div style={{...purchaseInputs, ...buttons}}>
        <span style={cancel} onClick={restoration}>Cancel</span>
        <input type='submit' name='submit' value="Purchase" className='pureGreenBody pureWhiteText' style={purchase}/>
      </div>
      <div className='flex-Row-Wrap gap7px'
      style={{...purchaseInputs,  borderBottom: "1px solid rgb(180,180,180)",paddingBottom:"15px"}}>
        <span style={detail}>Date posted</span> 
        <span style={detail2}>{inputs?.created_at}</span>
        <span style={detail}>resource name</span> 
        <span style={detail2}>{inputs?.resource_name}</span> 
        <span style={detail}>Available</span> 
        <span style={detail2}>{Number(inputs?.total_quantity)}</span>
        <span style={detail}>Price per minimum sellable unit</span> 
        <span style={detail2}>{Number(inputs?.price_per_minimum_sellable_quantity)}</span>
        <span style={detail}>Unit</span> 
        <span style={detail2}>{inputs?.unit}</span>
        <span style={detail}>Seller</span> 
        <span style={detail2}>{inputs?.fname+" "+inputs?.lname}</span>
        <span style={detail}>Location</span> 
        <span style={detail2}>{inputs?.user_location}</span>
      </div>
    </form>
  )
}

const detail={
  width:"100px",
}
const detail2={
  width:"120px",
  padding:"5px",
  border:"1px solid rgb(150,150,150)",
  borderRadius:"5px",
  textAlign:"center",
  cursor:"not-allowed"
}
const cancel={
  backgroundColor:"rgb(177, 10, 10)",
  color:"white",
  padding:"10px",
  borderRadius:"5px",
  cursor:"pointer",
  fontWeight:500,
}
const purchase={
  border:"0px solid black",
  borderRadius:"5px",
  cursor:"pointer",
  backgroundColor:"rgb()",
  fontWeight:500,
  padding:"10px",
}
const purchaseInputs={
  display:"flex",
  gap:"10px",
  flexWrap:'wrap'
}
const buttons={
  gap:"20px",
  borderBottom: "1px solid rgb(180,180,180)",
  padding:"0px 0px 15px 0px",
}