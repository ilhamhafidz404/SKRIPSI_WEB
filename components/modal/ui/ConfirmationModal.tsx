import React from "react";
import { Modal } from "../Modal";
import Button from "@/components/button/Button";

export default function ConfirmationModal({
  isOpen,
  closeModal,
  handleSubmit,
}: {
  isOpen: boolean;
  closeModal: () => void;
  handleSubmit: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-175 m-4">
      <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Are You Sure?
        </h4>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
          When deleted this product data will be lost permanently!
        </p>

        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Button size="sm" variant="outline" onClick={closeModal}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleSubmit}>
            Yes
          </Button>
        </div>
      </div>
    </Modal>
  );
}
