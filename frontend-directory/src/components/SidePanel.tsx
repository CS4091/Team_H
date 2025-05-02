import HomeIcon from '@/components/icons/HomeIcon';
import { IoHomeOutline, IoAddCircleOutline } from 'react-icons/io5';
import { FaChartBar } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

interface SidePanelProps {
  currentPage: string | null;
}

export default function SidePanel({ currentPage }: SidePanelProps) {
  return (
    <nav className="h-full w-64 bg-[#f7f7fc] shadow-xl rounded-tr-3xl rounded-br-3xl
                    flex flex-col justify-between items-center
                    px-6 py-8">
      {/* ───────────── Top logo ───────────── */}
      <div className="flex-shrink-0">
        <img
            src='/PPLogo.png'
            width={150}
        />
      </div>

      {/* ───────────── Nav links ───────────── */}
      <div className="flex flex-col gap-6 w-full">
        <a
          href="/auth/dashboard"
          className={`
            flex items-center gap-3 px-4 py-2 rounded-lg
            ${currentPage === 'dashboard' ? 'bg-gray-200' : 'hover:bg-gray-100'}
          `}
        >
          <IoHomeOutline className="w-6 h-6 text-gray-700" />
          <span className="text-gray-800 font-medium">Dashboard</span>
        </a>

        <a
          href="/auth/create-route"
          className={`
            flex items-center gap-3 px-4 py-2 rounded-lg
            ${currentPage === 'create-route' ? 'bg-gray-200' : 'hover:bg-gray-100'}
          `}
        >
          <IoAddCircleOutline className="w-6 h-6 text-gray-700" />
          <span className="text-gray-800 font-medium">New Route</span>
        </a>

        <a
          href="/auth/route-generator"
          className={`
            flex items-center gap-3 px-4 py-2 rounded-lg
            ${currentPage === 'route-generator' ? 'bg-gray-200' : 'hover:bg-gray-100'}
          `}
        >
          <FaChartBar className="w-6 h-6 text-gray-700" />
          <span className="text-gray-800 font-medium">Analyze Algorithms</span>
        </a>
      </div>

      {/* ───────────── User / Logout ───────────── */}
      <div className="flex flex-col items-center gap-6 w-full">
        <div className="flex items-center gap-3">
          <img
            src="/ayman.jpg"
            width={40}
            height={40}
            className="rounded-full"
            alt="User avatar"
          />
          <span className="text-gray-800 font-medium">Ayman</span>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 w-full justify-center"
        >
          <FiLogOut className="w-5 h-5 text-gray-700" />
          <span className="text-gray-800 font-medium">Logout</span>
        </button>
      </div>
    </nav>
  );
}
