import { HeroMovie } from '~/types'

const base_url = '/images/hero-carousel'

export const heroMovies: HeroMovie[] = [
  {
    movieId: 310131,
    image: {
      original: `${base_url}/the-witch/image/2880w.webp`,
      medium: `${base_url}/the-witch/image/1440w.webp`,
      small: `${base_url}/the-witch/image/800w.webp`,
    },
    logoImage: {
      original: `${base_url}/the-witch/logo/700w.webp`,
      small: `${base_url}/the-witch/logo/350w.webp`,
    },
    title: 'The witch',
  },
  {
    movieId: 667216,
    image: {
      original: `${base_url}/infinity-pool/image/2880w.webp`,
      medium: `${base_url}/infinity-pool/image/1440w.webp`,
      small: `${base_url}/infinity-pool/image/800w.webp`,
    },
    logoImage: {
      original: `${base_url}/infinity-pool/logo/700w.webp`,
      small: `${base_url}/infinity-pool/logo/350w.webp`,
    },
    title: 'Infinity pool',
  },
  {
    movieId: 744857,
    image: {
      original: `${base_url}/when-evil-lurks/image/2880w.webp`,
      medium: `${base_url}/when-evil-lurks/image/1440w.webp`,
      small: `${base_url}/when-evil-lurks/image/800w.webp`,
    },
    logoImage: {
      original: `${base_url}/when-evil-lurks/logo/700w.webp`,
      small: `${base_url}/when-evil-lurks/logo/350w.webp`,
    },
    title: 'When evil lurks',
  },
  {
    movieId: 913290,
    image: {
      original: `${base_url}/barbarian/image/2880w.webp`,
      medium: `${base_url}/barbarian/image/1440w.webp`,
      small: `${base_url}/barbarian/image/800w.webp`,
    },
    logoImage: {
      original: `${base_url}/barbarian/logo/700w.webp`,
      small: `${base_url}/barbarian/logo/350w.webp`,
    },
    title: 'Barbarian',
  },
  {
    movieId: 396535,
    image: {
      original: `${base_url}/train-to-busan/image/2880w.webp`,
      medium: `${base_url}/train-to-busan/image/1440w.webp`,
      small: `${base_url}/train-to-busan/image/800w.webp`,
    },
    logoImage: {
      original: `${base_url}/train-to-busan/logo/700w.webp`,
      small: `${base_url}/train-to-busan/logo/350w.webp`,
    },
    title: 'Train to Busan',
  },
  {
    movieId: 949423,
    image: {
      original: `${base_url}/pearl/image/2880w.webp`,
      medium: `${base_url}/pearl/image/1440w.webp`,
      small: `${base_url}/pearl/image/800w.webp`,
    },
    logoImage: {
      original: `${base_url}/pearl/logo/700w.webp`,
      small: `${base_url}/pearl/logo/350w.webp`,
    },
    title: 'Pearl',
  },
]
