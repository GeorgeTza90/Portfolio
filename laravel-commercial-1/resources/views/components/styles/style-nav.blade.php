<?php
$boxRadius = "5px";
$navColor = 'rgba(79, 76, 88, 0.4)';
$transientColor = 'rgba(168, 166, 176, 0.22)';
?>

<style>
    nav {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 9999;
        height: 70px;
        background-color:
            {{$navColor}}
        ;

        border-radius:
            {{$boxRadius}}
        ;
        box-shadow: 2px 2px 12px rgb(0, 0, 0);
        display: flex;
        justify-content: space-between;
        align-items: center;
        backdrop-filter: blur(10px);
    }


    /* DIVs */
    .div-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 80%;
        margin: 0 auto;
    }

    .div-nav-links {
        display: grid;
        grid-template-columns: repeat(4, 90px);
        align-items: center;
        justify-items: center;
    }

    .div-logo-search {
        display: flex;
        justify-items: flex-start;
        align-items: center;
    }

    .div-logo-user {
        display: grid;
        grid-template-columns: repeat(3, 85px);
        align-items: center;
        justify-items: flex-end;
    }


    /* LINKs */
    .nav-link {
        font-size: 90%;
        color: white;
        text-decoration: none;
        cursor: pointer;
        padding: 20%;
        border-radius: 12px;
        box-shadow: 5px 2px 12px rgba(0, 0, 0, 0.1);
    }

    .logo-link {
        cursor: default;
    }

    .nav-link-icon {
        width: 25px;
        height: auto;

    }


    /* LINKs Current */
    .nav-link-current {
        font-size: 90%;
        color: white;
        text-decoration: none;
        cursor: pointer;
        padding: 20%;
        background: linear-gradient(to top,
                {{ $transientColor }}
                , rgba(0, 0, 0, 0));
        border-radius: 12px;
        box-shadow: 5px 2px 12px rgba(0, 0, 0, 0.1);
    }


    /* HOVERs */
    .nav-link:hover {
        background-color: rgba(168, 166, 176, 0.41);
        box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.59);
        border-radius: 12px;
    }

    .nav-link-current:hover {
        background-color: rgba(168, 166, 176, 0.41);
        box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.59);
        border-radius: 12px;
    }


    /* LOGOs */
    .nav-logo {
        height: 55px;
        width: auto;
        margin-top: 5px;
        margin-right: 15px
    }

    .nav-logo-user {
        height: 55px;
        width: auto;
        margin-top: 5px;
        margin-left: 15px
    }

    @media (max-width: 768px) {
        .div-nav-links {
            position: absolute;
            top: 70px;
            left: -250px;
            display: flex;
            flex-direction: column;
            background: #444;
            width: 50px;
            height: 100vh;
            transition: left 0.3s ease;
            padding: 20px;
            z-index: 1000;
            box-sizing: border-box;
            gap: 20px;
            background-color: rgba(79, 76, 88, 0.19);
            backdrop-filter: blur(10px);
        }

        .logo-link {
            cursor: pointer;
        }

        .div-nav-links.active {
            left: 0;
        }
    }
</style>