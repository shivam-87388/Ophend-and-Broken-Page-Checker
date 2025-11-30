# Timeout Feature Implementation

## Overview
A comprehensive timeout feature has been implemented across all three checkers to prevent long-running operations from blocking resources.

## Changes Made

### 1. **OrphanController.js**
- **Default Timeouts:**
  - Page Navigation: 30 seconds
  - Overall Check: 5 minutes
- **Features:**
  - `Promise.race()` implementation for timeout enforcement
  - Browser auto-cleanup on timeout
  - Custom timeout support via `timeout` parameter in request body
  - Specific 408 (Request Timeout) HTTP response for timeout errors
  - Safe resource cleanup with error handling

### 2. **BrokenController.js**
- **Default Timeouts:**
  - Page Check (per URL): 15 seconds
  - Overall Check: 5 minutes
- **Features:**
  - Individual page check timeouts
  - Per-link error tracking with timeout indicators
  - Custom timeout support via `timeout` parameter
  - 408 HTTP response for timeout errors
  - Detailed error messages for each broken link

### 3. **SitemapController.js**
- **Default Timeouts:**
  - Sitemap Fetch: 10 seconds
  - Page Check: 5 seconds per page
- **Features:**
  - Configurable sitemap timeout via `timeout` parameter
  - Configurable page check timeout via `pageTimeout` parameter
  - Already had axios timeout support (now enhanced with configurability)
  - Better timeout error detection with `ECONNABORTED` handling

## API Usage

### OrphanController - Check Orphan Pages
```json
{
  "url": "https://example.com",
  "userId": "user123",
  "timeout": 120000  // Optional: custom timeout in milliseconds
}
```

### BrokenController - Check Broken Links
```json
{
  "urls": ["https://example.com/page1", "https://example.com/page2"],
  "websiteUrl": "https://example.com",
  "userId": "user123",
  "timeout": 120000  // Optional: custom timeout in milliseconds
}
```

### SitemapController - Check Sitemap
```json
{
  "url": "https://example.com",
  "sitemapUrl": "https://example.com/sitemap.xml",  // Optional
  "timeout": 15000,        // Optional: custom sitemap fetch timeout
  "pageTimeout": 7000      // Optional: custom page check timeout
}
```

## Error Handling

All controllers now:
1. **Return HTTP 408 (Request Timeout)** when timeout occurs
2. **Clean up resources** (browsers, timeouts) even when errors occur
3. **Provide clear error messages** indicating timeout occurred
4. **Log errors** for debugging purposes
5. **Handle nested timeouts** gracefully

Example timeout response:
```json
{
  "message": "Check timeout exceeded",
  "error": "Overall check timeout exceeded"
}
```

## Timeout Configuration

All timeout values are configurable in each controller via `TIMEOUT_CONFIG` object:

```javascript
const TIMEOUT_CONFIG = {
  pageNavigation: 30000,  // ms
  pageGoto: 30000,         // ms
  overallCheck: 300000     // ms
};
```

Clients can override defaults by sending custom `timeout` and/or `pageTimeout` parameters in request body.

## Resource Management

- **Browser Cleanup:** Browsers are properly closed even when timeouts occur
- **Timeout Cleanup:** JavaScript timeout IDs are cleared to prevent memory leaks
- **Error Recovery:** Failed requests don't prevent subsequent ones
- **Graceful Degradation:** Partial results are returned when possible

## Performance Benefits

1. Prevents indefinite hangs on unreachable/slow websites
2. Predictable response times for API clients
3. Better resource utilization (browsers released promptly)
4. Configurable based on business requirements
5. Improved user experience with faster failure detection
