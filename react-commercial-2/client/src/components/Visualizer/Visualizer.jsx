import React, { useEffect, useRef } from "react";


const Visualizer = ({ analyser }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (analyser && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");

            const draw = () => {
                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);

                analyser.getByteFrequencyData(dataArray);

                // Clear the canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Draw bars for each frequency
                const barWidth = (canvas.width / bufferLength) * 0.7;
                let x = 0;

                for (let i = 20; i < bufferLength; i++) {
                    const barHeight = dataArray[i];
                    ctx.fillStyle = `rgb(${barHeight + 100}, 250, 250)`; // Color based on bar height
                    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                    x += barWidth + 3;
                }

                // Keep animating the visualization
                requestAnimationFrame(draw);
            };

            draw();
        }
    }, [analyser]);


    return (
        <div>
            <canvas ref={canvasRef} width={300} height={170}></canvas>
        </div>
    );
};

export default Visualizer;
