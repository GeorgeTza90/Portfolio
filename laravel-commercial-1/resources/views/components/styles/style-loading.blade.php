<style>
    #loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(255, 255, 255, 0.85);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        color: #333;
    }

    .spinner::after {
        content: "⏳";
        font-size: 2rem;
        margin-left: 10px;
        animation: pulse 1s infinite;
    }

    @keyframes pulse {
        0% {
            opacity: 0.3;
        }

        50% {
            opacity: 1;
        }

        100% {
            opacity: 0.3;
        }
    }
</style>