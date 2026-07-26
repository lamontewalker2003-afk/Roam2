// ============================================================
// Roam Electric — shared Supabase config & helpers
// Used by index.html (public site) and bigadmin.html (admin panel)
// ============================================================
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_URL)
  || "https://aszknmdqekqixdjacwot.supabase.co";

const SUPABASE_ANON_KEY = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_ANON_KEY)
  || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzemtubWRxZWtxaXhkamFjd290Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUwMDUyNjAsImV4cCI6MjEwMDU4MTI2MH0.DMqsbtEMXFITnTu_FhTFgs1NuOhmKGgs_6OJcIk_9z8";

export const roamClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: true, autoRefreshToken: true }
});

// ---- Flat-rate financing calculator (shared by hero calculator + admin + application form) ----
export function calcFinancing(principal, depositPercent, tenureMonths, monthlyRatePercent) {
  const deposit = principal * (depositPercent / 100);
  const balance = principal - deposit;
  const totalInterest = balance * (monthlyRatePercent / 100) * tenureMonths;
  const totalRepayable = balance + totalInterest;
  const monthlyInstallment = tenureMonths > 0 ? totalRepayable / tenureMonths : 0;
  return {
    deposit: Math.round(deposit),
    balance: Math.round(balance),
    totalInterest: Math.round(totalInterest),
    totalRepayable: Math.round(totalRepayable),
    monthlyInstallment: Math.round(monthlyInstallment)
  };
}

export function formatKES(n) {
  return "KES " + Math.round(n).toLocaleString("en-KE");
}

// Global window attachments for backwards compatibility
if (typeof window !== 'undefined') {
  window.roamClient = roamClient;
  window.calcFinancing = calcFinancing;
  window.formatKES = formatKES;
}
