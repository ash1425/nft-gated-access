import type { NextPage } from "next";
import Head from "next/head";
import { useAddress, useMetamask } from "@thirdweb-dev/react";
import Link from "next/link";

const Home: NextPage = () => {
  const connectWithMetamask = useMetamask();
  const address = useAddress();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Gated access</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {address ? (
          <div className="text-blue-700">
            <Link href={"/exclusive"}>Go to exclusive content</Link>
          </div>
        ) : (
          <button
            onClick={connectWithMetamask}
            className="rounded-md py-5 px-5 bg-amber-500"
          >
            Connect your wallet
          </button>
        )}
      </main>
    </div>
  );
};

export default Home;
