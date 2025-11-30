# Timeout Feature Testing Guide

Complete guide to testing the timeout implementation in all checkers.

## Quick Start

### 1. Start the Backend Server

```bash
cd backend
npm install
npm run dev
```

Expected output:
```
server started
```

### 2. Run Tests (in a new terminal)

```bash
cd backend
npm test                  # Full automated tests
# or
npm run test:quick       # Quick manual tests
# or
npm run test:menu        # Interactive menu (Windows)
```

### 3. Windows Users - Interactive Menu

Double-click `run-tests.bat` or run:
```bash
run-tests.bat
```

## Test Categories

### Category 1: Timeout Enforcement

**Purpose:** Verify timeouts actually trigger

**Tests:**
- [ ] Broken Checker with 2s timeout on 10s delay → 408 response
- [ ] Orphan Checker with 1s timeout on slow site → 408 response
- [ ] Sitemap Checker with short timeout → handles gracefully

**Expected:** 408 status code with timeout error message

```bash
# Manual test in curl:
curl -X POST http://localhost:5000/broken \
  -H "Content-Type: application/json" \
  -d '{
    "urls": ["https://httpbin.org/delay/10"],
    "websiteUrl": "https://httpbin.org",
    "userId": "test",
    "timeout": 2000
  }'
# Should timeout before 10 seconds
```

### Category 2: Normal Operations

**Purpose:** Verify normal operations still work without timeouts

**Tests:**
- [ ] Broken Checker on real URLs completes
- [ ] Orphan Checker on real site completes
- [ ] Sitemap Checker on real sitemap completes

**Expected:** 200 status with valid results

```bash
curl -X POST http://localhost:5000/broken \
  -H "Content-Type: application/json" \
  -d '{
    "urls": ["https://httpbin.org/status/200"],
    "websiteUrl": "https://httpbin.org",
    "userId": "test"
  }'
# Should complete quickly with status 200
```

### Category 3: Custom Timeout Configuration

**Purpose:** Verify clients can override default timeouts

**Tests:**
- [ ] Broken Checker accepts custom timeout parameter
- [ ] Orphan Checker accepts custom timeout parameter
- [ ] Sitemap Checker accepts timeout and pageTimeout

**Expected:** Custom timeouts are applied

```bash
# Test custom timeout
curl -X POST http://localhost:5000/orphan \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "userId": "test",
    "timeout": 60000
  }'
```

### Category 4: Error Handling

**Purpose:** Verify errors are handled gracefully

**Tests:**
- [ ] Invalid URL returns 400
- [ ] Missing required fields returns 400
- [ ] Timeout returns 408
- [ ] Server errors return 500

**Expected:** Appropriate HTTP status codes

```bash
# Test missing URL
curl -X POST http://localhost:5000/orphan \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test"
  }'
# Should return 400 (Bad Request)
```

### Category 5: Resource Cleanup

**Purpose:** Verify resources are properly cleaned up

**Monitor during tests:**
- Browser processes don't accumulate
- Memory doesn't continuously increase
- Timeout intervals are cleared

**Check with:**
```bash
# Watch processes (Mac/Linux)
watch 'ps aux | grep node'

# Check memory usage
node --inspect tests/manual-test.js
# Then visit chrome://inspect in Chrome DevTools
```

## Test Execution Scenarios

### Scenario 1: Test Against Real Websites

```bash
# Good websites for testing:

# 1. httpbin.org - Provides controllable delays
curl -X POST http://localhost:5000/broken \
  -H "Content-Type: application/json" \
  -d '{
    "urls": [
      "https://httpbin.org/status/200",
      "https://httpbin.org/status/404",
      "https://httpbin.org/delay/5"
    ],
    "websiteUrl": "https://httpbin.org",
    "userId": "test"
  }'

# 2. example.com - Simple, fast website
curl -X POST http://localhost:5000/orphan \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "userId": "test"
  }'

# 3. Wikipedia - Has sitemap
curl -X POST http://localhost:5000/sitemap \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.wikipedia.org",
    "userId": "test"
  }'
```

### Scenario 2: Test Timeout Trigger

```bash
# These should timeout:

# Broken checker with 2s timeout on 10s delay
curl -X POST http://localhost:5000/broken \
  -H "Content-Type: application/json" \
  -d '{
    "urls": ["https://httpbin.org/delay/10"],
    "websiteUrl": "https://httpbin.org",
    "userId": "test-timeout",
    "timeout": 2000
  }'
# Expected: 408 response in ~2 seconds

# Orphan checker with very short timeout
curl -X POST http://localhost:5000/orphan \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://httpbin.org",
    "userId": "test-timeout",
    "timeout": 500
  }'
# Expected: 408 response in ~500ms
```

### Scenario 3: Stress Test (Many URLs)

