import React, { useState, useEffect } from 'react';
import styles from "./cards.module.css";

const diceFaces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

const DiceRoller = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [face, setFace] = useState('🎲');

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 600);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const rollDice = () => {
        const randomIndex = Math.floor(Math.random() * 6);
        setFace(diceFaces[randomIndex]);
    };

    const myStyles = {
        dice: {
            color: '#ffffffc8',
            fontSize: isMobile ? '120px' : '200px',
            marginBottom: isMobile ? "0" : "5%",
            textShadow: "1px 1px 18px  black",
        },
        button: {
            fontSize: '18px',
            fontWeight: "bolder",
            backgroundColor: '#56e546c8',
            color: 'black',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            height: isMobile ? "40px" : "20%",
            width: isMobile ? "40%" : "50%",
            marginLeft: isMobile ? "0" : "7rem",
        },
    };

    return (
        <div className={styles.diceRollerTab}>
            <div style={myStyles.dice}>{face}</div>
            <button style={myStyles.button} onClick={rollDice}>
                Roll Dice
            </button>
        </div>
    );
};

export default DiceRoller;
