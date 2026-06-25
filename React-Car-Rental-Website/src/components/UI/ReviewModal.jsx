import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { saveReview } from '../../utils/bookingUtils';

const ReviewModal = ({ isOpen, onClose, carId, bookingId, carName }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [photos, setPhotos] = useState([]);

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setPhotos([...photos, ...newPhotos]);
  };

  const removePhoto = (index) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setPhotos(updatedPhotos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewData = {
      rating,
      comment,
      reviewPhotoUrls: photos.map(p => p.preview),
      user: JSON.parse(localStorage.getItem('user'))?.username || 'Anonymous',
    };
    saveReview(carId, bookingId, reviewData);
    alert('Terima kasih atas review kamu!');
    setPhotos([]);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} toggle={onClose}>
      <ModalHeader toggle={onClose}>Review - {carName}</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Rating</Label>
            <Input
              type="select"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              <option value={5}>⭐⭐⭐⭐⭐ - Sangat Baik</option>
              <option value={4}>⭐⭐⭐⭐ - Baik</option>
              <option value={3}>⭐⭐⭐ - Cukup</option>
              <option value={2}>⭐⭐ - Kurang</option>
              <option value={1}>⭐ - Sangat Kurang</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label>Komentar</Label>
            <textarea
              className="form-control"
              rows="4"
              placeholder="Ceritakan pengalaman kamu..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Foto (Opsional - Bisa lebih dari 1)</Label>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoChange}
            />
            {photos.length > 0 && (
              <div className="mt-3">
                <p className="small text-muted mb-2">Preview ({photos.length} foto):</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {photos.map((photo, index) => (
                    <div key={index} style={{ position: 'relative' }}>
                      <img
                        src={photo.preview}
                        alt={`preview-${index}`}
                        className="rounded"
                        style={{ maxWidth: '120px', maxHeight: '120px', objectFit: 'cover' }}
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="btn btn-sm btn-danger"
                        style={{ position: 'absolute', top: '-5px', right: '-5px', padding: '2px 6px', fontSize: '12px' }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </FormGroup>

          <Button type="submit" className="w-100" style={{ backgroundColor: '#000d6b', border: 'none' }}>
            Kirim Review
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default ReviewModal;