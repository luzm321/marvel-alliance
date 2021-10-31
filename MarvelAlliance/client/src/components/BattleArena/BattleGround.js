import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import { getCardsByDeckId } from "../../modules/cardManager";
import { createNPCHand } from "../../modules/heroApiManager";
import { decideWhoStarts, randomIntFromInterval, isOdd } from "../BattleArena/TurnDecider";
import "./BattleGround.css";

const BattleGround = () => {

    const history = useHistory();

    // get hands from local storage.
    const [userHand, setUserHand] = useState(JSON.parse(localStorage.getItem("battleSession")).userHand);
    const [npcHand, setNpcHand] = useState(JSON.parse(localStorage.getItem("battleSession")).npcHand);
    const [currentTurn, setCurrentTurn] = useState(true);
    const [gameIsWon, setGameIsWon] = useState(false);
    const [gameIsLost, setGameIsLost] = useState(false);
    // this initial turn boolean value is randomly generated every start of the game.
    const [initialTurn, setInitialTurn] = useState(isOdd(randomIntFromInterval(0, 100)))
    const [headsOrTailsPlayerChoice, setPlayersChoice] = useState(null);
    const [showHeadsOrTailsSegment, setHeadsOrTailsSegment] = useState(true);
    

    useEffect(() => {
        setUserHand(JSON.parse(localStorage.getItem("battleSession")).userHand);
        setNpcHand(JSON.parse(localStorage.getItem("battleSession")).npcHand);
        if (!currentTurn) {
            setUserHand(JSON.parse(localStorage.getItem("battleSession")).userHand);
            setNpcHand(JSON.parse(localStorage.getItem("battleSession")).npcHand);
            npcTurn();
        }
        
    }, [currentTurn]);

   let checkState = () => {
        console.log('state', npcHand);
        console.log('state', userHand);
        console.log('current turn', currentTurn);  
        console.log('initial turn', initialTurn, "players choice", headsOrTailsPlayerChoice)     
    }   


   const nextTurn = () => {
       console.log('next turn');
       if (userHand.length <= 0) {
            setGameIsLost(true);
       }
        setCurrentTurn(!currentTurn);  
    }

   const npcTurn = () => {
    console.log('npc turn', npcHand[0]);
    if (npcHand.length <= 0) {
        setGameIsWon(true);    
    } else {
        attackAction();
       }
   }

   const closeGame = () => {
       localStorage.removeItem("battleSession");
       history.push(`/battleArena`);
   }

   const attackAction = () => {
       console.log('entered attack segment');
        let victimsHand;
        let victim;
        let attacker;
        let victimIndex;
        let battleSession = {
            deckId: parseInt(JSON.parse(localStorage.getItem("battleSession")).deckId),
            userHand: userHand,
            npcHand: npcHand
        };
        // Regular Attack Segment
        // player turn
        if (currentTurn) {
            console.log('player attacks', "current turn: ", currentTurn);
            victimsHand = npcHand;
            victim = victimsHand[0];
            attacker = userHand[0];
            console.log("victim name", victim.name, npcHand.indexOf(victim));
            victimIndex = npcHand.indexOf(victim);
            victim.health = victim.health - attacker.power;
            console.log('victim health', victim.health);
            battleSession["npcHand"] = victimsHand;
            localStorage.setItem("battleSession", JSON.stringify(battleSession));
            // setNpcHand(victimsHand);

        } else {
            // computer turn
            console.log('npc attacks');
            victimsHand = userHand;
            attacker = npcHand[0];
            victim = victimsHand[0];
            victimIndex = userHand.indexOf(victim);
            victim.health = victim.health - attacker.powerstats.power;
            battleSession["userHand"] = victimsHand;
            localStorage.setItem("battleSession", JSON.stringify(battleSession));
            // setUserHand(victimsHand);
        }
        
        // If target dies
        if (victim.health <= 0) {
            console.log("card died", victim);
            // array.splice(0, 0) doesnt work for the first item it needs to be array.splice(0, 1);
            // victimsHand.splice(victimIndex, victimIndex);
            victimsHand.splice(0, 1);
            if (currentTurn) {
                // setNpcHand(victimsHand);
                console.log('player turn over', victimsHand, victimIndex);
                battleSession["npcHand"] = victimsHand;
                localStorage.setItem("battleSession", JSON.stringify(battleSession));
            } else {
                // setUserHand(victimsHand);
                console.log('pc turn over');
                battleSession["userHand"] = victimsHand;
                localStorage.setItem("battleSession", JSON.stringify(battleSession));
            }
        }
        console.log('attack ends');
        nextTurn();
    }

    let decideWhoStartsFirst = (event) => {
        let bool = decideWhoStarts(event);
        setPlayersChoice(bool);
        setHeadsOrTailsSegment(false);
    }


    let decideHeadsOrTailsSegment;
    if (showHeadsOrTailsSegment) {
       decideHeadsOrTailsSegment = <>
       <button id="heads" onClick={(event) => {decideWhoStartsFirst(event)}}>Heads</button>
       <button id="tails" onClick={(event) => {decideWhoStartsFirst(event)}}>Tails</button>
   </>
    } else {
        decideHeadsOrTailsSegment = null;
    }

    // need to revisit this to make it display you won!
    let playerView;
    if (userHand.length === 0) {
        playerView = <p>You lost against the AI, better luck next time!</p>
    } else {
        playerView = <div>
        <p>{userHand[0].characterName}</p>
        <p>{userHand[0].health}</p>
        <p>{userHand[0].power}</p>
        <img className="characterImage" src={userHand[0].image}></img>
    </div>
    }


    // need to revisit this to make it display you won!
    let npcView;
    if (npcHand.length === 0) {
            npcView = <p>Yay, you won against the AI! :D</p>
    } else {
        npcView = <div>
        <p>Name: {npcHand[0].name}</p>
        <p>Health: {npcHand[0].health}</p>
        <p>Power: {npcHand[0].power}</p>
        <img src={npcHand[0].images.md}></img>
    </div>
    }

    let attackButton;
    if (currentTurn) {
        attackButton = <button onClick={attackAction}>Attack</button>
    } else {
        attackButton = null;
    }


    let npcAttackFirst = () => {
        if (headsOrTailsPlayerChoice === null) {
            return null;
        } else {
            alert(`You chose ${headsOrTailsPlayerChoice} but the coin landed on ${initialTurn}`);
            setPlayersChoice(!headsOrTailsPlayerChoice);
            setCurrentTurn(false);
        }
    }

    let gameView;
    if (headsOrTailsPlayerChoice === initialTurn) {
        gameView = <>{npcView} {playerView}  {attackButton} <button onClick={closeGame}>Exit Game</button></>
    } else {
        gameView = npcAttackFirst();
    }

   return (
       <div>
           <button onClick={() => {checkState()}}>check state</button>
           <h1 style={{color: "white"}}>Battle Ground</h1>
       { headsOrTailsPlayerChoice === null ? 
               decideHeadsOrTailsSegment
           :
           gameView
        //    headsOrTailsPlayerChoice === initialTurn ?

            //    gameIsWon ? <h1>You Won!</h1>
            //    : 
            //    npcHand.length === 0 ? <p>loading</p> : 
            //        <div>
            //            <p>{npcHand[0].name}</p>
            //            <p>{npcHand[0].health}</p>
            //            <img src={npcHand[0].images.md}></img>
            //        </div>
           
            //    gameIsLost ? <h1>You Lost!</h1>
            //    :
            //    userHand.length === 0 ? <p>loading</p> : 
            //        <div>
            //            <p>{userHand[0].characterName}</p>
            //            <p>{userHand[0].health}</p>
            //            <img className="characterImage" src={userHand[0].image}></img>
            //        </div>
         
            // ((playerView), (npcView), (attackButton), (<button onClick={closeGame}>Exit Game</button>))
            // :
            // (npcTurn(), setPlayersChoice(!headsOrTailsPlayerChoice))
       }
       </div>
   );
};


// return (
//     <div>
//         <button onClick={() => {checkState()}}>check state</button>
//         <h1 style={{color: "white"}}>Battle Ground</h1>

//         {
//             gameIsWon ? <h1>You Won!</h1>
//             : 
//             npcHand.length === 0 ? <p>loading</p> : 
//             <>
//                 <p>{npcHand[0].name}</p>
//                 <p>{npcHand[0].health}</p>
//                 <img src={npcHand[0].images.md}></img>
//             </>
//         }
//         <br/>
//         <br/>
//         {
//             gameIsLost ? <h1>You Lost!</h1>
//             :
//             userHand.length === 0 ? <p>loading</p> : 
//             <>
//                 <p>{userHand[0].characterName}</p>
//                 <p>{userHand[0].health}</p>
//                 <img className="characterImage" src={userHand[0].image}></img>
//             </>
//         }
//         {
//             gameIsLost ? null :
//             gameIsWon ? null :
//             currentTurn ? <button onClick={attackAction}>Attack</button> : null
//         }   

//         <button onClick={closeGame}>Exit Game</button>
//     </div>
// );
// };

export default BattleGround;