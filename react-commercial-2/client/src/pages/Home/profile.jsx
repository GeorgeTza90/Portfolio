import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Heading from "../../layouts/Heading/Heading";
import GetService from "../../services/GetService";
import ProfileSettings from "../../components/Forms/ProfileSettings";


function Profile() {
    const [heading, setHeading] = useState("");
    const [user, setUser] = useState("");
    const [avatars, setAvatars] = useState("");
    const [songs, setSongs] = useState("");
    const [cookies] = useCookies("auth_token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GetService.getProfileData(cookies.auth_token);
                setUser(data.user);
                setAvatars(data.avatars);
                setSongs(data.songs);
                setHeading(data.heading);

            } catch (err) {
                console.error("Error fetching home:", err);
                setUser("Guest");
                setAvatars(null);
                setSongs(null);
                setHeading(`Welcome Guest`);
            }
        };

        fetchData();
    }, []);


    return (
        <>
            <Heading heading={heading} />

            <div className="body-1">
                <ProfileSettings user={user ? user : ""} avatars={avatars ? avatars : ""} songs={songs ? songs : ""} />
            </div>
        </>
    );
}

export default Profile;