```bash
# Test Broken Checker with many URLs
curl -X POST http://localhost:5000/broken \
  -H "Content-Type: application/json" \
  -d '{
    "urls": [
      "https://httpbin.org/status/200",
      "https://httpbin.org/status/201",
      "https://httpbin.org/status/404",
      "https://httpbin.org/status/500",
      "https://httpbin.org/status/503"
    ],
    "websiteUrl": "https://httpbin.org",
    "userId": "stress-test"
  }'
```

## Expected Test Results

### Successful Timeout Feature

✅ When working correctly, you should see:

1. **Normal requests complete** (< configured timeout)
2. **Short timeouts trigger** (exactly at timeout value)
3. **408 responses** for timeout errors
4. **Clean resource cleanup** (no memory leaks)
5. **Proper error messages** in response
6. **Input validation** still works

### Example: Successful Test Run

```
✅ Broken Checker - Normal Operation: Completed in 3245ms
✅ Broken Checker - Timeout Detection: Correctly returned 408 status after 2015ms
✅ Broken Checker - Error Tracking: Tracked 3 link checks
✅ Orphan Checker - Normal Operation: Completed in 15432ms
✅ Orphan Checker - Short Timeout: Correctly handled short timeout
✅ Sitemap Checker - Normal Operation: Completed in 8234ms
✅ Request Validation: Correctly rejected invalid requests

Total Tests: 20
Passed: 20
Failed: 0
Success Rate: 100%
```

## Troubleshooting Tests

### Issue: "Connection Refused"

**Problem:** Tests can't connect to server
**Solution:**
```bash
# Make sure server is running
npm run dev

# Check if port 5000 is in use
# Windows:
netstat -ano | findstr :5000

# Mac/Linux:
lsof -i :5000
```

### Issue: Tests Hang

**Problem:** Test doesn't complete
**Solution:**
```bash
# Kill the hanging test
Ctrl+C

# Restart server
npm run dev

# Try a simpler test first
node tests/manual-test.js
```

### Issue: Timeouts Don't Trigger

**Problem:** Expected timeout but request completed
**Solution:**
- Website may have responded quickly
- Use `httpbin.org/delay/N` for consistent delays
- Reduce timeout value in test

### Issue: Memory Keeps Growing

**Problem:** Memory usage increases during tests
**Solution:**
- This indicates potential resource leak
- Check that browsers are being closed
- Verify timeout intervals are cleared
- Monitor with: `node --inspect-brk tests/timeout-test.js`

## Manual Testing with Postman

### Setup

1. Import endpoints:
   - POST `http://localhost:5000/broken`
   - POST `http://localhost:5000/orphan`
   - POST `http://localhost:5000/sitemap`

2. Create test requests with different timeout values

3. Use Postman's network inspector to see response times

### Example Request

```json
POST http://localhost:5000/broken

{
  "urls": ["https://httpbin.org/status/200", "https://httpbin.org/status/404"],
  "websiteUrl": "https://httpbin.org",
  "userId": "postman-test",
  "timeout": 30000
}
```

## Performance Metrics to Track

During testing, note:

| Metric | Expected | Test Method |
|--------|----------|-------------|
| Request time (normal) | < 30s | Use `/broken` with fast URLs |
| Timeout accuracy | ± 100ms | Measure elapsed time |
| Memory after test | Same as start | Check `top` or Task Manager |
| Process count | 1 node | Check `ps aux \| grep node` |
| Error response time | 408 in < 3s | Test with short timeout |

## Continuous Testing

### Run Tests Periodically

```bash
# Run tests every hour
watch -n 3600 'cd backend && npm test'

# Or use task scheduler (Windows)
# Or use cron (Mac/Linux)
```

### Automated CI/CD

```bash
#!/bin/bash
cd backend
npm install
npm run dev &
SERVER_PID=$!
sleep 2
npm test
TEST_RESULT=$?
kill $SERVER_PID
exit $TEST_RESULT
```

## Success Criteria

Tests pass when:

1. ✅ All timeout values are respected (±100ms)
2. ✅ 408 responses returned for timeout
3. ✅ No memory leaks detected
4. ✅ All endpoints respond with appropriate status codes
5. ✅ Error messages are clear and helpful
6. ✅ Resources are cleaned up properly
7. ✅ Custom timeout parameters work
8. ✅ Validation still prevents bad requests

## Next Steps

Once tests pass:

1. Deploy to staging environment
2. Run extended tests on slow networks
3. Monitor production for timeout patterns
4. Adjust timeout values based on real usage
5. Consider implementing timeout metrics/logging

## Questions?

Review the detailed output from tests:
- Full test results in `timeout-test.js` output
- Quick results in `manual-test.js` output
- Endpoint details in each controller
- Timeout config in `TIMEOUT_CONFIG` objects
