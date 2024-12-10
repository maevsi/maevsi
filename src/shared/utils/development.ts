import seedrandom from 'seedrandom'

export const getHeroImageName = (seed: string) => {
  const images = ['conference', 'crowd', 'party', 'workshop']
  return images[Math.floor(seedrandom(seed)() * images.length)]
}
