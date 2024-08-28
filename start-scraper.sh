#!/bin/bash
echo "Starting scraper..."
npm ci
pm2 start dka-scraper.config.cjs
