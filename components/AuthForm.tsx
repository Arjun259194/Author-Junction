import { FC, FormEventHandler, ReactNode } from "react";

interface Props {
  children: ReactNode;
  submitHandler: FormEventHandler<HTMLFormElement>;
  submitText: string;
}

const AuthForm: FC<Props> = ({ children, submitHandler, submitText }) => {
  return (
    <form onSubmit={submitHandler} className="my-4 mb-6 space-y-6">
      {children}
      <input className="rounded-full bg-blue-400 py-2 px-4 text-xl capitalize text-white " type="submit" value={submitText} />
    </form>
  );
};

export default AuthForm;
