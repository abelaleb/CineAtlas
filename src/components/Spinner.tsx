const Spinner = () => {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="relative w-14 h-14">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-6 bg-gray-500 left-1/2 top-1/3 opacity-25 rounded-lg shadow-sm animate-fade"
              style={{
                transform: `rotate(${i * 30}deg) translate(0, -130%)`,
                animationDelay: `-${1.1 - i * 0.1}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Spinner;
  