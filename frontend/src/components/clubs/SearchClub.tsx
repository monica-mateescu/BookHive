import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

const SearchClub = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    const params = new URLSearchParams(searchParams);
    params.set("q", query.trim());

    navigate(`/clubs?${params.toString()}`);
  };

  return (
    <section className="flex items-center justify-center">
      <form onSubmit={handleSubmit} className="relative w-full max-w-md">
        <label htmlFor="search" className="sr-only">
          Search clubs by keyword
        </label>
        <input
          type="text"
          id="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find clubs by keyword"
          className="input input-bordered w-full"
          required
        />
        <button
          type="submit"
          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
        >
          <span className="sr-only">Search</span>
          <SearchIcon size={20} />
        </button>
      </form>
    </section>
  );
};

export default SearchClub;
