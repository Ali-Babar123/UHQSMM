import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Datepicker from "../components/Datepicker";
import axios from "axios";
import { toast } from "react-toastify";

const AddFunds = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [method, setMethod] = useState("Plisio Crypto Payments, BTC, ETH, LTC, TRX, USDT More. Bonus %5 from 99$");
  const [amount, setAmount] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/funds/addFund`,
        { method, amount},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Funds added successfully!");
      setAmount("");
    } catch (err) {
      console.error("Error adding funds:", err);
      toast.error(err.response?.data?.message || "Failed to add funds");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 border-gray-200 dark:bg-[var(--color-dark-gray)]">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow-0">
                  <div className="px-4 sm:px-6 lg:px-4 py-4 w-full max-w-9xl mx-auto">
                    <h1 className="text-gray-400 mb-1">Dashboard / Add Funds</h1>
                    <div className="mb-4 sm:mb-0 flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-14">
                      <h1 className="text-2xl md:text-4xl text-gray-800 dark:text-gray-100 font-extralight mb-4 sm:mb-0">
                        Add Funds
                      </h1>
                      <Datepicker align="left" />
                    </div>
                  </div>
                </main>

        <div className="flex flex-col md:flex-row gap-6 p-6 font-sans">
          <div className="dark:bg-[rgba(37,33,57,1)] h-[700px] border border-gray-300 dark:border-[#FFFFFF] p-6 w-full shadow-md">
            <h1 className="text-gray-600 py-2 dark:text-white font-medium text-2xl mb-6">Add Funds</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="method" className="block font-semibold mb-2 text-gray-900 dark:text-gray-400">
                Method
              </label>
              <select
                id="method"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full rounded-sm bg-white dark:bg-gray-900 px-4 py-3 mb-6 text-sm border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-600"
              >
                <option>
                  Plisio Crypto Payments, BTC, ETH, LTC, TRX, USDT More. Bonus %5 from 99$
                </option>
                <option>NowPayment.io</option>
                <option>Binance pay auto - Bonus 4% from 99$</option>
                <option>Payoneer auto - Mastercard visa to. Bonus 3% from 99$</option>
              </select>

              <label htmlFor="amount" className="block font-semibold mb-2 text-gray-900 dark:text-gray-400">
                Amount
              </label>
              <input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-lg dark:bg-gray-700 px-4 py-2 mb-6 text-gray-900 text-sm border dark:border-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-600"
              />

              <button
                type="submit"
                className="lg:w-md w-full py-2 border border-violet-600 text-violet-600 rounded-4xl dark:gradient-border hover:bg-violet-500 hover:text-white dark:hover:text-white dark:hover:bg-violet-700 cursor-pointer transition"
              >
                Initiate Payment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFunds;
