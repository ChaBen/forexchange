export function getResolutionSecond(resolution: string): number {
  switch (resolution) {
    case '1':
      return 60;
    case '5':
      return 5 * 60;
    case '10':
      return 10 * 60;
    case '15':
      return 15 * 60;
    case '30':
      return 30 * 60;
    case '60':
      return 60 * 60;
    case '120':
      return 2 * 60 * 60;
    case '240':
      return 4 * 60 * 60;
    case 'D':
      return 24 * 60 * 60;
  }
}
