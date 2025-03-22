import styles from "./avatarSelector.module.css";


function AvatarSelector({ avatar, selectedAvatar, useAvatar }) {

    const handleAvatarChange = () => {
        useAvatar(avatar.id);
    };

    const isSelected = selectedAvatar === avatar.id;


    return (
        <>
            {avatar ? (
                <section>
                    <div className={styles.all}>
                        <input
                            type="radio"
                            id={`avatar-${avatar.id}`}
                            name="avatar"
                            value={avatar.url}
                            checked={isSelected}
                            onChange={handleAvatarChange}
                            style={{ display: "none" }}
                        />

                        <label htmlFor={`avatar-${avatar.id}`} className={styles.avatarLabel}>
                            <img
                                className={isSelected ? styles.selected : styles.unselected}
                                src={avatar.url}
                                alt={`Avatar ${avatar.id}`}
                            />
                        </label>
                    </div>
                </section>
            ) : (
                <section>
                    <p>No Avatar</p>
                </section>
            )}
        </>
    );
}

export default AvatarSelector;
