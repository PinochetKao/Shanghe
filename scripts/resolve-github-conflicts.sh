#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   ./scripts/resolve-github-conflicts.sh <base-branch>
# Example:
#   ./scripts/resolve-github-conflicts.sh main

BASE_BRANCH=${1:-main}

FILES=(
  "README.md"
  "app/[locale]/page.tsx"
  "app/globals.css"
  "components/admin/nav.tsx"
  "components/language-switcher.tsx"
  "components/page-shell.tsx"
  "components/site-footer.tsx"
  "components/site-header.tsx"
  "prisma/schema.prisma"
  "prisma/seed.ts"
)

echo "[1/4] Fetching base branch: ${BASE_BRANCH}"
git fetch origin "${BASE_BRANCH}" || true

echo "[2/4] Merging ${BASE_BRANCH} into $(git rev-parse --abbrev-ref HEAD)"
set +e
git merge "origin/${BASE_BRANCH}"
MERGE_STATUS=$?
set -e

if [[ ${MERGE_STATUS} -eq 0 ]]; then
  echo "No conflicts found."
  exit 0
fi

echo "[3/4] Resolving known conflict files by keeping current branch version"
for f in "${FILES[@]}"; do
  if git ls-files -u -- "$f" | grep -q .; then
    git checkout --ours -- "$f"
    git add "$f"
    echo "Resolved: $f"
  fi
done

echo "[4/4] Remaining unresolved files:"
git diff --name-only --diff-filter=U || true

echo "If output above is empty, run:"
echo "  git commit -m 'chore: resolve GitHub merge conflicts for home-focused branch'"
