import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import type { NewsData, Post, Like, Comment } from "../../types/types.ts";
import GetService from "../../services/GetService";
import Heading from "../../layouts/Heading/Heading";
import PostCard from "../../components/Cards/PostCard";
import ErrorLoad from "../../components/Other/ErrorLoad.tsx";

const News: React.FC = () => {    
    const [user, setUser] = useState < string > ("");
    const [cookies] = useCookies(["auth_token"]);
    const [posts, setPosts] = useState < Post[] > ([]);
    const [comments, setComments] = useState < Comment[] > ([]);
    const [likes, setLikes] = useState < Like[] > ([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchData = async () => {
            try {
                const data: NewsData = await GetService.getNewsData(cookies.auth_token);                        
                setUser(data.user || "Guest");
                setPosts(data.posts || []);
                setComments(data.comments || []);
                setLikes(data.likes || []);
            } catch (err) {                
                setUser("Guest");
                setPosts([]);
                setComments([]);
                setLikes([]);
                setError("No Posts Yet");
            }
        };

        fetchData();
    }, [cookies.auth_token]);  

    return (<>
        <Heading heading={"Our News"} />
        <div className="body">
            {error ? (<ErrorLoad error={error}/>) : (<PostCard posts={posts} comments={comments} user={user} likes={likes} />)}
            
        </div>
    </>);
};

export default News;
