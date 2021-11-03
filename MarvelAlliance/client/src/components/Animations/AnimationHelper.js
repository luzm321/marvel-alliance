import Radium from 'radium';
import { tada, flipInY, rubberBand, zoomInDown, swing, slideInUp, pulse, bounce, lightSpeedIn } from 'react-animations';


export const ZoomInDownAnimation = (seconds) => {

    let zoomInDownAnimation = {
        animationDuration: `${seconds}s`,
        animationName: Radium.keyframes(zoomInDown, "zoonInDown")
    };

    return zoomInDownAnimation;

};

export const TadaAnimation = (seconds) => {

    let tadaAnimation = {
        animationDuration: `${seconds}s`,
        animationName: Radium.keyframes(tada, "tada")
    };

    return tadaAnimation;

};

export const SlideInUpAnimation = (seconds) => {

    let slideInUpAnimation = {
        animationDuration: `${seconds}s`,
        animationName: Radium.keyframes(slideInUp, "slideInUp")
    };

    return slideInUpAnimation;

};

export const SwingAnimation = (seconds) => {

    let swingAnimation = {
        animationDuration: `${seconds}s`,
        animationName: Radium.keyframes(swing, "swing")
    };

    return swingAnimation;

};

export const FlipInYAnimation = (seconds) => {

    let flipInYAnimation = {
        animationDuration: `${seconds}s`,
        animationName: Radium.keyframes(flipInY, "flipInY")
    };

    return flipInYAnimation;

};

export const RubberBandAnimation = (seconds) => {

    let rubberBandAnimation = {
        animationDuration: `${seconds}s`,
        animationName: Radium.keyframes(rubberBand, "rubberBand")
    };

    return rubberBandAnimation;

};

export const PulseAnimation = (seconds) => {

    let pulseAnimation = {
        animationDuration: `${seconds}s`,
        animationName: Radium.keyframes(pulse, "pulse")
    };

    return pulseAnimation;

};

export const BounceAnimation = (seconds) => {

    let bounceAnimation = {
        animationDuration: `${seconds}s`,
        animationName: Radium.keyframes(bounce, "bounce")
    };

    return bounceAnimation;

};

export const LightSpeedInAnimation = (seconds) => {

    let lightSpeedInAnimation = {
        animationDuration: `${seconds}s`,
        animationName: Radium.keyframes(lightSpeedIn, "lightSpeedIn")
    };

    return lightSpeedInAnimation;

};