// import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import "../styles/form.css";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
import { Raleway} from "next/font/google";

const raleway= Raleway({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <Script
        type="text/javascript"
        id="zsiqchat"
        dangerouslySetInnerHTML={{
          __html: `
        var $zoho=$zoho || {};
        $zoho.salesiq = $zoho.salesiq || {widgetcode: "siq69d23de7c07a840e811eb99d28cfba44ec96ea04cb91a8975de94be5e6e502c1", values:{},ready:function(){}};
        var d=document;
        var s=d.createElement("script");
        s.type="text/javascript";
        s.id="zsiqscript";
        s.defer=true;
        s.src="https://salesiq.zohopublic.in/widget";
        var t=d.getElementsByTagName("script")[0];
        t.parentNode.insertBefore(s,t);
      `,
        }}
        strategy="lazyOnload"
      /> */}
      {/* Meta Pixel - loaded after the page is idle (strategy="lazyOnload")
          rather than as a render-blocking synchronous script, which used to
          live in _document.js's <Head> and ran before anything else. Moved
          here because next/script's deferred strategies only take effect
          inside the React tree Next hydrates (_app.js/pages), not
          _document.js, which is server-rendered once and never hydrated. */}
      <Script
        id="meta-pixel"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '426060596922756');
          fbq('track', 'PageView');
          `,
        }}
      />
      <main className={raleway.className}>
        <Component {...pageProps} />
        <GoogleTagManager gtmId="GTM-WJVZHTB" />
      </main>
    </>
  );
}

export default MyApp;
