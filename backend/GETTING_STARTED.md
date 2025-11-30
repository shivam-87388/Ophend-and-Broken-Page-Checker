# 🚀 Getting Started - Timeout Feature Testing

## In 5 Minutes

### Step 1: Prepare (30 seconds)
```bash
cd backend
npm install  # If needed
```

### Step 2: Start Server (15 seconds)
Open Terminal 1:
```bash
npm run dev
```
Wait for: `server started`

### Step 3: Run Tests (2 minutes)
Open Terminal 2:
```bash
npm test
```
Wait for results...

### Step 4: Verify (90 seconds)
Look for:
- ✅ Green checkmarks
- ✅ 100% success rate
- ✅ No errors

## What You Should See

### Successful Run
```
═══ BROKEN LINKS CHECKER TESTS ═══
✅ Broken Checker - Normal Operation: Completed in 3245ms
✅ Broken Checker - Timeout Detection: Correctly returned 408 status
✅ Broken Checker - Error Tracking: Tracked 3 link checks

═══ ORPHAN PAGES CHECKER TESTS ═══
✅ Orphan Checker - Normal Operation: Completed in 15432ms
✅ Orphan Checker - Custom Timeout: Accepted custom timeout
✅ Orphan Checker - Short Timeout: Correctly handled timeout

═══ SITEMAP CHECKER TESTS ═══
✅ Sitemap Checker - Normal Operation: Completed in 8234ms
✅ Sitemap Checker - Custom Timeouts: Accepted parameters
✅ Sitemap Checker - Invalid URL: Correctly rejected

═══ REQUEST VALIDATION TESTS ═══
✅ Validation - Broken Checker: Correctly rejected
✅ Validation - Orphan Checker: Correctly rejected
✅ Validation - Sitemap Checker: Correctly rejected

═══ TEST SUMMARY ═══
Total Tests: 20
Passed: 20
Failed: 0
Success Rate: 100%
```

## If Something Goes Wrong

### Problem: "Connection refused"
```bash
# Solution: Make sure server is running
npm run dev  # In Terminal 1
```

### Problem: Tests hang
```bash
# Solution: Kill and restart
Ctrl+C
npm run dev
npm test
```

### Problem: All tests fail
```bash
# Check Node.js
node --version
npm --version

# Reinstall
rm -rf node_modules
npm install
npm test
```

## Understanding the Tests

### What Each Test Checks

**Broken Checker Tests:**
- Normal operation with multiple URLs
- Short timeout triggers properly (408 response)
- Errors tracked for each link

**Orphan Checker Tests:**
- Scanning websites for orphaned pages
- Custom timeout configuration works
- Short timeout triggers properly

**Sitemap Checker Tests:**
- Parsing sitemap XML properly
- Checking each URL
- Custom timeout parameters work

**Validation Tests:**
- Missing required fields return 400
- Invalid URLs are rejected
- Proper error messages shown

### Test Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success - Check completed |
| 400 | Bad Request - Missing fields |
| 408 | Timeout - Check took too long |
| 500 | Server Error - Unexpected issue |

## Next Steps

### 1. Understand the Feature
Read this in 10 minutes:
```bash
cat TIMEOUT_FEATURE.md
```

### 2. Learn Quick Commands
Read this in 2 minutes:
```bash
cat QUICK_REFERENCE.md
```

### 3. Advanced Testing
Read this in 20 minutes:
```bash
cat TESTING_GUIDE.md
```

## Quick Reference

### Commands
```bash
npm run dev              # Start server
npm test                 # Run full tests
npm run test:quick       # Quick tests
run-tests.bat            # Windows menu
```

### Default Timeouts
```
Broken Checker:      15s per URL, 5min overall
Orphan Checker:      30s per page, 5min overall
Sitemap Checker:     10s for sitemap, 5s per page
```

### Example: Custom Timeout
```bash
# Request with custom timeout
curl -X POST http://localhost:5000/broken \
  -H "Content-Type: application/json" \
  -d '{
    "urls": ["https://example.com"],
    "websiteUrl": "https://example.com",
    "userId": "test",
    "timeout": 30000
  }'
```

## Files You Need to Know

### To Run Tests
- `tests/timeout-test.js` - Full tests
- `tests/manual-test.js` - Quick tests
- `run-tests.bat` - Windows menu

### To Understand Feature
- `TIMEOUT_FEATURE.md` - Implementation details
- `QUICK_REFERENCE.md` - Commands & fixes

### To Plan Testing
- `TESTING_GUIDE.md` - Strategy & scenarios
- `tests/README.md` - Test documentation

## Checklist for Success

- [ ] npm install completed
- [ ] Server starts: `npm run dev`
- [ ] Server says "server started"
- [ ] Tests run: `npm test`
- [ ] Wait 1-2 minutes
- [ ] All tests pass (green ✅)
- [ ] Success rate is 100%
- [ ] At least one test shows "408 Timeout"

## Common Timeout Values

| Check | Default | Custom Parameter |
|-------|---------|------------------|
| Broken per URL | 15s | In request body |
| Broken overall | 5min | In request body |
| Orphan per page | 30s | In request body |
| Orphan overall | 5min | In request body |
| Sitemap fetch | 10s | "timeout" in body |
| Sitemap per page | 5s | "pageTimeout" in body |

## Troubleshooting Guide

| Issue | Solution |
|-------|----------|
| Can't find npm | Install Node.js from nodejs.org |
| Can't find tests | Make sure you're in backend directory |
| Server won't start | Check if port 5000 is in use |
| Tests won't connect | Make sure server is running in other terminal |
| Tests timeout instantly | Use slower URL: httpbin.org/delay/10 |
| Tests never finish | Ctrl+C and restart |

## Performance Tips

### To speed up tests:
1. Use local network websites
2. Use httpbin.org for consistent results
3. Run quick tests instead: `npm run test:quick`

### To test timeouts:
1. Use `https://httpbin.org/delay/N` for N second delay
2. Set timeout to less than delay
3. Should get 408 response

## What Happens Next

After successful tests:

1. **Review results** - Check all tests passed
2. **Read docs** - Understand the implementation
3. **Plan integration** - Decide how to use in your app
4. **Deploy** - Push to production if satisfied

## Support

### Quick answers?
- Read: `QUICK_REFERENCE.md` (2 min)
- See: "Common Issues" section

### How does it work?
- Read: `TIMEOUT_FEATURE.md` (10 min)
- See: Implementation details

### How to test properly?
- Read: `TESTING_GUIDE.md` (20 min)
- See: Complete testing strategy

## That's It!

You now have:
- ✅ Timeout feature implemented
- ✅ 20+ test scenarios
- ✅ Comprehensive documentation
- ✅ Quick reference guides
- ✅ Everything you need to verify it works

**Run `npm test` and watch the magic happen!** 🎉

---

Questions? Check the documentation files or re-read relevant sections.

All files are in the `backend/` directory and clearly labeled.

Good luck! 🚀
