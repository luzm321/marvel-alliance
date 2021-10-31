export const calculateHealth = (character) => {
    let power = character.powerstats.power
    let strength = character.powerstats.strength
    let speed = character.powerstats.speed
    let health = strength + speed + 100 - power;
    character["health"] = health;   
    return character;
}