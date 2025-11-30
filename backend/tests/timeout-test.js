const axios = require('axios');

// Configuration
const BASE_URL = 'http://localhost:5000';
const TEST_TIMEOUT = 60000; // 60 seconds for all tests

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const log = {
  test: (msg) => console.log(`\n${colors.bright}${colors.blue}📝 TEST: ${msg}${colors.reset}`),
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.cyan}ℹ️  ${msg}${colors.reset}`),
  warn: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  section: (msg) => console.log(`\n${colors.bright}${colors.cyan}═══ ${msg} ═══${colors.reset}`),
};

// Test Results Tracker
class TestRunner {
  constructor() {
    this.results = [];
    this.totalTests = 0;
    this.passedTests = 0;
  }

  addResult(testName, passed, message, details = null) {
    this.totalTests++;
    if (passed) this.passedTests++;
    
    const result = {
      testName,
      passed,
      message,
      details,
    };
    this.results.push(result);
    
    if (passed) {
      log.success(`${testName}: ${message}`);
    } else {
      log.error(`${testName}: ${message}`);
      if (details) log.info(`Details: ${details}`);
    }
  }

  printSummary() {
    log.section('TEST SUMMARY');
    console.log(`\nTotal Tests: ${this.totalTests}`);
    console.log(`${colors.green}Passed: ${this.passedTests}${colors.reset}`);
    console.log(`${colors.red}Failed: ${this.totalTests - this.passedTests}${colors.reset}`);
    
    const passPercentage = ((this.passedTests / this.totalTests) * 100).toFixed(2);
    console.log(`Success Rate: ${passPercentage}%\n`);
  }
}

const runner = new TestRunner();

// Helper function to make requests
async function makeRequest(endpoint, data, expectedTimeout = false) {
  try {
    const startTime = Date.now();
    const response = await axios.post(`${BASE_URL}${endpoint}`, data, {
      timeout: TEST_TIMEOUT,
    });
    const duration = Date.now() - startTime;

    return {
      success: true,
      status: response.status,
      data: response.data,
      duration,
    };
  } catch (error) {
    const duration = Date.now() - error.config?.startTime || 0;
    
    return {
      success: false,
      status: error.response?.status,
      message: error.message,
      error: error.response?.data || error.message,
      duration,
    };
  }
}

// Test Suite 1: Broken Links Checker
async function testBrokenLinksChecker() {
  log.section('BROKEN LINKS CHECKER TESTS');

  // Test 1.1: Normal operation (should complete without timeout)
  log.test('Normal operation with valid URLs');
  const result1 = await makeRequest('/broken', {
    urls: ['https://httpbin.org/status/200', 'https://httpbin.org/status/404'],
    websiteUrl: 'https://httpbin.org',
    userId: 'test-user-1',
  });

  if (result1.success && result1.status === 200) {
    runner.addResult(
      'Broken Checker - Normal Operation',
      true,
      `Completed in ${result1.duration}ms`,
      `Found ${result1.data.brokenLinks?.length || 0} broken links`
    );
  } else {
    runner.addResult(
      'Broken Checker - Normal Operation',
      false,
      `Failed with status ${result1.status}`,
      result1.error?.message
    );
  }

  // Test 1.2: Custom short timeout (should timeout)
  log.test('Custom short timeout (should trigger timeout)');
  const result2 = await makeRequest('/broken', {
    urls: ['https://httpbin.org/delay/10'], // This endpoint delays 10 seconds
    websiteUrl: 'https://httpbin.org',
    userId: 'test-user-2',
    timeout: 2000, // 2 second timeout
  });

  if (!result2.success && result2.status === 408) {
    runner.addResult(
      'Broken Checker - Timeout Detection',
      true,
      `Correctly returned 408 status after ${result2.duration}ms`,
      result2.error?.message
    );
  } else if (!result2.success && result2.message.includes('timeout')) {
    runner.addResult(
      'Broken Checker - Timeout Detection',
      true,
      `Correctly detected timeout: ${result2.message}`,
      null
    );
  } else {
    runner.addResult(
      'Broken Checker - Timeout Detection',
      false,
      `Expected timeout but got status ${result2.status}`,
      result2.error?.message
    );
  }

  // Test 1.3: Check error tracking
  log.test('Error tracking for individual links');
  const result3 = await makeRequest('/broken', {
    urls: [
      'https://httpbin.org/status/200',
      'https://httpbin.org/status/500',
      'https://invalid-domain-that-does-not-exist-12345.com',
    ],
    websiteUrl: 'https://httpbin.org',
    userId: 'test-user-3',
  });

  if (result3.success && result3.data.brokenLinks) {
    const hasErrorInfo = result3.data.brokenLinks.some(link => link.error);
    runner.addResult(
      'Broken Checker - Error Tracking',
      hasErrorInfo || result3.data.brokenLinks.length > 0,
      `Tracked ${result3.data.brokenLinks.length} link checks`,
      `Total links checked: ${result3.data.totalLinks}`
    );
  } else {
    runner.addResult(
      'Broken Checker - Error Tracking',
      false,
      'Failed to check links',
      result3.error?.message
    );
  }
}

// Test Suite 2: Orphan Pages Checker
async function testOrphanPagesChecker() {
  log.section('ORPHAN PAGES CHECKER TESTS');

  // Test 2.1: Normal operation
  log.test('Normal operation with valid website');
  const result1 = await makeRequest('/orphan', {
    url: 'https://example.com',
    userId: 'test-user-4',
  });

  if (result1.success && result1.status === 200) {
    runner.addResult(
      'Orphan Checker - Normal Operation',
      true,
      `Completed in ${result1.duration}ms`,
      `Scanned ${result1.data.totalPages} pages, found ${result1.data.orphanPages?.length || 0} orphans`
    );
  } else {
    runner.addResult(
      'Orphan Checker - Normal Operation',
      false,
      `Failed with status ${result1.status}`,
      result1.error?.message
    );
  }

  // Test 2.2: Custom timeout
  log.test('Custom timeout configuration');
  const result2 = await makeRequest('/orphan', {
    url: 'https://example.com',
    userId: 'test-user-5',
    timeout: 120000, // 2 minutes
  });

  if (result2.success && result2.status === 200) {
    runner.addResult(
      'Orphan Checker - Custom Timeout',
      true,
      `Accepted custom timeout and completed in ${result2.duration}ms`,
      null
    );
  } else if (!result2.success && result2.status === 408) {
    runner.addResult(
      'Orphan Checker - Custom Timeout',
      true,
      `Correctly timed out with custom timeout`,
      result2.error?.message
    );
  } else {
    runner.addResult(
      'Orphan Checker - Custom Timeout',
      false,
      `Unexpected result`,
      result2.error?.message
    );
  }

  // Test 2.3: Very short timeout
  log.test('Short timeout (should trigger timeout)');
  const result3 = await makeRequest('/orphan', {
    url: 'https://httpbin.org',
    userId: 'test-user-6',
    timeout: 1000, // 1 second - likely to timeout
  });

  if (!result3.success && (result3.status === 408 || result3.message.includes('timeout'))) {
    runner.addResult(
      'Orphan Checker - Short Timeout',
      true,
      `Correctly handled short timeout`,
      result3.error?.message || result3.message
    );
  } else if (!result3.success) {
    runner.addResult(
      'Orphan Checker - Short Timeout',
      false,
      `Expected timeout, got different error`,
      result3.error?.message || result3.message
    );
  } else {
    runner.addResult(
      'Orphan Checker - Short Timeout',
      false,
      `Expected timeout but request succeeded`,
      null
    );
  }
}

// Test Suite 3: Sitemap Checker
async function testSitemapChecker() {
  log.section('SITEMAP CHECKER TESTS');

  // Test 3.1: Normal operation
  log.test('Normal operation with valid sitemap');
  const result1 = await makeRequest('/sitemap', {
    url: 'https://www.wikipedia.org',
    userId: 'test-user-7',
  });

  if (result1.success && result1.status === 200) {
    runner.addResult(
      'Sitemap Checker - Normal Operation',
      true,
      `Completed in ${result1.duration}ms`,
      `Checked ${result1.data.total} URLs, found ${result1.data.brokenCount} broken links`
    );
  } else {
    runner.addResult(
      'Sitemap Checker - Normal Operation',
      false,
      `Failed with status ${result1.status}`,
      result1.error?.message
    );
  }

  // Test 3.2: Custom timeout parameters
  log.test('Custom timeout parameters (sitemap + page)');
  const result2 = await makeRequest('/sitemap', {
    url: 'https://example.com',
    timeout: 15000,      // 15 seconds for sitemap fetch
    pageTimeout: 8000,   // 8 seconds per page
    userId: 'test-user-8',
  });

  if (result2.success && result2.status === 200) {
    runner.addResult(
      'Sitemap Checker - Custom Timeouts',
      true,
      `Accepted custom timeout parameters`,
      `Checked ${result2.data.total} URLs in ${result2.duration}ms`
    );
  } else if (!result2.success && result2.message.includes('timeout')) {
    runner.addResult(
      'Sitemap Checker - Custom Timeouts',
      true,
      `Correctly handled timeout with custom parameters`,
      result2.error?.message
    );
  } else {
    runner.addResult(
      'Sitemap Checker - Custom Timeouts',
      false,
      `Failed unexpectedly`,
      result2.error?.message
    );
  }

  // Test 3.3: Invalid URL handling
  log.test('Invalid URL error handling');
  const result3 = await makeRequest('/sitemap', {
    url: '',
    userId: 'test-user-9',
  });

  if (!result3.success && result3.status === 400) {
    runner.addResult(
      'Sitemap Checker - Invalid URL',
      true,
      `Correctly rejected invalid URL with 400 status`,
      null
    );
  } else {
    runner.addResult(
      'Sitemap Checker - Invalid URL',
      false,
      `Expected 400 but got ${result3.status}`,
      result3.error?.message
    );
  }
}

// Test Suite 4: Request Validation
async function testRequestValidation() {
  log.section('REQUEST VALIDATION TESTS');

  // Test 4.1: Missing required fields - Broken Checker
  log.test('Broken Checker - Missing URLs array');
  const result1 = await makeRequest('/broken', {
    websiteUrl: 'https://example.com',
    userId: 'test-user-10',
  });

  if (!result1.success && result1.status === 400) {
    runner.addResult(
      'Broken Checker - Validation',
      true,
      `Correctly rejected request without URLs`,
      null
    );
  } else {
    runner.addResult(
      'Broken Checker - Validation',
      false,
      `Expected 400 but got ${result1.status}`,
      null
    );
  }

  // Test 4.2: Missing required fields - Orphan Checker
  log.test('Orphan Checker - Missing URL');
  const result2 = await makeRequest('/orphan', {
    userId: 'test-user-11',
  });

  if (!result2.success && result2.status === 400) {
    runner.addResult(
      'Orphan Checker - Validation',
      true,
      `Correctly rejected request without URL`,
      null
    );
  } else {
    runner.addResult(
      'Orphan Checker - Validation',
      false,
      `Expected 400 but got ${result2.status}`,
      null
    );
  }

  // Test 4.3: Missing required fields - Sitemap Checker
  log.test('Sitemap Checker - Missing URL');
  const result3 = await makeRequest('/sitemap', {
    userId: 'test-user-12',
  });

  if (!result3.success && result3.status === 400) {
    runner.addResult(
      'Sitemap Checker - Validation',
      true,
      `Correctly rejected request without URL`,
      null
    );
  } else {
    runner.addResult(
      'Sitemap Checker - Validation',
      false,
      `Expected 400 but got ${result3.status}`,
      null
    );
  }
}

// Main test execution
async function runAllTests() {
  console.log(`
${colors.bright}${colors.cyan}╔════════════════════════════════════════╗
║   TIMEOUT FEATURE - COMPREHENSIVE TEST   ║
║          SUITE FOR ALL CHECKERS          ║
╚════════════════════════════════════════╝${colors.reset}
  `);

  log.info(`Testing at: ${BASE_URL}`);
  log.info(`Test timeout limit: ${TEST_TIMEOUT}ms\n`);

  try {
    // Check if server is running
    log.info('Checking server connectivity...');
    try {
      await axios.get(`${BASE_URL}/`, { timeout: 5000 });
      log.success('Server is running');
    } catch (error) {
      log.error('Server is not responding. Please start the backend server.');
      log.info('Run: npm run dev');
      process.exit(1);
    }

    // Run all test suites
    await testBrokenLinksChecker();
    await testOrphanPagesChecker();
    await testSitemapChecker();
    await testRequestValidation();

    // Print summary
    runner.printSummary();

    // Exit with appropriate code
    process.exit(runner.passedTests === runner.totalTests ? 0 : 1);
  } catch (error) {
    log.error(`Unexpected error during testing: ${error.message}`);
    process.exit(1);
  }
}

// Run tests
runAllTests();
