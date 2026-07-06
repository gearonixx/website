#!/usr/bin/env bash
# Commit all changes, push, and redeploy to Vercel production in one command.
# Usage: ./deploy.sh "commit message"
set -euo pipefail

cd "$(dirname "$0")"

msg="${1:-Update site}"

if [[ -n "$(git status --porcelain)" ]]; then
  git add -A
  git commit -m "$msg"
else
  echo "No changes to commit."
fi

git push
npx vercel --prod --yes
