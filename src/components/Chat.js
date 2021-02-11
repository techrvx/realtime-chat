import React, { useState } from "react";
import styled from "styled-components";
import { Spacer, TextButton, InputText, TextSmall } from "components";
import { Messages } from "components/Messages";
import { useChat } from "hooks";

const Typers = styled(TextSmall)`
  display: block;
  height: 18px;
`;

export const Chat = ({ username }) => {
  const {
    isUserOnline,
    messages,
    typers,
    sendMessage,
    sendTypingStatus,
  } = useChat(username);

  const [message, setMessage] = useState("");

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  };

  const typersMessage =
    typers.length === 1
      ? `${typers[0]} is typing...`
      : typers.length > 1
      ? "People are typing..."
      : "";

  return (
    <>
      <Messages messages={messages} isLoading={!isUserOnline} />
      <form onSubmit={handleFormSubmit}>
        <InputText
          placeholder="Message"
          button={<TextButton type="submit">Send</TextButton>}
          onChange={handleMessageChange}
          onFocus={() => sendTypingStatus(true)}
          onBlur={() => sendTypingStatus(false)}
          value={message}
          required
        />
      </form>
      <Spacer spacing="sm" />
      <Typers>{typersMessage}</Typers>
    </>
  );
};
