import React, { useEffect, useState } from "react";

const PostItem = ({ answer, expanded, toggleReadMore, user }) => {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const getShortenedText = (text) => {
    const words = text.split(" ");
    if (words.length > 30) {
      return words.slice(0, 30).join(" ") + "...";
    }
    return text;
  };

  useEffect(() => {
    setIsUpvoted(answer.ansUpV.includes(user._id));
    // console.log(isUpvoted);
    // console.log(answer.ansUpV);
    // console.log(user);
    
    setIsDownvoted(answer.ansDownV.includes(user._id));
  }, [answer]);

  return (
    <div key={answer._id} className="postD">
      <div className="questionB">
        <h2>{answer.ansQuest.questDesc}</h2>
      </div>

      <div className="userAnswerD">
        <div className="userImg">
          {answer.ansUser.profilePic !== "" ? (
            <img className="userAnsPic" src={answer.ansUser.profilePic}></img>
          ) : (
            <img
              className="userAnsPic"
              src="https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
            ></img>
          )}
        </div>
        <div className="userSI">
          <p className="userUsername">{answer.ansUser.username}</p>
          <p className="userProf">{answer.ansUser.profession}</p>
        </div>
      </div>
      <div className="answerS">
        <p
          dangerouslySetInnerHTML={{
            __html: expanded
              ? answer.ansDesc
              : getShortenedText(answer.ansDesc),
          }}
        ></p>
        {answer.ansDesc.split(" ").length > 30 && (
          <p className="readA" onClick={() => toggleReadMore(answer._id)}>
            {expanded ? "Read Less" : "Read More"}
          </p>
        )}
      </div>
      {answer.ansPic !== "" && <img src={answer.ansPic} alt="Answer" />}

      <div className="engageD">
        <div className="upvoteD">
          <i
            className={
              isUpvoted ? "fa-solid fa-thumbs-up" : "fa-regular fa-thumbs-up"
            }
          ></i>
          <p>{answer.ansUpV.length}</p>
        </div>
        <div className="downvoteD">
          <i
            className={
              isDownvoted
                ? "fa-solid fa-thumbs-down"
                : "fa-regular fa-thumbs-down"
            }
          ></i>
          <p>{answer.ansDownV.length}</p>
        </div>
        <div className="commentD">
          <i className="fa-regular fa-comment"></i>
          <p>{answer.comments.length}</p>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
