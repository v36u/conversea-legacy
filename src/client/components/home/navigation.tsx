import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { FC, useRef } from 'react';

const Navigation: FC = () => {
  const { status } = useSession();
  const burgerRef = useRef<HTMLButtonElement>(null);

  const handleLinkClick = () => {
    if (!burgerRef.current) {
      return;
    }
    if (burgerRef.current.getAttribute('aria-expanded') !== 'true') {
      return;
    }

    burgerRef.current.click();
  };

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            ref={burgerRef}
            type="button"
            className="navbar-toggle"
            data-toggle="collapse"
            data-target="#conversea-nav"
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
            onClick={handleLinkClick}
          >
            Conversea
          </Link>
        </div>

        <div className="collapse navbar-collapse" id="conversea-nav">
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Link
                href="/#features"
                className="page-scroll"
                scroll={false}
                onClick={handleLinkClick}
              >
                Elemente cheie
              </Link>
            </li>
            <li>
              <Link
                href="/#about"
                className="page-scroll"
                scroll={false}
                onClick={handleLinkClick}
              >
                Despre noi
              </Link>
            </li>
            <li>
              <Link
                href="/#services"
                className="page-scroll"
                scroll={false}
                onClick={handleLinkClick}
              >
                Servicii
              </Link>
            </li>
            <li>
              <Link
                href="/#team"
                className="page-scroll"
                scroll={false}
                onClick={handleLinkClick}
              >
                Echipa Noastră
              </Link>
            </li>
            {status === 'unauthenticated' && (
              <li>
                <Link
                  href="/auth/register/"
                  scroll={false}
                  onClick={handleLinkClick}
                >
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
