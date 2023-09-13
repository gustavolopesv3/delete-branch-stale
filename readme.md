# Git Remote Branch Cleaner

A Node.js script to identify and optionally delete stale remote branches that haven't been updated in a specified number of days. It also checks if there are open Pull Requests (PRs) associated with each branch before deletion.

## Table of Contents

- [Git Remote Branch Cleaner](#git-remote-branch-cleaner)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
- [Configuration](#configuration)

## Prerequisites

Before you can use this script, you need to have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or later)
- [Git](https://git-scm.com/)

## Getting Started

1. Clone this repository to your local machine:

```bash
git clone https://github.com/your-username/git-remote-branch-cleaner.git
```
Navigate to the project directory:

```bash
cd git-remote-branch-cleaner
```
Install the required dependencies:
```bash
npm install
```
Usage
To run the script, use the following command:

```bash
node index.js
```
The script will list all the remote branches in your Git repository and check for branches that haven't been updated in a specified number of days (default is 1200 days). It will also check if there are open PRs associated with each branch.

For branches that meet the criteria, the script will prompt you to confirm if you want to delete them. You can enter "yes" to delete or "no" to skip deletion.

# Configuration
You can customize the behavior of the script by modifying the index.js file. Here are some of the configurations you can adjust:

- repoPath: Set the path to your Git repository.
- staleDays: Set the number of days a branch should be considered stale (default is 1200 days).
- githubToken: Set your GitHub token if you want to check for open PRs on a GitHub repository.
- repoOwner and repoName: Set the owner and name of your GitHub repository.