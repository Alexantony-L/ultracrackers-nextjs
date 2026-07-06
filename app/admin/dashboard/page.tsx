import { prisma } from "@/lib/prisma";
import Link from "next/link";
import RecentItemsTabs from "@/components/admin/RecentItemsTabs";
import {
  Package,
  CheckCircle2,
  XCircle,
  Folder,
  ShoppingBag,
  Clock,
  Truck,
  Plus,
  ExternalLink,
  LayoutDashboard
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const totalProducts = await prisma.product.count();
  const totalCategories = await prisma.category.count();

  const activeProducts = await prisma.product.count({
    where: {
      active: true,
    },
  });

  const inactiveProducts = await prisma.product.count({
    where: {
      active: false,
    },
  });

  // Calculate start of today in local time
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const ordersToday = await prisma.order.count({
    where: {
      createdAt: {
        gte: todayStart,
      },
    },
  });

  const pendingOrders = await prisma.order.count({
    where: {
      status: {
        equals: "pending",
        mode: "insensitive"
      }
    }
  });

  const dispatchedOrders = await prisma.order.count({
    where: {
      status: {
        equals: "dispatch",
        mode: "insensitive"
      }
    }
  });

  const recentProducts = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  const recentCategories = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <LayoutDashboard className="h-7 w-7" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">
            Welcome to Ultra Crackers Admin Portal
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Total Products */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition duration-200">
          <div className="absolute -right-4 -top-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <Package className="h-6 w-6 translate-x-[-4px] translate-y-[4px]" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Total Products
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-800">
            {totalProducts}
          </h2>
        </div>

        {/* Active Products */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition duration-200">
          <div className="absolute -right-4 -top-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="h-6 w-6 translate-x-[-4px] translate-y-[4px]" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Active Products
          </p>
          <h2 className="mt-2 text-3xl font-bold text-emerald-600">
            {activeProducts}
          </h2>
        </div>

        {/* Inactive Products */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition duration-200">
          <div className="absolute -right-4 -top-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-rose-600">
            <XCircle className="h-6 w-6 translate-x-[-4px] translate-y-[4px]" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Inactive Products
          </p>
          <h2 className="mt-2 text-3xl font-bold text-rose-600">
            {inactiveProducts}
          </h2>
        </div>

        {/* Total Categories */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition duration-200">
          <div className="absolute -right-4 -top-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
            <Folder className="h-6 w-6 translate-x-[-4px] translate-y-[4px]" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Total Categories
          </p>
          <h2 className="mt-2 text-3xl font-bold text-indigo-600">
            {totalCategories}
          </h2>
        </div>

        {/* Orders Today */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition duration-200">
          <div className="absolute -right-4 -top-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-50 text-cyan-600">
            <ShoppingBag className="h-6 w-6 translate-x-[-4px] translate-y-[4px]" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Orders Today
          </p>
          <h2 className="mt-2 text-3xl font-bold text-cyan-600">
            {ordersToday}
          </h2>
        </div>

        {/* Pending Orders */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition duration-200">
          <div className="absolute -right-4 -top-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-600">
            <Clock className="h-6 w-6 translate-x-[-4px] translate-y-[4px]" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Pending Orders
          </p>
          <h2 className="mt-2 text-3xl font-bold text-amber-600">
            {pendingOrders}
          </h2>
        </div>

        {/* Dispatched Orders */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition duration-200">
          <div className="absolute -right-4 -top-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-teal-600">
            <Truck className="h-6 w-6 translate-x-[-4px] translate-y-[4px]" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Dispatched Orders
          </p>
          <h2 className="mt-2 text-3xl font-bold text-teal-600">
            {dispatchedOrders}
          </h2>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-slate-900">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/admin/products/add"
            className="
              flex items-center gap-2
              rounded-xl bg-blue-600
              px-5 py-3 font-semibold text-white
              shadow-lg shadow-blue-500/20
              transition-all duration-150
              hover:bg-blue-700 hover:-translate-y-0.5
            "
          >
            <Plus className="h-4 w-4" />
            Add Product
          </Link>

          <Link
            href="/admin/category/add"
            className="
              flex items-center gap-2
              rounded-xl bg-blue-600
              px-5 py-3 font-semibold text-white
              shadow-lg shadow-blue-500/20
              transition-all duration-150
              hover:bg-blue-700 hover:-translate-y-0.5
            "
          >
            <Plus className="h-4 w-4" />
            Add Category
          </Link>

          <a href="/"
            target="_blank"
            className="
              flex items-center gap-2
              rounded-xl bg-slate-800
              px-5 py-3 font-semibold text-white
              transition-colors duration-150
              hover:bg-slate-700
            "
          >
            <ExternalLink className="h-4 w-4" />
            Open Website
          </a>
        </div>
      </div>

      <RecentItemsTabs products={recentProducts} categories={recentCategories} />
    </div>
  );
}