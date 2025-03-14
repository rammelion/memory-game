import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRecycle } from "@fortawesome/free-solid-svg-icons";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faDivide } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react"
import Cookies from "js-cookie";

import Nav from '../semantics/Nav'

import CookieBar from "../resources/cookies/CookieBar";
import getLanguage from "../resources/Strings";
import FlagIcon from "../resources/FlagIcon";
import Numbers from "../resources/Numbers";



export default function MemoryGame({reFresh}) {

    useEffect(() => {
        reRender();
      }, [reFresh]);

    const [key, setKey] = useState(0);
    const reRender= () => {
        setKey(key + 1);
    }
    const Lang =(Cookies.get('la') != null) ? Cookies.get('la') : 'us';
    const Opt =(Cookies.get('op') != null) ? Cookies.get('op') : 'add';
    const getLanBar = (Cookies.get('la') != null) ? true : false;
    const getOPBar = (Cookies.get('op') != null) ? true : false;

    const numberOfChildren = 6;
    const [cards, setCards] = useState(shuffle(addCards(numberOfChildren)));

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    const switchLanguage = (language) => {
        //Cookies.remove('la');
        Cookies.set('la', language);
        reRender();
    }

    const switchOperation = (operation) => {
        Cookies.remove('op');
        Cookies.set('op', operation);
        window.location.reload(false);
    }

    const appStrings =  getLanguage(Lang);

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
                    card.className = 'card card-up solved';
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
                        card.className = 'card card-down';
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
                selectedCard.className='card card-up selected';
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
                selectedCard.className = 'card card-down';
            }
        })
    }*/

/*    const refreshCards = () => {
            cards.map((card) => {
            const selectedCard = document.getElementById(card.id);
            selectedCard.className = (selectedCard.getAttribute('data-solved')) ? 'card card-up' : 'card card-down';
        })
    }*/



    const resetCards = () => {
        const oldCards = cards;
        setCards(shuffle(addCards(numberOfChildren)));
        const boardDiv = document.getElementById("card-container");
        const cardDivs = boardDiv.querySelectorAll('div');
        let i = 0
        cardDivs.forEach(cardDiv => {
            const card = cards[i];
            const oldCard = oldCards[i];
            cardDiv.className = 'card card-down';
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
            selectedCard.className = 'card card-up';
            selectedCard.setAttribute("data-solved", 'yes');
        })
    }

    function addCards(num) {
        const array = [];
        console.log(Opt);
        const secondRandom = (Opt) => {
            switch (Opt){
                case 'add': {return Math.floor(Math.random() * 90 + 10);}
                case 'sub': {return Math.floor(Math.random() * 70 + 10);}
                case 'mul': {return Math.floor(Math.random() * 9 + 1);}
                case 'div': {return Math.floor(Math.random() * 9 + 1);}
                default: return 0;
            }
        }
        const firstRandom = (Opt, a) => {
            switch (Opt){
                case 'add': {return Math.floor(Math.random() * 90 + 10);}
                case 'sub': {return a + Math.floor(Math.random() * 70 + 10);}
                case 'mul': {return Math.floor(Math.random() * 990 + 10);}
                case 'div': {return a*Math.floor(Math.random() * 90 + 1);}
                default: return 0;
            }
        }
        const getResult = (a, b) => {
            switch (Opt){
                case 'add': {return (a + b);}
                case 'sub': {return (a - b);}
                case 'mul': {return (a * b);}
                case 'div': {return (a / b);}
                default: return 0;
            }
        }

        const getOpt = (Opt) => {
            switch (Opt){
                case 'add': {return '+'};
                case 'sub': {return '-'};
                case 'mul': {return '×'};
                case 'div': {return ':'};
                default: return '';
            }
        }

        for (let i=0; i < num; i++) {
            let ranB = secondRandom(Opt)
            let ranA = firstRandom(Opt, ranB);
            const result = getResult(ranA, ranB);
            array.push({
                'id': String(i).padStart(3,0) + 'A',
                'data' : String(i).padStart(3,0),
                'value1' : ranA,
                'value2': getOpt(Opt),
                'value3': ranB,
                'solved': false,
                'onClick': function() {showCard(String(i).padStart(3,0) + 'A')}
            });
            array.push({
                'id': String(i).padStart(3,0) + 'B',
                'data' : String(i).padStart(3,0),
                'value1': null,
                'value2' : String(result),
                'value3': null,
                'solved': false,
                'onClick': function() {showCard(String(i).padStart(3,0) + 'B')}
            });
        }

        return array;
    }

    function shuffle(array) {
        var m = array.length, t, i;

        // While there remain elements to shuffle…
        while (m) {

          // Pick a remaining element…
          i = Math.floor(Math.random() * m--);

          // And swap it with the current element.
          t = array[m];
          array[m] = array[i];
          array[i] = t;
        }

        return array;
      }

      const aNumber = 3;

    return (
            <>
                {(getLanBar)?
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
                </nav> : ''}
                {(getOPBar)?
                <nav id="action-selector" className="pt-3">
                    <span className="d-inline-block" tabIndex="0" data-bs-toggle="tooltip" title={appStrings.plusHint}>
                        <button type="button" className="operator active"><FontAwesomeIcon icon={faPlus} size="2x" onClick={() => {switchOperation("add")}} /></button>
                    </span>
                    <span className="d-inline-block" tabIndex="0" data-bs-toggle="tooltip" title={appStrings.minusHint}>
                        <button type="button" className="operator"><FontAwesomeIcon icon={faMinus} size="2x" onClick={() => {switchOperation("sub")}} /></button>
                    </span>
                    <span className="d-inline-block" tabIndex="0" data-bs-toggle="tooltip" title={appStrings.muliplicationHint}>
                        <button type="button" className="operator"><FontAwesomeIcon icon={faXmark} size="2x" onClick={() => {switchOperation("mul")}} /></button>
                    </span>
                    <span className="d-inline-block" tabIndex="0" data-bs-toggle="tooltip" title={appStrings.divisionHint}>
                        <button type="button" className="operator"><FontAwesomeIcon icon={faDivide} size="2x" onClick={() => {switchOperation("div")}} /></button>
                    </span>
                </nav>: ''}
                <nav id="action-selector" className="pt-5">
                    <span className="d-inline-block" tabIndex="0" data-bs-toggle="tooltip" title={appStrings.bulbHint}>
                        <button type="button" className="command" onClick={showResult}><FontAwesomeIcon icon={faLightbulb} size="2x" /></button>
                    </span>
                    <span className="d-inline-block" tabIndex="0" data-bs-toggle="tooltip" title={appStrings.restartHint}>
                        <button type="button" className="command" onClick={resetCards}><FontAwesomeIcon icon={faRecycle} size="2x" /></button>
                    </span>
                </nav>

                

                <main>
                    <Numbers number={aNumber} size='2x' />
                    <div id= "card-container" className="card-container">
                        {
                            cards.map((card) => (
                                <div id={card.id} data-id={card.data} data-solved={'no'} className='card card-down' key={card.id} onClick = {card.onClick}>
                                    <div className="container text-center">
                                        <div className="row align-items-center">
                                            {(card.value1)?
                                                <div classname="col">
                                                    <p>
                                                        {card.value1}
                                                    </p>
                                                </div>
                                            :''}
                                            <div className="col">
                                                <p>
                                                    {card.value2}
                                                </p>
                                            </div>
                                            {(card.value1)?
                                                <div>
                                                    <p>
                                                        {card.value3}
                                                    </p>
                                                </div>
                                            :''}
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div id="modal">
                        <div>
                            <div>
                                <p>{appStrings.praiseText}</p>
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
