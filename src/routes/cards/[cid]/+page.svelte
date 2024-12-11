<script>
    import { page } from '$app/stores';
    import { getCard} from "$lib/dummy/adapter";
    import Card from "../../../components/Card.svelte"; 
    let {card_data, total} = getCard(parseInt($page.params.cid));
</script>

<Card {...card_data}/>