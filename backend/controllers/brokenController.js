const Scan = require("../models/Scan");
const checkBrokenLinks = require("../utils/brokenCrawler");

exports.runBrokenScan = async (req, res) => {
  const { website } = req.body;

  const result = await checkBrokenLinks(website);

  await Scan.create({
    user: req.user,
    website,
    type: "broken",
    results: result.brokenLinks,
  });

  res.json(result);
};
