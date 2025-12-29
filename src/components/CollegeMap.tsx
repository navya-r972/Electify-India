'use client';

import { useState, useEffect, useRef, forwardRef } from 'react';
import dynamic from 'next/dynamic';
// Import Leaflet only on client-side
const L = typeof window !== 'undefined' ? require('leaflet') : null;
if (typeof window !== 'undefined') {
  require('leaflet/dist/leaflet.css');
}

// Dynamically import react-leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

const MarkerClusterGroup = dynamic(
  () => import('react-leaflet-cluster'),
  { ssr: false }
);

// Dynamic import for the ChangeView component
const ChangeViewComponent = dynamic(
  () => import('react-leaflet').then((mod) => {
    const useMap = mod.useMap;
    return forwardRef(function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }, ref) {
      const map = useMap();
      map.setView(center, zoom);
      return null;
    });
  }),
  { ssr: false }
);

// Define icon configurations
const defaultIconOptions = {
  iconUrl: '/images/marker-icon.svg',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
};

const userIconOptions = {
  iconUrl: '/images/user-location.svg',
  iconSize: [20, 20],
  iconAnchor: [10, 10]
};

// Create icons only on client-side
let DefaultIcon: any;
let userIcon: any;

if (typeof window !== 'undefined' && L) {
  // Fix Leaflet's icon paths in Next.js
  delete L.Icon.Default.prototype._getIconUrl;
  
  // Set default icon options globally
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/images/marker-icon.svg',
    iconUrl: '/images/marker-icon.svg',
    shadowUrl: '/images/marker-shadow.png',
  });
  
  // Create custom icons
  DefaultIcon = new L.Icon({
    iconUrl: '/images/marker-icon.svg',
    iconRetinaUrl: '/images/marker-icon.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: '/images/marker-shadow.png',
    shadowSize: [41, 41]
  });
  
  userIcon = new L.Icon({
    iconUrl: '/images/user-location.svg',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10]
  });
}

// Sample college data for J&K colleges with location coordinates
const sampleColleges = [
  {
    id: 1,
    name: 'Government Degree College, Jammu',
    location: [32.7266, 74.8570], // Jammu coordinates
    distance: 5,
    streams: ['Science', 'Arts']
  },
  {
    id: 2,
    name: 'Government Women\'s College, Gandhi Nagar',
    location: [32.7369, 74.8603], // Gandhi Nagar coordinates
    distance: 8,
    streams: ['Science', 'Commerce']
  },
  {
    id: 3,
    name: 'Government Polytechnic College, Jammu',
    location: [32.7157, 74.8435], // Jammu South coordinates
    distance: 12,
    streams: ['Vocational', 'Technical']
  },
  {
    id: 4,
    name: 'Government College for Women, Srinagar',
    location: [33.7782, 76.5762], // Srinagar coordinates
    distance: 290,
    streams: ['Science', 'Arts', 'Commerce']
  },
  {
    id: 5,
    name: 'Amar Singh College, Srinagar',
    location: [34.0836, 74.7973], // Srinagar area
    distance: 295,
    streams: ['Science', 'Arts']
  },
  {
    id: 6,
    name: 'Government Degree College, Baramulla',
    location: [34.1971, 74.3478], // Baramulla
    distance: 320,
    streams: ['Science', 'Arts', 'Commerce']
  },
  {
    id: 7,
    name: 'Government Degree College, Anantnag',
    location: [33.7311, 75.1487], // Anantnag
    distance: 260,
    streams: ['Science', 'Arts']
  },
  {
    id: 8,
    name: 'Government Degree College, Kupwara',
    location: [34.5261, 74.2546], // Kupwara
    distance: 350,
    streams: ['Science', 'Arts']
  },
  {
    id: 9,
    name: 'Government Degree College, Kargil',
    location: [34.5539, 76.1349], // Kargil
    distance: 380,
    streams: ['Science', 'Arts']
  },
  {
    id: 10,
    name: 'Islamic University of Science and Technology',
    location: [33.9246, 74.7928], // Awantipora
    distance: 275,
    streams: ['Science', 'Engineering', 'Technology']
  },
  {
    id: 11,
    name: 'University of Kashmir',
    location: [34.1384, 74.8303], // Srinagar
    distance: 285,
    streams: ['Science', 'Arts', 'Commerce', 'Law']
  },
  {
    id: 12,
    name: 'National Institute of Technology, Srinagar',
    location: [34.1250, 74.8125], // Srinagar
    distance: 288,
    streams: ['Engineering', 'Technology']
  },
  {
    id: 13,
    name: 'Cluster University of Jammu',
    location: [32.7185, 74.8580], // Jammu
    distance: 6,
    streams: ['Science', 'Arts', 'Commerce']
  },
  {
    id: 14,
    name: 'Shri Mata Vaishno Devi University',
    location: [32.9336, 74.9275], // Katra
    distance: 45,
    streams: ['Engineering', 'Science', 'Management']
  },
  {
    id: 15,
    name: 'Central University of Kashmir',
    location: [34.1384, 74.8000], // Ganderbal
    distance: 290,
    streams: ['Arts', 'Science', 'Commerce']
  },
  {
    id: 16,
    name: 'Central University of Jammu',
    location: [32.6926, 74.8770], // Jammu
    distance: 15,
    streams: ['Arts', 'Science', 'Management']
  },
  {
    id: 17,
    name: 'Government Degree College, Poonch',
    location: [33.7667, 74.1000], // Poonch
    distance: 120,
    streams: ['Arts', 'Science']
  },
  {
    id: 18,
    name: 'Government Degree College, Rajouri',
    location: [33.3800, 74.3100], // Rajouri
    distance: 90,
    streams: ['Arts', 'Science']
  }
];
// We'll use the dynamically imported ChangeViewComponent

