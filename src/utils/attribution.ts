/**
 * Marketing Attribution & Meta Cookies Helper for MAX Luxury Bathrooms
 * Preserves UTMs, fbclid, _fbp, and _fbc across customer sessions.
 */

export interface AttributionData {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  fbclid: string;
  fbp: string;
  fbc: string;
  landing_page: string;
  referrer: string;
}

const STORAGE_KEY = 'mlb_ad_attribution';

export const getCookie = (name: string): string => {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
  return match ? decodeURIComponent(match[3]) : '';
};

export const setCookie = (name: string, value: string, days: number = 90) => {
  if (typeof document === 'undefined') return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/;SameSite=Lax`;
};

export const initAttribution = (): AttributionData => {
  if (typeof window === 'undefined') {
    return {
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_content: '',
      utm_term: '',
      fbclid: '',
      fbp: '',
      fbc: '',
      landing_page: '',
      referrer: '',
    };
  }

  // Check if we already have session-persisted attribution
  let existing: Partial<AttributionData> = {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      existing = JSON.parse(raw);
    }
  } catch (e) {
    // sessionStorage not available
  }

  const urlParams = new URLSearchParams(window.location.search);
  const fbclid = urlParams.get('fbclid') || existing.fbclid || '';
  const utm_source = urlParams.get('utm_source') || existing.utm_source || (fbclid ? 'facebook' : '');
  const utm_medium = urlParams.get('utm_medium') || existing.utm_medium || (fbclid ? 'paid_social' : '');
  const utm_campaign = urlParams.get('utm_campaign') || existing.utm_campaign || '';
  const utm_content = urlParams.get('utm_content') || existing.utm_content || '';
  const utm_term = urlParams.get('utm_term') || existing.utm_term || '';
  const landing_page = existing.landing_page || window.location.href;
  const referrer = existing.referrer || document.referrer || '';

  // Extract or synthesize _fbp / _fbc
  let fbp = getCookie('_fbp') || existing.fbp || '';
  let fbc = getCookie('_fbc') || existing.fbc || '';

  // If visitor arrived with fbclid and _fbc cookie isn't set yet, synthesize _fbc as per Meta documentation:
  // format: fb.1.{creation_time_ms}.{fbclid}
  if (!fbc && fbclid) {
    fbc = `fb.1.${Date.now()}.${fbclid}`;
    try {
      setCookie('_fbc', fbc, 90);
    } catch (e) {}
  }

  const currentData: AttributionData = {
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    utm_term,
    fbclid,
    fbp,
    fbc,
    landing_page,
    referrer,
  };

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(currentData));
  } catch (e) {}

  return currentData;
};

export const getAttribution = (): AttributionData => {
  return initAttribution();
};
