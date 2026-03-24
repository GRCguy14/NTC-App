# AC Repair Service — Client Dashboard App

## Project Overview

Build a **single-user web application** for an AC repair and servicing business owner to consolidate and manage all her client data. The business runs on **Annual Maintenance Contracts (AMCs)** — each client has a service card, a certain number of AC units, a service frequency, a wash type, and a contract window (Start Date → Due Date). The app replaces her current Excel-based workflow.

**Tech Stack:** React + Tailwind CSS + InstantDB (client-side database)

**Single-user app** — no authentication needed. The app opens directly to the dashboard.

---

## Data Model

Each client record has the following fields:

| Field                  | Type     | Description                                                     | Required |
| ---------------------- | -------- | --------------------------------------------------------------- | -------- |
| `id`                   | string   | Auto-generated unique ID (InstantDB handles this)               | Yes      |
| `srNo`                 | number   | Serial number                                                   | Yes      |
| `cardNo`               | string   | Service card number (e.g., "B -40", "B -4")                     | Yes      |
| `name`                 | string   | Client name (individual or business)                            | Yes      |
| `freq`                 | number   | Service frequency per year — either **2** or **3**              | Yes      |
| `noOfACs`              | number   | Number of AC units under contract                               | Yes      |
| `jetOrSimple`          | string   | Wash type — either **"Jet"** or **"Simple"**                    | Yes      |
| `dueDate`              | string   | Contract due date (ISO format: `YYYY-MM-DD`)                    | Yes      |
| `startDate`            | string   | Contract start date (ISO format: `YYYY-MM-DD`)                  | Yes      |
| `primaryContactName`   | string   | Primary contact person's name                                   | No       |
| `primaryPhone`         | string   | Primary phone number (Indian 10-digit format)                   | No       |
| `secondaryContactName` | string   | Secondary contact person's name                                 | No       |
| `secondaryPhone`       | string   | Secondary phone number                                          | No       |
| `isManual`             | boolean  | `false` for imported Excel data, `true` for manually added clients | Yes   |

### Key Domain Rules

- **Start Date + 1 year = Due Date** — always exactly 12 months apart.
- For **Excel-imported clients**, both `startDate` and `dueDate` come from the Excel file as-is.
- For **manually added clients**, the user only enters the `startDate`. The app **auto-calculates** `dueDate` as `startDate + 12 months`.
- **Frequency** is always **2** (twice/year) or **3** (thrice/year).
- **Wash type** is always **"Jet"** or **"Simple"**.
- The `isManual` flag distinguishes imported vs. hand-entered clients.

---

## Seed Data

On first launch, if the database is empty, seed it with the following 25 clients imported from the owner's Excel file. All of these should have `isManual: false`.

