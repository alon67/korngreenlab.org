// Auto-generated curated list of Alon Korngreen's public essays on Zman Israel.
// Source list: blog_links.md (58 URLs). Metadata (title, publication date, canonical
// URL) extracted from each article's schema.org / Open Graph metadata.
// Titles are the published Hebrew headlines with the recurring byline prefix
// "פרופ' אלון קורנגרין:" removed. Dates are ISO 8601 (publication day).
// To maintain: add/edit entries below; keep dates in YYYY-MM-DD form.
// Letters to the editor published in other outlets live in the separate
// `letters` array further down.

export type EssayCategory = "science" | "society" | "personal";

export interface Essay {
  /** Exact published article title (Hebrew). */
  title: string;
  /** Canonical article URL. */
  url: string;
  /** Publication date, ISO 8601 (YYYY-MM-DD). */
  date: string;
  category: EssayCategory;
}

export interface EssaySection {
  key: EssayCategory;
  heading: string;
  blurb: string;
}

/**
 * Letters to the editor published in the press. Kept separate from the Zman
 * Israel blog essays above because they appear in other outlets and are a
 * different form of writing.
 */
export interface PressLetter {
  /** Published letter title (Hebrew). */
  title: string;
  /** Article URL. */
  url: string;
  /** Publication date, ISO 8601 (YYYY-MM-DD). */
  date: string;
  /** Outlet the letter appeared in, e.g. "Haaretz". */
  publication: string;
}

export const lettersSection = {
  heading: "Letters and Op-Eds",
  blurb: "Letters and opinion pieces published in the Israeli press, responding to the news and to other writers.",
};

export const letters: PressLetter[] = [
  {
    title: "בן גביר ועידית סילמן רוצים להכשיר תנינים, אבל תנין לא יודע מיהו אסיר",
    url: "https://www.haaretz.co.il/opinions/letters/2026-07-19/ty-article-opinion/.premium/0000019f-7aa6-d316-a9df-7aefcb710000",
    date: "2026-07-19",
    publication: "Haaretz",
  },
  {
    title: "ממש שמחה וששון",
    url: "https://www.haaretz.co.il/opinions/letters/2024-10-28/ty-article-opinion/.premium/00000192-d285-d628-a9df-fadf49e10000",
    date: "2024-10-28",
    publication: "Haaretz",
  },
  {
    title: "מיכאל האוזר טוב, הפגנה נגד הממשלה היא חובתם של ראשי המחאה",
    url: "https://www.haaretz.co.il/opinions/2024-03-06/ty-article-opinion/.premium/0000018e-1408-d1cc-abfe-d7ad4d400000",
    date: "2024-03-06",
    publication: "Haaretz",
  },
  {
    title: "רוטמן, על ביאליק שמעת?",
    url: "https://www.haaretz.co.il/opinions/letters/2023-07-16/ty-article-opinion/.premium/00000189-5daa-dc94-a78d-fdebf1000000",
    date: "2023-07-16",
    publication: "Haaretz",
  },
];

/** Podcast episodes featuring Alon Korngreen. */
export interface PodcastEpisode {
  /** Episode title (Hebrew). */
  title: string;
  /** Episode URL. */
  url: string;
  /** Publication date, ISO 8601 (YYYY-MM-DD). */
  date: string;
  /** Podcast/show name. */
  show: string;
}

export const podcastsSection = {
  heading: "Podcasts",
  blurb: "Conversations and interviews on neuroscience, the brain and public life.",
};

/** Edited collections / other public projects. */
export interface EditedCollection {
  /** Project or collection title. */
  title: string;
  /** Project URL. */
  url: string;
  /** Timeframe label, e.g. "Since 2023". */
  period: string;
}

export const collectionsSection = {
  heading: "Edited Collections",
  blurb: "Collections of protest speeches delivered by academics across Israel in defense of democracy, which I edited over the past three years.",
};

export const collections: EditedCollection[] = [
  {
    title: "יצאנו לרחובות — SPEAK OUT",
    url: "https://www.matehaacademia.org/",
    period: "Since 2023",
  },
];

