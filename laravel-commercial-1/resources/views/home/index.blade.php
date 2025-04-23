<x-layouts.main>
    <x-slot:heading>{{ $heading }}</x-slot:heading>
    <x-slot:title>{{ $title }}</x-slot:title>

    <div class="text">{{ $text }}</div><br />

    @include('home.carousel', [
        'imagePath' => 'carousel/',
        'link' => 'https://magic.wizards.com/'
    ])   

    @include('home.carousel', [
        'imagePath' => 'cards/',
        'link' => route('about')
    ])

    <br />
    <div class='buy-button-div'>
        <x-buttons.buy-button>Wanna buy some cards?</x-buttons.buy-button>
    </div><br />

    <x-ads.ad1 :width="800" />
    <x-ads.ad2 :width="800" />
</x-layouts.main>
