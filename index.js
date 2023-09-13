const { execSync } = require("child_process");
const { resolve } = require("path");

const repoPath = "../api";

function listRemoteBranches(repoPath) {
  try {
    const branches = execSync(
      `git --git-dir=${resolve(repoPath, ".git")} ls-remote --heads origin`
    )
      .toString()
      .split("\n")
      .map((line) => line.trim().split("\t"))
      .map(([commitHash, branchRef]) => ({ commitHash, branchRef }));

    return branches;
  } catch (error) {
    console.error("Error listing remote branches:", error.message);
    return [];
  }
}

function checkStaleRemoteBranches(branches) {
    console.log('processing branches, total:', branches)
  let total = 0;

  for (const branch of branches) {
    const lastCommitDate = new Date(
      execSync(
        `git --git-dir=${resolve(
          repoPath,
          ".git"
        )} show --format="%cI" --no-patch ${branch.commitHash}`
      )
        .toString()
        .trim()
    );

    if (getDays(lastCommitDate) > 90) {
      const branchName = branch.branchRef.split("/").pop();
      console.log(
        `The remote branch "${branchName}" has been inactive for ${getDays(
          lastCommitDate
        )} days`
      );

    //   Check if there's an open PR for the branch
      const hasOpenPR = hasOpenPullRequest(repoPath, branchName);

      if (hasOpenPR) {
        console.log(`There is an open PR for the remote branch "${branchName}".`);
        return;
      } else {
        console.log(`There is no open PR for the remote branch "${branchName}".`);
        // deleteRemoteBranch(branchName);
        total++;
      }
    }
  }

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

function hasOpenPullRequest(repoPath, branchName) {
  try {
    const prRef = `refs/pull/${branchName}/head`;
    const result = execSync(
      `git --git-dir=${resolve(
        repoPath,
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

function deleteRemoteBranch(branchName) {
  try {
    execSync(
      `git --git-dir=${resolve(
        repoPath,
        ".git"
      )} push origin --delete ${branchName}`
    );
    console.log(`The remote branch "${branchName}" has been successfully deleted.`);
  } catch (error) {
    console.error(
      `Error deleting the remote branch "${branchName}":`,
      error.message
    );
  }
}

const remoteBranches = listRemoteBranches(repoPath);

checkStaleRemoteBranches(remoteBranches);
