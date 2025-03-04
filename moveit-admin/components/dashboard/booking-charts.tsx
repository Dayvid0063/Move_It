import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface BookingDataPoint {
  name: string;
  bookings: number;
}

interface BookingData {
  weekly: BookingDataPoint[];
  monthly: BookingDataPoint[];
}

interface CustomBookingChartProps {
  timeRange: 'weekly' | 'monthly';
}

const CustomBookingChart: React.FC<CustomBookingChartProps> = ({ timeRange }) => {
  const data: BookingData = {
    weekly: [
      { name: 'Mon', bookings: 4 },
      { name: 'Tue', bookings: 6 },
      { name: 'Wed', bookings: 8 },
      { name: 'Thu', bookings: 5 },
      { name: 'Fri', bookings: 9 },
      { name: 'Sat', bookings: 12 },
      { name: 'Sun', bookings: 7 }
    ],
    monthly: [
      { name: 'Week 1', bookings: 28 },
      { name: 'Week 2', bookings: 32 },
      { name: 'Week 3', bookings: 25 },
      { name: 'Week 4', bookings: 30 }
    ]
  };

  const currentData = data[timeRange];
  const maxBookings = Math.max(...currentData.map(d => d.bookings));

  // Generate grid lines
  const gridLines = Array.from({ length: 5 }, (_, i) => {
    const value = Math.round((maxBookings / 4) * (4 - i));
    return { value, yPosition: (i * 25) };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{timeRange === 'weekly' ? 'Weekly' : 'Monthly'} Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <div className="flex h-full gap-4">
            {/* Y-axis labels */}
            <div className="flex flex-col justify-between h-[250px] text-sm text-gray-500 w-12">
              {gridLines.map(({ value }, i) => (
                <div key={i} className="text-right pr-2">
                  {value}
                </div>
              ))}
            </div>

            <div className="flex-1">
              <div className="relative h-[250px]">
                {/* Grid lines */}
                {gridLines.map(({ yPosition }, i) => (
                  <div
                    key={i}
                    className="absolute w-full border-t border-gray-200"
                    style={{ top: `${yPosition}%` }}
                  />
                ))}

                {/* Bars */}
                <div className="absolute inset-0 flex items-end gap-2">
                  {currentData.map((item, index) => {
                    const height = (item.bookings / maxBookings) * 100;
                    return (
                      <div
                        key={index}
                        className="group relative flex-1 flex flex-col items-center"
                      >
                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white p-2 rounded-lg shadow-lg text-sm z-10">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-blue-600">{item.bookings} bookings</p>
                        </div>
                        {/* Bar */}
                        <div
                          className="w-full bg-blue-500 rounded-t-md transition-all duration-300 hover:bg-blue-600"
                          style={{ height: `${height}%` }}
                        >
                          <div className="absolute bottom-0 w-full h-full bg-blue-500 opacity-10 transition-opacity group-hover:opacity-20" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* X-axis labels */}
              <div className="flex justify-between mt-2 px-2">
                {currentData.map((item, index) => (
                  <div key={index} className="flex-1 text-center text-sm text-gray-600">
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomBookingChart;
