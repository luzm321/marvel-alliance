import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useHistory } from "react-router-dom";
import { createNPCHand } from "../../modules/heroApiManager";
import { getCardsByDeckId } from "../../modules/cardManager";
import {StyleRoot} from 'radium';
import { SlideInUpAnimation } from "../Animations/AnimationHelper";


export default function DeckDetail({ deckSelection }) {

    const history = useHistory();

    // method creates battleSession object, passes id of deck user selected from dropdown menu when user clicks "Start Game"
    // and stores it to to localStorage
    const createBattleSession = (deckId) => {
        return createNPCHand().then((npcHand) => {
            return getCardsByDeckId(deckId).then((userHand) => {
                let battleSession = {
                    deckId: deckId,
                    userHand: userHand,
                    npcHand: npcHand
                };
                return localStorage.setItem("battleSession", JSON.stringify(battleSession));
            });
        });
    }

    // method retrieves deckId from selected deck from dropdown menu and passes it to the createBattleSession method and redirects user
    // to the battleGround page/view:
    const startGame = (deckId) => {
        createBattleSession(deckId).then(() => {
            history.push(`/battleGround`)
        });
    }


    return (
    <StyleRoot style={SlideInUpAnimation(1.5)}>
        <div className="deckDetailDiv">
            <Card sx={{ maxWidth: 500 }}>
                <CardMedia
                component="img"
                alt="Battle Deck"
                height="140"
                image="https://i.pinimg.com/originals/24/0c/dd/240cdd07b09b2bb11c3fdb6ae849dd60.jpg"
                />
                <CardContent>
                {/* optional chaining operator to ensure code doesn't break for nested property being accessed */}
                <Typography style={{ fontFamily: "Kaushan Script, cursive", fontSize: "30px" }} gutterBottom variant="h5" component="div">
                    {deckSelection.chosenDeck?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{ fontFamily: "Kaushan Script, cursive", margin: "0em 0em 1em 0em", fontSize: "20px" }}>
                    {deckSelection.chosenDeck?.details}
                </Typography>
                <Typography style={{ fontFamily: "Kaushan Script, cursive", fontSize: "19px" }}>
                    # of Cards in Deck: {deckSelection.cards.length}
                </Typography>
                </CardContent>
                <CardActions>
                <Button color="success" variant="contained" style={{ margin: "0.5em 0em 1.5em 13em", fontFamily: "Kaushan Script, cursive", padding: "1em", fontSize: "14px" }}
                    onClick={() => {startGame(deckSelection.chosenDeck.id)}} size="small">Start Game</Button>
                </CardActions>
            </Card>
        </div>
      </StyleRoot>
    );
}