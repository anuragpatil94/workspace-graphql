const db = require("./db");

const Query = {
  jobs: () => db.jobs.list(),
  companies: () => db.companies.list(),
};

/**
 * Resolvers must reflect the schema.
 * in schema `company`  is a field of `Job` type, we need to declare
 * new resolver object of `job` type, where we can put functions to resolve the
 * fields of `Job` type.
 * The 1st param that this recieves is the parentObject (job)
 */
const Job = {
  company: (job) => db.companies.get(job.companyId),
};

const Company = {
  jobs: (company) =>
    db.jobs.list().filter((job) => job.companyId === company.id),
};

module.exports = { Query, Job, Company };
