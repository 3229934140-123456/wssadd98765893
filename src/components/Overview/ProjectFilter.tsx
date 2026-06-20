import { TREATMENT_TYPES, type TreatmentType } from '@/types';

interface ProjectFilterProps {
  selected: TreatmentType;
  onChange: (type: TreatmentType) => void;
}

const ProjectFilter = ({ selected, onChange }: ProjectFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {TREATMENT_TYPES.map((item) => (
        <button
          key={item.value}
          onClick={() => onChange(item.value)}
          className={selected === item.value ? 'filter-chip-active' : 'filter-chip-inactive'}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default ProjectFilter;
