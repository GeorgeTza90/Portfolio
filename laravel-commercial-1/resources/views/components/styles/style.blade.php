<style>
    :root {}

    body {
        background-image: url(/logos/bg.jpg);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        background-attachment: fixed;
        min-height: 100vh;
        display: flex;
        justify-items: center;
        align-items: center;
        flex-direction: column;
        color: aliceblue;
        width: 80%;
        margin: 0 auto;
    }

    body.sidebar-open {
        overflow: hidden;
    }

    main {}

    a {
        color: rgb(168, 166, 176);
        text-decoration: none;
        cursor: pointer;
    }

    a:hover {
        color: white;
    }

    .myHeading {
        margin-top: 120px;
    }

    .about {
        display: flex;
        justify-content: center;
    }

    .text {
        display: flex;
        justify-content: center;
    }
</style>

<x-styles.style-nav />
<x-styles.style-buttons />
<x-styles.style-register />
<x-styles.style-footer />
<x-styles.style-search />
<x-styles.style-collection />
<x-styles.style-buttons />
<x-styles.style-carousel />
<x-styles.style-video-ad />