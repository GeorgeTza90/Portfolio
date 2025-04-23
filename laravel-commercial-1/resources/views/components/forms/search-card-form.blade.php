<form method="GET" action="/search">
    <label>
        <input id="id" type="text" name="query" placeholder="Search a card...">
    </label>

    <button type="submit" style="display: none;">Search</button>
</form>

<?php
if (isset($_GET['query'])) {
    $search = htmlspecialchars($_GET['query']);
    // echo "<h3><em>$search</em></h3>";
}
?>