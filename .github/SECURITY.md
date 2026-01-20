# Security Policy

## Reporting Security Issues

If you discover a security vulnerability in JSON Indenter Pro, please **do not open a public issue**. Instead, please report it responsibly to:

**Email:** security@jsonindenter.com

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if you have one)

We will respond to security reports within 48 hours and work with you to fix the issue before public disclosure.

## Security Considerations

### Data Privacy

- **All processing is client-side:** No data is sent to any server
- **No data collection:** We don't store or track any user input
- **Browser storage only:** Data is stored locally in your browser only (if cached)
- **Session-based:** All data is cleared when you close the browser

### How to Verify

1. Open browser DevTools (F12)
2. Go to Network tab
3. Use any JSON tool
4. **You will see no requests to external servers** (except for CDN assets)

### HTTPS Only

- The application enforces HTTPS connections
- All connections are encrypted
- No data is transmitted over unencrypted HTTP

### Code Auditing

Since we're open source, you can:

1. **Review the source code** - All code is public on GitHub
2. **Run locally** - Build and run the app yourself without any external services
3. **Use offline** - Once loaded, the app works without internet (except for CDN resources)
4. **Check API calls** - Use browser DevTools to verify no unexpected network requests

## Dependency Security

We use:

- **Dependabot** for automated dependency updates
- **npm audit** to check for known vulnerabilities
- **Regular updates** to keep dependencies current
- **Minimal dependencies** to reduce attack surface

## Best Practices for Users

1. **Keep your browser updated** - Use the latest browser version
2. **Use HTTPS only** - Always use encrypted connections
3. **Be careful with sensitive data** - Even though we don't store it, be cautious what you process
4. **Don't share URLs with data** - URLs may be cached or visible in browser history

## Known Limitations

- Browser storage is not encrypted
- Data is visible in browser memory while in use
- Local storage can be accessed by browser extensions
- History may contain sensitive data

## Security Headers

The application implements:

- **Content Security Policy (CSP)** - Prevents injection attacks
- **X-Content-Type-Options: nosniff** - Prevents MIME sniffing
- **X-Frame-Options: DENY** - Prevents clickjacking
- **X-XSS-Protection** - Protects against XSS attacks

## Browser Compatibility

Tested and supported on:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Older browser versions may have security vulnerabilities and should be updated.

## Responsible Disclosure

We appreciate security researchers who:

- Report vulnerabilities responsibly
- Allow time for fixes before disclosure
- Don't access other users' data
- Provide clear reproduction steps
- Help improve security without causing harm

## Acknowledgments

We thank the security researchers and community members who have reported vulnerabilities responsibly. Security is a shared responsibility, and we appreciate your help making JSON Indenter safer for everyone.

## Questions?

For security-related questions, please email: security@jsonindenter.com

---

**Last Updated:** January 2026
