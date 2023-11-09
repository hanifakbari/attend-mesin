import Head from "next/head";
import FaceRecognition from "./components/FaceRecognation";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Face Recognition App</title>
        <meta name="description" content="Face Recognition App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <FaceRecognition />
      </main>
    </div>
  );
}
