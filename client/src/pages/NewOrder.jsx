import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Datepicker from '../components/Datepicker';
import { toast } from 'react-toastify';


function NewOrder() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [link, setLink] = useState('');
  const [quantity, setQuantity] = useState(100);
  const [charge, setCharge] = useState('')
  const [selectedService, setSelectedService] = useState('');
  const [allServices, setAllServices] = useState([])


  const dropdownRef = useRef();





  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const res = await axios.get('https://uhqsmm-backend-tan.vercel.app/api/admin/getAllCategories', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.success) {
          const formatted = res.data.categories.map((cat) => ({
            value: cat._id,
            label: cat.name,
            image: cat.image,
            description: cat.description,
          }));

          setCategories(formatted);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const fetchServices = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await axios.get('https://uhqsmm-backend-tan.vercel.app/api/admin/getAllServices', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setAllServices(res.data.services);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async () => {
    if (!selectedCategory || !selectedService || !link || !quantity || !charge) {
      toast.error('Please fill all fields.');
      return;
    }

    if (quantity < selectedService.min || quantity > selectedService.max) {
      toast.error(`Quantity must be between ${selectedService.min} and ${selectedService.max}`);
      return;
    }

    const orderBody = {
      categoryId: selectedCategory.value,
      serviceId: selectedService._id,
      link,
      quantity,
      charge: Number(charge),
    };

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post('https://uhqsmm-backend-tan.vercel.app/api/vendor/newOrder', orderBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.order) {
        toast.success('Order placed successfully!');
      } else {
        alert('Unexpected response, but order might be placed.');
      }
    } catch (error) {
      console.error('Order error:', error);
      toast.error(error.response?.data?.message || 'Failed to place order.');
    }
  };


  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow-0">
          <div className="px-4 sm:px-6 lg:px-4 py-4 w-full max-w-9xl mx-auto">
            <h1 className="text-gray-400 mb-1">Dashboard / New Order</h1>
            <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-14">
              <h1 className="text-2xl md:text-4xl text-gray-800 dark:text-gray-100 font-extralight">
                New Order
              </h1>
              <Datepicker align="left" />
            </div>
          </div>
        </main>

        <div className="m-4">
          <div className="flex flex-col bg-white dark:bg-[rgba(37,33,57,1)] p-4 space-y-4 border border-gray-200 dark:border-[#FFFFFF]">
            <h1 className="text-2xl dark:text-white">New Order</h1>

            {/* Category Dropdown Custom */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Category</label>
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full px-4 py-2 flex items-center justify-between border rounded-md bg-gray-50 border-gray-700 dark:bg-gray-900 text-black dark:text-gray-100"
                >
                  {selectedCategory ? (
                    <div className="flex items-center space-x-2">
                      <img src={selectedCategory.image} alt="" className="w-6 h-6 rounded-full" />
                      <span>{selectedCategory.label}</span>
                    </div>
                  ) : (
                    <span className="dark:text-gray-100 text-gray-900">Favourite Services</span>
                  )}
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full max-h-60 border dark:border-gray-600 border-gray-700 overflow-y-auto rounded-md bg-white dark:bg-gray-900 shadow-lg">
                    {categories.map((cat) => (
                      <div
                        key={cat.value}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setSelectedService('');
                          setDropdownOpen(false);
                        }}
                        className="flex items-center border border-gray-200 space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        <img src={cat.image} alt={cat.label} className="w-6 h-6 rounded-full" />
                        <span className="text-sm text-gray-800 dark:text-gray-200">{cat.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Service Dropdown */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Service</label>

              {selectedCategory &&
                allServices.some(
                  (service) =>
                    service.status === 'active' &&
                    service.categoryId._id === selectedCategory.value
                ) ? (
                <select
                  value={selectedService?._id || ''}
                  onChange={(e) => {
                    const selected = allServices.find(s => s._id === e.target.value);
                    setSelectedService(selected);

                    if (selected) {
                      // ✅ Save to localStorage on every selection
                      localStorage.setItem('selectedService', JSON.stringify(selected));

                      const price = ((selected.amount * quantity) / 1000) * 0.99;
                      setCharge(price.toFixed(2));
                    }
                  }}

                  className="w-full rounded-md border border-gray-700 px-4 py-2 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-100"
                >
                  {allServices
                    .filter(service =>
                      service.status === 'active' &&
                      service.categoryId._id === selectedCategory?.value
                    )
                    .map(service => (
                      <option key={service._id} value={service._id}>
                        {service.name}
                      </option>
                    ))}
                </select>

              ) : (
                <div className="w-full rounded-md border border-gray-100 px-4 py-2 bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-100">
                  Service not found in this category
                </div>
              )}
            </div>




            {/* Category Description Box */}
            {selectedCategory?.description && (
              <>
                <label className="text-gray-700  dark:text-gray-300 font-semibold mb-1">Description</label>
                <div className="p-3 mt-2 border border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-sm whitespace-pre-line">
                  {selectedCategory.description}
                </div>
              </>
            )}


            {/* Link Input */}
            <div>
              <label className="block text-gray-700  dark:text-gray-300 font-semibold mb-1">Link</label>
              <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Enter order link"
                className="w-full px-4 py-2 rounded-md border  bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
              style={{border: "1px solid black", color: 'gray'}}
              />
            </div>

            {/* Quantity Input */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Quantity</label>
              <input
                type="number"
                min={10}
                max={1000000}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-md border bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
              style={{border: "1px solid black", color: 'gray'}}
              />
            </div>

            {selectedService && (
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
                Min: {selectedService.min} - Max: {selectedService.max}
              </label>
            )}

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Charge ( Your your rank based discount has been applied - 1% )</label>
              <input
                type="number"
                min={10}
                max={1000000}
                value={charge}
                onChange={(e) => setCharge(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-md border bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
              style={{border: "1px solid black", color: 'gray'}}
              />
            </div>

            <button
              onClick={handleSubmit}
              className="mt-4 py-2 max-w-md cursor-pointer px-6 border border-violet-600 rounded-4xl bg-violet-600 text-white transition"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewOrder;
