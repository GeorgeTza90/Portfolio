<x-layouts.main>
    <x-slot:heading>{{ $heading }}</x-slot:heading>
    <x-slot:title>{{ $title }}</x-slot:title>

    <div class="card-show">
        <div class="card-stats">
            <p><strong>ID:</strong> {{ $card->id ?? 'No ID available' }}</p>
            <p><strong>Type:</strong> {{ $card->type ?? 'No type available' }}</p>
            <p><strong>Color:</strong> {{ implode(', ', $card->colors) ?? "No color available" }}</p>
            <p><strong>Rarity:</strong> {{ $card->rarity ?? 'No rarity available' }}</p>
            <p><strong>Mana Cost:</strong> {{ $card->manaCost ?? 'No manaCost available' }}</p>
            <p><strong>Text:</strong> {{ $card->text ?? 'No text available' }}</p>
            <p><strong>Artist:</strong> {{ $card->artist ?? 'No artist available' }}</p>
            <br /><br />

            @if(session('success'))
                <div class="alert alert-success">
                    {{ session('success') }}
                </div>
            @elseif(session('error'))
                <div class="alert alert-danger">
                    {{ session('error') }}
                </div>
            @endif

            @guest
                <a href="/login">
                    <h3 class="login-message">Log In to add to collection</h3>
                </a>
            @endguest

            @auth
                <form method="POST" action="/collection">
                    @csrf
                    <input type="hidden" name="card_id" value="{{ $card->id }}">
                    <x-forms.form-button>Add to collection</x-forms.form-button>
                </form>
            @endauth
            <br />

            <a href="{{ route('search.index') }}">Back to Search</a><br /><br />

            @auth
                <a href="{{ route('collection.index') }}">Back to Collection</a>
            @endauth
        </div>
        <div class="card-stats">
            @if(!empty($card->imageUrl))
                <img src="{{ preg_replace('/^http:\/\//', 'https://', $card->imageUrl) }}" alt="Image of {{ $card->name }}"
                    class="card-image-show" width="300" height="auto">
            @else
                <img src="{{ asset('logos/NoImage.png') }}" alt="Image of {{ $card->name }}" width="300" height="auto">
            @endif
        </div>
    </div>

    <x-ads.ad2 :width="200" />
</x-layouts.main>