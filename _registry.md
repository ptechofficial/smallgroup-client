# Pitch Deck Registry

Maps hashed filenames to clients. This file is NOT deployed to GitHub Pages.

| Hash | Client | File | URL |
|------|--------|------|-----|
| `1e79137d` | Ernest Chuang | `pitch_1e79137d.html` | `https://ptechofficial.github.io/claude-sales/pitch_1e79137d.html` |
| `cb07901c` | Joseph Cyriac | `pitch_cb07901c.html` | `https://ptechofficial.github.io/claude-sales/pitch_cb07901c.html` |

## Adding a new pitch

1. Generate a hash: `echo -n "clientname" | md5 | head -c 8`
2. Name the file: `pitch_<hash>.html`
3. Add entry to this table
4. Push to main
