type ConfirmModalProps = {
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
};

const ConfirmModal = ({
  title,
  message,
  onClose,
  onConfirm,
  isLoading,
}: ConfirmModalProps) => {
  return (
    <div className="modal modal-open" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <button onClick={onClose} className="btn btn-outline btn-sm">
            Cancel
          </button>

          <button
            disabled={isLoading}
            onClick={onConfirm}
            className="btn btn-error btn-sm"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
