import { toBase64 } from './toBase64';

describe('toBase64', () => {
  it.each([
    {
      file: new File(['test'], 'image.png', { type: 'image/png' }),
      result: 'data:image/png;base64,',
    },
    {
      file: new File(['test'], 'image.jpeg', { type: 'image/jpeg' }),
      result: 'data:image/jpeg;base64,',
    },
  ])('should return "$result" for file "$file"', async ({ file, result }) => {
    expect(await toBase64(file)).toMatch(result);
  });
});
