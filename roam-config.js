// ============================================================
// Roam Electric — shared Supabase config & helpers
// Used by index.html (public site) and bigadmin.html (admin panel)
// ============================================================
const SUPABASE_URL = "https://aszknmdqekqixdjacwot.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzemtubWRxZWtxaXhkamFjd290Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUwMDUyNjAsImV4cCI6MjEwMDU4MTI2MH0.DMqsbtEMXFITnTu_FhTFgs1NuOhmKGgs_6OJcIk_9z8";

const roamClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: true, autoRefreshToken: true }
});

// ---- Flat-rate financing calculator (shared by hero calculator + admin + application form) ----
// principal: full cash price of the bike
// depositPercent: % paid upfront
// tenureMonths: repayment period
// monthlyRatePercent: flat monthly interest rate set by admin
function calcFinancing(principal, depositPercent, tenureMonths, monthlyRatePercent) {
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

function formatKES(n) {
  return "KES " + Math.round(n).toLocaleString("en-KE");
}
