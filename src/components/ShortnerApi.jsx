import React, { useState, useEffect } from "react";

const ShortnerApi = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]); // ✅ history of links

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("shortUrls")) || [];
    setHistory(savedHistory);
  }, []);

  const shortenUrl = async () => {
    if (!longUrl.startsWith("http")) {
      setError("Please enter a valid URL starting with http:// or https://");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = import.meta.env.VITE_TINYURL_TOKEN;

      const response = await fetch("https://api.tinyurl.com/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: longUrl,
          domain: "tiny.one",
        }),
      });

      const data = await response.json();

      if (data.data && data.data.tiny_url) {
        const newShortUrl = data.data.tiny_url;
        setShortUrl(newShortUrl);

        // ✅ update history
        const newEntry = { longUrl, shortUrl: newShortUrl };
        const updatedHistory = [newEntry, ...history];
        setHistory(updatedHistory);

        // Save to localStorage
        localStorage.setItem("shortUrls", JSON.stringify(updatedHistory));
      } else {
        setError("Failed to shorten URL");
      }
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8 max-w-2xl w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          🔗 TinyURL Link Shortener
        </h1>

        {/* Input + Shorten button */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            placeholder="Enter long URL"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="w-full sm:flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:text-white"
          />
          <button
            onClick={shortenUrl}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 disabled:opacity-60 transition"
          >
            {loading ? "Loading..." : "Shorten"}
          </button>
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-sm mt-4 font-medium">{error}</p>}

        {/* Latest shortened URL */}
        {shortUrl && (
          <div className="mt-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              Latest Shortened URL:
            </p>
            <div className="flex items-center justify-center mt-2 gap-3">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 underline font-semibold"
              >
                {shortUrl}
              </a>
              <button
                onClick={() => handleCopy(shortUrl)}
                className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition"
              >
                {copied ? "✅ Copied!" : "Copy"}
              </button>
            </div>
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                📜 History
              </h2>
              <button
                onClick={() => {
                  localStorage.removeItem("shortUrls");
                  setHistory([]);
                }}
                className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition"
              >
                Clear History
              </button>
            </div>

            <ul className="space-y-4">
              {history.map((item, index) => (
                <li
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-2xl p-4 hover:shadow-md transition-shadow duration-200 bg-white dark:bg-gray-900"
                >
                  {/* Long URL */}
                  <p className="text-gray-700 dark:text-gray-300 text-sm truncate text-left">
                    {item.longUrl}
                  </p>

                  {/* Short URL + Copy */}
                  <div className="flex justify-between items-center mt-2">
                    <a
                      href={item.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 underline font-medium text-sm truncate max-w-[calc(100%-60px)] text-left"
                    >
                      {item.shortUrl}
                    </a>
                    <button
                      onClick={() => handleCopy(item.shortUrl)}
                      className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition"
                    >
                      {copied ? "✅ Copied!" : "Copy"}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}


      </div>
    </div>
  );
};

export default ShortnerApi;
