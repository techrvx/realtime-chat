import React from "react";
import styled from "styled-components";
import { useAvatarSource } from "hooks";
import {
  Heading,
  Spacer,
  Button,
  TextButton,
  InputText,
  Box,
  LayoutCentered,
  TextSmall,
  Avatar,
} from "components";

const UIShowcaseSection = styled.section`
  padding: 40px;
`;

const UIShowcase = () => {
  const source = useAvatarSource("Jim Halpert");

  return (
    <UIShowcaseSection>
      <Heading>UI Library Test Page</Heading>
      <Spacer spacing="lg" />
      <h2>
        <code>Button</code>
      </h2>
      <Spacer spacing="sm" />
      <Button>Next</Button>
      <Spacer spacing="lg" />
      <h2>
        <code>TextButton</code>
      </h2>
      <Spacer spacing="sm" />
      <TextButton>Send</TextButton>
      <Spacer spacing="lg" />
      <h2>
        <code>InputText</code>
      </h2>
      <Spacer spacing="sm" />
      <InputText placeholder="Username" />
      <Spacer spacing="lg" />
      <InputText
        placeholder="InputText with label"
        label="Please enter your username"
      />
      <Spacer spacing="lg" />
      <InputText
        placeholder="InputText with button"
        button={<TextButton type="submit">Send</TextButton>}
      />
      <Spacer spacing="lg" />
      <h2>
        <code>Box</code>
      </h2>
      <Spacer spacing="sm" />
      <Box>Box with some content</Box>
      <Spacer spacing="lg" />
      <h2>
        <code>LayoutCentered</code>
      </h2>
      <Spacer spacing="sm" />
      <LayoutCentered>
        <Box>A centered box</Box>
      </LayoutCentered>
      <Spacer spacing="lg" />
      <h2>
        <code>TextSmall</code>
      </h2>
      <Spacer spacing="sm" />
      <TextSmall>Some small text</TextSmall>
      <Spacer spacing="lg" />
      <h2>
        <code>Avatar</code>
      </h2>
      <Spacer spacing="sm" />
      <Avatar src={source} />
    </UIShowcaseSection>
  );
};

export default UIShowcase;
