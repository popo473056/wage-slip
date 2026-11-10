# wage-slip

A client-side tool for small Korean employers of foreign workers. It lays out the
monthly wage statement (임금명세서) as a bilingual A4 document, Korean plus the
worker's language, and exports immigration deadline reminders as an .ics file.

## Use
Open `index.html` in a browser. No build step, server, or dependency.
Form state stays in the browser's localStorage.

## Test
Run `node test.js`. It prints `ALL PASS` on success.

## Legal constraint
The tool never computes wages, tax, or insurance deductions. The employer types
every amount. The tool sums the entered lines, places them in the form, and shows
fixed pre-translated labels. It offers no labor, tax, or immigration agency
service. Every screen and document carries a Korean notice saying so.

## Translations
All non-Korean labels (English, Vietnamese, Nepali, Khmer, Indonesian, Thai,
Uzbek, Burmese) are machine-drafted and unreviewed. Have a native speaker review
them before real use.
