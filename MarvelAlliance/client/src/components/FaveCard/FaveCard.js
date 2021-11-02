import React from "react";
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
import "./FaveCard.css";


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

export default function FaveCard({ faveCard }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="cardDiv">
      <Card sx={{ maxWidth: 370 }} style={{ fontFamily: "Kaushan Script, cursive", fontSize: "19px" }}>
        <CardHeader style={{ fontFamily: "Kaushan Script, cursive", fontSize: "21px" }} className="charName"
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="Character Card">
              <img className="marvelIcon" src="https://i.pinimg.com/originals/99/9f/74/999f7467e89a8e4877fea1bdd10eb9d3.jpg" alt="Marvel" />
            </Avatar>
          }
          title={faveCard?.characterName}
        />
        <CardMedia
          component="img"
          height="194"
          image={faveCard?.image}
          alt="Character Image"
        />
        <CardContent>
          {faveCard?.description}
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
            <Typography style={{ fontFamily: "Kaushan Script, cursive", fontSize: "25px" }} paragraph>~Character Stats~</Typography>
            <Typography style={{ fontFamily: "Kaushan Script, cursive", fontSize: "18px" }} paragraph>
              Health: {faveCard?.health} pts
            </Typography>
            <Typography style={{ fontFamily: "Kaushan Script, cursive", fontSize: "18px" }} paragraph>
              Power: {faveCard?.power} pts
            </Typography>
            <Typography style={{ fontFamily: "Kaushan Script, cursive", fontSize: "18px" }} paragraph>
              Strength: {faveCard?.strength} pts
            </Typography>
            <Typography style={{ fontFamily: "Kaushan Script, cursive", fontSize: "18px" }} paragraph>
              Speed: {faveCard?.speed} pts
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};
