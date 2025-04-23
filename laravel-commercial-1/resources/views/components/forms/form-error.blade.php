<!-- <button class="error" type="submit" {{ $attributes }}>
    {{ $slot }}
</button> -->
@props(['type'])

@if (!empty($type) && $errors->has($type))
    <p class="errors">{{ $errors->first($type) }}</p>
@endif