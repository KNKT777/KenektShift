import fs from 'fs';
import path from 'path';

// Function to add express import if not present
const addExpressImport = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf-8');
  if (!content.includes("import express from 'express';")) {
    content = `import express from 'express';\n${content}`;
    fs.writeFileSync(filePath, content, 'utf-8');
  }
};

// Function to add catch block to try statements without one
const addCatchToTry = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf-8');
  const tryRegex = /try\s*{[^}]*}(?!\s*catch|\s*finally)/g;

  content = content.replace(tryRegex, (match) => {
    return `${match} catch (error) {\n  console.error(error);\n}`;
  });

  fs.writeFileSync(filePath, content, 'utf-8');
};

// Recursively walk through the directory to process all route files
const processDirectory = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('Routes.js') || file.endsWith('.js')) {
      addExpressImport(filePath);
      addCatchToTry(filePath);
    }
  });
};

// Start processing from the current directory
processDirectory('./');
