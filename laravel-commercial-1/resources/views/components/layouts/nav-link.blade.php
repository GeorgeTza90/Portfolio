@props(['active' => false])

<a class="{{ $active ? 'nav-link-current' : 'nav-link'}}" aria-current="{{ $active ? 'page' : 'false'}}" {{ $attributes }}>{{ $slot }}</a>