<h2>{{ $card->name }}</h2>

@if($card->type)
    <p><strong>Type:</strong> {{ $card->type }}</p>
@endif

@if($card->colors)
    <p><strong>Color:</strong> {{ is_array($card->colors) ? implode(', ', $card->colors) : $card->colors }}</p>
@endif

@if($card->rarity)
    <p><strong>Rarity:</strong> {{ $card->rarity }}</p>
@endif

@if($card->manaCost)
    <p><strong>Mana Cost:</strong> {{ $card->manaCost }}</p>
@endif

@if($card->text)
    <p><strong>Text:</strong> {{ $card->text }}</p>
@endif

@if(!empty($card->power))
    <p><strong>Power:</strong> {{ $card->power }}</p>
@endif

@if(!empty($card->toughness))
    <p><strong>Toughness:</strong> {{ $card->toughness }}</p>
@endif