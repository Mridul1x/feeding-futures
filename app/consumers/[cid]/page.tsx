"use client";
import React from "react";
import { useRouter } from "next/router";
import ConsumerLayout from "./layout";
import useFetch from "@/hooks/useFetch"; // Import your useFetch hook
import Image from "next/image";

const ConsumerDetailsPage: React.FC = () => {
  const router = useRouter();
  const { cid } = router.query;

  // Fetch consumer data based on the 'cid' parameter
  const {
    data: consumerData,
    error,
    isLoading,
  } = useFetch(cid ? `/api/consumers/${cid}` : "");

  if (isLoading) {
    // Render a loading state while fetching data
    return (
      <ConsumerLayout>
        <main className="mt-16">Loading...</main>
      </ConsumerLayout>
    );
  }

  if (error) {
    // Handle and render error state
    return (
      <ConsumerLayout>
        <main className="mt-16">Error: {error.message}</main>
      </ConsumerLayout>
    );
  }

  if (!consumerData) {
    // Render a fallback state when data is not available
    return (
      <ConsumerLayout>
        <main className="mt-16">Consumer data not found.</main>
      </ConsumerLayout>
    );
  }

  // Render the consumer details on a card
  return (
    <ConsumerLayout>
      <main className="mt-16">
        <div className="card">
          <Image
            src={consumerData.image}
            alt={consumerData.name}
            width={500}
            height={500}
            priority
            className="h-60 w-full object-cover"
          />
          <h1>{consumerData.name}</h1>
          <p>Address: {consumerData.address}</p>
          <p>Total Consumptions: {consumerData.consumptions}</p>
          {/* Add other consumer details here */}
        </div>
      </main>
    </ConsumerLayout>
  );
};

export default ConsumerDetailsPage;
