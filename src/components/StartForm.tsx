type StartFormProps = {
  setName: (name: string) => void;
  setRegistered: (isRegister: boolean) => void;
};
const StartForm: React.FC<StartFormProps> = ({ setName, setRegistered }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRegistered(true);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-1/2 mx-auto mt-10">
      <label htmlFor="name" className="text-2xl text-center my-2">
        Enter your name
      </label>
      <input
        id="name"
        type="text"
        className="border-2 border-zinc-500 p-2 w-1/2 mx-auto text-black"
        autoComplete="off"
        onChange={(e) => setName(e.target.value)}
      />
      <button className="bg-white hover:bg-gray-500 text-gray-700 font-semibold hover:text-white my-2 mx-auto py-2 px-4 border border-black hover:border-transparent rounded">
        Join chat
      </button>
    </form>
  );
};

export default StartForm;
