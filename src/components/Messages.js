import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { InlineSpacer, Spacer, TextSmall, Avatar } from "components";
import { getUIAvatarsUrl } from "utils";

const MessagesList = styled.ul`
  max-height: 600px;
  overflow: auto;
  margin: 0;
  padding: 0;
`;

const MessageItem = styled.li`
  display: flex;
  padding-bottom: ${({ theme }) => theme.font.size.md};
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: ${({ theme }) => theme.font.size.md};
`;

const MessageHeadline = styled.div`
  display: flex;
  align-items: baseline;
`;

const MessageLine = styled.div`
  padding-top: ${({ theme }) => theme.spacings.xs};
`;

const MessageImg = styled.img`
  min-width: 200px;
  min-height: 100px;
  background: ${({ theme }) => theme.colors.lighterGray};
`;

const Message = ({ message: { username, timeString, contents } }) => {
  const AvatarSrc = getUIAvatarsUrl(encodeURI(username));
  return (
    <MessageItem>
      <Avatar src={AvatarSrc} />
      <MessageContent>
        <MessageHeadline>
          <strong>{username}</strong>
          <InlineSpacer spacing="sm" />
          <TextSmall>{timeString}</TextSmall>
        </MessageHeadline>
        {contents.map((content, i) =>
          content.type === "text" ? (
            <MessageLine key={i}>{content.text}</MessageLine>
          ) : (
            <MessageImg src={content.url} alt={content.alt} key={i} />
          )
        )}
      </MessageContent>
    </MessageItem>
  );
};

const PlaceholderBlock = styled.div`
  width: ${({ width = "40" }) => `${width}px`};
  height: ${({ height = "40" }) => `${height}px`};
  background: ${({ theme }) => theme.colors.lighterGray};
`;

const AvatarPlaceholder = styled(PlaceholderBlock)`
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

const MessagePlaceholder = () => (
  <MessageItem>
    <AvatarPlaceholder />
    <MessageContent withoutHeadline>
      <MessageHeadline>
        <PlaceholderBlock width="32" height="14" />
        <InlineSpacer spacing="sm" />
        <PlaceholderBlock width="40" height="14" />
        <InlineSpacer spacing="sm" />
        <PlaceholderBlock width="24" height="12" />
      </MessageHeadline>
      <Spacer spacing="sm" />
      <MessageLine>
        <PlaceholderBlock width="80" height="14" />
      </MessageLine>
      <MessageLine>
        <PlaceholderBlock width="60" height="14" />
      </MessageLine>
    </MessageContent>
  </MessageItem>
);

const getTimeString = (time) =>
  new Date(time)
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
    .toLowerCase();

const groupMessages = (messages) =>
  messages.reduce((acc, message, i) => {
    const latestMessage = acc[acc.length - 1];
    const timeString = getTimeString(message.time);

    const isSameAuthor = latestMessage?.username === message.username;
    const isSameTimeString = latestMessage?.timeString === timeString;

    const content =
      message.type === "text"
        ? { type: message.type, text: message.text }
        : { type: message.type, url: message.url, alt: message.alt };

    if (isSameAuthor && isSameTimeString) {
      latestMessage.contents.push(content);
    } else {
      acc.push({
        username: message.username,
        timeString,
        contents: [content],
      });
    }

    return acc;
  }, []);

export const Messages = ({ messages, isLoading }) => {
  const messagesListRef = useRef(null);

  const scrollToBottom = () => {
    const element = messagesListRef.current;
    if (element) {
      element.scrollTo(0, element.scrollHeight);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [isLoading, messages]);

  return isLoading ? (
    <MessagePlaceholder />
  ) : messages.length ? (
    <MessagesList ref={messagesListRef}>
      {groupMessages(messages).map((message, i) => (
        <Message message={message} key={i} />
      ))}
    </MessagesList>
  ) : (
    <>
      <TextSmall>No messages yet, be the first!</TextSmall>
      <Spacer spacing="md" />
    </>
  );
};
