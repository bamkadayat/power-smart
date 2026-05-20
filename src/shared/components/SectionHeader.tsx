type Props = {
  label: string;
  title: string;
  titleId?: string;
  meta?: string;
};

export const SectionHeader = ({ label, title, titleId, meta }: Props) => (
  <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <h2
        id={titleId}
        className="mt-1 text-2xl font-bold tracking-tight"
      >
        {title}
      </h2>
    </div>
    {meta ? (
      <p className="text-xs text-muted-foreground">{meta}</p>
    ) : null}
  </header>
);
