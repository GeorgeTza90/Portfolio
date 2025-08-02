import { useState } from "react";
import Weapons from "../../data/weapons.json";
import styles from "../../components/cards/cards.module.css";
import RemoveButton from "../../components/buttons/RemoveButton.jsx";

function ChooseWeapon({ onRemove, onAdd, weaponLevel }) {
    const { weaponList, weaponStats, ultimateWeaponList } = Weapons;

    const [selectedWeapon, setSelectedWeapon] = useState(null);
    const [selectedWeaponLevel, setSelectedWeaponLevel] = useState(null);
    const [weaponsList, setWeaponsList] = useState([]);
    const [selectingWeapon, setSelectingWeapon] = useState(true);

    const handleConfirmAddWeapon = () => {
        if (!selectedWeapon) return;

        const stats = ultimateWeaponList.includes(selectedWeapon)
            ? weaponStats?.[selectedWeapon] || {}
            : weaponStats[selectedWeapon]?.[weaponLevel] || {};
        const text = `Spend ${stats.cost} ${stats.costType || ""}. ${stats.ability} ${stats.use}.`;

        const newWeapon = {
            name: selectedWeapon,
            text,
        };

        onAdd(newWeapon);
        setSelectingWeapon(false);
        setSelectedWeapon("");
        setSelectedWeaponLevel("");
    };

    return (
        <div className={styles.selectCard2}>
            <select
                className={styles.enemyDropdown}
                value={selectedWeapon || ""}
                onChange={(e) => setSelectedWeapon(e.target.value)}
            >
                <option value="" disabled hidden>
                    Choose Weapon...
                </option>
                {weaponList.map((weaponName) => (
                    <option key={weaponName} value={weaponName}>
                        {weaponName}
                    </option>
                ))}
            </select>

            {selectedWeapon && (
                <button className={styles.confirmButton} onClick={handleConfirmAddWeapon}>
                    Add
                </button>
            )}

            <RemoveButton slot="X" alt="cancel" onClick={onRemove} fontSize="1rem" />
        </div >
    );
}

export default ChooseWeapon;
