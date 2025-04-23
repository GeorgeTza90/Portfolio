<x-layouts.main>
    <x-slot:heading>{{ $heading }}</x-slot:heading>
    <x-slot:title>{{ $title }}</x-slot:title>

    @auth
    @endauth

    <div class="cards-collection">
        @if($cards->isEmpty())
            <p>Your collection is empty.</p>
            <a href="/search">Start adding some cards!</a>
        @else
            <ul class="card-list">
                @foreach($cards as $card)

                    <a href="{{ route('search.show', $card->id) }}">
                        <li class="collection">
                            @if(!empty($card->imageUrl))
                                <img src="{{ preg_replace('/^http:/i', 'https:', $card->imageUrl) }}" alt="{{ $card->name }}"
                                    class="card-image-show">
                            @else
                                <img src="{{ asset('logos/NoImage.png') }}" alt="No Image">
                            @endif

                            <div class="card-info">
                                @include('components.cards.card-info', ['card' => $card])


                                <form action="{{ route('remove.from.collection', $card->id) }}" method="POST">
                                    @csrf
                                    <x-buttons.remove-button type="submit">Remove from collection</x-buttons.remove-button>
                                </form>
                            </div>
                        </li>
                    </a>

                @endforeach
            </ul>
        @endif
    </div>
    <br /><br /><br /><br />
    <x-ads.ad1 :width="100" />

</x-layouts.main>