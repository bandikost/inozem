export function LinksEditor({ links, onChange }) {
  const add = () => {
    onChange([...links, { name: "", href: "" }]);
  };

  const update = (i, key, value) => {
    const copy = [...links];
    copy[i][key] = value;
    onChange(copy);
  };

  return (
    <div>
      {links.map((l, i) => (
        <div key={i} className="flex gap-2">
          <input
            placeholder="name"
            value={l.name}
            onChange={(e) => update(i, "name", e.target.value)}
          />

          <input
            placeholder="href"
            value={l.href}
            onChange={(e) => update(i, "href", e.target.value)}
          />
        </div>
      ))}

      <button onClick={add}>+ Add link</button>
    </div>
  );
}