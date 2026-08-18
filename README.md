# Sahana Kumar — Carnatic Vocal Graduation Concert Website

A modern, responsive, dark-mode website built for **Sahana Kumar’s Carnatic Vocal Graduation Concert (Debut Solo Concert / Arangetram)** under the guidance of **Guru Smt. Geetha Ravi**.

Designed following the exact aesthetic, architectural principles, and responsive bento-grid layout of **SanMargam**, refined with classical Carnatic gold, amber, and sapphire accents.

---

## 🌟 Key Features & Pages

1. **Home (`index.html`)**
   - Hero section with event title, subtitle, date, time, and venue chips.
   - "About the Event" narrative explaining the significance of the Carnatic Graduation Concert.
   - Quick statistics bento grid (Years of Sadhana, Repertoire size, Ragas explored, Ensemble details).
   - Direct call-out cards to the Program Guide and Artist Biographies.
   - "Architecture of a Carnatic Concert" classical explainer.

2. **Program Guide — Core Page (`program.html`)**
   - Full 9-item classical Carnatic Katcheri Margam repertoire:
     1. *Ninnu Kori* (Varnam in Ragam Mohanam, Adi Talam — Poochi Srinivasa Iyengar)
     2. *Vatapi Ganapatim Bhajeham* (Invocatory in Ragam Hamsadhwani, Adi Talam — Muthuswami Dikshitar)
     3. *Sobhillu Sapthaswara* (Keerthanam in Ragam Jaganmohini, Rupaka Talam — Saint Tyagaraja)
     4. *Samaja Vara Gamana* (Sub-Main in Ragam Hindolam, Adi Talam — Saint Tyagaraja)
     5. *Ragam Tanam Pallavi (RTP) & Tani Avartanam* (Centerpiece in Ragam Kalyani with Ragamalika Swarams)
     6. *Alaipayuthey Kanna* (Devotional Padam in Ragam Kanada, Adi Talam — Oothukadu Venkata Kavi)
     7. *Bhavayami Gopalabalam with Viruttam* (Viruttam & Bhajan in Ragamalika — Saint Annamacharya)
     8. *Thillana in Ragam Dhanashree* (Rhythmic Finale in Ragam Dhanashree, Adi Talam — Maharaja Swathi Thirunal)
     9. *Pavamana / Tyagaraja Mangalam* (Auspicious Benediction in Saurashtram & Madhyamavathi)
   - Dynamic category filter buttons (*All, Varnam, Invocatory, Keerthanams, Main/RTP, Devotional, Thillana & Mangalam*).
   - Structured metadata badges for **Ragam**, **Talam**, **Composer**, and **Deity/Theme** alongside detailed musical explanations and lyrical meanings.

3. **Artists & Biographies (`artists.html`)**
   - **Sahana Kumar (Vocalist Bio):** Covers 11+ years of vocal training under Smt. Geetha Ravi, senior leadership and editorial role at Carnatic Chamber Concerts (CCC), Bharatanatyam Arangetram background, Saratoga High School arts (Choir, Drama, MAP), and community leadership with USKids4Water.
   - **Guru Smt. Geetha Ravi (Teacher Bio):** Honoring her esteemed pedagogical legacy, musical lineage, rigorous focus on sruti, laya, and manodharma, and mentorship of young artists.
   - **Accompanists Biographies:**
     - **Sri. Vignesh Ramanathan** — Violin (Pakkavadhyam)
     - **Sri. Hariharan Sundaram** — Mridangam (Pradhana Laya Vadhyam)
     - **Sri. Arvind Narayanan** — Ghatam (Upapakkavadyam)

4. **Data-Driven Architecture (`content.json` & `js/main.js`)**
   - All text, URLs (Evite RSVP, YouTube Live Stream, Google Maps), dates, times, bios, and song items are centralized in `content.json`.
   - `js/main.js` automatically binds JSON data to all pages dynamically while providing graceful offline / local `file://` fallback data.

---

## 📁 Directory Structure

```text
├── index.html         # Event Overview & Hero
├── program.html       # Comprehensive Repertoire & Song Details (Core Page)
├── artists.html       # Sahana's Bio, Guru Smt. Geetha Ravi, Accompanists
├── content.json       # Centralized Content, Repertoire & Bio Data
├── css/
│   └── styles.css     # Responsive Dark Theme Stylesheet (SanMargam matching)
├── js/
│   └── main.js        # Dynamic DOM Binding & Interactive Filters
├── assets/            # Concert Photos & Visual Assets
└── README.md          # Project Documentation
```

---

## 🛠️ How to Customize

- **Update Date, Time, Venue or RSVP Link:** Open `content.json` and edit the `site` object.
- **Add or Modify Songs:** Add or edit items inside `content.json` -> `program.items`.
- **Change Photos:** Place portrait / hero photos into the `assets/` folder and update the image paths in `content.json`.
- **Deploy to GitHub Pages:** Push this repository to GitHub and enable GitHub Pages under *Settings > Pages > Branch: main / root*.
