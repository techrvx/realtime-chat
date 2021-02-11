import React from "react";
import { useLocation, Redirect } from "react-router-dom";
import styled from "styled-components";
import { LayoutPageContainer, Box } from "components";
import { Chat } from "components/Chat";

const ChatBox = styled(Box)`
  width: 600px;
  padding: ${({ theme }) =>
    `${theme.spacings.md} ${theme.spacings.md} ${theme.spacings.sm}`};
`;

const ChatRoom = () => {
  const { search } = useLocation();
  const username = new URLSearchParams(search).get("username");
  return username ? (
    <LayoutPageContainer>
      <ChatBox>
        <Chat username={username} />
      </ChatBox>
    </LayoutPageContainer>
  ) : (
    <Redirect to="/login" />
  );
};

export default ChatRoom;
