#!/usr/bin/env node

/**
 * Quick Manual Test Script
 * Run individual tests to verify timeout functionality
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(color, symbol, message) {
  console.log(`${colors[color]}${symbol} ${message}${colors.reset}`);
}

async function testEndpoint(name, endpoint, payload, expectedStatus = 200) {
  console.log(`\n${colors.bright}${colors.blue}Testing: ${name}${colors.reset}`);
  console.log(`Endpoint: ${endpoint}`);
  console.log(`Payload: ${JSON.stringify(payload, null, 2)}`);
  
  try {
    const startTime = Date.now();
    const response = await axios.post(`${BASE_URL}${endpoint}`, payload, {
      timeout: 120000,
    });
    const duration = Date.now() - startTime;
    
    log('green', '✅', `Success! Status: ${response.status}, Duration: ${duration}ms`);
    console.log(`Response: ${JSON.stringify(response.data, null, 2)}\n`);
  } catch (error) {
    const duration = Date.now() - (error.config?.startTime || 0);
    const status = error.response?.status;
    
    if (status === expectedStatus) {
      log('green', '✅', `Expected error! Status: ${status}, Duration: ${duration}ms`);
    } else {
      log('red', '❌', `Error! Status: ${status}, Duration: ${duration}ms`);
    }
    
    const errorData = error.response?.data || error.message;
    console.log(`Error: ${JSON.stringify(errorData, null, 2)}\n`);
  }
}

async function runTests() {
  console.log(`
${colors.bright}${colors.cyan}╔════════════════════════════════════════╗
║    QUICK MANUAL TEST SCRIPT FOR         ║
║         TIMEOUT FEATURE                 ║
╚════════════════════════════════════════╝${colors.reset}
  `);

  // Check server
  try {
    log('cyan', 'ℹ️ ', 'Checking server...');
    await axios.get(`${BASE_URL}/`, { timeout: 5000 });
    log('green', '✅', 'Server is running\n');
  } catch {
    log('red', '❌', 'Server not found at ' + BASE_URL);
    log('yellow', '⚠️ ', 'Please start the backend: npm run dev');
    process.exit(1);
  }

  // Test 1: Broken Links - Normal
  await testEndpoint(
    'Broken Links - Normal Operation',
    '/broken',
    {
      urls: ['https://httpbin.org/status/200', 'https://httpbin.org/status/404'],
      websiteUrl: 'https://httpbin.org',
      userId: 'manual-test-1',
    }
  );

  // Test 2: Broken Links - Short Timeout
  await testEndpoint(
    'Broken Links - Short Timeout (Should Timeout)',
    '/broken',
    {
      urls: ['https://httpbin.org/delay/10'],
      websiteUrl: 'https://httpbin.org',
      userId: 'manual-test-2',
      timeout: 2000,
    },
    408
  );

  // Test 3: Orphan Pages - Normal
  await testEndpoint(
    'Orphan Pages - Normal Operation',
    '/orphan',
    {
      url: 'https://example.com',
      userId: 'manual-test-3',
    }
  );

  // Test 4: Orphan Pages - Short Timeout
  await testEndpoint(
    'Orphan Pages - Short Timeout (Should Timeout)',
    '/orphan',
    {
      url: 'https://httpbin.org',
      userId: 'manual-test-4',
      timeout: 1000,
    },
    408
  );

  // Test 5: Sitemap - Normal
  await testEndpoint(
    'Sitemap - Normal Operation',
    '/sitemap',
    {
      url: 'https://example.com',
      userId: 'manual-test-5',
    }
  );

  // Test 6: Sitemap - Custom Timeouts
  await testEndpoint(
    'Sitemap - Custom Timeout Parameters',
    '/sitemap',
    {
      url: 'https://example.com',
      timeout: 15000,
      pageTimeout: 8000,
      userId: 'manual-test-6',
    }
  );

  // Test 7: Validation Test
  await testEndpoint(
    'Broken Links - Validation (Missing URLs)',
    '/broken',
    {
      websiteUrl: 'https://example.com',
      userId: 'manual-test-7',
    },
    400
  );

  console.log(`${colors.bright}${colors.cyan}All tests completed!${colors.reset}\n`);
}

runTests().catch(err => {
  log('red', '❌', `Test execution failed: ${err.message}`);
  process.exit(1);
});
