import { useEffect, useCallback, useState } from "react";
import NavBar from "./NavBar";

const PublicPosts = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = useCallback(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "posts/public", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        console.log("data: ", data);
        setPosts(data);
      } else {
        if (response.status === 401) {
          console.log("something wrong is going on.");
        } else {
          console.log("i dont know.");
        }
      }
    });
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  console.log("posts: ", posts);

  return (
    <div>
      <NavBar />
      <h1>Public posts</h1>
      {posts.map((post) => {
        return (
          <div key={post.id} style={{ background: "hotpink", margin: "15px" }}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        );
      })}
    </div>
  );
};

export default PublicPosts;
