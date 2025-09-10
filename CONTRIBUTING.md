# Contributing Guidelines

Thank you for considering contributing to this project 🎉  
Follow the steps below to make your contribution smooth and effective.

---

## 🚀 Workflow Overview
1. **Fork** the repository (creates a copy under your account).  
2. **Clone** your fork locally.  
3. **Add upstream** to sync with the original repository.  
4. **Create a new branch** for each fix or feature.  
5. **Make changes** and commit them using [Conventional Commits](https://www.conventionalcommits.org/).  
6. **Push** your branch to your fork.  
7. **Open a Pull Request (PR)** against the `master` branch of the upstream repository.  

---

## 🛠 Step-by-Step Guide

### 1. Fork the Repository
On GitHub, click **Fork** (top right) to create your copy.

### 2. Clone Your Fork
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

### 3. Add Upstream Remote
```bash
Copy code
git remote add upstream https://github.com/<owner>/<repo-name>.git
git remote -v
```
origin → your fork

upstream → original repo

### 4. Keep Your Fork Updated
Always sync before creating new branches:

```bash
Copy code
git checkout master
git fetch upstream
git merge upstream/master
git push origin master
```
### 5. Create a Branch
Name branches by purpose:

```bash
Copy code
# For a bug fix
git checkout -b fix/<msg>

# For a new feature
git checkout -b feat/<new-dashboard-widget>
6. Make Your Changes
Edit the necessary files.
Example: Fix enum case mismatch in schema.prisma and API code.
```
### 7. Stage & Commit
```bash
Copy code
git add .
git commit -m "fix: Some Descriptive MSG"
Conventional Commit Types:
```
fix: → bug fixes

feat: → new features

docs: → documentation changes

refactor: → code refactor without feature/bug changes

### 8. Push Your Branch
```bash
Copy code
git push origin fix/enum-value-case
```
### 9. Open a Pull Request
Go to your fork on GitHub.

Click Compare & pull request.

Base repo: original-owner/repo-name

Base branch: master

Compare: your new branch.

### 10. Write a Good PR
Title:

vbnet
Copy code
fix: align enum values to uppercase (DemandLevel, MarketOutlook)
Description:

markdown
Copy code
### Problem
Enum values for demandLevel and marketOutlook were inconsistent.

### Solution
- Defined enums explicitly in Prisma schema (uppercase).
- Updated API fetching logic to use correct uppercase values.

### Impact
- Ensures consistency across DB schema and API layer.
- Prevents runtime issues when parsing enums.
✅ Checklist Before PR
 Synced fork with upstream.

 Branch created (not committing to master).

 Changes tested locally.

 Clear commit messages used.

 PR title & description follow Problem → Solution → Impact format.

