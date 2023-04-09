import Head from "next/head";
import { FC } from "react";

interface Props {
  title: string;
}

const Meta: FC<Props> = ({ title }) => {
  return (
    <Head>
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      <title>{title}</title>
    </Head>
  );
};

export default Meta;
