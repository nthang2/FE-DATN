import BigNumber from 'bignumber.js';
import { BN } from 'src/utils';

const RAY = BN(1e12);
function rmul(a: BigNumber, b: BigNumber): BigNumber {
  return a.times(b).div(RAY);
}

function rpow(x: BigNumber, n: BigNumber, base: BigNumber): BigNumber {
  let result = base;
  let exp = n;
  let baseVal = x;

  while (exp.gt(0)) {
    if (exp.mod(2).eq(1)) {
      result = rmul(result, baseVal);
    }
    baseVal = rmul(baseVal, baseVal);
    exp = BN(Math.floor(exp.div(2).toNumber()));
  }
  return result;
}

/**
 * Simulate new rate & accrued interest
 *
 * @param prevRate   rate at last update (bigint)
 * @param rho        last update timestamp (seconds)
 * @param duty       per-second duty (bigint scaled by RAY)
 * @param base       per-second base (bigint scaled by RAY)
 * @param debtTotal  total debt (bigint)
 * @param now        current timestamp (seconds)
 */
export function simulateRate(
  prevRate: BigNumber,
  rho: BigNumber,
  duty: BigNumber,
  base: BigNumber,
  debtTotal: BigNumber,
  now: BigNumber
): { newRate: BigNumber; interest: BigNumber; updatedAt: BigNumber } {
  if (now < rho) throw new Error('Invalid time: now < rho');

  const dt = now.minus(rho);
  if (dt.eq(0)) {
    return { newRate: prevRate, interest: BN(0), updatedAt: rho };
  }

  // accumulation = (duty + base) ^ dt
  const accumulation = rpow(duty.plus(base), dt, RAY);

  // new rate
  const newRate = rmul(accumulation, prevRate);

  if (newRate.gt(BN(2).times(RAY))) {
    throw new Error('Rate exceeds double');
  }

  // interest = debtTotal * (newRate - prevRate)
  const diff = newRate.minus(prevRate);
  const interest = rmul(diff, debtTotal);

  return { newRate, interest, updatedAt: now };
}
