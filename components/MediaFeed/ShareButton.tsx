import Button from "@/UI/Button";
import { shareIcon } from "@/assets/icons";
import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useState } from "react";
import PostButton from "./PostButton";

interface Props {
  postId: string;
}

const ShareButton: FC<Props> = ({ postId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clicked, setClicked] = useState(false);

  const url = new URL("/post/" + postId, "http://localhost:3000");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <PostButton onClick={openModal} className="hover:bg-blue-50">
        <span className=" aspect-square h-6 transition-colors duration-200 group-hover:text-blue-500">
          {shareIcon}
        </span>
        <span className=" text-base capitalize text-gray-500 transition-colors duration-200 group-hover:text-blue-500">
          share
        </span>
      </PostButton>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium capitalize leading-6 text-gray-900"
                  >
                    copy url!
                  </Dialog.Title>
                  <div className="mt-2 space-y-4">
                    <p className="text-sm text-gray-500">
                      copy and use the link given below to share this post
                    </p>
                    <p className="rounded-md bg-gray-200 p-2 font-mono text-gray-600">{url.href}</p>
                    <p className="text-gray-500">{!!clicked ? "copied to clipboard!" : null}</p>
                  </div>

                  <div className="mt-4 space-x-2">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={_ => {
                        navigator.clipboard.writeText(url.href);
                        setClicked(true);
                      }}
                    >
                      copy
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={_ => {
                        setClicked(false);
                        closeModal();
                      }}
                    >
                      Got it, thanks!
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ShareButton;
