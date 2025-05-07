import { Aircraft } from '@/types';
import { BsFillFuelPumpFill } from 'react-icons/bs';
import { FaFire, FaTachometerAlt, FaTrash } from 'react-icons/fa';

interface AircraftItemProps {
  aircraft: Aircraft;
  onDelete?: () => void;
}

export default function AircraftItem({
  aircraft,
  onDelete,
}: AircraftItemProps) {
  const {
    name,
    fuel_tank_size: tankSize,
    fuel_reserve_size: reserveSize,
    burn_rate: burnRate,
    speed,
  } = aircraft;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.();
  };

  return (
    <div className="outline flex flex-row items-center justify-between gap-[300px] w-full bg-black/5 hover:bg-black/10 transition-colors rounded-lg p-4 cursor-pointer group">
      <div className="flex items-center flex-1">
        <h3 className="text-black font-light text-lg">{name}</h3>
      </div>

      <div className="flex flex-row gap-6 items-center">
        <div className="flex items-center gap-2">
          <BsFillFuelPumpFill size={20} />
          <span className="text-sm font-medium">{tankSize} kg</span>
        </div>

        <div className="flex items-center gap-2">
          <FaFire size={20} />
          <span className="text-sm font-medium">{burnRate} kg/h</span>
        </div>

        <div className="flex items-center gap-2">
          <FaTachometerAlt size={20} />
          <span className="text-sm font-medium">{speed} nm/h</span>
        </div>

        <button
          onClick={handleDelete}
          className="p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Delete aircraft"
        >
          <FaTrash className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
