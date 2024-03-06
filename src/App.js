import './App.css';
import axios from 'axios';
import {useEffect, useState } from 'react';
import BingoCard from './BingoCard';

function App() {
  const url = 'http://www.hyeumine.com/getcard.php?bcode=8NRcsvwI';
  const winCheckUrl = 'http://www.hyeumine.com/checkwin.php';
  const let_colors = ['#B7C9F2', '#93ccb6', '#FFDD95', '#E6BAA3', '#d197b4'];
  const card_colors = ['#9195F6', '#5C8374', '#FF9843', '#D24545', '#85586F' ];
  const [cards, setCards] = useState([]);
  const [winner, setWinner] = useState('');
  const [color, setColor] = useState([]);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      cards.forEach((card) => {
        axios.get(`${winCheckUrl}?playcard_token=${card.card_token}`)
          .then((response) => {
            if (response.data === 1) {
              setWinner(`Card with token ${card.card_token} has won!`);
            } 
          })
          .catch((error) => {
            console.error('Error checking win status:', error);
          });
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, [cards]);

  const randomColor = () => {
    setColor(Math.floor(Math.random() * 5));
  }

  const handleNewCard = () => {
    randomColor();
    axios.get(url)
      .then((response) => {
        const newCard = {
          cardB: response.data.card.B,
          cardI: response.data.card.I,
          cardN: response.data.card.N,
          cardG: response.data.card.G,
          cardO: response.data.card.O,
          card_token: response.data.playcard_token,
          bg: card_colors[color],
          txt: let_colors[color],
        };
        setCards((prevCards) => [...prevCards, newCard]);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleClearCard = () => {
      setCards([]);
      setWinner('');
  }
  
  return (
    <div className="Con">
      <h3 style={{margin:"0"}}>Player's Cards</h3>
      <h4 style={{margin:"0"}}>Game Code: 8NRcsvwI</h4>
      <h5 style={{margin:"0",marginBottom:"20px", color:"green"}}>{winner}</h5>
      <div className="App">
        {cards.map((card, index) => (
          <BingoCard
            key={index}
            cardB={card.cardB}
            cardI={card.cardI}
            cardN={card.cardN}
            cardG={card.cardG}
            cardO={card.cardO}
            card_token={card.card_token}
            bg={card.bg}
            txt={card.txt}
          />
        ))}
      </div>
      <div style={{display:"flex"}}>
        <button className="btnNewCard" onClick={() => handleNewCard()}>New Card</button>
        <button className="btnClearCard" onClick={() => handleClearCard()}>Clear Cards</button>
        <button className="btnNewPlayer" onClick={() => window.open('http://localhost:3000', '_blank')}>New Player</button>
        <button className="btnNavigate" onClick={() => window.location.href = 'http://www.hyeumine.com/bingodashboard.php?bcode=1TTuguCu'}>Go to Bingo Dashboard</button>
      </div>
    </div>
  );
}

export default App;
