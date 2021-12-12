import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import CustomModal from "./components/CustomModal";
import styled from "styled-components";

const imgUrl = (ipfsPath) =>
  ipfsPath.replace("ipfs://", "https://ipfs.io/ipfs/");

export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 20px;
  border: none;
  background-color: var(--hotpink);
  padding: 10px;
  font-weight: bold;
  color: var(--accent-text);
  width: 150px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: ${({ flex }) => (flex ? flex : 0)};
  flex-direction: column;
  justify-content: stretched;
  // align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
    justify-content: center;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-content: space-around;
  width: 100%;
`;

export const StyledCard = styled.div`
  color: white;
  width: 30%;
  margin: 10px;
  text-align: center;
  line-height: 75px;

  @media (max-width: 768px) {
    width: 40%;
  }

  @media (max-width: 375px) {
    width: 100%;
  }
`;

export const StyledLogo = styled.img`
  width: 200px;
  @media (min-width: 767px) {
    width: 300px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  border: 4px dashed var(--secondary);
  background-color: var(--accent);
  border-radius: ${({ isSqure }) => (isSqure ? 0 : "100%")};
  width: 200px;
  max-width: 100%;
  @media (min-width: 900px) {
    width: 250px;
  }
  @media (min-width: 1000px) {
    width: 300px;
  }
  transition: width 0.5s;
`;

export const StyledDiv = styled.div`
  border: 4px solid var(--secondary);
  margin: 12px 0;
  padding: 4px;
`;

export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
  word-break: break-all;
  white-space: break-spaces;
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [nft, setNFT] = React.useState(null);
  const nfts = useSelector((state) => state.data.nftTokens);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  const handleClickNFT = (nft) => {
    setNFT(nft);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <s.Screen>
      <CustomModal
        isActive={modalIsOpen}
        title={nft?.name}
        closeModal={closeModal}
      >
        {nft && (
          <div>
            <StyledImg src={imgUrl(nft.image)} isSqure={true} />
            <StyledDiv>
              <p>Name: {nft.name}</p>
              <p>ID: {nft.id}</p>
            </StyledDiv>
            <StyledDiv>
              {nft.attributes.map((attribute) => (
                <s.TextSubTitle>
                  {attribute.trait_type}: {attribute.value}
                </s.TextSubTitle>
              ))}
            </StyledDiv>
          </div>
        )}
      </CustomModal>

      <s.Container
        flex={1}
        ai={"center"}
        style={{ padding: 24, backgroundColor: "var(--yellow)" }}
        image={CONFIG.SHOW_BACKGROUND ? "/config/images/bg.png" : null}
      >
        <StyledLogo alt={"logo"} src={"/config/images/logo.png"} />
        <s.SpacerSmall />
        <ResponsiveWrapper>
          <StyledLink
            style={{
              textAlign: "center",
              fontSize: 40,
              fontWeight: "bold",
              color: "var(--primary)",
            }}
            target={"_self"}
            href={"https://shibapad.finance"}
          >
            MainPage
          </StyledLink>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <StyledLink
            style={{
              textAlign: "center",
              fontSize: 40,
              fontWeight: "bold",
              color: "var(--primary)",
            }}
            target={"_self"}
            href={"https://vote.shibapad.finance/"}
          >
            VotingDAPP
          </StyledLink>
        </ResponsiveWrapper>
        <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
          <s.SpacerLarge />
          <s.Container
            flex={2}
            ai={"center"}
            style={{
              backgroundColor: "var(--accent)",
              padding: 20,
              borderRadius: 24,
              border: "4px dashed var(--secondary)",
              boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)",
            }}
          >
            <>
              {blockchain.account === "" ||
              blockchain.smartContract === null ? (
                <s.Container ai={"center"} jc={"center"}>
                  <s.TextDescription
                    style={{
                      textAlign: "center",
                      color: "var(--accent-text)",
                    }}
                  >
                    Connect to the {CONFIG.NETWORK.NAME} network
                  </s.TextDescription>
                  <s.SpacerSmall />
                  <StyledButton
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(connect());
                    }}
                  >
                    CONNECT
                  </StyledButton>
                  {blockchain.errorMsg !== "" ? (
                    <>
                      <s.SpacerSmall />
                      <s.TextDescription
                        style={{
                          textAlign: "center",
                          color: "var(--accent-text)",
                        }}
                      >
                        {blockchain.errorMsg}
                      </s.TextDescription>
                    </>
                  ) : null}
                </s.Container>
              ) : (
                <>
                  <s.SpacerSmall />
                  <FlexContainer>
                    {nfts.map((nft) => (
                      <StyledCard onClick={() => handleClickNFT(nft)}>
                        <StyledImg src={imgUrl(nft.image)} />
                        <s.TextTitle>{nft.name}</s.TextTitle>
                      </StyledCard>
                    ))}
                  </FlexContainer>
                  <s.SpacerLarge />
                </>
              )}
            </>

            <s.SpacerMedium />
          </s.Container>
          <s.SpacerLarge />
        </ResponsiveWrapper>
        <s.SpacerMedium />
        <s.Container jc={"center"} ai={"center"} style={{ width: "70%" }}>
          <s.TextDescription
            style={{
              textAlign: "center",
              color: "var(--primary-text)",
            }}
          >
            Please make sure you are connected to the right network (
            {CONFIG.NETWORK.NAME} Mainnet)
          </s.TextDescription>
          <s.SpacerSmall />
          <s.TextDescription
            style={{
              textAlign: "center",
              color: "var(--primary-text)",
            }}
          ></s.TextDescription>
        </s.Container>
      </s.Container>
    </s.Screen>
  );
}

export default App;
