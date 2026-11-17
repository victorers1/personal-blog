import assert from 'node:assert/strict';
import test from 'node:test';
import { parseContentDate } from '../src/lib/content-dates.ts';

const day = (date, timeZone) =>
  new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);

test('date-only headers retain their calendar day in the site timezone', () => {
  for (const timezone of [
    'America/Sao_Paulo',
    'America/New_York',
    'Asia/Tokyo',
    'UTC',
  ]) {
    for (const value of ['1996-06-13', '2026-01-01', '2026-07-01']) {
      assert.equal(day(parseContentDate(value, timezone), timezone), value);
    }
  }
  assert.equal(
    parseContentDate('1996-06-13', 'America/Sao_Paulo').toISOString(),
    '1996-06-13T03:00:00.000Z',
  );
});

test('explicit timestamps preserve their instant', () => {
  for (const value of ['1996-06-13T00:00:00Z', '2026-11-17T09:00:00-03:00']) {
    assert.equal(
      parseContentDate(value, 'America/Sao_Paulo').getTime(),
      Date.parse(value),
    );
  }
});
