# Dreflix: Movie explorer

Web application to explore movies, with features such as infinite scroll, a movie search engine focusing on keyboard navigation in the style of the YouTube search engine, a carousel to promote movies with features such as auto play only when it is in the viewport or the tab has the focus, animations when changing and showing a new item, among many other details and functionalities; The design of the App is a combination between the Amazon Prime Video application and Crunchyroll.

## Screenshots

![dreflix](https://github.com/dresandev/dreflix/assets/79766563/10f218a8-f856-461f-975a-3e65093456bf)

## Preview

![dreflix preview](https://github.com/dresandev/dreflix/assets/79766563/06c74f3b-8034-4699-859c-83cd8deaa463)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file.
Personally I use the .env.local file to work locally with the environment variables and avoid uploading the variables with their values ​​to the repository

`API_BASE_URL`

`ACCESS_TOKEN_AUTH`

here you can get the values ​​for the environment variables: https://developer.themoviedb.org/reference/intro/authentication

## Run development server

After setting environment variables, you can start the development server by running the following commands

```bash
  cd dreflix
  # or the name you gave the project when cloning the repository
  yarn dev
  # or
  pnpm dev
  # or
  npm dev
```
