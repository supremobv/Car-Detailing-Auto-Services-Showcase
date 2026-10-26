# REFINE — Car Detailing & Auto Services Showcase

Built directly in the requested folder using React, TypeScript, Vinext, and Cloudflare D1.

## Features

- Four service packages with prices for compact, sedan, SUV/crossover, and van/pickup sizes.
- Full sample price guide, service details, optional extras, and live inquiry estimates.
- Filterable six-concept vehicle gallery and multi-photo dialogs.
- Two accessible before/after comparison sliders for exterior and interior concepts.
- Service inquiries saved with reference numbers; protected studio inbox at `/studio` with statuses and JSON export.
- Responsive dark design with keyboard-accessible dialogs, range inputs, and reduced-motion support.

## Local development

Node 22.13+ required. Run `npm ci`, `npm run dev`, `npm run build`, and `npm start`. On this Windows machine `V:` maps to this project and avoids npm lifecycle quoting issues caused by the ampersand in its name. D1 local and hosted data are separate. Apply the generated SQL migration to local Wrangler before testing the inquiry API; Sites applies tracked Drizzle migrations during publication.

## Content and pricing

REFINE is fictional. Package rates, durations, inclusions, and imagery are sample content. Prices and descriptions are defined in `app/detailing-data.ts`. Server-side inquiry validation recalculates the estimate from package, size, and unique extras; submitted totals are ignored. No appointments or payments are confirmed. Email notifications are not configured.

Photos are stored in `public/images` and credited at `/credits`. Gallery and comparison images depict different vehicles or interiors. Do not present them as matched before-and-after results. Replace them with matched photographs of the same vehicle before using the site as a real shop portfolio. No warranty, scratch-removal result, coating lifespan, certification, or brand partnership is claimed.

## Access

The Site is owner-private. Inbox read/update APIs additionally require ChatGPT identity and rely on the platform's owner-private authorization boundary. Add an explicit administrator allowlist before changing the Site audience to public or shared. No credentials or local database records are tracked.
