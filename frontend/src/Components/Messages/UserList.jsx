import React, { useEffect, useState } from "react";
import "../../styles/UserList.css";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const lastMessage = [
    "Hey! How are you?",
    "See you tomorrow!",
    "Can we reschedule? This is on very urgent basis",
  ];

  const { users } = useSelector((state) => state.getOtherUsers);
  const { chatUsers } = useSelector((state) => state.chatUsers);
  const navigate = useNavigate();

  const handleClick = (user) => {
    navigate(`/messages/${user._id}`);
  };

  useEffect(() => {
    if (chatUsers && users) {
      // console.log("Chat Users: ", chatUsers);
      if (users.length === 0) return;

      const filter = searchTerm.trim() === "" ? chatUsers : users;

      const filteredUser = filter.filter(
        (user) => user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // console.log("object", filteredUser);

      setFilteredUsers(filteredUser);
    }
  }, [searchTerm, chatUsers, users]);

  return (
    <div className="user-list">
      <h3 className="user-list-title">Chats</h3>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search..."
        className="user-search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="user-list-items">
        {filteredUsers.map((user, index) => (
          <li
            key={user._id}
            className="user-item"
            onClick={() => handleClick(user)}
          >
            <div
              className="user-avatar"
              style={{ backgroundImage: `url(${user?.avatar?.url})` }}
            ></div>
            <div className="user-info">
              <h4 className="user-name">{user?.username}</h4>
              <p className="user-last-message">{lastMessage[index % 3]}</p>
            </div>
            <div className="user-meta">
              <span className="last-message-time">
                {timeAgo(user.updatedAt)}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
