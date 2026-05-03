import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';

const ProofUploadModal = ({
  isOpen,
  onClose,
  onProofSubmit,
  bookingData,
  paymentMethod,
  carDetails,
}) => {
  const [proofFile, setProofFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (proofFile) {
      const url = URL.createObjectURL(proofFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [proofFile]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setProofFile(file);
      setError('');
    } else {
      setError('Hanya file gambar yang diperbolehkan (JPG, PNG, dll).');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!proofFile) {
      setError('Silakan unggah bukti pembayaran DP 20%.');
      return;
    }

    setUploading(true);
    setError('');

    // Simulate upload delay
    setTimeout(() => {
      const proofData = {
        file: proofFile,
        previewUrl,
        filename: proofFile.name,
        uploadTime: new Date().toISOString(),
      };

      onProofSubmit({
        ...bookingData,
        paymentMethod,
        carDetails,
        proof: proofData,
      });

      setUploading(false);
      onClose();
      setProofFile(null);
      setPreviewUrl('');
    }, 1500);
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={onClose}
      centered={true}
      size="md"
      className="proof-modal"
    >
      <ModalHeader toggle={onClose}>Unggah Bukti Pembayaran DP 20%</ModalHeader>
      <ModalBody>
        <p className="mb-4">
          Silakan unggah foto bukti transfer DP 20% untuk mengkonfirmasi
          reservasi {bookingData?.firstName || ''}.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="proof-file" className="form-label">
              Pilih File Bukti (JPG/PNG)
            </label>
            <input
              id="proof-file"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="form-control"
              disabled={uploading}
            />
            {error && <div className="alert alert-danger mt-2">{error}</div>}
          </div>
          {previewUrl && (
            <div className="mb-4">
              <label className="form-label">Preview:</label>
              <img
                src={previewUrl}
                alt="Preview bukti"
                className="img-thumbnail w-100"
                style={{ maxHeight: '200px' }}
              />
            </div>
          )}
          <div className="d-flex gap-2">
            <Button color="secondary" onClick={onClose} disabled={uploading}>
              Batal
            </Button>
            <Button
              color="success"
              type="submit"
              disabled={!proofFile || uploading}
              className={
                uploading ? 'spinner-border spinner-border-sm me-2' : ''
              }
            >
              {uploading ? 'Mengunggah...' : 'Konfirmasi Reservasi'}
            </Button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default ProofUploadModal;
