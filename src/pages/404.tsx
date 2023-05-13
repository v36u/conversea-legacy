import { useRouter } from 'next/router';
import { FC } from 'react';
import ConverseaError from '~/client/components/convereaError';
import HttpStatusCode from '~/utils/enums/HttpStatusCode';

const Error404Page: FC = () => {
  const { push } = useRouter();

  const buttonOnClick = async () => {
    await push('/');
  };

  return (
    <ConverseaError
      errorCode={HttpStatusCode.NOT_FOUND}
      title="You have found a secret place."
      message="Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has been moved to another URL."
      buttonText="Take me back to home page"
      buttonOnClick={buttonOnClick}
    />
  );
};

export default Error404Page;
