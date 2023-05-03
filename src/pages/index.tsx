import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Badge,
  Button,
  Container,
  createStyles,
  Group,
  Image,
  List,
  rem,
  Text,
  Title,
} from '@mantine/core';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import { FC } from 'react';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: `calc(${theme.spacing.xl} * 4)`,
    paddingBottom: `calc(${theme.spacing.xl} * 4)`,
  },

  content: {
    maxWidth: rem(480),
    marginRight: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(44),
    lineHeight: 1.5,
    fontWeight: 900,

    [theme.fn.smallerThan('xs')]: {
      fontSize: rem(28),
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  highlight: {
    position: 'relative',
    backgroundColor: theme.fn.variant({
      variant: 'light',
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.sm,
    padding: `${rem(3)} ${rem(12)}`,
  },
}));

const IndexPage: FC = () => {
  const { status } = useSession();
  const { classes } = useStyles();

  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Călătorește în jurul lumii prin intermediul limbii cu{' '}
              <span className={classes.highlight}>Conversea</span>!
            </Title>
            <Text color="dimmed" mt="md">
              Conversea este o platformă care are ca scop central popularizarea
              și îmbunătățirea procesului de învățare a unei limbi străine.
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={<FontAwesomeIcon icon={faGlobe} color="#228be6" />}
            >
              <List.Item>
                <b>Scenarii familiare</b> &mdash; Conversea îți oferă scenarii
                personalizate, căt mai relevante pentru tine
              </List.Item>
              <List.Item>
                <b>Statistici</b> &mdash; Îți poți vizualiza oricând progresul
                și poți primi recomandări de învățare cât mai optime
              </List.Item>
              <List.Item>
                <b>
                  <Badge size="sm">Nou!</Badge> Modul cooperativ
                </b>{' '}
                &mdash; Adună-ți prietenii și completați scenarii împreună
              </List.Item>
            </List>

            <Group mt={30}>
              <Button radius="xl" size="md" className={classes.control}>
                Încearcă un scenariu
              </Button>
              <Button
                variant="default"
                radius="xl"
                size="md"
                className={classes.control}
              >
                Află mai multe
              </Button>
            </Group>
          </div>
          <Image src="/assets/logoConversea.png" className={classes.image} />
        </div>
      </Container>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default IndexPage;
