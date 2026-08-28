interface AccredSpecialtiesProps {
  higherEducation: string[];
  secondaryEducation: string[];
}

export default function AccredSpecialties({
  higherEducation,
  secondaryEducation,
}: AccredSpecialtiesProps) {
  return (
    <section className="rounded-3xl bg-white border border-zinc-200 shadow-sm overflow-hidden">

      <div className="bg-green px-6 py-6">
        <h2 className="text-xl md:text-2xl font-semibold text-white">
          Специальности
        </h2>

        <p className="mt-2 text-sm text-white/80">
          Направления, по которым проводится первичная
          специализированная аккредитация
        </p>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6">

        <SpecialtyColumn
          title="Высшее образование"
          items={higherEducation}
        />

        <SpecialtyColumn
          title="Среднее профессиональное образование"
          items={secondaryEducation}
        />

      </div>
    </section>
  );
}


interface SpecialtyColumnProps {
  title: string;
  items: string[];
}

function SpecialtyColumn({
  title,
  items,
}: SpecialtyColumnProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 p-5">

      <h3 className="text-lg font-semibold text-zinc-800 mb-4">
        {title}
      </h3>

      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-xl bg-zinc-50 border border-zinc-100 px-4 py-3 text-zinc-700"
          >
            {item}
          </div>
        ))}
      </div>

    </div>
  );
}