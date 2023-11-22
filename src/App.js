import {
  DynamicContextProvider,
  DynamicWidget,
  useDynamicContext,
  useEmbeddedWallet,
} from "@dynamic-labs/sdk-react-core";
import { MagicWalletConnectors } from "@dynamic-labs/magic";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { useEffect, useState } from "react";
import { SdkViewSectionType, SdkViewType } from "@dynamic-labs/sdk-api";

import "./Views.css";

const WALLET_VIEW = {
  type: SdkViewType.Login,
  sections: [
    {
      type: SdkViewSectionType.Wallet,
    },
  ],
};

const EMAIL_SSO_VIEW = {
  type: SdkViewType.Login,
  sections: [
    {
      type: SdkViewSectionType.Email,
    },
    {
      type: SdkViewSectionType.Separator,
      label: "Or",
    },
    {
      type: SdkViewSectionType.Social,
      defaultItem: "google",
    },
  ],
};

const SSO_AND_WALLETS_VIEW = {
  type: SdkViewType.Login,
  sections: [
    { type: SdkViewSectionType.Wallet },
    {
      type: SdkViewSectionType.Separator,
      label: "Or",
    },
    {
      type: SdkViewSectionType.Email,
    },
    {
      type: SdkViewSectionType.Separator,
      label: "Or",
    },
    {
      type: SdkViewSectionType.Social,
      defaultItem: "google",
    },
  ],
};

const FLAVORS = {
  Wallets: "wallet",
  EmailSso: "emailSso",
  EmbeddedAndWallets: "embeddedAndWallets",
};

const Demo = ({ setViewOverrides }) => {
  const [flavor, setFlavor] = useState(FLAVORS.Wallets);
  const { user } = useDynamicContext();
  const { createEmbeddedWallet, userHasEmbeddedWallet } = useEmbeddedWallet();
  const { setShowAuthFlow } = useDynamicContext();

  const createWalletIfNeeded = async () => {
    if (!userHasEmbeddedWallet()) {
      try {
        const walletId = await createEmbeddedWallet();
        console.log("created wallet: ", walletId);
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    if (flavor === FLAVORS.Wallets) {
      setViewOverrides([WALLET_VIEW]);
    } else if (flavor === FLAVORS.EmailSso) {
      setViewOverrides([EMAIL_SSO_VIEW]);
    } else if (flavor === FLAVORS.EmbeddedAndWallets) {
      setViewOverrides([SSO_AND_WALLETS_VIEW]);
    }
  }, [flavor]);

  return (
    <div className="container">
      <button
        className="view-button"
        type="button"
        onClick={() => {
          setFlavor(FLAVORS.Wallets);
          setShowAuthFlow(true);
        }}
      >
        {" "}
        Wallets only{" "}
      </button>
      <button
        className="view-button"
        type="button"
        onClick={() => {
          setFlavor(FLAVORS.EmailSso);
          setShowAuthFlow(true);
        }}
      >
        {" "}
        Email and SSO{" "}
      </button>
      <button
        className="view-button"
        type="button"
        onClick={() => {
          setFlavor(FLAVORS.EmbeddedAndWallets);
          setShowAuthFlow(true);
        }}
      >
        {" "}
        Embedded and Wallets{" "}
      </button>

      {user && flavor === FLAVORS.EmbeddedAndWallets && (
        <button type="button" onClick={() => createWalletIfNeeded()}>
          {" "}
          createEmbeddedWallet{" "}
        </button>
      )}
    </div>
  );
};

const App = () => {
  const [viewOverrides, setViewOverrides] = useState([]);
  return (
    <div className="app">
      <DynamicContextProvider
        settings={{
          environmentId: "fba5127c-21c0-430e-bb03-7dc8f6b11397",
          walletConnectors: [EthereumWalletConnectors, MagicWalletConnectors],
          overrides: { views: viewOverrides },
        }}
      >
        <DynamicWidget />
        <Demo setViewOverrides={setViewOverrides} />
      </DynamicContextProvider>
    </div>
  );
};

export default App;
