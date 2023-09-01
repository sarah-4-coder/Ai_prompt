import FileUpload from "./Drop";

const Prompt = () => {
  return (
    <div className="flex ">
      <section className="bg-gray-900 w-[25%] h-screen text-white">
        fgdgf
      </section>
      <section className="right relative w-[75%] h-screen bg-gray-500">
        <div className="drop w-[60%] m-auto pt-[12%] ">
          <FileUpload />
        </div>
        {/* <input type="text" className="absolute bottom-12 left-1/2 translate-x-[-50%] border-none w-[40%] h-[5%]"  /> */}
      </section>
    </div>
  );
};

export default Prompt;
