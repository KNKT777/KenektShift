#!/bin/bash

echo "Step 1: Removing node_modules to ensure a clean installation"
rm -rf node_modules

echo "Step 2: Installing dependencies with force to resolve conflicts"
# Install dependencies forcibly to resolve any conflicts
npm install --force

echo "Step 3: Finding and removing unused variables"
# Use ESLint to remove unused variables automatically
npx eslint . --fix --rule 'no-unused-vars: ["error"]'

echo "Step 4: Fixing common syntax errors with simple patterns"
# Fix misplaced try-catch without proper parentheses
find ./ -type f -name "*.js" -exec sed -i 's/^\s*catch\s*(/} catch (/' {} +

# Fix misplaced periods at the beginning of lines, which could be a common typo
find ./ -type f -name "*.js" -exec sed -i 's/^\s*\./;./' {} +

# Fix parsing errors related to misplaced semicolons or periods
find ./ -type f -name "*.js" -exec sed -i 's/^;.//g' {} +

echo "Step 5: Running ESLint to fix remaining formatting issues"
npx eslint . --fix

echo "Step 6: Checking for remaining issues"
npx eslint .

echo "Step 7: Restarting Node server with nodemon"
# Restart the server using nodemon
npx nodemon

echo "All steps completed. Check the server status and logs for any remaining issues."
