import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faRecycle } from "@fortawesome/free-solid-svg-icons"; 
import { faLightbulb } from "@fortawesome/free-solid-svg-icons"; 
import { faPlus } from "@fortawesome/free-solid-svg-icons"; 
import { faMinus } from "@fortawesome/free-solid-svg-icons"; 
import { faXmark } from "@fortawesome/free-solid-svg-icons"; 
import { faDivide } from "@fortawesome/free-solid-svg-icons"; 
import { useState } from "react"
//import { useReducer } from "react";

import Nav from '../semantics/Nav'

import CookieBar from "../resources/cookies/CookieBar";
import getLanguage from "../resources/Strings";
import FlagIcon from "../resources/FlagIcon";



export default function MemoryGame() {
    const numberOfChildren = 6;
    const [cards, setCards] = useState(fisherYatesShuffle(addCards(numberOfChildren)));

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    const switchLanguage = (language) => {
        const appStrings = getLanguage(language);
        console.log(appStrings);
    }

    const appStrings =  getLanguage('en');

    const openModal = () => {
        const modal = document.getElementById('modal');
        modal.style.display="flex";
    }

    const closeModal = () => {
        const modal = document.getElementById('modal');
        modal.style.display="none";
    }

    const numberOfSelected = () => {
        const selectedCards = document.querySelectorAll('.selected');
        return selectedCards.length;
    }

    const numberOfSolved = () => {
        const selectedCards = document.querySelectorAll('.solved');
        return selectedCards.length;
    }

    const getSelected = () => {
        return document.querySelectorAll('.selected');
    }

    const handleSelected = (selectedCards) => {
        const idArray = [];
        selectedCards.forEach(card => {
            console.log(card.getAttribute('data-id'))
            idArray.push(
                card.getAttribute('data-id')
            );
        });
        const same = (idArray[0] === idArray[1])
        switch (same) {
            case true: {
                selectedCards.forEach(card => {
                    card.setAttribute('data-solved', 'yes');
                    card.className = 'card-up solved';
                })
                if (numberOfSolved() === (numberOfChildren*2)){
                    openModal();
                }
                break;
            }
            case false: {
                sleep(1000).then(() => {
                    selectedCards.forEach(card => {
                        if(card.getAttribute('data-solved') === 'no');
                        card.className = 'card-down';
                    })
                });
                break;
            }
        }
    }


    const showCard = (id) => {
        if (numberOfSelected() < 2) {
            const selectedCard = document.getElementById(id);
            if (selectedCard.getAttribute('data-solved') != 'yes'){
                selectedCard.className='card-up selected';
            }
        }
        if (numberOfSelected() > 1) {
            handleSelected(getSelected());
        }
    }

/*  const hideCards = () => {
        cards.map((card) => {
            const selectedCard = document.getElementById(card.id);
            if (selectedCard.getAttribute('data-solved') === 'no') {
                selectedCard.className = 'card-down';
            }
        })
    }*/

/*    const refreshCards = () => {
            cards.map((card) => {
            const selectedCard = document.getElementById(card.id);
            selectedCard.className = (selectedCard.getAttribute('data-solved')) ? 'card-up' : 'card-down';
        })
    }*/



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
            <>
                <nav id="language-selector" className="pt-5">
                    <span className="d-inline-block" tabIndex="0" data-bs-toggle="tooltip" title={appStrings.flagHUHint}>
                        <button type="button" id="hu" className="flag" onClick={() => {switchLanguage('hu')}} >
                            <FlagIcon country="HU" />
                        </button>
                    </span>
                    <span className="d-inline-block" tabIndex="0" data-bs-toggle="tooltip" title={appStrings.flagUSHint}>
                        <button type="button" language="en" className="flag" onClick={() => {switchLanguage("us")}} >
                            <FlagIcon country="US" />
                        </button>
                    </span>
                </nav>
                <nav id="action-selector" className="pt-3">
                    <span className="d-inline-block" tabIndex="0" data-bs-toggle="tooltip" title={appStrings.plusHint}>
                        <button type="button" className="operator active"><FontAwesomeIcon icon={faPlus} size="2x" /></button>
                    </span>
                    <span className="d-inline-block" tabIndex="0" data-bs-toggle="tooltip" title={appStrings.minusHint}>
                        <button type="button" className="operator"><FontAwesomeIcon icon={faMinus} size="2x" /></button>
                    </span>
                    <span className="d-inline-block" tabIndex="0" data-bs-toggle="tooltip" title={appStrings.muliplicationHint}>
                        <button type="button" className="operator"><FontAwesomeIcon icon={faXmark} size="2x" /></button>
                    </span>
                    <span className="d-inline-block" tabIndex="0" data-bs-toggle="tooltip" title={appStrings.divisionHint}>
                        <button type="button" className="operator"><FontAwesomeIcon icon={faDivide} size="2x" /></button>
                    </span>
                </nav>
                <nav id="action-selector" className="pt-5">
                    <span className="d-inline-block" tabIndex="0" data-bs-toggle="tooltip" title={appStrings.bulbHint}>
                        <button type="button" className="command" onClick={showResult}><FontAwesomeIcon icon={faLightbulb} size="2x" /></button>
                    </span>
                    <span className="d-inline-block" tabIndex="0" data-bs-toggle="tooltip" title={appStrings.restartHint}>
                        <button type="button" className="command" onClick={resetCards}><FontAwesomeIcon icon={faRecycle} size="2x" /></button>
                    </span>
                </nav>
                
                <main>
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
                    <div id="modal">
                        <div>
                            <div>
                                <p>Excellent!</p>
                            </div>
                            <div>
                            <button className="button rounded-2" type="button" onClick={closeModal}>OK</button>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        )
}
