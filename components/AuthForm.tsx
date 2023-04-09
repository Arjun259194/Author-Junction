import Button from "@/UI/Button";
import { loadingIcon } from "@/assets/icons";
import { FC, FormEventHandler, ReactNode } from "react";

interface Props {
  children: ReactNode;
  submitHandler: FormEventHandler<HTMLFormElement>;
  submitText: string;
  loading: boolean;
}

const AuthForm: FC<Props> = ({ children, submitHandler, submitText, loading }) => {
  return (
    <form onSubmit={submitHandler} className="my-4 mb-6 space-y-6">
      {loading ? (
        <div className=" mx-auto aspect-square w-10 animate-spin text-gray-200">{loadingIcon}</div>
      ) : (
        <>
          {children}
          <Button variant="primary" type="submit">
            {submitText}
          </Button>
        </>
      )}
    </form>
  );
};

export default AuthForm;
