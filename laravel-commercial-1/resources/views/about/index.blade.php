<x-layouts.main>
    <x-slot:heading>{{ $heading }}</x-slot:heading>
    <x-slot:title>{{ $title }}</x-slot:title>

    <div class="about">
        <p><img src="{{ asset('logos/logo.png') }}" alt="Logo" width="300" height="auto"></p><br />
    </div>
    {{ $text }}<br />
    <p>
        "Card Wizard" is an intuitive and user-friendly platform designed for card enthusiasts to easily discover
        and
        manage their card collections. Currently, the platform focuses on Magic: The Gathering cards, providing an
        expansive database of cards from this iconic trading card game. With a powerful search engine at its core,
        Card
        Wizard allows users to search for cards based on multiple filters such as name, type, color, or card ID.
        Whether
        you're looking for a specific card or exploring cards by category, the search functionality provides fast,
        relevant results to help you find exactly what you need.
    </p><br />
    <p>
        In addition to the search feature, Card Wizard offers an organized collection page where users can save
        their
        favorite Magic: The Gathering cards. The collection page showcases a visually appealing layout with detailed
        information about each card, including type, color, rarity, mana cost, and more. Users can effortlessly add
        cards to their collection with a simple click and even remove them later when they wish. This seamless
        integration between the search and collection functionality ensures that card collectors can both explore
        and
        manage their cards with ease, making Card Wizard the go-to platform for any Magic: The Gathering card
        enthusiast.
    </p><br />

</x-layouts.main>