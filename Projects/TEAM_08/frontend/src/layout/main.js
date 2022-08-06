import Navbar from "components/navbar";
import Head from "next/head";

export default function MainLayout({ children, title }) {
  return (
    <>
      <Head>
        <title>Saabak | {title}</title>
      </Head>
      <Navbar />
      {children}
    </>
  );
}
