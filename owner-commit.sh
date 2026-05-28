#!/bin/bash
set -e

COMMIT_AUTHOR=$(git log -1 --format='%ae')
echo "Commit author: ${COMMIT_AUTHOR}"

# Skip if commit is already by the owner/root user
if [ "${COMMIT_AUTHOR}" == "${ROOT_GIT_EMAIL}" ]; then
  echo "Commit already by owner. Skipping."
  exit 0
fi

echo "Non-owner commit by ${COMMIT_AUTHOR}. Creating owner commit..."

git config user.name "${ROOT_USERNAME}"
git config user.email "${ROOT_GIT_EMAIL}"

CREDENTIALS=$(echo -n "${ROOT_USERNAME}:${BITBUCKET_TOKEN}" | base64 | tr -d '\n')
git config http.extraheader "Authorization: Basic ${CREDENTIALS}"

git fetch origin staging
git checkout -f staging
git reset --hard origin/staging

git commit --allow-empty -m "chore: trigger vercel deployment [skip ci]"
git push origin HEAD:staging

echo "done!" 

