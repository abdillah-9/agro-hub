export default function Test(){
    const jaja = 'food';
    return(
        <div style={{
            backgroundColor:'white',
            padding:'20px',
            width:'100%',
            display:'grid',
            gap:'20px',
            gridTemplateColumns:'1fr 1fr 1fr' 
            }}>
            <div style={{boxShadow:'1px 1px 20px black', borderRadius:'10px',padding:'20px'}}>
                bonzo
            </div>
            <div style={{boxShadow:'1px 1px 20px black', borderRadius:'10px',padding:'20px'}}>
                ponzo
            </div>
            <div style={{boxShadow:'1px 1px 20px black', borderRadius:'10px',padding:'20px'}}>
                chozo
            </div>
        </div>
    )
}