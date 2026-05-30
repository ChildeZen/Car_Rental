import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { saveReview } from '../../utils/bookingUtils';

const ReviewModal = ({ isOpen, onClose, carId, bookingId, carName }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewData = {
      rating,
      comment,
      photoUrl: photo ? URL.createObjectURL(photo) : null,
      user: JSON.parse(localStorage.getItem('user'))?.username || 'Anonymous',
    };
    saveReview(carId, bookingId, reviewData);
    alert('Terima kasih atas review kamu!');
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
            <Label>Foto (Opsional)</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
            {photo && (
              <img
                src={URL.createObjectURL(photo)}
                alt="preview"
                className="mt-2 rounded"
                style={{ maxWidth: '150px' }}
              />
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