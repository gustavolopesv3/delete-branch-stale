const simpleGit = require("simple-git");
const { execSync } = require("child_process");
const { resolve } = require("path");
const { forEach, size } = require("lodash");

const REPO_PATH = "../api";
const DAYS_AGO = 90;

async function listRemoteBranches() {
  try {
    const branches = await getAllBranchs()
    return branches;
  } catch (error) {
    console.error("Error listing remote branches:", error.message);
    return [];
  }
}

async function checkStaleRemoteBranches() {
  const remoteBranches = await listRemoteBranches();
  console.log(Object.keys(remoteBranches))
  console.log(remoteBranches.branches)
  let total = 0;

  forEach(remoteBranches.branches, (branch) => {
    console.log(`processing ${total} of ${size(remoteBranches.branches)}`)
    const lastCommitDate = new Date(
      execSync(
        `git --git-dir=${resolve(
          REPO_PATH,
          ".git"
        )} show --format="%cI" --no-patch ${branch.commit}`
      )
        .toString()
        .trim()
    );
    console.log(lastCommitDate)

    if (getDays(lastCommitDate) > DAYS_AGO) {
      console.log(branch)
      const branchName = branch.name
      console.log(
        `The remote branch "${branchName}" has been inactive for ${getDays(
          lastCommitDate
        )} days`
      );

    //   Check if there's an open PR for the branch
      const hasOpenPR = hasOpenPullRequest(REPO_PATH, branchName);
      // console.log(branchName)

      if (hasOpenPR) {
        console.log(`There is an open PR for the remote branch "${branchName}".`);
        return;
      } else {
        deleteRemoteBranch(branchName);
        total++;
      }
    }

  })

  // for (const branch of remoteBranches.branches) {
  //   console.log(`processing ${total} of ${branches.length}`)
  //   const lastCommitDate = new Date(
  //     execSync(
  //       `git --git-dir=${resolve(
  //         REPO_PATH,
  //         ".git"
  //       )} show --format="%cI" --no-patch ${branch.commit}`
  //     )
  //       .toString()
  //       .trim()
  //   );
  //   console.log(lastCommitDate)

  //   if (getDays(lastCommitDate) > DAYS_AGO) {
  //     const branchName = branch.branchRef.split("/").pop();
  //     console.log(
  //       `The remote branch "${branchName}" has been inactive for ${getDays(
  //         lastCommitDate
  //       )} days`
  //     );

  //   //   Check if there's an open PR for the branch
  //     const hasOpenPR = hasOpenPullRequest(REPO_PATH, branchName);

  //     if (hasOpenPR) {
  //       console.log(`There is an open PR for the remote branch "${branchName}".`);
  //       return;
  //     } else {
  //       deleteRemoteBranch(branchName);
  //       total++;
  //     }
  //   }
  // }

  console.log(`Total remote branches without activity or without an open PR: ${total}`);
}

function getDays(startDate) {
  const today = new Date();

  const differenceInMilliseconds = today - startDate;

  const differenceInDays = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24)
  );

  return differenceInDays;
}

function hasOpenPullRequest(branchName) {
  try {
    const prRef = `refs/pull/${branchName}/head`;
    const result = execSync(
      `git --git-dir=${resolve(
        REPO_PATH,
        ".git"
      )} ls-remote --exit-code origin ${prRef} && echo "exists" || echo "not found"`
    )
      .toString()
      .trim();

    return result === "exists";
  } catch (error) {
    console.error(`Error checking PR for remote branch "${branchName}":`, error.message);
    return false;
  }
}

async function deleteRemoteBranch(branchName) {
  try {
    // const git = simpleGit(REPO_PATH);
    // await git.push(['origin', '--delete', branchName])

    execSync(
      `git --git-dir=${resolve(
        REPO_PATH,
        ".git"
      )} push origin --delete ${branchName}`
    );
    console.log(`The remote branch "${branchName}" has been successfully deleted.`);
  } catch (error) {
    
  }
}

function getAllBranchs() {
  const git = simpleGit(REPO_PATH);
  return git.branch();
}

// listRemoteBranches()
checkStaleRemoteBranches();

// getAllBranchs()