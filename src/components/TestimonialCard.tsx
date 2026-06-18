interface Testimonial {
  id: string;
  name: string;
  role: string;
  institution?: string;
  avatarUrl?: string;
  quote: string;
  rating: number;
}

export default function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <div className="w-[320px] flex-shrink-0 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-5 shadow-sm hover:shadow-md transition-all duration-300">
      {/* Rating */}
      <div className="flex gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={
              i < testimonial.rating
                ? "text-yellow-500"
                : "text-slate-300 dark:text-zinc-700"
            }
          >
            ★
          </span>
        ))}
      </div>

      {/* Quote */}
      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 mb-5">
        "{testimonial.quote}"
      </p>

      {/* User Details */}
      <div className="flex items-center gap-3">
        <img
          src={
            testimonial.avatarUrl ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              testimonial.name,
            )}`
          }
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-zinc-700"
        />

        <div>
          <h4 className="font-semibold text-sm text-slate-900 dark:text-white">
            {testimonial.name}
          </h4>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            {testimonial.role}
          </p>

          {testimonial.institution && (
            <p className="text-xs text-blue-600 dark:text-blue-400">
              {testimonial.institution}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating?: number;
}

export default function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <div className="w-[320px] flex-shrink-0 rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-6 shadow-sm">
      <p className="text-sm italic text-slate-600 dark:text-slate-300">
        "{testimonial.text}"
      </p>

      {testimonial.rating && (
        <div className="flex gap-1 mt-4">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <span key={i}>⭐</span>
          ))}
        </div>
      )}

      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-zinc-800">
        <h4 className="font-bold">{testimonial.name}</h4>
        <p className="text-xs text-slate-500">{testimonial.role}</p>
      </div>
    </div>
  );
}
