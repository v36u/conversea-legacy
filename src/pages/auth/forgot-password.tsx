import {
  Anchor,
  Button,
  Center,
  Container,
  createStyles,
  Group,
  Paper,
  rem,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import Link from 'next/link';
import { FC } from 'react';

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(26),
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  controls: {
    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column-reverse',
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
      textAlign: 'center',
    },
  },
}));

const ForgotPasswordPage: FC = () => {
  const { classes } = useStyles();

  return (
    <Container size={480} my={40}>
      <Title className={classes.title} align="center">
        Ai uitat parola?
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Introdu email-ul tău și îți vom trimite un link pentru resetarea parolei
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <TextInput label="Email" placeholder="exemplu@webiste.ro" required />
        <Group position="apart" mt="lg" className={classes.controls}>
          <Anchor color="dimmed" size="sm" className={classes.control}>
            <Center inline>
              <Link href="/auth/login/">
                <Anchor component="button" size="sm">
                  Înapoi la pagina de autentificare
                </Anchor>
              </Link>
            </Center>
          </Anchor>
          <Button className={classes.control}>Resetare parolă</Button>
        </Group>
      </Paper>
    </Container>
  );
};

export default ForgotPasswordPage;