```json
[
  {
    "srNo": 1,
    "cardNo": "B -40",
    "name": "Mr. Sanjeev Pathela",
    "freq": 2,
    "noOfACs": 3,
    "jetOrSimple": "Jet",
    "dueDate": "2025-03-31",
    "startDate": "2024-03-31",
    "primaryContactName": "Sanjeev",
    "primaryPhone": "9820459569",
    "secondaryContactName": null,
    "secondaryPhone": null
  },
  {
    "srNo": 2,
    "cardNo": "B -4",
    "name": "Multivision Printers",
    "freq": 3,
    "noOfACs": 1,
    "jetOrSimple": "Simple",
    "dueDate": "2025-05-31",
    "startDate": "2024-05-31",
    "primaryContactName": "Jay Gupta",
    "primaryPhone": "9702537451",
    "secondaryContactName": null,
    "secondaryPhone": null
  },
  {
    "srNo": 3,
    "cardNo": "B -6",
    "name": "A.V. Textiles",
    "freq": 3,
    "noOfACs": 1,
    "jetOrSimple": "Jet",
    "dueDate": "2025-06-30",
    "startDate": "2024-06-30",
    "primaryContactName": null,
    "primaryPhone": null,
    "secondaryContactName": null,
    "secondaryPhone": null
  },
  {
    "srNo": 4,
    "cardNo": "B -69",
    "name": "Mr. Atul Grade (Atul Promotion)",
    "freq": 2,
    "noOfACs": 1,
    "jetOrSimple": "Jet",
    "dueDate": "2025-09-30",
    "startDate": "2024-09-30",
    "primaryContactName": "Madam",
    "primaryPhone": "8976289441",
    "secondaryContactName": null,
    "secondaryPhone": null
  },
  {
    "srNo": 5,
    "cardNo": "B -13",
    "name": "Mr. Bhupesh Kalia",
    "freq": 3,
    "noOfACs": 3,
    "jetOrSimple": "Jet",
    "dueDate": "2026-01-31",
    "startDate": "2025-01-31",
    "primaryContactName": "Bhupesh",
    "primaryPhone": "9323694016",
    "secondaryContactName": null,
    "secondaryPhone": null
  },
  {
    "srNo": 6,
    "cardNo": "B -2",
    "name": "Cake Shop Bhandup (SFP)",
    "freq": 2,
    "noOfACs": 2,
    "jetOrSimple": "Jet",
    "dueDate": "2026-02-28",
    "startDate": "2025-02-28",
    "primaryContactName": "Meghna",
    "primaryPhone": "9821143040",
    "secondaryContactName": null,
    "secondaryPhone": null
  },
  {
    "srNo": 7,
    "cardNo": "B -5",
    "name": "Krishna Arts",
    "freq": 3,
    "noOfACs": 2,
    "jetOrSimple": "Jet",
    "dueDate": "2026-03-31",
    "startDate": "2025-03-31",
    "primaryContactName": null,
    "primaryPhone": "7506378211",
    "secondaryContactName": null,
    "secondaryPhone": "9167065151"
  },
  {
    "srNo": 8,
    "cardNo": "B-21",
    "name": "Mr. Anil Kamlan",
    "freq": 3,
    "noOfACs": 3,
    "jetOrSimple": "Jet",
    "dueDate": "2026-04-30",
    "startDate": "2025-04-30",
    "primaryContactName": null,
    "primaryPhone": null,
    "secondaryContactName": null,
    "secondaryPhone": null
  },
  {
    "srNo": 9,
    "cardNo": "B -24",
    "name": "Vinyas Engineering",
    "freq": 2,
    "noOfACs": 1,
    "jetOrSimple": "Jet",
    "dueDate": "2026-04-30",
    "startDate": "2025-04-30",
    "primaryContactName": "Singh",
    "primaryPhone": "9892214339",
    "secondaryContactName": null,
    "secondaryPhone": null
  },
  {
    "srNo": 10,
    "cardNo": "B -3",
    "name": "Mr. Radheshyam Pardesi",
    "freq": 2,
    "noOfACs": 3,
    "jetOrSimple": "Jet",
    "dueDate": "2026-07-31",
    "startDate": "2025-07-31",
    "primaryContactName": "Sham",
    "primaryPhone": "9822345555",
    "secondaryContactName": null,
    "secondaryPhone": null
  },
  {
    "srNo": 11,
    "cardNo": "B -17",
    "name": "Wellknown Steel",
    "freq": 2,
    "noOfACs": 1,
    "jetOrSimple": "Jet",
    "dueDate": "2026-07-31",
    "startDate": "2025-07-31",
    "primaryContactName": "Jemin",
    "primaryPhone": "9029952739",
    "secondaryContactName": "Rahul",
    "secondaryPhone": "9029952735"
  },
  {
    "srNo": 12,
    "cardNo": "B -25",
    "name": "Print Point",
    "freq": 2,
    "noOfACs": 4,
    "jetOrSimple": "Jet",
    "dueDate": "2026-07-31",
    "startDate": "2025-07-31",
    "primaryContactName": "Sham",
    "primaryPhone": "9822345555",
    "secondaryContactName": "Aditya",
    "secondaryPhone": "9322345555"
  },
  {
    "srNo": 13,
    "cardNo": "B -57",
    "name": "Vimtex Machines",
    "freq": 2,
    "noOfACs": 1,
    "jetOrSimple": "Jet",
    "dueDate": "2026-07-31",
    "startDate": "2025-07-31",
    "primaryContactName": "Mahendra",
    "primaryPhone": "9987031615",
    "secondaryContactName": null,
    "secondaryPhone": null
  },
  {
    "srNo": 14,
    "cardNo": "B -1",
    "name": "Fems India",
    "freq": 2,
    "noOfACs": 2,
    "jetOrSimple": "Jet",
    "dueDate": "2026-08-31",
    "startDate": "2025-08-31",
    "primaryContactName": "Manoj",
    "primaryPhone": "8779333758",
    "secondaryContactName": null,
    "secondaryPhone": "9820567067"
  },
  {
    "srNo": 15,
    "cardNo": "B -14",
    "name": "Mr. Ravi Verma",
    "freq": 2,
    "noOfACs": 2,
    "jetOrSimple": "Jet",
    "dueDate": "2026-08-31",
    "startDate": "2025-08-31",
    "primaryContactName": "Ravi",
    "primaryPhone": "9819100562",
    "secondaryContactName": "Rita",
    "secondaryPhone": "9833569165"
  },
  {
    "srNo": 16,
    "cardNo": "B -7",
    "name": "Brushtool Industries",
    "freq": 2,
    "noOfACs": 1,
    "jetOrSimple": "Jet",
    "dueDate": "2026-09-30",
    "startDate": "2025-09-30",
    "primaryContactName": null,
    "primaryPhone": "9819033038",
    "secondaryContactName": null,
    "secondaryPhone": null
  },
  {
    "srNo": 17,
    "cardNo": "B -16",
    "name": "Mr. Atul Gavade",
    "freq": 2,
    "noOfACs": 2,
    "jetOrSimple": "Jet",
    "dueDate": "2026-09-30",
    "startDate": "2025-09-30",
    "primaryContactName": "Atul",
    "primaryPhone": "9920565448",
    "secondaryContactName": null,
    "secondaryPhone": null
  },
  {
    "srNo": 18,
    "cardNo": "B -54",
    "name": "Mr. Aditya Krishnan Iyer",
    "freq": 2,
    "noOfACs": 1,
    "jetOrSimple": "Simple",
    "dueDate": "2026-09-30",
    "startDate": "2025-09-30",
    "primaryContactName": "Aditya",
    "primaryPhone": "9619067773",
    "secondaryContactName": "Shreya",
    "secondaryPhone": "9920576083"
  },
  {
    "srNo": 19,
    "cardNo": "B -59",
    "name": "Thomsons ( Stephygear )",
    "freq": 2,
    "noOfACs": 1,
    "jetOrSimple": "Jet",
    "dueDate": "2026-09-30",
    "startDate": "2025-09-30",
    "primaryContactName": "Thom",
    "primaryPhone": "9819287772",
    "secondaryContactName": null,
    "secondaryPhone": "9819757772"
  },
  {
    "srNo": 20,
    "cardNo": "B -67",
    "name": "Ace Jaydeep Daiya",
    "freq": 2,
    "noOfACs": 2,
    "jetOrSimple": "Jet",
    "dueDate": "2026-09-30",
    "startDate": "2025-09-30",
    "primaryContactName": "Jaydeep",
    "primaryPhone": "9821344556",
    "secondaryContactName": "Naina",
    "secondaryPhone": "9773147714"
  },
  {
    "srNo": 21,
    "cardNo": "B -8",
    "name": "Mr. Raju Budhani",
    "freq": 3,
    "noOfACs": 1,
    "jetOrSimple": "Jet",
    "dueDate": "2026-11-30",
    "startDate": "2025-11-30",
    "primaryContactName": null,
    "primaryPhone": null,
    "secondaryContactName": null,
    "secondaryPhone": null
  },
  {
    "srNo": 22,
    "cardNo": "B -28",
    "name": "Nyne Organic",
    "freq": 2,
    "noOfACs": 3,
    "jetOrSimple": "Jet",
    "dueDate": "2026-11-30",
    "startDate": "2025-11-30",
    "primaryContactName": "Shripal",
    "primaryPhone": "98201803386",
    "secondaryContactName": "Siddharth",
    "secondaryPhone": "9920180386"
  },
  {
    "srNo": 23,
    "cardNo": "B -23",
    "name": "R.A.D.A.V. College",
    "freq": 2,
    "noOfACs": 16,
    "jetOrSimple": "Jet",
    "dueDate": "2026-12-31",
    "startDate": "2025-12-31",
    "primaryContactName": "Dinesh",
    "primaryPhone": "836915171",
    "secondaryContactName": "Mane Sir",
    "secondaryPhone": "9594006262"
  },
  {
    "srNo": 24,
    "cardNo": "B -50",
    "name": "I.D.U.B.S",
    "freq": 2,
    "noOfACs": 14,
    "jetOrSimple": "Jet",
    "dueDate": "2026-12-31",
    "startDate": "2025-12-31",
    "primaryContactName": "Mishraji",
    "primaryPhone": "8080191043",
    "secondaryContactName": null,
    "secondaryPhone": "7798045618"
  },
  {
    "srNo": 25,
    "cardNo": "B -29",
    "name": "Rajeshwari Iyer",
    "freq": 2,
    "noOfACs": 2,
    "jetOrSimple": "Jet",
    "dueDate": "2027-12-31",
    "startDate": "2026-12-31",
    "primaryContactName": null,
    "primaryPhone": "9769608360",
    "secondaryContactName": null,
    "secondaryPhone": null
  }
]
```

