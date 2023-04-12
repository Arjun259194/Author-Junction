import Button from "@/UI/Button";

const ErrorPage = () => (
  <div className="flex h-screen w-screen flex-col items-center justify-center space-y-4 bg-gray-100 text-2xl font-light capitalize text-gray-900">
    <span>oops!</span>
    <h1 className="text-4xl font-semibold">Something went wrong!</h1>
    <span className="text-gray-500">Try to reload or go back</span>
    <div className="space-x-4">
      <Button onClick={_ => window.location.reload()} variant="primary">
        reload
      </Button>
      <Button onClick={_ => (window.location.href = "/")} variant="secondary">
        go back
      </Button>
    </div>
  </div>
);

export default ErrorPage;
