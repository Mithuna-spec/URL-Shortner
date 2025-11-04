import React, { useState } from "react";
import { createShortUrl } from "../api/shortUrl.api.js";

const UrlForm = () => {
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setShortUrl("");
        setCopied(false);

        // Basic URL validation
        if (!url.trim()) {
            setError("Please enter a URL");
            return;
        }

        // Add protocol if missing
        let formattedUrl = url.trim();
        if (!/^https?:\/\//i.test(formattedUrl)) {
            formattedUrl = "https://" + formattedUrl;
        }

        setLoading(true);
        try {
            const data = await createShortUrl(formattedUrl);
            setShortUrl(data.shortUrl || data);
        } catch (err) {
            setError(err.response?.data?.error || err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

//     //Below code is used to fetch data
//     const query = useQuery({ queryKey: ['todos'], queryFn: getTodos })
//     //Below code is used to post data and save data
//     const mutation = useMutation({
//     mutationFn: postTodo,
//     onSuccess: () => {
//       // Invalidate and refetch
//       queryClient.invalidateQueries({ queryKey: ['todos'] })
//     },
//   })

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shortUrl);
        setCopied(true);

        // Reset the copied state after 2 seconds
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter your URL here"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-4 py-2 text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-md hover:from-purple-600 hover:to-pink-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    {loading ? "Shortening..." : "Shorten URL"}
                </button>
            </form>

            {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}

            {shortUrl && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-600">Shortened URL:</p>
                    <div className="flex items-center mt-2">
                        <input
                            type="text"
                            readOnly
                            value={shortUrl}
                            className="flex-1 px-3 py-2 border rounded-l-md focus:outline-none"
                        />
                        <button
                            onClick={copyToClipboard}
                            className={`px-4 py-2 text-white rounded-r-md focus:outline-none transition-all duration-300 ${
                                copied
                                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600'
                                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                            }`}
                        >
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UrlForm;
