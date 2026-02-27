---
name: review-pr
description: Review a GitHub pull request for code quality, correctness, and adherence to project conventions
disable-model-invocation: true
argument-hint: "[pr-number (optional, defaults to current branch)]"
allowed-tools: Read, Grep, Glob, Bash(gh *)
---

# Review Pull Request

If `$ARGUMENTS` is provided, review PR #$ARGUMENTS. Otherwise, review the PR associated with the current branch by running `gh pr view` with no arguments.

## Step 1: Gather PR context

Determine the target PR:
- If a PR number was given, use that: e.g. `gh pr view $ARGUMENTS`
- If no argument was given, use the current branch: `gh pr view`

Then gather:
- Get the PR details: `gh pr view <target>`
- Get the diff: `gh pr diff <target>`
- Get any existing review comments via `gh api`
- List changed files: `gh pr diff <target> --name-only`

## Step 2: Understand the changes

- Read the full diff carefully
- For each changed file, understand the surrounding context by reading the file if needed
- Check if the PR description accurately reflects the changes

## Step 3: Review against these criteria

### Correctness
- Does the code do what the PR description says?
- Are there logic errors, off-by-one errors, or edge cases?
- Are error cases handled appropriately?

### Code quality
- Is the code readable and well-structured?
- Are there unnecessary changes or over-engineering?
- Does it follow existing patterns in the codebase?

### Security
- Are there any security vulnerabilities (injection, XSS, etc.)?
- Are secrets or credentials exposed?

### Design & architecture
- Does this fit with the project's architecture (see docs/ for design specs)?
- Are there simpler approaches that would work?

### Documentation & spec alignment
- If there are design docs in `docs/`, do the changes align with documented decisions?
- Are new decisions or deviations from the spec called out?

## Step 4: Provide the review

Summarize your findings in this format:

### Summary
A brief overview of what the PR does and your overall assessment.

### Feedback
List specific items, categorized as:
- **Must fix**: Issues that should be addressed before merging
- **Suggestion**: Improvements that would be nice but aren't blocking
- **Question**: Things that need clarification

### Verdict
One of:
- **Approve** - Good to merge as-is
- **Approve with suggestions** - Can merge, but consider the suggestions
- **Request changes** - Should address "must fix" items before merging
