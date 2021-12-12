import React from "react";
import styled from "styled-components";

export const CloseButton = styled.span`
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
`;

export default function CustomModal({
  isActive,
  title,
  children,
  confirmButton,
  onConfirm,
  closeModal,
}) {
  return (
    <div
      className={`modal fixed w-full h-full top-0 left-0 flex items-center justify-center transition-opacity duration-300 ${
        isActive
          ? "overflow-x-hidden overflow-y-visible"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
        aria-hidden="true"
        onClick={closeModal}
      />
      <div className="relative modal-container bg-white w-11/12 md:max-w-3xl mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-5 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="ml-3 text-2xl font-bold text-gray-700">{title}</p>
          </div>
          <div className="px-5 py-3 text-gray-700">{children}</div>
          <div className="text-right mt-5">
            {typeof confirmButton === "string" ? (
              <button
                className="bg-green-500 px-4 py-2 font-bold rounded text-white hover:bg-green-600"
                type="button"
                onClick={onConfirm}
              >
                {confirmButton}
              </button>
            ) : (
              confirmButton
            )}
          </div>
        </div>
        <CloseButton
          onClick={closeModal}
          className="absolute top-0 right-0 mr-4 mt-2 text-gray-600 text-3xl hover:text-gray-700 cursor-pointer"
        >
          &times;
        </CloseButton>
      </div>
    </div>
  );
}
