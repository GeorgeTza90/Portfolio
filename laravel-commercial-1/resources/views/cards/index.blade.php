<x-layouts.main>
    <x-slot:heading>{{ $heading }}</x-slot:heading>
    <x-slot:title>{{ $title }}</x-slot:title>


    <div class="cards-collections">
        <p>Your collection is empty.</p>
        <a href="/login">
            <p>Login to have access to collection.</p>
        </a>

    </div>



    <br /><br /><br /><br />
    <x-ads.ad1 :width="100" />

</x-layouts.main>