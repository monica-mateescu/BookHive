import { Link } from "react-router";

type ProcessStep = {
  title: string;
  label?: string;
  href?: string;
};

type ProcessSectionProps = {
  variant?: "home" | "about";
  title: string;
  description: string;
  steps: ProcessStep[];
  eyebrow?: string;
};

const ProcessSection = ({
  variant = "home",
  title,
  description,
  steps,
  eyebrow,
}: ProcessSectionProps) => {
  return (
    <section>
      <div
        className={`grid grid-cols-1 items-center gap-10 rounded-3xl bg-(--gray-secondary)/30 p-10 lg:grid-cols-12 lg:pt-0 ${
          variant === "about" ? "mt-15" : ""
        }`}
      >
        <div className="space-y-2 lg:col-span-5">
          {eyebrow && (
            <div className="text-xs font-bold tracking-wider text-(--brand-primary) uppercase">
              {eyebrow}
            </div>
          )}
          <h2 className="text-2xl font-semibold text-(--text-main)">{title}</h2>
          <p className="text-sm text-(--gray-primary)">{description}</p>
        </div>

        <div className="lg:col-span-7">
          {/* DaisyUI Timeline */}
          <ul className="timeline timeline-vertical lg:timeline-horizontal timeline-compact">
            {steps.map((step, index) => {
              const isLast = index === steps.length - 1;
              return (
                <li key={index}>
                  {index !== 0 && <hr className="bg-(--brand-primary)" />}
                  <div className="timeline-middle">
                    <div className="h-5 w-5 rounded-full bg-(--brand-primary)"></div>
                  </div>
                  <div className="timeline-end lg:timeline-start bg-base-100 border-base-200 mb-10 rounded-xl border p-4 shadow-xs lg:mb-0">
                    <span className="block font-semibold text-(--text-main)">
                      {step.title}
                    </span>
                    {step.href ? (
                      <Link
                        to={step.href}
                        className="text-sm font-medium text-(--brand-primary) underline hover:opacity-80"
                      >
                        {step.label}
                      </Link>
                    ) : (
                      <span className="text-sm text-(--gray-primary)">
                        {step.label}
                      </span>
                    )}
                  </div>
                  {!isLast && <hr className="bg-(--brand-primary)" />}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
