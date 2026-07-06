# Agent Discovery for tools.mcms.qzz.io and t.mcms.qzz.io

This repository is shared by two domains:

- GitHub Pages: https://tools.mcms.qzz.io/
- Cloudflare Pages: https://t.mcms.qzz.io/

The static discovery files and Cloudflare function logic are written so that each domain can serve the same metadata while using its own host in generated links and responses.

## Notes

- The homepage now uses a canonical link and dynamic OG tags based on the current host.
- The Cloudflare Pages function serves discovery endpoints such as /.well-known/api-catalog and /.well-known/openid-configuration using the current origin.
- The DNS-AID record file is a template and should be converted to actual DNS records in your DNS provider.
