const fs = require("node:fs");

const db = JSON.parse(fs.readFileSync("db.json", "utf8"));

const jobs = db.jobs;

if (!Array.isArray(jobs) || jobs.length !== 35) {
  throw new Error(
    `Expected 35 jobs, found ${jobs?.length ?? "none"}. Check db.json.`,
  );
}

function sqlValue(value) {
  if (value === null || value === undefined) {
    return "NULL";
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? String(value) : "NULL";
  }

  return `'${String(value).replace(/'/g, "''")}'`;
}

const statements = ["PRAGMA foreign_keys = ON;", "BEGIN TRANSACTION;"];

for (const job of jobs) {
  statements.push(`
INSERT INTO jobs (
  id, company, jobTitle, location, category,
  salary_min, salary_max, salary_currency,
  jobType, description, jobUrl, postedDate
) VALUES (
  ${sqlValue(job.id)},
  ${sqlValue(job.company)},
  ${sqlValue(job.jobTitle)},
  ${sqlValue(job.location)},
  ${sqlValue(job.category)},
  ${sqlValue(job.salary?.min)},
  ${sqlValue(job.salary?.max)},
  ${sqlValue(job.salary?.currency)},
  ${sqlValue(job.jobType)},
  ${sqlValue(job.description)},
  ${sqlValue(job.jobUrl)},
  ${sqlValue(job.postedDate)}
);`);
}

statements.push("COMMIT;");

fs.writeFileSync("seed-jobs.sql", statements.join("\n"), "utf8");

console.log(`Created seed-jobs.sql with ${jobs.length} jobs.`);
