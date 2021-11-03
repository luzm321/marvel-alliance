import React from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import {StyleRoot} from 'radium';
import { SlideInUpAnimation } from "../Animations/AnimationHelper";


const ImageGallery = () => {
  return (
    <StyleRoot style={SlideInUpAnimation(2.5)}>
      <ImageList sx={{ width: 600, height: 600 }}>
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader style={{ fontSize: "20px", fontFamily: "Kaushan Script, cursive", color: "black"  }} component="div">Marvel Characters</ListSubheader>
        </ImageListItem>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
              // subtitle={}
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about ${item.title}`}
                >
                  {/* <InfoIcon /> */}
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </StyleRoot>
  );
}

const itemData = [
  {
    img: 'https://i.redd.it/spaub6qc6gn01.jpg',
    title: 'Dr. Strange',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://static.comicvine.com/uploads/original/11136/111365328/6885220-1992092028-6884216-5908321246-310',
    title: 'Scarlet Witch'
  },
  {
    img: 'https://cutewallpaper.org/21/steve-rogers-wallpaper/steve-rogers-lockscreens-Tumblr.jpg',
    title: 'Captain America'
  },
  {
    img: 'https://i.pinimg.com/736x/bc/1a/13/bc1a13f5e628ffc57e652e82bd546f4b.jpg',
    title: 'Thor',
    cols: 2,
  },
  {
    img: 'https://lumiere-a.akamaihd.net/v1/images/au_marvel_blackwidow_payoff_hero_m_477e378c.jpeg?region=0,0,750,668',
    title: 'Black Widow',
    cols: 2,
  },
  {
    img: 'https://static.toiimg.com/thumb/msid-82379825,width-1200,height-900,resizemode-4/.jpg',
    title: 'Black Panther',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://wallpapercave.com/wp/wp2586318.jpg',
    title: 'Iron Man'
  },
  {
    img: 'https://s1.1zoom.me/big0/8/Avengers_Age_of_Ultron_502864.jpg',
    title: 'Vision'
  },
  {
    img: 'https://www.irishtimes.com/polopoly_fs/1.3816164.1551865157!/image/image.jpg_gen/derivatives/ratio_1x1_w1200/image.jpg',
    title: 'Captain Marvel',
    rows: 2,
    cols: 2
  },
  {
    img: 'https://cdn.vox-cdn.com/thumbor/774Aj1W14_URLFtFtfGVjO04-zU=/0x0:3840x2160/1200x800/filters:focal(1949x199:2563x813)/cdn.vox-cdn.com/uploads/chorus_image/image/62714540/Du1qOSmXgAAPVQD.0.jpg',
    title: 'Spider-Man'
  },
  {
    img: 'https://cdn3-www.superherohype.com/assets/uploads/2013/11/antmansh.jpg',
    title: 'Ant-Man'
  },
  {
    img: 'https://images.hdqwalls.com/wallpapers/loki-the-god-of-mischief-ik.jpg',
    title: 'Loki'
  },
  {
    img: 'https://2.bp.blogspot.com/-Jy8ZUMg8ds4/XJ8IsSTqzPI/AAAAAAAAKuo/2yIDBs3bzvcYoM_eSi-nWufhQghHq-g_wCLcBGAs/s2560/thanos-new-4k-fp-1080x1920.jpg',
    title: 'Thanos'
  },
  {
    img: 'https://i.redd.it/scuytfwa3wl61.jpg',
    title: 'Star-Lord'
  },
  {
    img: 'https://www.mordeo.org/download/4461/',
    title: 'Gamora'
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSLmOmcK6HhxHTj3rkSA1OBsvaeBW8-6SsL1Tmw8g4L42ud_jFRufFemmnoAbo6p-EL6o&usqp=CAU',
    title: 'Groot'
  },
  {
    img: 'https://i.pinimg.com/originals/6d/63/ff/6d63ff02277761602fc8433fb3509665.jpg',
    title: 'Red Skull'
  },
  {
    img: 'https://i.pinimg.com/736x/01/d1/ac/01d1ac9eb6959f34633a7202bbe8c8a9.jpg',
    title: 'Killmonger'
  }
];

export default ImageGallery;
