const assert = require("node:assert");
const W = require("./logic.js");

const sample = {
  employerName: "Hanbit Metal",
  workerName: "Nguyen Van A",
  birthDate: "1995-04-12",
  employeeNo: "",
  payPeriod: "2026-10-01 ~ 2026-10-31",
  payDate: "2026-11-10",
  lang: "vi",
  earnings: { basePay: "2,000,000", overtimePay: 300000, nightPay: 0 },
  deductions: { nationalPension: 90000, healthInsurance: 70000, mealFee: 100000 },
  basis: { daysWorked: 22, totalHours: 200, overtimeHours: 10.5 }
};

const ok = W.buildStatement(sample);
assert.strictEqual(ok.ok, true);
assert.strictEqual(ok.totalEarnings, 2300000);
assert.strictEqual(ok.totalDeductions, 260000);
assert.strictEqual(ok.netPay, 2040000);
const base = ok.rows.find((r) => r.key === "basePay");
assert.strictEqual(base.ko, "기본급");
assert.strictEqual(base.label, "Lương cơ bản");
assert.strictEqual(base.amount, 2000000);

const noId = W.buildStatement(Object.assign({}, sample, { birthDate: "", employeeNo: "" }));
assert.strictEqual(noId.ok, false);
assert.ok(noId.errors.some((e) => e.field === "identifier" && e.code === "missing"));

const noHours = W.buildStatement(Object.assign({}, sample, { basis: { daysWorked: 22, totalHours: 200 } }));
assert.strictEqual(noHours.ok, false);
assert.ok(noHours.errors.some((e) => e.field === "overtimeHours" && e.code === "hoursRequired"));

const neg = W.buildStatement(Object.assign({}, sample, { earnings: { basePay: -1 } }));
assert.strictEqual(neg.ok, false);
assert.ok(neg.errors.some((e) => e.field === "basePay" && e.code === "negative"));

const frac = W.buildStatement(Object.assign({}, sample, { earnings: { basePay: 1000.5 } }));
assert.ok(frac.errors.some((e) => e.field === "basePay" && e.code === "notInteger"));

const keys = Object.keys(W.LABELS);
assert.ok(keys.length >= 36);
keys.forEach((k) => {
  ["ko"].concat(W.LANGS).forEach((l) => {
    assert.ok(typeof W.LABELS[k][l] === "string" && W.LABELS[k][l].length > 0, k + " missing " + l);
  });
  assert.strictEqual(Object.keys(W.LABELS[k]).length, 9, k + " language count");
});
assert.strictEqual(W.LANGS.length, 8);

const rem = W.buildReminders({ expiry: "2027-03-31", eventDate: "2026-11-10" });
const byKey = {};
rem.forEach((r) => {
  byKey[r.key] = r.date;
});
assert.strictEqual(rem.length, 5);
assert.strictEqual(byKey.windowOpen, "2026-11-30");
assert.strictEqual(byKey.before90, "2026-12-31");
assert.strictEqual(byKey.before30, "2027-03-01");
assert.strictEqual(byKey.expiry, "2027-03-31");
assert.strictEqual(byKey.report, "2026-11-25");
assert.strictEqual(W.buildReminders({ expiry: "2027-03-31" }).length, 4);
assert.strictEqual(W.buildReminders({ expiry: "bad" }).length, 0);

const ics = W.toICS(rem);
assert.strictEqual((ics.match(/BEGIN:VEVENT/g) || []).length, rem.length);
assert.strictEqual((ics.match(/END:VEVENT/g) || []).length, rem.length);
assert.ok(ics.startsWith("BEGIN:VCALENDAR\r\n"));
assert.ok(ics.endsWith("END:VCALENDAR\r\n"));
assert.ok(ics.includes("DTSTART;VALUE=DATE:20261125"));
ics.split("\r\n").forEach((line) => {
  assert.ok(Buffer.byteLength(line) <= 75);
});

console.log("ALL PASS");
