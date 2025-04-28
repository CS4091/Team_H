import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import ScheduleIcon from "@mui/icons-material/Schedule";

interface RouteStatsPanelProps {
  tripName: string;
  aircraftName: string;
  startCity: string;
  endCity: string;
  totalCost: string;
  totalDistance: string;
  totalTravelTime: string;
  routeGenerationDate: string;
}

export default function RouteStatsPanel({
  tripName,
  aircraftName,
  startCity,
  endCity,
  totalCost,
  totalDistance,
  totalTravelTime,
  routeGenerationDate,
}: RouteStatsPanelProps) {
  return (
    <div className="w-full h-full p-3 justify-between flex flex-col bg-white rounded-lg border-2 border-solid">
      <div className="font-bold text-[34px] text-center leading-[1.1] pt-2">
        “{tripName}” <br />
        <div className="flex justify-around pt-4 px-6">
          <span className="italic text-[13px] font-normal underline bg-yellow-300 p-1 px-3 rounded">
            {startCity} → {endCity}
          </span>
          <span className="italic text-[13px] font-normal p-1 px-3 rounded">
            Aircraft: {aircraftName}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="border-2 border-solid border-gray-300 rounded-lg p-2 text-center bg-gray-200">
          <AttachMoneyIcon className="text-[36px] mb-[-2px]" />
          <div className="h-[14px]" />
          Estimated Total Cost:
          <br />
          {totalCost}
        </div>

        <div className="border-2 border-solid border-gray-300 rounded-lg p-2 text-center bg-gray-200">
          <FlightTakeoffIcon className="text-[36px] mb-[-2px]" />
          <div className="h-[14px]" />
          Total Distance Traveled:
          <br />
          {totalDistance}
        </div>

        <div className="border-2 border-solid border-gray-300 rounded-lg p-2 text-center bg-gray-200">
          <ScheduleIcon className="text-[36px] mb-[-2px]" />
          <div className="h-[14px]" />
          Estimated Travel Time:
          <br />
          {totalTravelTime}
        </div>
      </div>

      <div className="border-2 border-solid border-gray-300 rounded-lg p-1 text-center italic text-gray-500 text-[12px] bg-gray-200">
        Route Generation Date:
        <br />
        {routeGenerationDate}
      </div>
    </div>
  );
}
