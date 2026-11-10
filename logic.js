(function (root) {
  const NOTICE = "본 도구는 입력한 금액을 서식에 배치하고 번역 라벨을 병기할 뿐이며, 임금 계산이나 노무, 세무, 출입국 대행을 하지 않습니다.";

  const LANGS = ["en", "vi", "ne", "km", "id", "th", "uz", "my"];
  const LANG_NAMES = {
    en: "English",
    vi: "Tiếng Việt",
    ne: "नेपाली",
    km: "ខ្មែរ",
    id: "Bahasa Indonesia",
    th: "ไทย",
    uz: "Oʻzbekcha",
    my: "မြန်မာ"
  };

  const L = (ko, en, vi, ne, km, id, th, uz, my) => ({ ko, en, vi, ne, km, id, th, uz, my });

  const LABELS = {
    title: L("임금명세서", "Wage Statement", "Bảng kê tiền lương", "तलब विवरण", "ប័ណ្ណបើកប្រាក់ឈ្នួល", "Rincian Upah", "ใบแจ้งรายการค่าจ้าง", "Ish haqi hisob-kitobi", "လုပ်ခလစာ ဖော်ပြချက်"),
    employerName: L("사업주(사업장명)", "Employer", "Người sử dụng lao động", "रोजगारदाता", "និយោជក", "Pemberi Kerja", "นายจ้าง", "Ish beruvchi", "အလုပ်ရှင်"),
    workerName: L("성명", "Employee Name", "Họ tên người lao động", "कामदारको नाम", "ឈ្មោះកម្មករ", "Nama Pekerja", "ชื่อลูกจ้าง", "Ishchining ismi", "အလုပ်သမားအမည်"),
    birthDate: L("생년월일", "Date of Birth", "Ngày sinh", "जन्म मिति", "ថ្ងៃខែឆ្នាំកំណើត", "Tanggal Lahir", "วันเกิด", "Tug'ilgan sana", "မွေးသက္ကရာဇ်"),
    employeeNo: L("사원번호", "Employee No.", "Mã số nhân viên", "कर्मचारी नम्बर", "លេខនិយោជិត", "Nomor Pegawai", "รหัสพนักงาน", "Xodim raqami", "ဝန်ထမ်းနံပါတ်"),
    payPeriod: L("임금 계산기간", "Pay Period", "Kỳ tính lương", "तलब अवधि", "រយៈពេលបើកប្រាក់", "Periode Gaji", "งวดการจ่ายค่าจ้าง", "Ish haqi davri", "လစာပေးချေသည့်ကာလ"),
    payDate: L("임금 지급일", "Payment Date", "Ngày trả lương", "भुक्तानी मिति", "កាលបរិច្ឆេទបើកប្រាក់", "Tanggal Pembayaran", "วันที่จ่ายค่าจ้าง", "To'lov sanasi", "ပေးချေသည့်ရက်စွဲ"),
    earningsSection: L("지급 내역", "Earnings", "Các khoản thu nhập", "आम्दानी", "ប្រាក់ចំណូល", "Penghasilan", "รายได้", "Daromadlar", "ရရှိငွေများ"),
    basePay: L("기본급", "Base Pay", "Lương cơ bản", "आधारभूत तलब", "ប្រាក់ខែគោល", "Gaji Pokok", "ค่าจ้างพื้นฐาน", "Asosiy ish haqi", "အခြေခံလစာ"),
    overtimePay: L("연장근로수당", "Overtime Pay", "Tiền làm thêm giờ", "ओभरटाइम भत्ता", "ប្រាក់ម៉ោងបន្ថែម", "Upah Lembur", "ค่าล่วงเวลา", "Qo'shimcha ish vaqti uchun haq", "အချိန်ပိုလုပ်ခ"),
    nightPay: L("야간근로수당", "Night Work Pay", "Tiền làm đêm", "रातिको काम भत्ता", "ប្រាក់ធ្វើការពេលយប់", "Upah Kerja Malam", "ค่าทำงานกะกลางคืน", "Tungi ish haqi", "ညဘက်လုပ်ခ"),
    holidayPay: L("휴일근로수당", "Holiday Work Pay", "Tiền làm ngày nghỉ", "बिदाको दिन काम भत्ता", "ប្រាក់ធ្វើការថ្ងៃឈប់សម្រាក", "Upah Kerja Hari Libur", "ค่าทำงานวันหยุด", "Dam olish kunidagi ish haqi", "အလုပ်ပိတ်ရက်လုပ်ခ"),
    annualLeavePay: L("연차수당", "Annual Leave Pay", "Tiền phép năm", "वार्षिक विदा भत्ता", "ប្រាក់ឈប់សម្រាកប្រចាំឆ្នាំ", "Upah Cuti Tahunan", "ค่าจ้างวันหยุดพักผ่อนประจำปี", "Yillik ta'til haqi", "နှစ်ပတ်လည်ခွင့်လုပ်ခ"),
    bonus: L("상여금", "Bonus", "Tiền thưởng", "बोनस", "ប្រាក់រង្វាន់", "Bonus", "โบนัส", "Mukofot", "ဘောနပ်စ်"),
    otherAllowance: L("기타수당", "Other Allowance", "Phụ cấp khác", "अन्य भत्ता", "ប្រាក់ឧបត្ថម្ភផ្សេងៗ", "Tunjangan Lain", "เงินเพิ่มอื่น ๆ", "Boshqa qo'shimcha to'lovlar", "အခြားထောက်ပံ့ကြေး"),
    totalEarnings: L("지급액 합계", "Total Earnings", "Tổng thu nhập", "कुल आम्दानी", "សរុបប្រាក់ចំណូល", "Total Penghasilan", "รวมรายได้", "Jami daromad", "ရရှိငွေစုစုပေါင်း"),
    deductionsSection: L("공제 내역", "Deductions", "Các khoản khấu trừ", "कटौती", "ការកាត់ប្រាក់", "Potongan", "รายการหัก", "Ushlanmalar", "နုတ်ယူငွေများ"),
    incomeTax: L("소득세", "Income Tax", "Thuế thu nhập", "आयकर", "ពន្ធលើប្រាក់ចំណូល", "Pajak Penghasilan", "ภาษีเงินได้", "Daromad solig'i", "ဝင်ငွေခွန်"),
    localIncomeTax: L("지방소득세", "Local Income Tax", "Thuế thu nhập địa phương", "स्थानीय आयकर", "ពន្ធលើប្រាក់ចំណូលក្នុងស្រុក", "Pajak Penghasilan Daerah", "ภาษีเงินได้ท้องถิ่น", "Mahalliy daromad solig'i", "ဒေသန္တရဝင်ငွေခွန်"),
    nationalPension: L("국민연금", "National Pension", "Bảo hiểm hưu trí quốc gia", "राष्ट्रिय पेन्सन", "ប្រាក់សោធនជាតិ", "Dana Pensiun Nasional", "เงินบำนาญแห่งชาติ", "Milliy pensiya", "အမျိုးသားပင်စင်"),
    healthInsurance: L("건강보험", "Health Insurance", "Bảo hiểm y tế", "स्वास्थ्य बीमा", "ធានារ៉ាប់រងសុខភាព", "Asuransi Kesehatan", "ประกันสุขภาพ", "Sog'liqni saqlash sug'urtasi", "ကျန်းမာရေးအာမခံ"),
    longTermCare: L("장기요양보험", "Long-term Care Insurance", "Bảo hiểm chăm sóc dài hạn", "दीर्घकालीन हेरचाह बीमा", "ធានារ៉ាប់រងថែទាំរយៈពេលវែង", "Asuransi Perawatan Jangka Panjang", "ประกันการดูแลระยะยาว", "Uzoq muddatli parvarish sug'urtasi", "ရေရှည်စောင့်ရှောက်မှုအာမခံ"),
    employmentInsurance: L("고용보험", "Employment Insurance", "Bảo hiểm thất nghiệp", "रोजगार बीमा", "ធានារ៉ាប់រងការងារ", "Asuransi Ketenagakerjaan", "ประกันการจ้างงาน", "Ish bilan ta'minlash sug'urtasi", "အလုပ်အကိုင်အာမခံ"),
    dormitoryFee: L("기숙사비", "Dormitory Fee", "Phí ký túc xá", "छात्रावास शुल्क", "ថ្លៃអន្តេវាសិកដ្ឋាន", "Biaya Asrama", "ค่าหอพัก", "Yotoqxona to'lovi", "အဆောင်ခ"),
    mealFee: L("식비", "Meal Fee", "Tiền ăn", "खाना शुल्क", "ថ្លៃអាហារ", "Biaya Makan", "ค่าอาหาร", "Ovqat to'lovi", "အစားအစာခ"),
    otherDeduction: L("기타 공제", "Other Deduction", "Khấu trừ khác", "अन्य कटौती", "ការកាត់ផ្សេងៗ", "Potongan Lain", "รายการหักอื่น ๆ", "Boshqa ushlanmalar", "အခြားနုတ်ယူငွေ"),
    totalDeductions: L("공제액 합계", "Total Deductions", "Tổng khấu trừ", "कुल कटौती", "សរុបការកាត់ប្រាក់", "Total Potongan", "รวมรายการหัก", "Jami ushlanmalar", "နုတ်ယူငွေစုစုပေါင်း"),
    netPay: L("실수령액", "Net Pay", "Thực lĩnh", "खुद भुक्तानी रकम", "ប្រាក់ទទួលបានសុទ្ធ", "Gaji Bersih", "ค่าจ้างสุทธิ", "Qo'lga tegadigan summa", "ရရှိမည့်လစာအသားတင်"),
    basisSection: L("계산 근거", "Calculation Basis", "Căn cứ tính", "गणना आधार", "មូលដ្ឋានគណនា", "Dasar Perhitungan", "ข้อมูลประกอบการคำนวณ", "Hisoblash asoslari", "တွက်ချက်မှုအခြေခံ"),
    daysWorked: L("근로일수", "Days Worked", "Số ngày làm việc", "काम गरेको दिन", "ចំនួនថ្ងៃធ្វើការ", "Jumlah Hari Kerja", "จำนวนวันทำงาน", "Ishlangan kunlar", "အလုပ်လုပ်ခဲ့သည့်ရက်"),
    totalHours: L("총 근로시간수", "Total Hours Worked", "Tổng số giờ làm việc", "कुल काम गरेको घण्टा", "ម៉ោងធ្វើការសរុប", "Total Jam Kerja", "จำนวนชั่วโมงทำงานรวม", "Jami ishlangan soat", "စုစုပေါင်းအလုပ်လုပ်ချိန်"),
    overtimeHours: L("연장근로시간", "Overtime Hours", "Số giờ làm thêm", "ओभरटाइम घण्टा", "ម៉ោងបន្ថែម", "Jam Lembur", "ชั่วโมงล่วงเวลา", "Qo'shimcha ish soatlari", "အချိန်ပိုနာရီ"),
    nightHours: L("야간근로시간", "Night Hours", "Số giờ làm đêm", "रातिको काम घण्टा", "ម៉ោងធ្វើការពេលយប់", "Jam Kerja Malam", "ชั่วโมงทำงานกลางคืน", "Tungi ish soatlari", "ညဘက်အလုပ်နာရီ"),
    holidayHours: L("휴일근로시간", "Holiday Hours", "Số giờ làm ngày nghỉ", "बिदाको दिन काम घण्टा", "ម៉ោងធ្វើការថ្ងៃឈប់សម្រាក", "Jam Kerja Hari Libur", "ชั่วโมงทำงานวันหยุด", "Dam olish kunidagi ish soatlari", "အလုပ်ပိတ်ရက်အလုပ်နာရီ"),
    hourlyWage: L("시간급 통상임금", "Hourly Wage", "Lương theo giờ", "घण्टाको तलब", "ប្រាក់ឈ្នួលក្នុងមួយម៉ោង", "Upah per Jam", "ค่าจ้างต่อชั่วโมง", "Soatlik ish haqi", "တစ်နာရီလုပ်ခ"),
    methodNote: L("계산방법", "Calculation Method Note", "Ghi chú cách tính", "गणना विधि टिप्पणी", "កំណត់សម្គាល់វិធីគណនា", "Catatan Metode Perhitungan", "หมายเหตุวิธีการคำนวณ", "Hisoblash usuli izohi", "တွက်ချက်ပုံနည်းလမ်းမှတ်ချက်")
  };

  const EARNING_KEYS = ["basePay", "overtimePay", "nightPay", "holidayPay", "annualLeavePay", "bonus", "otherAllowance"];
  const DEDUCTION_KEYS = ["incomeTax", "localIncomeTax", "nationalPension", "healthInsurance", "longTermCare", "employmentInsurance", "dormitoryFee", "mealFee", "otherDeduction"];
  const BASIS_KEYS = ["daysWorked", "totalHours", "overtimeHours", "nightHours", "holidayHours", "hourlyWage"];
  const BASIS_UNITS = { daysWorked: "일", totalHours: "시간", overtimeHours: "시간", nightHours: "시간", holidayHours: "시간", hourlyWage: "원" };
  const HOURS_FOR_PAY = { overtimePay: "overtimeHours", nightPay: "nightHours", holidayPay: "holidayHours" };

  const OFFSETS = {
    windowOpenMonths: 4,
    noticeLongDays: 90,
    noticeShortDays: 30,
    reportDays: 15
  };

  function parseDate(s) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(typeof s === "string" ? s.trim() : "");
    if (!m) return null;
    const y = +m[1];
    const mo = +m[2] - 1;
    const d = +m[3];
    const date = new Date(Date.UTC(y, mo, d));
    if (date.getUTCFullYear() !== y || date.getUTCMonth() !== mo || date.getUTCDate() !== d) return null;
    return date;
  }

  function fmtDate(d) {
    return d.toISOString().slice(0, 10);
  }

  function addDays(d, n) {
    return new Date(d.getTime() + n * 86400000);
  }

  function addMonths(d, n) {
    const y = d.getUTCFullYear();
    const m = d.getUTCMonth() + n;
    const last = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
    return new Date(Date.UTC(y, m, Math.min(d.getUTCDate(), last)));
  }

  function err(field, code, message) {
    return { field, code, message };
  }

  function parseNumber(v, field, errors, integerOnly) {
    if (v === undefined || v === null || v === "") return 0;
    const s = typeof v === "string" ? v.replace(/,/g, "").trim() : v;
    const n = typeof s === "string" ? (/^-?\d+(\.\d+)?$/.test(s) ? Number(s) : NaN) : s;
    if (typeof n !== "number" || !Number.isFinite(n)) {
      errors.push(err(field, "invalid", "숫자만 입력할 수 있습니다."));
      return 0;
    }
    if (n < 0) {
      errors.push(err(field, "negative", "음수는 입력할 수 없습니다."));
      return 0;
    }
    if (integerOnly && !Number.isInteger(n)) {
      errors.push(err(field, "notInteger", "원 단위 정수만 입력할 수 있습니다."));
      return 0;
    }
    return n;
  }

  function buildStatement(input) {
    const inp = input || {};
    const errors = [];
    const lang = LANGS.indexOf(inp.lang) >= 0 ? inp.lang : "en";
    const earningsIn = inp.earnings || {};
    const deductionsIn = inp.deductions || {};
    const basisIn = inp.basis || {};

    if (!String(inp.workerName || "").trim()) {
      errors.push(err("workerName", "missing", "근로자 성명이 필요합니다."));
    }
    const hasBirth = String(inp.birthDate || "").trim() !== "";
    const hasNo = String(inp.employeeNo || "").trim() !== "";
    if (!hasBirth && !hasNo) {
      errors.push(err("identifier", "missing", "생년월일 또는 사원번호 중 하나가 필요합니다."));
    }
    if (hasBirth && !parseDate(inp.birthDate)) {
      errors.push(err("birthDate", "invalid", "생년월일 형식이 올바르지 않습니다."));
    }
    if (!String(inp.payDate || "").trim()) {
      errors.push(err("payDate", "missing", "임금 지급일이 필요합니다."));
    } else if (!parseDate(inp.payDate)) {
      errors.push(err("payDate", "invalid", "임금 지급일 형식이 올바르지 않습니다."));
    }

    const earnings = {};
    EARNING_KEYS.forEach((k) => {
      earnings[k] = parseNumber(earningsIn[k], k, errors, true);
    });
    const deductions = {};
    DEDUCTION_KEYS.forEach((k) => {
      deductions[k] = parseNumber(deductionsIn[k], k, errors, true);
    });
    const basis = {};
    BASIS_KEYS.forEach((k) => {
      basis[k] = parseNumber(basisIn[k], k, errors, k === "hourlyWage");
    });

    const totalEarnings = EARNING_KEYS.reduce((s, k) => s + earnings[k], 0);
    const totalDeductions = DEDUCTION_KEYS.reduce((s, k) => s + deductions[k], 0);
    const netPay = totalEarnings - totalDeductions;

    if (totalEarnings === 0 && !errors.some((e) => EARNING_KEYS.indexOf(e.field) >= 0)) {
      errors.push(err("earnings", "missing", "지급 항목이 최소 한 줄 필요합니다."));
    }
    Object.keys(HOURS_FOR_PAY).forEach((payKey) => {
      const hk = HOURS_FOR_PAY[payKey];
      if (earnings[payKey] > 0 && !(basis[hk] > 0)) {
        errors.push(err(hk, "hoursRequired", LABELS[payKey].ko + "이(가) 있으면 " + LABELS[hk].ko + "을(를) 입력해야 합니다."));
      }
    });
    if (netPay < 0) {
      errors.push(err("netPay", "negativeNet", "공제액 합계가 지급액 합계보다 큽니다."));
    }

    const tr = (key) => LABELS[key][lang];
    const rows = [];
    const row = (section, key, amount, unit, total) => {
      rows.push({ section, key, ko: LABELS[key].ko, label: tr(key), amount, unit: unit || "원", total: !!total });
    };
    EARNING_KEYS.forEach((k) => {
      if (earnings[k] > 0) row("earnings", k, earnings[k]);
    });
    row("earnings", "totalEarnings", totalEarnings, "원", true);
    DEDUCTION_KEYS.forEach((k) => {
      if (deductions[k] > 0) row("deductions", k, deductions[k]);
    });
    row("deductions", "totalDeductions", totalDeductions, "원", true);
    row("net", "netPay", netPay, "원", true);
    BASIS_KEYS.forEach((k) => {
      if (basis[k] > 0) row("basis", k, basis[k], BASIS_UNITS[k]);
    });

    return { ok: errors.length === 0, errors, totalEarnings, totalDeductions, netPay, rows };
  }

  function buildReminders(input) {
    const inp = input || {};
    const expiry = parseDate(inp.expiry);
    if (!expiry) return [];
    const out = [];
    const add = (key, date, summary, description) => {
      out.push({ key, date: fmtDate(date), summary, description });
    };
    add(
      "windowOpen",
      addMonths(expiry, -OFFSETS.windowOpenMonths),
      "체류기간 연장 신청 가능 시작 (만료 " + OFFSETS.windowOpenMonths + "개월 전)",
      "체류기간 만료일 " + fmtDate(expiry) + " 기준으로 연장 신청 가능 기간이 시작되는 날입니다."
    );
    add(
      "before90",
      addDays(expiry, -OFFSETS.noticeLongDays),
      "체류기간 만료 " + OFFSETS.noticeLongDays + "일 전",
      "체류기간 만료일 " + fmtDate(expiry) + " 기준 점검일입니다."
    );
    add(
      "before30",
      addDays(expiry, -OFFSETS.noticeShortDays),
      "체류기간 만료 " + OFFSETS.noticeShortDays + "일 전",
      "체류기간 만료일 " + fmtDate(expiry) + " 기준 최종 점검일입니다."
    );
    add("expiry", expiry, "체류기간 만료일", "체류기간이 만료되는 날입니다.");
    const event = parseDate(inp.eventDate);
    if (event) {
      add(
        "report",
        addDays(event, OFFSETS.reportDays),
        "고용변동 신고 기한 (사유 발생 후 " + OFFSETS.reportDays + "일)",
        "고용변동 사유 발생일 " + fmtDate(event) + " 다음 날을 1일로 계산한 기한입니다."
      );
    }
    out.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
    return out;
  }

  function icsEscape(s) {
    return String(s).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
  }

  function fold(line) {
    const enc = new TextEncoder();
    const parts = [];
    let cur = "";
    let bytes = 0;
    let limit = 75;
    for (const ch of line) {
      const n = enc.encode(ch).length;
      if (bytes + n > limit) {
        parts.push(cur);
        cur = "";
        bytes = 0;
        limit = 74;
      }
      cur += ch;
      bytes += n;
    }
    parts.push(cur);
    return parts.join("\r\n ");
  }

  function compact(dateStr) {
    return dateStr.replace(/-/g, "");
  }

  function toICS(reminders) {
    const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//wage-slip//reminders//KO", "CALSCALE:GREGORIAN"];
    (reminders || []).forEach((r) => {
      const d = parseDate(r.date);
      lines.push("BEGIN:VEVENT");
      lines.push("UID:" + r.key + "-" + compact(r.date) + "@wage-slip.local");
      lines.push("DTSTAMP:" + new Date().toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z");
      lines.push("DTSTART;VALUE=DATE:" + compact(r.date));
      lines.push("DTEND;VALUE=DATE:" + compact(fmtDate(addDays(d, 1))));
      lines.push("SUMMARY:" + icsEscape(r.summary));
      lines.push("DESCRIPTION:" + icsEscape(r.description + "\n" + NOTICE));
      lines.push("END:VEVENT");
    });
    lines.push("END:VCALENDAR");
    return lines.map(fold).join("\r\n") + "\r\n";
  }

  const api = {
    NOTICE,
    LANGS,
    LANG_NAMES,
    LABELS,
    EARNING_KEYS,
    DEDUCTION_KEYS,
    BASIS_KEYS,
    OFFSETS,
    buildStatement,
    buildReminders,
    toICS
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  } else {
    root.WageLogic = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : this);
