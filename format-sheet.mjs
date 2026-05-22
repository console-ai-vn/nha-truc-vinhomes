import { GoogleAuth } from "google-auth-library";

const auth = new GoogleAuth({
  keyFile: "C:/Users/Mr.D/AppData/Local/Temp/leads-bot-key.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});

const token = await auth.getAccessToken();
if (!token) { console.log("NO_TOKEN"); process.exit(1); }

const sheetId = "1eGqd1i8tJQzlUAwe6_HtT2PtW-q00wW4JiiFbZf_okg";

// 1. Add header row
await fetch(
  `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A1:K1?valueInputOption=RAW`,
  {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      values: [["Ngày", "Họ Tên", "Email", "Phone/Zalo", "Vị Trí", "Kinh Nghiệm", "Social Link", "Nguồn", "UTM", "Ghi Chú", "Trạng Thái"]]
    })
  }
);

// 2. Format: freeze row 1, bold header, column widths, colors
await fetch(
  `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}:batchUpdate`,
  {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      requests: [
        { updateSheetProperties: {
            properties: { sheetId: 0, gridProperties: { frozenRowCount: 1 } },
            fields: "gridProperties.frozenRowCount"
        }},
        { repeatCell: {
            range: { sheetId: 0, startRowIndex: 0, endRowIndex: 1 },
            cell: {
              userEnteredFormat: {
                backgroundColor: { red: 0.843, green: 0.098, blue: 0.125 },
                textFormat: { foregroundColor: { red: 1, green: 1, blue: 1 }, bold: true, fontSize: 11 },
                horizontalAlignment: "CENTER",
                verticalAlignment: "MIDDLE"
              }
            },
            fields: "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment)"
        }},
        { repeatCell: {
            range: { sheetId: 0, startRowIndex: 1 },
            cell: {
              userEnteredFormat: {
                textFormat: { fontSize: 10 },
                verticalAlignment: "MIDDLE"
              }
            },
            fields: "userEnteredFormat(textFormat,verticalAlignment)"
        }},
        { updateDimensionProperties: {
            range: { sheetId: 0, dimension: "COLUMNS", startIndex: 0, endIndex: 1 },
            properties: { pixelSize: 180 },
            fields: "pixelSize"
        }},
        { updateDimensionProperties: {
            range: { sheetId: 0, dimension: "COLUMNS", startIndex: 1, endIndex: 2 },
            properties: { pixelSize: 200 },
            fields: "pixelSize"
        }},
        { updateDimensionProperties: {
            range: { sheetId: 0, dimension: "COLUMNS", startIndex: 2, endIndex: 3 },
            properties: { pixelSize: 220 },
            fields: "pixelSize"
        }},
        { updateDimensionProperties: {
            range: { sheetId: 0, dimension: "COLUMNS", startIndex: 3, endIndex: 4 },
            properties: { pixelSize: 140 },
            fields: "pixelSize"
        }},
        { updateDimensionProperties: {
            range: { sheetId: 0, dimension: "COLUMNS", startIndex: 4, endIndex: 5 },
            properties: { pixelSize: 200 },
            fields: "pixelSize"
        }},
        { updateDimensionProperties: {
            range: { sheetId: 0, dimension: "COLUMNS", startIndex: 9, endIndex: 10 },
            properties: { pixelSize: 250 },
            fields: "pixelSize"
        }}
      ]
    })
  }
);

// 3. Rename sheet
await fetch(
  `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}:batchUpdate`,
  {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      requests: [{ updateSheetProperties: {
        properties: { sheetId: 0, title: "Leads" },
        fields: "title"
      }}]
    })
  }
);

// 4. Update code reference to use new sheet name
console.log("DONE: Sheet formatted");
console.log("Sheet name: Leads (was Sheet1)");
console.log("Update .env.local: no change needed - range will use 'Leads!A:K'");

// 5. Verify
const r = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}`, {
  headers: { Authorization: `Bearer ${token}` }
});
const data = await r.json();
console.log(`Confirmed: "${data.sheets[0].properties.title}"`);
console.log(`URL: https://docs.google.com/spreadsheets/d/${sheetId}/edit`);
