import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { SOCKET_SERVER_URL, getUIAvatarsUrl, getGiphyApiUrl } from "utils";

export const useAvatarSource = (name) => {
  const [source, setSource] = useState(null);
  const encodedName = encodeURI(name);

  const UI_AVATARS_URL = getUIAvatarsUrl(encodedName);

  useEffect(() => {
    fetch(UI_AVATARS_URL)
      .then((res) => res.blob())
      .then((data) => setSource(URL.createObjectURL(data)));
  }, [UI_AVATARS_URL]);

  return source;
};

export const useChat = (username) => {
  const [isUserOnline, setIsUserOnline] = useState(false);
  const [messages, setMessages] = useState([]);
  const [typers, setTypers] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, {
      query: { username },
      transports: ["websocket"],
    });

    socketRef.current.on("user-connected", (newUsername) => {
      console.info("WS: user-connected");
      console.info(username);
      if (username === newUsername) setIsUserOnline(true);
    });

    return () => {
      socketRef.current.emit("typing", false);
      socketRef.current.disconnect();
    };
  }, [username]);

  useEffect(() => {
    socketRef.current.on("connect_error", (e) => {
      console.error("WS: connect_error");
      console.error(e);
    });

    socketRef.current.on("disconnect", () => {
      console.info("WS: disconnect");
      console.info(socketRef.current.id);
    });

    socketRef.current.on("user-disconnected", (username) => {
      console.info("WS: user-disconnected");
      console.info(username);
    });

    socketRef.current.on("is-typing", (typers) => {
      setTypers(Object.keys(typers).filter((typer) => typers[typer] === true));
    });

    socketRef.current.on("message", (message) => {
      setMessages((messages) => {
        return [...messages, message];
      });
    });
  }, []);

  const sendTextMessage = (text) => {
    socketRef.current.emit("text-message", text);
  };

  const sendImageMessage = async (query) => {
    const GIPHY_API_URL = getGiphyApiUrl(query);
    const url = await fetch(GIPHY_API_URL)
      .then((res) => res.json())
      .then((gifObject) => gifObject.data[0].images.fixed_width.url);

    socketRef.current.emit("image-message", {
      url,
      alt: query,
    });
  };

  const sendMessage = (message) => {
    const isGiphyCommand = message.startsWith("/giphy ");
    if (isGiphyCommand) {
      const query = message.slice(7);
      sendImageMessage(query);
    } else {
      sendTextMessage(message);
    }
  };

  const sendTypingStatus = (status) => {
    socketRef.current.emit("typing", status);
  };

  return {
    isUserOnline,
    messages,
    typers,
    sendMessage,
    sendTypingStatus,
  };
};
