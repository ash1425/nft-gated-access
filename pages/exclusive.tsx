import { useEffect, useState } from "react";
import { useAddress, useMetamask } from "@thirdweb-dev/react";
import Head from "next/head";

const Exclusive = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const connectWithMetamask = useMetamask();
  const address = useAddress();

  const auth = async () => {
    if (address) {
      const response = await fetch(`/api/auth?address=${address}`);
      setLoading(false);
      if (response.status === 200) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    }
  };
  useEffect(() => {
    auth();
  }, [address]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Exclusive content</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {address ? (
          <>
            {loading ? (
              <div>Loading............</div>
            ) : authenticated ? (
              <div>
                <div className="text-9xl">
                  You have access to the Exclusive stuff !!!!
                </div>
              </div>
            ) : (
              <div>
                <div className="text-9xl">NO ACCESS</div>
              </div>
            )}
          </>
        ) : (
          <button
            onClick={() => {
              setAuthenticated(false);
              setLoading(false);
              connectWithMetamask();
            }}
            className="rounded-md py-5 px-5 bg-amber-500"
          >
            Connect your wallet
          </button>
        )}
      </main>
    </div>
  );
};

export default Exclusive;