---

## App Structure & Features

### 1. Summary KPI Cards (Top of Dashboard)

Display these stats at the top of the page in a row of cards:

- **Total Clients** — count of all clients
- **Total ACs** — sum of `noOfACs` across all clients
- **Overdue** — count of clients whose `dueDate` is **before today** (use a red/urgent color)
- **Due This Month** — count of clients whose `dueDate` falls in the current calendar month
- **Jet / Simple split** — e.g., "23 Jet · 2 Simple"

### 2. Client Table (Main View)

A responsive, sortable data table showing all clients. Columns:

| Column         | Source Field    | Notes                                      |
| -------------- | --------------- | ------------------------------------------ |
| Sr No.         | `srNo`          | Numeric                                    |
| Card No.       | `cardNo`        |                                            |
| Client Name    | `name`          |                                            |
| ACs            | `noOfACs`       | Number                                     |
| Frequency      | `freq`          | Show as "2x/yr" or "3x/yr"                |
| Type           | `jetOrSimple`   | Badge style — blue for Jet, gray for Simple |
| Due Date       | `dueDate`       | Formatted as `DD MMM YYYY`                 |
| Status         | (computed)      | Derived badge (see status logic below)     |
| Primary Contact| `primaryContactName` + `primaryPhone` | Name + clickable phone |

