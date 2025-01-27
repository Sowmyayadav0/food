const { Parser } = require("json2csv");
const express = require("express");

const Donation = require("../models/Donation");
const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    // Fetch statistics
    const totalDonations = await Donation.aggregate([
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
    ]);
    const uniqueDonors = await Donation.distinct("email");
    const totalDonors = uniqueDonors.length;

    const childrenFed = Math.floor(totalDonations[0]?.totalAmount / 50) || 0; // Assume ₹50 feeds one child

    // Fetch all donation records
    const donationRecords = await Donation.find().sort({ date: -1 });

    // Render admin page with data
    res.render("admin", {
      totalDonations: totalDonations[0]?.totalAmount || 0,
      totalDonors,
      childrenFed,
      donationRecords,
    });
  } catch (error) {
    console.error("Error fetching donation data:", error);
    res.status(500).send("An error occurred while fetching donation data.");
  }
});

router.post("/delete/:id", async (req, res) => {
  try {
    const donationId = req.params.id;
    await Donation.findByIdAndDelete(donationId);
    res.redirect("/admin");
  } catch (error) {
    console.error("Error deleting donation:", error);
    res.status(500).send("An error occurred while deleting the donation.");
  }
});

router.get("/search", async (req, res) => {
  try {
    const { searchKey } = req.query;

    // Build query object
    const query = {};

    if (searchKey) {
      const searchRegex = new RegExp(searchKey, "i");

      // Search by donor name or email
      query.$or = [
        { donorName: { $regex: searchRegex } },
        { email: { $regex: searchRegex } },
      ];

      // Search by amount if the searchKey is a number
      const amount = parseFloat(searchKey);
      if (!isNaN(amount)) {
        query.$or.push({ amount: amount });
      }

      // Search by date (exact match)
      const parsedDate = new Date(searchKey);
      if (!isNaN(parsedDate)) {
        query.$or.push({
          date: {
            $gte: new Date(parsedDate.setHours(0, 0, 0, 0)),
            $lte: new Date(parsedDate.setHours(23, 59, 59, 999)),
          },
        });
      }
    }
    // Fetch statistics
    const totalDonations = await Donation.aggregate([
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
    ]);
    const uniqueDonors = await Donation.distinct("email");
    const totalDonors = uniqueDonors.length;

    const childrenFed = Math.floor(totalDonations[0]?.totalAmount / 50) || 0; // Assume ₹50 feeds one child

    // Perform the search
    const results = await Donation.find(query).sort({ date: -1 });

    console.log(results);

    res.render("admin", {
      totalDonations: totalDonations[0]?.totalAmount || 0,
      totalDonors,
      childrenFed,
      donationRecords: results,
    });
  } catch (error) {
    console.error("Error searching donations:", error);
    res.status(500).send("An error occurred while searching donations.");
  }
});

// Route to export donation data as CSV
router.get("/export-csv", async (_req, res) => {
  try {
    const donations = await Donation.find();

    // Define CSV fields
    const fields = ["donorName", "email", "amount", "message", "date"];
    const opts = { fields };

    // Convert JSON to CSV
    const parser = new Parser(opts);
    const csv = parser.parse(donations);

    // Set headers for file download
    res.header("Content-Type", "text/csv");
    res.attachment("donation_data.csv");
    res.send(csv);
  } catch (error) {
    console.error("Error exporting data:", error);
    res.status(500).send("An error occurred while exporting data.");
  }
});

module.exports = router;
