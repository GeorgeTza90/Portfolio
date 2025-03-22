import styles from "./Playlist.module.css";


function Playlist({ songs, onSelectTrack }) {
    const handleSelectTrack = (id) => {
        onSelectTrack(id);
    };


    return (
        <div className={styles.all}>
            <label className={styles.myLabel}>Playlist</label><br /><br />
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Artist</th>
                        <th>Song</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        songs.map((song, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{song.artist}</td>
                                    <td>{song.title}</td>
                                    <td onClick={() => { handleSelectTrack(index) }} className={styles.selectTrack}>▶</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Playlist;
