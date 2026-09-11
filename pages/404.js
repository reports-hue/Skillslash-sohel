import React from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

const Notfound = () => {
  return (
    <div className="notFound">
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <div>
        <h4>404</h4>
        <h5>Oops, Page Not Found</h5>
        <p>
          We are sorry the page you requested could not be found. <br />
          Please go to the Homepage
        </p>
        <Link href="/">
          <button>
            <BsArrowLeftShort /> Back To Home
          </button>
        </Link>
      </div>
      <div>
        <Image
          src="/cdn/static/web/404-1.svg"
          height="500"
          width="500"
          alt="Page Not Found"
        />
      </div>
    </div>
  );
};

export default Notfound;
