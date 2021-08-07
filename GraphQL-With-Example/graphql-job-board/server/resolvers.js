const db = require("./db");

const Query = {
  job: (root, args) => db.jobs.get(args.id),
  company: (root, args) => db.companies.get(args.id),
  jobs: () => db.jobs.list(),
  companies: () => db.companies.list(),
};

const Mutation = {
  createJob: (root, { companyId, title, description }) => {
    const id = db.jobs.create({ companyId, title, description });
    return db.jobs.get(id);
  },
};

/**
 * Resolvers must reflect the schema.
 * in schema `company`  is a field of `Job` type, we need to declare
 * new resolver object of `job` type, where we can put functions to resolve the
 * fields of `Job` type.
 * The 1st param that this recieves is the parentObject (job) and
 * 2nd param is args.
 * in following example:
 * `company` matches the field in query
 */
const Job = {
  company: (job) => db.companies.get(job.companyId),
};

const Company = {
  jobs: (company) =>
    db.jobs.list().filter((job) => job.companyId === company.id),
};

module.exports = { Query, Mutation, Job, Company };
