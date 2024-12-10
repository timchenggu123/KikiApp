<script>
    import { page } from '$app/stores';
    import { getCard} from "$lib/dummy/adapter";

    export let card_data = getCard(parseInt($page.params.cid));
</script>

<div>
    <h1>
        {card_data ? card_data.id : `Non-existent`}
    </h1>
    <p>
        {card_data ? card_data.front : `Non-existent`} 
    </p>
    <p>
        {card_data ? card_data.back : `Non-existent`} 
    </p>
</div>
{$page.params.cid}
  