export const podcasts: PodcastEpisode[] = [
  {
    title: "מדען פוגש ידוען, # 4: איך מנצחים באולימפיאדה, פרופ' אלון קורנגרין",
    url: "https://open.spotify.com/episode/1sX9OElI9yI4TJSuvbJJkJ",
    date: "2023-09-21",
    show: "בר-דעת, הפודקאסט של בר-אילן",
  },
  {
    title: "מסתורי המוח פרק #3: תולדות חקר המוח - פרופ' אלון קורנגרין",
    url: "https://open.spotify.com/episode/2tVxzifxmOb4YF67tVWB7S",
    date: "2025-01-08",
    show: "בר-דעת, הפודקאסט של בר-אילן",
  },
  {
    title: "מסתורי המוח פרק #4: האם המוח הוא מחשב? פרופ' אלון קורנגרין",
    url: "https://open.spotify.com/episode/1yN4klPVZ03mL5yNNJwXFC",
    date: "2025-01-09",
    show: "בר-דעת, הפודקאסט של בר-אילן",
  },
  {
    title: "מסתורי המוח פרק #6: החשמל במוח - פרופ' אלון קורנגרין",
    url: "https://open.spotify.com/episode/21arE5XgcO5i3aRVVE54w8",
    date: "2025-01-12",
    show: "בר-דעת, הפודקאסט של בר-אילן",
  },
  {
    title: "מסתורי המוח פרק #7: איך זורם החשמל במוח? פרופ' אלון קורנגרין",
    url: "https://open.spotify.com/episode/7ksY3cNqKhwauh0rwm99oV",
    date: "2025-01-13",
    show: "בר-דעת, הפודקאסט של בר-אילן",
  },
  {
    title: "הטריק של ינון מגל ולמה לעולם לא תשכנעו ביביסטים שהם טועים | פרק 234",
    url: "https://open.spotify.com/episode/6EKPa32V7F2Ccr0nMgyPCt",
    date: "2025-05-22",
    show: "המרקרים",
  },
];

/** Category sections, in display order. */
export const essaySections: EssaySection[] = [
  {
    key: "science",
    heading: "Science, Technology and the Mind",
    blurb: "Essays on neuroscience, artificial intelligence, cognition and the culture of research.",
  },
  {
    key: "society",
    heading: "Israeli Society and Public Life",
    blurb: "Commentary on Israeli democracy, government, war, public institutions and current affairs.",
  },
  {
    key: "personal",
    heading: "Personal Essays, Satire and Photography",
    blurb: "Autobiographical and literary writing, satire, photography and the \u201cTopi\u201d series.",
  },
];

