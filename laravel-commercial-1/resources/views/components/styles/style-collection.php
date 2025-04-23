<style>
    .cards-collection {
        display: grid;
        gap: 20px;
        padding: 20px;
        grid-template-columns: repeat(1, 1fr);
    }

    @media (min-width: 640px) {
        .cards-collection {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (min-width: 768px) {
        .cards-collection {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    @media (min-width: 1024px) {
        .cards-collection {
            grid-template-columns: repeat(4, 1fr);
        }
    }

    @media (min-width: 1280px) {
        .cards-collection {
            grid-template-columns: repeat(5, 1fr);
        }
    }

    .card-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: contents;
    }

    .collection {
        position: relative;
        overflow: hidden;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: transform 0.3s ease;
    }

    .collection img {
        width: 100%;
        height: auto;
        display: block;
        transition: transform 0.3s ease;
    }

    .collection:hover {
        transform: scale(1.03);
    }

    .card-info {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.75);
        color: #fff;
        padding: 15px;
        max-height: 100%;
        overflow-y: auto;
        transform: translateY(100%);
        transition: transform 0.3s ease;
    }

    .collection:hover .card-info {
        transform: translateY(0%);
    }

    .card-info h2 {
        font-size: 1.1rem;
        margin-bottom: 8px;
    }

    .card-info p {
        font-size: 0.9rem;
        margin-bottom: 5px;
    }

    .card-info form {
        margin-top: 10px;
    }

    .remove-button {
        border-radius: 0.375rem;
        background-color: rgb(209, 84, 59);
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        padding-top: 0.35rem;
        padding-bottom: 0.35rem;
        font-size: 0.8rem;
        font-weight: 300;
        color: white;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
            0 1px 3px rgba(0, 0, 0, 0.1);
        transition: background-color 0.3s ease;
    }

    .remove-button:hover {
        background-color: rgb(224, 122, 101);
    }
</style>