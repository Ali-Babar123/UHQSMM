const FundsaddHistory = require('../models/Funds');

// Route to add a fund
const addFund = async (req, res) => {
  try {
    const { method, amount } = req.body;
    const user = req.user._id; // ✅ Get user from token

    const newFunds = new FundsaddHistory({
      user, // ✅ Use authenticated user's ID
      method,
      amount,
    });

    const savedFunds = await newFunds.save();
    res.status(201).json(savedFunds);
  } catch (error) {
    console.error('Error adding the funds:', error);
    res.status(400).json({ message: "Error adding the Funds" });
  }
};


// Route to update a fund
const updateFund = async (req, res) => {
    try {
        const { method, amount} = req.body;

        // Find the fund by ID and update
        const updatedFund = await FundsaddHistory.findByIdAndUpdate(
            req.params.id,
            { method, amount },
            { new: true }
        );

        if (!updatedFund) {
            return res.status(404).json({ message: "Fund not found" });
        }

        res.status(200).json(updatedFund);  // 200 OK status for successful updates
    } catch (error) {
        console.error('Error updating the fund:', error);  // Log the error for debugging
        res.status(400).json({ message: "Error updating the Funds" });
    }
};

// Route for deleting a fund
const deleteFund = async (req, res) => {
    try {
        const deletedFund = await FundsaddHistory.findByIdAndDelete(req.params.id);

        if (!deletedFund) {
            return res.status(404).json({ message: "Fund not found" });
        }

        res.status(200).json({ message: 'Fund deleted successfully' });  // 200 OK for successful deletion
    } catch (error) {
        console.error('Error deleting the fund:', error);  // Log the error for debugging
        res.status(400).json({ message: "Error deleting the Fund" });
    }
};

// Route for a single fund
const fund = async (req, res) => {
    try {
        const fund = await FundsaddHistory.findById(req.params.id).populate('user');  // Populate user details
        if (!fund) {
            return res.status(404).json({ message: "Fund not found" });
        }

        res.status(200).json(fund);  // Return the fund data
    } catch (error) {
        console.error('Error fetching single fund:', error);  // Log the error for debugging
        res.status(400).json({ message: "Error fetching single Fund" });
    }
};

// Route for displaying all funds
// Route for displaying all funds for a specific user
const getAllFunds = async (req, res) => {
  try {
    let funds;

    if (req.user.isAdmin) {
      // ✅ Admin can see all funds
      funds = await FundsaddHistory.find().populate('user');
    } else {
      // ✅ Normal user sees only their funds
      funds = await FundsaddHistory.find({ user: req.user._id }).populate('user', 'name');
    }

    res.status(200).json(funds);
  } catch (error) {
    console.error('Error fetching funds:', error);
    res.status(400).json({ message: "Error fetching the Funds" });
  }
};



module.exports = { addFund, updateFund, deleteFund, fund,  getAllFunds };