#### Row Highlighting (Critical Feature)

- **Red background row** → `dueDate` is **before today** (overdue / expired contract)
- **Yellow/amber background row** → `dueDate` is **within the next 30 days**
- **Normal background** → everything else

#### Status Badge Logic

Compute a status badge for each client based on `dueDate` relative to today:

- 🔴 **"Overdue"** — `dueDate < today`
- 🟡 **"Due Soon"** — `dueDate` is within the next 30 days (today ≤ dueDate ≤ today + 30 days)
- 🟢 **"Active"** — `dueDate` is more than 30 days away

#### Table Interactions

- **Click on a row** → opens the **Client Profile Modal**
- **Sortable columns** — at minimum: Sr No., Client Name, Due Date, No. of ACs
- **Default sort** — by Due Date ascending (most urgent first)

### 3. Search & Filters

Place above the table:

- **Search bar** — searches across `name`, `primaryContactName`, `secondaryContactName`, and `cardNo`
- **Filter: Wash Type** — dropdown or toggle: All / Jet / Simple
- **Filter: Status** — dropdown or toggle: All / Overdue / Due Soon / Active
- **Filter: Frequency** — dropdown or toggle: All / 2x per year / 3x per year

All filters should work together (AND logic). Show a count of filtered results, e.g., "Showing 8 of 25 clients".

### 4. Client Profile Modal

When a table row is clicked, open a modal/slide-over showing full client details:

- **Header**: Client name + Card No. + Status badge
- **Contract Details section**: Wash type, Frequency, Number of ACs, Start Date, Due Date
- **Contact section**:
  - Primary: name + phone (phone as a clickable `tel:` link)
  - Secondary: name + phone (if exists)
