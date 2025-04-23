<style>
    .carousel-block {
        display: block;
        width: 100%;
        box-shadow: 2px 2px 7px rgb(16, 19, 17);
    }

    .carousel-inner {
        max-width: 800px;
        overflow: hidden;
        border: 1px solid rgb(16, 19, 17);
        border-radius: 30px;
    }

    .carousel-item {}

    .carousel-item img {
        object-fit: cover;
        width: auto;
        display: block;

    }

    .carousel-control-prev,
    .carousel-control-next {
        top: 50%;
        transform: translateY(-50%);
        width: 50px;
        height: 40%;
        background-color: rgba(0, 0, 0, 0.07);
        z-index: 2;
    }

    .carousel-control-prev:hover,
    .carousel-control-next:hover {
        background-color: rgba(0, 0, 0, 0.72);
    }
</style>