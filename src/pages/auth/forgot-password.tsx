import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { FC } from 'react';
import { nextAuthOptions } from '~/utils/auth/authOptions';
import HttpStatusCode from '~/utils/enums/HttpStatusCode';

const ForgotPasswordPage: FC = () => {
  // TODO: Fix styling, because this used Mantine which has been uninstalled
  return (
    <div>
      <h1>Ai uitat parola?</h1>
      <p>
        Introdu email-ul tău și îți vom trimite un link pentru resetarea parolei
      </p>

      <div>
        <form noValidate>
          <input formNoValidate placeholder="exemplu@webiste.ro" required />
          <div>
            <div>
              <Link href="/auth/login/">Înapoi la pagina de autentificare</Link>
            </div>
            <button type="submit">Resetare parolă</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, nextAuthOptions);
  if (session) {
    return {
      redirect: {
        destination: '/',
        statusCode: HttpStatusCode.TEMPORARY_REDIRECT,
      },
    };
  }

  return {
    props: {},
  };
};

export default ForgotPasswordPage;
