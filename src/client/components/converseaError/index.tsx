import {
  Button,
  Container,
  createStyles,
  Group,
  rem,
  Text,
  Title,
} from '@mantine/core';
import { FC, MouseEventHandler } from 'react';
import HttpStatusCode from '~/utils/enums/HttpStatusCode';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(220),
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(120),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(38),

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(500),
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}));

type Props = {
  errorCode: HttpStatusCode;
  title: string;
  message: string;
  buttonText: string;
  buttonOnClick: MouseEventHandler<HTMLButtonElement>;
};

const ConverseaError: FC<Props> = ({
  errorCode,
  title,
  message,
  buttonText,
  buttonOnClick,
}) => {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <div className={classes.label}>{errorCode}</div>
      <Title className={classes.title}>{title}</Title>
      <Text
        color="dimmed"
        size="lg"
        align="center"
        className={classes.description}
      >
        {message}
      </Text>
      <Group position="center">
        <Button onClick={buttonOnClick} variant="subtle" size="md">
          {buttonText}
        </Button>
      </Group>
    </Container>
  );
};

export default ConverseaError;
