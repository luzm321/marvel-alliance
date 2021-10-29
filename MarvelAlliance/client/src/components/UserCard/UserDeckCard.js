import React, {useState, useEffect} from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from '@mui/material';
import "./UserDeckCard.css";
import { deleteCard, getCardById, getCardsByDeckId, patchCard } from "../../modules/cardManager";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function UserDeckCard({ card, setCards }) {
  const [expanded, setExpanded] = React.useState(false);
  const [cardDescription, setCardDescription] = useState(card.description);
  const [isEditing, setEditStatus] = useState(false);

  const [currentCard, setCurrentCard] = useState(card);
  const history = useHistory();
  const {deckId} = useParams();

  const openEditMode = () => {
    setEditStatus(true);
  }

  const closeEditMode = () => {
    setEditStatus(false);
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    getCardById(currentCard.id)
    // listen for changes in card state passed as prop from parent component (UserDeckCardList) and if card state changes
    // and is no longer the same state as currentCard state, then it changes currentCard to what card is now.
    if (currentCard !== card) {
      setCurrentCard(card);
    }
  }, [card]);

  const handleInputChange = (event) => {
    let newCardDescription = cardDescription;
    newCardDescription = event.target.value
    setCardDescription(newCardDescription)
  };

  const patchCardDescription = () => {
    const description = cardDescription;
    if (description === "") {
      Swal.fire({
          title: "Cannot save an empty description! Please provide a value for description. 👇",
          icon: "info",
          confirmButtonColor: "#20B2AA"
      });
    } else {
      closeEditMode()
      const newCardDescription = {
        id: parseInt(currentCard.id),
        description: cardDescription 
      }
      patchCard(newCardDescription)
        .then(() => {
            Swal.fire({
            title: "Card's Description Updated! 😊",
            icon: "info",
            confirmButtonColor: "#20B2AA"
            })
        }).then(() => {
          getCardsByDeckId(deckId)
          .then(userCards => setCards(userCards)) // update cards state in parent component to re-render list of cards
        }).then(() => {
          history.push(`/myDecks/${deckId}/cards`);
        });
      };
  };

  // Method for deleting a deck with sweetalert2 npm alert:
  const handleDeleteCard = () => {
    Swal.fire({
      title: "Are you certain you want to delete this card?",
      icon: "warning",
      confirmButtonColor: "#20B2AA",
      showCancelButton: true,
      cancelButtonColor: "#CD5C5C",
      confirmButtonText: "Yes, I'm certain!"
    }).then((response) => {
      if (response.isConfirmed) {
        deleteCard(currentCard.id).then(() => {
          Swal.fire(
            'Deleted!',
            'Thanos snapped his fingers and removed the card from collection!',
            'success'
          )
        }).then(() => {
            getCardsByDeckId(deckId)
            .then(userCards => setCards(userCards))
        });
        history.push(`/myDecks/${deckId}/cards`)
      };
    });
  };

  let cardContent;
  if (isEditing) {
    cardContent = <>
      <div>
        <textarea className="textArea" id="description" defaultValue={cardDescription} onChange={(event) => {handleInputChange(event)}}/>
      </div>
      <button className="button is-rounded is-black is-outlined cancelEditCard" onClick={() => {closeEditMode()}}>Cancel</button>
      <button className="button is-rounded is-black is-outlined editCard" onClick={() => {patchCardDescription()}}>Save</button>
    </>
  } else {
      cardContent = <>
        <Typography className="contentDesc" id="description" type="text" value={cardDescription} defaultValue={cardDescription} variant="body2" color="text.secondary">
          {currentCard.description}
        </Typography>
        <button className="button is-rounded is-black is-outlined editCardBut" onClick={() => {openEditMode()}}>Edit Description</button>
      </>
  }

  return (
    <div className="cardDiv">
      <Card sx={{ maxWidth: 370 }}>
        <CardHeader className="charName" style={{ fontFamily: "Kaushan Script, cursive" }}
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="Character Card">
              <img className="marvelIcon" src="https://i.pinimg.com/originals/99/9f/74/999f7467e89a8e4877fea1bdd10eb9d3.jpg" alt="Marvel" />
            </Avatar>
          }
          title={currentCard.characterName}
        />
        <CardMedia
          component="img"
          height="194"
          image={currentCard.image}
          alt="Character Image"
        />
        <CardContent>
          {cardContent}
        </CardContent>
        <CardActions disableSpacing>       
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more">
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Character Stats:</Typography>
            <Typography paragraph>
              Health: {currentCard.health} pts
            </Typography>
            <Typography paragraph>
              Power: {currentCard.power} pts
            </Typography>
            <Typography paragraph>
              Strength: {currentCard.strength} pts
            </Typography>
            <Typography paragraph>
              Speed: {currentCard.speed} pts
            </Typography>
            <Button onClick={() => {handleDeleteCard()}} style={{  margin: "1.5em 0em 1em 0em", fontFamily: "Kaushan Script, cursive" }} type="submit" variant="contained" color="error">
              Delete
              <div>
                <img className="deleteCardIcon" src="https://pngimage.net/wp-content/uploads/2019/05/infinity-war-thanos-png-.png" alt="Remove" />
              </div>
            </Button>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};
