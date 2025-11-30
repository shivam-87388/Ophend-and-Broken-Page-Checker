# Testing the Timeout Feature

This directory contains test scripts to verify the timeout feature implementation across all checkers (Broken Links, Orphan Pages, and Sitemap).

## Files

- **`timeout-test.js`** - Comprehensive automated test suite with detailed reporting
- **`manual-test.js`** - Quick manual tests for spot-checking functionality

## Prerequisites

1. Backend server must be running:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. Tests should be run from a separate terminal in the backend directory:
   ```bash
   cd backend
   node tests/timeout-test.js
   # or
   node tests/manual-test.js
   ```

## Running Tests

### Comprehensive Test Suite

Run the full automated test suite:

```bash
node tests/timeout-test.js
```

**What it tests:**
- ✅ Normal operations without timeouts
- ✅ Custom timeout configurations
- ✅ Timeout trigger and 408 response codes
- ✅ Error tracking and reporting
- ✅ Request validation
- ✅ Resource cleanup

**Output:**
- Color-coded results (green for pass, red for fail)
- Detailed timing information
- Test summary with success rate

### Manual Quick Tests

Run quick spot-check tests:

```bash
node tests/manual-test.js
```

**What it tests:**
- Normal operations for each checker
- Timeout scenarios
- Custom timeout parameters
- Request validation

**Output:**
- Individual test results
- Full request/response details
- Duration for each operation

## Test Scenarios

### 1. Broken Links Checker

**Test: Normal Operation**
```json
{
  "urls": ["https://httpbin.org/status/200", "https://httpbin.org/status/404"],
  "websiteUrl": "https://httpbin.org",
  "userId": "test-user"
}
```
Expected: 200 OK, lists checked links

**Test: Short Timeout**
```json
{
  "urls": ["https://httpbin.org/delay/10"],
  "websiteUrl": "https://httpbin.org",
  "userId": "test-user",
  "timeout": 2000
}
```
Expected: 408 Timeout (2s < 10s delay)

### 2. Orphan Pages Checker

**Test: Normal Operation**
```json
{
  "url": "https://example.com",
  "userId": "test-user"
}
```
Expected: 200 OK, lists orphaned pages

**Test: Custom Timeout**
```json
{
  "url": "https://example.com",
  "userId": "test-user",
  "timeout": 120000
}
```
Expected: 200 OK or 408 depending on actual duration

### 3. Sitemap Checker

**Test: Normal Operation**
```json
{
  "url": "https://example.com",
  "userId": "test-user"
}
```
Expected: 200 OK, lists checked URLs

**Test: Custom Timeouts**
```json
{
  "url": "https://example.com",
  "userId": "test-user",
  "timeout": 15000,
  "pageTimeout": 8000
}
```
Expected: 200 OK with custom timeout applied

## Understanding Test Results

### Success Indicators ✅
- Operations complete within timeout
- 408 responses when expected
- Proper error tracking
- Resource cleanup

### Failure Indicators ❌
- Unexpected status codes
- Missing error information
- Timeout not triggered when expected
- Resources not cleaned up

## Expected Timeouts (Defaults)

| Checker | Operation | Default Timeout |
|---------|-----------|-----------------|
| **Broken** | Per URL | 15 seconds |
| **Broken** | Overall | 5 minutes |
| **Orphan** | Per page | 30 seconds |
| **Orphan** | Overall | 5 minutes |
| **Sitemap** | Fetch sitemap | 10 seconds |
| **Sitemap** | Per page | 5 seconds |

## Customizing Timeouts for Tests

All endpoints accept custom timeout parameters:

```javascript
// Broken Checker
{
  "urls": [...],
  "websiteUrl": "...",
  "userId": "...",
  "timeout": 120000  // Custom overall timeout
}

// Orphan Checker
{
  "url": "...",
  "userId": "...",
  "timeout": 180000  // Custom overall timeout
}

// Sitemap Checker
{
  "url": "...",
  "userId": "...",
  "timeout": 15000,    // Custom sitemap fetch timeout
  "pageTimeout": 8000  // Custom page check timeout
}
```

## Troubleshooting

### Tests Fail with "Connection Refused"
- Ensure backend server is running: `npm run dev`
- Check server is listening on `http://localhost:5000`

### Tests Complete Instantly (No Actual Timeout)
- Some websites may respond very quickly
- Use `https://httpbin.org/delay/N` to test timeouts (N = seconds)
- Or adjust test timeout values to be shorter

### Tests Show Partial Results
- Some websites may have rate limiting
- Try different URLs or wait between test runs
- This is normal behavior, not a timeout bug

### Memory Issues
- Tests properly clean up browsers and timers
- If memory grows, there may be a resource leak
- Monitor with: `node --inspect tests/timeout-test.js`

## Adding Custom Tests

Edit `manual-test.js` or `timeout-test.js` to add new test cases:

```javascript
await testEndpoint(
  'My Custom Test',
  '/broken',
  {
    urls: ['https://example.com/page1'],
    websiteUrl: 'https://example.com',
    userId: 'custom-test',
    timeout: 5000  // Custom timeout
  }
);
```

## Continuous Integration

For CI/CD pipelines, use the automated test suite:

```bash
# In your CI script
npm install
npm run dev &  # Start server in background
sleep 2        # Wait for server to start
node tests/timeout-test.js
TEST_RESULT=$?
kill %1        # Kill background server
exit $TEST_RESULT
```

## Performance Benchmarks

Expected performance characteristics:

| Checker | Test Type | Expected Duration |
|---------|-----------|-------------------|
| **Broken** | Single URL | < 5s |
| **Broken** | 10 URLs | < 20s |
| **Orphan** | Small site | 10-60s |
| **Orphan** | With timeout 1s | ~1s |
| **Sitemap** | 50 URLs | 10-30s |
| **Sitemap** | With page timeout 2s | < 30s |

## Notes

- Tests use real external websites for accuracy
- Some tests may fail due to network issues or site changes
- Timeout tests intentionally trigger timeouts
- Tests are non-destructive and read-only
