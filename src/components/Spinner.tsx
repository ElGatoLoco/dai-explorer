export const Spinner = () => {
  return (
    <div className="inline-block [translateZ(1px)]">
      <div className="inline-block w-16 h-16 md:w-24 md:h-24 lg:w-36 lg:h-36 xl:w-48 xl:h-48 m-2 rounded-full bg-white animate-lds-circle"></div>
    </div>
  );
};
