import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { FC } from 'react';

const Navigation: FC = () => {
  const { status } = useSession();
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link
            className="navbar-brand page-scroll"
            href="/#header"
            scroll={false}
          >
            Conversea
          </Link>
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Link href="/#features" className="page-scroll" scroll={false}>
                Elemente cheie
              </Link>
            </li>
            <li>
              <Link href="/#about" className="page-scroll" scroll={false}>
                Despre noi
              </Link>
            </li>
            <li>
              <Link href="/#services" className="page-scroll" scroll={false}>
                Servicii
              </Link>
            </li>
            <li>
              <Link href="/#team" className="page-scroll" scroll={false}>
                Echipa Noastră
              </Link>
            </li>
            {/* <li>
              <a href="#expenses" className="page-scroll">
                Cheltuieli
              </a>
            </li> */}
            {status === 'unauthenticated' && (
              <li>
                <Link href="/auth/register/" scroll={false}>
                  Înregistrează-te
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
