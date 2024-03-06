function BingoCard({cardB, cardI, cardN, cardG, cardO, card_token,bg, txt}) {
    return (
        <div className="cardsContainer" style={{backgroundColor:bg}}>
            <h6 style={{margin:"0"}}>Card Token</h6>
            <h6 style={{margin:"0"}}>{card_token}</h6>
            <div className="Card">
                
                <button style={{backgroundColor:txt}}>B</button>
                {cardB.map((value, index) => (
                    <button key={index}>{value}</button>
                ))}
            
                <button style={{backgroundColor:txt}}>I</button>
                {cardI.map((value, index) => (
                    <button key={index}>{value}</button>
                ))}

                <button style={{backgroundColor:txt}}>N</button>
                {cardN.map((value, index) => (
                    <button key={index}>{value}</button>
                ))}

                <button style={{backgroundColor:txt}}>G</button>
                {cardG.map((value, index) => (
                    <button key={index}>{value}</button>
                ))}

                <button style={{backgroundColor:txt}}>O</button>
                {cardO.map((value, index) => (
                    <button key={index}>{value}</button>
                ))}
            </div>
        </div>
    );
  }
  
export default BingoCard;