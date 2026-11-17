import assert from 'node:assert/strict';
import test from 'node:test';
import {
  preferredLocale,
  saveLanguagePreference,
} from '../src/lib/language-preference.ts';

test('saved choice wins over browser preferences', () => {
  assert.equal(preferredLocale(['en', 'pt'], 'en', ['pt-BR'], 'en'), 'en');
});
test('browser languages are matched in preference order, including regional tags', () => {
  assert.equal(
    preferredLocale(['en', 'pt'], null, ['fr-FR', 'pt-BR', 'en-US'], 'en'),
    'pt',
  );
  assert.equal(preferredLocale(['en', 'pt'], 'removed', ['pt-PT'], 'en'), 'pt');
  assert.equal(preferredLocale(['en', 'pt'], null, ['de'], 'en'), 'en');
  assert.equal(preferredLocale(['en', 'pt'], null, [], 'en'), 'en');
  assert.equal(
    preferredLocale(['pt', 'pt-BR'], null, ['pt-BR'], 'pt'),
    'pt-BR',
  );
});
test('unavailable storage does not break language switching', () => {
  assert.doesNotThrow(() => saveLanguagePreference('pt'));
});
