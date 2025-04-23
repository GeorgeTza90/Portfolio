<style>
    .search-div {
        display: flex;
        gap: 3rem;
        width: 100%;
        margin-top: 0.5rem;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }

    .show-div {
        margin-left: 0%;
    }

    .card-item {
        position: relative;
        display: inline-block;
        margin-top: 15px;
    }

    .card-image {
        display: none;
        position: absolute;
        top: 0;
        left: 100%;
        margin-left: 10px;
        z-index: 10;
    }

    .card-name:hover+.card-image {
        display: block;
    }

    .card-image img {
        width: 300px;
        height: auto;
    }

    .card-show {
        display: flex;
        gap: 10rem;
        width: 100%;
        margin-top: 2rem;
        flex-wrap: wrap;
    }

    .card-stats {
        flex: 1;
        min-width: 300px;
        font-size: 1.05rem;
    }

    .card-image-show {
        border-radius: 15px;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.56);
    }

    .login-message {
        color: rgb(209, 84, 59);
        border: 1px solid rgb(209, 84, 59);
        border-radius: 5px;
        padding: 5px;
    }

    .login-message:hover {
        color: rgb(255, 244, 242);
        border: 1px solid rgb(255, 244, 242);
    }
</style>