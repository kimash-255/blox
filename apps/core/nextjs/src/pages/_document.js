import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
          rel="stylesheet"
        />
        <script
          async
          src="https://kit.fontawesome.com/42d5adcbca.js"
          crossOrigin="anonymous"
        ></script>
        <link href="/css/nucleo-icons.css" rel="stylesheet" />
        <link href="/css/nucleo-svg.css" rel="stylesheet" />
        <link
          href="/css/soft-ui-dashboard-tailwind.css?v=1.0.5"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
