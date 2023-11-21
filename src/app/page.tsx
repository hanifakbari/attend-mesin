import Head from "next/head";
import { FaceRecognation } from "./components/organisms";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Face Recognition App</title>
        <meta name="description" content="Face Recognition App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <FaceRecognation />
      </main>
    </div>
  );
}
