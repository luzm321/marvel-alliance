// generates random int
export const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

// generates random even integer
// any number % 2 will either give you a 1 or a 0, if its even it will give you a 0, if its odd a 1
export const randomEvenIntFromInterval = (min, max) => {
    // the minimum number divisible by 2, if its not 0 then add 1 to it. This makes sure that if its an odd number you passed as the minimum
    // then it will add 1 to always make it even.
    if (min % 2 != 0) ++min;
    // the new even minimum number plus 2 times the random number which is now calculated by passing a 0 as the minimum and the
    // minuend of the maximum number minus the new minimum divided by 2.
    return min + 2 * randomIntFromInterval(0, (max-min)/2);
};

// generates random odd integer
export const randomOddIntFromInterval = (min, max) => {
    if (min % 2 == 0) ++min;
    return min + 2 * randomIntFromInterval(0, (max-min)/2);
};

// returns random even int if user chooses heads
export const chooseHeads = () => {
    return randomEvenIntFromInterval(0, 100);
};

// returns random odd int if user chooses tails
export const chooseTails = () => {
    return randomOddIntFromInterval(0, 100);
};


// method that determines who attacks first (user or npc)
export const decideWhoStarts = (event) => {
    // heads is true, tails is false
    let number;
    if (event.target.id === "heads") {
        console.log('player chose heads');
        number = chooseHeads();
    } else {
        console.log('player chose tails');
        number = chooseTails();
    }
    return isOdd(number);
};

// method that determines if returned number from decideWhoStarts method above is even or odd and returns a boolean based on value:
export const isOdd = (num) => { 
    let result = num % 2
    if (result > 0) {
        return true;
    } else {
        return false;
    }
};



