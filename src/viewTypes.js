import { SdkViewSectionType, SdkViewType } from "@dynamic-labs/sdk-api";

export const WALLET_VIEW = {
  type: SdkViewType.Login,
  sections: [
    {
      type: SdkViewSectionType.Wallet,
    },
  ],
};

export const EMAIL_SSO_VIEW = {
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

export const SSO_AND_WALLETS_VIEW = {
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
