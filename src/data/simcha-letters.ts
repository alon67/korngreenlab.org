// The "Letters to Simcha" series: satirical open letters addressed to MK Simcha
// Rothman, published as Facebook posts between June 2023 and December 2024.
// Listed oldest first, the order in which they were written.
//
// Numbers are the author's own numbering. One letter (4 November 2023) sits
// outside that sequence and is shown without a number.
// To maintain: add entries below in date order; keep dates in YYYY-MM-DD form.

export interface SimchaLetter {
  /** The author's letter number, or null for the one outside the sequence. */
  number: number | null;
  /** Letter title (Hebrew). */
  title: string;
  /** Publication date, ISO 8601 (YYYY-MM-DD). */
  date: string;
  /** Facebook post URL. */
  url: string;
}

export const simchaLettersPage = {
  path: "/letters-to-simcha",
  heading: "\u05de\u05db\u05ea\u05d1\u05d9\u05dd \u05dc\u05e9\u05de\u05d7\u05d4",
  headingLatin: "Letters to Simcha",
  blurb:
    "A series of satirical open letters addressed to MK Simcha Rothman, written " +
    "during the judicial overhaul and the war that followed, and published on Facebook " +
    "between June 2023 and December 2024.",
};

export const simchaLetters: SimchaLetter[] = [
  {
    number: 1,
    title: "ביקורך באוניברסיטת תל-אביב",
    date: "2023-06-04",
    url: "https://www.facebook.com/alon.korngreen/posts/2425398640974355",
  },
  {
    number: 2,
    title: "הערך המוסף של מנעול הדלת",
    date: "2023-07-03",
    url: "https://www.facebook.com/alon.korngreen/posts/2446071698907049",
  },
  {
    number: 3,
    title: "מחר תזרח השמש",
    date: "2023-07-14",
    url: "https://www.facebook.com/alon.korngreen/posts/2453906801456872",
  },
  {
    number: 4,
    title: "פתגמי חז״ל",
    date: "2023-07-28",
    url: "https://www.facebook.com/alon.korngreen/posts/2463389383841947",
  },
  {
    number: 5,
    title: "התמודדות עם טראומה",
    date: "2023-08-03",
    url: "https://www.facebook.com/alon.korngreen/posts/2467845833396302",
  },
  {
    number: 6,
    title: "רבני שכונות",
    date: "2023-08-09",
    url: "https://www.facebook.com/alon.korngreen/posts/2471620956352123",
  },
  {
    number: 7,
    title: "תודעת מצור",
    date: "2023-08-13",
    url: "https://www.facebook.com/alon.korngreen/posts/2474097209437831",
  },
  {
    number: 8,
    title: "הטנקים של אהרון ברק",
    date: "2023-08-16",
    url: "https://www.facebook.com/alon.korngreen/posts/2476093149238237",
  },
  {
    number: 9,
    title: "סרבנים הם ספיידרמן",
    date: "2023-08-19",
    url: "https://www.facebook.com/alon.korngreen/posts/2478023405711878",
  },
  {
    number: 10,
    title: "מצע הבחירות של המפלגות",
    date: "2023-08-22",
    url: "https://www.facebook.com/alon.korngreen/posts/2479865152194370",
  },
  {
    number: 11,
    title: "הצטרפותך לתנועת המחאה",
    date: "2023-08-23",
    url: "https://www.facebook.com/alon.korngreen/posts/2480466068800945",
  },
  {
    number: 12,
    title: "ביקורך בערוץ 14",
    date: "2023-08-29",
    url: "https://www.facebook.com/alon.korngreen/posts/2484442815069937",
  },
  {
    number: 13,
    title: "התפרעויות בדרום תל-אביב",
    date: "2023-09-05",
    url: "https://www.facebook.com/alon.korngreen/posts/2488834091297476",
  },
  {
    number: 14,
    title: "נאומך בדיון בבג״ץ",
    date: "2023-09-13",
    url: "https://www.facebook.com/alon.korngreen/posts/2494374087410143",
  },
  {
    number: 15,
    title: "היום שאחרי בג״ץ",
    date: "2023-09-18",
    url: "https://www.facebook.com/alon.korngreen/posts/2497925510388334",
  },
  {
    number: 16,
    title: "דיסונאנס קוגניטיבי",
    date: "2023-09-20",
    url: "https://www.facebook.com/alon.korngreen/posts/2499396540241231",
  },
  {
    number: 17,
    title: "לאחר השבת השחורה",
    date: "2023-10-12",
    url: "https://www.facebook.com/alon.korngreen/posts/2514343632079855",
  },
  {
    number: 18,
    title: "ביקורך בעוטף עזה",
    date: "2023-10-19",
    url: "https://www.facebook.com/alon.korngreen/posts/2518936518287233",
  },
  {
    number: 19,
    title: "החזרה לקפלן",
    date: "2023-10-20",
    url: "https://www.facebook.com/alon.korngreen/posts/2519724854875066",
  },
  {
    number: 20,
    title: "שחרור החטופים מעזה",
    date: "2023-11-02",
    url: "https://www.facebook.com/alon.korngreen/posts/2528280654019486",
  },
  {
    number: null,
    title: "הסיפורים שאנו מספרים לעצמנו",
    date: "2023-11-04",
    url: "https://www.facebook.com/alon.korngreen/posts/2529320180582200",
  },
  {
    number: 21,
    title: "קצת על בהירות המחשבה",
    date: "2023-11-05",
    url: "https://www.facebook.com/alon.korngreen/posts/2530208240493394",
  },
  {
    number: 22,
    title: "ולא תהייה למוות שליטה",
    date: "2023-11-22",
    url: "https://www.facebook.com/alon.korngreen/posts/2540250629489155",
  },
  {
    number: 23,
    title: "גמביט",
    date: "2023-11-29",
    url: "https://www.facebook.com/alon.korngreen/posts/2544602425720642",
  },
  {
    number: 24,
    title: "דה-נאציפיקציה של עזה",
    date: "2023-12-03",
    url: "https://www.facebook.com/alon.korngreen/posts/2547194208794797",
  },
  {
    number: 25,
    title: "אודות אלימות וכלי נשק",
    date: "2023-12-05",
    url: "https://www.facebook.com/alon.korngreen/posts/2548338048680413",
  },
  {
    number: 26,
    title: "אמנת איסטנבול והזעם הקדוש",
    date: "2023-12-11",
    url: "https://www.facebook.com/alon.korngreen/posts/2552372038277014",
  },
  {
    number: 27,
    title: "השחף",
    date: "2023-12-13",
    url: "https://www.facebook.com/alon.korngreen/posts/2553582564822628",
  },
  {
    number: 28,
    title: "אנשי האתמול",
    date: "2023-12-26",
    url: "https://www.facebook.com/alon.korngreen/posts/2562755340572017",
  },
  {
    number: 29,
    title: "בהמתנה לבג״צ הסבירות",
    date: "2023-12-28",
    url: "https://www.facebook.com/alon.korngreen/posts/2564179157096302",
  },
  {
    number: 30,
    title: "ביבי וצ׳ימברלין",
    date: "2023-12-30",
    url: "https://www.facebook.com/alon.korngreen/posts/2565636650283886",
  },
  {
    number: 31,
    title: "מלכודת הפתאים",
    date: "2024-01-01",
    url: "https://www.facebook.com/alon.korngreen/posts/2566905013490383",
  },
  {
    number: 32,
    title: "שמחה 2.0",
    date: "2024-01-05",
    url: "https://www.facebook.com/alon.korngreen/posts/2569560529891498",
  },
  {
    number: 33,
    title: "בין שתי כיכרות",
    date: "2024-01-09",
    url: "https://www.facebook.com/alon.korngreen/posts/2572425102938374",
  },
  {
    number: 34,
    title: "רוזנגנץ ואיזנשטרן תקועים",
    date: "2024-01-11",
    url: "https://www.facebook.com/alon.korngreen/posts/2573508812830003",
  },
  {
    number: 35,
    title: "היד שחתמה על הדף",
    date: "2024-01-12",
    url: "https://www.facebook.com/alon.korngreen/posts/2574307612750123",
  },
  {
    number: 36,
    title: "הכאב",
    date: "2024-01-16",
    url: "https://www.facebook.com/alon.korngreen/posts/2577370969110454",
  },
  {
    number: 37,
    title: "חשיבה קסומה",
    date: "2024-01-18",
    url: "https://www.facebook.com/alon.korngreen/posts/2578858462295038",
  },
  {
    number: 38,
    title: "תספורת",
    date: "2024-01-22",
    url: "https://www.facebook.com/alon.korngreen/posts/2581608562020028",
  },
  {
    number: 39,
    title: "מלחמה לנצח",
    date: "2024-01-24",
    url: "https://www.facebook.com/alon.korngreen/posts/2583286795185538",
  },
  {
    number: 40,
    title: "הרהורים על פלוגיסטון",
    date: "2024-01-26",
    url: "https://www.facebook.com/alon.korngreen/posts/2584448348402716",
  },
  {
    number: 41,
    title: "ואתם רוקדים",
    date: "2024-01-29",
    url: "https://www.facebook.com/alon.korngreen/posts/2586945141486370",
  },
  {
    number: 42,
    title: "על טיפשות ורשעות",
    date: "2024-02-01",
    url: "https://www.facebook.com/alon.korngreen/posts/2589052981275586",
  },
  {
    number: 43,
    title: "השבת בה חזר הצבע",
    date: "2024-02-04",
    url: "https://www.facebook.com/alon.korngreen/posts/2590853034428914",
  },
  {
    number: 44,
    title: "מכתב למשורר צעיר",
    date: "2024-02-08",
    url: "https://www.facebook.com/alon.korngreen/posts/2594251687422382",
  },
  {
    number: 45,
    title: "שירת הסירנות",
    date: "2024-02-13",
    url: "https://www.facebook.com/alon.korngreen/posts/2598473807000170",
  },
  {
    number: 46,
    title: "למה להפגין עכשיו?",
    date: "2024-02-20",
    url: "https://www.facebook.com/alon.korngreen/posts/2603306996516851",
  },
  {
    number: 47,
    title: "בחלומי",
    date: "2024-02-27",
    url: "https://www.facebook.com/alon.korngreen/posts/2607884296059121",
  },
  {
    number: 48,
    title: "ההיסטוריה חורזת",
    date: "2024-03-03",
    url: "https://www.facebook.com/alon.korngreen/posts/2611154489065435",
  },
  {
    number: 49,
    title: "שמות המפלגות לבחירות",
    date: "2024-03-07",
    url: "https://www.facebook.com/alon.korngreen/posts/2613711902143027",
  },
  {
    number: 50,
    title: "הסטטוס קוו",
    date: "2024-03-11",
    url: "https://www.facebook.com/alon.korngreen/posts/2616084985239052",
  },
  {
    number: 51,
    title: "החגיגה נגמרת",
    date: "2024-03-17",
    url: "https://www.facebook.com/alon.korngreen/posts/2620209034826647",
  },
  {
    number: 52,
    title: "החגיגה חוזרת",
    date: "2024-10-24",
    url: "https://www.facebook.com/alon.korngreen/posts/2813400705507478",
  },
  {
    number: 53,
    title: "חוקי ההשתקה",
    date: "2024-11-05",
    url: "https://www.facebook.com/alon.korngreen/posts/2826141844233364",
  },
  {
    number: 54,
    title: "מסיבת התה לגלי",
    date: "2024-11-18",
    url: "https://www.facebook.com/alon.korngreen/posts/2836800689834146",
  },
  {
    number: 55,
    title: "נציב תלונות הציבור על השופטים",
    date: "2024-12-01",
    url: "https://www.facebook.com/alon.korngreen/posts/2847086165472265",
  },
  {
    number: 56,
    title: "היבריס, היבריס ועוד היבריס",
    date: "2024-12-12",
    url: "https://www.facebook.com/alon.korngreen/posts/2856139037900311",
  },
  {
    number: 57,
    title: "יריבי יא חביבי",
    date: "2024-12-15",
    url: "https://www.facebook.com/alon.korngreen/posts/2858146324366249",
  },
];