interface CollegeMapProps {
  selectedCollegeId?: number | null;
}

const CollegeMap = forwardRef<HTMLDivElement, CollegeMapProps>(({ selectedCollegeId }, ref) => {
  const [center, setCenter] = useState<[number, number]>([32.7266, 74.8570]); // Default to Jammu
  const [zoom, setZoom] = useState(12);
  const mapRef = useRef<L.Map | null>(null);
  const [colleges, setColleges] = useState(sampleColleges);
  const [maxDistance, setMaxDistance] = useState(50);
  const [selectedStreams, setSelectedStreams] = useState<string[]>([]);

  // Filter colleges based on selected criteria
  const filteredColleges = colleges.filter(college => {
    const distanceMatch = college.distance <= maxDistance;
    const streamMatch = selectedStreams.length === 0 || 
      college.streams.some(stream => selectedStreams.includes(stream));
    return distanceMatch && streamMatch;
  });
  
  // Effect to handle selected college from the list
  useEffect(() => {
    if (selectedCollegeId) {
      const selectedCollege = colleges.find(college => college.id === selectedCollegeId);
      if (selectedCollege) {
        setCenter(selectedCollege.location as [number, number]);
        setZoom(15); // Zoom in closer to the selected college
      }
    }
  }, [selectedCollegeId, colleges]);
  
  // Initialize map and add markers after component mounts
  useEffect(() => {
    // Set default view to Jammu area with closer zoom
    setCenter([32.7266, 74.8570]); // Jammu coordinates
    setZoom(12); // Zoom level for Jammu area
  }, []);

  // State for user location
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  // Handle getting user's location
  const handleNearMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation: [number, number] = [latitude, longitude];
          setUserLocation(newLocation);
          setCenter(newLocation);
          setZoom(15);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to retrieve your location. Please check your browser permissions.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className="mt-8" ref={ref}>
      <div className="flex flex-wrap items-center gap-4 mb-4">
        {/* Distance slider */}
        <div className="flex items-center">
          <label htmlFor="distance" className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Distance: {maxDistance} km
          </label>
          <input
            type="range"
            id="distance"
            min="1"
            max="50"
            value={maxDistance}
            onChange={(e) => setMaxDistance(parseInt(e.target.value))}
            className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>

        {/* Stream checkboxes */}
        <div className="flex flex-wrap gap-2">
          {['Science', 'Arts', 'Commerce', 'Vocational', 'Technical'].map((stream) => (
            <label key={stream} className="inline-flex items-center">
              <input
                type="checkbox"
                value={stream}
                checked={selectedStreams.includes(stream)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedStreams([...selectedStreams, stream]);
                  } else {
                    setSelectedStreams(selectedStreams.filter(s => s !== stream));
                  }
                }}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{stream}</span>
            </label>
          ))}
        </div>

        {/* Near Me button */}
        <button
          onClick={handleNearMe}
          className="ml-auto px-4 py-2 text-sm font-medium text-primary-600 bg-white border border-primary-600 rounded-md hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-dark-800 dark:text-primary-400 dark:border-primary-500 dark:hover:bg-dark-700"
        >
          Near Me
        </button>
      </div>

      {/* Map container */}
      <div className="h-[400px] rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-dark-700">
        <MapContainer
          center={center}
          zoom={zoom}
          style={{ height: '100%', width: '100%' }}
          whenReady={() => {
            // We can access the map through other means if needed
          }}
        >
          <ChangeViewComponent center={center} zoom={zoom} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* User location marker is handled below */}

          {/* College markers with clustering */}
          <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={(cluster) => {
              if (L) {
                return L.divIcon({
                  html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
                  className: 'custom-marker-cluster',
                  iconSize: L.point(40, 40, true)
                });
              }
              return null;
            }}
          >
            {filteredColleges.map((college) => (
              <Marker 
                key={college.id} 
                position={college.location as [number, number]}
                icon={typeof window !== 'undefined' && L ? new L.Icon({
                  iconUrl: '/images/marker-icon.svg',
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                  shadowUrl: '/images/marker-shadow.png',
                  shadowSize: [41, 41]
                }) : undefined}
                eventHandlers={{
                  click: () => {
                    // Highlight the corresponding card in the list
                    const element = document.getElementById(`college-${college.id}`);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                      element.classList.add('ring-2', 'ring-primary-500');
                      setTimeout(() => {
                        element.classList.remove('ring-2', 'ring-primary-500');
                      }, 2000);
                    }
                  }
                }}
                // Add tooltip for college name on hover
                title={`${college.name} - ${college.distance}km away`}
              >
                <Popup>
                  <div>
                    <h3 className="font-medium">{college.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{college.distance} km away</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {college.streams.map(stream => (
                        <span 
                          key={stream} 
                          className="px-2 py-0.5 text-xs rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                        >
                          {stream}
                        </span>
                      ))}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>

          {/* User location marker is handled elsewhere to prevent duplicate markers */}
        </MapContainer>
      </div>
    </div>
  );
});

export default CollegeMap;