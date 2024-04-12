const SkewedInfiniteScroll = ({ sBar, sClick }) => {
  const items = [
    { id: "1", text: "Full on Action Movies" },
    { id: "2", text: "Horror Movies" },
    { id: "3", text: "Indian Funny Movies" },
    { id: "4", text: "Cult Classics" },
    { id: "5", text: "Feel Good Movies" },
    { id: "6", text: "I'm Feeling Lucky" },
    { id: "7", text: "Oscar Winning Movies" },
    { id: "8", text: "Galaxy and Universe" },
    { id: "9", text: "Time Travel Movies" },
    { id: "10", text: "Under-Rated Movies" },
  ];
  const handleItemClick = (i) => {
    sBar.current.value = i.text;
    sClick();
  };
  return (
    <div className="flex items-center justify-center">
      <div
        className="relative w-full max-w-screen-lg overflow-hidden bg-black bg-opacity-25 sm:rounded-full"
        style={{ backdropFilter: "blur(4px)" }}
      >
        <div className="animate-skew-scroll mx-auto grid h-[250px] w-[300px] grid-cols-1 gap-5 sm:w-[600px] sm:grid-cols-2">
          {items.map((item) => (
            <div
              onClick={() => handleItemClick(item)}
              key={item.id}
              className="flex cursor-pointer items-center space-x-2 sm:rounded-full border border-gray-100 px-5 shadow-md transition-all hover:-translate-y-1 hover:translate-x-1 hover:scale-[1.025] hover:shadow-xl bg-black bg-opacity-20 sm:h-16 h-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 flex-none text-cyan-500"
              >
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <p className="text-gray-200">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkewedInfiniteScroll;
