# How to Add Your Dashboard Screenshots

## 1. Take a screenshot of your dashboard

**Power BI:**
- Open your report in full-screen mode (press F11 or View → Full screen)
- Use the Windows Snipping Tool (`Win + Shift + S`) or Print Screen

**Tableau:**
- Use Dashboard → Export Image from the menu
- Or use the Snipping Tool in full-screen mode

**Best settings:**
- Resolution: **1920 × 1080 px** (Full HD, 16:9 ratio)
- Format: JPG (quality 85–95%) or PNG
- Keep the full dashboard visible — no browser UI or taskbars

---

## 2. Save the file

Rename your screenshots and drop them into `assets/dashboards/`:

```
portfolio/
└── assets/
    └── dashboards/
        ├── dashboard-1.jpg   ← HR Analytics / Power BI
        ├── dashboard-2.jpg   ← Bank Customer Churn / Power BI
        ├── dashboard-3.jpg   ← Churn Drivers (page 2) / Power BI
        └── dashboard-4.jpg   ← Superstore / Tableau
```

---

## 3. Update config.js

Open `js/config.js` and update the `image` path and any other fields for each entry:

```js
dashboards: [
  {
    id: 1,
    title: "Nova HR Analytics Dashboard",   // ← update title
    tool: "Power BI",                        // ← Power BI / Tableau / Excel
    description: "Your description here.",
    image: "assets/dashboards/dashboard-1.jpg",  // ← change .svg → .jpg
    tags: ["Power BI", "HR Analytics"],
    featured: true
  },
  // ... repeat for others
]
```

---

## 4. Push to GitHub

```bash
git add assets/dashboards/ js/config.js
git commit -m "Add real dashboard screenshots"
git push origin master
```

GitHub Pages will rebuild in ~1 minute. Visit `https://adebowalelens.github.io` to confirm.

---

## Adding a new dashboard

1. Drop the image into `assets/dashboards/dashboard-5.jpg` (or any name)
2. Add a new entry to the `dashboards` array in `js/config.js`
3. Push — done

The filter buttons (`All`, `Power BI`, `Tableau`, `Excel`) update automatically based on the `tool` field in your config.
