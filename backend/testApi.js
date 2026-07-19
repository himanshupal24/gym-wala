const axios = require('axios');

const API_URL = 'http://localhost:5000/api';
const EMAIL = 'owner@mygym.com';
const PASSWORD = 'password123';

async function runTests() {
  try {
    console.log('1. Testing Owner Login...');
    const loginRes = await axios.post(`${API_URL}/auth/login`, {
      email: EMAIL,
      password: PASSWORD,
      role: 'owner'
    });
    
    const token = loginRes.data.token;
    console.log('✅ Login successful. Token received.');

    const headers = { Authorization: `Bearer ${token}` };

    console.log('\n2. Testing Dashboard API...');
    const dashboardRes = await axios.get(`${API_URL}/dashboard/stats`, { headers });
    console.log('✅ Dashboard Data:', Object.keys(dashboardRes.data.data));

    console.log('\n3. Testing Members API...');
    const membersRes = await axios.get(`${API_URL}/members`, { headers });
    console.log(`✅ Fetched ${membersRes.data.data.length} members.`);

    console.log('\n4. Testing Membership Plans API...');
    const plansRes = await axios.get(`${API_URL}/membership-plans`, { headers });
    console.log(`✅ Fetched ${plansRes.data.data.length} plans.`);

    console.log('\n5. Testing Attendance API...');
    const attendanceRes = await axios.get(`${API_URL}/attendance`, { headers });
    console.log(`✅ Fetched ${attendanceRes.data.data.length} attendance records.`);

    console.log('\n6. Testing Payments API...');
    const paymentsRes = await axios.get(`${API_URL}/payments`, { headers });
    console.log(`✅ Fetched ${paymentsRes.data.data.length} payment records.`);

    console.log('\n7. Testing Staff API...');
    const staffRes = await axios.get(`${API_URL}/staff`, { headers });
    console.log(`✅ Fetched ${staffRes.data.data.length} staff records.`);

    console.log('\n8. Testing Reports (Stats) API...');
    const reportsRes = await axios.get(`${API_URL}/reports/dashboard`, { headers });
    console.log('✅ Reports Data keys:', Object.keys(reportsRes.data.data));

    console.log('\n🚀 ALL ENDPOINTS RESPONDED SUCCESSFULLY!');
  } catch (error) {
    console.error('❌ API Test Failed!');
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.error(error.message);
    }
  }
}

runTests();
