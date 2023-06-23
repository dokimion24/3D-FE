import React, { useState, useEffect } from 'react'
import { getAllReviews } from '@/api/service/review'
import { Review, ReviewData } from '@/api/interface/review'
import ReviewItem from './ReviewItem'
import { useReview } from '@/hooks/useReview'
import CreateReview from './CreateReview'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

interface Props {
  id: number
}

export default function ReviewList({ id }: Props) {
  const userId = useSelector((state: RootState) => state.user.userId)

  const { reviews } = useReview(id)

  console.log({ reviews })

  return (
    <>
      {!!userId && reviews?.hasAsset && !reviews?.hasReview && <CreateReview id={id} />}
      <ul className="mb-[0.8rem]">
        {reviews?.reviewList.map((review: Review) => (
          <ReviewItem key={review.reviewId} review={review} assetId={id} />
        ))}
      </ul>
      {reviews?.reviewList.length === 0 && !reviews?.hasAsset && !reviews?.hasReview && (
        <section className="mb-[0.8rem] flex h-[8rem] flex-col items-center justify-between bg-neutral-navy-900 px-[1.6rem] py-[1.2rem]">
          <div className="h-[2.4rem] text-sl text-neutral-navy-200">아직 리뷰가 없습니다</div>
          <div className="text-mm text-neutral-navy-300">리뷰를 작성해보세요!</div>
        </section>
      )}
    </>
  )
}
