import { useEffect, useCallback, useState, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import NavBar from "./NavBar";

const PrivatePosts = () => {
  // const [authContext, setAuthContext] = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const { token } = useContext(AuthContext);

  console.log("token from context: ", token);

  const fetchPosts = useCallback(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "posts/private", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(async (response) => {
      // console.log("fetchposts .then");
      if (response.ok) {
        // console.log("fetchposts OK");
        const data = await response.json();
        console.log("data from posts/private in ui: ", data);
        // setPosts(data);
        setPosts([]); // tmp
      } else {
        // console.log("fetchposts PROBLEM");
        if (response.status === 401) {
          // console.log("fetchposts PROBLEM A");
          // console.log("something wrong is going on.");
        } else {
          // console.log("fetchposts PROBLEM B");
          // console.log("i dont know.");
        }
      }
    });
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // console.log("posts: ", posts);

  return (
    <div>
      <NavBar />
      <h1>Private posts</h1>
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

export default PrivatePosts;
