#!/bin/bash
set -e

echo "Installing with pnpm workaround..."

# Upgrade to latest pnpm
npm install -g pnpm@latest

# Install with aggressive settings
pnpm install \
  --shamefully-hoist \
  --strict-peer-dependencies=false \
  --network-timeout=300000 \
  --fetch-timeout=300000 \
  --registry=https://registry.npmjs.org \
  --no-frozen-lockfile

echo "Installation complete!"