- **Source badge**: Show "Imported" (if `isManual === false`) or "Manual" (if `isManual === true`)
- **Action buttons**:
  - **Edit** — opens the edit form (pre-filled with current values)
  - **Delete** — with a confirmation dialog ("Are you sure you want to delete this client?")

### 5. Add New Client

A button (e.g., "+ Add Client") that opens a form (modal or separate page) with these fields:

- Card No. (text input, required)
- Client Name (text input, required)
- Frequency (dropdown: 2 or 3, required)
- No. of ACs (number input, required)
- Wash Type (dropdown: Jet or Simple, required)
- Start Date (date picker, required) — **Due Date is auto-calculated as Start Date + 12 months** and shown as a read-only field
- Primary Contact Name (text input, optional)
- Primary Phone (text input, optional)
- Secondary Contact Name (text input, optional)
- Secondary Phone (text input, optional)

On save:
- Auto-assign the next `srNo` (max existing srNo + 1)
- Set `isManual: true`
- Calculate `dueDate` from `startDate`
- Save to InstantDB

### 6. Edit Client

Same form as Add Client, but pre-filled with existing data. Behavior:
- For **manually added clients** (`isManual: true`): editing `startDate` recalculates `dueDate`
- For **imported clients** (`isManual: false`): both `startDate` and `dueDate` are editable independently (no auto-calculation), since the original Excel data is the source of truth

---

## UI / UX Guidelines

- **Clean, professional look** — this is a business tool, not a flashy consumer app. Think of a clean admin panel.
- **Color palette**: Use a cool blue as the primary accent. Red for overdue/danger. Amber/yellow for warnings. Green for healthy.
- **Responsive**: Should work on both desktop and tablet. Mobile is nice-to-have but not critical.
- **Table is the star**: The main table should dominate the page. Keep the KPI cards compact.
- **Empty states**: If no clients match a filter, show a friendly "No clients found" message.
- **Phone numbers**: Display formatted with a clickable `tel:` link so the owner can tap to call on mobile.
- **Dates**: Display all dates as `DD MMM YYYY` (e.g., "31 Mar 2025") for readability.

---

## Technical Notes

### InstantDB Setup
- Use InstantDB as the client-side database (https://instantdb.com)
- Single namespace: `clients`
- Seed data should be inserted on first app load only (check if the `clients` collection is empty before seeding)
- All CRUD operations should go through InstantDB's React hooks

### Project Structure (suggested)
```
src/
├── App.jsx                  # Main app component
├── main.jsx                 # Entry point
├── db.js                    # InstantDB initialization + seed logic
├── data/
│   └── seedClients.js       # The 25 seed client records (JSON array)
├── components/
│   ├── Dashboard.jsx         # KPI cards + table + filters container
│   ├── KPICards.jsx          # Summary stat cards
│   ├── ClientTable.jsx       # Main data table
│   ├── ClientRow.jsx         # Single table row with highlighting logic
│   ├── ClientProfileModal.jsx# Detail modal on row click
│   ├── ClientForm.jsx        # Add/Edit form (shared component)
│   ├── SearchAndFilters.jsx  # Search bar + filter dropdowns
│   └── DeleteConfirmDialog.jsx
└── utils/
    ├── dateHelpers.js        # Status computation, formatting, due date calc
    └── constants.js          # Status labels, colors, etc.
```

### Key Implementation Details
- Use `date-fns` or native `Date` for date comparisons and formatting
- Status computation should be a pure utility function: `getClientStatus(dueDate: string): "overdue" | "dueSoon" | "active"`
- The seeding function should run once, check `clients.length === 0` before inserting
- All filters and search should operate on the client-side (no server needed)

---

## Summary of Priorities

1. **Due date highlighting and status badges** — this is the core value of the app. The owner needs to instantly see who is overdue or coming up.
2. **Search and filter** — she needs to quickly find clients by name or filter by type/status.
3. **Client profile modal** — quick access to contact info and details.
4. **Add/Edit/Delete** — full CRUD so she can manage clients going forward.
5. **KPI cards** — a nice-to-have summary that adds polish.
