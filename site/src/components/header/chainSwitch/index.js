import { useRef, useState } from "react";
import styled, { css } from "styled-components";
import { chains } from "../../../utils/constants";
import { Flex } from "../../styled/flex";
import { useSelector } from "react-redux";
import { chainSettingSelector } from "../../../store/reducers/settingSlice";
import { Inter_12_500, Inter_14_600 } from "../../../styles/text";
import { mobileCss } from "../../../utils/mobileCss";
import CaretRightIcon from "../../icons/caretRightIcon";
import CaretDownIcon from "../../icons/caretDownIcon";
import Statemint from "../../icons/statemintIcon";
import Statemine from "../../icons/statemineIcon";
import Westmint from "../../icons/westmintIcon";
import { ReactComponent as Litentry } from "../../icons/litentry.svg";
import { ReactComponent as Litmus } from "../../icons/litmus.svg";
import { ReactComponent as Polkadot } from "../../icons/polkadot.svg";
import { useOnClickOutside } from "@osn/common";

const ArrowDownIcon = styled(CaretDownIcon)`
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  right: 6px;
`;

const Wrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const Dropdown = styled.div`
  box-sizing: border-box;
  height: 36px;
  width: 160px;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
  background: ${({ theme }) => theme.fillPanel};
  border: 1px solid ${({ theme }) => theme.strokeBox};
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;

  svg {
    margin-right: 8px;
  }

  :hover {
    border-color: ${({ theme }) => theme.strokeBoxSelected};
  }

  ${(p) =>
    p.active &&
    css`
      border-color: ${({ theme }) => theme.strokeBoxSelected};
    `}
`;

const Text = styled.p`
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  color: ${({ theme }) => theme.fontPrimary};
`;

const Options = styled.div`
  background: ${({ theme }) => theme.fillPopup};
  position: absolute;
  top: 44px;
  right: 0;
  border: 1px solid ${({ theme }) => theme.strokeBase};
  box-shadow: ${({ theme }) => theme.shadowPanel};
  border-radius: 8px;
  width: 320px;

  ${mobileCss(css`
    width: 100%;
  `)}
`;

const ChainGroupWrapper = styled.div`
  padding: 16px;
`;

const ChainGroup = styled.div`
  margin-top: 12px;

  &:first-child {
    margin-top: 0;
  }
`;

const ChainGroupTitle = styled.h5`
  margin: 0;
  margin-bottom: 4px;
  color: ${(p) => p.theme.fontTertiary};
  ${Inter_12_500};
`;

const ChainGroupItems = styled(Flex)`
  flex-wrap: wrap;
  gap: 0 16px;
`;

const ChainGroupItemName = styled.span`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  color: ${(p) => p.theme.fontPrimary};
  margin-left: 8px;
  ${Inter_14_600};
`;
const ChainGroupItemCaretWrapper = styled.span`
  display: inline-flex;
  opacity: 0;
`;
const ChainGroupItem = styled.a`
  display: inline-flex;
  padding: 8px 0;
  width: 136px;
  ${mobileCss(css`
    width: 100%;
  `)}
  text-decoration: none;

  &:hover {
    ${ChainGroupItemName} {
      color: ${(p) => p.theme.theme500};
    }
    ${ChainGroupItemCaretWrapper} {
      opacity: 100;
    }
  }
`;

const polkadotChains = chains.filter((i) => i.chain === "polkadot");
const kusamaChains = chains.filter((i) => i.chain === "kusama");
const westendChains = chains.filter((i) => i.chain === "westend");

export default function ChainSwitch() {
  const currentNode = useSelector(chainSettingSelector);
  const [show, setShow] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setShow(false));

  const CHAIN_ICONS_MAP = {
    polkadot: <Polkadot />,
    statemint: <Statemint />,
    statemine: <Statemine />,
    westmint: <Westmint />,
    litmus: <Litmus />,
    litentry: <Litentry />,
  };

  const chainOptions = [
    {
      title: "Polkadot & Parachain",
      chains: polkadotChains,
    },
    {
      title: "Kusama & Parachain",
      chains: kusamaChains,
    },
    {
      title: "Westend & Parachain",
      chains: westendChains,
    },
  ];

  return (
    <Wrapper ref={ref}>
      <Dropdown active={show} onClick={() => setShow((state) => !state)}>
        {CHAIN_ICONS_MAP[currentNode.value]}
        <Text>{currentNode.name}</Text>
        <ArrowDownIcon />
      </Dropdown>

      {show && (
        <Options>
          <ChainGroupWrapper>
            {chainOptions.map((chainOption) => (
              <ChainGroup key={chainOption.title}>
                <ChainGroupTitle>{chainOption.title}</ChainGroupTitle>
                <ChainGroupItems>
                  {chainOption.chains.map((chain) => {
                    const isDiffChain = chain.value !== currentNode.value;

                    const href = isDiffChain
                      ? `https://${chain.value}.statescan.io`
                      : "#/";

                    return (
                      <ChainGroupItem
                        key={chain.value}
                        href={href}
                        target={isDiffChain ? "_blank" : ""}
                      >
                        {CHAIN_ICONS_MAP[chain.value]}
                        <ChainGroupItemName>
                          <span>{chain.name}</span>
                          <ChainGroupItemCaretWrapper>
                            <CaretRightIcon />
                          </ChainGroupItemCaretWrapper>
                        </ChainGroupItemName>
                      </ChainGroupItem>
                    );
                  })}
                </ChainGroupItems>
              </ChainGroup>
            ))}
          </ChainGroupWrapper>
        </Options>
      )}
    </Wrapper>
  );
}
