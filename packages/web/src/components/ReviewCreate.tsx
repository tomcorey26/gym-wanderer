import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { useCreateReviewMutation, GymDetailsDocument } from '@gw/controllers';
import { LoaderBlock } from './LoaderBlock';

interface ReviewCreateProps {
  gymId: string;
}

export const ReviewCreate: React.FC<ReviewCreateProps> = ({ gymId }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [createReview] = useCreateReviewMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText) {
      setError('Written part required');
      return;
    }
    if (!rating) {
      setError('Gym rating required');
      return;
    }
    if (reviewText.length > 500) {
      setError('Your Review must be 500 characters or less');
      return;
    }

    setLoading(true);
    await createReview({
      variables: {
        gymId,
        rating,
        text: reviewText,
      },
      refetchQueries: [
        {
          query: GymDetailsDocument,
          variables: {
            id: gymId,
          },
        },
      ],
    });
    setLoading(false);
  };

  useEffect(() => {
    if (reviewText && rating && reviewText.length < 500) {
      setError('');
    }
  }, [reviewText, rating]);

  if (loading) {
    return <LoaderBlock />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 16,
          height: 230,
        }}
      >
        <Typography component="legend">Rating:</Typography>
        <Rating
          name="rating"
          value={rating}
          onChange={(e, value) => setRating(value)}
        />

        <Typography
          variant="caption"
          style={{
            marginTop: 8,
            color: reviewText.length > 500 ? 'red' : 'black',
          }}
        >
          {reviewText.length}/500 Characters
        </Typography>
        <TextField
          variant="outlined"
          name="review-field"
          placeholder="Write a review here..."
          type="text"
          onChange={(e) => setReviewText(e.target.value)}
          multiline
          rows={3}
          error={!!error}
          helperText={error}
        />
        <Button type="submit" disabled={loading}>
          {' '}
          Submit Review
        </Button>
      </div>
    </form>
  );
};
