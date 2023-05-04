import {
  Badge,
  Burger,
  Container,
  createStyles,
  Group,
  Header,
  Image,
  MantineProvider,
  px,
  rem,
} from '@mantine/core';
import type { Session } from 'next-auth';
import type { AppProps, AppType } from 'next/app';
import Head from 'next/head';
import { trpc } from '~/utils/trpc';

import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDisclosure } from '@mantine/hooks';
import { SessionProvider } from 'next-auth/react';
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.colors.indigo[0],
  },
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: rem(56),

    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'flex-start',
    },
  },

  links: {
    width: rem(260),

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  social: {
    width: rem(260),

    [theme.fn.smallerThan('sm')]: {
      width: 'auto',
      marginLeft: 'auto',
    },

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
  },

  burger: {
    marginRight: theme.spacing.md,

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
    },
  },
  linkTry: {
    padding: `${rem(8)} ${rem(12)}`,
    textDecoration: 'none',
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
  badgeTry: {
    color: theme.colors.yellow[9],
    backgroundColor: theme.colors.yellow[2],
  },
}));

interface CustomAppProps extends AppProps {
  pageProps: {
    session?: Session;
  } & AppProps['pageProps'];
}

const links = [
  { link: '/', label: 'Acasă' },
  { link: '/about-us/', label: 'Despre noi' },
  { link: '/contact/', label: 'Contact' },
];

const App = (({ pageProps, Component }: CustomAppProps) => {
  const { session } = pageProps;
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0]?.link);
  const { classes, cx } = useStyles();

  return (
    <>
      <Head>
        <title>Conversea</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SessionProvider session={session}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: 'light',
            globalStyles: (theme) => ({
              body: {
                backgroundColor: theme.colors.indigo[1],
              },
            }),
          }}
        >
          <Header height={64} mb={60} className={classes.header}>
            <Container className={classes.inner}>
              <Burger
                opened={opened}
                onClick={toggle}
                size="sm"
                className={classes.burger}
              />
              <Group className={classes.links} spacing={15} mt="xs">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.link}
                    className={cx(classes.link, {
                      [classes.linkActive]: active === link.link,
                    })}
                    onClick={(event) => {
                      event.preventDefault();
                      setActive(link.link);
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </Group>
              <Image
                src="/assets/logoConverseaWithText.png"
                height={px(64)}
                width={px(64)}
              />
              <Group
                spacing={0}
                className={classes.social}
                position="right"
                noWrap
                mt="xs"
              >
                <a href="/" className={classes.linkTry}>
                  <Badge size="sm" className={classes.badgeTry}>
                    <FontAwesomeIcon icon={faClock} />
                  </Badge>{' '}
                  Încearcă un scenariu
                </a>
              </Group>
            </Container>
          </Header>
          <main>
            <Component {...pageProps} />
          </main>
        </MantineProvider>
      </SessionProvider>
    </>
  );
}) as AppType;

const appWithTRPC = trpc.withTRPC(App);

export default appWithTRPC;
