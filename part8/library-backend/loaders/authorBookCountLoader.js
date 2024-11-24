const DataLoader = require("dataloader");
const Book = require("../models/book");

const authorBookCountLoader = new DataLoader(async (authorIds) => {
  // Fetch book counts for all authors
  const counts = await Book.aggregate([
    { $match: { author: { $in: authorIds } } },
    { $group: { _id: "$author", count: { $sum: 1 } } },
  ]);

  // Map count to author IDs
  const countMap = {};
  counts.forEach((item) => {
    countMap[item._id.toString()] = item.count;
  });

  // return counts in the order of authorIds
  return authorIds.map((id) => countMap[id.toString()] || 0);
});

module.exports = authorBookCountLoader;
