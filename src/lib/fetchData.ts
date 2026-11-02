import { SHEET_FETCH_URL, CACHE_TIME, DOC_FETCH_URL } from "@/config/constant";

// Fast in-memory cache to prevent redundant external fetches on navigation
let memoryCache: { [sheetId: string]: { data: any[]; timestamp: number } } = {};
const MEMORY_TTL = 60 * 1000; // 60 seconds

export async function getData(sheetId: string) {
    const now = Date.now();
    if (memoryCache[sheetId] && (now - memoryCache[sheetId].timestamp) < MEMORY_TTL) {
        return memoryCache[sheetId].data;
    }

    try {
        const response = await fetch(`${SHEET_FETCH_URL}?id=${sheetId}`, {
            next: { revalidate: CACHE_TIME },
            redirect: 'follow',
        });
        if (!response.ok) {
            console.error(`Sheet fetch failed: HTTP ${response.status}`);
            return memoryCache[sheetId] ? memoryCache[sheetId].data : null;
        }
        const text = await response.text();
        if (text.trim().startsWith('<')) {
            console.error("Google Apps Script returned an HTML page instead of JSON. Check Sheet permissions ('Anyone with link can view') and Apps Script deployment ('Who has access: Anyone').");
            return memoryCache[sheetId] ? memoryCache[sheetId].data : null;
        }
        const data = JSON.parse(text);
        if (!Array.isArray(data)) {
            console.error("Google Apps Script returned non-array data:", data);
            return memoryCache[sheetId] ? memoryCache[sheetId].data : null;
        }
        const parsed = data.map((item: any) => {
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
