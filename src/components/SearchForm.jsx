import React from "react";
import Form from "next/form";
import SearchFormReset from "./SearchFormReset";
import { Search } from "lucide-react";

const SearchForm = async ({ query }) => {

  return (
    <>
      <Form action="/" className="search-form">
        <input
          name="query"
          defaultValue={query}
          placeholder="Search Recipe"
          className="focus:outline-0"
        />
        <div className="flex gap-2">
          {query && <SearchFormReset />}
          <button type="submit">
            <Search className="size-5"></Search>
          </button>
        </div>
      </Form>
    </>
  );
};

export default SearchForm;
