import { cards, decks} from "./dummy"

export const getCard = (cid: Number)=>{
    for (var i = 0; i < cards.length; i ++){
        if (cards[i].id == cid){
            return cards[i];
        }
    }
    return undefined;
}

export const getDeck = (did: Number) => {
    for (var i = 0; i < decks.length; i ++) {
        if (decks[i].id == did){
            console.log("deck found " + did)
            return decks[i];
        }
    }
    return undefined;
}