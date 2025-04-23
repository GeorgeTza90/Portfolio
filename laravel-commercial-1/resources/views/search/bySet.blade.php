<x-layouts.main>
    <x-slot:heading>{{ $heading }}</x-slot:heading>
    <x-slot:title>{{ $title }}</x-slot:title>

    <p>{{ $text }}</p><br />

    <form method="GET" action="{{ route('search.bySet', ['setName' => $setName]) }}">
        <div class="search-div">
            <input type="hidden" name="setName" value="{{ $setName }}">
            <div>
                <label for="pageSize">Results per page</label>
                <select name="pageSize" id="pageSize" class="search-select">
                    <option value="15" {{ request('pageSize') == 15 ? 'selected' : '' }}>15</option>
                    <option value="30" {{ request('pageSize') == 30 ? 'selected' : '' }}>30</option>
                    <option value="45" {{ request('pageSize') == 45 ? 'selected' : '' }}>45</option>
                    <option value="60" {{ request('pageSize') == 60 ? 'selected' : '' }}>60</option>
                </select>
            </div>
            <div>
                <label for="page">Page #</label>
                <select name="page" id="page" class="search-select">
                    <option value="1" {{ request('page') == 1 ? 'selected' : '' }}>1</option>
                    <option value="2" {{ request('page') == 2 ? 'selected' : '' }}>2</option>
                    <option value="3" {{ request('page') == 3 ? 'selected' : '' }}>3</option>
                    <option value="4" {{ request('page') == 4 ? 'selected' : '' }}>4</option>
                    <option value="5" {{ request('page') == 5 ? 'selected' : '' }}>5</option>
                    <option value="6" {{ request('page') == 6 ? 'selected' : '' }}>6</option>
                    <option value="7" {{ request('page') == 7 ? 'selected' : '' }}>7</option>
                    <option value="8" {{ request('page') == 8 ? 'selected' : '' }}>8</option>
                    <option value="9" {{ request('page') == 9 ? 'selected' : '' }}>9</option>
                    <option value="10" {{ request('page') == 10 ? 'selected' : '' }}>10</option>
                    <option value="11" {{ request('page') == 11 ? 'selected' : '' }}>11</option>
                    <option value="12" {{ request('page') == 12 ? 'selected' : '' }}>12</option>
                    <option value="13" {{ request('page') == 13 ? 'selected' : '' }}>13</option>
                    <option value="14" {{ request('page') == 14 ? 'selected' : '' }}>14</option>
                    <option value="15" {{ request('page') == 15 ? 'selected' : '' }}>15</option>
                    <option value="16" {{ request('page') == 16 ? 'selected' : '' }}>16</option>
                    <option value="17" {{ request('page') == 17 ? 'selected' : '' }}>17</option>
                    <option value="18" {{ request('page') == 18 ? 'selected' : '' }}>18</option>
                    <option value="19" {{ request('page') == 19 ? 'selected' : '' }}>19</option>
                    <option value="20" {{ request('page') == 20 ? 'selected' : '' }}>20</option>
                    <option value="21" {{ request('page') == 21 ? 'selected' : '' }}>21</option>
                    <option value="22" {{ request('page') == 22 ? 'selected' : '' }}>22</option>
                    <option value="23" {{ request('page') == 23 ? 'selected' : '' }}>23</option>
                    <option value="24" {{ request('page') == 24 ? 'selected' : '' }}>24</option>
                    <option value="25" {{ request('page') == 25 ? 'selected' : '' }}>25</option>
                    <option value="26" {{ request('page') == 26 ? 'selected' : '' }}>26</option>
                    <option value="27" {{ request('page') == 27 ? 'selected' : '' }}>27</option>
                    <option value="28" {{ request('page') == 28 ? 'selected' : '' }}>28</option>
                    <option value="29" {{ request('page') == 29 ? 'selected' : '' }}>29</option>
                    <option value="30" {{ request('page') == 30 ? 'selected' : '' }}>30</option>
                </select>
            </div>
            <x-forms.form-button>Search Set</x-forms.form-button>
        </div><br />
    </form><br />

    @if($cards->isEmpty())
        <p>No cards found for this set.</p>
    @else
        <p>Here are all the cards in the {{ $set[0]->name }} set.</p>
        <ul>
            @foreach($cards as $card)
                <li class="card-item">
                    <a href="{{ route('search.show', ['card' => $card->id]) }}" class="card-name">
                        <strong>{{ $card->name ?? 'Unnamed Card' }}</strong>
                    </a>

                    @if(!empty($card->imageUrl))
                        <div class="card-image">
                            <img src="{{ preg_replace('/^http:\/\//', 'https://', $card->imageUrl) }}"
                                alt="Image of {{ $card->name }}" class="card-image-show">
                        </div>
                    @else
                        <div class="card-image">
                            <img src="{{ asset('logos/NoImage.png') }}" alt="Image of {{ $card->name }}" class="card-image">
                        </div>
                    @endif

                    @if(!empty($card->type)) - {{ $card->type }} @endif
                </li><br />
            @endforeach
        </ul>
    @endif

    <x-ads.ad2 :width="100" />
</x-layouts.main>