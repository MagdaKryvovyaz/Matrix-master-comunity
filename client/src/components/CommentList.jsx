import ProfileImgName from "./ProfileImgName";
import { useAuthContext } from "../hooks/useAuthContext";

export default function CommentList({ handleDeleteComment, question }) {
  const { user } = useAuthContext();

  return (
    <ul className="list-group mt-5">
      {question &&
        question.comments.slice().reverse().map((comment, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between"
          >
            <div className="ms-2 me-auto w-100">
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <ProfileImgName profile={comment.user} />
                </div>
                <p className="time mb-1">
                  {comment.created_time}
                  <br />
                  {comment.created_date}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-end gap-2">
                <p className="description text-start">{comment.content}</p>
                <div>
                  {user && user.id === comment.user._id && (
                    <button
                      id="deleteCommentBtn"
                      type="button"
                      className="btn btn-1 btn-w"
                      onClick={() => handleDeleteComment(comment._id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
}
