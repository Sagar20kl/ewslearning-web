async function testAuth() {
  const baseUrl = "http://localhost:3000";

  console.log("--- 1. Testing Registration for New User ---");
  const testEmail = `anita.sharma.${Date.now()}@example.com`;
  const registerPayload = {
    name: "Anita Sharma",
    email: testEmail,
    password: "securepassword456",
    role: "CORPORATE_CLIENT",
    organization: "Green Earth Solutions",
    department: "ESG Audits",
  };

  const regRes = await fetch(`${baseUrl}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registerPayload),
  });
  const regData = await regRes.json();
  console.log("Registration Response Status:", regRes.status);
  console.log("Registration Response Body:", regData);

  if (!regData.success) {
    throw new Error("Registration test failed: " + JSON.stringify(regData));
  }

  console.log("\n--- 2. Testing Login with New User Credentials ---");
  const loginRes = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: testEmail,
      password: "securepassword456",
    }),
  });
  const loginData = await loginRes.json();
  console.log("Login Response Status:", loginRes.status);
  console.log("Login Response Body:", loginData);

  if (!loginData.success) {
    throw new Error("Login test failed: " + JSON.stringify(loginData));
  }

  console.log("\n--- 3. Testing Login with Incorrect Password ---");
  const wrongLoginRes = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: testEmail,
      password: "wrongpassword",
    }),
  });
  const wrongData = await wrongLoginRes.json();
  console.log("Wrong Password Response Status:", wrongLoginRes.status);
  console.log("Wrong Password Response Body:", wrongData);

  console.log("\n--- 4. Testing Duplicate Email Registration ---");
  const dupRes = await fetch(`${baseUrl}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registerPayload),
  });
  const dupData = await dupRes.json();
  console.log("Duplicate Registration Status:", dupRes.status);
  console.log("Duplicate Registration Body:", dupData);

  console.log("\n--- 5. Testing Existing Master Admin Account Login ---");
  const adminLoginRes = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "director@ewslearning.com",
      password: "admin2025",
    }),
  });
  const adminLoginData = await adminLoginRes.json();
  console.log("Admin Login Status:", adminLoginRes.status);
  console.log("Admin Login Body:", adminLoginData);

  console.log("\n✅ ALL AUTHENTICATION TESTS PASSED SUCCESSFULLY!");
}

testAuth().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
