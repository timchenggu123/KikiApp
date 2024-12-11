import { cards, decks} from "./dummy"

export const getCard = (cid: Number)=>{
    for (var i = 0; i < cards.length; i ++){
        if (cards[i].id == cid){
            return {
                card_data:cards[i], 
                total: cards.length};
        }
    }
    return {card_data:undefined, total:0};
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