import { useState } from "react"
import { useEffect } from "react";

export default function MemoryGame() {
    const numberOfChildren = 6;
    const [cards, setCards] = useState(fisherYatesShuffle(addCards(numberOfChildren)));

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    const handleMoreSelected = (selectedCards) => {
        const idArray = [];
        selectedCards.forEach(card => {
            idArray.push(
                card.getAttribute('data-id')
            );
        });
        const same = (idArray[0] === idArray[1])
        switch (same) {
            case true: {
                selectedCards.forEach(card => {
                    card.setAttribute('data-solved', 'yes');
                    card.className = 'card-up';
                })
                break;
            }
            case false: {
                sleep(3000).then(() => {
                    selectedCards.forEach(card => {
                        if(card.getAttribute('data-solved') === 'no');
                        card.className = 'card-down';
                    })
                });
                break;
            }
        }
    }

    const handleSelected = () => {
        const selectedCards = document.querySelectorAll('.selected');
        if (selectedCards.length > 1) handleMoreSelected(selectedCards);
    }

        const hideCards = () => {
        cards.map((card) => {
            const selectedCard = document.getElementById(card.id);
            if (selectedCard.getAttribute('data-solved') === 'no') {
                selectedCard.className = 'card-down';
            }
        })
    }

    const refreshCards = () => {
            cards.map((card) => {
            const selectedCard = document.getElementById(card.id);
            selectedCard.className = (selectedCard.getAttribute('data-solved')) ? 'card-up' : 'card-down';
        })
    }



    const resetCards = () => {
        const oldCards = cards;
        setCards(fisherYatesShuffle(addCards(numberOfChildren)));
        const boardDiv = document.getElementById("card-container");
        const cardDivs = boardDiv.querySelectorAll('div');
        let i = 0
        cardDivs.forEach(cardDiv => {
            const card = cards[i];
            const oldCard = oldCards[i];
            cardDiv.className = 'card-down';
            cardDiv.setAttribute("key", card.id);
            cardDiv.setAttribute("id", card.id);
            cardDiv.setAttribute("data-id", card.data);
            cardDiv.setAttribute("data-solved", 'no');
            cardDiv.removeEventListener('click', oldCard.onClick);
            cardDiv.onClick = card.onClick;
            cardDiv.innerText = card.value;
            i++;
        })
    }

    const showCard = (id) => {
        const selectedCard = document.getElementById(id);
        if (selectedCard.getAttribute('data-solved') != 'yes'){
            selectedCard.className='card-up selected';
            handleSelected();
        }
    }

    const showResult= () => {
        cards.map((card) => {
            const selectedCard = document.getElementById(card.id);
            selectedCard.className = 'card-up';
            selectedCard.setAttribute("data-solved", 'yes');
        })
    }

    function addCards(num) {
        const array = [];

        for (let i=0; i < num; i++) {
            let ranA = Math.floor(Math.random() * 90 + 10);
            let ranB = Math.floor(Math.random() * 90 + 10);
            array.push({
                'id': String(i).padStart(3,0) + 'A',
                'data' : String(i).padStart(3,0),
                'value' : String(ranA) + ' + ' + String(ranB),
                'solved': false,
                'onClick': function() {showCard(String(i).padStart(3,0) + 'A')}
            });
            array.push({
                'id': String(i).padStart(3,0) + 'B',
                'data' : String(i).padStart(3,0),
                'value' : String(ranA + ranB),
                'solved': false,
                'onClick': function() {showCard(String(i).padStart(3,0) + 'B')}
            });
        }

        return array;
    }

    function fisherYatesShuffle(array) {

        // Iterate over the array in reverse order
        for (let i = array.length - 1; i > 0; i--) {

            // Generate Random Index
            const j = Math.floor(Math.random() * (i + 1));

            // Swap elements
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    return (
            <div>
                <button type="button" onClick={showResult}>Show result</button>

                <button type="button" onClick={resetCards}>Reset Cards</button>
                <div id= "card-container" className="card-container">
                    {
                        cards.map((card) => (
                            <div id={card.id} data-id={card.data} data-solved={'no'} className='card-down' key={card.id} onClick = {card.onClick}>
                                <p>
                                    {card.value}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
}
