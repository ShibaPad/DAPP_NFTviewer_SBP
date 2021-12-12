// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

const getNFTInfoFromURI = async (uri) => {
  const nftResponse = await fetch(uri);
  const nft = await nftResponse.json();
  return nft;
};

export const fetchData = (address) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      const { blockchain } = store.getState();
      let tokenIds = await blockchain.smartContract.methods
        .tokensOfOwner(address)
        .call();
      const tokenURIs = await Promise.all(
        tokenIds.map((tokenId) =>
          blockchain.smartContract.methods.tokenURI(tokenId).call()
        )
      );

      const nftTokens = await Promise.all(
        tokenURIs.map((uri) => getNFTInfoFromURI(uri))
      );
      await getNFTInfoFromURI(tokenURIs[0]);

      dispatch(
        fetchDataSuccess({
          nftTokens,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
