import { getPasswordStrength } from './getPasswordStrength';

describe('getPasswordStrength', () => {
  it.each([
    { password: '///', strength: 'weak' },
    { password: '123', strength: 'weak' },
    { password: 'qwe', strength: 'weak' },
    { password: 'RTY', strength: 'weak' },
    { password: '+-=', strength: 'weak' },
    { password: '123qwe', strength: 'medium' },
    { password: '123RTY', strength: 'medium' },
    { password: '123+-=', strength: 'medium' },
    { password: 'qweRTY', strength: 'medium' },
    { password: 'qwe+-=', strength: 'medium' },
    { password: 'RTY+-=', strength: 'medium' },
    { password: '123qweRTY', strength: 'good' },
    { password: '123qwe+-=', strength: 'good' },
    { password: '123RTY+-=', strength: 'good' },
    { password: 'qweRTY+-=', strength: 'good' },
    { password: '123qweRTY+-=', strength: 'strong' },
  ])(
    'should return "$strength" for password "$password"',
    ({ password, strength }) => {
      expect(getPasswordStrength(password)).toEqual(strength);
    }
  );
});
