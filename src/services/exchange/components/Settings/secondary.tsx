import React, { useContext, useRef, useState } from "react";
import { RowBetween, RowFixed } from "../Row";
import { Settings, X } from "react-feather";
import {
  useDarkModeManager,
  useExpertModeManager,
  useUserDeadline,
  useUserSlippageTolerance,
} from "../../state/user/hooks";
import { useSettingsMenuOpen, useToggleSettingsMenu } from "../../state/application/hooks";

import { AutoColumn } from "../Column";
import { ButtonError } from "../Button";
import Modal from "../Modal";
import QuestionHelper from "../QuestionHelper";
import { TYPE } from "../../theme";
import { Text } from "rebass";
import { ThemeContext } from "styled-components";
import Toggle from "../Toggle";
import TransactionSettings from "../TransactionSettings";
import styled from "styled-components";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

// const StyledMenuIcon = styled(Settings)`
//   height: 20px;
//   width: 20px;

//   > * {
//     stroke: ${({ theme }) => theme.text1};
//   }
// `;

const StyledCloseIcon = styled(X)`
  height: 20px;
  width: 20px;
  :hover {
    cursor: pointer;
  }

  > * {
    stroke: ${({ theme }) => theme.text1};
  }
`;

const StyledMenuButton = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background-color: ${({ theme }) => theme.bg1};
  margin-bottom: 5px;
  border: 1px solid ${({ theme }) => theme.bg2};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 0.5rem 1rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  color: ${({ theme }) => theme.primaryText1};

  :hover {
    cursor: pointer;
    outline: none;
    color: #6b7280;
  }
  :focus {
    cursor: pointer;
    outline: none;
    color: #6b7280;
    box-shadow: 0 0 0 3px rgba(164, 202, 254, 0.45);
  }

  svg {
    margin-top: 2px;
  }
`;
const EmojiWrapper = styled.div`
  position: absolute;
  bottom: -6px;
  right: 0px;
  font-size: 14px;
`;

const StyledMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`;

const MenuFlyout = styled.span`
  width: 100%;
  min-width: 20.125rem;
  background-color: ${({ theme }) => theme.bg1};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);

  border: 1px solid ${({ theme }) => theme.bg3};

  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: absolute;
  top: 3rem;
  right: 0rem;
  z-index: 100;
`;

const Break = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.bg3};
`;

const ModalContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  background-color: ${({ theme }) => theme.bg2};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

export default function SettingsTab() {
  const node = useRef<HTMLDivElement>();
  const open = useSettingsMenuOpen();
  const toggle = useToggleSettingsMenu();

  const theme = useContext(ThemeContext);
  const [userSlippageTolerance, setUserslippageTolerance] = useUserSlippageTolerance();

  const [deadline, setDeadline] = useUserDeadline();

  const [expertMode, toggleExpertMode] = useExpertModeManager();

  const [darkMode, toggleDarkMode] = useDarkModeManager();

  // show confirmation view before turning on
  const [showConfirmation, setShowConfirmation] = useState(false);

  useOnClickOutside(node, open ? toggle : undefined);

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    <StyledMenu ref={node as any}>
      <Modal isOpen={showConfirmation} onDismiss={() => setShowConfirmation(false)} maxHeight={100}>
        <ModalContentWrapper>
          <AutoColumn gap="lg">
            <RowBetween style={{ padding: "0 2rem" }}>
              <div />
              <Text fontWeight={500} fontSize={20} color={theme.text1}>
                Are you sure?
              </Text>
              <StyledCloseIcon onClick={() => setShowConfirmation(false)} />
            </RowBetween>
            <Break />
            <AutoColumn gap="lg" style={{ padding: "0 2rem" }}>
              <Text fontWeight={500} fontSize={20} color={theme.text1}>
                Expert mode turns off the confirm transaction prompt and allows high slippage trades that often result
                in bad rates and lost funds.
              </Text>
              <Text fontWeight={600} fontSize={20} color={theme.text1}>
                ONLY USE THIS MODE IF YOU KNOW WHAT YOU ARE DOING.
              </Text>
              <ButtonError
                error={true}
                padding={"12px"}
                onClick={() => {
                  if (window.prompt(`Please type the word "confirm" to enable expert mode.`) === "confirm") {
                    toggleExpertMode();
                    setShowConfirmation(false);
                  }
                }}
              >
                <Text fontSize={20} fontWeight={500} id="confirm-expert-mode">
                  Turn On Expert Mode
                </Text>
              </ButtonError>
            </AutoColumn>
          </AutoColumn>
        </ModalContentWrapper>
      </Modal>
      <StyledMenuButton onClick={toggle} id="open-settings-dialog-button">
        Settings {expertMode && "(Expert Mode)"}
        {/* {expertMode && (
          <EmojiWrapper>
            <span role="img" aria-label="wizard-icon">
              🧙
            </span>
          </EmojiWrapper>
        )} */}
      </StyledMenuButton>
      {open && (
        <MenuFlyout>
          <AutoColumn gap="md" style={{ padding: "1rem" }}>
            <Text fontWeight={600} fontSize={14} color={theme.text1}>
              Transaction Settings
            </Text>
            <TransactionSettings
              rawSlippage={userSlippageTolerance}
              setRawSlippage={setUserslippageTolerance}
              deadline={deadline}
              setDeadline={setDeadline}
            />
            <Text fontWeight={600} fontSize={14} color={theme.text1}>
              Interface Settings
            </Text>
            <RowBetween>
              <RowFixed>
                <TYPE.black fontWeight={400} fontSize={14} color={theme.text2}>
                  Toggle Expert Mode
                </TYPE.black>
                <QuestionHelper text="Bypasses confirmation modals and allows high slippage trades. Use at your own risk." />
              </RowFixed>
              <Toggle
                id="toggle-expert-mode-button"
                isActive={expertMode}
                toggle={
                  expertMode
                    ? () => {
                        toggleExpertMode();
                        setShowConfirmation(false);
                      }
                    : () => {
                        toggle();
                        setShowConfirmation(true);
                      }
                }
              />
            </RowBetween>
          </AutoColumn>
        </MenuFlyout>
      )}
    </StyledMenu>
  );
}
