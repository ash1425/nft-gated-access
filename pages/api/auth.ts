import type { NextApiRequest, NextApiResponse } from "next";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const thirdwebSDK = new ThirdwebSDK("rinkeby");
const edition = thirdwebSDK.getEdition(
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    let address = req.query.address as string;
    console.log("------------------------------", address);
    const balance = await edition.balanceOf(address, "0");
    console.log("balance is :: ", balance.toNumber());
    if (balance.lt(2)) {
      res.status(401).json({ error: "401" });
    } else {
      res.status(200).json({ loggedIn: true });
    }
  } else {
    res.status(405);
  }
}
