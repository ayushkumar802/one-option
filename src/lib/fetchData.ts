import { SHEET_FETCH_URL, CACHE_TIME, DOC_FETCH_URL } from "@/config/constant";

// Fast in-memory cache to prevent redundant external fetches on navigation
let memoryCache: { [sheetId: string]: { data: any[]; timestamp: number } } = {};
const MEMORY_TTL = 60 * 1000; // 60 seconds

async function fetchFromGoogleSheetCsv(sheetId: string): Promise<any[] | null> {
    try {
        const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
        const res = await fetch(csvUrl, { next: { revalidate: CACHE_TIME } });
        if (!res.ok) return null;
        const csvText = await res.text();
        if (csvText.trim().startsWith('<')) return null;

        const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
        if (lines.length <= 1) return [];

        const parseLine = (line: string): string[] => {
            const result: string[] = [];
            let current = '';
            let inQuotes = false;
            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                if (char === '"') {
                    if (inQuotes && line[i + 1] === '"') {
                        current += '"';
                        i++;
                    } else {
                        inQuotes = !inQuotes;
                    }
                } else if (char === ',' && !inQuotes) {
                    result.push(current.trim());
                    current = '';
                } else {
                    current += char;
                }
            }
            result.push(current.trim());
            return result;
        };

        const headers = parseLine(lines[0]);
        const rows: any[] = [];
        for (let i = 1; i < lines.length; i++) {
            const vals = parseLine(lines[i]);
            const obj: any = {};
            headers.forEach((h, idx) => {
                if (h) obj[h] = vals[idx] !== undefined ? vals[idx] : '';
            });
            if (obj.title || obj.slug) {
                rows.push(obj);
            }
        }
        return rows;
    } catch (e) {
        console.error("Direct Google Sheet CSV fetch failed:", e);
        return null;
    }
}

export async function getData(sheetId: string) {
    const now = Date.now();
    if (memoryCache[sheetId] && (now - memoryCache[sheetId].timestamp) < MEMORY_TTL) {
        return memoryCache[sheetId].data;
    }

    try {
        let rawData: any[] | null = null;
        const response = await fetch(`${SHEET_FETCH_URL}?id=${sheetId}`, {
            next: { revalidate: CACHE_TIME },
            redirect: 'follow',
        });

        if (response.ok) {
            const text = await response.text();
            if (!text.trim().startsWith('<')) {
                try {
                    const parsedJson = JSON.parse(text);
                    if (Array.isArray(parsedJson)) {
                        rawData = parsedJson;
                    }
                } catch {
                    // JSON parse error, will try CSV fallback
                }
            }
        }

        // Automatic fallback: If Apps Script failed or returned an HTML login page, fetch directly from Google Sheet CSV
        if (!rawData) {
            console.log("Apps Script returned non-JSON. Falling back to direct Google Sheet CSV export...");
            rawData = await fetchFromGoogleSheetCsv(sheetId);
        }

        if (!rawData) {
            console.error("Could not fetch data via Apps Script or direct CSV export.");
            return memoryCache[sheetId] ? memoryCache[sheetId].data : null;
        }

        const parsed = rawData.map((item: any) => {
            // Helper to parse comma-separated lists
            const parseList = (val: any) =>
                typeof val === 'string'
                    ? val.split(',').map((s: string) => s.trim()).filter(Boolean)
                    : Array.isArray(val)
                        ? val
                        : [];

            const skills = parseList(item.skills || item.requirements || item.materials);
            const benefits = parseList(item.benefits || item.services);

            return {
                ...item,
                companyName: String(item.companyName || item.company || '').trim(),
                salaryRange: String(item.salaryRange || item.salary || '').trim(),
                postedDate: String(item.postedDate || item.jobPostedDate || item.date || item.year || '').trim(),
                jobType: String(item.jobType || item.type || 'Full Time').trim(),
                experience: String(item.experience || '').trim(),
                openings: String(item.openings || '').trim(),
                shiftTiming: String(item.shiftTiming || item.shift || item.dimensions || '').trim(),
                responsibilities: String(item.responsibilities || item.designConcept || '').trim(),
                skills,
                benefits,
                // Backward-compatibility aliases for existing components:
                materials: skills,
                services: benefits,
                dimensions: item.shiftTiming || item.dimensions,
                designConcept: item.responsibilities || item.designConcept,
                year: String(item.year || item.postedDate || ''),
                featured: item.featured === true || item.featured === 'TRUE' || item.featured === 'true',
            };
        });

        memoryCache[sheetId] = { data: parsed, timestamp: now };
        return parsed;
    } catch (error) {
        console.log("error:-", error);
        return memoryCache[sheetId] ? memoryCache[sheetId].data : null;
    }
}


export async function getDocData(docId: string) {
    try {
        const response = await fetch(`${DOC_FETCH_URL}?id=${docId}`, {
            next: { revalidate: CACHE_TIME },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("error:-", error);
        return null;
    }
}
