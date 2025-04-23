<form method="GET" action="{{ route('search.index') }}">
    <input type="text" name="query" placeholder="Search cards..." class="search-button" required>
    <button type="submit" style="display: none;">Search</button>
</form>