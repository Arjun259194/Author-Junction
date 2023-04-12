import SideFooter from "./SideFooter";

const Statusbar = () => {
  return (
    <section className="flex w-2/5 flex-col space-y-4 bg-blue-300 px-2">
      <div className="rounded-md border border-gray-300 bg-blue-50 px-4 py-2 shadow-md">
        <h3 className="my-2 text-center text-2xl font-semibold">Popular</h3>
        <div className="flex flex-col divide-y text-base font-normal [&>*]:my-1">
          <span className="">
            The Rise of the Crimson Crusader: A Superhero's Journey to Save the...
          </span>
          <span className="">
            The Mysterious Case of the Missing Heirloom Necklace: A Detective Story
          </span>
          <span className="">The Curse of the Haunted Mansion: A Terrifying Mystery</span>
          <span>The Secret of the Abandoned Castle: A Spooky Adventure</span>
        </div>
      </div>
      <hr />
      <SideFooter />
    </section>
  );
};

export default Statusbar;
