<nav>
    <div class="div-nav">
        <div class="div-logo-search">
            <a href="javascript:void(0)" class="logo-link" id="menu-toggle">
                <img src="{{ asset('logos/logo.png') }}" alt="Logo" class="nav-logo">
            </a>
            <x-buttons.search-button />
        </div>

        <div class="div-nav-links" id="nav-links">
            <x-layouts.nav-link href="/" :active="request()->is('/')">
                <img src="{{ asset('icons/home.png') }}" alt="Home" class="nav-link-icon">
            </x-layouts.nav-link>
            <x-layouts.nav-link href="/cards" :active="request()->is('cards')">
                <img src="{{ asset('icons/cards.png') }}" alt="Cards" class="nav-link-icon">
            </x-layouts.nav-link>
            <x-layouts.nav-link href="/search" :active="request()->is('search')">
                <img src="{{ asset('icons/search.png') }}" alt="Search" class="nav-link-icon">
            </x-layouts.nav-link>
            <x-layouts.nav-link href="/about" :active="request()->is('about')">
                <img src="{{ asset('icons/about.png') }}" alt="about" class="nav-link-icon">
            </x-layouts.nav-link>

        </div>

        <div class="div-logo-user">
            @guest
                <x-layouts.nav-link href="/register" :active="request()->is('register')">
                    <img src="{{ asset('icons/signup.png') }}" alt="Sign Up" class="nav-link-icon">
                </x-layouts.nav-link>
                <x-layouts.nav-link href="/login" :active="request()->is('login')">
                    <img src="{{ asset('icons/login.png') }}" alt="Log In" class="nav-link-icon">
                </x-layouts.nav-link>
            @endguest

            @auth

                <form method="POST" action="/logout">
                    @csrf
                    <x-buttons.logout-button href="/logout">
                        <img src="{{ asset('icons/logout.png') }}" alt="Log Out" class="nav-link-icon">
                    </x-buttons.logout-button>
                </form>
                <a href="/cards" class="logo-link">
                    <img src="{{ asset('logos/UserLogo.png') }}" alt="Logo" class="nav-logo-user">
                </a>
            @endauth


        </div>
    </div>
</nav>

<script>
    const toggle = document.getElementById('menu-toggle');
    const links = document.getElementById('nav-links');

    toggle.addEventListener('click', () => {
        links.classList.toggle('active');
    });

    links.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            links.classList.remove('active');
        });
    });
</script>