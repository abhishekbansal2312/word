import { useState } from "react";
import { toast } from "react-hot-toast";

const Word = () => {
  const [text, setText] = useState("");
  const [frequency, setFrequency] = useState([]);
  const [toReplace, setToReplace] = useState("");
  const [replaced, setReplaced] = useState("");
  const [palindrome, setPalindrome] = useState(false);

  const handleLowerCase = () => {
    if (!text.trim()) {
      toast.error("Text area is empty. Please enter some text.");
      return;
    }
    setText(text.toLowerCase());
  };

  const handleUpperCase = () => {
    if (!text.trim()) {
      toast.error("Text area is empty. Please enter some text.");
      return;
    }
    setText(text.toUpperCase());
  };

  const handleReverse = () => {
    if (!text.trim()) {
      toast.error("Text area is empty. Please enter some text.");
      return;
    }
    setText(text.split(" ").reverse().join(" "));
  };

  const handleFirstUpper = () => {
    if (!text.trim()) {
      toast.error("Text area is empty. Please enter some text.");
      return;
    }
    setText(
      text
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    );
  };

  const handleCharFrequency = () => {
    if (!text.trim()) {
      toast.error("Text area is empty. Please enter some text.");
      return;
    }
    const charMap = {};
    const freqArray = [];

    text.split("").forEach((char) => {
      if (char.trim()) {
        charMap[char] = (charMap[char] || 0) + 1;
      }
    });

    for (const char in charMap) {
      freqArray.push({ character: char, count: charMap[char] });
    }

    setFrequency(freqArray);
  };

  const handleReplace = (e) => {
    e.preventDefault();

    if (!text.trim()) {
      toast.error("Text area is empty. Please enter some text.");
      return;
    }

    if (!toReplace.trim()) {
      toast.error("Please specify the word to replace.");
      return;
    }

    if (!replaced.trim()) {
      toast.error("Please specify the replacement word.");
      return;
    }

    if (!text.includes(toReplace)) {
      toast.error(`"${toReplace}" not found in the text.`);
      return;
    }

    const updatedText = text.split(toReplace).join(replaced);
    setText(updatedText);
    toast.success("Text replaced successfully.");
  };

  const checkPalindrome = () => {
    if (!text.trim()) {
      toast.error("Text area is empty. Please enter some text.");
      setPalindrome(false);
      return;
    }
    const reversedText = text.split("").reverse().join("");
    if (reversedText === text) {
      setPalindrome(true);
      toast.success("The text is a palindrome.");
    } else {
      setPalindrome(false);
      toast.error("The text is not a palindrome.");
    }
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
        Text Manipulation Tool
      </h1>
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <textarea
          rows={6}
          className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        <div className="flex flex-wrap gap-4 justify-center mt-6">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            onClick={handleUpperCase}
          >
            Upper Case
          </button>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
            onClick={handleLowerCase}
          >
            Lower Case
          </button>
          <button
            className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition"
            onClick={handleFirstUpper}
          >
            Capitalize Words
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
            onClick={() => {
              setText("");
              setFrequency([]);
              setPalindrome(false);
              toast.success("Text cleared successfully.");
            }}
          >
            Clear
          </button>
          <button
            className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition"
            onClick={handleReverse}
          >
            Reverse Words
          </button>
          <button
            className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition"
            onClick={handleCharFrequency}
          >
            Character Frequency
          </button>
          <button
            className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition"
            onClick={checkPalindrome}
          >
            Palindrome Check
          </button>
        </div>

        <form
          className="flex flex-wrap gap-2 justify-center mt-6"
          onSubmit={handleReplace}
        >
          <input
            type="text"
            placeholder="Word to replace"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={toReplace}
            onChange={(e) => setToReplace(e.target.value)}
          />
          <input
            type="text"
            placeholder="Replacement word"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={replaced}
            onChange={(e) => setReplaced(e.target.value)}
          />
          <button
            type="submit"
            className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 transition"
          >
            Replace
          </button>
        </form>

        <div className="text-center text-gray-700 flex gap-8 justify-center mt-4">
          <p>
            <strong>Characters:</strong> {text.length}
          </p>
          <p>
            <strong>Words:</strong> {wordCount}
          </p>
          {palindrome ? (
            <p>
              <strong>Palindrome:</strong> Yes
            </p>
          ) : (
            <p>
              <strong>Palindrome:</strong> No
            </p>
          )}
        </div>
      </div>

      {frequency.length > 0 && (
        <div className="max-w-xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4 text-center text-blue-600">
            Character Frequency
          </h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2 text-left">
                  Character
                </th>
                <th className="border border-gray-300 p-2 text-left">
                  Frequency
                </th>
              </tr>
            </thead>
            <tbody>
              {frequency.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2 text-center">
                    {item.character}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {item.count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Word;
