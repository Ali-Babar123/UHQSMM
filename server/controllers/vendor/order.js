const Order = require('../../models/Order');
const AdminService =  require('../../models/admin/AdminService')


const order = async (req, res) => {
  const { categoryId, serviceId, link, quantity, charge, status} = req.body;
  const userId = req.user.id;

  try {
    const serviceData = await AdminService.findById(serviceId);
    if (!serviceData) return res.status(400).json({ message: 'Invalid service selected' });

    // if (quantity < serviceData.min || quantity > serviceData.max) {
    //   return res.status(400).json({ message: `Quantity must be between ${serviceData.min} and ${serviceData.max}` });
    // }

   if (isNaN(charge)) {
      return res.status(400).json({ message: 'Charge must be a valid number.' });
    }

    const newOrder = new Order({
      user: userId,
      categoryId,
      serviceId,
      link,
      quantity,
      charge,
      status
    });

    await newOrder.save();

      // ✅ Increment soldCount for the service
    await AdminService.findByIdAndUpdate(serviceId, {
      $inc: { soldCount: quantity },
    });
    res.status(201).json({ message: 'Order placed', order: newOrder });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOrders = async (req, res)=>{
   try {
    const orders = await Order.find({ user: req.params.userId }).populate('user', 'name')
      .populate('serviceId') // to get service details like name
      .populate('categoryId'); // optional: category info

    res.status(200).json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch orders', error: err.message });
  }


}


const getAllOrders = async (req, res) => {
  try {
    let orders;

    if (req.user.isAdmin) {
      // Admin: all orders
      orders = await Order.find()
        .populate('user', 'name')
        .populate('serviceId', 'name');
    } else {
      // Vendor: only their orders
      orders = await Order.find({ user: req.user._id })
        .populate('user', 'name')
        .populate('serviceId', 'name');
    }

    res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error('Error fetching orders:', err.message);
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
};



const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status, link, quantity } = req.body;

  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Optional updates (adjust as needed)
    if (status) order.status = status;
    if (link) order.link = link;
    if (quantity) order.quantity = quantity;

    await order.save();

    

    res.status(200).json({ success: true, message: 'Order updated successfully', order });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update order', error: err.message });
  }
};


const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Order.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json({ success: true, message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete order', error: err.message });
  }
};

const getSingleOrder = async (req, res) =>{
  const { id } = req.params;

  try {
    const order = await Order.findById(id)
      .populate('user', 'name email') // fetch user name/email
      .populate('serviceId', 'name amount') // fetch service name, amount
      .populate('categoryId', 'name image'); // fetch category name/image

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch order', error: err.message });
  }
}
const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ success: true, message: 'Order status updated', order });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update status', error: err.message });
  }
};

module.exports = { order, getOrders, updateOrder, deleteOrder, getSingleOrder, getAllOrders, updateOrderStatus };
