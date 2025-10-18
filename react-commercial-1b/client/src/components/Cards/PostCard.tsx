import { useEffect, useState, useRef } from "react";
import type { JSX } from "react";
import CommentButton from "../Buttons/CommentButton";
import LikeButton from "../Buttons/LikeButton";
import ShareButton from "../Buttons/ShareButton";
import CommentsCard from "./CommentsCard";
import styles from "./postCard.module.css";
import PostService from "../../services/PostService";
import DeleteService from "../../services/DeleteService";
import Carousel from "./PostCardCarousel";
import SlideButton from "../Buttons/SlideButton";

interface Like {
  id: number;
  kind: "post" | "comment";
  kindID: number;
  user: string;
}

interface Comment {
  id: number;
  username: string;
  text: string;
  kind: string;
  kindID: number;
}

interface Post {
  id: number;
  label: string;
  text: string;
  imgLink: string;
}

interface LikedItem {
  id: number | string;
  liked: boolean;
  user: string;
}

interface PostCardProps {
  posts: Post[];
  comments: Comment[];
  user: string;
  likes: Like[];
}

function PostCard({ posts, comments, user, likes }: PostCardProps): JSX.Element {
  const [postLikes, setPostLikes] = useState<Like[]>([]);
  const [commentLikes, setCommentLikes] = useState<Like[]>([]);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [commentVis, setCommentVis] = useState<Record<string | number, boolean>>({});
  const [liked, setLiked] = useState<LikedItem[]>([]);
  const [likeCount, setLikeCount] = useState<Record<string | number, number>>({});
  const [commentCount, setCommentCount] = useState<Record<string | number, number>>({});
  const CarouselRef = useRef<{next: () => void; prev: () => void}>(null);

  const handleData = ({ id, counter }: { id: string | number; counter: number }) => {
    setCommentCount(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + counter,
    }));
  };

  useEffect(() => {
    const count: Record<string | number, number> = {};

    posts.forEach(post => {
      count[post.id] = 0;
    });

    posts.forEach(post => {
      postComments.forEach(comment => {
        if (comment.kindID === post.id) {
          count[comment.kindID] += 1;
        }
      });
    });

    setCommentCount(count);
  }, [postComments, posts]);

  useEffect(() => {
    const filteredLikesByPost: Like[] = [];
    const filteredLikesByComment: Like[] = [];

    likes.forEach(like => {
      if (like.kind === "post") filteredLikesByPost.push(like);
      else if (like.kind === "comment") filteredLikesByComment.push(like);
    });

    setPostLikes(filteredLikesByPost);
    setCommentLikes(filteredLikesByComment);
  }, [likes]);

  useEffect(() => {
    const filteredCommentsByPost = comments.filter(comment => comment.kind === "post");
    setPostComments(filteredCommentsByPost);
  }, [comments]);

  useEffect(() => {
    const filteredLiked: LikedItem[] = [];
    const count: Record<string | number, number> = {};

    posts.forEach(post => {
      count[post.id] = 0;
    });

    postLikes.forEach(like => {
      count[like.kindID] = (count[like.kindID] || 0) + 1;
      filteredLiked.push({ id: like.kindID, liked: like.user === user, user: like.user });
    });

    setLikeCount(count);
    setLiked(filteredLiked);
  }, [postLikes, user, posts]);

  useEffect(() => {
    const vis: Record<string | number, boolean> = {};

    posts.forEach(post => {
      vis[post.id] = false;
    });

    setCommentVis(vis);
  }, [comments, posts]);

  const toggleCommentVis = (id: string | number) => {
    setCommentVis(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };  

  const handleLike = async (kind: "post" | "comment", id: string | number) => {
    try {
      if (user !== "Guest") {
        const existingLike = liked.find(like => like.user === user && like.id === id);

        if (!existingLike) {
          await PostService.postLikeData(kind, id, user);
          setLikeCount(prev => ({
            ...prev,
            [id]: (prev[id] || 0) + 1,
          }));

          setLiked(prev => [...prev, { id, liked: true, user }]);
        } else {
          await DeleteService.deleteLikeData(kind, id, user);
          setLikeCount(prev => ({
            ...prev,
            [id]: Math.max((prev[id] || 1) - 1, 0),
          }));
          setLiked(prev => prev.filter(like => like.id !== id || like.user !== user));
        }
      }
    } catch (err) {
      console.log((err as any)?.response, `Cannot like/unlike this ${kind}`);
    }
  }; 

  const handleCarousel = (choice: string) => {
    if (choice === "prev") CarouselRef.current?.prev();
    if (choice === "next") CarouselRef.current?.next();
  };

  return (
    <div>
      {posts.length > 0 ? (
        <Carousel ref={CarouselRef}>
          {posts.map((post, index) => (
            <div key={index} className={styles.card}>
              
              
              <div className={styles.all}>                 
                <SlideButton
                  slot=""
                  onClick={() => handleCarousel("prev")}
                  type="prev"
                  size={3}
                />
                <div>
                  <img src={post.imgLink} className={styles.image} alt="Post Image" />
                  <br /><br />
                  <label className={styles.label}>{post.label}</label>
                  <br />
                  <div
                    className={styles.text}
                    dangerouslySetInnerHTML={{ __html: post.text }}
                  />
                  <div className={styles.interactionContainer}>
                    <div className={styles.interaction}>
                      <LikeButton
                        slot={likeCount[post.id] || 0}
                        onClick={() => handleLike("post", post.id)}
                        size={3.3}
                      />
                      <CommentButton
                        slot={commentCount[post.id] || 0}
                        onClick={() => toggleCommentVis(post.id)}
                        size={3}
                      />
                      <ShareButton 
                        slot="" 
                        size={3.3}
                      />
                    </div>
                  </div>
                </div>
       
                <SlideButton
                  slot=""
                  onClick={() => handleCarousel("prev")}
                  type="next"
                  size={3}
                />
              </div>
              {commentVis[post.id] && (
                <CommentsCard
                  comments={postComments.filter(
                    (comment) => comment.kindID === post.id
                  )}
                  likes={commentLikes}
                  user={user}
                  postID={post.id}
                  sendData={handleData}
                />
              )}
            </div>
          ))}
        </Carousel>
      ) : (
        <p>No posts yet.</p>
      )}
    </div>
  );

}

export default PostCard;
