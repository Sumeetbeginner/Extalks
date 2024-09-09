import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../navbar/Navbar";
import Cookies from "js-cookie";
import PostItem from "./PostItem";
import "./home.css";
import "./mhome.css";

const Home = () => {
  // State and refs
  const [isBottom, setIsBottom] = useState(false);
  const divRef = useRef(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [sortM, setSortM] = useState("newest");
  const [hasMore, setHasMore] = useState(true);
  const [expandedAnswers, setExpandedAnswers] = useState({});

  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();

  // Scroll handling
  const handleScroll = () => {
    if (!divRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = divRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
  };

  useEffect(() => {
    const divElement = divRef.current;
    if (divElement) {
      divElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (divElement) {
        divElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleSortChange = (event) => {
    setSortM(event.target.value);
    setPage(1);
    setAnswers([]);
    setHasMore(true);
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("jwt");
      const response = await fetch(
        `http://localhost:3001/others/feed?page=${page}&sort=${sortM}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setPage((prevPage) => prevPage + 1);

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setAnswers((prevAnswers) => {
          const existingIds = new Set(prevAnswers.map((answer) => answer._id));
          const filteredData = data.filter(
            (answer) => !existingIds.has(answer._id)
          );

          return [...prevAnswers, ...filteredData];
        });
      }
    } catch (error) {
      console.error("Error fetching answers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasMore) {
      fetchPosts();
    }
  }, [isBottom, sortM]);

  const toggleReadMore = (id) => {
    setExpandedAnswers((prevExpanded) => ({
      ...prevExpanded,
      [id]: !prevExpanded[id],
    }));
  };

  return (
    <div>
      <div className="pcbhai">
        <div className="topNavbar onlymobile">
          <i onClick={() => navigate("/settings")} className="fas fa-cog"></i>

          {user.profilePic !== "" ? (
            <img
              onClick={() => navigate("/profile")}
              src={user.profilePic}
              alt="Profile Picture"
            />
          ) : user.gender === false ? (
            <img
              onClick={() => navigate("/profile")}
              src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
              alt="Default Male Avatar"
            />
          ) : (
            <img
              onClick={() => navigate("/profile")}
              src="https://cdn-icons-png.flaticon.com/128/4140/4140047.png"
              alt="Default Female Avatar"
            />
          )}
        </div>

        <div className="sorting">
          <select id="sort" value={sortM} onChange={handleSortChange}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="mostLiked">Most Liked</option>
            <option value="relevance">Relevance</option>
          </select>
        </div>

        <div className="feedBox" ref={divRef} onScroll={handleScroll}>
          <div className="answers-list">
            {answers.length > 0 ? (
              answers.map((answer) => (
                <PostItem
                  key={answer._id}
                  answer={answer}
                  expanded={expandedAnswers[answer._id]}
                  toggleReadMore={toggleReadMore}
                  user={user} // Pass the user prop
                />
              ))
            ) : (
              <div>No answers found</div>
            )}
          </div>

          {loading && <div className="lastIn">Loading Posts...</div>}
          {!hasMore && <div className="lastIn">No more answers</div>}
        </div>
      </div>
    </div>
  );
};

export default Home;
