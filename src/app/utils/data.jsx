export const type = {
    NORMAL: "NORMAL",
    FIGHTING: "FIGHTING",
    FLYING: "FLYING",
    POISON: "POISON",
    GROUND: "GROUND",
    ROCK: "ROCK",
    BUG: "BUG",
    GHOST: "GHOST",
    STEEL: "STEEL",
    FIRE: "FIRE",
    WATER: "WATER",
    GRASS: "GRASS",
    ELECTRIC: "ELECTRIC",
    PSYCHIC: "PSYCHIC",
    ICE: "ICE",
    DRAGON: "DRAGON",
    DARK: "DARK",
    FAIRY: "FAIRY",
    // NONE: "NONE",
}

const typeColor = {
    [type.NORMAL]: "#A8A77A",
    [type.FIGHTING]: "#C22E28",
    [type.FLYING]: "#A98FF3",
    [type.POISON]: "#A33EA1",
    [type.GROUND]: "#E2BF65",
    [type.ROCK]: "#B6A136",
    [type.BUG]: "#A6B91A",
    [type.GHOST]: "#735797",
    [type.STEEL]: "#B7B7CE",
    [type.FIRE]: "#EE8130",
    [type.WATER]: "#6390F0",
    [type.GRASS]: "#7AC74C",
    [type.ELECTRIC]: "#caa713",
    [type.PSYCHIC]: "#F95587",
    [type.ICE]: "#78c6c2",
    [type.DRAGON]: "#6F35FC",
    [type.DARK]: "#705746",
    [type.FAIRY]: "#D685AD",
    // [type.NONE]: "#68A090",
}

export function darkenColor(color, percent = 20) {
    const num = parseInt(color.replace("#",""), 16),
        amt = Math.round(2.55 * -(percent)),
        R = (num >> 16) + amt,
        G = (num >> 8 & 0x00FF) + amt,
        B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
}

const rawData = [
    [1, 1, 1, 1, 1, 0.5, 1, 0, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 1, 0.5, 0.5, 1, 2, 0.5, 0, 2, 1, 1, 1, 1, 0.5, 2, 1, 2, 0.5],
    [1, 2, 1, 1, 1, 0.5, 2, 1, 0.5, 1, 1, 2, 0.5, 1, 1, 1, 1, 1],
    [1, 1, 1, 0.5, 0.5, 0.5, 1, 0.5, 0, 1, 1, 2, 1, 1, 1, 1, 1, 2],
    [1, 1, 0, 2, 1, 2, 0.5, 1, 2, 2, 1, 0.5, 2, 1, 1, 1, 1, 1],
    [1, 0.5, 2, 1, 0.5, 1, 2, 1, 0.5, 2, 1, 1, 1, 1, 2, 1, 1, 1],
    [1, 0.5, 0.5, 0.5, 1, 1, 1, 0.5, 0.5, 0.5, 1, 2, 1, 2, 1, 1, 2, 0.5],
    [0, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 0.5, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 0.5, 0.5, 0.5, 1, 0.5, 1, 2, 1, 1, 2],
    [1, 1, 1, 1, 1, 0.5, 2, 1, 2, 0.5, 0.5, 2, 1, 1, 2, 0.5, 1, 1],
    [1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 0.5, 0.5, 1, 1, 1, 0.5, 1, 1],
    [1, 1, 0.5, 0.5, 2, 2, 0.5, 1, 0.5, 0.5, 2, 0.5, 1, 1, 1, 0.5, 1, 1],
    [1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 2, 0.5, 0.5, 1, 1, 0.5, 1, 1],
    [1, 2, 1, 2, 1, 1, 1, 1, 0.5, 1, 1, 1, 1, 0.5, 1, 1, 0, 1],
    [1, 1, 2, 1, 2, 1, 1, 1, 0.5, 0.5, 0.5, 2, 1, 1, 0.5, 2, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 1, 1, 1, 2, 1, 0],
    [1, 0.5, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 0.5, 0.5],
    [1, 2, 1, 0.5, 1, 1, 1, 1, 0.5, 0.5, 1, 1, 1, 1, 1, 2, 2, 1],
];

// function to get the icon of a type:
export const getTypeIcon = (type) => {
    return `/assets/icons/${type.toLowerCase()}.svg`;
};

// function to get the effectiveness of one or two types:
export const getEffectiveness = (type1, type2 = type.NONE) => {
    const index1 = Object.values(type).indexOf(type1);
    const index2 = Object.values(type).indexOf(type2);
    return rawData[index1][index2];
};

// function to get the effectiveness of one or two types against all types:
export const getEffectivenessAgainstSelectedTypes = (selectedTypes) => {
    const effectiveness = {};
    const types = Object.values(type);

    types.forEach((t) => {
        let effectivenessValue;
        if (selectedTypes.length === 1) {
            effectivenessValue = getEffectiveness(t, selectedTypes[0]);
        } else if (selectedTypes.length === 2) {
            const effectiveness1 = getEffectiveness(t, selectedTypes[0]);
            const effectiveness2 = getEffectiveness(t, selectedTypes[1]);
            effectivenessValue = effectiveness1 * effectiveness2; // Multiply if there are two selected types
        }

        if (!effectiveness[effectivenessValue]) {
            effectiveness[effectivenessValue] = [];
        }
        effectiveness[effectivenessValue].push(t);
    });

    return effectiveness;
};

// function to get the color of a type:
export const getTypeColor = (type) => {
    return typeColor[type];
};
