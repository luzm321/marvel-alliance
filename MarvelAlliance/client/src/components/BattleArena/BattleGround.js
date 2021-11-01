import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import { getCardsByDeckId } from "../../modules/cardManager";
import { createNPCHand } from "../../modules/heroApiManager";
import { decideWhoStarts, randomIntFromInterval, isOdd } from "../BattleArena/TurnDecider";
import "./BattleArena.css";
import battleGroundLogo from "../../images/battleGroundLogo.PNG";
import Swal from "sweetalert2";

const BattleGround = () => {

    const history = useHistory();

    // get user and npc hands from local storage:
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
        // set user and npc hands on initial render when user clicks affordance to play game:
        setUserHand(JSON.parse(localStorage.getItem("battleSession")).userHand);
        setNpcHand(JSON.parse(localStorage.getItem("battleSession")).npcHand);
        // useEffect will enable altering turns between user and npc
        if (!currentTurn) {
            setUserHand(JSON.parse(localStorage.getItem("battleSession")).userHand);
            setNpcHand(JSON.parse(localStorage.getItem("battleSession")).npcHand);
            npcTurn();
        }
        // dependency array will listen for changes in currentTurn state to enable turn-based mechanic
    }, [currentTurn]);

//    let checkState = () => {
//         console.log('state', npcHand);
//         console.log('state', userHand);
//         console.log('current turn', currentTurn);  
//         console.log('initial turn', initialTurn, "players choice", headsOrTailsPlayerChoice)     
//     }   

   // method handles the alternating turns between user and npc based on currentTurn's value and whether user loses if there are no more
   // character cards in the userHand array:
   const nextTurn = () => {
       console.log('next turn');
       if (userHand.length <= 0) {
            setGameIsLost(true);
       }
        setCurrentTurn(!currentTurn);  
    }

    // method handles npc's turn and npc will attack so long as there are still cards in npcHand array, else, user wins game
   const npcTurn = () => {
    console.log('npc turn', npcHand[0]);
    if (npcHand.length <= 0) {
        setGameIsWon(true);    
    } else {
        attackAction();
       }
   }

   // ends game and game view, removes battleSession object from local storage and redirects user to battleArena page
   const closeGame = () => {
       localStorage.removeItem("battleSession");
       history.push(`/battleArena`);
   }

   // method with logic of attack move:
   const attackAction = () => {
       console.log('entered attack segment');
        let victimsHand;
        let victim;
        let attacker;
        let victimIndex;
        // set/store battleSession object to local storage when game starts:
        let battleSession = {
            deckId: parseInt(JSON.parse(localStorage.getItem("battleSession")).deckId),
            userHand: userHand,
            npcHand: npcHand
        };
        // Regular Attack Segment:
        // player turn
        if (currentTurn) {
            console.log('player attacks', "current turn: ", currentTurn);
            victimsHand = npcHand;
            victim = victimsHand[0]; // victim will be first character card in victimsHand array of npc
            attacker = userHand[0]; // attacker will be first character card in userHand array of user
            console.log("victim name", victim.name, npcHand.indexOf(victim));
            victimIndex = npcHand.indexOf(victim); // finds index of current character of npc
            victim.health = victim.health - attacker.power; // decrements defending character's (npc) health stat by the attacking (user) character's power stat
            console.log('victim health', victim.health);
            battleSession["npcHand"] = victimsHand; // updates npcHand array in battleSession from local storage with new health value 
            //of character(s) from victimsHand array
            localStorage.setItem("battleSession", JSON.stringify(battleSession));
            // setNpcHand(victimsHand);

        } else {
            // npc turn
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
        
        // If target dies (user or npc)
        if (victim.health <= 0) {
            console.log("card died", victim);
            // array.splice(0, 0) won't work for the first item it needs to be array.splice(0, 1) to remove 1st character/index in victimsHand array;
            // victimsHand.splice(victimIndex, victimIndex);
            victimsHand.splice(0, 1);
            if (currentTurn) {
                //if user has attacked the npc, update npcHand from battleSession with change in health stat
                // setNpcHand(victimsHand);
                console.log('player turn over', victimsHand, victimIndex);
                battleSession["npcHand"] = victimsHand;
                localStorage.setItem("battleSession", JSON.stringify(battleSession));
            } else {
                // else if user was attacked by npc, update userHand from battleSession with change in health stat
                // setUserHand(victimsHand);
                console.log('pc turn over');
                battleSession["userHand"] = victimsHand;
                localStorage.setItem("battleSession", JSON.stringify(battleSession));
            }
        }
        console.log('attack ends');
        //then proceed to next turn
        nextTurn();
    }

    // method receives boolean value from decideHeadsOrTailsSegment whether user chooses heads (true) or tails(false)
    // if heads(true) or tails(false) chosen by user and the randomly generated int which returns true or false from decideWhoStarts method
    // returns what the user chose (heads/true or tails/false), then the player starts first, else it will be the npc
    let decideWhoStartsFirst = (event) => {
        let bool = decideWhoStarts(event); // returns true or false whether randomly generated int is even or odd
        setPlayersChoice(bool);
        setHeadsOrTailsSegment(false); // once user has chosen head or tails, don't display the heads or tails segment anymore
    }

    // displays heads or tails segment for user to select to decide who attacks first:
    let decideHeadsOrTailsSegment;
    if (showHeadsOrTailsSegment) {
        decideHeadsOrTailsSegment = <div className="box headsOrTailsDiv">
            <h1 className="headsOrTails">~Select Heads or Tails~</h1>
            <button className="button is-rounded is-light is-primary headsBut" id="heads" onClick={(event) => {decideWhoStartsFirst(event)}}>
                Heads<img className="headsIcon" src="https://img.icons8.com/external-inipagistudio-mixed-inipagistudio/64/000000/external-coin-pro-gamer-inipagistudio-mixed-inipagistudio.png"/>
            </button>
            <button className="button is-rounded is-outlined is-success is-light tailsBut" id="tails" onClick={(event) => {decideWhoStartsFirst(event)}}>
                Tails<img className="tailsIcon" src="https://img.icons8.com/office/80/000000/iron-man.png"/>
            </button>
        </div>
    } else {
        decideHeadsOrTailsSegment = null;
    }

    // displays user's view witch current character's stats and determines if user loses based on length of hand in array
    let playerView;
    if (userHand.length === 0) {
        playerView = <p className="lostGame">You lost against the NPC, better luck next time!</p>
    } else {
        playerView = <div className="playerDiv">
        <h1 className="player">~User Character Card~</h1>
        <p className="playerName">Name: {userHand[0].characterName}</p>
        <p className="playerHealth">Health: {userHand[0].health}</p>
        <p className="playerPower">Power: {userHand[0].power}</p>
        <img className="playerImg" src={userHand[0].image}></img>
    </div>
    }


    // displays current view of npc hand with character's stats and determines if npc loses based on length of hand in array
    let npcView;
    if (npcHand.length === 0) {
            npcView = <p className="wonGame">Yay, you won against the NPC! :D</p>
    } else {
        npcView = <div className="npcDiv">
        <h1 className="npc">~NPC Character Card~</h1>
        <p className="npcName">Name: {npcHand[0].name}</p>
        <p className="npcHealth">Health: {npcHand[0].health}</p>
        <p className="npcPower">Power: {npcHand[0].powerstats.power}</p>
        <img className="npcImg" src={npcHand[0].images.md}></img>
    </div>
    }

    let attackButton;
    if (currentTurn) {
        // if it is user's current turn, display attack button
        attackButton = <button className="button is-rounded is-danger is-light attackBut" onClick={attackAction}>
            Attack<img className="attackIcon" src="https://img.icons8.com/color/100/000000/angry-fist.png"/>
        </button>
    } else {
        attackButton = null;
    }

    // method with logic of npc attack per turn:
    let npcAttackFirst = () => {
        if (headsOrTailsPlayerChoice === null) {
            return null;
        } else {
            Swal.fire({
                // title: `You chose ${headsOrTailsPlayerChoice} but the coin landed on ${initialTurn}. NPC attacked first!`,
                title: `You lost the coin toss, the NPC attacked first!`,
                icon: "info",
                confirmButtonColor: "#20B2AA"
            });
            setPlayersChoice(!headsOrTailsPlayerChoice);
            setCurrentTurn(false);
        }
    }

    let gameView;
    // displays both npc and player/user views with attack button for user:
    if (headsOrTailsPlayerChoice === initialTurn) {
        // if user's choice from heads or tails matches boolean value of turn decider boolean value, then user attacks first:
        gameView = <>{npcView} {playerView}  {attackButton} <button className="button is-rounded is-light is-danger exitBut" onClick={closeGame}>
                Exit Game<img className="exitIcon" src="https://img.icons8.com/color/100/000000/fire-exit.png"/>
            </button>
        </>
    } else {
        // else, npc goes first:
        gameView = npcAttackFirst();
    }

   return (
        <div className="">
            {/* <button onClick={() => {checkState()}}>check state</button> */}
            <div>
               <img className="battleGroundLogo" src={battleGroundLogo} alt="Battle Ground" />
            </div>
        { headsOrTailsPlayerChoice === null ? 
               decideHeadsOrTailsSegment
           :
           gameView
        }
        </div>
   );
};

export default BattleGround;