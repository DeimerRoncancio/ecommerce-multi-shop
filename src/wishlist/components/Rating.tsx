type RatingProps = {
  index: number
}

export default function Rating({ index }: RatingProps) {
  return (
    <div className="flex items-center gap-1 text-sm">
      <div className="rating rating-xs rating-half">
        <input type="radio" name={`rating-${index + 1}`} className="rating-hidden" />
        <input type="radio" name={`rating-${index + 1}`} className="mask mask-star-2 mask-half-1 bg-orange-400" aria-label="0.5 star" />
        <input type="radio" name={`rating-${index + 1}`} className="mask mask-star-2 mask-half-2 bg-orange-400" aria-label="1 star" />
        <input type="radio" name={`rating-${index + 1}`} className="mask mask-star-2 mask-half-1 bg-orange-400" aria-label="1.5 star" />
        <input type="radio" name={`rating-${index + 1}`} className="mask mask-star-2 mask-half-2 bg-orange-400" aria-label="2 star" />
        <input type="radio" name={`rating-${index + 1}`} className="mask mask-star-2 mask-half-1 bg-orange-400" aria-label="2.5 star" />
        <input type="radio" name={`rating-${index + 1}`} className="mask mask-star-2 mask-half-2 bg-orange-400" aria-label="3 star" />
        <input type="radio" name={`rating-${index + 1}`} className="mask mask-star-2 mask-half-1 bg-orange-400" aria-label="3.5 star" defaultChecked />
        <input type="radio" name={`rating-${index + 1}`} className="mask mask-star-2 mask-half-2 bg-orange-400" aria-label="4 star" />
        <input type="radio" name={`rating-${index + 1}`} className="mask mask-star-2 mask-half-1 bg-orange-400" aria-label="4.5 star" />
        <input type="radio" name={`rating-${index + 1}`} className="mask mask-star-2 mask-half-2 bg-orange-400" aria-label="5 star" />
      </div>
      <p className="text-[#8c8e91]">(4/3)</p>
    </div>
  )
}