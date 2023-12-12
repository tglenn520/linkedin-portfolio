import React, { useEffect, useState } from "react";
import "./Feed.css";
import CreateIcon from "@mui/icons-material/Create";
import InputOption from "./InputOption";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import VideocamIcon from "@mui/icons-material/Videocam";
import EventIcon from "@mui/icons-material/Event";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import Post from "./Post";
import {
  db,
  colRef,
  onSnapshot,
  addDoc,
  serverTimestamp,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "./firebase";
import { selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";
import FlipMove from "react-flip-move";

function Feed() {
  const user = useSelector(selectUser);
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);

  const q = query(colRef, orderBy("timestamp", "desc"));

  useEffect(() => {
    // FETCH Subscription data to firestore collection async
    onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  // ADD DOC async
  const sendPost = (e) => {
    e.preventDefault();
    addDoc(colRef, {
      name: user.displayName,
      description: user.email,
      message: input,
      photoUrl: user.photoUrl || "",
      timestamp: serverTimestamp(),
    }).then(() => {
      setInput(" ");
    });
  };
  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <CreateIcon />
          <form>
            <input
              className="input__input"
              type="text"
              placeholder="say something nice"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendPost} type="submit">
              Send
            </button>
          </form>
        </div>
        <div className="inputOptions">
          <InputOption Icon={InsertPhotoIcon} title="Photo" color="#70B5F9" />
          <InputOption Icon={VideocamIcon} title="Video" color="#E7A33E" />
          <InputOption Icon={EventIcon} title="Event" color="#C0CBCD" />
          <InputOption
            Icon={NewspaperIcon}
            title="Write aritcle"
            color="#7FC15E"
          />
        </div>
      </div>

      {/* POSTS */}
      <FlipMove>
        {posts.map(({ id, data: { name, description, message, photoUrl } }) => (
          <Post
            key={id}
            name={name}
            description={description}
            message={message}
            photoUrl={photoUrl}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
