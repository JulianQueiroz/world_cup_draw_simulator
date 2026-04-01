type Props = {
  title: string;
  value: number;
  onChange: (value: number) => void;
  options: number[];
};

const RadioGroup = ({ title, value, onChange, options }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">{title}</span>
      <div className="flex gap-3">
        {options.map((opt) => (
          <label
            key={opt}
            className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              value={opt}
              checked={value === opt}
              onChange={() => onChange(opt)}
              className="accent-green-600"
            />
            <span className="text-sm">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;