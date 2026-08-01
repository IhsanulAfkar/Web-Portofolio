import { ReactNode } from "react"

export type TAircraft = {
  "id": string,
  "aircraft_id": string,
  "callsign": string,
  "latitude": string,
  "longitude": string,
  "baro_altitude_meters": string,
  "velocity_mps": string,
  "true_track_degrees": string,
  "vertical_rate_mps": string,
  "is_on_ground": boolean,
  "ingestion_timestamp": string,
  "created_at": string,
  "updated_at": string,
  "aircraft": {
    "id": string,
    "manufacturer": string,
    "model": string,
    "operator": string,
    "origin_country": string,
    "registration": string
  }
}
export type TVessel = {
  "id": string,
  "vessel_id": string,
  "latitude": string,
  "longitude": string,
  "speed_knots": string,
  "course_degrees": string,
  "heading_degrees": number,
  "navigation_status": string,
  "ingestion_timestamp": string,
  "created_at": string,
  "updated_at": string,
  "vessel": {
    "id": string,
    "vessel_name": string,
    "vessel_type_desc": string,
    "flag_country": string,
    "call_sign": string,
    "imo": string
  }
}
export const aircraftToGeoJSON = (aircrafts: TAircraft[]) => {

  return {
    type: 'FeatureCollection',
    features: aircrafts.map((a) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          Number(a.longitude),
          Number(a.latitude)
        ]
      },
      properties: {
        id: a.id,
        callsign: a.callsign,
        rotation: a.true_track_degrees != null
          ? Number(a.true_track_degrees)
          : Math.floor(Math.random() * 360),
        altitude: a.baro_altitude_meters,
        data: a
      }
    }))
  };
}

export function vesselToGeoJSON(vessels: TVessel[]) {
  return {
    type: 'FeatureCollection',
    features: vessels.map((v) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          Number(v.longitude),
          Number(v.latitude)
        ]
      },
      properties: {
        id: v.id,
        rotation: v.heading_degrees != null
          ? Number(v.heading_degrees)
          : Math.floor(Math.random() * 360),
        data: v,
      }
    }))
  };
}

export type TFilterOption = {
  id: string,
  isChecked: boolean,
  icon: ReactNode,
  title: string
}
export const filterOptions: TFilterOption[] = [
  {
    id: 'aircraft',
    isChecked: false,
    icon: <div className='flex-none p-2 rounded-md bg-[#3f352a] border border-[#5d4223]'>
      <img src={'/assets/icons/map/plane.png'} />
    </div>,
    title: 'Aircraft',
  },
  {
    id: 'vessel',
    isChecked: false,
    icon: <div className='flex-none p-2 rounded-md bg-[#2f3642] border border-[#31405a]'>
      <img src={'/assets/icons/map/ship.png'} />
    </div>,
    title: 'Vessel',
  },
  {
    id: 'sentiment-positive',
    isChecked: false,
    icon: <div className='flex-none p-2 w-8 h-8 rounded-md bg-[#82DBBC] border-2 border-green-70 '>
    </div>,
    title: 'Positive'
  },
  {
    id: 'sentiment-neutral',
    isChecked: false,
    icon: <div className='flex-none p-2 w-8 h-8 rounded-md bg-[#F9E8BB] border-2 border-yellow-70 '>
    </div>,
    title: 'Neutral'
  },
  {
    id: 'sentiment-negative',
    isChecked: false,
    icon: <div className='flex-none p-2 w-8 h-8 rounded-md bg-[#EC5269] border-2 border-red-70 '>
    </div>,
    title: 'Negative'
  },
] 