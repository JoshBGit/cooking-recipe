"use client";
import Link from "next/link";
import React from "react";
import { X } from "lucide-react";

const SearchFormReset = () => {
  const reset = () => {
    const form = document.querySelector(".search-form");
    if (form) form.reset();
  };
  return (
    <div>
      <button type="reset" onClick={reset}>
        <Link href="/">
          <X className="size-7 pt-1"></X>
        </Link>
      </button>
    </div>
  );
};

export default SearchFormReset;