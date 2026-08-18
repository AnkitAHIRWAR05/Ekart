import { CardContent, CardHeader, CardTitle, Card } from "@/components/ui/card";
import axios from "axios";
import { AreaChart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Area, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const AdminSales = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalSales: 0,
    salesByData: [],
  });

  const fetchStats = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/orders/sales`,
        {
          headers: {
            Authorization: `bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        setStats(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);
  return (
    <div className="pl-[350px] bg-gray-100 py-20 pr-20 mx-auto px-4">
      <div className="p-6 grid gap-6 lg:grid-cols-4">
        {/* stats cad */}
        <Card className="bg-pink-500 text-white shadow">
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {stats.totalUsers}
          </CardContent>
        </Card>
        <Card className="bg-pink-500 text-white shadow">
          <CardHeader>
            <CardTitle>Total products</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {stats.totalProducts}
          </CardContent>
        </Card>
        <Card className="bg-pink-500 text-white shadow">
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {stats.totalOrders}
          </CardContent>
        </Card>
        <Card className="bg-pink-500 text-white shadow">
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {stats.totalSales}
          </CardContent>
        </Card>

        {/* sales chart */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Sales (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.sales}>
                <XAxis dataKey="data" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#F47286"
                  fill="#F47286"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSales;
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import axios from "axios";
// import React, { useEffect, useState } from "react";

// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// const AdminSales = () => {
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalProducts: 0,
//     totalOrders: 0,
//     totalSales: 0,
//     sales: [],
//   });

//   const [loading, setLoading] = useState(true);

//   const fetchStats = async () => {
//     try {
//       setLoading(true);

//       const accessToken = localStorage.getItem("accessToken");

//       const res = await axios.get(
//         `${import.meta.env.VITE_URL}/api/v1/orders/sales`,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       console.log("Sales API Response:", res.data);

//       if (res.data.success) {
//         setStats({
//           totalUsers: res.data.totalUsers || 0,
//           totalProducts: res.data.totalProducts || 0,
//           totalOrders: res.data.totalOrders || 0,
//           totalSales: res.data.totalSales || 0,

//           // backend se sales aa raha hai
//           sales: Array.isArray(res.data.sales)
//             ? res.data.sales
//             : Array.isArray(res.data.salesByData)
//               ? res.data.salesByData
//               : [],
//         });
//       }
//     } catch (error) {
//       console.error(
//         "Error fetching sales:",
//         error.response?.data || error.message
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 py-20 px-6 lg:pl-[350px] lg:pr-10">
//       <div className="max-w-7xl mx-auto p-6">

//         {/* ================= STATS ================= */}

//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

//           <Card className="bg-pink-500 text-white shadow">
//             <CardHeader>
//               <CardTitle>Total Users</CardTitle>
//             </CardHeader>

//             <CardContent className="text-3xl font-bold">
//               {stats.totalUsers}
//             </CardContent>
//           </Card>

//           <Card className="bg-pink-500 text-white shadow">
//             <CardHeader>
//               <CardTitle>Total Products</CardTitle>
//             </CardHeader>

//             <CardContent className="text-3xl font-bold">
//               {stats.totalProducts}
//             </CardContent>
//           </Card>

//           <Card className="bg-pink-500 text-white shadow">
//             <CardHeader>
//               <CardTitle>Total Orders</CardTitle>
//             </CardHeader>

//             <CardContent className="text-3xl font-bold">
//               {stats.totalOrders}
//             </CardContent>
//           </Card>

//           <Card className="bg-pink-500 text-white shadow">
//             <CardHeader>
//               <CardTitle>Total Sales</CardTitle>
//             </CardHeader>

//             <CardContent className="text-3xl font-bold">
//               ₹{Number(stats.totalSales).toLocaleString("en-IN")}
//             </CardContent>
//           </Card>
//         </div>

//         {/* ================= SALES CHART ================= */}

//         <Card className="mt-8">
//           <CardHeader>
//             <CardTitle>Sales - Last 30 Days</CardTitle>
//           </CardHeader>

//           <CardContent>

//             {loading ? (
//               <div className="h-[350px] flex items-center justify-center">
//                 <p className="text-gray-500">
//                   Loading sales data...
//                 </p>
//               </div>
//             ) : stats.sales.length === 0 ? (
//               <div className="h-[350px] flex items-center justify-center">
//                 <p className="text-gray-500">
//                   No sales data available
//                 </p>
//               </div>
//             ) : (
//               <div className="w-full h-[350px]">

//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart
//                     data={stats.sales}
//                     margin={{
//                       top: 10,
//                       right: 30,
//                       left: 10,
//                       bottom: 10,
//                     }}
//                   >

//                     <CartesianGrid strokeDasharray="3 3" />

//                     <XAxis
//                       dataKey="date"
//                       tick={{ fontSize: 12 }}
//                     />

//                     <YAxis
//                       tick={{ fontSize: 12 }}
//                     />

//                     <Tooltip
//                       formatter={(value) => [
//                         `₹${Number(value).toLocaleString("en-IN")}`,
//                         "Sales",
//                       ]}
//                     />

//                     <Area
//                       type="monotone"
//                       dataKey="amount"
//                       stroke="#F47286"
//                       fill="#F47286"
//                       fillOpacity={0.3}
//                       strokeWidth={2}
//                     />

//                   </AreaChart>
//                 </ResponsiveContainer>

//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default AdminSales;
