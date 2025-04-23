<?php
$boxRadius = "15px";
$navColor = 'rgba(79, 76, 88, 0.4)';
$buttonColor = 'rgb(209, 84, 59)';
?>

<style>
    /* General FORMs*/
    .form-container-1 {
        display: block;
    }

    .form-container-2 {
        display: block;
    }

    .form-container-3 {
        margin-top: 3.2rem;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 0 2rem;
    }

    .register-form {
        background-color:
            {{$navColor}}
        ;
        border-radius:
            {{$boxRadius}}
        ;
        box-shadow: 2px 2px 12px rgb(0, 0, 0);
        padding: 50px;
        backdrop-filter: blur(1px);
    }

    .form-input {
        display: block;
        flex: 1;
        border: 0;
        background-color: rgb(255, 255, 255);
        padding-top: 0.375rem;
        padding-bottom: 0.375rem;
        padding-left: 0.75rem;
        padding-right: 0.75rem;
        font-weight: bold;
        letter-spacing: 1px;
        color: rgb(0, 0, 0);
        font-size: 0.875rem;
    }

    .form-field {
        font-size: medium;
        color: rgb(255, 255, 255);
    }


    /* OTHERs */
    .div-form-input {
        display: flex;
        border-radius: 0.375rem;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
        border: 1px solid #d1d5db;
    }

    .error {
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

    .errors {
        color: rgb(255, 82, 82);
    }


    /* HOVERs */
    .error:hover {
        background-color:
            {{ $buttonColor }}
        ;
    }


    /* PLACEHOLDERs */
    .form-input::placeholder {
        color: rgb(16, 21, 18);
    }


    /* FOCUS */
    .div-form-input:focus {
        border: 2px solid
            {{ $buttonColor }}
        ;
        border-radius: 0.375rem;
        box-shadow: 0 0 0 1px
            {{ $buttonColor }}
            inset;
    }

    .form-input:focus {
        outline: none;
    }

    .error:focus-visible {
        outline: 2px solid
            {{ $buttonColor }}
        ;
        outline-offset: 2px;
        outline-color:
            {{ $buttonColor }}
        ;
    }

    .form-button:focus-visible {
        outline: 2px solid
            {{ $buttonColor }}
        ;
        outline-offset: 2px;
        outline-color:
            {{ $buttonColor }}
        ;
    }


    @media (min-width: 640px) {

        .div-form-input {
            max-width: 50rem;
        }

        .form-field {
            grid-column: span 4;
        }

        .form-container-1 {
            grid-template-columns: repeat(6, 1fr);
        }

        .form-container-2>*+* {
            margin-top: 3.5rem;
        }
    }
</style>