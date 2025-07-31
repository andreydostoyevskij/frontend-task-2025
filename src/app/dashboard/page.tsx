"use client";
import { useCurrencyData } from "../hooks/useCurrencyData";
import { useEffect, useState, useRef, useCallback } from "react";
import CurrencyCard from "../components/CurrencyCard";
import { useAuthStore } from "./../components/store/auth";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const {
    currencies,
    setSearch,
    setSortBy,
    loading,
    loadMore,
    hasMore,
    isFiltered,
  } = useCurrencyData();
  const { email, role, logout } = useAuthStore();
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");

  const observerRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading && !isFiltered) {
        loadMore();
      }
    },
    [hasMore, loading, loadMore]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [handleObserver]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput);
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {role}!</h1>
      <p>Your email: {email}</p>
      <button
        onClick={() => {
          logout();
          router.push("/login");
        }}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>

      <div className="p-4 space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by name, code, symbol or balance"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="p-2 border rounded w-full"
          />
          <select
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="balance">Balance</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currencies.map((currency) => (
            <CurrencyCard key={currency.id} currency={currency} />
          ))}
        </div>

        <div ref={observerRef} className="h-10">
          {loading && (
            <p className="text-center text-gray-500">Loading more...</p>
          )}
        </div>
      </div>
    </div>
  );
}
