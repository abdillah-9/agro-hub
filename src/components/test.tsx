export default function Test(){
    const jaja = 'food';
    return(
        <div style={{
            backgroundColor:'white',
            padding:'20px',
            width:'100%',
            display:'grid',
            gap:'20px',
            gridTemplateColumns:'1fr 1fr' 
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

            <div style={{
  display: 'grid',
  gridTemplateColumns: '1fr 2fr 1fr',
  gridTemplateRows: '100px 200px',
  gap: '10px',
}}>
  <div style={{ background: 'red' }}>1</div>
  <div style={{ background: 'blue', gridRow: 'span 2' }}>2 (tall)</div>
  <div style={{ background: 'green' }}>3</div>
  <div style={{ background: 'orange' }}>4</div>
</div>

        </div>
    )
}