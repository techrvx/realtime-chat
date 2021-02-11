import React from "react";
import styled from "styled-components";

// https://www.joshwcomeau.com/react/modern-spacer-gif/
export const Spacer = styled.span`
  display: block;
  width: 1;
  min-width: 1;
  height: ${({ spacing = "md", theme }) => theme.spacings[spacing]};
`;

export const InlineSpacer = styled.span`
  display: inline-block;
  height: 1;
  height-width: 1;
  width: ${({ spacing = "md", theme }) => theme.spacings[spacing]};
`;

export const Heading = styled.h1`
  font-size: ${({ theme }) => theme.font.size.lg};
`;

export const Button = styled.button`
  border: 0;
  padding: ${({ theme }) => `0 ${theme.spacings.md}`};
  line-height: ${({ theme }) => theme.spacings.lg};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.main};
  border-radius: ${({ theme }) => theme.borderRadius.sm};

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: 0;
  }
`;

export const TextButton = styled(Button)`
  color: ${({ theme }) => theme.colors.text};
  font-weight: normal;
  background: none;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border: ${({ theme }) => `solid 1px ${theme.colors.lightGray}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.white};

  ${TextButton} {
    color: ${({ theme }) => theme.colors.lightGray};

    &:hover {
      color: ${({ theme }) => theme.colors.main};
    }
  }
`;

const InputElement = styled.input`
  width: 100%;
  padding: ${({ theme }) => `0 ${theme.font.size.md}`};
  line-height: ${({ theme }) => theme.spacings.lg};
  background: none;
  border: 0;

  &:focus {
    outline: 0;
  }

  ::placeholder {
    color: ${({ theme }) => theme.colors.lightGray};
  }
`;

export const InputText = ({ label, button, ...inputProps }) => {
  return (
    <Label>
      <strong>{label}</strong>
      <Spacer spacing="xs" />
      <InputWrapper>
        <InputElement type="text" {...inputProps} />
        {button}
      </InputWrapper>
    </Label>
  );
};

export const Box = styled.div`
  padding: ${({ theme }) => `${theme.spacings.lg}`};
  border: ${({ theme }) => `solid 1px ${theme.colors.lightGray}`};
  box-shadow: ${({ theme }) =>
    `#eee 0 ${theme.borderRadius.sm} ${theme.borderRadius.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const LayoutCentered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LayoutPageContainer = styled(LayoutCentered)`
  height: 100vh;
`;

export const TextSmall = styled.span`
  color: ${({ theme }) => theme.colors.mediumGray};
  font-size: ${({ theme }) => theme.font.size.sm};
`;

export const Avatar = styled.img`
  display: block;
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.lighterGray};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;
