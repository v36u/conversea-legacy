# Conversea

## Tech stack

**Bază:** JavaScript + [Typescript](https://www.typescriptlang.org/)

**Bibliotecă:** [React](https://reactjs.org/)

**Framework:** [Next.js](https://nextjs.org/)

**Kit UI:** TBD

**Bază de date:** [PostgreSQL](https://www.postgresql.org/)

**Testing:** Inițial foloseam [playwright](https://playwright.dev/) + [vitest](https://vitest.dev/) dar am întâmpinat niște probleme și le-am scos momenta -- eventual le vom readăuga pe parcurs

**Tehnologii complementare:**

- [Prisma](https://www.prisma.io/) - ORM optimizat pentru Next.js
- [TRPC](https://trpc.io/) - Sincronizare typing

**Dev tools:**

- [ESLint](https://eslint.org/)
- [pnpm](https://pnpm.io/)

**Hosting provider:** Nu avem încă dar cred că vom folosi [Vercel](https://vercel.com/) sau [Render](https://render.com/)

## Comenzi

1. `pnpm lint` -- Căutare probleme în codebase (regulile se pot ajusta din `~/.eslintrc` sau punctual folosind comentarii)
2. `pnpm dev` -- Rulează aplicația în development mode astfel:
   1. Se rulează script-ul `~/scripts/predev.mjs` pentru configurări și verificări necesare la începutul rulării
   2. Se rulează migrările de db și se adaugă dummy data
   3. În paralel:
      - Se pornește aplicația
      - Se pornește prisma studio (interfață vizuală pentru interacționare cu baza de date)
3. `pnpm build` -- Creează un build de producție
4. `pnpm start` -- Rulează aplicația în production mode. Este necesar să existe un build de producție făcut.
5. `pnpm prod` -- Rulează `pnpm build` și `pnpm start`

## Fișierele .env

În aceste fișiere se află variabile de configurație. Există un fișier de bază `.env` însă se mai pot adăuga și altele care depind de modul de rulare (de exemplu `.env.development`, `.env.production`, `.env.test`).

Pentru variabile cu valori care trebuie să fie private sau care pur și simplu sunt specifice doar mediului de lucru local, se pot adăuga: `.env.local`, `.env.development.local`, `.env.production.local`, etc. Acestea sunt incluse în `.gitignore`.

Ordinea suprascrierii este următoarea (voi folosi ca exemplu `development` însă această logică se aplică în toate cazurile):

1. `.env`
2. `.env.development`
3. `.env.local`
4. `.env.development.local`

Asta înseamnă că ce este declarat în `.env.development.local` va suprascrie orice altceva.