export const essays: Essay[] = [
  {
    "title": "תן וצבוע הגיעו לפשרה",
    "url": "https://www.zman.co.il/553197/",
    "date": "2025-01-14",
    "category": "personal"
  },
  {
    "title": "שקרים רבותיי, שקרים",
    "url": "https://www.zman.co.il/555052/",
    "date": "2025-01-21",
    "category": "society"
  },
  {
    "title": "הוי פולניה שלי",
    "url": "https://www.zman.co.il/556294/",
    "date": "2025-01-26",
    "category": "society"
  },
  {
    "title": "טבח החיילים במלמדי כמשל",
    "url": "https://www.zman.co.il/557000/",
    "date": "2025-01-29",
    "category": "society"
  },
  {
    "title": "מדור המתחרטים",
    "url": "https://www.zman.co.il/558468/",
    "date": "2025-02-02",
    "category": "personal"
  },
  {
    "title": "טראמפ 2.0 – נשיא בהפרעה",
    "url": "https://www.zman.co.il/561291/",
    "date": "2025-02-08",
    "category": "society"
  },
  {
    "title": "הדוב שנלחם עם הצבא הפולני",
    "url": "https://www.zman.co.il/560521/",
    "date": "2025-02-11",
    "category": "personal"
  },
  {
    "title": "רגע להתרגש וממשיכות להתעקש",
    "url": "https://www.zman.co.il/563856/",
    "date": "2025-02-18",
    "category": "society"
  },
  {
    "title": "חשוב להכיר, פרויקט 2025",
    "url": "https://www.zman.co.il/564512/",
    "date": "2025-02-19",
    "category": "society"
  },
  {
    "title": "ולא תהיה למוות שליטה",
    "url": "https://www.zman.co.il/567449/",
    "date": "2025-02-27",
    "category": "personal"
  },
  {
    "title": "שלא תאמרו שלא אמרו לכם לפני שנתיים",
    "url": "https://www.zman.co.il/567239/",
    "date": "2025-02-28",
    "category": "society"
  },
  {
    "title": "מיקור החוץ של הנפש",
    "url": "https://www.zman.co.il/568848/",
    "date": "2025-03-06",
    "category": "science"
  },
  {
    "title": "זמן לשבור את השתיקה – לקחים ממרטין לותר קינג למאבק הישראלי",
    "url": "https://www.zman.co.il/571979/",
    "date": "2025-03-18",
    "category": "society"
  },
  {
    "title": "אף פעם אל תכוון לייזר על מראה",
    "url": "https://www.zman.co.il/573141/",
    "date": "2025-03-20",
    "category": "society"
  },
  {
    "title": "את התמונות האלה אי אפשר לתקן בפוטושופ",
    "url": "https://www.zman.co.il/579998/",
    "date": "2025-04-16",
    "category": "personal"
  },
  {
    "title": "להתבונן בסבלם של אחרים",
    "url": "https://www.zman.co.il/581408/",
    "date": "2025-04-21",
    "category": "personal"
  },
  {
    "title": "השבוע העלמתי קרנף",
    "url": "https://www.zman.co.il/585686/",
    "date": "2025-05-05",
    "category": "personal"
  },
  {
    "title": "איך ינון מגל משחק במוח שלכם",
    "url": "https://www.zman.co.il/589236/",
    "date": "2025-05-15",
    "category": "science"
  },
  {
    "title": "ותודה לחות'ים",
    "url": "https://www.zman.co.il/589051/",
    "date": "2025-05-16",
    "category": "personal"
  },
  {
    "title": "ומה עם בריחת המוחות?",
    "url": "https://www.zman.co.il/592078/",
    "date": "2025-05-27",
    "category": "society"
  },
  {
    "title": "הצעה צנועה",
    "url": "https://www.zman.co.il/593348/",
    "date": "2025-06-03",
    "category": "personal"
  },
  {
    "title": "נקמה ממכרת",
    "url": "https://www.zman.co.il/595053/",
    "date": "2025-06-07",
    "category": "science"
  },
  {
    "title": "בעקבות הזמן העומד",
    "url": "https://www.zman.co.il/599326/",
    "date": "2025-06-19",
    "category": "science"
  },
  {
    "title": "זה לא כל כך נעים לראות ים סגור",
    "url": "https://www.zman.co.il/600400/",
    "date": "2025-06-23",
    "category": "society"
  },
  {
    "title": "טראמפ הוא לא רוזוולט",
    "url": "https://www.zman.co.il/600576/",
    "date": "2025-07-08",
    "category": "society"
  },
  {
    "title": "פרקינסון והעיר ההומניטרית",
    "url": "https://www.zman.co.il/608303/",
    "date": "2025-07-21",
    "category": "society"
  },
  {
    "title": "הדרך לפתח תקווה",
    "url": "https://www.zman.co.il/610573/",
    "date": "2025-08-01",
    "category": "science"
  },
  {
    "title": "וירוס הקיץ של הפולני",
    "url": "https://www.zman.co.il/612571/",
    "date": "2025-08-05",
    "category": "science"
  },
  {
    "title": "תועלתנות או פשיזם?",
    "url": "https://www.zman.co.il/614188/",
    "date": "2025-08-13",
    "category": "society"
  },
  {
    "title": "מהו רצח עם",
    "url": "https://www.zman.co.il/616139/",
    "date": "2025-08-19",
    "category": "society"
  },
  {
    "title": "הסיפור שאנו מספרים לעצמנו",
    "url": "https://www.zman.co.il/631174/",
    "date": "2025-10-14",
    "category": "science"
  },
  {
    "title": "הסתיימה?",
    "url": "https://www.zman.co.il/632013/",
    "date": "2025-10-16",
    "category": "society"
  },
  {
    "title": "בשבחי הביסמוט",
    "url": "https://www.zman.co.il/635056/",
    "date": "2025-10-27",
    "category": "science"
  },
  {
    "title": "חזרתו של הגטו",
    "url": "https://www.zman.co.il/646743/",
    "date": "2025-12-13",
    "category": "society"
  },
  {
    "title": "חג החנוכה של הכלבה",
    "url": "https://www.zman.co.il/649350/",
    "date": "2025-12-19",
    "category": "personal"
  },
  {
    "title": "תנינים בחלל",
    "url": "https://www.zman.co.il/651155/",
    "date": "2025-12-29",
    "category": "personal"
  },
  {
    "title": "רוטמן מכחיש מציאות בשידור חי",
    "url": "https://www.zman.co.il/652183/",
    "date": "2026-01-01",
    "category": "society"
  },
  {
    "title": "המדריך המדעי לזיכרון של רצח",
    "url": "https://www.zman.co.il/652910/",
    "date": "2026-01-05",
    "category": "science"
  },
  {
    "title": "רוטמן, שר הטבעות ואווטאר",
    "url": "https://www.zman.co.il/656369/",
    "date": "2026-01-19",
    "category": "society"
  },
  {
    "title": "מה למדתי מאלף נאומי מחאה",
    "url": "https://www.zman.co.il/657261/",
    "date": "2026-01-24",
    "category": "society"
  },
  {
    "title": "הזנבות של העקומה מכשכשים בכלב",
    "url": "https://www.zman.co.il/657901/",
    "date": "2026-01-25",
    "category": "science"
  },
  {
    "title": "פה זה כן פולין",
    "url": "https://www.zman.co.il/658659/",
    "date": "2026-01-31",
    "category": "society"
  },
  {
    "title": "נתניהו קוטף דובדבנים",
    "url": "https://www.zman.co.il/662999/",
    "date": "2026-02-13",
    "category": "society"
  },
  {
    "title": "העולם משתנה – האם נשכיל להשתנות ביחד איתו?",
    "url": "https://www.zman.co.il/662231/",
    "date": "2026-02-16",
    "category": "society"
  },
  {
    "title": "זמנים מעניינים",
    "url": "https://www.zman.co.il/665394/",
    "date": "2026-02-27",
    "category": "science"
  },
  {
    "title": "יומן המלחמה של טופי",
    "url": "https://www.zman.co.il/667655/",
    "date": "2026-03-02",
    "category": "personal"
  },
  {
    "title": "יומן המלחמה של טופי, פרק שני",
    "url": "https://www.zman.co.il/667896/",
    "date": "2026-03-03",
    "category": "personal"
  },
  {
    "title": "יומן המלחמה של טופי, פרק שלישי",
    "url": "https://www.zman.co.il/668592/",
    "date": "2026-03-08",
    "category": "personal"
  },
  {
    "title": "הסכנה היא בדרישה לשתוק",
    "url": "https://www.zman.co.il/670754/",
    "date": "2026-03-13",
    "category": "society"
  },
  {
    "title": "יומן המלחמה של טופי, פרק רביעי",
    "url": "https://www.zman.co.il/669924/",
    "date": "2026-03-15",
    "category": "personal"
  },
  {
    "title": "יומן המלחמה של טופי, פרק חמישי",
    "url": "https://www.zman.co.il/672179/",
    "date": "2026-03-19",
    "category": "personal"
  },
  {
    "title": "אסימוב מחייך עכשיו?",
    "url": "https://www.zman.co.il/665831/",
    "date": "2026-04-17",
    "category": "science"
  },
  {
    "title": "על שליטים, מחלות, והאנשים שעוזרים להם לשקר",
    "url": "https://www.zman.co.il/685150/",
    "date": "2026-05-10",
    "category": "society"
  },
  {
    "title": "הגיע הזמן ללחוץ",
    "url": "https://www.zman.co.il/688017/",
    "date": "2026-05-24",
    "category": "society"
  },
  {
    "title": "בינה מלאכותית, רגשות אמיתיים",
    "url": "https://www.zman.co.il/689161/",
    "date": "2026-05-30",
    "category": "science"
  },
  {
    "title": "בחינת הבגרות של ישראל",
    "url": "https://www.zman.co.il/692122/",
    "date": "2026-06-14",
    "category": "society"
  },
  {
    "title": "גמר גביע",
    "url": "https://www.zman.co.il/702061/",
    "date": "2026-07-10",
    "category": "personal"
  },
  {
    "title": "הבהלה לבינה",
    "url": "https://www.zman.co.il/701867/",
    "date": "2026-07-13",
    "category": "science"
  },
  {
    "title": "בחזרה אל השחף",
    "url": "https://www.zman.co.il/704198/",
    "date": "2026-07-21",
    "category": "personal"
  }
];
