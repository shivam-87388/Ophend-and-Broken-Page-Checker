# Timeout Feature - Quick Reference

## Running Tests

```bash
# Option 1: Full automated tests (recommended)
npm test

# Option 2: Quick manual tests
npm run test:quick

# Option 3: Interactive menu (Windows only)
run-tests.bat

# Option 4: Manual with node
node tests/timeout-test.js
node tests/manual-test.js
```

## Key Changes

### OrphanController.js
- Added 30s per-page timeout
- Added 5min overall timeout
- Returns 408 on timeout
- Custom timeout via `timeout` parameter

### BrokenController.js
- Added 15s per-URL timeout
- Added 5min overall timeout
- Returns 408 on timeout
- Custom timeout via `timeout` parameter

### SitemapController.js
- 10s sitemap fetch timeout (was hardcoded, now configurable)
- 5s per-page timeout (was hardcoded, now configurable)
- Custom timeout via `timeout` parameter
- Custom page timeout via `pageTimeout` parameter

## Timeout Configuration

### Defaults (in milliseconds)

**Broken Checker:**
- Per-URL: 15,000ms (15s)
- Overall: 300,000ms (5min)

**Orphan Checker:**
- Per-page: 30,000ms (30s)
- Overall: 300,000ms (5min)

**Sitemap Checker:**
- Sitemap fetch: 10,000ms (10s)
- Per-page check: 5,000ms (5s)

### Custom Timeouts in Requests

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
  "timeout": 15000,    // Custom sitemap timeout
  "pageTimeout": 8000  // Custom page timeout
}
```

## Test Examples

### Test 1: Normal Operation
```bash
curl -X POST http://localhost:5000/broken \
  -H "Content-Type: application/json" \
  -d '{
    "urls": ["https://httpbin.org/status/200"],
    "websiteUrl": "https://httpbin.org",
    "userId": "test"
  }'
# Expected: 200 OK with results
```

### Test 2: Trigger Timeout
```bash
curl -X POST http://localhost:5000/broken \
  -H "Content-Type: application/json" \
  -d '{
    "urls": ["https://httpbin.org/delay/10"],
    "websiteUrl": "https://httpbin.org",
    "userId": "test",
    "timeout": 2000
  }'
# Expected: 408 Timeout after ~2 seconds
```

### Test 3: Custom Timeout
```bash
curl -X POST http://localhost:5000/orphan \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "userId": "test",
    "timeout": 120000
  }'
# Expected: 200 OK or 408 if exceeds 120s
```

## HTTP Status Codes

| Code | Meaning | When |
|------|---------|------|
| 200 | OK | Check completed successfully |
| 400 | Bad Request | Missing required fields |
| 408 | Timeout | Operation exceeded timeout |
| 500 | Server Error | Unexpected error |

## Files

| File | Purpose |
|------|---------|
| `tests/timeout-test.js` | Full automated test suite |
| `tests/manual-test.js` | Quick manual tests |
| `tests/README.md` | Detailed testing guide |
| `TESTING_GUIDE.md` | Comprehensive testing guide |
| `TIMEOUT_FEATURE.md` | Feature documentation |
| `run-tests.bat` | Windows interactive menu |

## Common Issues & Solutions

### Server not running
```bash
npm run dev
```

### Tests timeout
- Use `httpbin.org/delay/N` for consistent delays
- Reduce test timeout values

### Memory issues
- Check for resource leaks
- Verify browsers are closing

### Tests hanging
- Kill with Ctrl+C
- Restart server

## Quick Test Checklist

- [ ] Server is running (`npm run dev`)
- [ ] Run `npm test`
- [ ] All tests show green checkmarks
- [ ] Success rate is 100%
- [ ] Check at least one timeout triggers (408 response)
- [ ] Verify normal operations complete without timeout

## Resources

- **Full docs:** `TESTING_GUIDE.md`
- **API docs:** `TIMEOUT_FEATURE.md`
- **Source:** `controllers/BrokenController.js`, `controllers/OrphanController.js`, `controllers/SitemapController.js`
