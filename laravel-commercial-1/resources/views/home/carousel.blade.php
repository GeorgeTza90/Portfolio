@php
    use Illuminate\Support\Facades\File;

    $carouselId = 'carousel_' . md5($imagePath);
    $path = $imagePath;
    $files = File::exists(public_path($path)) ? File::files(public_path($path)) : [];
    $images = collect($files)->map(fn($file) => $path . $file->getFilename());
@endphp

@if($images->count())
    <div class="carousel-block">
        <div id="{{ $carouselId }}" class="carousel slide" data-bs-ride="carousel">

            <div class="carousel-indicators">
                @foreach ($images as $index => $image)
                    <button type="button" data-bs-target="#{{ $carouselId }}" data-bs-slide-to="{{ $index }}"
                        class="{{ $loop->first ? 'active' : '' }}" aria-current="{{ $loop->first ? 'true' : 'false' }}"
                        aria-label="Slide {{ $index + 1 }}"></button>
                @endforeach
            </div>

            <div class="carousel-inner">
                @foreach ($images as $image)
                    <div class="carousel-item {{ $loop->first ? 'active' : '' }}">
                        <a href="{{ $link }}" target="_blank">
                            <img src="{{ asset($image) }}" class="d-block w-100" alt="carousel image">
                        </a>
                    </div>
                @endforeach
            </div>

            <button class="carousel-control-prev" type="button" data-bs-target="#{{ $carouselId }}" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>

            <button class="carousel-control-next" type="button" data-bs-target="#{{ $carouselId }}" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
    <br />
@else
    <p class="text-center">No images found in: <code>{{ $imagePath }}</code></p>
@endif