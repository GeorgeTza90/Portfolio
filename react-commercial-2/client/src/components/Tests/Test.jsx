
function Test() {
    const instruments = {
        inst1: "drums",
        inst2: "bass",
        inst3: "guitars",
        inst4: "keys",
        inst5: "vox"
    };
    const instrSTR = JSON.stringify(instruments);
    const instrPRS = JSON.parse(instrSTR);

    const urls = {
        inst1_url: "/Neperia/Minokawa/Minokawa_Drums.mp3",
        inst2_url: "/Neperia/Minokawa/Minokawa_Bass.mp3",
        inst3_url: "/Neperia/Minokawa/Minokawa_Guitars.mp3",
        inst4_url: "/Neperia/Minokawa/Minokawa_Keys.mp3",
        inst5_url: "/Neperia/Minokawa/Minokawa_Vox.mp3",
        img_url: "/Neperia/Minokawa/Minokawa_Img.jpg",
    }

    const urlsSTR = JSON.stringify(urls);

    return (
        <>
            {urlsSTR}
            <br /><br /><br />
            {instrSTR}
        </>
    );
}


export default Test;