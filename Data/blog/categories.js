// The blog's category taxonomy. Order here is the order used in the nav,
// on the homepage rail and on category pages.
const categories = [
  {
    slug: "data-science",
    accent: "#4f419a",
    name: "Data Science",
    description:
      "Course comparisons, institute round-ups and career guidance for people moving into data science.",
  },
  {
    slug: "artificial-intelligence",
    accent: "#b5468a",
    name: "Artificial Intelligence",
    description:
      "Programmes, tooling and career paths across machine learning, deep learning and generative AI.",
  },
  {
    slug: "dsa",
    accent: "#2f7d6b",
    name: "DSA",
    description:
      "Data structures, algorithms and system design — what the best courses cover and how they compare.",
  },
  {
    slug: "cloud",
    accent: "#2b6cb0",
    name: "Cloud",
    description:
      "Cloud platforms, certifications and the training that actually maps to the job market.",
  },
  {
    slug: "fde",
    accent: "#c2681a",
    name: "FDE",
    description:
      "Full-stack development engineering \u2014 bootcamps and degree routes compared on stack coverage, projects and hiring outcomes.",
  },
  {
    slug: "sde",
    accent: "#b3452f",
    name: "SDE",
    description:
      "Software development engineering programmes, interview preparation and the courses that actually land offers.",
  },
]

export default categories

export const categoryBySlug = (slug) =>
  categories.find((category) => category.slug === slug)
