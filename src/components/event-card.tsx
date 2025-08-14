"use client";
import { CalendarDays, MapPin, ExternalLink } from "lucide-react";

interface Event {
  title: string;
  date: string;
  location: string;
  registerUrl: string;
}

interface EventCardProps {
  events?: Event[];
}

export default function EventCard({ events = [] }: EventCardProps) {
  return (
    <div className="max-w-sm rounded-xl shadow-lg border border-gray-200 bg-gradient-to-br from-white/90 to-white/60 backdrop-blur-lg">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">
         📅 Upcoming Events
        </h2>

        {events.length === 0 && (
          <p className="text-gray-500 text-sm">No events found</p>
        )}

        <ul className="space-y-3">
          {events.map((event, idx) => (
            <li
              key={idx}
              className="group rounded-lg p-3 border border-gray-100 bg-gray-50 hover:bg-white/80 hover:shadow-md transition-all duration-300"
            >
              {/* Title + Register Button */}
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {event.title}
                </div>
                <a
                  href={event.registerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 active:scale-95 transition-all"
                >
                  Register
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Date & Location */}
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                  <CalendarDays className="w-3.5 h-3.5" />
                  {new Date(event.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-50 text-green-700 text-xs font-medium">
                  <MapPin className="w-3.5 h-3.5" />
                  {event.location}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
