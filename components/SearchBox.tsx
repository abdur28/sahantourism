"use client";

import { useState } from "react";
import { CalendarDays, MapPin, Users, Clock, Search } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const destinations = [
  { value: "djibouti", label: "Djibouti" },
  { value: "eritrea", label: "Eritrea" },
  { value: "kismayo", label: "Kismayo" },
  { value: "mogadishu", label: "Mogadishu" },
  { value: "puntland", label: "Puntland" },
  { value: "somaliland", label: "Somaliland" },
  { value: "south-sudan", label: "South Sudan" },
];

export default function SearchBox() {
  const [destination, setDestination] = useState<string>("");
  const [duration, setDuration] = useState<number[]>([3, 7]);
  const [checkinDate, setCheckinDate] = useState<Date>();
  const [persons, setPersons] = useState<number>(2);

  const incrementPersons = () => {
    setPersons(prev => Math.min(prev + 1, 20));
  };

  const decrementPersons = () => {
    setPersons(prev => Math.max(prev - 1, 1));
  };

  const handleSearch = () => {
    const searchData = {
      destination,
      duration,
      checkinDate,
      persons,
    };
    console.log("Search data:", searchData);
    // Handle search logic here
  };

  return (
    <div className="bg-gray-50 pb-12 lg:-mt-32 md:-mt-48 -mt-64">
      <div className="container mx-auto px-4 relative z-20">
        <div className="bg-white rounded-3xl p-8 shadow-xl max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 items-end">
            
            {/* Destination Select */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                Destination
              </label>
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger className="py-6 h-12 rounded-full border-gray-300 focus:border-blue-500">
                  <SelectValue placeholder="Select destination" className="text-xs"/>
                </SelectTrigger>
                <SelectContent>
                  {destinations.map((dest) => (
                    <SelectItem key={dest.value} value={dest.value} className="text-xs">
                      {dest.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Duration Range Slider */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-700 flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                Duration
              </label>
              <div className="h-12 flex flex-col justify-center px-4 border border-gray-300 rounded-full bg-white">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>{duration[0]} days</span>
                  <span>{duration[1]} days</span>
                </div>
                <Slider
                  value={duration}
                  onValueChange={setDuration}
                  max={8}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>

            {/* Check-in Date */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-700 flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-blue-600" />
                Check-in Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "h-12 w-full justify-start text-left text-sm font-normal rounded-full border-gray-300 hover:border-blue-500",
                      !checkinDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {checkinDate ? format(checkinDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={checkinDate}
                    onSelect={setCheckinDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Number of Persons */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-700 flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-600" />
                Persons
              </label>
              <div className="h-12 flex items-center border border-gray-300 rounded-full bg-white px-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 rounded-full p-0 hover:bg-blue-50"
                  onClick={decrementPersons}
                  disabled={persons <= 1}
                >
                  −
                </Button>
                <div className="flex-1 text-sm text-center font-medium">
                  {persons} {persons === 1 ? 'Person' : 'Persons'}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 rounded-full p-0 hover:bg-blue-50"
                  onClick={incrementPersons}
                  disabled={persons >= 20}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Search Button */}
            <div className="xl:col-span-1 lg:col-span-4 md:col-span-2">
              <Button
                onClick={handleSearch}
                className="w-full h-12 rounded-full text-sms bg-blue-600 hover:bg-blue-700 text-white font-semibold  shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Search className="mr-2 h-5 w-5" />
                Search Tours
              </Button>
            </div>

          </div>

          {/* Selected Values Display */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex flex-wrap gap-4 text-xs text-gray-600">
              {destination && (
                <span className="bg-blue-50 px-3 py-1 rounded-full">
                  📍 {destinations.find(d => d.value === destination)?.label}
                </span>
              )}
              <span className="bg-gray-50 px-3 py-1 rounded-full">
                ⏱️ {duration[0]}-{duration[1]} days
              </span>
              {checkinDate && (
                <span className="bg-green-50 px-3 py-1 rounded-full">
                  📅 {format(checkinDate, "MMM dd, yyyy")}
                </span>
              )}
              <span className="bg-purple-50 px-3 py-1 rounded-full">
                👥 {persons} {persons === 1 ? 'person' : 'people'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}