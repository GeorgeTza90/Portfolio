<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<x-layouts.head>{{ $title }}</x-layouts.head>

<x-layouts.nav />

<body>
    <x-layouts.heading>{{ $heading }}</x-layouts.heading>

    <main>{{ $slot }}</main>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

</body>

<x-layouts.foot />

</html>