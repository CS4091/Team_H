'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import AircraftItem from '@/components/AircraftItem';
import { Aircraft } from '@/types';
import { Button } from '@/components';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import supabase from '@/api/supabaseClient';
import { useAuth } from '@/contexts/UserContextProvider';

const dummyAircraftData: Aircraft[] = [
  {
    name: 'Boeing F-25',
    fuel_tank_size: 100,
    fuel_reserve_size: 2,
    burn_rate: 5,
    speed: 5,
  },
  {
    name: 'Boeing F-26',
    fuel_tank_size: 120,
    fuel_reserve_size: 5,
    burn_rate: 6,
    speed: 6,
  },
  {
    name: 'Boeing F-27',
    fuel_tank_size: 150,
    fuel_reserve_size: 10,
    burn_rate: 7,
    speed: 7,
  },
];

export default function AircraftsPage() {
  const [aircrafts, setAircrafts] = useState<Aircraft[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [newAircraft, setNewAircraft] = useState<Aircraft>({
    name: '',
    fuel_tank_size: 0,
    fuel_reserve_size: 0,
    burn_rate: 0,
    speed: 0,
  });
  const { user } = useAuth();

  useEffect(() => {
    // fetch supabase aircrafts table
    const getAircrafts = async () => {
        const { data, error } = await supabase
            .from('aircrafts')
            .select('name, fuel_tank_size, fuel_reserve_size, burn_rate, speed');
        if (error) {
            console.log(error);
        } else {
            setAircrafts(data);
        }
    };
    getAircrafts();
    setLoading(false);
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (field: keyof Aircraft) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = field === 'name' ? e.target.value : Number(e.target.value);
    setNewAircraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdd = async () => {
    const { data, error } = await supabase
      .from('aircrafts')
      .insert([
        {
          name: newAircraft.name,
          fuel_tank_size: newAircraft.fuel_tank_size,
          fuel_reserve_size: newAircraft.fuel_reserve_size,
          burn_rate: newAircraft.burn_rate,
          speed: newAircraft.speed,
          user_id: user.id, // ensure you have user context
        },
      ]);
    if (error) {
      console.log(error);
    } else if (data) {
      setAircrafts((prev) => [...prev, data[0]]);
    }
    handleClose();
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center pl-[50px] pt-[50px]">
      <div className="flex flex-col justify-start gap-[50px]">
        <div>
          <Button text="New aircraft" fillContainer={false} onClick={handleOpen} />
        </div>
        <div className="flex flex-col gap-[50px]">
          {aircrafts.map((aircraft, index) => (
            <AircraftItem key={index} aircraft={aircraft} />
          ))}
        </div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Aircraft</DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-4 mt-2">
            <label className="flex flex-col text-sm">
              Name:
              <input
                type="text"
                value={newAircraft.name}
                onChange={handleChange('name')}
                className="mt-1 p-1 border rounded"
              />
            </label>
            <label className="flex flex-col text-sm">
              Tank Size (kg):
              <input
                type="number"
                value={newAircraft.fuel_tank_size}
                onChange={handleChange('fuel_tank_size')}
                className="mt-1 p-1 border rounded"
              />
            </label>
            <label className="flex flex-col text-sm">
              Reserve Size (kg):
              <input
                type="number"
                value={newAircraft.fuel_reserve_size}
                onChange={handleChange('fuel_reserve_size')}
                className="mt-1 p-1 border rounded"
              />
            </label>
            <label className="flex flex-col text-sm">
              Burn Rate (kg/h):
              <input
                type="number"
                value={newAircraft.burn_rate}
                onChange={handleChange('burn_rate')}
                className="mt-1 p-1 border rounded"
              />
            </label>
            <label className="flex flex-col text-sm">
              Speed (nm/h):
              <input
                type="number"
                value={newAircraft.speed}
                onChange={handleChange('speed')}
                className="mt-1 p-1 border rounded"
              />
            </label>
          </div>
        </DialogContent>
        <DialogActions>
          <Button text="Add" fillContainer={false} onClick={handleAdd} />
        </DialogActions>
      </Dialog>
    </div>
  );
}

