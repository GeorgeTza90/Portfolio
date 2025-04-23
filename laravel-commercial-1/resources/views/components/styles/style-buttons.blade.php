<?php
$boxRadius = "15px";
$navColor = 'rgba(79, 76, 88, 0.4)';
$buttonColor = 'rgb(209, 84, 59)';
?>

<style>
    .search-button {
        padding: 10px;
        min-width: 30px;
        max-width: 130px;
        background-color: rgba(255, 255, 255, 0.89);
        color: #101311;
        border: solid #101311 1px;
        border-radius: 20px;
    }

    .search-button-2 {
        padding: 10px;
        max-width: 200px;
        background-color: rgba(255, 255, 255, 0.89);
        color: #101311;
        border: solid #101311 1px;
        border-radius: 5px;
    }


    .form-button {
        border-radius: 0.375rem;
        background-color:
            {{ $buttonColor }}
        ;
        padding-left: 0.75rem;
        padding-right: 0.75rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        font-size: 0.875rem;
        font-weight: 600;
        color: white;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
        transition: background-color 0.3s ease;
    }

    .logout-button {
        font-size: 85%;
        width: 85px;
        height: auto;
        background-color: rgba(198, 202, 214, 0);
        border: hsla(140, 8.60%, 6.90%, 0.00);
        color: white;
        cursor: pointer;
        padding: 19%;
    }

    .cancel {
        font-size: 0.875rem;
        font-weight: 600;
        line-height: 1.5rem;
        color: rgba(198, 202, 214, 0.5);
    }

    .buy-button-div {
        display: flex;
        justify-content: center;
    }

    .buy-button {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 1px solid rgb(16, 19, 17);
        border-radius: 50%;
        background-color: rgb(255, 255, 255);
        height: 50px;
        width: auto;
        padding: 50px;
        box-shadow: 2px 2px 4px rgb(0, 0, 0);
        font-weight: bolder;
        color: rgb(224, 122, 101);
    }

    /* HOVERs */
    .form-button:hover {
        background-color: rgb(224, 122, 101);
    }

    .logout-button:hover {
        background-color: rgba(168, 166, 176, 0.41);
        box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.59);
        border-radius: 12px;
    }

    .buy-button:hover {
        background-color: rgb(224, 122, 101);
        color: rgb(255, 255, 255);
    }
</style>