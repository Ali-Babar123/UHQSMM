import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import '../AdminPages/charts/ChartjsConfig';
import '../AdminPages/css/style.css';
import ThemeContext from '../AdminPages/utils/ThemeContext';

import Dashboard from '../AdminPages/pages/Dashboard';
import AddTicket from '../AdminPages/pages/AddTicket';
import ServiceandCategories from '../AdminPages/pages/ServicesandCateogries';
import Providers from '../AdminPages/pages/Providers';
import Subscriptions from '../AdminPages/pages/Subscriptions';
import ManageUsers from '../AdminPages/pages/ManageUsers';
import TicketSupport from '../AdminPages/pages/AffilieatesSystem';
import ChildPanel from '../AdminPages/pages/ChildPanel';
import BroadCastMessages from '../AdminPages/pages/BroadCastMessages';
import ReportsAndLogs from '../AdminPages/pages/ReportsAndLogs';
import RefundRequest from '../AdminPages/pages/RefundRequest';
import ManageOrders from '../AdminPages/pages/ManageOrders';
import UserViewDetail from '../AdminPages/pages/ViewUserDetail';
import ViewOrderDetail from './pages/ViewOrderDetail';
import Payment from '../AdminPages/pages/Payment';
import RefillRequest from '../AdminPages/pages/RefillRequest';
import SystemErrors from '../AdminPages/pages/SystemErrors';
import OrderReports from '../AdminPages/pages/OrderReports';
import SecurityLogs from '../AdminPages/pages/SecurityLogs';
import ViewTicketSupport from '../AdminPages/pages/ViewTicketSupport';
import ViewRefillRequest from '../AdminPages/pages/ViewRefillRequest';
import Login from '../AdminPages/pages/Login';

const AdminRoutes = () => {
  const location = useLocation();
  const [token, setToken] = useState(localStorage.getItem('adminAuthToken') || '');


  console.log("TOKEN FOUND:", token);
console.log("LOCATION PATH:", location.pathname);

  useEffect(() => {
    localStorage.setItem('adminAuthToken', token);
  }, [token]);

  const isLoginPage = location.pathname === '/admin/login';

  if (!token && !isLoginPage) {
    return <Navigate to="/admin/login" replace />;
  }

  if (token && isLoginPage) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <ThemeContext>
      <Routes>
        <Route path="/admin/login" element={<Login setToken={setToken} />} />
        <Route path="/admin/dashboard" element={<Dashboard setToken={setToken} />} />
        <Route path="/admin/manage-users" element={<ManageUsers />} />
        <Route path="/admin/user-detail/:id" element={<UserViewDetail />} />
        <Route path="/admin/orders-management" element={<ManageOrders />} />
        <Route path="/admin/order-detail/:id" element={<ViewOrderDetail />} />
        <Route path="/admin/manual-payments" element={<Payment />} />
        <Route path="/admin/refill-request" element={<RefillRequest />} />
        <Route path="/admin/ticket-support" element={<AddTicket />} />
        <Route path="/admin/view-ticket-support" element={<ViewTicketSupport />} />
        <Route path="/admin/view-refill-request" element={<ViewRefillRequest />} />
        <Route path="/admin/services-categories" element={<ServiceandCategories />} />
        <Route path="/admin/providers" element={<Providers />} />
        <Route path="/admin/subscriptions" element={<Subscriptions />} />
        <Route path="/admin/affiliates" element={<TicketSupport />} />
        <Route path="/admin/child-panel" element={<ChildPanel />} />
        <Route path="/admin/refund-request" element={<RefundRequest />} />
        <Route path="/admin/broadcast-messages" element={<BroadCastMessages />} />
        <Route path="/admin/report-logs" element={<ReportsAndLogs />} />
        <Route path="/admin/system-errors" element={<SystemErrors />} />
        <Route path="/admin/order-reports" element={<OrderReports />} />
        <Route path="/admin/security-logs" element={<SecurityLogs />} />
      </Routes>
    </ThemeContext>
  );
};

export default AdminRoutes;
