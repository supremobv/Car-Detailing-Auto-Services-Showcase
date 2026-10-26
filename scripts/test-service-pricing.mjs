import assert from 'node:assert/strict';
import {estimate,packages,vehicleSizes,defaultSelection,dateError,addDays} from '../app/detailing-data.ts';
assert.deepEqual(estimate(defaultSelection),{base:6500,additional:0,total:6500});
assert.equal(estimate({...defaultSelection,vehicleSize:'suv',extras:['headlights','glass']}).total,11700);
assert.equal(estimate({packageId:'ceramic',vehicleSize:'van',extras:['headlights','engine','glass','wheels']}).total,38700);
assert.equal(estimate({packageId:'reset',vehicleSize:'compact',extras:[]}).total,1500);
assert.throws(()=>estimate({...defaultSelection,packageId:'missing'}));
for(const p of packages){let previous=0;for(const size of vehicleSizes){const price=estimate({packageId:p.id,vehicleSize:size.id,extras:[]}).total;assert.ok(Number.isInteger(price)&&price>=previous);previous=price;}}
const today='2026-10-26';assert.equal(dateError('2026-10-27',today),'');assert.match(dateError('2026-02-30',today),/valid preferred visit date/);assert.match(dateError('2026-10-25',today),/future visit date/);assert.match(dateError(addDays(today,181),today),/six months/);
console.log('All vehicle-size/package prices, extras, unknown services, and visit-date boundaries passed.');
