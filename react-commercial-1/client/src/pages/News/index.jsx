import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import GetService from "../../services/GetService";
import Heading from "../../layouts/Heading/Heading";
import PostCard from "../../components/Cards/PostCard"


function News() {
  const [heading, setHeading] = useState("");
  const [user, setUser] = useState("");
  const [cookies] = useCookies("auth_token");
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetService.getNewsData(cookies.auth_token);
        setHeading(data.heading || "Our News");
        setUser(data.user || "Guest");
        setPosts(data.posts || []);
        setComments(data.comments || []);
        setLikes(data.likes || []);
      } catch (err) {
        console.error("Error fetching news:", err);
        setHeading("Our News");
        setUser("Guest");
        setPosts([]);
        setComments([]);
        setLikes([]);
      }
    };

    fetchData();
  }, [cookies.auth_token]);


  return (
    <>
      <Heading heading={heading} />

      <div className="body">
        <PostCard posts={posts} comments={comments} user={user} likes={likes} />
      </div>
    </>
  );
}

export default News;
